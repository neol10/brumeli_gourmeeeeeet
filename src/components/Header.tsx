"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { brandConfig } from "../data/brand";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#hero" },
    { name: "Especialidades", href: "#especialidades" },
    { name: "Cardápio", href: "#cardapio" },
    { name: "Sobre nós", href: "#sobre" },
    { name: "Galeria", href: "#galeria" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-[#F8F1E5] py-3 shadow-[0_4px_20px_rgba(48,34,24,0.08)] border-b border-marrom/10"
            : "bg-transparent py-5 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo oficial */}
          <Link
            href="#hero"
            className="flex items-center gap-3.5 group focus:outline-none shrink-0"
            aria-label="Brumeli Gourmet"
          >
            <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden border border-marrom/15 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.webp"
                alt="Logo Brumeli Gourmet"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl md:text-[1.75rem] font-medium tracking-tight text-marrom leading-none">
                BRUMELI
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-marrom/70 font-sans font-medium mt-1">
                Gourmet & Experiências
              </span>
            </div>
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-sans tracking-[0.14em] uppercase text-marrom/80 hover:text-terracota transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-terracota hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a
              href={brandConfig.social.pedidosLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans font-medium tracking-wider uppercase bg-marrom text-creme-100 hover:bg-terracota transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap animate-shimmer-sweep"
            >
              <span>Fazer pedido</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Botão Mobile/Tablet */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-marrom hover:text-terracota focus:outline-none"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Menu Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[110] bg-marrom-deep/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 z-[120] w-[80%] max-w-sm bg-creme-100 p-8 shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-marrom/10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-marrom/20">
                <Image
                  src="/images/logo.webp"
                  alt="Logo Brumeli Gourmet"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <span className="font-serif text-xl font-medium tracking-tight text-marrom">
                BRUMELI
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-marrom hover:text-terracota"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-5 mt-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl text-marrom hover:text-terracota transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-8 border-t border-marrom/10 flex flex-col gap-4">
          <a
            href={brandConfig.social.pedidosLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-sans font-medium tracking-wider uppercase bg-terracota text-creme-100"
          >
            <span>Fazer pedido</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <p className="text-center text-xs text-marrom/60 italic font-serif">
            {brandConfig.fullTagline}
          </p>
        </div>
      </div>
    </>
  );
}
