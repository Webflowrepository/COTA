"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import { EASE_STANDARD } from "@/lib/motion/tokens";
import PhotoMedia from "@/components/visuals/PhotoMedia";

// Rediseño completo (pedido del cliente, feedback directo por WhatsApp +
// voz transcripta el 2026-09-14): la versión anterior pineaba la sección
// con GSAP (scroll vertical → paneo horizontal) — después de varias
// rondas de arreglos (transparencia, dead-zone, el bug de iOS con la
// barra de direcciones colapsando, el punto de navegación que saltaba de
// más) el cliente reportó que en algunas computadoras SEGUÍA viéndose mal
// ("se traba"), y pidió algo más liviano: "editarla y que vaya más rápido
// y con menos peso". Esta versión no pinea nada — es una grilla estática
// en desktop (sin scroll propio) y un carrusel con snap + flechas en
// mobile (mismo patrón ya probado en ProductFamilies.tsx), sin ningún
// ScrollTrigger de pin, sin z-index dinámico, sin el hack de
// visualViewport. Mucho menos superficie para que algo salga mal.
//
// También se sacó la etapa "Proceso Químico": el cliente marcó 2 cosas
// sobre esta sección en el mismo mensaje — que "repite conceptos que se
// mencionan reiteradamente" y que "algunas de las fotos son muy IA". Esa
// etapa era ambas cosas a la vez: su foto (proceso-tanques-exterior.png)
// es una imagen generada, y Químicos ya tiene su propia sección completa
// inmediatamente después (ChemicalsToPaper) — mostrarlo acá también era
// la repetición más redundante de las 4 etapas originales. Quedan 3
// etapas, todas con foto real: Materia Prima → Conversión Integrada →
// Rebobinado.
const STAGES = [
  {
    n: "01",
    title: "Materia Prima",
    copy: "Fibra ingresa al proceso industrial.",
    photo: { src: "/photos/proceso-materia-prima.png", alt: "Ingreso a la planta de COTA" },
  },
  {
    n: "02",
    // Antes decía "Fabricación de Papel Tissue" — el cliente marcó que la
    // foto (papel-produccion-tissue.jpeg) en realidad muestra conversión
    // (corte y apilado de servilletas en la línea), no la fabricación del
    // papel en sí. En vez de salir a buscar otra foto de fabricación pura,
    // se ajustó el título/copy para que describan lo que la foto
    // efectivamente muestra.
    title: "Conversión Integrada",
    copy: "El papel se corta y convierte en línea, a escala industrial.",
    photo: { src: "/photos/papel-produccion-tissue.jpeg", alt: "Línea de conversión de papel Tissue en la planta de COTA" },
  },
  {
    n: "03",
    title: "Rebobinado",
    copy: "El papel se rebobina y se prepara para su conversión.",
    photo: { src: "/photos/proceso-rebobinado-real.jpeg", alt: "Bobina de papel en máquina rebobinadora, planta de COTA" },
  },
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const activeIndex = Math.min(STAGES.length - 1, Math.round(progress * (STAGES.length - 1)));

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

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ip-card",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: EASE_STANDARD,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "top 45%", scrub: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      /* scroll-mt: al entrar por el link del nav (o por scroll normal), el
         kicker "Recorrido industrial" arrancaba pegado al borde superior
         de la sección — quedaba tapado por el nav fijo. */
      className="section-py-md relative w-full scroll-mt-24 bg-ink-deep"
    >
      <div className="container-industrial mb-10 md:mb-14">
        <span className="font-label mb-4 block text-paper/50">Recorrido industrial</span>
        <h2 className="text-display max-w-md text-paper">Materia prima → producto terminado.</h2>
      </div>

      {/* Mobile: carrusel deslizable con snap + flechas. Desde md: grilla
          estática de 3 columnas, sin scroll propio (3 etapas entran cómodas
          sin achicarlas). Mismo patrón de scroller que ProductFamilies.tsx
          — reusar en vez de inventar un mecanismo nuevo. */}
      <div className="container-industrial">
        <div
          ref={scrollerRef}
          onScroll={updateEdges}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0"
        >
          {STAGES.map((stage) => (
            <div
              key={stage.n}
              className="ip-card relative h-[62vh] w-[86vw] shrink-0 snap-start overflow-hidden md:h-[52vh] md:w-auto"
            >
              <PhotoMedia
                src={stage.photo.src}
                alt={stage.photo.alt}
                sizes="(min-width: 768px) 33vw, 86vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(6,8,17,0.9) 0%, rgba(6,8,17,0.55) 40%, rgba(6,8,17,0.12) 75%, rgba(6,8,17,0) 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-7 text-paper md:p-9">
                <span className="font-label mb-3 block text-paper/70">
                  {stage.n} / {String(STAGES.length).padStart(2, "0")}
                </span>
                <h3 className="text-heading">{stage.title}</h3>
                <p className="mt-3 max-w-xs text-sm text-paper/70">{stage.copy}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controles — solo mobile (en desktop las 3 etapas ya están a la
            vista, no hay nada que deslizar). Flechas, tal como pidió el
            cliente ("dejar algunas imágenes y agregarle flechitas"), más
            la misma barra de progreso arrastrable que ya usa
            ProductFamilies.tsx. */}
        <div className="mt-5 flex items-center gap-4 md:hidden">
          <button
            type="button"
            aria-label="Etapa anterior"
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
            aria-label="Etapa siguiente"
            disabled={atEnd}
            onClick={() => scrollByCard(1)}
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-line-on-dark text-paper transition-opacity disabled:opacity-30"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
        <span className="font-label mt-3 block text-paper/40 md:hidden">
          {String(activeIndex + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
