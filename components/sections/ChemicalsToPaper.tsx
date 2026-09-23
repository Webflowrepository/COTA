"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import { EASE_STANDARD } from "@/lib/motion/tokens";
import PhotoMedia from "@/components/visuals/PhotoMedia";

const CHEM_ITEMS = ["Blanqueadores tetrasulfónicos", "Blanqueadores hexasulfónicos", "Antraquinona — para la preparación de pasta de papel"];

// Químicos — división secundaria de COTA (jerarquía de contenido,
// 2026-09-23). La apertura oscura "Papel Tissue a escala industrial" que
// antes vivía en este archivo pasó a PapelTissue.tsx; acá queda sólo la
// línea química, después de todo el bloque de Papel Tissue.
export default function ChemicalsToPaper() {
  const chemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
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

  // Split editorial (pedido del cliente con referencia visual,
  // 2026-09-23): texto a la izquierda alineado a la grilla del sitio, foto a
  // sangre ocupando toda la mitad derecha. En mobile: texto, después foto.
  return (
      <section id="quimicos" ref={chemRef} className="relative grid w-full grid-cols-1 bg-paper md:grid-cols-2">
        <div className="flex w-full flex-col px-5 py-20 md:ml-auto md:max-w-[720px] md:py-24 md:pl-12 md:pr-16 md:min-h-[36rem] min-[1440px]:pl-20!">
          <span className="font-label mb-6 block text-ink/50">Línea química</span>
          <h2 className="text-display max-w-xl text-ink">Blanqueadores ópticos a medida.</h2>
          <p className="mt-6 max-w-md text-base text-ink/60 md:text-lg">
            Desde 1994 fabricamos blanqueadores ópticos (agentes blanqueadores fluorescentes)
            para blanquear papel y pasta de papel.
          </p>

          <span aria-hidden className="chem-item mt-10 block h-px w-10 bg-green" />

          <ul className="chem-item mt-8 flex flex-col gap-3">
            {CHEM_ITEMS.map((item, i) => (
              <li key={item} className="font-label text-ink/65">
                <span className="text-ink">{String(i + 1).padStart(2, "0")}</span> — {item}
              </li>
            ))}
          </ul>

          <div className="chem-item mt-16 flex items-end gap-6 md:mt-auto md:pt-16">
            <span className="font-label leading-snug text-ink/40">
              Productos químicos
              <br />
              para la industria del papel
            </span>
            <span aria-hidden className="mb-1.5 h-px flex-1 bg-line-on-light" />
            <span className="font-label text-ink/40">Desde 1994</span>
          </div>
        </div>

        <div className="chem-item relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-full">
          <PhotoMedia
            src="/photos/quimicos-ibc-tanques.png"
            alt="Tanques y contenedores IBC de proceso químico, planta de COTA"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </section>
  );
}
