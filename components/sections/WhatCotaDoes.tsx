"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import { EASE_STANDARD } from "@/lib/motion/tokens";
import { cota } from "@/lib/content/cota";

// "Papel" se muestra separado en 2 filas (ver cota.papelSplit — es una
// sola división real, esto es sólo el relato de esta sección) más
// Químicos y Soluciones de cota.businessLines — 4 filas en total.
const LINES = [...cota.papelSplit, ...cota.businessLines.filter((l) => l.id !== "papel")];

// CTA secundario por línea — apunta a la sección real correspondiente (no
// a un mailto genérico), ya que todas tienen su propio anchor en la página.
const SECONDARY_CTA: Record<string, { label: string; href: string }> = {
  "bobinas-convertidores": { label: "Ver especificaciones", href: "#papel" },
  "conversion-integrada": { label: "Conocer línea Guardián", href: "#papel" },
  quimicos: { label: "Ver especificaciones", href: "#quimicos" },
  soluciones: { label: "Asesoramiento técnico", href: "#soluciones" },
};

// Foto que aparece al pasar el mouse por cada tarjeta (ver "marco de
// preview" más abajo) — a propósito NO son íconos, el cliente pidió
// sacarlos y mostrar una foto real relacionada con el texto en su lugar.
// bobinas-industriales-nave.png y soluciones-logistica-montacargas.png son
// DISTINTAS de las que usa ProductFamilies.tsx para esas mismas 2 líneas
// (bobinas-pallet-220cm.jpeg / soluciones-rebobinadora.png) — se eligieron
// a propósito así ninguna foto se repite entre este preview y el panel de
// más abajo. Conversión Integrada y Químicos sí reusan la misma foto que
// ProductFamilies: es el único material que existe para esos 2 conceptos
// (mismo criterio ya documentado en ese archivo — no hay 2 fotos
// distintas de lo mismo, no es una elección al azar).
const HOVER_PHOTO: Record<string, { src: string; alt: string; objectPosition?: string }> = {
  "bobinas-convertidores": {
    src: "/photos/bobinas-industriales-nave.png",
    alt: "Nave industrial con bobinas de papel Tissue y máquina rebobinadora",
  },
  "conversion-integrada": {
    src: "/photos/conversion-integrada.png",
    alt: "Operarios junto a máquina de conversión de papel Tissue",
    objectPosition: "top",
  },
  quimicos: { src: "/photos/quimicos-ibc-tanques.png", alt: "Tanques y contenedores IBC de proceso químico" },
  soluciones: {
    src: "/photos/soluciones-logistica-montacargas.png",
    alt: "Montacargas moviendo bobina de papel en planta de COTA",
    objectPosition: "top",
  },
};

export default function WhatCotaDoes() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      // Rediseño (pedido del cliente, ver memoria de esta conversación):
      // antes eran 4 filas apiladas con foto grande al lado del texto —
      // el cliente lo comparó con el panel fotográfico de "Un sistema
      // industrial integrado" (ProductFamilies.tsx, más abajo en la
      // página) y notó que mostraban las mismas 4 líneas con las mismas
      // fotos en un formato parecido, como la misma sección repetida dos
      // veces. Pasó a ser un índice compacto (número + título + texto
      // corto, sin foto fija) — un primer intento sumó íconos de línea
      // ahí, pero el cliente los sacó de nuevo: prefiere que la foto
      // aparezca sólo al pasar el mouse, no un ícono siempre visible.
      // El panel con foto grande de ProductFamilies queda como el único
      // lugar con esas fotos SIEMPRE a la vista.
      gsap.utils.toArray<HTMLElement>(".line-card").forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: EASE_STANDARD,
            scrollTrigger: { trigger: card, start: "top 88%", end: "top 60%", scrub: true },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="compania"
      ref={rootRef}
      /* max-md:pt-14! — en mobile, section-py-lg (7rem/112px de padding-top)
         sumado al padding-bottom de StatsBand (4.5rem/72px) dejaba 184px de
         hueco vacío (22% de una pantalla de 844px) entre el último número y
         este kicker. .section-py-lg es una clase compartida (Contact
         también la usa) — no se toca; se pisa sólo acá y sólo en mobile.
         El sufijo "!" hace falta porque las clases custom de globals.css se
         definen después de @import "tailwindcss" y le ganan en cascada a
         cualquier utilidad Tailwind del mismo peso sin !important (ver
         memoria de dirección de arte, punto 18). md:/lg: sin cambios. */
      className="section-py-lg relative w-full bg-paper max-md:pt-14!"
    >
      <div className="container-industrial">
        {/* Encabezado + marco de preview lado a lado desde md. El marco
            (240x160) NO flota cerca del cursor ni de la tarjeta — un
            primer intento hacía eso y en la grilla 2x2 (tablet, sm) el
            hueco entre filas (56px) no alcanzaba para una imagen de
            ~130px: la de la fila 2 quedaba tapando el texto de la fila 1
            (confirmado con Playwright). Un marco fijo, siempre en el
            mismo lugar sin importar qué tarjeta o fila se hoverea, no
            tiene ese problema — nunca se superpone con nada. Vacío por
            default (todas las fotos en opacity-0): no se ve un recuadro
            en blanco, es indistinguible del fondo hasta que aparece algo. */}
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <span className="font-label mb-6 block text-ink/45">
              Compañía — {cota.country}, desde {cota.foundedYear}
            </span>
            <h2 className="text-display max-w-2xl text-ink">{cota.mission}</h2>
            <a
              href="#contacto"
              className="font-label mt-6 inline-block w-fit border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60"
            >
              Ir a contacto <span className="cta-arrow">→</span>
            </a>
          </div>

          <div className="relative hidden h-[160px] w-[240px] shrink-0 overflow-hidden rounded-sm md:block">
            {LINES.map((line) => (
              <div
                key={line.id}
                aria-hidden
                className={`absolute inset-0 transition-opacity duration-300 ease-out ${hoverId === line.id ? "opacity-100" : "opacity-0"}`}
              >
                <Image
                  src={HOVER_PHOTO[line.id].src}
                  alt={HOVER_PHOTO[line.id].alt}
                  fill
                  sizes="240px"
                  className="object-cover"
                  style={HOVER_PHOTO[line.id].objectPosition ? { objectPosition: HOVER_PHOTO[line.id].objectPosition } : undefined}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 1 columna en mobile (apiladas) → 2 en tablet (grid 2x2) → 4 en
            desktop (una fila) — pedido explícito del cliente. divide-x
            sólo en lg: con 2 columnas (tablet) un divisor vertical corta
            raro contra el wrap a la fila de abajo; con 4 en una sola fila
            (lg) se ve limpio, igual que "Modelos de negocio". */}
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 sm:gap-y-14 md:mt-20 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line-on-light">
          {LINES.map((line, i) => (
            // flex h-full flex-col + mt-auto en el CTA (abajo): "short"
            // tiene distinto largo por tarjeta (2 líneas vs. 3), así que
            // el CTA quedaba a distinta altura en cada una — descentrado
            // pedido explícito del cliente. Con esto, las 4 CTA quedan
            // siempre en el mismo renglón de abajo, sin importar cuánto
            // texto tenga cada tarjeta arriba (la grilla ya estira las 4
            // columnas a la misma altura por default).
            <div
              key={line.id}
              className="line-card group flex h-full flex-col lg:px-8 lg:first:pl-0 lg:last:pr-0"
              onMouseEnter={() => setHoverId(line.id)}
              onMouseLeave={() => setHoverId((id) => (id === line.id ? null : id))}
            >
              <span className="font-impact-number text-stat block text-ink/25 transition-colors duration-300 group-hover:text-ink/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-heading mt-4 text-ink transition-transform duration-300 group-hover:translate-x-1">{line.label}</h3>
              <p className="mt-3 text-sm text-ink/60 md:text-base">{line.short}</p>
              {SECONDARY_CTA[line.id] && (
                <a
                  href={SECONDARY_CTA[line.id].href}
                  className="font-label mt-auto inline-block w-fit border-b border-ink/40 pb-0.5 pt-5 text-ink/70 transition-opacity hover:opacity-60"
                >
                  {SECONDARY_CTA[line.id].label} <span className="cta-arrow">→</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
