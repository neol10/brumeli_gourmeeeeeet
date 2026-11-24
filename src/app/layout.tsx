import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://brumeligourmet.com.br"),
  title: "Brumeli Gourmet — Sua dose de felicidade",
  description:
    "Brumeli Gourmet Deliveries & Experiências por Tailise Brun. Batatas recheadas artesanais, bolos, sobremesas e bebidas especiais preparadas com carinho e ingredientes selecionados.",
  keywords: [
    "Brumeli Gourmet",
    "Tailise Brun",
    "batatas recheadas",
    "gastronomia artesanal",
    "torre de batata",
    "delivery gourmet",
    "bolos artesanais",
    "doces e sobremesas",
  ],
  openGraph: {
    title: "Brumeli Gourmet — Sua dose de felicidade",
    description:
      "Mais que uma batata, uma experiência. Sabores especiais, ingredientes selecionados e momentos feitos para você.",
    url: "https://brumeligourmet.com.br",
    siteName: "Brumeli Gourmet",
    images: [
      {
        url: "/images/batata-recheada-1.webp",
        width: 1200,
        height: 630,
        alt: "Brumeli Gourmet — Batata Recheada Especial",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/images/logo.webp",
    apple: "/images/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-creme-100 text-marrom antialiased selection:bg-terracota selection:text-creme-100 min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
