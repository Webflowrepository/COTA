"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import MacroSurface from "@/components/visuals/MacroSurface";
import FiberField from "@/components/visuals/FiberField";
import LiquidChemical from "@/components/visuals/LiquidChemical";
import PaperRollVisual from "@/components/visuals/PaperRollVisual";
import ProductionLineStrip from "@/components/visuals/ProductionLineStrip";
import DevTag from "@/components/visuals/DevTag";

const STAGES = [
  {
    n: "01",
    title: "Materia Prima",
    copy: "Fibra y materia prima ingresan al proceso industrial.",
    visual: "raw" as const,
  },
  {
    n: "02",
    title: "Proceso Químico",
    copy: "Insumos químicos desarrollados por COTA integran el proceso.",
    visual: "chem" as const,
  },
  {
    n: "03",
    title: "Fabricación de Papel",
    copy: "La materia se transforma en papel a escala industrial.",
    visual: "paper" as const,
  },
  {
    n: "04",
    title: "Rebobinado",
    copy: "El papel se rebobina y se prepara para su conversión.",
    visual: "rewind" as const,
  },
  {
    n: "05",
    title: "Producto Terminado",
    copy: "Cada rollo sale listo para su uso industrial.",
    visual: "roll" as const,
  },
  {
    n: "06",
    title: "Logística",
    copy: "Distribución hacia clientes y convertidores.",
    visual: "logistics" as const,
  },
];

function StageVisual({ kind }: { kind: (typeof STAGES)[number]["visual"] }) {
  switch (kind) {
    case "raw":
      return <MacroSurface tone="ink" />;
    case "chem":
      return <LiquidChemical intensity={0.9} />;
    case "paper":
      return <FiberField tone="ink" opacity={0.5} />;
    case "rewind":
      return <MacroSurface tone="ink" grain={false} />;
    case "roll":
      return (
        <div className="absolute inset-0 bg-ink-deep opacity-90">
          <PaperRollVisual className="scale-[0.85] opacity-30" />
        </div>
      );
    case "logistics":
      return <MacroSurface tone="rust" grain />;
  }
}

export default function IndustrialProcess() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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
          tl.fromTo(
            stageEls[i].querySelector(".stage-visual"),
            { xPercent: 5, scale: 1.06 },
            { xPercent: 0, scale: 1, duration: 0.6, ease: "power2.out" },
            i - 0.4,
          );
        }
        if (i < STAGES.length - 1) {
          tl.to(stageEls[i], { autoAlpha: 0, duration: 0.4 }, i + 0.6);
        }
      });

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => tl.totalProgress(self.progress),
      });

      gsap.to(lineRef.current, {
        xPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="proceso" ref={wrapperRef} className="relative h-[600vh] w-full bg-ink">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <ProductionLineStrip ref={lineRef} className="opacity-[0.08]" tone="ink" />

        {STAGES.map((stage) => (
          <div key={stage.n} className="ip-stage absolute inset-0">
            <div className="stage-visual absolute inset-0">
              <StageVisual kind={stage.visual} />
            </div>
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(0deg, #050504 0%, transparent 45%)" }}
            />

            <div className="container-industrial relative flex h-full flex-col justify-end pb-20 md:pb-28">
              <span className="font-technical mb-4 block text-[11px] text-rust-light">
                Recorrido industrial — {stage.n} / 06
              </span>
              <h3 className="max-w-2xl text-[11vw] leading-[0.92] text-paper md:text-[6vw] lg:text-[5vw]">
                {stage.title}
              </h3>
              <p className="mt-4 max-w-sm text-sm text-paper/65 md:text-base">{stage.copy}</p>
            </div>
          </div>
        ))}

        <DevTag>proxy — reemplazar por secuencia real de planta Naschel</DevTag>

        <div className="pointer-events-none absolute inset-x-5 top-6 flex items-center justify-between md:inset-x-12">
          <span className="font-technical text-[10px] text-paper/40">Materia prima → Producto terminado</span>
          <span className="font-technical text-[10px] text-paper/40">Scroll para avanzar</span>
        </div>
      </div>
    </section>
  );
}
