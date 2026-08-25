"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import MacroSurface from "@/components/visuals/MacroSurface";
import ProductionLineStrip from "@/components/visuals/ProductionLineStrip";
import { cota } from "@/lib/content/cota";

export default function ProductionScale() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsapRegistered();
    const target = { value: 0 };

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          target.value = Math.round(self.progress * cota.production.monthlyTons);
          if (numberRef.current) numberRef.current.textContent = String(target.value);
          if (ambientRef.current) {
            ambientRef.current.style.opacity = String(0.5 - self.progress * 0.5);
          }
        },
      });

      gsap.to(lineRef.current, {
        xPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: wrapperRef.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });

      gsap.fromTo(
        ".scale-heading",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: { trigger: wrapperRef.current, start: "top 70%", end: "top 20%", scrub: 0.5 },
        },
      );

      return () => st.kill();
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="relative h-[260vh] w-full bg-ink">
      <div className="sticky top-0 flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden">
        <MacroSurface tone="ink" />
        <div ref={ambientRef} className="absolute inset-0" style={{ background: "radial-gradient(60% 60% at 50% 100%, rgba(193,68,14,0.35), transparent 70%)" }} />
        <ProductionLineStrip ref={lineRef} className="opacity-[0.06]" tone="ink" />

        <div className="scale-heading font-technical relative z-10 mb-6 text-[11px] text-paper/60">
          Capacidad de producción
        </div>

        <div className="relative z-10 flex items-end gap-3 md:gap-5">
          <span
            ref={numberRef}
            className="text-[32vw] leading-[0.8] text-paper md:text-[24vw] lg:text-[19vw]"
          >
            0
          </span>
          <span className="font-technical mb-3 text-[4vw] text-rust-light md:mb-6 md:text-[2vw]">
            T/MES
          </span>
        </div>

        <p className="relative z-10 mt-8 max-w-sm px-6 text-center text-sm text-paper/60 md:text-base">
          Escala industrial sostenida — planta propia en Naschel, San Luis.
        </p>
      </div>
    </section>
  );
}
