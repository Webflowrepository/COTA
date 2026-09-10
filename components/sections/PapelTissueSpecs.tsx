"use client";

import { useEffect, useRef, type JSX } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import { EASE_STANDARD } from "@/lib/motion/tokens";
import SpecCounter from "@/components/ui/SpecCounter";
import {
  RollIcon,
  IndustrialRollIcon,
  InterfoldBoxIcon,
  ToiletRollIcon,
  NapkinBoxIcon,
  LeafIcon,
} from "@/components/ui/ProductIcons";
import { cota } from "@/lib/content/cota";

/**
 * Rediseño de "Nuestros Productos" (pedido explícito del cliente, con
 * referencia visual propia — línea minimalista verde sobre blanco, sin
 * fotos/cards/sombras). Reemplaza el intento anterior con fotos de stock
 * (no llegó a usarse: quedaba un mapa de fotos sin conectar al render) —
 * un ícono de línea propio por producto es más consistente con "no look
 * de stock-photo" que pidió el cliente, y no depende de conseguir fotos
 * reales de producto que todavía no existen.
 */
const PRODUCT_ICON: Record<string, (props: { className?: string }) => JSX.Element> = {
  "toallas-rollo-camilleros": RollIcon,
  "bobinas-limpieza": IndustrialRollIcon,
  "toallas-intercaladas": InterfoldBoxIcon,
  "papel-higienico": ToiletRollIcon,
  servilletas: NapkinBoxIcon,
};

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
          ease: EASE_STANDARD,
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
          ease: EASE_STANDARD,
          scrollTrigger: { trigger: specsRef.current, start: "top 75%", end: "top 35%", scrub: true },
        },
      );
      gsap.fromTo(
        ".product-card",
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: EASE_STANDARD,
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

      {/* Nuestros Productos — rediseño a pedido del cliente: línea
          minimalista verde sobre blanco, un ícono propio por producto (sin
          fotos, sin cards, sin sombras — ver comentario junto a
          PRODUCT_ICON arriba). 5 tarjetas, no 6: "Toallas en rollo" y
          "Camilleros" se fusionaron en una sola (ver comentario en
          cota.ts). Grilla de 6 columnas en desktop, cada tarjeta ocupa 2
          (=3 por fila): la fila de abajo (2 tarjetas) usa col-start para
          quedar centrada en vez de pegada a la izquierda.
          Encabezado: la primera versión centraba título+ícono como un
          bloque aislado — no seguía el patrón del resto del sitio (acá
          mismo, "Modelos de negocio" y "Especificaciones técnicas" usan un
          kicker .font-label chico, alineado a la izquierda, sin heading
          grande propio). Se corrigió a ese mismo patrón — la hoja queda
          chica, en línea junto al kicker, no como marca centrada. */}
      <div ref={catalogRef} className="container-industrial py-16 md:py-24">
        <div className="border-t border-line-on-light pt-14 md:pt-20">
          <span className="font-label mb-10 flex items-center gap-2 text-ink/45">
            Nuestros productos
            <LeafIcon className="h-4 w-4 text-green" />
          </span>

          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-6 md:gap-y-20">
            {cota.finishedProducts.map((product, i) => {
              const Icon = PRODUCT_ICON[product.id];
              return (
                <div
                  key={product.id}
                  className={`product-card flex flex-col items-center text-center md:col-span-2 ${
                    i === 3 ? "md:col-start-2" : i === 4 ? "md:col-start-4" : ""
                  }`}
                >
                  <Icon className="h-12 w-12 text-green md:h-14 md:w-14" />
                  <h4 className="mt-6 max-w-[15rem] text-lg text-ink">{product.label}</h4>
                  <p className="font-label mt-2 text-ink/45">{product.subtitle}</p>
                </div>
              );
            })}
          </div>

          {/* Centrado, no alineado a la izquierda como el resto de los CTA
              del sitio — acá el contenido de arriba (las 5 tarjetas) es
              simétrico/centrado en la página, no un bloque de texto a la
              izquierda como en el resto de las secciones. Un CTA pegado
              al margen izquierdo quedaba descolgado de esa simetría
              (pedido del cliente viendo el resultado en pantalla). */}
          <div className="mt-16 flex justify-center md:mt-20">
            <a
              href="/catalogos/catalogo-producto-convertido.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-label inline-flex items-center gap-2 rounded-full border border-green px-8 py-3.5 text-green transition-colors hover:bg-green hover:text-paper"
            >
              Descargá nuestro catálogo <span className="cta-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
