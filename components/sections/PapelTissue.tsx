"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import PhotoMedia from "@/components/visuals/PhotoMedia";
import { cota } from "@/lib/content/cota";

/**
 * Papel Tissue — apertura de la división principal de COTA (jerarquía de
 * contenido, 2026-09-23). Es la misma sección full-bleed oscura que antes
 * vivía dentro de ChemicalsToPaper.tsx ("Papel Tissue a escala
 * industrial"), sin cambios visuales: sólo pasa a ser el índice de la
 * división, que se lee Papel Tissue → Bobinas Industriales → Productos
 * convertidos, en ese orden y justo después de Compañía.
 */
const DIVISION_ITEMS = [
  { label: "Bobinas industriales", href: "#bobinas" },
  { label: "Productos convertidos", href: "#convertidos" },
  { label: `${cota.guardian.name} — línea profesional`, href: "#convertidos" },
];

export default function PapelTissue() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 100%", toggleActions: "play none none none" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="papel" className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink-deep">
      <PhotoMedia src="/photos/bobinas-deposito.jpeg" alt="Bobinas de papel Tissue en depósito de COTA" />
      <div className="absolute inset-0" style={{ background: "rgba(6,8,17,0.45)" }} />

      <div ref={contentRef} className="container-industrial relative flex w-full flex-col pb-20 md:pb-28">
        <span className="font-label mb-6 block text-paper/60">División principal</span>
        <h2 className="text-display max-w-2xl text-paper">
          Papel Tissue.
          <br />
          Producción propia a escala industrial.
        </h2>
        <ul className="mt-8 flex flex-col gap-2">
          {DIVISION_ITEMS.map((item, i) => (
            <li key={item.label} className="font-label text-paper/65">
              <a href={item.href} className="transition-colors hover:text-paper">
                {String(i + 1).padStart(2, "0")} — {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <a
            href="#bobinas"
            className="font-label inline-block w-fit border-b border-paper/40 pb-0.5 text-paper transition-colors hover:border-paper"
          >
            Ver bobinas industriales <span className="cta-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
