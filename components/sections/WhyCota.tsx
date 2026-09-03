"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import { EASE_STANDARD } from "@/lib/motion/tokens";
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
          ease: EASE_STANDARD,
          scrollTrigger: { trigger: rootRef.current, start: "top 75%", end: "top 40%", scrub: true },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="section-py-md relative w-full bg-paper">
      {/* La foto (proceso-materia-prima.png) se sacó de acá — pasada de
          "ninguna foto se repite": esa foto le quedó a IndustrialProcess
          (etapa 01, "Materia Prima"), donde el match con el texto es
          literal, en vez de acá donde era una foto genérica de apoyo sin
          ninguna frase específica que ilustrara. Sin columna de foto, el
          título y los diferenciales quedan lado a lado en desktop
          (auto-flow del mismo grid de 12 columnas) y apilados en mobile,
          sin necesidad de un placeholder — esta sección nunca fue una
          grilla de fotos paralelas como ProductFamilies, es una lista de
          texto que puede sostenerse sola. */}
      <div className="container-industrial grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6">
          <span className="font-label mb-6 block text-ink/45">Por qué COTA</span>
          <h2 className="text-display max-w-lg text-ink">Más que un proveedor. Un socio industrial.</h2>
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
