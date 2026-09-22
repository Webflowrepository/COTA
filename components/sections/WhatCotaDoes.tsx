"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import { cota } from "@/lib/content/cota";

export default function WhatCotaDoes() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".whatcota-body",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", toggleActions: "play none none none" },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="compania"
      ref={rootRef}
      className="section-py-lg relative w-full bg-paper max-md:pt-14!"
    >
      <div className="container-industrial">
        <div className="whatcota-body max-w-3xl">
          <span className="font-label mb-6 block text-ink/45">
            Compañía — {cota.country}, desde {cota.foundedYear}
          </span>

          <h2 className="text-display text-ink">{cota.mission}</h2>

          <p className="mt-8 text-base text-ink/60 md:text-lg leading-relaxed">
            Desde 1994, nuestra empresa tiene su sede en Naschel, San Luis. Inicialmente nos
            dedicamos a la producción de productos químicos para la industria papelera y textil.
            Con el paso del tiempo y gracias a nuestro arduo trabajo, logramos dar un paso
            adelante con capitales propios: la instalación de nuestra propia planta papelera,
            especializada en la producción de papel Tissue para la industria. Este logro
            representa un hito en nuestra trayectoria y refleja nuestro compromiso con la
            innovación y la calidad.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href={cota.whatsapp.number ? `https://wa.me/${cota.whatsapp.number}` : "#contacto"}
              target={cota.whatsapp.number ? "_blank" : undefined}
              rel={cota.whatsapp.number ? "noopener noreferrer" : undefined}
              className="font-label inline-block w-fit border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60"
            >
              Escribir por WhatsApp <span className="cta-arrow">→</span>
            </a>
            <a
              href={`mailto:${cota.contact.email}`}
              className="font-label inline-block w-fit border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60"
            >
              Enviar un email <span className="cta-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
