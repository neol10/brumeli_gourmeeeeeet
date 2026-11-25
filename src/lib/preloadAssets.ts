const CACHE_NAME = "brumeli-cinematic-assets-v1";
const CACHE_FLAG_KEY = "brumeli_assets_cached_v1";

export const HERO_DESKTOP_VIDEO = "/videos/hero-desktop-scrub.mp4";
export const HERO_MOBILE_VIDEO = "/videos/hero-mobile-scrub.mp4";

export const ESSENTIAL_IMAGES = [
  "/images/logo.webp",
  "/images/batata-recheada-1.webp",
  "/images/bolos-vitrine.webp",
  "/images/sobremesa-gourmet.webp",
  "/images/suco-natural.webp",
  "/images/ambiente-brumeli.webp",
] as const;

// Cache em memória compartilhado (Blob URLs prontos para consumo instantâneo pelo Hero)
const cachedHeroVideoUrls: Record<string, string> = {};
const videoReadyListeners = new Set<(sourcePath: string, blobUrl: string) => void>();

let activePreloadPromise: Promise<void> | null = null;

export function getTargetHeroVideoPath(): string {
  if (typeof window === "undefined") return HERO_DESKTOP_VIDEO;
  return window.matchMedia("(min-width: 768px)").matches
    ? HERO_DESKTOP_VIDEO
    : HERO_MOBILE_VIDEO;
}

export function getCachedHeroVideoUrl(sourcePath: string): string | null {
  return cachedHeroVideoUrls[sourcePath] ?? null;
}

export function subscribeHeroVideoReady(
  listener: (sourcePath: string, blobUrl: string) => void
): () => void {
  videoReadyListeners.add(listener);
  return () => {
    videoReadyListeners.delete(listener);
  };
}

function notifyHeroVideoReady(sourcePath: string, blobUrl: string) {
  videoReadyListeners.forEach((fn) => fn(sourcePath, blobUrl));
}

export function hasPersistentAssetCache(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(CACHE_FLAG_KEY) === "true";
  } catch {
    return false;
  }
}

function markPersistentAssetCacheReady(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_FLAG_KEY, "true");
  } catch {
    // Modo privado ou bloqueio de storage — ignora silenciosamente
  }
}

async function openAssetCache(): Promise<Cache | null> {
  if (typeof window === "undefined" || !("caches" in window)) return null;
  try {
    return await window.caches.open(CACHE_NAME);
  } catch {
    return null;
  }
}

async function preloadSingleImage(url: string, cache: Cache | null): Promise<void> {
  let blob: Blob | null = null;

  try {
    if (cache) {
      const cached = await cache.match(url);
      if (cached && cached.ok) {
        blob = await cached.blob();
      }
    }

    if (!blob) {
      const response = await fetch(url, { cache: "force-cache" });
      if (!response.ok) return;
      if (cache) {
        try {
          await cache.put(url, response.clone());
        } catch {
          // Quota excedida ou cache indisponível
        }
      }
      blob = await response.blob();
    }

    const objectUrl = URL.createObjectURL(blob);
    try {
      const img = new Image();
      img.decoding = "async";
      img.src = objectUrl;
      if (typeof img.decode === "function") {
        await img.decode();
      } else {
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      }
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  } catch {
    // Falha isolada em imagem não deve travar o preloader
  }
}

async function preloadHeroVideo(
  url: string,
  cache: Cache | null,
  onVideoProgress: (ratio: number) => void
): Promise<void> {
  if (cachedHeroVideoUrls[url]) {
    onVideoProgress(1);
    return;
  }

  try {
    // 1. Tenta leitura direta do Cache Storage persistente em disco
    if (cache) {
      const cached = await cache.match(url);
      if (cached && cached.ok) {
        const blob = await cached.blob();
        const blobUrl = URL.createObjectURL(blob);
        cachedHeroVideoUrls[url] = blobUrl;
        onVideoProgress(1);
        notifyHeroVideoReady(url, blobUrl);
        return;
      }
    }

    // 2. Primeira visita: baixa com leitura de stream para progresso real + salva em disco
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(url, {
        cache: "force-cache",
        signal: controller.signal,
      });
      if (!response.ok) {
        onVideoProgress(1);
        return;
      }

      const contentLengthHeader = response.headers.get("Content-Length");
      const totalBytes = contentLengthHeader ? parseInt(contentLengthHeader, 10) : 0;

      let blob: Blob;

      if (response.body && totalBytes > 0) {
        const reader = response.body.getReader();
        const chunks: Uint8Array<ArrayBuffer>[] = [];
        let loadedBytes = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value as Uint8Array<ArrayBuffer>);
            loadedBytes += value.byteLength;
            onVideoProgress(Math.min(0.98, loadedBytes / totalBytes));
          }
        }

        blob = new Blob(chunks, { type: "video/mp4" });
      } else {
        blob = await response.blob();
      }

      if (cache) {
        try {
          await cache.put(
            url,
            new Response(blob, {
              status: 200,
              headers: {
                "Content-Type": "video/mp4",
                "Cache-Control": "public, max-age=31536000, immutable",
              },
            })
          );
        } catch {
          // Quota ou modo privado
        }
      }

      const blobUrl = URL.createObjectURL(blob);
      cachedHeroVideoUrls[url] = blobUrl;
      onVideoProgress(1);
      notifyHeroVideoReady(url, blobUrl);
    } finally {
      window.clearTimeout(timeoutId);
    }
  } catch {
    onVideoProgress(1);
  }
}

async function preloadFonts(): Promise<void> {
  if (typeof document === "undefined" || !("fonts" in document)) return;
  try {
    await Promise.race([
      document.fonts.ready,
      new Promise<void>((resolve) => window.setTimeout(resolve, 3000)),
    ]);
  } catch {
    // Segue sem bloquear
  }
}

export async function preloadAllSiteAssets(
  onProgress?: (percent: number) => void
): Promise<void> {
  if (typeof window === "undefined") return;

  if (activePreloadPromise) {
    await activePreloadPromise;
    onProgress?.(100);
    return;
  }

  activePreloadPromise = (async () => {
    let videoRatio = 0;
    let imagesRatio = 0;
    let fontsRatio = 0;
    let lastReported = 0;

    const emit = () => {
      const total = Math.round(videoRatio * 65 + imagesRatio * 25 + fontsRatio * 10);
      const clamped = Math.max(lastReported, Math.min(100, total));
      lastReported = clamped;
      onProgress?.(clamped);
    };

    const cache = await openAssetCache();
    const targetVideo = getTargetHeroVideoPath();

    // 1. Fontes em paralelo
    const fontsPromise = preloadFonts().then(() => {
      fontsRatio = 1;
      emit();
    });

    // 2. Vídeo cinematográfico do dispositivo atual
    const videoPromise = preloadHeroVideo(targetVideo, cache, (ratio) => {
      videoRatio = ratio;
      emit();
    });

    // 3. Imagens essenciais em lote paralelo com pré-decodificação GPU
    let loadedImages = 0;
    const totalImages = ESSENTIAL_IMAGES.length;
    const imagesPromise = Promise.all(
      ESSENTIAL_IMAGES.map((imgUrl) =>
        preloadSingleImage(imgUrl, cache).then(() => {
          loadedImages += 1;
          imagesRatio = loadedImages / totalImages;
          emit();
        })
      )
    );

    await Promise.all([fontsPromise, videoPromise, imagesPromise]);

    lastReported = 100;
    onProgress?.(100);
    markPersistentAssetCacheReady();
  })();

  try {
    await activePreloadPromise;
  } finally {
    activePreloadPromise = null;
  }
}
