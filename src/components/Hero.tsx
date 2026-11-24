"use client";

import Image from "next/image";
import Link from "next/link";
import { brandConfig } from "../data/brand";
import { ArrowDown, ArrowUpRight, Heart, Sparkles, Truck } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 md:pt-32 pb-16 md:pb-20 flex flex-col justify-between overflow-hidden bg-creme-100"
    >
      {/* Background decorativo sutil com transição orgânica */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glow suave no topo */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#FAF3E8] blur-3xl opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Lado Esquerdo: Área Editorial */}
          <div className="lg:col-span-6 z-10 flex flex-col justify-center">
            
            {/* Tagline superior */}
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
              <span className="w-8 h-[1px] bg-terracota" />
              <span className="text-xs md:text-sm font-sans tracking-[0.2em] uppercase font-semibold text-terracota">
                {brandConfig.heroSubtitle}
              </span>
            </div>

            {/* Título Principal Editorial */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-medium tracking-tight text-marrom leading-[0.94] mb-6 md:mb-8">
              {brandConfig.heroHeadline.main} <br />
              <span className="font-serif italic font-normal text-terracota">
                {brandConfig.heroHeadline.highlight}
              </span>
            </h1>

            {/* Parágrafo de apoio */}
            <p className="text-base sm:text-lg md:text-xl text-marrom/80 font-sans font-light max-w-xl leading-relaxed mb-8 md:mb-10">
              {brandConfig.heroText}
            </p>

            {/* Ações / Botões com Microinterações e Shimmer */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-10 md:mb-12">
              <Link
                href="#cardapio"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs sm:text-sm font-sans font-medium tracking-wider uppercase bg-marrom text-creme-100 hover:bg-terracota transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
              >
                Explorar cardápio
              </Link>

              <a
                href={brandConfig.social.pedidosLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-sans font-medium tracking-wider uppercase bg-terracota text-creme-100 hover:bg-terracota-hover transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 animate-pulse-glow animate-shimmer-sweep"
              >
                <span>Fazer pedido</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Assinatura sutil da fundadora com indicador suave */}
            <div className="flex items-center gap-3 pt-4 border-t border-marrom/10 max-w-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracota opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-terracota" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-marrom/60 font-medium">
                Criações autorais
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-terracota" />
              <span className="text-sm font-serif italic text-marrom font-medium">
                By {brandConfig.founder}
              </span>
            </div>
          </div>

          {/* Lado Direito: Composição Fotográfica Imersiva com transição natural */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] sm:aspect-[14/11] lg:aspect-[1/1] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-marrom/10 group">
              
              {/* Imagem real gastronômica com enquadramento nobre */}
              <Image
                src="/images/batata-recheada-1.webp"
                alt="Batata Recheada Especial Brumeli Gourmet"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Transição orgânica suave no lado esquerdo em telas grandes (sem corte duro) */}
              <div className="hidden lg:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-creme-100/70 via-creme-100/20 to-transparent pointer-events-none" />

              {/* Gradiente sutil na base da foto para sobrepor selo editorial */}
              <div className="absolute inset-0 bg-gradient-to-t from-marrom-deep/70 via-transparent to-transparent pointer-events-none" />

              {/* Card sobreposto na foto com Levitação Orgânica Delicada (Breathing) */}
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7 bg-creme-100/95 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-white/50 shadow-xl flex items-center justify-between animate-breathing">
                <div>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-terracota block mb-0.5">
                    Destaque da Casa
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-marrom leading-tight">
                    Batata Recheada Tradicional
                  </h3>
                  <p className="text-xs text-marrom/70 font-sans mt-0.5 hidden sm:block">
                    Cozimento perfeito, casca dourada e recheio farto
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase tracking-wider text-marrom/60 block">
                    A partir de
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-semibold text-terracota whitespace-nowrap">
                    R$ 19,90
                  </span>
                </div>
              </div>

              {/* Suporte futuro preparado para vídeo desktop/mobile (oculto até vídeo estar disponível) */}
              <div className="hidden" aria-hidden="true">
                <video muted loop playsInline />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Região Inferior do Hero: Três Diferenciais Reais */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full mt-12 md:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-marrom/15">
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-creme-200/80 flex items-center justify-center text-terracota border border-terracota/20 shrink-0">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg font-medium text-marrom leading-tight">
                Feito com amor
              </h4>
              <p className="text-xs text-marrom/70 font-sans mt-0.5">
                Cuidado artesanal em cada etapa da receita
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-creme-200/80 flex items-center justify-center text-terracota border border-terracota/20 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg font-medium text-marrom leading-tight">
                Ingredientes selecionados
              </h4>
              <p className="text-xs text-marrom/70 font-sans mt-0.5">
                Frescor absoluto e padrão gourmet rigoroso
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-creme-200/80 flex items-center justify-center text-terracota border border-terracota/20 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg font-medium text-marrom leading-tight">
                Delivery cuidadoso
              </h4>
              <p className="text-xs text-marrom/70 font-sans mt-0.5">
                Embalagem especial para saborear quentinho
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
