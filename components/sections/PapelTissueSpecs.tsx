"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import { EASE_STANDARD } from "@/lib/motion/tokens";
import SpecCounter from "@/components/ui/SpecCounter";
import PhotoMedia from "@/components/visuals/PhotoMedia";
import { cota } from "@/lib/content/cota";

/*
 * Bobinas Industriales — producto principal de COTA (jerarquía de
 * contenido, 2026-09-23). Relato: Papel Tissue (PapelTissue.tsx) → Bobinas
 * Industriales (acá) → Productos convertidos (ProductosConvertidos.tsx).
 * Junta en una sola sección lo que antes estaba repartido: la presentación
 * de bobinas, el modelo "Fabricación", las especificaciones técnicas y el
 * catálogo de bobinas (que antes sólo aparecía en Contacto). Nombre de
 * archivo sin cambiar para no romper imports.
 */
export default function PapelTissueSpecs() {
  const introRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bobina-intro",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: EASE_STANDARD,
          scrollTrigger: { trigger: introRef.current, start: "top 80%", end: "top 45%", scrub: true },
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
          ease: EASE_STANDARD,
          scrollTrigger: { trigger: specsRef.current, start: "top 75%", end: "top 35%", scrub: true },
        },
      );
    }, [introRef, specsRef]);
    return () => ctx.revert();
  }, []);

  return (
    <section id="bobinas" className="relative w-full bg-paper">
      <div
        ref={introRef}
        className="container-industrial grid grid-cols-1 gap-16 pt-24 pb-16 md:grid-cols-[1fr_0.8fr] md:items-center md:gap-16 md:pt-32 md:pb-20"
      >
        <div className="bobina-intro">
          <span className="font-label mb-6 block text-ink/45">Papel Tissue — Bobinas industriales</span>
          <h2 className="text-display max-w-2xl text-ink">Bobinas para convertidores, a su medida.</h2>
          <p className="mt-6 max-w-lg text-base text-ink/60 md:text-lg">
            Bobinas de papel Tissue blanco puro para convertidores y rebobinadores. Producción
            propia en {cota.plant.location}, con anchos de hasta {cota.bobinaSpecs.anchos[0]}.
          </p>
          <p className="font-label mt-6 text-ink/45">Medidas y stock a consultar.</p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <a
              href="#contacto"
              className="font-label inline-block w-fit border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60"
            >
              Consultar por bobinas <span className="cta-arrow">→</span>
            </a>
            <a
              href="/catalogos/catalogo-bobinas-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-label inline-block w-fit border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60"
            >
              Catálogo de bobinas 2026 <span className="cta-arrow">→</span>
            </a>
          </div>
        </div>

        {/* bobinas-pallet-220cm.jpeg: antes era la foto del panel "Bobinas
            Industriales" de ProductFamilies (desmontado). */}
        <div className="bobina-intro relative aspect-[4/3] w-full overflow-hidden rounded-sm">
          <PhotoMedia
            src="/photos/bobinas-pallet-220cm.jpeg"
            alt="Bobina industrial de 220 cm sobre pallet, planta de COTA"
            sizes="(min-width: 768px) 44vw, 100vw"
          />
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
                  <td className="font-impact-number text-index text-paper transition-transform duration-300 hover:translate-x-1">
                    <SpecCounter values={cota.bobinaSpecs.anchos} />
                  </td>
                </tr>
                <tr className="spec-row border-b border-line-on-dark transition-colors duration-300 hover:bg-paper/[0.04]">
                  <td className="py-5 pr-8 text-paper/70">Diámetro</td>
                  <td className="font-impact-number text-index text-paper transition-transform duration-300 hover:translate-x-1">
                    <SpecCounter values={cota.bobinaSpecs.diametros} />
                  </td>
                </tr>
                <tr className="spec-row border-b border-line-on-dark transition-colors duration-300 hover:bg-paper/[0.04]">
                  <td className="py-5 pr-8 text-paper/70">Cono interior</td>
                  <td className="font-impact-number text-index text-paper transition-transform duration-300 hover:translate-x-1">
                    <SpecCounter values={[cota.bobinaSpecs.conoInterior]} />
                  </td>
                </tr>
                {/* Gramaje por producto — mismas filas .spec-row que Ancho/
                    Diámetro/Cono interior arriba (antes vivían en una lista
                    <dl> aparte, con números más chicos y sin la animación
                    de conteo — pedido del cliente: mismo tamaño, layout y
                    animación que el resto de la tabla). Cada producto es
                    una fila más — el "Medida" pasa a ser el nombre del
                    producto, "Valores disponibles" su gramaje. */}
                {cota.bobinaSpecs.gramajes.map((g, i) => (
                  <tr
                    key={g.label}
                    className={`spec-row transition-colors duration-300 hover:bg-paper/[0.04] ${
                      i < cota.bobinaSpecs.gramajes.length - 1 ? "border-b border-line-on-dark" : ""
                    }`}
                  >
                    <td className="py-5 pr-8 text-paper/70">{g.label}</td>
                    <td className="font-impact-number text-index text-paper transition-transform duration-300 hover:translate-x-1">
                      <SpecCounter values={[g.value]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-label mt-4 text-paper/40">Consultar alternativas de gramaje.</p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <a
              href="#contacto"
              className="font-label inline-block w-fit border-b border-paper/40 pb-0.5 text-paper transition-colors hover:border-paper"
            >
              Ir a contacto <span className="cta-arrow">→</span>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
