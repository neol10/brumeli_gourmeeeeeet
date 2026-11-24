"use client";

import Image from "next/image";
import { brandConfig } from "../data/brand";

export default function Sobre() {
  return (
    <section id="sobre" className="py-20 md:py-32 bg-creme-100 relative overflow-hidden scroll-mt-24 md:scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Cabeçalho Editorial Superior */}
        <div className="mb-12 md:mb-16">
          <span className="text-xs font-sans tracking-[0.2em] uppercase font-semibold text-terracota block mb-2">
            Nossa Essência
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-marrom leading-[0.98]">
            A história por trás do sabor.
          </h2>
        </div>

        {/* Composição em Três Áreas — Inspirada na Seção "Our Story" da Referência */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-marrom/15">
          
          {/* 1. ESQUERDA: Fundo Marrom Profundo com Texto em Creme */}
          <div className="lg:col-span-5 bg-marrom text-creme-100 p-8 sm:p-12 md:p-14 flex flex-col justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-dourado-light font-sans font-medium block mb-4">
                Origem & Afeto
              </span>
              
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.05] text-creme-100 mb-6 whitespace-pre-line">
                {brandConfig.about.title}
              </h3>

              <p className="text-sm sm:text-base text-creme-200/85 font-sans font-light leading-relaxed mb-6">
                {brandConfig.about.text}
              </p>
            </div>

            <div className="pt-8 border-t border-creme-100/15">
              <span className="text-xs uppercase tracking-wider text-creme-200/60 font-sans block mb-1">
                Direção Gastronômica
              </span>
              <p className="font-serif italic text-xl text-dourado-light font-medium">
                Tailise Brun
              </p>
            </div>
          </div>

          {/* 2. CENTRO: Fotografia Real do Estabelecimento / Experiência */}
          <div className="lg:col-span-4 relative min-h-[380px] sm:min-h-[460px] lg:min-h-full">
            <Image
              src="/images/ambiente-brumeli.webp"
              alt="Ambiente e acolhimento da Brumeli Gourmet"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-center"
            />
            {/* Overlay sutil para manter coesão cromática */}
            <div className="absolute inset-0 bg-marrom-deep/15 pointer-events-none" />
            
            <div className="absolute bottom-6 left-6 right-6 bg-marrom/80 backdrop-blur-md p-3.5 rounded-xl border border-white/20 text-creme-100 text-center">
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-dourado-light font-medium block">
                Nosso Espaço
              </span>
              <span className="font-serif text-sm italic">
                Acolhimento & Experiências
              </span>
            </div>
          </div>

          {/* 3. DIREITA: Fundo Bege com Frase Editorial da Marca */}
          <div className="lg:col-span-3 bg-bege text-marrom p-8 sm:p-10 md:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-marrom/10">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-terracota font-sans font-semibold block mb-4">
                Filosofia
              </span>

              <blockquote className="font-serif italic text-2xl sm:text-3xl text-marrom font-medium leading-tight mb-6">
                &ldquo;{brandConfig.about.quote}&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-marrom/75 font-sans leading-relaxed">
                Cada prato é elaborado de forma minuciosa, desde o ponto exato da batata assada até os recheios generosos e aromáticos.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-marrom/15 flex items-center gap-3">
              <div className="w-8 h-[1px] bg-terracota" />
              <span className="text-xs font-sans uppercase tracking-[0.16em] text-terracota font-semibold">
                Brumeli Gourmet
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
