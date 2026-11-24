"use client";

import { useState } from "react";
import Image from "next/image";
import { menuCategories, torreBatataConfig, MenuItem } from "../data/menu";
import { brandConfig } from "../data/brand";
import { Download, ArrowUpRight, MessageCircle } from "lucide-react";

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
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        
        {/* Cabeçalho Editorial da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-sans tracking-[0.25em] uppercase font-semibold text-terracota block mb-2.5">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-sans font-medium tracking-wider uppercase border border-marrom/25 text-marrom hover:bg-marrom hover:text-creme-100 transition-all duration-300 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar cardápio original (PDF)</span>
            </a>
          </div>
        </div>

        {/* Navegação Editorial entre Categorias — Estilo Bistrô Sofisticado */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 no-scrollbar gap-1.5 sm:gap-2 px-1">
          {menuCategories.map((category) => {
            const isActive = category.id === activeCategoryId;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`whitespace-nowrap px-4 sm:px-5 py-2.5 rounded-md text-xs sm:text-sm font-sans tracking-wide transition-all duration-300 focus:outline-none relative border ${
                  isActive
                    ? "bg-[#241810] text-[#FFF3E2] border-[#D7AB7C]/40 shadow-sm font-medium"
                    : "bg-transparent border-marrom/15 text-marrom/85 hover:border-marrom/40 hover:text-marrom hover:bg-marrom/5"
                }`}
              >
                {isActive && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D7AB7C] mr-2 -translate-y-0.5" />
                )}
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Faixa Editorial da Categoria Ativa com Fotografia Gastronômica */}
        <div className="mb-8 p-5 sm:p-6 rounded-lg bg-[#38251B] border border-[#D7AB7C]/20 text-[#FFF3E2] flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-[0_4px_20px_rgba(36,24,16,0.15)]">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D7AB7C] font-sans font-semibold block mb-1">
              Seleção do Bistrô
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF3E2] font-medium tracking-tight">
              {activeCategory.name}
            </h3>
            <p className="text-xs sm:text-sm font-sans text-[#FFF3E2]/80 mt-1 italic leading-relaxed">
              {activeCategory.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3.5 sm:gap-4 shrink-0">
            {activeCategory.image && (
              <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-md overflow-hidden border border-[#D7AB7C]/30 shadow-inner shrink-0">
                <Image
                  src={activeCategory.image}
                  alt={activeCategory.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="text-left md:text-right">
              <span className="text-[11px] uppercase tracking-wider text-[#D7AB7C] font-sans font-semibold block">
                {activeCategory.id === "torre" ? "Personalize sua Torre" : `${activeCategory.items.length} opções`}
              </span>
              <span className="text-[10px] text-[#FFF3E2]/60 font-sans block mt-0.5">
                Ingredientes selecionados
              </span>
            </div>
          </div>
        </div>

        {/* Container com Transição Fluida entre Categorias */}
        <div key={contentKey} className="transition-all duration-300 ease-out animate-[fadeIn_0.35s_ease-out]">
          
          {/* Visualização Especial: Torre de Batata */}
          {activeCategoryId === "torre" ? (
            <div className="bistro-card rounded-lg p-6 sm:p-8 md:p-10 text-[#FFF3E2]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Lado Esquerdo: Seletor Interativo de Peso e Sabor */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  
                  {/* 1. Escolha do Peso */}
                  <div>
                    <label className="text-xs font-sans tracking-[0.16em] uppercase font-semibold text-[#D7AB7C] block mb-3">
                      1. Escolha o Tamanho da Torre
                    </label>
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                      {torreBatataConfig.weights.map((w) => {
                        const isWeightSelected = torreWeight === w.id;
                        return (
                          <button
                            key={w.id}
                            onClick={() => setTorreWeight(w.id)}
                            className={`p-3.5 sm:p-4 rounded-md border text-left transition-all duration-200 focus:outline-none ${
                              isWeightSelected
                                ? "bg-[#241810] border-[#D7AB7C] text-[#FFF3E2] shadow-sm"
                                : "bg-[#241810]/50 border-[#D7AB7C]/20 text-[#FFF3E2]/80 hover:border-[#D7AB7C]/50"
                            }`}
                          >
                            <span className="font-serif text-xl sm:text-2xl font-semibold block leading-none mb-1 text-[#D7AB7C]">
                              {w.id}
                            </span>
                            <span className={`text-[11px] block font-sans ${isWeightSelected ? "text-[#FFF3E2]" : "text-[#FFF3E2]/65"}`}>
                              {w.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Escolha do Sabor */}
                  <div>
                    <label className="text-xs font-sans tracking-[0.16em] uppercase font-semibold text-[#D7AB7C] block mb-3">
                      2. Escolha o Sabor do Recheio
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                      {torreBatataConfig.flavors.map((f) => {
                        const isFlavorSelected = torreFlavor === f.id;
                        return (
                          <button
                            key={f.id}
                            onClick={() => setTorreFlavor(f.id)}
                            className={`p-3 sm:p-3.5 rounded-md border text-center transition-all duration-200 focus:outline-none ${
                              isFlavorSelected
                                ? "bg-[#241810] border-[#D7AB7C] text-[#FFF3E2] shadow-sm font-semibold"
                                : "bg-[#241810]/50 border-[#D7AB7C]/20 text-[#FFF3E2]/80 hover:border-[#D7AB7C]/50"
                            }`}
                          >
                            <span className="font-serif text-base sm:text-lg font-medium block leading-none">
                              {f.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Descrição do sabor escolhido */}
                  <div className="p-4 rounded-md bg-[#241810]/60 border border-[#D7AB7C]/25">
                    <span className="text-xs font-semibold text-[#D7AB7C] block mb-1">
                      Composição do sabor {currentTorreFlavorInfo?.name}:
                    </span>
                    <p className="text-xs sm:text-sm text-[#FFF3E2]/85 leading-relaxed font-sans">
                      {currentTorreFlavorInfo?.description}
                    </p>
                  </div>

                </div>

                {/* Lado Direito: Resumo Dinâmico da Torre & Preço */}
                <div className="lg:col-span-5 bg-[#241810] text-[#FFF3E2] rounded-md p-6 sm:p-7 flex flex-col justify-between h-full border border-[#D7AB7C]/30 shadow-md">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D7AB7C] font-sans font-semibold block mb-1.5">
                      Sua Combinação
                    </span>
                    <h4 className="font-serif text-2xl sm:text-3xl font-medium leading-tight mb-1 text-[#FFF3E2]">
                      Torre de Batata {currentTorreFlavorInfo?.name}
                    </h4>
                    <p className="text-xs text-[#FFF3E2]/75 font-sans mb-6">
                      Tamanho: {torreWeight} · Recheio farto e queijo derretido
                    </p>
                  </div>

                  <div className="pt-5 border-t border-[#D7AB7C]/20">
                    <div className="flex items-baseline justify-between mb-5">
                      <span className="text-xs uppercase tracking-wider text-[#FFF3E2]/70 font-sans">
                        Valor Total:
                      </span>
                      <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#D7AB7C] tracking-tight">
                        R$ {currentTorrePrice.toFixed(2).replace(".", ",")}
                      </span>
                    </div>

                    <a
                      href={getTorreWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-md text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase bg-[#FFF3E2] text-[#241810] hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <MessageCircle className="w-4 h-4 fill-[#241810]/15" />
                      <span>Fazer pedido</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                </div>

              </div>
            </div>
          ) : (
            /* Grid de Cards Gastronômicos — Estilo Bistrô em Marrom Chocolate */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {activeCategory.items.map((item) => (
                <div
                  key={item.id}
                  className="bistro-card group relative p-5 sm:p-6 rounded-lg text-[#FFF3E2] transition-all duration-300 ease-out flex flex-col justify-between"
                >
                  <div>
                    {/* 1. Nome do Produto */}
                    <div className="mb-2">
                      <h4 className="font-serif text-2xl sm:text-[1.65rem] text-[#FFF3E2] font-medium leading-snug tracking-tight group-hover:text-[#D7AB7C] transition-colors">
                        {item.name}
                      </h4>
                    </div>

                    {/* 2. Ingredientes com Excelente Legibilidade */}
                    {item.description && (
                      <p className="text-xs sm:text-sm text-[#FFF3E2]/85 font-sans leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    {/* Variações e opções disponíveis */}
                    {item.options && item.options.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.options.map((opt) => (
                          <span
                            key={opt}
                            className="inline-block px-2 py-0.5 rounded text-[10px] font-sans font-medium bg-[#241810]/70 text-[#D7AB7C] border border-[#D7AB7C]/25"
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    {/* 3. Divisor Delicado */}
                    <div className="h-[1px] bg-gradient-to-r from-[#D7AB7C]/30 via-[#D7AB7C]/15 to-transparent my-4" />

                    {/* 4. Preço em Destaque Caramelo & 5. Botão de Pedido */}
                    <div className="flex items-center justify-between gap-3">
                      {/* Preço direto em caramelo, sem cápsula */}
                      <div>
                        {item.formattedPrice ? (
                          <span className="font-serif text-2xl sm:text-[1.85rem] font-semibold text-[#D7AB7C] tracking-tight whitespace-nowrap leading-none block">
                            {item.formattedPrice}
                          </span>
                        ) : (
                          <span className="text-xs text-[#FFF3E2]/60 font-sans italic">
                            Consulte opções
                          </span>
                        )}
                      </div>

                      {/* Botão de pedido em creme com texto marrom profundo */}
                      <a
                        href={getItemWhatsAppLink(item, activeCategory.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs sm:text-sm font-sans font-semibold text-[#241810] bg-[#FFF3E2] hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 shrink-0 whitespace-nowrap"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-[#241810]/15" />
                        <span>Fazer pedido</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
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
