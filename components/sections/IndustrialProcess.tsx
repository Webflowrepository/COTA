"use client";

import { useRef, useState } from "react";
import PhotoMedia from "@/components/visuals/PhotoMedia";

// Rediseño completo (pedido del cliente, feedback directo por WhatsApp +
// voz transcripta el 2026-09-14): la versión anterior pineaba la sección
// con GSAP (scroll vertical → paneo horizontal) — después de varias
// rondas de arreglos (transparencia, dead-zone, el bug de iOS con la
// barra de direcciones colapsando, el punto de navegación que saltaba de
// más) el cliente reportó que en algunas computadoras SEGUÍA viéndose mal
// ("se traba"), y pidió algo más liviano: "editarla y que vaya más rápido
// y con menos peso". Esta versión no pinea nada — es un carrusel con snap
// + flechas (mismo patrón ya probado en ProductFamilies.tsx), sin ningún
// ScrollTrigger de pin, sin z-index dinámico, sin el hack de
// visualViewport. Mucho menos superficie para que algo salga mal.
//
// También se sacó la etapa "Proceso Químico": el cliente marcó 2 cosas
// sobre esta sección en el mismo mensaje — que "repite conceptos que se
// mencionan reiteradamente" y que "algunas de las fotos son muy IA". Esa
// etapa era ambas cosas a la vez: su foto (proceso-tanques-exterior.png)
// es una imagen generada, y Químicos ya tiene su propia sección completa
// inmediatamente después (ChemicalsToPaper) — mostrarlo acá también era
// la repetición más redundante de las 4 etapas originales.
//
// Segundo pedido (2026-09-15): sacar la animación de entrada (ya se sacó
// más abajo) y convertir esto en un "banco de imágenes reales" para
// deslizar — no 3 tarjetas fijas con título/copy de etapa, sino una tira
// más larga de fotos reales de la planta (bobinas, depósito, producción)
// que se puede recorrer arrastrando/con flechas, en mobile Y desktop (ya
// no hay grilla estática de 3 columnas). Sin fotos de "producto terminado"
// (toallas, rollos empaquetados): no existe ninguna foto real de eso
// todavía (ver ASSETS.md — ya se buscó antes y el pozo de stock también
// está seco); el cliente aprobó seguir sin eso por ahora y reutilizar
// fotos reales que ya aparecen en otras secciones en vez de esperar.
// Se excluyen a propósito las 2 fotos de esta sección marcadas como
// generadas por IA en el resto del sitio (quimicos-ibc-tanques.png,
// soluciones-rebobinadora.png, ver ProductFamilies.tsx) — este banco es
// específicamente "imágenes reales", no vale mezclar renders acá.
const GALLERY_PHOTOS = [
  { src: "/photos/proceso-materia-prima.png", alt: "Ingreso a la planta de COTA" },
  { src: "/photos/proceso-tanques.png", alt: "Tanques de proceso en la planta de COTA" },
  { src: "/photos/papel-produccion-tissue.jpeg", alt: "Línea de conversión de papel Tissue en la planta de COTA" },
  { src: "/photos/proceso-rebobinado-real.jpeg", alt: "Bobina de papel en máquina rebobinadora, planta de COTA" },
  { src: "/photos/bobinas-deposito.jpeg", alt: "Depósito con bobinas de papel Tissue en pallets" },
  { src: "/photos/bobinas-pallet-220cm.jpeg", alt: "Bobina de papel de 220cm en pallet junto a operarios" },
  { src: "/photos/bobinas-industriales-nave.png", alt: "Nave industrial con bobinas de papel Tissue" },
  { src: "/photos/conversion-integrada.png", alt: "Operarios junto a máquina de conversión de papel Tissue" },
  { src: "/photos/soluciones-logistica-montacargas.png", alt: "Montacargas moviendo bobina de papel en planta de COTA" },
  { src: "/photos/naschel-planta-aerea.png", alt: "Vista aérea de la planta de COTA en Naschel" },
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

export default function IndustrialProcess() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const activeIndex = Math.min(GALLERY_PHOTOS.length - 1, Math.round(progress * (GALLERY_PHOTOS.length - 1)));

  function updateEdges() {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);
  }

  function scrollByCard(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".ip-card");
    const amount = (card?.offsetWidth ?? el.clientWidth) + 16; // + gap-4
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section
      id="proceso"
      /* scroll-mt: al entrar por el link del nav (o por scroll normal), el
         kicker "Recorrido industrial" arrancaba pegado al borde superior
         de la sección — quedaba tapado por el nav fijo. */
      className="section-py-md relative w-full scroll-mt-24 bg-ink-deep"
    >
      <div className="container-industrial mb-10 md:mb-14">
        <span className="font-label mb-4 block text-paper/50">Recorrido industrial</span>
        <h2 className="text-display max-w-md text-paper">Materia prima → producto terminado.</h2>
      </div>

      {/* Banco de imágenes reales, deslizable en mobile Y desktop (a
          diferencia de la versión anterior, ya no hay breakpoint que
          "aplane" esto en una grilla estática — con 10 fotos no entran
          todas sin scroll en ninguna pantalla, y ese es el punto: es un
          banco para recorrer, no un set fijo de 3 pasos). Mismo patrón de
          scroller (snap + flechas + barra de progreso) que ya usa
          ProductFamilies.tsx — reusar en vez de inventar un mecanismo
          nuevo. Sin overlay/gradiente ni texto encima de cada foto: es
          solo la imagen, el título de la sección ya da el contexto. */}
      <div className="container-industrial">
        <div
          ref={scrollerRef}
          onScroll={updateEdges}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:gap-6"
        >
          {GALLERY_PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="ip-card relative h-[62vh] w-[86vw] shrink-0 snap-start overflow-hidden md:h-[64vh] md:w-[440px]"
            >
              <PhotoMedia src={photo.src} alt={photo.alt} sizes="(min-width: 768px) 440px, 86vw" />
            </div>
          ))}
        </div>

        {/* Flechas + barra de progreso arrastrable, visibles en todos los
            tamaños ahora (antes solo mobile, porque desktop mostraba las 3
            etapas sin scroll — ya no es el caso). */}
        <div className="mt-5 flex items-center gap-4">
          <button
            type="button"
            aria-label="Foto anterior"
            disabled={atStart}
            onClick={() => scrollByCard(-1)}
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-line-on-dark text-paper transition-opacity disabled:opacity-30"
          >
            <ChevronIcon direction="left" />
          </button>
          <div className="h-px flex-1 bg-line-on-dark">
            <div
              className="h-px bg-paper/60 transition-[width] duration-150 ease-out"
              style={{ width: `${Math.max(4, progress * 100)}%` }}
            />
          </div>
          <button
            type="button"
            aria-label="Foto siguiente"
            disabled={atEnd}
            onClick={() => scrollByCard(1)}
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-line-on-dark text-paper transition-opacity disabled:opacity-30"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
        <span className="font-label mt-3 block text-paper/40">
          {String(activeIndex + 1).padStart(2, "0")} / {String(GALLERY_PHOTOS.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
