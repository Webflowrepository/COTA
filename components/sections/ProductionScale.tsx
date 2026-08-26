"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import PlaceholderMedia from "@/components/visuals/PlaceholderMedia";
import { cota } from "@/lib/content/cota";

export default function ProductionScale() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15,
        onUpdate: (self) => {
          const value = Math.round(self.progress * cota.production.monthlyTons);
          if (numberRef.current) numberRef.current.textContent = String(value);
        },
      });

      gsap.fromTo(
        ".scale-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: { trigger: wrapperRef.current, start: "top 70%", end: "top 30%", scrub: 0.15 },
        },
      );

      return () => st.kill();
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="relative h-[220vh] w-full bg-ink">
      <div className="sticky top-0 flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden">
        <PlaceholderMedia tone="dark" label="Foto — línea de producción / máquina papelera" />
        <div className="absolute inset-0" style={{ background: "rgba(6,8,17,0.55)" }} />

        <div className="scale-heading font-label relative z-10 mb-6 text-paper/60">
          Capacidad de producción
        </div>

        <div className="relative z-10 flex items-end gap-3 md:gap-5">
          <span ref={numberRef} className="font-impact-number text-mega text-paper">
            0
          </span>
          <span className="font-label mb-3 text-paper/70 md:mb-6">T/MES</span>
        </div>

        <p className="relative z-10 mt-8 max-w-sm px-6 text-center text-sm text-paper/60 md:text-base">
          Escala industrial sostenida — planta propia en Naschel, San Luis.
        </p>
      </div>
    </section>
  );
}
