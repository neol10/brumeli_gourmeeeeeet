"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brandConfig } from "../data/brand";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const moment1Ref = useRef<HTMLDivElement | null>(null);
  const moment2Ref = useRef<HTMLDivElement | null>(null);
  const moment3Ref = useRef<HTMLDivElement | null>(null);
  const moment4Ref = useRef<HTMLDivElement | null>(null);
  const finalScrimRef = useRef<HTMLDivElement | null>(null);

  // Refs de controle de seek (zero re-render React por frame)
  const durationRef = useRef<number>(8);
  const initializedRef = useRef<boolean>(false);
  const isSeekingRef = useRef<boolean>(false);
  const pendingTimeRef = useRef<number | null>(null);
  const lastRequestedTimeRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [videoFailed, setVideoFailed] = useState<boolean>(false);

  // 1. Detecta viewport e prefers-reduced-motion para carregar apenas 1 vídeo
  useEffect(() => {
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 768px)");

    const updateMedia = () => {
      const reduced = reducedQuery.matches;
      setPrefersReducedMotion(reduced);
      if (reduced) {
        setVideoSrc(null);
      } else {
        setVideoSrc(
          desktopQuery.matches
            ? "/videos/hero-desktop-scrub.mp4"
            : "/videos/hero-mobile-scrub.mp4"
        );
      }
    };

    updateMedia();
    reducedQuery.addEventListener("change", updateMedia);
    desktopQuery.addEventListener("change", updateMedia);

    return () => {
      reducedQuery.removeEventListener("change", updateMedia);
      desktopQuery.removeEventListener("change", updateMedia);
    };
  }, []);

  // 2. Inicialização única do vídeo + gerenciador de seek sem concorrência + Timeline Mestra GSAP
  useEffect(() => {
    if (prefersReducedMotion || !videoSrc || videoFailed) return;
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // Reseta refs de seek ao trocar fonte de vídeo
    initializedRef.current = false;
    isSeekingRef.current = false;
    pendingTimeRef.current = null;
    lastRequestedTimeRef.current = -1;

    const flushSeek = () => {
      rafIdRef.current = null;
      const vid = videoRef.current;
      if (!vid || isSeekingRef.current || pendingTimeRef.current === null) return;
      if (vid.readyState < 1) return;

      const target = pendingTimeRef.current;
      pendingTimeRef.current = null;
      isSeekingRef.current = true;

      try {
        vid.currentTime = target;
      } catch {
        isSeekingRef.current = false;
      }
    };

    const scheduleSeek = (progress: number) => {
      const dur = durationRef.current > 0 ? durationRef.current : 8;
      const clamped = Math.max(0, Math.min(dur - 0.04, progress * dur));

      if (Math.abs(clamped - lastRequestedTimeRef.current) < 0.008) return;
      lastRequestedTimeRef.current = clamped;
      pendingTimeRef.current = clamped;

      if (rafIdRef.current === null) {
        rafIdRef.current = window.requestAnimationFrame(flushSeek);
      }
    };

    const handleLoadedMetadata = () => {
      if (initializedRef.current) return;
      initializedRef.current = true;
      if (Number.isFinite(video.duration) && video.duration > 0) {
        durationRef.current = video.duration;
      }
      video.pause();
      if (pendingTimeRef.current !== null && rafIdRef.current === null) {
        rafIdRef.current = window.requestAnimationFrame(flushSeek);
      }
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (pendingTimeRef.current !== null && rafIdRef.current === null) {
        rafIdRef.current = window.requestAnimationFrame(flushSeek);
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("seeked", handleSeeked);

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const videoProxy = { progress: 0 };

      // Estados iniciais determinísticos dos 4 momentos
      gsap.set(moment1Ref.current, { opacity: 1, y: 0, scale: 1 });
      gsap.set(moment2Ref.current, { opacity: 0, y: 30, scale: 0.98 });
      gsap.set(moment3Ref.current, { opacity: 0, y: 30, scale: 0.98 });
      gsap.set(moment4Ref.current, { opacity: 0, y: 32, scale: 0.97, pointerEvents: "none" });
      gsap.set(finalScrimRef.current, { opacity: 0 });

      // Única Timeline Mestra com único ScrollTrigger (pin: true, pinSpacing: true, scrub: 0.28, ~300vh)
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          scrub: 0.28,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Sincronização do vídeo pelo progresso efetivo da timeline suavizada
      masterTl.to(
        videoProxy,
        {
          progress: 1,
          duration: 1,
          ease: "none",
          onUpdate: () => {
            scheduleSeek(videoProxy.progress);
          },
        },
        0
      );

      // MOMENTO 01 (0% a 25%): Visível no início e sai suavemente em 0.17 -> 0.25
      masterTl.to(
        moment1Ref.current,
        { opacity: 0, y: -28, scale: 0.98, duration: 0.08, ease: "power2.in" },
        0.17
      );

      // MOMENTO 02 (25% a 50%): Entra em 0.25 -> 0.33, sai em 0.42 -> 0.50
      masterTl
        .to(
          moment2Ref.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.08, ease: "power2.out" },
          0.25
        )
        .to(
          moment2Ref.current,
          { opacity: 0, y: -28, scale: 0.98, duration: 0.08, ease: "power2.in" },
          0.42
        );

      // MOMENTO 03 (50% a 75%): Entra em 0.50 -> 0.58, sai em 0.67 -> 0.75
      masterTl
        .to(
          moment3Ref.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.08, ease: "power2.out" },
          0.5
        )
        .to(
          moment3Ref.current,
          { opacity: 0, y: -28, scale: 0.98, duration: 0.08, ease: "power2.in" },
          0.67
        );

      // MOMENTO 04 (75% a 100%): Revelação final da marca, título, subtítulo e CTAs
      masterTl
        .to(
          finalScrimRef.current,
          { opacity: 1, duration: 0.1, ease: "power2.out" },
          0.74
        )
        .to(
          moment4Ref.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            pointerEvents: "auto",
            duration: 0.12,
            ease: "power3.out",
          },
          0.75
        );
    }, sectionRef);

    // Recalcula posições de todas as seções abaixo após reservar o pinSpacing
    ScrollTrigger.refresh();

    return () => {
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
      ctx.revert();
    };
  }, [videoSrc, prefersReducedMotion, videoFailed]);

  // FALLBACK ESTÁTICO PARA PREFERS-REDUCED-MOTION OU ERRO DE VÍDEO
  if (prefersReducedMotion || videoFailed) {
    return (
      <section
        id="hero"
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#241810]"
      >
        <Image
          src="/images/batata-recheada-1.webp"
          alt="Batata Recheada Especial Brumeli Gourmet"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241810]/90 via-[#241810]/45 to-[#241810]/60 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center py-28">
          <div className="relative w-16 h-16 mx-auto mb-5 rounded-full overflow-hidden border border-[#D7AB7C]/50 shadow-lg">
            <Image src="/images/logo.webp" alt="Logo Brumeli Gourmet" fill sizes="64px" className="object-cover" />
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#FFF3E2] leading-[0.95] mb-5">
            Sua dose de <span className="italic text-[#D7AB7C]">felicidade.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#FFF3E2]/85 font-sans max-w-lg mx-auto mb-8 leading-relaxed">
            {brandConfig.heroText}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#cardapio"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase bg-[#FFF3E2] text-[#241810] hover:bg-white transition-colors"
            >
              Explorar cardápio
            </Link>
            <a
              href={brandConfig.social.pedidosLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase bg-terracota text-[#FFF3E2] hover:bg-terracota-hover transition-colors"
            >
              <span>Fazer pedido</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="block w-full shrink-0">
      <section
        id="hero"
        ref={sectionRef}
        className="relative h-[100svh] w-full overflow-hidden bg-[#241810]"
      >
      {/* CAMADA DE VÍDEO FULL-BLEED CONTROLADO EXCLUSIVAMENTE PELO SCROLL */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {videoSrc ? (
          <video
            key={videoSrc}
            ref={videoRef}
            src={videoSrc}
            poster="/images/batata-recheada-1.webp"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onError={() => setVideoFailed(true)}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <Image
            src="/images/batata-recheada-1.webp"
            alt="Batata Recheada Especial Brumeli Gourmet"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}

        {/* Vinheta Superior Sutil apenas para legibilidade do Header */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#1A110B]/65 via-[#1A110B]/25 to-transparent pointer-events-none" />

        {/* Vinheta Inferior Localizada apenas para leitura das frases cinematográficas (preserva o produto livre) */}
        <div className="absolute inset-x-0 bottom-0 h-[44%] md:h-[40%] bg-gradient-to-t from-[#1A110B]/85 via-[#1A110B]/35 to-transparent pointer-events-none" />

        {/* Scrim Sutil Ativado apenas no Momento 04 para legibilidade AAA dos botões finais */}
        <div
          ref={finalScrimRef}
          className="absolute inset-0 bg-[#1A110B]/45 pointer-events-none opacity-0"
        />
      </div>

      {/* PALCO CINEMATOGRÁFICO DOS 4 MOMENTOS */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-6 md:px-12 pointer-events-none">
        
        {/* MOMENTO 01 — 0% a 25% */}
        <div
          ref={moment1Ref}
          className="absolute inset-x-6 md:inset-x-12 bottom-10 md:bottom-14 flex flex-col items-center text-center"
        >
          <span className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-[#D7AB7C] font-sans font-semibold mb-3 drop-shadow-sm">
            Brumeli Gourmet
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-[#FFF3E2] leading-[0.98] drop-shadow-[0_4px_24px_rgba(26,17,11,0.75)] max-w-3xl">
            Mais que uma batata<span className="italic text-[#D7AB7C]">...</span>
          </h1>

          {/* Indicador destacado ROLE PARA EXPLORAR */}
          <div className="mt-7 md:mt-9 flex flex-col items-center gap-2">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#FFF3E2]/90 font-sans font-semibold">
              Role para explorar
            </span>
            <div className="w-8 h-8 rounded-full border border-[#D7AB7C]/60 bg-[#241810]/50 flex items-center justify-center text-[#D7AB7C] animate-bounce">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* MOMENTO 02 — 25% a 50% */}
        <div
          ref={moment2Ref}
          className="absolute inset-x-6 md:inset-x-12 bottom-12 md:bottom-16 flex flex-col items-center md:items-start text-center md:text-left opacity-0"
        >
          <span className="w-10 h-[1px] bg-[#D7AB7C] mb-4" />
          <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-[#FFF3E2] leading-[0.98] drop-shadow-[0_4px_24px_rgba(26,17,11,0.8)] max-w-2xl">
            Uma experiência <br />
            <span className="italic text-[#D7AB7C]">em cada detalhe.</span>
          </h2>
        </div>

        {/* MOMENTO 03 — 50% a 75% */}
        <div
          ref={moment3Ref}
          className="absolute inset-x-6 md:inset-x-12 bottom-12 md:bottom-16 flex flex-col items-center md:items-end text-center md:text-right opacity-0"
        >
          <span className="w-10 h-[1px] bg-[#D7AB7C] mb-4" />
          <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-[#FFF3E2] leading-[0.98] drop-shadow-[0_4px_24px_rgba(26,17,11,0.8)] max-w-2xl">
            Sabores que despertam <br />
            <span className="italic text-[#D7AB7C]">felicidade.</span>
          </h2>
        </div>

        {/* MOMENTO 04 — 75% a 100%: Revelação Final da Marca e CTAs */}
        <div
          ref={moment4Ref}
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 opacity-0 pointer-events-none"
        >
          <div className="max-w-xl w-full text-center bg-[#241810]/70 backdrop-blur-sm border border-[#D7AB7C]/25 rounded-xl p-7 sm:p-10 shadow-2xl">
            {/* Logo Oficial BRUMELI */}
            <div className="flex flex-col items-center mb-5">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#D7AB7C]/60 shadow-lg mb-3">
                <Image
                  src="/images/logo.webp"
                  alt="Logo Oficial Brumeli Gourmet"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#D7AB7C] font-sans font-semibold">
                By {brandConfig.founder}
              </span>
            </div>

            {/* Título Final */}
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#FFF3E2] leading-[0.96] mb-4">
              Sua dose de <span className="italic text-[#D7AB7C]">felicidade.</span>
            </h2>

            {/* Subtítulo */}
            <p className="text-sm sm:text-base md:text-lg text-[#FFF3E2]/85 font-sans font-light max-w-md mx-auto leading-relaxed mb-7">
              {brandConfig.heroText}
            </p>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="#cardapio"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase bg-[#FFF3E2] text-[#241810] hover:bg-white transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Explorar cardápio
              </Link>

              <a
                href={brandConfig.social.pedidosLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase bg-terracota text-[#FFF3E2] hover:bg-terracota-hover transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 animate-pulse-glow animate-shimmer-sweep"
              >
                <span>Fazer pedido</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
    </div>
  );
}
