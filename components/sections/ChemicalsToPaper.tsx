"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import { EASE_STANDARD } from "@/lib/motion/tokens";
import PhotoMedia from "@/components/visuals/PhotoMedia";
import Counter from "@/components/ui/Counter";
import { cota } from "@/lib/content/cota";

const CHEM_ITEMS = cota.chemicalTypes.map((type) => `Blanqueadores ${type}`);
const PAPER_ITEMS = ["Bobinas para convertidores", `${cota.guardian.name} — línea profesional`, "Producción propia en Naschel"];

// Rediseño (pedido directo del cliente, feedback por WhatsApp 2026-09-15,
// mismo día que IndustrialProcess): la versión anterior pineaba la sección
// 200vh con un crossfade Químicos→Papel scrubeado ("esto se me sigue
// trabando"). Se saca el pin/scrub por completo — mismo diagnóstico que
// IndustrialProcess (memoria: un pin+scrub sostenido sobre una foto
// full-bleed tiene costo real de frame, independiente de que la lógica de
// opacidad esté bien). El contador y las 2 listas de productos se
// mantienen (el cliente pidió explícitamente no sacarlos), con una
// animación liviana de entrada (scrub corto, sin pin, mismo patrón que
// WhyCota.tsx) en vez del timeline pineado. Las fotos de fondo por
// capítulo (quimicos-tanques.png / bobinas-deposito.jpeg) se sacaron de
// ahí y pasaron a la "Galería" de abajo, que es lo que pidió el cliente en
// su lugar: fotos + flecha para ir pasando, con esa etiqueta, terminando
// en un CTA de contacto.
const GALLERY_PHOTOS = [
  { src: "/photos/quimicos-tanques.png", alt: "Tanques de proceso en la planta de COTA" },
  { src: "/photos/bobinas-deposito.jpeg", alt: "Depósito con bobinas de papel Tissue en pallets" },
  { src: "/photos/papel-produccion-tissue.jpeg", alt: "Línea de conversión de papel Tissue en la planta de COTA" },
  { src: "/photos/proceso-rebobinado-real.jpeg", alt: "Bobina de papel en máquina rebobinadora, planta de COTA" },
  { src: "/photos/bobinas-pallet-220cm.jpeg", alt: "Bobina de papel de 220cm en pallet junto a operarios" },
  { src: "/photos/proceso-materia-prima.png", alt: "Ingreso a la planta de COTA" },
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

export default function ChemicalsToPaper() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  // +1 = la card de contacto al final de la galería.
  const slideCount = GALLERY_PHOTOS.length + 1;
  const activeIndex = Math.min(slideCount - 1, Math.round(progress * (slideCount - 1)));

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
    const card = el.querySelector<HTMLElement>(".gal-card");
    const amount = (card?.offsetWidth ?? el.clientWidth) + 16; // + gap-4
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ctp-reveal",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: EASE_STANDARD,
          scrollTrigger: { trigger: rootRef.current, start: "top 75%", end: "top 40%", scrub: true },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="quimicos" className="section-py-lg relative w-full bg-ink-deep">
      <div className="container-industrial">
        {/* Capítulo Químicos */}
        <div>
          <span className="font-label mb-4 block text-paper/60">Químicos — 01</span>
          <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
            <h3 className="ctp-reveal text-display max-w-2xl text-paper">Precisión en cada reacción.</h3>
            <div className="ctp-reveal">
              <span className="font-impact-number text-stat block text-paper">
                <Counter target={cota.chemicalTypes.length} />
              </span>
              <span className="font-label text-paper/50">Tipos de blanqueadores</span>
            </div>
          </div>
          <ul className="mt-8 flex flex-col gap-2">
            {CHEM_ITEMS.map((item, i) => (
              <li key={item} className="ctp-reveal font-label text-paper/65">
                {String(i + 1).padStart(2, "0")} — {item}
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${cota.contact.email}?subject=${encodeURIComponent("Ficha técnica — Blanqueadores y químicos")}`}
            className="font-label mt-6 inline-block w-fit border-b border-paper/40 pb-0.5 text-paper transition-colors hover:border-paper"
          >
            Solicitar ficha técnica <span className="cta-arrow">→</span>
          </a>
        </div>

        {/* Capítulo Papel */}
        <div className="mt-16 md:mt-20">
          <span className="font-label mb-4 block text-paper/60">Papel — 02</span>
          <h3 className="ctp-reveal text-display max-w-2xl text-paper">Papel Tissue a escala industrial.</h3>
          <ul className="mt-8 flex flex-col gap-2">
            {PAPER_ITEMS.map((item, i) => (
              <li key={item} className="ctp-reveal font-label text-paper/65">
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
        </div>

        {/* Galería — pedido explícito del cliente en vez del crossfade
            pineado: fotos reales de Químicos y Papel, deslizable con
            flechas, terminando en una card de contacto en vez de otra
            foto. */}
        <div className="mt-16 md:mt-20">
          <span className="font-label mb-6 block text-paper/50">Galería</span>
          <div
            ref={scrollerRef}
            onScroll={updateEdges}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:gap-6"
          >
            {GALLERY_PHOTOS.map((photo) => (
              <div
                key={photo.src}
                className="gal-card relative h-[34vh] w-[62vw] shrink-0 snap-start overflow-hidden md:h-[280px] md:w-[320px]"
              >
                <PhotoMedia src={photo.src} alt={photo.alt} sizes="(min-width: 768px) 320px, 62vw" />
              </div>
            ))}
            <a
              href="#contacto"
              className="gal-card group flex h-[34vh] w-[62vw] shrink-0 snap-start flex-col items-start justify-center gap-2 border border-line-on-dark px-6 text-paper transition-colors hover:bg-paper/5 md:h-[280px] md:w-[320px]"
            >
              <span className="font-label text-paper/50">¿Necesitás más info?</span>
              <span className="text-heading">
                Contactar para más <span className="cta-arrow inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
          </div>

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
            {String(activeIndex + 1).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
