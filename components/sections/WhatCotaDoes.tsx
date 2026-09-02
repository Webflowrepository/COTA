"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import { EASE_STANDARD } from "@/lib/motion/tokens";
import PhotoMedia from "@/components/visuals/PhotoMedia";
import { cota } from "@/lib/content/cota";

// CTA secundario por división — apunta a la sección real correspondiente
// (no a un mailto genérico), ya que las 3 tienen su propio anchor en la página.
const SECONDARY_CTA: Record<string, { label: string; href: string }> = {
  quimicos: { label: "Ver especificaciones", href: "#quimicos" },
  papel: { label: "Conocer línea Guardián", href: "#papel" },
  soluciones: { label: "Asesoramiento técnico", href: "#soluciones" },
};

export default function WhatCotaDoes() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".line-row").forEach((row) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: EASE_STANDARD,
            scrollTrigger: { trigger: row, start: "top 85%", end: "top 55%", scrub: true },
          },
        );
        gsap.fromTo(
          row.querySelector(".media-reveal"),
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            ease: EASE_STANDARD,
            scrollTrigger: { trigger: row, start: "top 85%", end: "top 50%", scrub: true },
          },
        );
      });
      return () => ScrollTrigger.getAll().forEach((t) => t.trigger === rootRef.current && t.kill());
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="compania" ref={rootRef} className="section-py-lg relative w-full bg-paper">
      <div className="container-industrial">
        <span className="font-label mb-6 block text-ink/45">
          Compañía — {cota.country}, desde {cota.foundedYear}
        </span>
        <h2 className="text-display max-w-2xl text-ink">{cota.mission}</h2>
        <a
          href="#contacto"
          className="font-label mb-16 mt-6 inline-block w-fit border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60 md:mb-24"
        >
          Ir al formulario <span className="cta-arrow">→</span>
        </a>

        <div className="flex flex-col divide-y divide-line-on-light">
          {cota.businessLines.map((line) => (
            <div className="line-row group relative flex flex-col gap-5 py-9 transition-[padding] duration-500 ease-out md:flex-row md:items-center md:justify-between md:gap-10 md:py-12 md:hover:pl-3" key={line.id}>
              <div className="min-w-0 max-w-md">
                <h3 className="text-heading text-ink transition-opacity duration-300 group-hover:opacity-60">{line.label}</h3>
                <p className="mt-3 text-sm text-ink/55 md:text-base">{line.short}</p>
                {SECONDARY_CTA[line.id] && (
                  <a
                    href={SECONDARY_CTA[line.id].href}
                    className="font-label mt-5 inline-block w-fit border-b border-ink/40 pb-0.5 text-ink/70 transition-opacity hover:opacity-60"
                  >
                    {SECONDARY_CTA[line.id].label} <span className="cta-arrow">→</span>
                  </a>
                )}
              </div>
              {/* antes se ocultaba en mobile (hidden md:block) — dejaba un
                  tramo de puro texto entre esta sección y "Por qué COTA".
                  Ahora se ve también en mobile, más baja, para cortar la
                  densidad. */}
              <div className="media-reveal relative h-40 w-full overflow-hidden sm:h-48 md:h-44 md:max-w-lg md:flex-1 lg:h-56">
                <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
                  {line.id === "soluciones" ? (
                    <PhotoMedia src="/photos/naschel-planta-aerea.png" alt="Planta de COTA — logística y despacho" />
                  ) : line.id === "quimicos" ? (
                    <PhotoMedia src="/photos/quimicos-tanques.png" alt="Tanques de proceso en la planta de COTA" />
                  ) : (
                    <PhotoMedia src="/photos/bobinas-deposito.jpeg" alt="Bobinas de papel Tissue en depósito de COTA" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
