"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import PlaceholderMedia from "@/components/visuals/PlaceholderMedia";
import { cota } from "@/lib/content/cota";

const FACTS = [
  `Desde ${cota.foundedYear}`,
  `${cota.production.monthlyTons} T/mes`,
  `${cota.plant.location}, ${cota.country}`,
];

export default function NaschelPlant() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(bgRef.current, { yPercent: -8 }, { yPercent: 8, ease: "none", duration: 1 }, 0);
      tl.fromTo(".naschel-heading", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.15);

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15,
        onUpdate: (self) => tl.totalProgress(self.progress),
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="planta" ref={wrapperRef} className="relative h-[180vh] w-full bg-ink-deep">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div ref={bgRef} className="absolute -inset-y-[8%] inset-x-0">
          <PlaceholderMedia tone="dark" label="Foto/video — fachada planta Naschel, luz de día" />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(6,8,17,0.85) 0%, rgba(6,8,17,0.1) 50%, rgba(6,8,17,0.35) 100%)" }}
        />

        <div className="container-industrial naschel-heading absolute inset-0 flex flex-col justify-end pb-20 md:pb-28">
          <span className="font-label mb-4 block text-paper/60">
            Planta industrial — {cota.plant.location}
          </span>
          <h2 className="text-hero max-w-3xl text-paper">Naschel.</h2>

          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
            {FACTS.map((fact) => (
              <span key={fact} className="font-label text-paper/70">
                {fact}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
