"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import PhotoMedia from "@/components/visuals/PhotoMedia";
import { cota } from "@/lib/content/cota";

export default function NaschelPlant() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLSpanElement>(null);
  const tonsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsapRegistered();

    const ctx = gsap.context(() => {
      // valores reales ya están en el HTML como fallback — recién acá
      // se resetean a 0 para poder animar el conteo.
      if (yearsRef.current) yearsRef.current.textContent = "0";
      if (tonsRef.current) tonsRef.current.textContent = "0";

      const tl = gsap.timeline({ paused: true });
      tl.fromTo(bgRef.current, { yPercent: -8 }, { yPercent: 8, ease: "none", duration: 1 }, 0);
      tl.fromTo(".naschel-heading", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.15);

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15,
        onUpdate: (self) => {
          tl.totalProgress(self.progress);
          const countProgress = Math.min(1, self.progress / 0.5);
          if (yearsRef.current) yearsRef.current.textContent = String(Math.round(countProgress * cota.yearsOfOperation));
          if (tonsRef.current) tonsRef.current.textContent = String(Math.round(countProgress * cota.production.chemicalsMonthlyTons));
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="planta" ref={wrapperRef} className="relative h-[180vh] w-full bg-ink-deep">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div ref={bgRef} className="absolute -inset-y-[8%] inset-x-0">
          <PhotoMedia src="/photos/naschel-planta-aerea.png" alt={`Planta de COTA en ${cota.plant.location}, vista aérea`} priority />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(6,8,17,0.85) 0%, rgba(6,8,17,0.1) 50%, rgba(6,8,17,0.35) 100%)" }}
        />

        <div className="container-industrial naschel-heading absolute inset-0 flex flex-col justify-end pb-20 md:pb-28">
          <span className="font-label mb-4 block text-paper/60">
            Planta industrial — {cota.plant.location}
          </span>

          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-8">
            <div>
              <h2 className="text-hero max-w-xl text-paper">Naschel.</h2>

              <div className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-6">
                <div>
                  <span className="font-impact-number text-stat block text-paper">
                    <span ref={yearsRef}>{cota.yearsOfOperation}</span>+
                  </span>
                  <span className="font-label text-paper/60">Años</span>
                </div>
                <div>
                  <span className="font-impact-number text-stat block text-paper">1</span>
                  <span className="font-label text-paper/60">Planta propia</span>
                </div>
                <span className="font-label pb-1 text-paper/50">
                  {cota.plant.location}, {cota.country}
                </span>
              </div>

              {cota.plant.ownCapital && (
                <p className="font-label mt-6 max-w-md text-paper/45">Instalación realizada con capitales propios.</p>
              )}

              <a
                href="#contacto"
                className="font-label mt-8 inline-block w-fit border-b border-paper/40 pb-1 text-paper transition-colors hover:border-paper"
              >
                Ir al formulario <span className="cta-arrow">→</span>
              </a>
            </div>

            <div className="shrink-0 md:text-right">
              <span className="font-label mb-2 block text-paper/60">Capacidad — Químicos</span>
              <div className="flex items-end gap-3 md:justify-end">
                <span className="font-impact-number text-mega block text-paper">
                  <span ref={tonsRef}>{cota.production.chemicalsMonthlyTons}</span>
                </span>
                <span className="font-label mb-3 text-paper/70 md:mb-6">T/MES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
