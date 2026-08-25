"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import MacroSurface from "@/components/visuals/MacroSurface";
import LiquidChemical from "@/components/visuals/LiquidChemical";
import FiberField from "@/components/visuals/FiberField";
import { cota } from "@/lib/content/cota";

const SWATCH: Record<string, ReactNode> = {
  quimicos: <LiquidChemical intensity={0.8} />,
  papel: <FiberField tone="paper" />,
  soluciones: <MacroSurface tone="rust" />,
};

export default function WhatCotaDoes() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".line-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 80%", end: "top 45%", scrub: 0.6 },
          },
        );
        gsap.fromTo(
          row.querySelector(".line-swatch"),
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "none",
            scrollTrigger: { trigger: row, start: "top 80%", end: "top 40%", scrub: 0.6 },
          },
        );
      });
      return () => ScrollTrigger.getAll().forEach((t) => t.trigger === rootRef.current && t.kill());
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="compania" ref={rootRef} className="relative w-full bg-ink py-28 md:py-40">
      <div className="container-industrial">
        <span className="font-technical mb-14 block text-[11px] text-paper/50 md:mb-20">
          Compañía — {cota.country}, +{cota.yearsOfOperation} años
        </span>

        <div className="flex flex-col divide-y divide-line-on-dark">
          {cota.businessLines.map((line) => (
            <div key={line.id} className="line-row group relative flex items-center justify-between gap-8 py-8 md:py-12">
              <div className="min-w-0">
                <h3 className="break-words text-[12vw] leading-[0.9] text-paper transition-colors group-hover:text-rust-light md:text-[6vw]">
                  {line.label}
                </h3>
                <p className="mt-3 max-w-md text-sm text-paper/55 md:text-base">{line.short}</p>
              </div>
              <div className="line-swatch relative hidden h-28 w-40 shrink-0 overflow-hidden rounded-sm md:block lg:h-36 lg:w-56">
                {SWATCH[line.id]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
