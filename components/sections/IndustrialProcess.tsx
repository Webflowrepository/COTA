"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import PlaceholderMedia from "@/components/visuals/PlaceholderMedia";

const STAGES = [
  {
    n: "01",
    title: "Materia Prima",
    copy: "Fibra ingresa al proceso industrial.",
    label: "Foto — recepción de fibra / materia prima",
    dark: false,
  },
  {
    n: "02",
    title: "Proceso Químico",
    copy: "Blanqueadores ópticos desarrollados por COTA integran el proceso.",
    label: "Foto — tanque de proceso químico",
    dark: true,
  },
  {
    n: "03",
    title: "Fabricación de Papel Tissue",
    copy: "La fibra se transforma en papel Tissue a escala industrial.",
    label: "Foto — máquina papelera en producción",
    dark: false,
  },
  {
    n: "04",
    title: "Rebobinado",
    copy: "El papel se rebobina y se prepara para su conversión.",
    label: "Foto — rebobinadora industrial",
    dark: false,
  },
  {
    n: "05",
    title: "Producto Terminado",
    copy: "Cada bobina sale lista para su conversión.",
    label: "Foto — bobina terminada",
    dark: false,
  },
  {
    n: "06",
    title: "Logística",
    copy: "Distribución de bobinas hacia convertidores y distribuidores.",
    label: "Foto — despacho / logística",
    dark: false,
  },
];

export default function IndustrialProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ip-panel",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.9,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 35%", scrub: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="proceso" ref={sectionRef} className="relative w-full bg-ink-deep py-24 md:py-32">
      <div className="container-industrial mb-10 flex items-end justify-between md:mb-14">
        <div>
          <span className="font-label mb-4 block text-paper/50">Recorrido industrial</span>
          <h2 className="text-display max-w-md text-paper">Materia prima → producto terminado.</h2>
        </div>
        <span className="font-label hidden text-paper/40 md:block">Desplazar horizontalmente →</span>
      </div>

      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:gap-6 md:px-12"
      >
        {STAGES.map((stage) => (
          <div
            key={stage.n}
            className="ip-panel group relative h-[62vh] w-[86vw] shrink-0 snap-start overflow-hidden md:h-[68vh] md:w-[46vw] lg:w-[36vw]"
          >
            <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
              <PlaceholderMedia tone={stage.dark ? "dark" : "light"} label={stage.label} />
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
      </div>

      <div className="container-industrial mt-2">
        <div className="h-px w-full bg-line-on-dark">
          <div
            className="h-px bg-paper/60 transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
