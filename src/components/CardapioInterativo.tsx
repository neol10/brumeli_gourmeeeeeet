"use client";

import { useState } from "react";
import Image from "next/image";
import { menuCategories, torreBatataConfig, MenuItem } from "../data/menu";
import { brandConfig } from "../data/brand";
import { Download, ArrowUpRight, Sparkles, MessageCircle } from "lucide-react";

export default function CardapioInterativo() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("batatas");

  // Estados para o seletor da Torre de Batatas
  const [torreWeight, setTorreWeight] = useState<"400g" | "700g" | "1kg">("700g");
  const [torreFlavor, setTorreFlavor] = useState<"frango" | "carne" | "mista" | "mexicano">("mista");

  const activeCategory = menuCategories.find((cat) => cat.id === activeCategoryId) || menuCategories[0];

  const currentTorrePrice = torreBatataConfig.prices[torreWeight][torreFlavor];
  const currentTorreFlavorInfo = torreBatataConfig.flavors.find((f) => f.id === torreFlavor);

  const getTorreWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Olá! Gostaria de pedir uma Torre de Batata:\n- Tamanho: ${torreWeight}\n- Sabor: ${currentTorreFlavorInfo?.name}\n- Valor: R$ ${currentTorrePrice.toFixed(2).replace(".", ",")}`
    );
    return `https://wa.me/${brandConfig.social.whatsapp || "5519996417576"}?text=${text}`;
  };

  const getItemWhatsAppLink = (item: MenuItem, categoryName: string) => {
    const priceText = item.formattedPrice ? ` (${item.formattedPrice})` : "";
    const text = encodeURIComponent(
      `Olá! Gostaria de pedir do cardápio Brumeli Gourmet:\n- Categoria: ${categoryName}\n- Item: ${item.name}${priceText}`
    );
    return `https://wa.me/${brandConfig.social.whatsapp || "5519996417576"}?text=${text}`;
  };

  // Efeito de transição suave ao alternar categoria
  const [contentKey, setContentKey] = useState<string>("batatas");

  const handleCategoryChange = (id: string) => {
    if (id === activeCategoryId) return;
    setActiveCategoryId(id);
    setContentKey(id);
  };

  return (
    <section id="cardapio" className="py-20 md:py-32 bg-creme-100 relative scroll-mt-24 md:scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Cabeçalho Editorial da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <span className="text-xs font-sans tracking-[0.2em] uppercase font-semibold text-terracota block mb-2">
            Cardápio Oficial
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-marrom leading-[0.98] mb-4">
            Nossas Escolhas & Receitas
          </h2>
          <p className="text-sm md:text-base text-marrom/85 font-sans leading-relaxed">
            Todas as nossas opções gastronômicas preparadas com carinho, ingredientes frescos e respeito à tradição artesanal.
          </p>

          {/* Botão de download do PDF original */}
          <div className="mt-6 flex justify-center">
            <a
              href="/cardapio-brumeli.pdf"
              download="cardapio-brumeli.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans font-medium tracking-wider uppercase border border-marrom/20 text-marrom hover:bg-marrom hover:text-creme-100 transition-all duration-300"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar cardápio original (PDF)</span>
            </a>
          </div>
        </div>

        {/* Navegação por Categorias com Alto Contraste Editorial e Borda Definida */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-12 no-scrollbar gap-2 sm:gap-2.5">
          {menuCategories.map((category) => {
            const isActive = category.id === activeCategoryId;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans tracking-wide transition-all duration-300 focus:outline-none relative group border ${
                  isActive
                    ? "bg-terracota text-white border-terracota shadow-md font-semibold scale-[1.02]"
                    : "bg-[#FFF9EF] border-[#C6AA90] text-marrom font-medium hover:border-terracota hover:text-terracota hover:bg-white hover:scale-[1.01]"
                }`}
              >
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-dourado-light animate-soft-dot" />
                )}
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Título e Subtítulo da Categoria Ativa */}
        <div className="border-b border-[#C6AA90]/60 pb-5 mb-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h3 className="font-serif text-3xl sm:text-4xl text-marrom font-medium tracking-tight">
              {activeCategory.name}
            </h3>
            <p className="text-xs sm:text-sm font-sans text-marrom/80 mt-1 italic">
              {activeCategory.subtitle}
            </p>
          </div>
          <span className="text-xs uppercase tracking-[0.18em] font-sans text-terracota font-semibold">
            {activeCategory.id === "torre" ? "Configurador Exclusivo" : `${activeCategory.items.length} opções disponíveis`}
          </span>
        </div>

        {/* Container com Transição Fluida de Entrada ao Alternar Categorias */}
        <div key={contentKey} className="transition-all duration-300 ease-out animate-[fadeIn_0.35s_ease-out]">
          
          {/* Visualização Especial: Torre de Batata */}
          {activeCategoryId === "torre" ? (
            <div className="bg-[#FFF9EF] rounded-lg p-6 sm:p-10 md:p-12 border border-[#C6AA90] border-l-4 border-l-terracota shadow-[0_4px_20px_rgba(48,34,24,0.06)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Lado Esquerdo: Seletor Interativo de Peso e Sabor */}
                <div className="lg:col-span-7 flex flex-col gap-7">
                  
                  {/* 1. Escolha do Peso */}
                  <div>
                    <label className="text-xs font-sans tracking-[0.16em] uppercase font-semibold text-terracota block mb-3">
                      1. Escolha o Tamanho da Torre
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {torreBatataConfig.weights.map((w) => (
                        <button
                          key={w.id}
                          onClick={() => setTorreWeight(w.id)}
                          className={`p-4 rounded-md border text-left transition-all duration-200 focus:outline-none ${
                            torreWeight === w.id
                              ? "border-terracota bg-terracota text-white shadow-sm font-medium"
                              : "border-[#C6AA90] bg-white text-marrom hover:border-terracota"
                          }`}
                        >
                          <span className="font-serif text-xl sm:text-2xl font-semibold block leading-none mb-1">
                            {w.id}
                          </span>
                          <span className={`text-[11px] block font-sans ${torreWeight === w.id ? "text-creme-100" : "text-marrom/75"}`}>
                            {w.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Escolha do Sabor */}
                  <div>
                    <label className="text-xs font-sans tracking-[0.16em] uppercase font-semibold text-terracota block mb-3">
                      2. Escolha o Sabor do Recheio
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {torreBatataConfig.flavors.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setTorreFlavor(f.id)}
                          className={`p-3.5 rounded-md border text-center transition-all duration-200 focus:outline-none ${
                            torreFlavor === f.id
                              ? "border-terracota bg-terracota text-white shadow-sm font-semibold"
                              : "border-[#C6AA90] bg-white text-marrom hover:border-terracota"
                          }`}
                        >
                          <span className="font-serif text-lg sm:text-xl font-medium block leading-none">
                            {f.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Descrição do sabor escolhido */}
                  <div className="p-4 rounded-md bg-creme-200/50 border border-[#C6AA90]/70">
                    <span className="text-xs font-semibold text-marrom block mb-1">
                      Composição do sabor {currentTorreFlavorInfo?.name}:
                    </span>
                    <p className="text-xs sm:text-sm text-marrom/90 leading-relaxed font-sans">
                      {currentTorreFlavorInfo?.description}
                    </p>
                  </div>

                </div>

                {/* Lado Direito: Resumo Dinâmico da Torre & Preço */}
                <div className="lg:col-span-5 bg-marrom text-creme-100 rounded-lg p-7 sm:p-8 flex flex-col justify-between h-full shadow-lg relative overflow-hidden border border-marrom-light">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-terracota/20 rounded-full blur-2xl pointer-events-none" />

                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-dourado-light font-sans font-medium block mb-2">
                      Sua Combinação
                    </span>
                    <h4 className="font-serif text-3xl font-medium leading-tight mb-1">
                      Torre de Batata {currentTorreFlavorInfo?.name}
                    </h4>
                    <p className="text-xs text-creme-200/85 font-sans mb-6">
                      Tamanho: {torreWeight} · Recheio farto e queijo especial
                    </p>
                  </div>

                  <div className="pt-6 border-t border-creme-100/15">
                    <div className="flex items-baseline justify-between mb-6">
                      <span className="text-xs uppercase tracking-wider text-creme-200/70 font-sans">
                        Valor Total:
                      </span>
                      <span className="font-serif text-3xl sm:text-4xl font-semibold text-dourado-light">
                        R$ {currentTorrePrice.toFixed(2).replace(".", ",")}
                      </span>
                    </div>

                    <a
                      href={getTorreWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-md text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase bg-terracota hover:bg-terracota-hover text-white transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <MessageCircle className="w-4 h-4 fill-current/20" />
                      <span>Pedir no WhatsApp</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                </div>

              </div>
            </div>
          ) : (
            /* Grid de Cards Gastronômicos Premium — Acabamento Editorial */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {activeCategory.items.map((item) => (
                <div
                  key={item.id}
                  className="group relative p-5 sm:p-6 rounded-lg bg-[#FFF9EF] border border-[#C6AA90] border-l-4 border-l-terracota transition-all duration-300 ease-out shadow-[0_4px_16px_rgba(48,34,24,0.06)] hover:border-terracota hover:border-l-4 hover:border-l-terracota hover:shadow-[0_10px_24px_-4px_rgba(135,61,29,0.14)] hover:-translate-y-[3px] flex flex-col justify-between"
                >
                  <div>
                    {/* Cabeçalho do Card: Nome e Preço em Destaque Direto */}
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h4 className="font-serif text-2xl sm:text-[1.65rem] text-marrom font-medium leading-snug tracking-tight group-hover:text-terracota transition-colors">
                        {item.name}
                      </h4>
                      {item.formattedPrice && (
                        <span className="font-serif text-2xl sm:text-3xl font-semibold text-terracota whitespace-nowrap tracking-tight leading-none shrink-0">
                          {item.formattedPrice}
                        </span>
                      )}
                    </div>

                    {/* Ingredientes com Escurecimento e Alta Legibilidade */}
                    {item.description && (
                      <p className="text-xs sm:text-sm text-marrom/90 font-sans leading-relaxed mt-1.5">
                        {item.description}
                      </p>
                    )}

                    {/* Variações e opções disponíveis */}
                    {item.options && item.options.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.options.map((opt) => (
                          <span
                            key={opt}
                            className="inline-block px-2.5 py-0.5 rounded text-[10px] font-sans font-medium bg-creme-200/90 text-marrom border border-[#C6AA90]/70"
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Rodapé do Card: Selo e Botão Sólido Terracota */}
                  <div className="mt-5 pt-3.5 border-t border-[#C6AA90]/40 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-marrom/70 font-sans font-medium">
                      <Sparkles className="w-3 h-3 text-terracota" />
                      Artesanal Brumeli
                    </span>
                    <a
                      href={getItemWhatsAppLink(item, activeCategory.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-sans font-semibold text-white bg-terracota hover:bg-terracota-hover transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current/20" />
                      <span>Pedir no WhatsApp</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
