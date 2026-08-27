"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import PhotoMedia from "@/components/visuals/PhotoMedia";
import { cota } from "@/lib/content/cota";

export default function WhatCotaDoes() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".line-row").forEach((row) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 85%", end: "top 55%", scrub: true },
          },
        );
        gsap.fromTo(
          row.querySelector(".media-reveal"),
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 85%", end: "top 50%", scrub: true },
          },
        );
      });
      return () => ScrollTrigger.getAll().forEach((t) => t.trigger === rootRef.current && t.kill());
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="compania" ref={rootRef} className="relative w-full bg-paper py-24 md:py-36">
      <div className="container-industrial">
        <span className="font-label mb-6 block text-ink/45">
          Compañía — {cota.country}, desde {cota.foundedYear}
        </span>
        <h2 className="text-display max-w-2xl text-ink">{cota.mission}</h2>
        <a
          href="#contacto"
          className="font-label mb-16 mt-6 inline-block w-fit border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60 md:mb-24"
        >
          Ir al formulario →
        </a>

        <div className="flex flex-col divide-y divide-line-on-light">
          {cota.businessLines.map((line) => (
            <div key={line.id} className="line-row group relative flex items-center justify-between gap-10 py-9 md:py-12">
              <div className="min-w-0 max-w-md">
                <h3 className="text-heading text-ink">{line.label}</h3>
                <p className="mt-3 text-sm text-ink/55 md:text-base">{line.short}</p>
              </div>
              <div className="media-reveal relative hidden h-44 max-w-lg flex-1 overflow-hidden md:block lg:h-56">
                {line.id === "soluciones" ? (
                  <PhotoMedia src="/photos/naschel-planta-aerea.png" alt="Planta de COTA — logística y despacho" />
                ) : line.id === "quimicos" ? (
                  <PhotoMedia src="/photos/quimicos-tanques.png" alt="Tanques de proceso en la planta de COTA" />
                ) : (
                  <PhotoMedia src="/photos/planta-porton.png" alt="Planta de COTA — acceso" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
