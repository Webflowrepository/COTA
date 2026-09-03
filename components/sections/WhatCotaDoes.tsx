"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import { EASE_STANDARD } from "@/lib/motion/tokens";
import PlaceholderMedia from "@/components/visuals/PlaceholderMedia";
import { cota } from "@/lib/content/cota";

// Foto por línea de negocio — pasada de "ninguna foto se repite":
// bobinas-deposito.jpeg y quimicos-tanques.png le quedaron a
// ChemicalsToPaper.tsx (sus dos capítulos "Químicos"/"Papel" no pueden
// perder ninguna de las dos sin quedar un capítulo entero vacío) y
// naschel-planta-aerea.png le quedó a IndustrialProcess.tsx (etapa
// "Logística"). No queda ninguna foto real libre para estas 3 filas —
// pasan a placeholder marcado, como ya se usa en SolutionsByApplication.
const MEDIA_LABEL: Record<string, string> = {
  papel: "Foto — bobinas de papel Tissue",
  quimicos: "Foto — tanques de proceso químico",
  soluciones: "Foto — planta y logística",
};

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

        <div className="flex flex-col divide-y divide-line-on-light">
          {cota.businessLines.map((line) => (
            <div className="line-row group relative flex flex-col gap-5 py-9 transition-[padding] duration-500 ease-out md:flex-row md:items-center md:justify-between md:gap-10 md:py-12 md:hover:pl-3" key={line.id}>
              {/* md:max-w acotado — a 768px, max-w-md (448px fijo) le
                  dejaba a la foto (flex-1) sólo ~180px de ancho en una fila
                  de ~660px. lg: vuelve a max-w-md sin cambios — 1440/1280
                  quedan iguales. */}
              <div className="min-w-0 max-w-md md:max-w-[280px] lg:max-w-md">
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
                  densidad.
                  Auditoría comparativa (COTA_REFERENCE_GAP_AUDIT.md,
                  intervención #1): antes tenía md:max-w-lg (512px) — con
                  flex-1 ya de por sí capaz de crecer mucho más, ese tope
                  cortaba la foto corta y dejaba ~325px de hueco muerto
                  entre texto y foto (ni el texto ni la foto lo
                  reclamaban, "justify-between" lo repartía como
                  separación). Sacar el tope deja que flex-1 ocupe ese
                  espacio de verdad. El margen negativo (md:-mr-12,
                  1440px:-mr-20) empuja la foto hasta el borde real del
                  viewport, cancelando el padding-inline de
                  .container-industrial en esos mismos breakpoints (3rem/
                  5rem) — sólo en la foto, el texto sigue dentro del
                  container. El "!" en min-[1440px] hace falta porque ese
                  variant arbitrario no le gana en cascada a "md:" por
                  orden de aparición en el CSS generado, aunque 1440px
                  sea un breakpoint más angosto (mismo tipo de problema
                  que container-industrial vs. utilidades Tailwind — ver
                  memoria de dirección de arte, punto 18). Sin cambios en
                  mobile (<md sigue apilado a ancho completo, como ya
                  estaba). */}
              <div className="media-reveal relative h-40 w-full overflow-hidden sm:h-48 md:h-44 md:flex-1 md:-mr-12 lg:h-56 min-[1440px]:-mr-20!">
                <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
                  <PlaceholderMedia tone="dark" label={MEDIA_LABEL[line.id]} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
