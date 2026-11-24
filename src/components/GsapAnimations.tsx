"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GsapAnimations() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Respeitar prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Entrada sutil do Header (Hero possui timeline mestra própria em Hero.tsx)
      gsap.fromTo(
        "header",
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      // 3. Seção Especialidades: Revelação dos Cards em Stagger
      ScrollTrigger.batch("#especialidades .grid > div", {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.14,
              ease: "power2.out",
              overwrite: "auto",
            }
          );
        },
      });

      // 4. Seção Sobre: Entrada coordenada das 3 áreas
      const sobreTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#sobre",
          start: "top 78%",
          once: true,
        },
      });

      sobreTl
        .fromTo(
          "#sobre h2",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
        )
        .fromTo(
          "#sobre .grid.grid-cols-1.lg\\:grid-cols-12 > div:nth-child(1)",
          { opacity: 0, x: -35 },
          { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          "#sobre .grid.grid-cols-1.lg\\:grid-cols-12 > div:nth-child(2)",
          { opacity: 0, scale: 0.93 },
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
          "-=0.7"
        )
        .fromTo(
          "#sobre .grid.grid-cols-1.lg\\:grid-cols-12 > div:nth-child(3)",
          { opacity: 0, x: 35 },
          { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
          "-=0.8"
        );

      // 5. Seção Galeria: Revelação em Stagger das Imagens
      ScrollTrigger.batch("#galeria .grid > div", {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 45, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              stagger: 0.12,
              ease: "power2.out",
              overwrite: "auto",
            }
          );
        },
      });

      // 6. Faixa de Diferenciais: Entrada fluida dos 4 pilares
      gsap.fromTo(
        "section:has(.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4) .grid > div",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "section:has(.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4)",
            start: "top 85%",
            once: true,
          },
        }
      );

      // 7. Seção Contato & Pedidos: Entrada com elevação suntuosa
      gsap.fromTo(
        "#contato .bg-marrom",
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#contato",
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return null;
}
