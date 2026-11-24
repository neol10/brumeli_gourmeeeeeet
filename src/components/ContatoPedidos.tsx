"use client";

import Image from "next/image";
import { brandConfig } from "../data/brand";
import { ArrowUpRight, Clock, MapPin, MessageCircle } from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function ContatoPedidos() {
  return (
    <section id="contato" className="py-20 md:py-28 bg-creme-100 relative">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="bg-marrom text-creme-100 rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden border border-marrom-light">
          
          {/* Elementos decorativos de iluminação editorial */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-terracota/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-dourado/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Logo oficial em destaque */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-dourado/40 shadow-md mb-6">
              <Image
                src="/images/logo.webp"
                alt="Logo Brumeli Gourmet"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>

            <span className="text-xs font-sans tracking-[0.25em] uppercase text-dourado-light font-medium block mb-2">
              Atendimento & Deliveries
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-creme-100 max-w-xl mb-4 leading-tight">
              Pronto para saborear a sua dose de felicidade?
            </h2>

            <p className="text-sm sm:text-base text-creme-200/80 font-sans font-light max-w-lg mb-8 leading-relaxed">
              Atendemos diretamente pelo nosso WhatsApp oficial. Envie sua mensagem, tire dúvidas sobre o cardápio e faça seu pedido com rapidez e atenção.
            </p>

            {/* Ações de Contato Direto com Pulso e Shimmer */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <a
                href={brandConfig.social.pedidosLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase bg-terracota hover:bg-terracota-hover text-creme-100 transition-all duration-300 shadow-xl transform hover:-translate-y-1 active:translate-y-0 animate-pulse-glow animate-shimmer-sweep"
              >
                <MessageCircle className="w-5 h-5 fill-current/20" />
                <span>Pedir no WhatsApp {brandConfig.social.whatsappFormatted}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={brandConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-xs sm:text-sm font-sans font-medium tracking-wider uppercase bg-creme-100/10 hover:bg-creme-100/20 text-creme-100 border border-creme-100/20 transition-all duration-300"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram {brandConfig.social.instagramHandle}</span>
              </a>
            </div>

            {/* Detalhes de Atendimento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-creme-100/15 w-full max-w-md text-left">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-dourado-light shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-creme-200/60 block font-medium">
                    Horários & Funcionamento
                  </span>
                  <span className="text-xs text-creme-100/85 font-sans">
                    {brandConfig.hours}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-dourado-light shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-creme-200/60 block font-medium">
                    Formato de Pedido
                  </span>
                  <span className="text-xs text-creme-100/85 font-sans">
                    Delivery Gourmet & Retirada
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
