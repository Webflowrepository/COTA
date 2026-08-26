"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import PlaceholderMedia from "@/components/visuals/PlaceholderMedia";
import { cota } from "@/lib/content/cota";

const SWATCH_LABEL: Record<string, string> = {
  quimicos: "Foto — blanqueador óptico / tanque de proceso",
  papel: "Foto — bobina de papel Tissue",
  soluciones: "Foto — instalación de fábrica / maquinaria",
};

const ACCENT: Record<string, string> = {
  quimicos: "group-hover:text-blue",
  papel: "group-hover:text-green",
  soluciones: "group-hover:text-blue",
};

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
        <span className="font-label mb-16 block text-ink/45 md:mb-24">
          Compañía — {cota.country}, desde {cota.foundedYear}
        </span>

        <div className="flex flex-col divide-y divide-line-on-light">
          {cota.businessLines.map((line) => (
            <div key={line.id} className="line-row group relative flex items-center justify-between gap-10 py-9 md:py-12">
              <div className="min-w-0 max-w-md">
                <h3 className={`text-heading text-ink transition-colors ${ACCENT[line.id]}`}>{line.label}</h3>
                <p className="mt-3 text-sm text-ink/55 md:text-base">{line.short}</p>
              </div>
              <div className="media-reveal relative hidden h-44 max-w-lg flex-1 overflow-hidden md:block lg:h-56">
                <PlaceholderMedia tone={line.id === "papel" ? "light" : "dark"} label={SWATCH_LABEL[line.id]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
