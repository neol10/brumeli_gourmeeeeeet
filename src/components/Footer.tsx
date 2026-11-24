"use client";

import Image from "next/image";
import Link from "next/link";
import { brandConfig } from "../data/brand";
import { ArrowUpRight } from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-marrom-deep text-creme-100 border-t border-marrom-light/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-creme-100/10 items-start">
          
          {/* Coluna 1: Identidade da Marca */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-creme-100/20">
                <Image
                  src="/images/logo.webp"
                  alt="Logo Brumeli Gourmet"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-medium tracking-tight text-creme-100 leading-none">
                  BRUMELI
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-dourado-light font-sans font-medium mt-1">
                  Gourmet & Experiências
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-creme-200/70 font-sans max-w-sm leading-relaxed mt-2">
              &ldquo;{brandConfig.fullTagline}&rdquo; — Batatas recheadas artesanais, confeitaria de autor e momentos gastronômicos especiais por {brandConfig.founder}.
            </p>

            <div className="pt-2">
              <a
                href={brandConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-dourado-light hover:text-creme-100 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Seguir no Instagram {brandConfig.social.instagramHandle}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-dourado-light block mb-2">
              Navegação
            </span>
            <Link href="#hero" className="text-xs sm:text-sm text-creme-200/75 hover:text-creme-100 transition-colors">
              Início
            </Link>
            <Link href="#especialidades" className="text-xs sm:text-sm text-creme-200/75 hover:text-creme-100 transition-colors">
              Especialidades
            </Link>
            <Link href="#cardapio" className="text-xs sm:text-sm text-creme-200/75 hover:text-creme-100 transition-colors">
              Cardápio Digital
            </Link>
            <Link href="#sobre" className="text-xs sm:text-sm text-creme-200/75 hover:text-creme-100 transition-colors">
              Sobre a Brumeli
            </Link>
            <Link href="#galeria" className="text-xs sm:text-sm text-creme-200/75 hover:text-creme-100 transition-colors">
              Galeria Visual
            </Link>
          </div>

          {/* Coluna 3: Pedidos & Informações */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-dourado-light block mb-2">
              Pedidos & Informações
            </span>
            <p className="text-xs sm:text-sm text-creme-200/75 leading-relaxed">
              Pedidos realizados diretamente através do direct oficial no Instagram para atendimento ágil e personalizado.
            </p>
            <div className="pt-2">
              <a
                href={brandConfig.social.pedidosLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans font-medium uppercase tracking-wider bg-terracota hover:bg-terracota-hover text-creme-100 transition-colors"
              >
                <span>Fazer pedido agora</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="mt-2 text-[11px] text-creme-200/50">
              <a href="/cardapio-brumeli.pdf" download="cardapio-brumeli.pdf" className="underline hover:text-creme-100 transition-colors">
                Download do Cardápio em PDF
              </a>
            </div>
          </div>

        </div>

        {/* Rodapé Inferior: Copyright e Assinatura NEWNEO */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-creme-200/60 font-sans">
          <p>
            &copy; {currentYear} Brumeli Gourmet — Todos os direitos reservados.
          </p>

          <p className="flex items-center gap-1.5">
            <span>Desenvolvido por</span>
            <a
              href="https://newneo.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dourado-light hover:text-creme-100 underline underline-offset-4 transition-colors font-medium"
            >
              NEWNEO
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
