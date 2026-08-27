"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import SpecCounter from "@/components/ui/SpecCounter";
import { cota } from "@/lib/content/cota";

export default function PapelTissueSpecs() {
  const modelsRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".biz-model",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: modelsRef.current, start: "top 80%", end: "top 45%", scrub: true },
        },
      );
      gsap.fromTo(
        ".spec-row",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: specsRef.current, start: "top 75%", end: "top 35%", scrub: true },
        },
      );
      gsap.fromTo(
        ".catalog-item",
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: catalogRef.current, start: "top 80%", end: "top 45%", scrub: true },
        },
      );
    }, [modelsRef, specsRef, catalogRef]);
    return () => ctx.revert();
  }, []);

  return (
    <section id="papel" className="relative w-full bg-paper">
      <div className="container-industrial pt-24 pb-16 md:pt-32 md:pb-20">
        <span className="font-label mb-4 block text-ink/45">Papel Tissue</span>
        <h2 className="text-display max-w-2xl text-ink">Bobinas para convertidores, a su medida.</h2>
        <p className="mt-6 max-w-lg text-base text-ink/60 md:text-lg">
          {cota.businessLines.find((l) => l.id === "papel")?.short} Producción propia en{" "}
          {cota.plant.location}, con tres formas de trabajar según lo que necesite su operación.
        </p>
        <a
          href="#contacto"
          className="font-label mt-6 inline-block w-fit border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60"
        >
          Ir al formulario <span className="cta-arrow">→</span>
        </a>
      </div>

      {/* Modelos de negocio */}
      <div ref={modelsRef} className="container-industrial pb-16 md:pb-20">
        <span className="font-label mb-10 block text-ink/45">Modelos de negocio</span>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line-on-light">
          {cota.businessModels.map((model, i) => (
            <div key={model.id} className="biz-model group md:px-10 md:first:pl-0 md:last:pr-0">
              <span className="font-impact-number text-stat block text-ink/25 transition-colors duration-300 group-hover:text-ink/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-heading mt-4 text-ink transition-transform duration-300 group-hover:translate-x-1">{model.label}</h3>
              <p className="mt-3 text-sm text-ink/60 md:text-base">{model.short}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Especificaciones técnicas */}
      <div ref={specsRef} className="w-full bg-ink-deep py-16 md:py-20">
        <div className="container-industrial">
          <span className="font-label mb-8 block text-paper/50">Especificaciones técnicas — bobinas</span>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line-on-dark">
                  <th className="font-label py-4 pr-8 font-normal text-paper/50">Medida</th>
                  <th className="font-label py-4 pr-8 font-normal text-paper/50">Valores disponibles</th>
                </tr>
              </thead>
              <tbody>
                <tr className="spec-row border-b border-line-on-dark transition-colors duration-300 hover:bg-paper/[0.04]">
                  <td className="py-5 pr-8 text-paper/70">Ancho</td>
                  <td className="font-impact-number text-2xl text-paper transition-transform duration-300 hover:translate-x-1 md:text-3xl">
                    <SpecCounter values={cota.bobinaSpecs.anchos} />
                  </td>
                </tr>
                <tr className="spec-row border-b border-line-on-dark transition-colors duration-300 hover:bg-paper/[0.04]">
                  <td className="py-5 pr-8 text-paper/70">Diámetro</td>
                  <td className="font-impact-number text-2xl text-paper transition-transform duration-300 hover:translate-x-1 md:text-3xl">
                    <SpecCounter values={cota.bobinaSpecs.diametros} />
                  </td>
                </tr>
                <tr className="spec-row transition-colors duration-300 hover:bg-paper/[0.04]">
                  <td className="py-5 pr-8 text-paper/70">Cono interior</td>
                  <td className="font-impact-number text-2xl text-paper transition-transform duration-300 hover:translate-x-1 md:text-3xl">
                    <SpecCounter values={[cota.bobinaSpecs.conoInterior]} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <a
              href={`mailto:${cota.contact.email}?subject=${encodeURIComponent("Ficha técnica — Bobinas para convertidores")}`}
              className="font-label inline-block w-fit border-b border-paper/40 pb-0.5 text-paper transition-colors hover:border-paper"
            >
              Solicitar ficha técnica completa <span className="cta-arrow">→</span>
            </a>
            <a
              href="#contacto"
              className="font-label inline-block w-fit border-b border-paper/40 pb-0.5 text-paper transition-colors hover:border-paper"
            >
              Ir al formulario <span className="cta-arrow">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Catálogo de productos terminados. Antes compartía esta sección con
          un bloque de Guardián a la derecha (marca propia, tagline + CTA);
          se sacó de acá — Guardián sigue mencionado como uno de los 3
          modelos de negocio más arriba, pero ya no tiene su propio bloque
          grande en esta sección. */}
      <div ref={catalogRef} className="container-industrial py-16 md:py-24">
        <div className="max-w-2xl border-t border-line-on-light pt-14 md:pt-20">
          <span className="font-label mb-10 block text-ink/45">Productos terminados</span>
          <ul className="flex flex-col divide-y divide-line-on-light">
            {cota.finishedProducts.map((product, i) => (
              <li key={product} className="catalog-item group flex items-baseline gap-6 py-4">
                <span className="font-impact-number text-2xl text-ink/25 transition-colors duration-300 group-hover:text-ink/55 md:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink/70 transition-colors duration-300 group-hover:text-ink">{product}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
