"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import PhotoMedia from "@/components/visuals/PhotoMedia";
import { cota } from "@/lib/content/cota";

// Los 4 diferenciales son texto ya verificado en lib/content/cota.ts / usado
// en otras secciones (IndustrialProcess, services) — no son datos nuevos.
const POINTS = [
  {
    title: "Desarrollo propio, no reventa.",
    copy: "Blanqueadores ópticos desarrollados por COTA — tetrasulfónicos, hexasulfónicos y antraquinona.",
  },
  {
    title: "Integración vertical.",
    copy: "De la materia prima al producto terminado, dentro de la misma planta en Naschel.",
  },
  {
    title: "Logística propia.",
    copy: cota.services.find((s) => s.id === "logistica")?.short ?? "",
  },
  {
    title: "Asesoramiento técnico.",
    copy: cota.services.find((s) => s.id === "asesoramiento")?.short ?? "",
  },
];

export default function WhyCota() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-point",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%", end: "top 40%", scrub: true },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative w-full bg-paper py-24 md:py-32">
      {/* Orden en mobile: título → foto → diferenciales. Antes la foto vivía
          en una columna aparte que en mobile caía al final del todo, así
          que entre esta sección y WhatCotaDoes había un tramo largo de puro
          texto (título + 4 bullets) sin nada visual. En desktop se arma
          igual que antes (columna de texto + foto a la derecha) gracias al
          md:row-span-2 de la foto. */}
      <div className="container-industrial grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6">
          <span className="font-label mb-6 block text-ink/45">Por qué COTA</span>
          <h2 className="text-display max-w-lg text-ink">Más que un proveedor. Un socio industrial.</h2>
        </div>

        <div className="relative h-[30vh] overflow-hidden md:col-span-6 md:row-span-2 md:h-auto">
          <PhotoMedia src="/photos/proceso-materia-prima.png" alt="Planta industrial de COTA en Naschel" />
        </div>

        <div className="md:col-span-6">
          <div className="flex flex-col divide-y divide-line-on-light">
            {POINTS.map((point) => (
              <div key={point.title} className="why-point flex gap-5 py-6 first:pt-0">
                <span className="mt-2 h-px w-6 shrink-0 bg-ink/40" aria-hidden />
                <div>
                  <h3 className="text-base font-medium text-ink md:text-lg">{point.title}</h3>
                  <p className="mt-1.5 max-w-md text-sm text-ink/60 md:text-base">{point.copy}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#proceso"
            className="font-label mt-10 inline-block w-fit border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60"
          >
            Conocer nuestra planta <span className="cta-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
