"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import { EASE_STANDARD } from "@/lib/motion/tokens";
import PhotoMedia from "@/components/visuals/PhotoMedia";
import { cota } from "@/lib/content/cota";

// Los 4 diferenciales (antes en WhyCota.tsx, sección aparte más abajo en la
// página) se integraron acá — el cliente pidió juntar las 2 secciones
// porque la intro sola dejaba mucho espacio vacío debajo. Texto ya
// verificado, no son datos nuevos.
const POINTS = [
  {
    title: "Desarrollo propio, no reventa.",
    copy: "Blanqueadores ópticos desarrollados por COTA.",
  },
  {
    title: "Integración vertical.",
    copy: "De la materia prima al producto terminado, misma planta.",
  },
  {
    title: "Logística propia.",
    copy: "Instalación de fábricas y venta de maquinaria de conversión.",
  },
  {
    title: "Asesoramiento técnico.",
    copy: "Para papeleras que necesitan blanquear papel y pasta.",
  },
];

export default function WhatCotaDoes() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".whatcota-cell",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: EASE_STANDARD,
          scrollTrigger: { trigger: rootRef.current, start: "top 80%", end: "top 30%", scrub: true },
        },
      );
      gsap.fromTo(
        ".why-point",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: EASE_STANDARD,
          scrollTrigger: { trigger: rootRef.current, start: "top 60%", end: "top 20%", scrub: true },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="compania"
      ref={rootRef}
      className="section-py-lg relative w-full bg-paper"
    >
      {/* Grid editorial 2x2 alternado: texto/foto cambian de lado fila por
          fila (pedido del cliente — que no sea "todo texto"). Fila 1:
          intro a la izquierda, foto a la derecha. Fila 2: foto a la
          izquierda, diferenciales a la derecha — mismo patrón que una
          maqueta editorial de revista, no una grilla de cards repetidas. */}
      <div className="container-industrial grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-24">
        {/* Fila 1 — texto a la izquierda, foto a la derecha (pedido del
            cliente, 2026-09-23). En mobile: texto, después foto. */}
        <div className="whatcota-cell flex flex-col justify-center">
          <span className="font-label mb-6 block text-ink/45">
            Compañía — {cota.country}, desde {cota.foundedYear}
          </span>
          <h2 className="text-display max-w-2xl text-ink">{cota.mission}</h2>
          <p className="mt-6 max-w-xl text-base text-ink/60 md:text-lg leading-relaxed">
            Desde 1994 en Naschel, San Luis. Empezamos produciendo químicos para la industria
            papelera y textil, y con capitales propios dimos el salto a instalar nuestra propia
            planta de papel Tissue — un hito que refleja nuestro compromiso con la innovación
            y la calidad.
          </p>
        </div>

        <div className="whatcota-cell relative aspect-[4/3] overflow-hidden rounded-sm md:aspect-auto md:min-h-[22rem]">
          <PhotoMedia
            src="/photos/bobinas-industriales-nave.png"
            alt="Nave industrial con bobinas de papel Tissue, planta de COTA"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>

        {/* Fila 2 — diferenciales en horizontal, ancho completo: 4 columnas
            en desktop, 2 en tablet, apilados en mobile. Cada uno con la
            misma línea fina arriba que usa el resto del sitio. */}
        <div className="whatcota-cell md:col-span-2">
          <span className="font-label mb-6 block text-ink/45">Por qué COTA</span>
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {POINTS.map((point) => (
              <div key={point.title} className="why-point border-t border-line-on-light pt-6">
                <h3 className="text-base font-semibold text-ink md:text-lg">{point.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{point.copy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs — fila única, ancho completo. */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line-on-light pt-8 md:col-span-2">
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
          <a
            href="#planta"
            className="font-label inline-block w-fit border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60"
          >
            Conocer nuestra planta <span className="cta-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
