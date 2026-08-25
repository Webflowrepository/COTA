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
    copy: "Fibra ingresa al proceso industrial.",
    visual: "raw" as const,
    dark: false,
    accent: "text-green",
  },
  {
    n: "02",
    title: "Proceso Químico",
    copy: "Blanqueadores ópticos desarrollados por COTA integran el proceso.",
    visual: "chem" as const,
    dark: true,
    accent: "text-blue-light",
  },
  {
    n: "03",
    title: "Fabricación de Papel Tissue",
    copy: "La fibra se transforma en papel Tissue a escala industrial.",
    visual: "paper" as const,
    dark: false,
    accent: "text-green",
  },
  {
    n: "04",
    title: "Rebobinado",
    copy: "El papel se rebobina y se prepara para su conversión.",
    visual: "rewind" as const,
    dark: false,
    accent: "text-green",
  },
  {
    n: "05",
    title: "Producto Terminado",
    copy: "Cada bobina sale lista para su conversión.",
    visual: "roll" as const,
    dark: false,
    accent: "text-green",
  },
  {
    n: "06",
    title: "Logística",
    copy: "Distribución de bobinas hacia convertidores y distribuidores.",
    visual: "logistics" as const,
    dark: false,
    accent: "text-green",
  },
];

function StageVisual({ kind }: { kind: (typeof STAGES)[number]["visual"] }) {
  switch (kind) {
    case "raw":
      return <MacroSurface tone="paper" />;
    case "chem":
      return <LiquidChemical intensity={0.9} />;
    case "paper":
      return <FiberField tone="paper" opacity={0.6} />;
    case "rewind":
      return <MacroSurface tone="paper" grain={false} />;
    case "roll":
      return (
        <div className="absolute inset-0 bg-paper">
          <PaperRollVisual className="scale-[0.9] opacity-90" />
        </div>
      );
    case "logistics":
      return <MacroSurface tone="green" grain />;
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
    <section id="proceso" ref={wrapperRef} className="relative h-[600vh] w-full bg-paper">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <ProductionLineStrip ref={lineRef} className="opacity-[0.08]" tone="paper" />

        {STAGES.map((stage) => (
          <div key={stage.n} className="ip-stage absolute inset-0">
            <div className="stage-visual absolute inset-0">
              <StageVisual kind={stage.visual} />
            </div>
            <div
              className="absolute inset-0"
              style={{
                background: stage.dark
                  ? "linear-gradient(0deg, #060811 0%, transparent 45%)"
                  : "linear-gradient(0deg, rgba(250,250,248,0.92) 0%, transparent 45%)",
              }}
            />

            <div className="container-industrial relative flex h-full flex-col justify-end pb-20 md:pb-28">
              <span className={`font-technical mb-4 block text-[11px] ${stage.accent}`}>
                Recorrido industrial — {stage.n} / 06
              </span>
              <h3
                className={`font-impact max-w-2xl text-[11vw] leading-[0.92] md:text-[6vw] lg:text-[5vw] ${
                  stage.dark ? "text-paper" : "text-ink"
                }`}
              >
                {stage.title}
              </h3>
              <p className={`mt-4 max-w-sm text-sm md:text-base ${stage.dark ? "text-paper/65" : "text-ink/60"}`}>
                {stage.copy}
              </p>
            </div>
          </div>
        ))}

        <DevTag>proxy — reemplazar por secuencia real de planta Naschel</DevTag>

        <div className="pointer-events-none absolute inset-x-5 top-6 z-10 flex items-center justify-between md:inset-x-12">
          <span className="dev-tag text-paper !opacity-60">Materia prima → Producto terminado</span>
          <span className="dev-tag text-paper !opacity-60">Scroll para avanzar</span>
        </div>
      </div>
    </section>
  );
}
