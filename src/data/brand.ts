export interface BrandConfig {
  name: string;
  tagline: string;
  founder: string;
  fullTagline: string;
  description: string;
  heroHeadline: {
    main: string;
    highlight: string;
  };
  heroSubtitle: string;
  heroText: string;
  about: {
    title: string;
    text: string;
    quote: string;
  };
  social: {
    instagram: string;
    instagramHandle: string;
    whatsapp?: string;
    whatsappFormatted?: string;
    pedidosLink: string;
    pedidosText: string;
  };
  address?: string;
  hours?: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

export const brandConfig: BrandConfig = {
  name: "BRUMELI",
  tagline: "Gourmet Deliveries & Experiências",
  founder: "Tailise Brun",
  fullTagline: "Sua dose de felicidade.",
  description: "Batatas recheadas artesanais, bolos, sobremesas e momentos feitos especialmente para você.",
  heroHeadline: {
    main: "Sua dose de",
    highlight: "felicidade.",
  },
  heroSubtitle: "Mais que uma batata, uma experiência.",
  heroText: "Sabores especiais, ingredientes selecionados e momentos feitos para você.",
  about: {
    title: "Feito com amor.\nPensado para você.",
    text: "Na Brumeli, cada sabor é um convite para viver uma experiência especial. Ingredientes selecionados, carinho no preparo e combinações que tornam cada momento único.",
    quote: "Mais que uma batata, uma experiência.",
  },
  social: {
    instagram: "https://www.instagram.com/brumeligourmet/",
    instagramHandle: "@brumeligourmet",
    whatsapp: "5519996417576",
    whatsappFormatted: "(19) 99641-7576",
    pedidosLink: "https://wa.me/5519996417576?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido%20na%20Brumeli%20Gourmet!",
    pedidosText: "Fazer pedido via WhatsApp",
  },
  address: "Atendimento & Deliveries Gourmet",
  hours: "Consulte horários e disponibilidade no WhatsApp",
  features: [
    {
      title: "Produzido com amor",
      description: "Preparo artesanal e carinho em cada detalhe de cada receita.",
      icon: "Heart",
    },
    {
      title: "Ingredientes selecionados",
      description: "Matérias-primas frescas e fornecedores de altíssima qualidade.",
      icon: "Sparkles",
    },
    {
      title: "Delivery impecável",
      description: "Embalagens térmicas especiais para chegar quente e crocante.",
      icon: "Truck",
    },
    {
      title: "Experiências que encantam",
      description: "Combinações gastronômicas exclusivas pensadas para o seu momento.",
      icon: "Award",
    },
  ],
};
