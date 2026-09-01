"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import PhotoMedia from "@/components/visuals/PhotoMedia";
import PlaceholderMedia from "@/components/visuals/PlaceholderMedia";
import { cota } from "@/lib/content/cota";

const bobinas = cota.services.find((s) => s.id === "bobinas")!;
const quimicos = cota.businessLines.find((l) => l.id === "quimicos")!;
const soluciones = cota.businessLines.find((l) => l.id === "soluciones")!;

const PANELS = [
  {
    id: "quimicos",
    label: quimicos.label,
    short: quimicos.short,
    mediaLabel: "Foto — proceso químico",
    categoryId: "quimicos",
  },
  {
    id: "bobinas",
    label: "Bobinas Industriales",
    short: bobinas.short,
    mediaLabel: "Foto — bobina de papel",
    categoryId: "bobinas",
  },
  // Guardián ya no es un panel acá — sin foto de producto, quedaba "colgado"
  // junto a 3 fotos reales (2 rondas de retoque de estilo no lo arreglaron,
  // el problema era el formato, no el color). Su presencia ahora se
  // concentra en un bloque propio y más importante en PapelTissueSpecs.tsx,
  // junto al catálogo de productos terminados.
  {
    id: "soluciones",
    label: soluciones.label,
    short: soluciones.short,
    mediaLabel: "Foto — maquinaria / instalación",
    categoryId: "maquinaria",
  },
];

export default function ProductFamilies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }

  // la barra también funciona como control: clickear/arrastrar sobre ella
  // salta el carrusel a ese punto, por si alguien intenta usarla como
  // scrollbar en vez de scrollear el panel en sí.
  function seekTo(clientX: number) {
    const track = trackRef.current;
    const el = scrollerRef.current;
    if (!track || !el) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth);
  }

  function handleTrackPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    seekTo(e.clientX);
    const onMove = (ev: PointerEvent) => seekTo(ev.clientX);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pf-panel",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 40%", scrub: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // la mayoría llega acá con mouse (rueda vertical), no trackpad — sin esto,
  // "desplazar horizontalmente" no responde a una rueda de mouse normal.
  // Convertimos el scroll vertical en horizontal mientras haya recorrido
  // pendiente; una vez que el carrusel llega al final, se deja pasar el
  // scroll normal para que la página siga bajando. React registra onWheel
  // como listener pasivo (no permite preventDefault), así que se engancha
  // a mano con { passive: false }.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= max - 1;
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-paper py-24 md:py-32">
      <div className="container-industrial mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
        <div>
          <h2 className="text-display max-w-md text-ink">Un sistema industrial integrado.</h2>
          <a
            href="#contacto"
            className="font-label mt-4 inline-block w-fit border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60"
          >
            Ir al formulario <span className="cta-arrow">→</span>
          </a>
        </div>
        <span className="font-label hidden text-ink/40 md:block">Desplazar horizontalmente →</span>
      </div>

      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:gap-6 md:px-12"
      >
        {PANELS.map((panel) => {
          const categoryLabel = cota.contactCategories.find((c) => c.id === panel.categoryId)?.label ?? panel.label;
          const mailto = `mailto:${cota.contact.email}?subject=${encodeURIComponent(`Ficha técnica — ${categoryLabel}`)}`;
          return (
            <div
              key={panel.id}
              className="pf-panel group relative h-[62vh] w-[86vw] shrink-0 snap-start overflow-hidden md:h-[68vh] md:w-[46vw] lg:w-[36vw]"
            >
              <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
                {panel.id === "soluciones" ? (
                  <PhotoMedia src="/photos/naschel-planta-aerea.png" alt="Planta de COTA — logística y despacho" />
                ) : panel.id === "quimicos" ? (
                  <PhotoMedia src="/photos/quimicos-tanques.png" alt="Tanques de proceso en la planta de COTA" />
                ) : (
                  <PlaceholderMedia tone="dark" label={panel.mediaLabel} />
                )}
              </div>
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(0deg, rgba(6,8,17,0.75) 0%, transparent 45%)" }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-7 text-paper md:p-9">
                <span className="font-label mb-3 block text-paper/70">Línea de producto</span>
                <h3 className="text-heading">{panel.label}</h3>
                <p className="mt-3 max-w-xs text-sm text-paper/70">{panel.short}</p>
                <a
                  href={mailto}
                  className="font-label mt-6 inline-block w-fit border-b border-paper/40 pb-0.5 text-paper transition-colors hover:border-paper"
                >
                  Solicitar ficha técnica <span className="cta-arrow">→</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="container-industrial mt-1 flex justify-center">
        <div
          ref={trackRef}
          onPointerDown={handleTrackPointerDown}
          className="flex w-24 cursor-pointer items-center py-2"
        >
          <div className="h-px w-full bg-line-on-light">
            <div
              className="h-px bg-ink transition-[width] duration-150 ease-out"
              style={{ width: `${Math.max(15, progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
