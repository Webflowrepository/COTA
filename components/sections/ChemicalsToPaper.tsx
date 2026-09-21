"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import PhotoMedia from "@/components/visuals/PhotoMedia";
import Counter from "@/components/ui/Counter";
import { cota } from "@/lib/content/cota";

const CHEM_ITEMS = cota.chemicalTypes.map((type) => `Blanqueadores ${type}`);
const PAPER_ITEMS = ["Bobinas para convertidores", `${cota.guardian.name} — línea profesional`, "Producción propia en Naschel"];

// La sección "Químicos — 01" (foto full-bleed de tanques + lista de
// blanqueadores separada) se eliminó a pedido del cliente (2026-09-21).
// Su contenido — contador, lista de blanqueadores y CTA de ficha técnica —
// se consolidó en esta sección como bloque secundario debajo del contenido
// de Papel, separado por una línea divisoria. Una sola sección full-bleed
// en vez de dos seguidas: menos repetición visual, mismo acceso a la info.
export default function ChemicalsToPaper() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 100%", toggleActions: "play none none none" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="quimicos" className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink-deep">
      <PhotoMedia src="/photos/bobinas-deposito.jpeg" alt="Bobinas de papel Tissue en depósito de COTA" />
      <div className="absolute inset-0" style={{ background: "rgba(6,8,17,0.45)" }} />

      <div ref={sectionRef} className="container-industrial relative flex w-full flex-col pb-20 md:pb-28">
        {/* Papel — contenido principal */}
        <span className="font-label mb-4 block text-paper/60">Papel y Químicos</span>
        <h3 className="text-display max-w-2xl text-paper">Papel Tissue a escala industrial.</h3>
        <ul className="mt-8 flex flex-col gap-2">
          {PAPER_ITEMS.map((item, i) => (
            <li key={item} className="font-label text-paper/65">
              {String(i + 1).padStart(2, "0")} — {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          <a
            href={`mailto:${cota.contact.email}?subject=${encodeURIComponent("Ficha técnica — Bobinas para convertidores")}`}
            className="font-label inline-block w-fit border-b border-paper/40 pb-0.5 text-paper transition-colors hover:border-paper"
          >
            Solicitar ficha técnica <span className="cta-arrow">→</span>
          </a>
          <a
            href="#papel"
            className="font-label inline-block w-fit border-b border-paper/40 pb-0.5 text-paper transition-colors hover:border-paper"
          >
            Ver especificaciones técnicas <span className="cta-arrow">→</span>
          </a>
        </div>

        {/* Químicos — bloque secundario */}
        <div className="mt-10 border-t border-paper/20 pt-8">
          <div className="flex flex-wrap items-start gap-x-10 gap-y-6">
            <div>
              <span className="font-impact-number text-stat block leading-none text-paper">
                <Counter target={cota.chemicalTypes.length} />
              </span>
              <span className="font-label text-paper/50">Tipos de blanqueadores</span>
            </div>
            <div>
              <ul className="flex flex-col gap-2">
                {CHEM_ITEMS.map((item, i) => (
                  <li key={item} className="font-label text-paper/65">
                    {String(i + 1).padStart(2, "0")} — {item}
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${cota.contact.email}?subject=${encodeURIComponent("Ficha técnica — Blanqueadores y químicos")}`}
                className="font-label mt-4 inline-block w-fit border-b border-paper/40 pb-0.5 text-paper transition-colors hover:border-paper"
              >
                Solicitar ficha técnica química <span className="cta-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
