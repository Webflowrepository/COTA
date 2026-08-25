"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion/gsap";
import MacroSurface from "@/components/visuals/MacroSurface";
import ParticleField from "@/components/visuals/ParticleField";
import PaperRollVisual from "@/components/visuals/PaperRollVisual";
import DevTag from "@/components/visuals/DevTag";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-bg",
        { scale: 1.12, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" },
      )
        .fromTo(
          ".hero-line",
          { clipPath: "inset(0 0 100% 0)", y: 24 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=1.2",
        )
        .fromTo(
          ".hero-sub, .hero-label, .hero-cue",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
          "-=0.6",
        );

      if (!prefersReducedMotion()) {
        gsap.to(".hero-parallax", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative h-[100svh] w-full overflow-hidden bg-paper">
      <div className="hero-bg hero-parallax absolute inset-0">
        <MacroSurface tone="paper" />
        <div className="absolute inset-0 opacity-[0.16]">
          <PaperRollVisual className="scale-[1.6] translate-x-[18%] translate-y-[-6%]" />
        </div>
        <ParticleField />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, #fafaf8 0%, transparent 38%)" }}
        />
        <DevTag>proxy — reemplazar por video macro de proceso / rollo de papel</DevTag>
      </div>

      <div className="container-industrial relative z-10 flex h-full flex-col justify-end pb-16 md:pb-24">
        <span className="hero-label font-technical mb-6 block text-[11px] text-ink/55">
          Argentina — Químicos / Papel Tissue / Soluciones Industriales
        </span>

        <h1 className="max-w-5xl overflow-hidden">
          <span className="hero-line font-impact block overflow-hidden text-[15vw] leading-[0.88] text-ink md:text-[9.5vw] lg:text-[8vw]">
            MATERIA
          </span>
          <span className="hero-line font-impact block overflow-hidden text-[15vw] leading-[0.88] text-blue md:text-[9.5vw] lg:text-[8vw]">
            EN TRANSFORMACIÓN
          </span>
        </h1>

        <p className="hero-sub mt-8 max-w-md font-body text-base text-ink/65 md:text-lg">
          Fabricamos química y papel Tissue a escala industrial desde 1994.
        </p>
      </div>

      <div className="hero-cue absolute bottom-8 right-5 z-10 flex items-center gap-3 md:right-12">
        <span className="font-technical text-[10px] text-ink/50">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-ink/40" />
      </div>
    </section>
  );
}
