"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import SteamField from "@/components/visuals/SteamField";
import DevTag from "@/components/visuals/DevTag";
import { cota } from "@/lib/content/cota";

const FACTS = [
  `+${cota.yearsOfOperation} años`,
  `${cota.production.monthlyTons} T/mes`,
  `${cota.plant.location}, ${cota.country}`,
];

export default function NaschelPlant() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsapRegistered();

    const ctx = gsap.context(() => {
      gsap.set(curtainRef.current, { clipPath: "inset(0 0 100% 0)" });

      const tl = gsap.timeline({ paused: true });
      tl.to(curtainRef.current, { clipPath: "inset(0 0 0% 0)", ease: "none", duration: 0.5 }, 0);
      tl.fromTo(farRef.current, { yPercent: 6 }, { yPercent: -6, ease: "none", duration: 1 }, 0);
      tl.fromTo(nearRef.current, { yPercent: 12 }, { yPercent: -12, ease: "none", duration: 1 }, 0);
      tl.fromTo(".naschel-heading", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.15);

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
    <section id="planta" ref={wrapperRef} className="relative h-[220vh] w-full bg-ink-deep">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* cielo / horizonte industrial */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #050504 0%, #14100c 45%, #241c14 70%, #3a2515 100%)",
          }}
        />

        <div ref={curtainRef} className="absolute inset-0">
          {/* silueta lejana de planta */}
          <div ref={farRef} className="absolute inset-x-0 bottom-[28%] h-[30%] opacity-90">
            <div className="absolute bottom-0 left-[8%] h-full w-[18%] bg-ink-deep" />
            <div className="absolute bottom-0 left-[24%] h-[75%] w-[14%] bg-ink-deep" />
            <div className="absolute bottom-0 left-[36%] h-[55%] w-[3%] bg-ink-deep" />
            <SteamField className="absolute -top-[60%] left-[33%] h-[70%] w-[10%] opacity-60" />
            <div className="absolute bottom-0 left-[46%] h-[90%] w-[22%] bg-ink-deep" />
            <div className="absolute bottom-0 left-[66%] h-[60%] w-[16%] bg-ink-deep" />
            <div className="absolute bottom-0 left-[80%] h-[40%] w-[12%] bg-ink-deep" />
          </div>

          {/* franja / vía primer plano */}
          <div ref={nearRef} className="absolute inset-x-0 bottom-0 h-[30%] bg-ink-deep">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "repeating-linear-gradient(90deg, rgba(244,242,236,0.08) 0 2px, transparent 2px 90px)",
              }}
            />
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(244,242,236,0.25), transparent)" }}
            />
          </div>

          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(70% 60% at 50% 100%, rgba(193,68,14,0.18), transparent 70%)" }}
          />
        </div>

        <DevTag>proxy — reemplazar por fotografía / video real de planta Naschel</DevTag>

        <div className="container-industrial naschel-heading absolute inset-0 flex flex-col justify-end pb-20 md:pb-28">
          <span className="font-technical mb-4 block text-[11px] text-paper/60">
            Planta industrial — {cota.plant.location}
          </span>
          <h2 className="max-w-3xl text-[13vw] leading-[0.88] text-paper md:text-[7vw]">NASCHEL</h2>

          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
            {FACTS.map((fact) => (
              <span key={fact} className="font-technical text-[12px] text-paper/70">
                {fact}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
