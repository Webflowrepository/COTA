"use client";

import { useEffect, useRef } from "react";
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
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const stageEls = wrapperRef.current!.querySelectorAll<HTMLDivElement>(".ip-stage");

      gsap.set(stageEls, { autoAlpha: 0 });
      gsap.set(stageEls[0], { autoAlpha: 1 });

      const tl = gsap.timeline({ paused: true });

      STAGES.forEach((_, i) => {
        if (i > 0) {
          tl.to(stageEls[i], { autoAlpha: 1, duration: 0.4 }, i - 0.4);
        }
        if (i < STAGES.length - 1) {
          tl.to(stageEls[i], { autoAlpha: 0, duration: 0.4 }, i + 0.6);
        }
      });

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15,
        onUpdate: (self) => tl.totalProgress(self.progress),
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="proceso" ref={wrapperRef} className="relative h-[600vh] w-full bg-paper">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {STAGES.map((stage) => (
          <div key={stage.n} className="ip-stage absolute inset-0">
            <PlaceholderMedia tone={stage.dark ? "dark" : "light"} label={stage.label} />
            <div
              className="absolute inset-0"
              style={{
                background: stage.dark
                  ? "linear-gradient(0deg, rgba(6,8,17,0.85) 0%, transparent 45%)"
                  : "linear-gradient(0deg, rgba(6,8,17,0.55) 0%, transparent 45%)",
              }}
            />

            <div className="container-industrial relative flex h-full flex-col justify-end pb-20 md:pb-28">
              <span className="font-label mb-4 block text-paper/60">
                Recorrido industrial — {stage.n} / 06
              </span>
              <h3 className="text-display max-w-2xl text-paper">{stage.title}</h3>
              <p className="mt-4 max-w-sm text-sm text-paper/70 md:text-base">{stage.copy}</p>
            </div>
          </div>
        ))}

        <div className="pointer-events-none absolute inset-x-5 top-24 z-10 flex items-center justify-between md:inset-x-12 md:top-28">
          <span className="font-label text-paper/50">Materia prima → Producto terminado</span>
          <span className="font-label text-paper/50">Scroll para avanzar</span>
        </div>
      </div>
    </section>
  );
}
