"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import LiquidChemical from "@/components/visuals/LiquidChemical";
import FiberField from "@/components/visuals/FiberField";
import PaperRollVisual from "@/components/visuals/PaperRollVisual";
import DevTag from "@/components/visuals/DevTag";
import { cota } from "@/lib/content/cota";

const CHEM_ITEMS = cota.chemicalTypes.map((type) => `Blanqueadores ${type}`);
const PAPER_ITEMS = ["Bobinas para convertidores", `${cota.guardian.name} — línea profesional`, "Producción propia en Naschel"];

export default function ChemicalsToPaper() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const chemLayerRef = useRef<HTMLDivElement>(null);
  const paperLayerRef = useRef<HTMLDivElement>(null);
  const chemTextRef = useRef<HTMLDivElement>(null);
  const paperTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const chemItems = chemTextRef.current!.querySelectorAll<HTMLLIElement>(".chem-item");
      const paperItems = paperTextRef.current!.querySelectorAll<HTMLLIElement>(".paper-item");

      gsap.set(paperLayerRef.current, { autoAlpha: 0, scale: 1.08, filter: "blur(18px)" });
      gsap.set(paperTextRef.current, { autoAlpha: 0, y: 24 });
      gsap.set(chemItems, { autoAlpha: 0, y: 10 });
      gsap.set(paperItems, { autoAlpha: 0, y: 10 });

      const tl = gsap.timeline({ paused: true });

      // crossover: liquid disuelve, fibra de papel emerge — el momento "materia transformándose"
      tl.to(chemLayerRef.current, { autoAlpha: 0, scale: 1.1, filter: "blur(22px)", duration: 0.18 }, 0.38);
      tl.to(paperLayerRef.current, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.22 }, 0.42);

      tl.to(chemTextRef.current, { autoAlpha: 0, y: -24, duration: 0.14 }, 0.32);
      tl.to(paperTextRef.current, { autoAlpha: 1, y: 0, duration: 0.16 }, 0.52);

      [0.06, 0.16, 0.26].forEach((t, i) => {
        tl.to(chemItems[i], { autoAlpha: 1, y: 0, duration: 0.1 }, t);
      });
      [0.58, 0.68, 0.78].forEach((t, i) => {
        tl.to(paperItems[i], { autoAlpha: 1, y: 0, duration: 0.1 }, t);
      });

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => tl.totalProgress(self.progress),
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} id="quimicos" className="relative h-[450vh] w-full bg-ink-deep">
      <span id="papel" className="absolute left-0 top-1/2 block h-px w-px" aria-hidden />

      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div ref={chemLayerRef} className="absolute inset-0">
          <LiquidChemical intensity={1} />
        </div>
        <div ref={paperLayerRef} className="absolute inset-0">
          <FiberField tone="paper" />
          <div className="absolute inset-0 flex items-start justify-end">
            <PaperRollVisual className="opacity-[0.5] scale-[1.15] translate-x-[8%] translate-y-[4%]" />
          </div>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(0deg, rgba(244,242,236,0.9) 0%, transparent 55%)" }}
          />
        </div>

        <DevTag>proxy — reemplazar por macro de líquido químico / fibra de papel real</DevTag>

        {/* Capítulo Químicos */}
        <div ref={chemTextRef} className="container-industrial absolute inset-0 flex flex-col justify-end pb-20 md:pb-28">
          <span className="font-technical mb-4 block text-[11px] text-blue-light">Químicos — 01</span>
          <h3 className="font-impact max-w-2xl text-[10vw] leading-[0.92] text-paper md:text-[5.5vw]">
            Precisión en cada reacción.
          </h3>
          <ul className="mt-8 flex flex-col gap-2">
            {CHEM_ITEMS.map((item, i) => (
              <li key={item} className="chem-item font-technical text-[12px] text-paper/60">
                {String(i + 1).padStart(2, "0")} — {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Capítulo Papel */}
        <div ref={paperTextRef} className="container-industrial absolute inset-0 flex flex-col justify-end pb-20 text-ink md:pb-28">
          <span className="font-technical mb-4 block text-[11px] text-green">Papel — 02</span>
          <h3 className="font-impact max-w-2xl text-[10vw] leading-[0.92] text-ink md:text-[5.5vw]">
            Papel Tissue a escala industrial.
          </h3>
          <ul className="mt-8 flex flex-col gap-2">
            {PAPER_ITEMS.map((item, i) => (
              <li key={item} className="paper-item font-technical text-[12px] text-ink/60">
                {String(i + 1).padStart(2, "0")} — {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
