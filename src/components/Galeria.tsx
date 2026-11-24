"use client";

import Image from "next/image";
import { galeriaGastronomica } from "../data/menu";

export default function Galeria() {
  return (
    <section id="galeria" className="py-20 md:py-32 bg-creme-50 relative border-t border-marrom/10 scroll-mt-24 md:scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <span className="text-xs font-sans tracking-[0.2em] uppercase font-semibold text-terracota block mb-2">
              Galeria Visual
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-marrom leading-[0.98]">
              Momentos que despertam o apetite.
            </h2>
          </div>
          <p className="text-sm md:text-base text-marrom/70 font-sans max-w-md leading-relaxed">
            Um olhar atento sobre a apresentação primorosa dos nossos bolos festivos, sobremesas e batatas gourmet.
          </p>
        </div>

        {/* Grid Editorial Assimétrico de Fotografias Reais com Altura Garantida */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {galeriaGastronomica.map((item, idx) => {
            // Definir proporções e larguras de coluna sofisticadas
            const isWide = idx === 0 || idx === 6;
            const colClass = isWide ? "md:col-span-7 h-[300px] sm:h-[380px] md:h-[440px]" : "md:col-span-5 h-[300px] sm:h-[380px] md:h-[440px]";
            const threeColClass = (idx >= 2 && idx <= 4) ? "md:col-span-4 h-[280px] sm:h-[340px] md:h-[380px]" : colClass;

            return (
              <div
                key={item.id}
                className={`relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-card border border-marrom/10 group ${threeColClass}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Degradê e Legenda Flutuante */}
                <div className="absolute inset-0 bg-gradient-to-t from-marrom-deep/85 via-marrom-deep/30 to-transparent opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-dourado-light font-semibold block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl text-creme-100 font-medium leading-tight">
                    {item.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
