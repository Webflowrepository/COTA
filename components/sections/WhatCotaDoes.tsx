"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import { EASE_STANDARD } from "@/lib/motion/tokens";
import { cota } from "@/lib/content/cota";

// "Papel" se muestra separado en 2 filas (ver cota.papelSplit — es una
// sola división real, esto es sólo el relato de esta sección) más
// Químicos y Soluciones de cota.businessLines — 4 filas en total.
const LINES = [...cota.papelSplit, ...cota.businessLines.filter((l) => l.id !== "papel")];

// CTA secundario por línea — apunta a la sección real correspondiente (no
// a un mailto genérico), ya que todas tienen su propio anchor en la página.
const SECONDARY_CTA: Record<string, { label: string; href: string }> = {
  "bobinas-convertidores": { label: "Ver especificaciones", href: "#papel" },
  "conversion-integrada": { label: "Conocer línea Guardián", href: "#papel" },
  quimicos: { label: "Ver especificaciones", href: "#quimicos" },
  soluciones: { label: "Asesoramiento técnico", href: "#soluciones" },
};

export default function WhatCotaDoes() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      // Rediseño (pedido del cliente, ver memoria de esta conversación):
      // antes eran 4 filas apiladas con foto grande al lado del texto —
      // el cliente lo comparó con el panel fotográfico de "Un sistema
      // industrial integrado" (ProductFamilies.tsx, más abajo en la
      // página) y notó que mostraban las mismas 4 líneas con las mismas
      // fotos en un formato parecido, como la misma sección repetida dos
      // veces. Se sacó la foto de acá — pasa a ser un índice compacto
      // (número + título + texto corto), mismo patrón que "Modelos de
      // negocio" en PapelTissueSpecs.tsx (misma escala tipográfica,
      // mismo group-hover, mismos divide-x) — así el sitio no inventa un
      // tercer estilo de tarjeta para el mismo tipo de contenido. El
      // panel con foto grande de ProductFamilies queda como el único
      // lugar con esas fotos a tamaño protagonista.
      gsap.utils.toArray<HTMLElement>(".line-card").forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: EASE_STANDARD,
            scrollTrigger: { trigger: card, start: "top 88%", end: "top 60%", scrub: true },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="compania"
      ref={rootRef}
      /* max-md:pt-14! — en mobile, section-py-lg (7rem/112px de padding-top)
         sumado al padding-bottom de StatsBand (4.5rem/72px) dejaba 184px de
         hueco vacío (22% de una pantalla de 844px) entre el último número y
         este kicker. .section-py-lg es una clase compartida (Contact
         también la usa) — no se toca; se pisa sólo acá y sólo en mobile.
         El sufijo "!" hace falta porque las clases custom de globals.css se
         definen después de @import "tailwindcss" y le ganan en cascada a
         cualquier utilidad Tailwind del mismo peso sin !important (ver
         memoria de dirección de arte, punto 18). md:/lg: sin cambios. */
      className="section-py-lg relative w-full bg-paper max-md:pt-14!"
    >
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

        {/* 1 columna en mobile (apiladas) → 2 en tablet (grid 2x2) → 4 en
            desktop (una fila) — pedido explícito del cliente. divide-x
            sólo en lg: con 2 columnas (tablet) un divisor vertical corta
            raro contra el wrap a la fila de abajo; con 4 en una sola fila
            (lg) se ve limpio, igual que "Modelos de negocio". */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-on-light">
          {LINES.map((line, i) => (
            <div key={line.id} className="line-card group lg:px-8 lg:first:pl-0 lg:last:pr-0">
              <span className="font-impact-number text-stat block text-ink/25 transition-colors duration-300 group-hover:text-ink/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-heading mt-4 text-ink transition-transform duration-300 group-hover:translate-x-1">{line.label}</h3>
              <p className="mt-3 text-sm text-ink/60 md:text-base">{line.short}</p>
              {SECONDARY_CTA[line.id] && (
                <a
                  href={SECONDARY_CTA[line.id].href}
                  className="font-label mt-5 inline-block w-fit border-b border-ink/40 pb-0.5 text-ink/70 transition-opacity hover:opacity-60"
                >
                  {SECONDARY_CTA[line.id].label} <span className="cta-arrow">→</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
