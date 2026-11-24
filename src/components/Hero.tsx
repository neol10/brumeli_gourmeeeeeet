"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { brandConfig } from "../data/brand";
import { ArrowUpRight, Heart, Sparkles, Truck } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [videoFailed, setVideoFailed] = useState<boolean>(false);
  const [videoReady, setVideoReady] = useState<boolean>(false);

  // Detecta viewport e prefers-reduced-motion no cliente para baixar apenas 1 vídeo
  useEffect(() => {
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 768px)");

    const updateMedia = () => {
      const reduced = reducedQuery.matches;
      setPrefersReducedMotion(reduced);
      if (reduced) {
        setVideoSrc(null);
      } else {
        setVideoSrc(desktopQuery.matches ? "/videos/hero-desktop.mp4" : "/videos/hero-mobile.mp4");
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

  // Pausa automaticamente o vídeo quando o Hero sai da área visível (economia de CPU/GPU)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !videoSrc || prefersReducedMotion || videoFailed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Fallback silencioso caso o navegador bloqueie autoplay
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [videoSrc, prefersReducedMotion, videoFailed]);

  const showVideo = Boolean(videoSrc) && !prefersReducedMotion && !videoFailed;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-creme-100"
    >
      {/* CAMADA DE FUNDO: Fallback Estático + Vídeo Cinematográfico */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {/* Imagem de fallback imediato / reduced-motion */}
        <Image
          src="/images/batata-recheada-1.webp"
          alt="Batata Recheada Especial Brumeli Gourmet"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-700 ${
            showVideo && videoReady ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Vídeo Cinematográfico Responsivo (carrega exclusivamente a versão do dispositivo) */}
        {showVideo && videoSrc && (
          <video
            key={videoSrc}
            ref={videoRef}
            src={videoSrc}
            poster="/images/batata-recheada-1.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
            className={`absolute inset-0 w-full h-full object-cover object-[center_28%] md:object-[68%_center] transition-opacity duration-700 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Gradiente Superior Sutil para Legibilidade do Header Integrado */}
        <div className="absolute inset-x-0 top-0 h-32 md:h-36 bg-gradient-to-b from-[#F8F1E5]/90 via-[#F8F1E5]/45 to-transparent pointer-events-none" />

        {/* DESKTOP: Transição Orgânica de Creme (Esquerda) para Transparente (Direita — Produto em Destaque) */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(248, 241, 229, 0.96) 0%, rgba(248, 241, 229, 0.88) 36%, rgba(248, 241, 229, 0.45) 56%, rgba(248, 241, 229, 0) 76%)",
          }}
        />

        {/* MOBILE: Composição Vertical Própria — Deixa o Produto Livre na Metade Superior e Garante Leitura Total na Base */}
        <div
          className="md:hidden absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(248, 241, 229, 0.72) 0%, rgba(248, 241, 229, 0.05) 22%, rgba(248, 241, 229, 0.05) 42%, rgba(248, 241, 229, 0.82) 56%, rgba(248, 241, 229, 0.97) 68%, rgba(248, 241, 229, 1) 100%)",
          }}
        />
      </div>

      {/* CONTEÚDO PRINCIPAL DO HERO */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-end md:justify-center pt-[46svh] sm:pt-[48svh] md:pt-32 pb-8 md:pb-12">
        <div className="max-w-xl lg:max-w-[34rem]">
          {/* Tagline Superior */}
          <div className="hero-reveal-eyebrow inline-flex items-center gap-2.5 mb-3 md:mb-5">
            <span className="w-8 h-[1px] bg-terracota" />
            <span className="text-[11px] md:text-xs font-sans tracking-[0.22em] uppercase font-semibold text-terracota">
              {brandConfig.heroSubtitle}
            </span>
          </div>

          {/* Título Principal Editorial */}
          <h1 className="hero-reveal-title font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-medium tracking-tight text-marrom leading-[0.94] mb-4 md:mb-6">
            {brandConfig.heroHeadline.main} <br />
            <span className="font-serif italic font-normal text-terracota">
              {brandConfig.heroHeadline.highlight}
            </span>
          </h1>

          {/* Texto Editorial */}
          <p className="hero-reveal-text text-base sm:text-lg md:text-xl text-marrom/90 font-sans font-normal max-w-lg leading-relaxed mb-7 md:mb-9">
            {brandConfig.heroText}
          </p>

          {/* Botões de Ação */}
          <div className="hero-reveal-cta flex flex-wrap items-center gap-3.5 sm:gap-4 mb-7 md:mb-10">
            <Link
              href="#cardapio"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-full text-xs sm:text-sm font-sans font-medium tracking-wider uppercase bg-marrom text-creme-100 hover:bg-terracota transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Explorar cardápio
            </Link>

            <a
              href={brandConfig.social.pedidosLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full text-xs sm:text-sm font-sans font-medium tracking-wider uppercase bg-terracota text-creme-100 hover:bg-terracota-hover transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 animate-pulse-glow animate-shimmer-sweep"
            >
              <span>Fazer pedido</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Assinatura da Fundadora */}
          <div className="hero-reveal-badge flex items-center gap-3 pt-4 border-t border-marrom/15 max-w-xs sm:max-w-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracota opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-terracota" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-marrom/75 font-medium">
              Criações autorais
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-terracota" />
            <span className="text-sm font-serif italic text-marrom font-medium">
              By {brandConfig.founder}
            </span>
          </div>
        </div>
      </div>

      {/* TRANSIÇÃO ELEGANTE PARA A SEÇÃO DE ESPECIALIDADES + TRÊS DIFERENCIAIS REAIS */}
      <div className="relative z-10 w-full bg-gradient-to-t from-[#FDFBF7] via-[#F8F1E5]/95 to-[#F8F1E5]/75 border-t border-marrom/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 md:py-7">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
            <div className="hero-diff-item flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-creme-100 flex items-center justify-center text-terracota border border-terracota/25 shrink-0 shadow-2xs">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-base sm:text-lg font-medium text-marrom leading-tight">
                  Feito com amor
                </h4>
                <p className="text-xs text-marrom/75 font-sans mt-0.5">
                  Cuidado artesanal em cada etapa da receita
                </p>
              </div>
            </div>

            <div className="hero-diff-item flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-creme-100 flex items-center justify-center text-terracota border border-terracota/25 shrink-0 shadow-2xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-base sm:text-lg font-medium text-marrom leading-tight">
                  Ingredientes selecionados
                </h4>
                <p className="text-xs text-marrom/75 font-sans mt-0.5">
                  Frescor absoluto e padrão gourmet rigoroso
                </p>
              </div>
            </div>

            <div className="hero-diff-item flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-creme-100 flex items-center justify-center text-terracota border border-terracota/25 shrink-0 shadow-2xs">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-base sm:text-lg font-medium text-marrom leading-tight">
                  Delivery cuidadoso
                </h4>
                <p className="text-xs text-marrom/75 font-sans mt-0.5">
                  Embalagem especial para saborear quentinho
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
