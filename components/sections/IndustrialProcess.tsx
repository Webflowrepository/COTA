"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import PlaceholderMedia from "@/components/visuals/PlaceholderMedia";
import PhotoMedia from "@/components/visuals/PhotoMedia";

const STAGES = [
  {
    n: "01",
    title: "Materia Prima",
    copy: "Fibra ingresa al proceso industrial.",
    label: "Foto — recepción de fibra / materia prima",
    dark: false,
    photo: { src: "/photos/proceso-materia-prima.png", alt: "Ingreso a la planta de COTA" },
  },
  {
    n: "02",
    title: "Proceso Químico",
    copy: "Blanqueadores ópticos desarrollados por COTA integran el proceso.",
    label: "Foto — tanque de proceso químico",
    dark: true,
    photo: { src: "/photos/proceso-tanques.png", alt: "Tanques de proceso en la planta de COTA" },
  },
  {
    n: "03",
    title: "Fabricación de Papel Tissue",
    copy: "La fibra se transforma en papel Tissue a escala industrial.",
    label: "Foto — máquina papelera en producción",
    dark: false,
    photo: { src: "/photos/planta-porton.png", alt: "Planta de COTA — acceso" },
  },
  {
    n: "04",
    title: "Rebobinado",
    copy: "El papel se rebobina y se prepara para su conversión.",
    label: "Foto — rebobinadora industrial",
    dark: false,
    photo: { src: "/photos/marca-logo-pared-2.png", alt: "Marca COTA en la planta" },
  },
  {
    n: "05",
    title: "Producto Terminado",
    copy: "Cada bobina sale lista para su conversión.",
    label: "Foto — bobina terminada",
    dark: false,
    photo: { src: "/photos/marca-logo-pared.png", alt: "Marca COTA en la planta" },
  },
  {
    n: "06",
    title: "Logística",
    copy: "Distribución de bobinas hacia convertidores y distribuidores.",
    label: "Foto — despacho / logística",
    dark: false,
    photo: { src: "/photos/naschel-planta-aerea.png", alt: "Planta de COTA, vista aérea con patio de despacho" },
  },
];

export default function IndustrialProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight}`,
        pin: true,
        scrub: 0.3,
        animation: tween,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgress(self.progress),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="proceso" ref={sectionRef} className="relative w-full bg-ink-deep">
      <div className="relative h-[100svh] w-full overflow-hidden">
        <div className="container-industrial pointer-events-none absolute inset-x-0 top-10 z-10 flex items-end justify-between md:top-14">
          <div>
            <span className="font-label mb-4 block text-paper/50">Recorrido industrial</span>
            <h2 className="text-display max-w-md text-paper">Materia prima → producto terminado.</h2>
          </div>
          <span className="font-label hidden text-paper/40 md:block">Scroll para avanzar</span>
        </div>

        <div
          ref={trackRef}
          className="flex h-full items-end gap-4 pb-24 pl-5 will-change-transform md:gap-6 md:pb-28 md:pl-12"
        >
          {STAGES.map((stage) => (
            <div
              key={stage.n}
              className="ip-panel relative h-[62vh] w-[86vw] shrink-0 overflow-hidden md:h-[68vh] md:w-[46vw] lg:w-[36vw]"
            >
              <div className="absolute inset-0">
                {stage.photo ? (
                  <PhotoMedia src={stage.photo.src} alt={stage.photo.alt} />
                ) : (
                  <PlaceholderMedia tone={stage.dark ? "dark" : "light"} label={stage.label} />
                )}
              </div>
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(0deg, rgba(6,8,17,0.75) 0%, transparent 45%)" }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-7 text-paper md:p-9">
                <span className="font-label mb-3 block text-paper/60">{stage.n} / 06</span>
                <h3 className="text-heading">{stage.title}</h3>
                <p className="mt-3 max-w-xs text-sm text-paper/70">{stage.copy}</p>
              </div>
            </div>
          ))}
          <div className="w-5 shrink-0 md:w-12" aria-hidden />
        </div>

        <div className="container-industrial absolute inset-x-0 bottom-10 md:bottom-14">
          <div className="h-px w-full bg-line-on-dark">
            <div
              className="h-px bg-paper/60 transition-[width] duration-150 ease-out"
              style={{ width: `${Math.max(2, progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
