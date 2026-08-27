"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import PlaceholderMedia from "@/components/visuals/PlaceholderMedia";
import PhotoMedia from "@/components/visuals/PhotoMedia";

const STEPS = [
  {
    n: "01",
    title: "Materia Prima",
    copy: "Fibra ingresa al proceso industrial.",
    label: "Foto — recepción de fibra / materia prima",
  },
  {
    n: "03",
    title: "Fabricación de Papel Tissue",
    copy: "La fibra se transforma en papel Tissue a escala industrial.",
    label: "Foto — máquina papelera en producción",
  },
  {
    n: "06",
    title: "Logística",
    copy: "Distribución de bobinas hacia convertidores y distribuidores.",
    label: "Foto — despacho / logística",
    photo: { src: "/photos/naschel-planta-aerea.png", alt: "Planta de COTA, vista aérea con patio de despacho" },
  },
];

export default function IndustrialProcessTeaser() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ipt-card",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 80%", end: "top 40%", scrub: true },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="proceso" ref={rootRef} className="relative w-full bg-ink-deep py-24 md:py-32">
      <div className="container-industrial mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
        <div>
          <span className="font-label mb-4 block text-paper/50">Recorrido industrial</span>
          <h2 className="text-display max-w-md text-paper">Materia prima → producto terminado.</h2>
        </div>
        <Link href="/proceso" className="font-label border-b border-paper/40 pb-1 text-paper transition-opacity hover:opacity-60">
          Ver el recorrido completo (6 etapas) →
        </Link>
      </div>

      <div className="container-industrial grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {STEPS.map((step) => (
          <div key={step.n} className="ipt-card relative h-[46vh] overflow-hidden md:h-[52vh]">
            <div className="absolute inset-0">
              {step.photo ? (
                <PhotoMedia src={step.photo.src} alt={step.photo.alt} />
              ) : (
                <PlaceholderMedia tone="dark" label={step.label} />
              )}
            </div>
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(0deg, rgba(6,8,17,0.75) 0%, transparent 45%)" }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-paper md:p-7">
              <span className="font-label mb-3 block text-paper/60">{step.n} / 06</span>
              <h3 className="text-heading">{step.title}</h3>
              <p className="mt-3 max-w-xs text-sm text-paper/70">{step.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
