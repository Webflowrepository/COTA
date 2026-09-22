"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import { EASE_STANDARD } from "@/lib/motion/tokens";
import PhotoMedia from "@/components/visuals/PhotoMedia";
import { cota } from "@/lib/content/cota";

// Los 4 diferenciales (antes en WhyCota.tsx, sección aparte más abajo en la
// página) se integraron acá — el cliente pidió juntar las 2 secciones
// porque la intro sola dejaba mucho espacio vacío debajo. Van en fila
// horizontal (no lista vertical apilada) siguiendo el mismo patrón que
// "Modelos de negocio" (4 columnas con divisor vertical desde lg). Texto
// ya verificado, no son datos nuevos.
const POINTS = [
  {
    title: "Desarrollo propio, no reventa.",
    copy: "Blanqueadores ópticos desarrollados por COTA — tetrasulfónicos, hexasulfónicos y antraquinona.",
  },
  {
    title: "Integración vertical.",
    copy: "De la materia prima al producto terminado, dentro de la misma planta en Naschel.",
  },
  {
    title: "Logística propia.",
    copy: cota.services.find((s) => s.id === "logistica")?.short ?? "",
  },
  {
    title: "Asesoramiento técnico.",
    copy: cota.services.find((s) => s.id === "asesoramiento")?.short ?? "",
  },
];

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
      gsap.fromTo(
        ".whatcota-photo",
        { autoAlpha: 0, scale: 1.05 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 85%", toggleActions: "play none none none" },
        },
      );
      gsap.fromTo(
        ".why-point",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: EASE_STANDARD,
          scrollTrigger: { trigger: rootRef.current, start: "top 80%", end: "top 50%", scrub: true },
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
      <div className="container-industrial grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
        <div className="whatcota-body md:col-span-6">
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

        {/* Foto que llena el hueco a la derecha de la intro — antes esa
            mitad quedaba en blanco. proceso-materia-prima.png estaba libre
            (era de WhyCota.tsx, sección que ya no se renderiza en
            page.tsx), no repite ninguna foto visible en otra parte de la
            página. */}
        <div className="whatcota-photo relative hidden min-h-[320px] overflow-hidden rounded-sm md:col-span-6 md:block">
          <PhotoMedia
            src="/photos/proceso-materia-prima.png"
            alt="Materia prima en proceso, planta de COTA en Naschel"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>

        {/* Diferenciales — fila horizontal, sin la línea de acento que
            tenían antes; el título ahora tiene más peso/tamaño para que
            se destaque como cabecera de cada columna en vez de leer
            parejo con la copy de abajo. */}
        <div className="md:col-span-12 mt-6 md:mt-10">
          <span className="font-label mb-6 block text-ink/45">Por qué COTA</span>
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-on-light">
            {POINTS.map((point) => (
              <div key={point.title} className="why-point flex flex-col lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <h3 className="text-lg font-semibold text-ink md:text-xl">{point.title}</h3>
                <p className="mt-2 text-sm text-ink/60 md:text-base">{point.copy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fila única de CTAs al pie de toda la sección. */}
        <div className="md:col-span-12 mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line-on-light pt-8 md:mt-14">
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
