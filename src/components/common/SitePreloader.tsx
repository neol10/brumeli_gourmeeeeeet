"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  hasPersistentAssetCache,
  preloadAllSiteAssets,
} from "../../lib/preloadAssets";

export default function SitePreloader() {
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Respeita prefers-reduced-motion: libera imediatamente sem exibir preloader
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setShouldRender(false);
      return;
    }

    // 2ª visita / F5: cache persistente já aquecido -> abre instantaneamente
    if (hasPersistentAssetCache()) {
      setShouldRender(false);
      // Hidrata vídeo e imagens em segundo plano direto do Cache Storage em disco
      void preloadAllSiteAssets();
      return;
    }

    // 1ª visita: trava o scroll enquanto pré-carrega os assets cinematográficos
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    let finished = false;
    let fadeTimer: number | null = null;

    const releasePreloader = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      setIsFadingOut(true);

      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;

      fadeTimer = window.setTimeout(() => {
        setShouldRender(false);
      }, 720);
    };

    // Timeout máximo de segurança (25s) para nunca travar o usuário em redes muito lentas
    const safetyTimer = window.setTimeout(() => {
      releasePreloader();
    }, 25000);

    void preloadAllSiteAssets((percent) => {
      if (!finished) {
        setProgress(percent);
      }
    }).finally(() => {
      window.clearTimeout(safetyTimer);
      releasePreloader();
    });

    return () => {
      window.clearTimeout(safetyTimer);
      if (fadeTimer !== null) {
        window.clearTimeout(fadeTimer);
      }
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Carregando experiência Brumeli Gourmet"
      className={`fixed inset-0 z-[150] flex flex-col items-center justify-center bg-[#241810] px-6 transition-opacity duration-700 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 38%, rgba(215, 171, 124, 0.12), transparent 62%)",
      }}
    >
      <div className="flex flex-col items-center text-center max-w-sm w-full">
        {/* Logo Oficial BRUMELI */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#F2D3A4]/60 shadow-[0_8px_30px_rgba(0,0,0,0.45)] mb-5">
          <Image
            src="/images/logo.webp"
            alt="Brumeli Gourmet"
            fill
            priority
            sizes="96px"
            className="object-cover"
          />
        </div>

        {/* Nome da Marca */}
        <span className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#FFF8ED] leading-none">
          BRUMELI
        </span>
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#F2D3A4] font-sans font-semibold mt-2">
          Gourmet &amp; Experiências
        </span>

        {/* Barra de Progresso Real (0% a 100%) */}
        <div className="w-full max-w-[260px] mt-9">
          <div className="h-[2px] w-full bg-[#FFF8ED]/15 overflow-hidden rounded-full">
            <div
              className="h-full bg-gradient-to-r from-[#873D1D] via-[#D7AB7C] to-[#F2D3A4] transition-[width] duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] font-sans tracking-[0.2em] uppercase text-[#FFF8ED]/70">
            <span>Preparando experiência</span>
            <span className="font-semibold text-[#F2D3A4] tabular-nums">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
