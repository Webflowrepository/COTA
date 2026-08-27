"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion/gsap";
import PhotoMedia from "@/components/visuals/PhotoMedia";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".hero-bg", { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.out" })
        .fromTo(
          ".hero-line",
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1, stagger: 0.1, ease: "power4.out" },
          "-=0.7",
        )
        .fromTo(
          ".hero-sub, .hero-label, .hero-cue",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.07 },
          "-=0.5",
        );

      if (!prefersReducedMotion()) {
        gsap.to(".hero-parallax", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative h-[100svh] w-full overflow-hidden bg-ink-deep">
      <div className="hero-bg hero-parallax absolute inset-0">
        <PhotoMedia src="/photos/hero-planta-aerea.png" alt="Planta de COTA — vista aérea al amanecer" priority />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(6,8,17,0.75) 0%, rgba(6,8,17,0.15) 45%, rgba(6,8,17,0.35) 100%)" }}
        />
      </div>

      <div className="container-industrial relative z-10 flex h-full flex-col justify-end pb-20 md:pb-28">
        <span className="hero-label font-label mb-6 block text-paper/60">
          Argentina — Químicos / Papel Tissue / Soluciones Industriales
        </span>

        <h1 className="max-w-3xl overflow-hidden">
          <span className="hero-line text-hero block overflow-hidden text-paper">Materia en</span>
          <span className="hero-line text-hero block overflow-hidden text-paper">transformación.</span>
        </h1>

        <p className="hero-sub mt-7 max-w-md text-base text-paper/65 md:text-lg">
          Fabricamos química para la industria papelera y textil, y papel Tissue a escala industrial, desde 1994.
        </p>
      </div>

      <div className="hero-cue absolute bottom-8 right-24 z-10 flex items-center gap-3">
        <span className="font-label text-paper/50">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-paper/40" />
      </div>
    </section>
  );
}
