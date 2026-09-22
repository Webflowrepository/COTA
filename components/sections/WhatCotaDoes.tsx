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
      className="section-py-lg relative w-full bg-paper max-md:pt-14!"
    >
      {/* Grid editorial 2x2 alternado: texto/foto cambian de lado fila por
          fila (pedido del cliente — que no sea "todo texto"). Fila 1:
          intro a la izquierda, foto a la derecha. Fila 2: foto a la
          izquierda, diferenciales a la derecha — mismo patrón que una
          maqueta editorial de revista, no una grilla de cards repetidas. */}
      <div className="container-industrial grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 md:gap-y-16">
        {/* Fila 1 — texto */}
        <div className="whatcota-cell flex flex-col justify-center">
          <span className="font-label mb-6 block text-ink/45">
            Compañía — {cota.country}, desde {cota.foundedYear}
          </span>
          <h2 className="text-display text-ink">{cota.mission}</h2>
          <p className="mt-8 text-base text-ink/60 md:text-lg leading-relaxed">
            Desde 1994 en Naschel, San Luis. Empezamos produciendo químicos para la industria
            papelera y textil, y con capitales propios dimos el salto a instalar nuestra propia
            planta de papel Tissue — un hito que refleja nuestro compromiso con la innovación
            y la calidad.
          </p>
        </div>

        {/* Fila 1 — foto. papel-tissue-produccion-operarios.png pega mejor
            con el texto de "soluciones de papel" que la foto de tanques
            químicos que había antes — no se usaba en ninguna otra sección. */}
        <div className="whatcota-cell relative aspect-[4/3] overflow-hidden rounded-sm md:aspect-auto">
          <PhotoMedia
            src="/photos/papel-tissue-produccion-operarios.png"
            alt="Operarios en línea de producción de papel Tissue, planta de COTA"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>

        {/* Fila 2 — foto. El orden del DOM ya produce el apilado correcto
            en mobile (foto, después texto) y el grid alternado en
            desktop, sin necesitar order-*. bobinas-industriales-nave.png
            no se usaba en ninguna otra sección. */}
        <div className="whatcota-cell relative aspect-[4/3] overflow-hidden rounded-sm md:aspect-auto">
          <PhotoMedia
            src="/photos/bobinas-industriales-nave.png"
            alt="Nave industrial con bobinas de papel Tissue, planta de COTA"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>

        {/* Fila 2 — texto: diferenciales compactos (antes en WhyCota.tsx). */}
        <div className="whatcota-cell flex flex-col justify-center">
          <span className="font-label mb-6 block text-ink/45">Por qué COTA</span>
          <div className="flex flex-col divide-y divide-line-on-light">
            {POINTS.map((point) => (
              <div key={point.title} className="why-point py-4 first:pt-0">
                <h3 className="text-base font-semibold text-ink md:text-lg">{point.title}</h3>
                <p className="mt-1 text-sm text-ink/60">{point.copy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs — fila única, ancho completo. */}
        <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line-on-light pt-8 md:col-span-2">
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
