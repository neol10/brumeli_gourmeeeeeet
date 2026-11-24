import Header from "../components/Header";
import Hero from "../components/Hero";
import Especialidades from "../components/Especialidades";
import CardapioInterativo from "../components/CardapioInterativo";
import Sobre from "../components/Sobre";
import Galeria from "../components/Galeria";
import Diferenciais from "../components/Diferenciais";
import ContatoPedidos from "../components/ContatoPedidos";
import Footer from "../components/Footer";
import GsapAnimations from "../components/GsapAnimations";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-creme-100">
      <GsapAnimations />
      <Header />
      <Hero />
      <Especialidades />
      <CardapioInterativo />
      <Sobre />
      <Galeria />
      <Diferenciais />
      <ContatoPedidos />
      <Footer />
    </main>
  );
}
