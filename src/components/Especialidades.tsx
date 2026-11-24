"use client";

import Image from "next/image";
import Link from "next/link";
import { especialidadesDestaque } from "../data/menu";
import { ArrowUpRight } from "lucide-react";

export default function Especialidades() {
  return (
    <section
      id="especialidades"
      className="py-20 md:py-28 bg-creme-50 relative border-t border-marrom/10 scroll-mt-24 md:scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Cabeçalho da seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <span className="text-xs font-sans tracking-[0.2em] uppercase font-semibold text-terracota block mb-2">
              Nossas Especialidades
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-marrom leading-[0.98]">
              Sabores que conquistam.
            </h2>
          </div>
          <p className="text-sm md:text-base text-marrom/70 font-sans max-w-md leading-relaxed">
            Cada criação nasce da paixão pela boa mesa, com combinações autorais e os melhores ingredientes em cada receita.
          </p>
        </div>

        {/* Grid de Especialidades — Inspirado na Composição da Referência */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {especialidadesDestaque.map((item) => (
            <div
              key={item.id}
              className="group relative h-[440px] sm:h-[480px] rounded-2xl overflow-hidden shadow-card border border-marrom/10 flex flex-col justify-end transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Fotografia real com efeito de zoom sutil no hover */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Degradê escuro sobreposto para garantir legibilidade impecável */}
              <div className="absolute inset-0 bg-gradient-to-t from-marrom-deep via-marrom-deep/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Tag de Categoria flutuante no topo */}
              <div className="absolute top-5 left-5 z-10">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-sans font-medium bg-creme-100/90 text-marrom backdrop-blur-sm shadow-sm">
                  {item.category}
                </span>
              </div>

              {/* Informações sobrepostas na parte inferior com tipografia editorial */}
              <div className="relative z-10 p-6 flex flex-col justify-end text-creme-100">
                <span className="text-[11px] uppercase tracking-wider text-dourado-light font-sans font-medium block mb-1">
                  {item.priceRange}
                </span>
                
                <h3 className="font-serif text-2xl font-medium leading-tight text-creme-100 mb-2">
                  {item.title}
                </h3>
                
                <p className="text-xs font-sans text-creme-200/90 leading-relaxed mb-4">
                  {item.description}
                </p>

                <Link
                  href="#cardapio"
                  className="inline-flex items-center gap-2 text-xs font-sans font-medium tracking-wider uppercase text-creme-100/90 group-hover:text-dourado-light transition-colors pt-2 border-t border-creme-100/15"
                >
                  <span>{item.ctaLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* CTA para o Cardápio Completo */}
        <div className="mt-14 text-center">
          <Link
            href="#cardapio"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs sm:text-sm font-sans font-medium tracking-wider uppercase bg-marrom text-creme-100 hover:bg-terracota transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <span>Ver cardápio completo</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
