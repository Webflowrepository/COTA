"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import { EASE_STANDARD } from "@/lib/motion/tokens";
import PhotoMedia from "@/components/visuals/PhotoMedia";
import { cota } from "@/lib/content/cota";

const PAPER_ITEMS = ["Bobinas para convertidores", `${cota.guardian.name} — línea profesional`, "Producción propia en Naschel"];

const CHEM_ITEMS = ["Blanqueadores tetrasulfónicos", "Blanqueadores hexasulfónicos", "Antraquinona — para la preparación de pasta de papel"];

// La sección "Químicos — 01" (foto full-bleed de tanques + lista de
// blanqueadores separada) se eliminó a pedido del cliente (2026-09-21). Su
// contenido se consolidó primero como bloque secundario dentro de esta
// sección full-bleed (Papel), y después (2026-09-22) se movió a su propia
// sección clara debajo — sobre la foto oscura el texto quedaba apretado y
// perdido, mismo problema que tuvo la versión original. quimicos-ibc-tanques.png
// estaba libre (no se usaba en ninguna otra sección).
export default function ChemicalsToPaper() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chemRef = useRef<HTMLDivElement>(null);

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
      gsap.fromTo(
        ".chem-item",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: EASE_STANDARD,
          scrollTrigger: { trigger: chemRef.current, start: "top 80%", end: "top 45%", scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="quimicos" className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink-deep">
        <PhotoMedia src="/photos/bobinas-deposito.jpeg" alt="Bobinas de papel Tissue en depósito de COTA" />
        <div className="absolute inset-0" style={{ background: "rgba(6,8,17,0.45)" }} />

        <div ref={sectionRef} className="container-industrial relative flex w-full flex-col pb-20 md:pb-28">
          <span className="font-label mb-6 block text-paper/60">Papel y Químicos</span>
          <h3 className="text-display max-w-2xl text-paper">Papel Tissue a escala industrial.</h3>
          <ul className="mt-8 flex flex-col gap-2">
            {PAPER_ITEMS.map((item, i) => (
              <li key={item} className="font-label text-paper/65">
                {String(i + 1).padStart(2, "0")} — {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <a
              href="#papel"
              className="font-label inline-block w-fit border-b border-paper/40 pb-0.5 text-paper transition-colors hover:border-paper"
            >
              Ver especificaciones técnicas <span className="cta-arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Químicos — sección propia, clara, mismo patrón que "Soluciones"
          (SolutionsByApplication.tsx): kicker, h2, párrafo, foto al 62/38.
          Ya no vive superpuesta a la foto oscura de arriba. */}
      <section ref={chemRef} className="section-py-sm relative w-full bg-paper">
        <div className="container-industrial">
          <span className="font-label mb-6 block text-ink/50">Línea química</span>
          <h2 className="text-display max-w-3xl text-ink">Blanqueadores ópticos a medida.</h2>
          <p className="mt-6 max-w-lg text-base text-ink/60 md:text-lg">
            Desde 1994 fabricamos blanqueadores ópticos (agentes blanqueadores fluorescentes)
            para blanquear papel y pasta de papel.
          </p>

          <div className="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.6fr] md:items-center md:gap-16">
            <ul className="chem-item flex flex-col gap-2">
              {CHEM_ITEMS.map((item, i) => (
                <li key={item} className="font-label text-ink/65">
                  {String(i + 1).padStart(2, "0")} — {item}
                </li>
              ))}
            </ul>
            <div className="chem-item relative h-[30vh] w-full overflow-hidden md:-mr-12 md:h-[34vh] min-[1440px]:-mr-20!">
              <PhotoMedia
                src="/photos/quimicos-ibc-tanques.png"
                alt="Tanques y contenedores IBC de proceso químico, planta de COTA"
                sizes="(min-width: 768px) 62vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
