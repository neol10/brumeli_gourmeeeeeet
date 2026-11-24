export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  formattedPrice?: string;
  image?: string;
  badge?: string;
  options?: string[];
}

export interface TorreOption {
  weight: "400g" | "700g" | "1kg";
  label: string;
  flavors: {
    frango: number;
    carne: number;
    mista: number;
    mexicano: number;
  };
}

export interface MenuCategory {
  id: string;
  name: string;
  subtitle: string;
  description?: string;
  image?: string;
  items: MenuItem[];
}

export const torreBatataConfig: {
  weights: Array<{ id: "400g" | "700g" | "1kg"; label: string; description: string }>;
  flavors: Array<{ id: "frango" | "carne" | "mista" | "mexicano"; name: string; description: string }>;
  prices: Record<"400g" | "700g" | "1kg", Record<"frango" | "carne" | "mista" | "mexicano", number>>;
} = {
  weights: [
    { id: "400g", label: "400 Gramas", description: "Porção individual generosa ou para compartilhar a dois" },
    { id: "700g", label: "700 Gramas", description: "Perfeita para compartilhar momentos a dois ou três" },
    { id: "1kg", label: "1 Quilo", description: "Tamanho família, fartura e sabor para comemorar" },
  ],
  flavors: [
    { id: "frango", name: "Frango", description: "Batata frita crocante em torre, frango desfiado suculento, queijo derretido e molho especial" },
    { id: "carne", name: "Carne", description: "Batata frita crocante em torre, carne de primeira selecionada, queijo e tempero exclusivo" },
    { id: "mista", name: "Mista", description: "O melhor dos dois mundos: combinação harmônica de carne e frango com cobertura de queijo" },
    { id: "mexicano", name: "Mexicano", description: "Carne moída temperada artesanal, cheddar cremoso, doritos crocantes e toque especial" },
  ],
  prices: {
    "400g": {
      frango: 40.0,
      carne: 60.0,
      mista: 60.0,
      mexicano: 80.0,
    },
    "700g": {
      frango: 60.0,
      carne: 80.0,
      mista: 80.0,
      mexicano: 90.0,
    },
    "1kg": {
      frango: 80.0,
      carne: 100.0,
      mista: 110.0,
      mexicano: 110.0,
    },
  },
};

export const menuCategories: MenuCategory[] = [
  {
    id: "batatas",
    name: "Batatas Recheadas",
    subtitle: "Nossas estrelas artesanais assadas e recheadas na hora",
    image: "/images/batata-recheada-1.webp",
    items: [
      {
        id: "batata-creme-milho",
        name: "Creme de Milho",
        description: "Batata assada, creme de milho cremoso, tempero verde fresco e batata palha crocante.",
        price: 19.9,
        formattedPrice: "R$ 19,90",
      },
      {
        id: "batata-frango-milho",
        name: "Frango c/ Creme de Milho",
        description: "Batata assada, frango desfiado temperado, creme de milho suave, tempero verde e batata palha.",
        price: 23.9,
        formattedPrice: "R$ 23,90",
      },
      {
        id: "batata-strog-frango",
        name: "Strogonoff de Frango",
        description: "Batata assada, strogonoff cremoso de frango, mussarela gratinada, tempero verde e batata palha.",
        price: 25.9,
        formattedPrice: "R$ 25,90",
      },
      {
        id: "batata-brocolis",
        name: "Brócolis ao Molho Alfredo",
        description: "Batata assada, brócolis frescos envolvidos em autêntico molho Alfredo artesanal e batata palha.",
        price: 25.9,
        formattedPrice: "R$ 25,90",
      },
      {
        id: "batata-funghi",
        name: "Funghi Especial",
        description: "Batata assada, molho cremoso de funghi, requeijão cremoso, mussarela derretida e batata palha.",
        price: 28.9,
        formattedPrice: "R$ 28,90",
      },
      {
        id: "batata-strog-carne",
        name: "Strogonoff de Carne",
        description: "Batata assada, strogonoff nobre de carne, mussarela selecionada derretida e batata palha.",
        price: 29.9,
        formattedPrice: "R$ 29,90",
      },
      {
        id: "batata-mexicano",
        name: "Mexicano",
        description: "Batata assada, carne moída artesanal apimentada, cheddar cremoso legítimo e doritos crocantes.",
        price: 29.9,
        formattedPrice: "R$ 29,90",
      },
      {
        id: "batata-costela",
        name: "Costela Gaúcha",
        description: "Batata assada, molho vermelho caseiro, costela desfiada desmanchando, mussarela e batata palha.",
        price: 34.9,
        formattedPrice: "R$ 34,90",
      },
    ],
  },
  {
    id: "torre",
    name: "Torre de Batata",
    subtitle: "A famosa torre com fartura, crocância e queijo derretido",
    image: "/images/cardapio-batata.webp",
    items: [],
  },
  {
    id: "hotdog",
    name: "Hot-Dog",
    subtitle: "Sabor clássico elevado com ingredientes de primeira linha",
    image: "/images/cardapio-hotdog-1.webp",
    items: [
      {
        id: "hotdog-simples",
        name: "Hot-Dog Simples",
        description: "1 salsicha selecionada, molho especial da casa, milho, ervilha, tomate, batata palha, catchup, mostarda e maionese artesanal.",
        price: 17.0,
        formattedPrice: "R$ 17,00",
      },
      {
        id: "hotdog-duplo",
        name: "Hot-Dog Duplo",
        description: "2 salsichas selecionadas, molho especial da casa, milho, ervilha, tomate, batata palha, catchup, mostarda e maionese artesanal.",
        price: 19.0,
        formattedPrice: "R$ 19,00",
      },
      {
        id: "hotdog-vegetariano",
        name: "Hot-Dog Vegetariano",
        description: "Salsicha vegetariana artesanal, molho especial, milho fresco, ervilha, tomate, batata palha, catchup, mostarda e maionese.",
        price: 19.9,
        formattedPrice: "R$ 19,90",
      },
    ],
  },
  {
    id: "xis",
    name: "Xis-Gaúcho",
    subtitle: "A autêntica tradição gaúcha prensada com recheio farto",
    image: "/images/cardapio-xis-1.webp",
    items: [
      {
        id: "xis-egg",
        name: "Xis Egg",
        description: "Pão artesanal de xis, 3 ovos, maionese, mostarda, ketchup, tomate fresco, queijo derretido, milho e ervilha.",
        price: 18.9,
        formattedPrice: "R$ 18,90",
      },
      {
        id: "xis-salada",
        name: "Xis Salada",
        description: "Pão de xis, hambúrguer selecionado, ovo, maionese especial, mostarda, ketchup, tomate, queijo, milho, ervilha e alface.",
        price: 21.9,
        formattedPrice: "R$ 21,90",
      },
      {
        id: "xis-frango",
        name: "Xis Frango",
        description: "Pão de xis, hambúrguer de frango/peito suculento, ovo, maionese, mostarda, ketchup, tomate, queijo, milho, ervilha e alface fresca.",
        price: 23.9,
        formattedPrice: "R$ 23,90",
      },
      {
        id: "xis-misto",
        name: "Xis Misto",
        description: "Pão de xis, hambúrguer, carne, frango, maionese, mostarda, ketchup, queijo, milho, ervilha, batata palha e ovo frito.",
        price: 29.9,
        formattedPrice: "R$ 29,90",
      },
      {
        id: "xis-vegetariano",
        name: "Xis Vegetariano",
        description: "Pão artesanal, hambúrguer vegetariano artesanal da casa, ovo, maionese, mostarda, ketchup, queijo, milho, ervilha, alface e tomate.",
        price: 31.9,
        formattedPrice: "R$ 31,90",
      },
      {
        id: "xis-costela",
        name: "Xis Costela Gaúcha",
        description: "Pão prensado, costela desfiada saborosa, 2 salsichas, molho vermelho especial, milho, ervilha, tomate, batata palha e maionese.",
        price: 34.9,
        formattedPrice: "R$ 34,90",
      },
      {
        id: "xis-mexicano",
        name: "Xis Mexicano",
        description: "Carne moída temperada, maionese, cheddar derretido, queijo mussarela, doritos crocantes, limão, chilli, alface e tomate.",
        price: 35.9,
        formattedPrice: "R$ 35,90",
      },
      {
        id: "xis-coracao",
        name: "Xis Coração",
        description: "Pão de xis, coração de frango grelhado no ponto perfeito, maionese, mostarda, ketchup, queijo derretido, milho, ervilha e ovo frito.",
        price: 37.9,
        formattedPrice: "R$ 37,90",
      },
    ],
  },
  {
    id: "pasteis",
    name: "Pastéis",
    subtitle: "Massa crocante, sequinha e recheios generosos",
    image: "/images/cardapio-pastel-1.webp",
    items: [
      {
        id: "pastel-queijo",
        name: "Pastel de Queijo",
        description: "Massa crocante recheada com queijo mussarela derretido e tempero suave.",
        price: 13.9,
        formattedPrice: "R$ 13,90",
      },
      {
        id: "pastel-pizza",
        name: "Pastel de Pizza",
        description: "Mussarela, presunto, tomate fresco e orégano em massa dourada.",
        price: 13.9,
        formattedPrice: "R$ 13,90",
      },
      {
        id: "pastel-milho-queijo",
        name: "Pastel de Milho c/ Queijo",
        description: "Milho verde selecionado com queijo mussarela cremoso.",
        price: 13.9,
        formattedPrice: "R$ 13,90",
      },
      {
        id: "pastel-frango",
        name: "Pastel de Frango",
        description: "Frango desfiado refogado com temperos frescos da horta.",
        price: 14.9,
        formattedPrice: "R$ 14,90",
      },
      {
        id: "pastel-brocolis",
        name: "Pastel de Brócolis",
        description: "Brócolis temperados com molho cremoso em massa estaladiça.",
        price: 15.9,
        formattedPrice: "R$ 15,90",
      },
      {
        id: "pastel-frango-catu-muss",
        name: "Pastel de Frango c/ Catupiry ou Mussarela",
        description: "Frango desfiado suculento com Catupiry legítimo ou queijo mussarela derretido.",
        price: 15.9,
        formattedPrice: "R$ 15,90",
      },
      {
        id: "pastel-especial",
        name: "Pastel Especial Doce / Salgado",
        description: "Consulte as combinações especiais do dia preparadas na hora.",
        price: 15.9,
        formattedPrice: "R$ 15,90",
      },
      {
        id: "pastel-carne",
        name: "Pastel de Carne",
        description: "Carne moída nobre temperada com especiarias caseiras e azeitonas.",
        price: 16.9,
        formattedPrice: "R$ 16,90",
      },
      {
        id: "pastel-carne-catu-muss-ched",
        name: "Pastel de Carne c/ Catupiry, Mussarela ou Cheddar",
        description: "Carne bovina temperada combinada com sua escolha de Catupiry, mussarela ou cheddar cremoso.",
        price: 17.9,
        formattedPrice: "R$ 17,90",
      },
    ],
  },
  {
    id: "drinks",
    name: "Drinks Artesanais",
    subtitle: "Criações autorais refrescantes, coloridas e cheias de vida",
    image: "/images/cardapio-drink-1.webp",
    items: [
      {
        id: "soda-italiana-300",
        name: "Soda Italiana (300ml)",
        description: "Refrescante soda italiana artesanal. Sabores: Maçã Verde, Pink Lemonade, Maracujá, Frutas Vermelhas, Morango, Curaçao Blue ou Tangerina.",
        price: 9.9,
        formattedPrice: "R$ 9,90",
        options: ["Maçã Verde", "Pink Lemonade", "Maracujá", "Frutas Vermelhas", "Morango", "Curaçao Blue", "Tangerina"],
      },
      {
        id: "soda-italiana-500",
        name: "Soda Italiana (500ml)",
        description: "Versão generosa com gelo cristalino e xarope premium à sua escolha.",
        price: 14.9,
        formattedPrice: "R$ 14,90",
        options: ["Maçã Verde", "Pink Lemonade", "Maracujá", "Frutas Vermelhas", "Morango", "Curaçao Blue", "Tangerina"],
      },
      {
        id: "drink-limao-nordeste",
        name: "Limão do Nordeste",
        description: "Soda Italiana, limão fresco espremido, Leite Moça, gengibre aromático e rapadura ralada.",
        price: 14.9,
        formattedPrice: "R$ 14,90",
      },
      {
        id: "drink-paraiso-tropical",
        name: "Paraíso Tropical",
        description: "Soda italiana, abacaxi em cubos, morango fresco, leite condensado e essência de rum refinada.",
        price: 18.9,
        formattedPrice: "R$ 18,90",
      },
      {
        id: "drink-espanhola",
        name: "Espanhola Artesanal",
        description: "Suco de uva integral encorpado, abacaxi, morangos macerados e leite condensado.",
        price: 18.9,
        formattedPrice: "R$ 18,90",
      },
      {
        id: "drink-galaxia-amarela",
        name: "Galáxia Amarela",
        description: "Maracujá natural, leite condensado, Sprite limão, xarope de maracujá e glitter comestível vermelho mágico.",
        price: 19.9,
        formattedPrice: "R$ 19,90",
      },
      {
        id: "drink-nuvem",
        name: "Drink Nuvem",
        description: "Apresentação espetacular com soda italiana frutada coberta por nuvem de algodão doce.",
        price: 22.9,
        formattedPrice: "R$ 22,90",
      },
    ],
  },
  {
    id: "bebidas",
    name: "Bebidas",
    subtitle: "Sucos naturais batidos na hora, detox e opções clássicas",
    image: "/images/suco-natural.webp",
    items: [
      {
        id: "bebida-agua",
        name: "Água Mineral",
        description: "Água pura mineral, com ou sem gás.",
        price: 5.0,
        formattedPrice: "R$ 5,00",
      },
      {
        id: "bebida-refri",
        name: "Refrigerante em Lata",
        description: "Lata 350ml gelada (Coca-Cola, Guaraná, e opções zero).",
        price: 6.5,
        formattedPrice: "R$ 6,50",
      },
      {
        id: "bebida-suco-natural",
        name: "Suco Natural (500ml)",
        description: "Fruta fresca batida na hora. Sabores: Abacaxi, Abacaxi c/ Hortelã, Cupuaçu, Laranja c/ Acerola, Limão, Maracujá, Manga ou Morango.",
        price: 9.0,
        formattedPrice: "R$ 9,00",
        options: ["Abacaxi", "Abacaxi c/ Hortelã", "Cupuaçu", "Laranja c/ Acerola", "Limão", "Maracujá", "Manga", "Morango"],
      },
      {
        id: "bebida-suco-suico",
        name: "Suco Suíço Cremoso (500ml)",
        description: "Suco da fruta preparado cremoso com leite e/ou leite condensado suave.",
        price: 11.0,
        formattedPrice: "R$ 11,00",
      },
      {
        id: "bebida-detox",
        name: "Detox Verde (500ml)",
        description: "Couve, maçã verde, gengibre, hortelã e limão frescos para revitalizar seu dia.",
        price: 14.9,
        formattedPrice: "R$ 14,90",
      },
      {
        id: "bebida-uva",
        name: "Suco de Uva Integral",
        description: "Suco de uva 100% integral selecionado de vinícola da serra gaúcha.",
        price: 15.0,
        formattedPrice: "R$ 15,00",
      },
      {
        id: "bebida-energetico",
        name: "Energético",
        description: "Energético premium para manter sua energia em alta.",
        price: 15.0,
        formattedPrice: "R$ 15,00",
      },
    ],
  },
  {
    id: "cafe-cha",
    name: "Chá & Café",
    subtitle: "Rituais de conforto e aconchego em cada xícara",
    image: "/images/cardapio-cafe-cha.webp",
    items: [
      {
        id: "cafe-cevada",
        name: "Cevada Instantânea",
        description: "Bebida leve, acolhedora e descafeinada com sabor suave e torrado.",
        price: 6.0,
        formattedPrice: "R$ 6,00",
      },
      {
        id: "cafe-coado",
        name: "Café Coado Melitta",
        description: "Passado na hora, quentinho, com aquele aroma inconfundível de casa de vó.",
        price: 6.9,
        formattedPrice: "R$ 6,90",
      },
      {
        id: "cha-tradicional",
        name: "Chá Tradicional Quente",
        description: "Infusão delicada de ervas nobres e aromáticas para aquecer a alma.",
        price: 7.0,
        formattedPrice: "R$ 7,00",
      },
      {
        id: "cafe-orfeu",
        name: "Café Gourmet Orfeu",
        description: "Café especial 100% arábica de fazendas premiadas com notas elegantes e corpo aveludado.",
        price: 12.9,
        formattedPrice: "R$ 12,90",
      },
      {
        id: "cafe-capp-vanilla",
        name: "Cappuccino Vanilla",
        description: "Espresso cremoso com leite vaporizado, cacau nobre e toque aveludado de baunilha.",
        price: 12.9,
        formattedPrice: "R$ 12,90",
      },
      {
        id: "cafe-capp-avela",
        name: "Cappuccino Avelã",
        description: "O equilíbrio perfeito entre o café selecionado, creme de leite denso e aroma de avelã tostada.",
        price: 12.9,
        formattedPrice: "R$ 12,90",
      },
      {
        id: "cha-latte",
        name: "Chá Latte Tea",
        description: "Bebida aromática de chá com leite suavemente vaporizado e especiarias suaves.",
        price: 12.9,
        formattedPrice: "R$ 12,90",
      },
      {
        id: "cha-tailandes",
        name: "Chá Tailandês c/ Hibisco e Morango",
        description: "Infusão vibrante de flores de hibisco, pedaços de morango e toques exóticos da Tailândia.",
        price: 12.9,
        formattedPrice: "R$ 12,90",
      },
    ],
  },
  {
    id: "petiscos",
    name: "Petiscos",
    subtitle: "Para acompanhar momentos descontraídos e conversas boas",
    image: "/images/cardapio-petisco-1.webp",
    items: [
      {
        id: "petisco-fritas",
        name: "Fritas Tradicionais",
        description: "Batatas sequinhas, douradas e crocantes por fora, macias por dentro.",
        price: 18.5,
        formattedPrice: "R$ 18,50",
      },
      {
        id: "petisco-fritas-queijo",
        name: "Fritas com Queijo",
        description: "Porção de batatas crocantes cobertas com sua escolha: Mussarela derretida, Catupiry ou Cheddar cremoso.",
        price: 21.9,
        formattedPrice: "R$ 21,90",
        options: ["Mussarela", "Catupiry", "Cheddar"],
      },
      {
        id: "petisco-iscas-frango",
        name: "Iscas de Frango com Fritas",
        description: "Tiras macias de peito de frango empanadas com tempero especial servidas com batatas fritas douradas.",
        price: 33.9,
        formattedPrice: "R$ 33,90",
      },
      {
        id: "petisco-iscas-carne",
        name: "Iscas de Carne com Fritas",
        description: "Iscas nobres de carne bovina grelhadas na chapa com cebola caramelizada e fritas crocantes.",
        price: 39.9,
        formattedPrice: "R$ 39,90",
      },
    ],
  },
];

export const especialidadesDestaque = [
  {
    id: "esp-batatas",
    category: "Batatas Recheadas",
    title: "Batatas Recheadas Artesanais",
    subtitle: "Assadas com casca crocante e recheios transbordando afeto",
    description: "Cozidas lentamente e finalizadas com combinações nobres como Costela Gaúcha desfiada, Funghi e Strogonoff de Carne.",
    image: "/images/batata-recheada-1.webp",
    ctaLabel: "Ver opções de batata",
    categoryId: "batatas",
    priceRange: "A partir de R$ 19,90",
  },
  {
    id: "esp-bolos",
    category: "Confeitaria Artesanal",
    title: "Bolos e Tortas Festivas",
    subtitle: "Massa aveludada, recheios fartos e finalização primorosa",
    description: "Criados por Tailise Brun para transformar encontros em celebrações inesquecíveis. Produzidos artesanalmente sob encomenda.",
    image: "/images/bolos-vitrine.webp",
    ctaLabel: "Consultar encomendas",
    categoryId: "sobremesas",
    priceRange: "Produção sob encomenda",
  },
  {
    id: "esp-sobremesas",
    category: "Doces & Sobremesas",
    title: "Sobremesas que Abraçam",
    subtitle: "O toque doce e requintado que encerra qualquer momento com chave de ouro",
    description: "Doces feitos à mão com chocolates nobres, frutas frescas e texturas que derretem na boca.",
    image: "/images/sobremesa-gourmet.webp",
    ctaLabel: "Ver no Instagram",
    categoryId: "sobremesas",
    priceRange: "Consulte disponibilidade do dia",
  },
  {
    id: "esp-bebidas",
    category: "Bebidas & Drinks",
    title: "Drinks e Bebidas Autorais",
    subtitle: "Sodas italianas, drinks mágicos com glitter e sucos 100% da fruta",
    description: "Apresentações surpreendentes como o Drink Galáxia Amarela e o clássico Limão do Nordeste com rapadura e gengibre.",
    image: "/images/suco-natural.webp",
    ctaLabel: "Explorar bebidas",
    categoryId: "drinks",
    priceRange: "A partir de R$ 9,00",
  },
];

export const galeriaGastronomica = [
  {
    id: "gal-1",
    title: "Batatas Recheadas Douradas",
    category: "Pratos Principais",
    image: "/images/batata-recheada-1.webp",
    span: "col-span-12 md:col-span-7 aspect-[16/11]",
  },
  {
    id: "gal-2",
    title: "Bolo de Camadas com Morangos Frescos",
    category: "Confeitaria de Autor",
    image: "/images/bolo-1.webp",
    span: "col-span-12 md:col-span-5 aspect-[4/5]",
  },
  {
    id: "gal-3",
    title: "Nosso Ambiente Aconchegante",
    category: "Experiência Brumeli",
    image: "/images/ambiente-brumeli.webp",
    span: "col-span-12 md:col-span-4 aspect-[4/5]",
  },
  {
    id: "gal-4",
    title: "Tortas Artesanais na Vitrine",
    category: "Doçuras do Dia",
    image: "/images/bolos-vitrine.webp",
    span: "col-span-12 md:col-span-4 aspect-[4/5]",
  },
  {
    id: "gal-5",
    title: "Sobremesa Especial de Colher",
    category: "Momentos Doces",
    image: "/images/sobremesa-gourmet.webp",
    span: "col-span-12 md:col-span-4 aspect-[4/5]",
  },
  {
    id: "gal-6",
    title: "Suco Natural de Morango e Frutas Vermelhas",
    category: "Refrescância Pura",
    image: "/images/suco-natural.webp",
    span: "col-span-12 md:col-span-5 aspect-[4/5]",
  },
  {
    id: "gal-7",
    title: "Bolo Trufado Festivo",
    category: "Momentos Especiais",
    image: "/images/bolo-2.webp",
    span: "col-span-12 md:col-span-7 aspect-[16/11]",
  },
];
