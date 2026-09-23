"use client";

import { useEffect, useRef, useState, type JSX } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import { EASE_STANDARD } from "@/lib/motion/tokens";
import PhotoMedia from "@/components/visuals/PhotoMedia";
import {
  RollIcon,
  IndustrialRollIcon,
  InterfoldBoxIcon,
  ToiletRollIcon,
  NapkinBoxIcon,
  LeafIcon,
} from "@/components/ui/ProductIcons";
import { cota } from "@/lib/content/cota";

/*
 * Productos convertidos — tercer paso del relato de Papel Tissue
 * (Papel Tissue → Bobinas Industriales → Productos convertidos), jerarquía
 * de contenido 2026-09-23. Reúne lo que antes estaba repartido al final de
 * PapelTissueSpecs.tsx ("Nuestros productos", galería, catálogo) más los
 * modelos de negocio que aplican a producto terminado (Producto Terminado y
 * Guardián). "Fabricación" quedó en la sección Bobinas, que es de lo que habla.
 */
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

// (galeria-bobina-inspeccion.jpeg salió de la galería: es la misma foto que
// bobinas-pallet-220cm.jpeg, que ahora ilustra la sección Bobinas.)
// Galería "De la bobina al producto convertido" — restaurada a pedido del
// cliente (se había sacado el 2026-09-20). papel-tissue-produccion-operarios.png
// se reemplazó por papel-produccion-tissue.jpeg porque la primera ahora se
// usa en WhatCotaDoes.tsx — ninguna foto se repite entre secciones. Orden:
// depósito → logística → conversión → producto → control de calidad.
const GALLERY_PHOTOS = [
  { src: "/photos/galeria-bobinas-deposito-filas.jpeg", alt: "Filas de bobinas de papel Tissue en depósito de COTA" },
  { src: "/photos/galeria-bobina-forklift.jpg", alt: "Operario trasladando bobina de papel con autoelevador en depósito" },
  { src: "/photos/galeria-bobina-camion.jpg", alt: "Carga de bobinas de papel en camión para despacho" },
  { src: "/photos/papel-produccion-tissue.jpeg", alt: "Línea de producción de papel Tissue en planta de COTA" },
  { src: "/photos/galeria-rebobinado-detalle.jpeg", alt: "Bobina ya convertida en máquina rebobinadora" },
  { src: "/photos/galeria-toallas-plegadas.jpeg", alt: "Toallas de papel plegadas saliendo de la línea de conversión" },
  { src: "/photos/galeria-control-calidad.jpg", alt: "Control de calidad de papel Tissue en laboratorio de planta" },
];

function ChevronIcon({ direction, className = "h-4 w-4" }: { direction: "left" | "right"; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CONVERTED_MODELS = cota.businessModels.filter((m) => m.id !== "fabricacion");

export default function ProductosConvertidos() {
  const catalogRef = useRef<HTMLDivElement>(null);
  const modelsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryAtStart, setGalleryAtStart] = useState(true);
  const [galleryAtEnd, setGalleryAtEnd] = useState(false);

  function updateGalleryEdges() {
    const el = galleryRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setGalleryAtStart(el.scrollLeft <= 1);
    setGalleryAtEnd(el.scrollLeft >= max - 1);
  }

  function scrollGalleryByCard(dir: 1 | -1) {
    const el = galleryRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".gallery-photo");
    const amount = (card?.offsetWidth ?? el.clientWidth) + 16; // + gap-4
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
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
        ".gallery-photo",
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: EASE_STANDARD,
          scrollTrigger: { trigger: galleryRef.current, start: "top 85%", end: "top 55%", scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="convertidos" className="section-py-md relative w-full bg-paper md:pb-40!">
      <div className="container-industrial">
        <span className="font-label mb-6 block text-ink/45">Papel Tissue — Productos convertidos</span>
        <h2 className="text-display max-w-2xl text-ink">Producto convertido, listo para distribución.</h2>
        <p className="mt-6 max-w-lg text-base text-ink/60 md:text-lg">
          {cota.services.find((s) => s.id === "productos")?.short}
        </p>

        <div ref={catalogRef} className="mt-16 border-t border-line-on-light pt-12 md:mt-24 md:pt-16">
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

        </div>

        {/* Modelos de negocio para producto terminado — mismo patrón numerado
            que usaba "Modelos de negocio" (01/02 grandes, divisor fino). */}
        <div ref={modelsRef} className="mt-16 md:mt-24">
          <span className="font-label mb-10 block text-ink/45">Modelos de negocio</span>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-line-on-light">
            {CONVERTED_MODELS.map((model, i) => (
              <div key={model.id} className="biz-model group md:px-10 md:first:pl-0 md:last:pr-0">
                <span className="font-impact-number text-stat block text-ink/25 transition-colors duration-300 group-hover:text-ink/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-heading mt-3 text-ink transition-transform duration-300 group-hover:translate-x-1">
                  {model.id === "guardian" ? `${model.label} — línea profesional` : model.label}
                </h3>
                <p className="mt-2 max-w-md text-sm text-ink/60 md:text-base">{model.short}</p>
              </div>
            ))}
          </div>
        </div>

          {/* Galería "De la bobina al producto convertido" — tira
              horizontal deslizable en todos los breakpoints, con flechas
              prev/next (mismo patrón que se usaba en Proceso Industrial,
              sección ya eliminada, pero el affordance para desktop sin
              trackpad sigue siendo válido acá). */}
          <div className="mt-16 md:mt-24">
            <span className="font-label mb-6 block text-ink/45">De la bobina al producto convertido</span>
            <div
              ref={galleryRef}
              onScroll={updateGalleryEdges}
              className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
            >
              {GALLERY_PHOTOS.map((photo) => (
                <div
                  key={photo.src}
                  className="gallery-photo relative h-[260px] w-[220px] shrink-0 snap-start overflow-hidden md:h-[320px] md:w-[270px]"
                >
                  <PhotoMedia src={photo.src} alt={photo.alt} sizes="(min-width: 768px) 270px, 220px" />
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-4">
              <button
                type="button"
                aria-label="Foto anterior"
                disabled={galleryAtStart}
                onClick={() => scrollGalleryByCard(-1)}
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-line-on-light text-ink/60 transition-opacity disabled:opacity-30"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                aria-label="Foto siguiente"
                disabled={galleryAtEnd}
                onClick={() => scrollGalleryByCard(1)}
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-line-on-light text-ink/60 transition-opacity disabled:opacity-30"
              >
                <ChevronIcon direction="right" />
              </button>
              <span className="font-label text-ink/40">Deslizar para ver más →</span>
            </div>
          </div>

          {/* Centrado, no alineado a la izquierda como el resto de los CTA
              del sitio — acá el contenido de arriba (las 5 tarjetas) es
              simétrico/centrado en la página, no un bloque de texto a la
              izquierda como en el resto de las secciones. Un CTA pegado
              al margen izquierdo quedaba descolgado de esa simetría
              (pedido del cliente viendo el resultado en pantalla). */}
          <div className="mt-12 flex justify-center md:mt-16">
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
    </section>
  );
}
