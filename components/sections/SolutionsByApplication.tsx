"use client";

import { useState } from "react";
import VideoMedia from "@/components/visuals/VideoMedia";
import PlaceholderMedia from "@/components/visuals/PlaceholderMedia";
import PhotoMedia from "@/components/visuals/PhotoMedia";
import { cota } from "@/lib/content/cota";

const serviceShort = (id: string) => cota.services.find((s) => s.id === id)!.short;

/*
 * Soluciones Industriales — oferta complementaria de servicios (jerarquía
 * de contenido, 2026-09-23). Antes las pestañas eran "Convertidores" y
 * "Distribuidores", que repetían Bobinas y Guardián (hoy con sección
 * propia arriba). Ahora muestran los servicios reales ya cargados en
 * cota.ts, con el mismo componente de pestañas + media.
 */
type Segment = {
  id: string;
  label: string;
  headline: string;
  copy: string;
  cta: string;
  mediaLabel: string;
  categoryId: string;
  video?: { src: string; poster: string; alt: string };
  photo?: { src: string; alt: string };
};

const SEGMENTS: Segment[] = [
  {
    id: "maquinaria",
    label: "Maquinaria e instalación",
    headline: "Maquinaria de conversión.",
    copy: serviceShort("logistica"),
    cta: "Consultar",
    mediaLabel: "Foto — maquinaria de conversión",
    categoryId: "maquinaria",
    video: {
      src: "/videos/soluciones-convertidor-bobina.mp4",
      poster: "/photos/soluciones-convertidor-bobina-poster.webp",
      alt: "Operario junto a bobina de papel en máquina convertidora",
    },
  },
  {
    id: "logistica",
    label: "Logística y embalaje",
    headline: "Autoelevadores y embalaje.",
    copy: serviceShort("autoelevadores"),
    cta: "Consultar",
    mediaLabel: "Foto — logística",
    categoryId: "maquinaria",
    photo: {
      src: "/photos/soluciones-logistica-montacargas.png",
      alt: "Autoelevador trasladando carga en la planta de COTA",
    },
  },
  {
    id: "asesoramiento",
    label: "Asesoramiento técnico",
    headline: "Asesoramiento para papeleras.",
    copy: serviceShort("asesoramiento"),
    cta: "Consultar",
    mediaLabel: "Foto — asesoramiento técnico",
    categoryId: "quimicos",
    photo: {
      src: "/photos/quimicos-mantenimiento-tanques.png",
      alt: "Técnicos de COTA trabajando junto a tanques de proceso",
    },
  },
];

export default function SolutionsByApplication() {
  const [activeId, setActiveId] = useState(SEGMENTS[0].id);
  const active = SEGMENTS.find((s) => s.id === activeId)!;
  const categoryLabel = cota.contactCategories.find((c) => c.id === active.categoryId)?.label ?? active.label;
  const mailto = `mailto:${cota.contact.email}?subject=${encodeURIComponent(`Consulta — ${categoryLabel}`)}`;

  return (
    /* Pacing (COTA_REFERENCE_GAP_AUDIT.md, intervención #5 — reevaluada
       tras #1-#4): el audit original apuntaba a Hero→StatsBand, pero esa
       transición ya cierra bien sola (Hero termina en un frame limpio,
       StatsBand absorbe el corte con su propio whitespace). Mapeado el
       ritmo completo del homepage actual con Playwright, el corte más
       abrupto hoy es este: esta sección (tabs + panel de foto, contenido
       "de trabajo" activo hasta el último píxel) choca sin ningún margen
       contra NaschelPlant — el otro momento cinematográfico full-bleed del
       sitio, a la par de Hero, que hoy arranca ya totalmente resuelto sin
       ningún respiro. pb-* extra (nada en md:, todo en el override) le da
       a esa entrada el aire que le falta — no se toca NaschelPlant (su
       diseño full-bleed es intencional) ni la clase compartida
       section-py-md (la usan también WhyCota y ProductFamilies). El "!"
       hace falta porque section-py-md se define después de
       @import "tailwindcss" y le gana en cascada a un pb-* sin
       important (ver memoria de dirección de arte, punto 18). */
    <section id="soluciones" className="section-py-md relative w-full bg-paper pb-24! md:pb-40!">
      <div className="container-industrial">
        <span className="font-label mb-6 block text-ink/50">Soluciones industriales</span>
        <h2 className="text-display max-w-3xl text-ink">De la materia a la operación del cliente.</h2>
        <p className="mt-6 max-w-lg text-base text-ink/60 md:text-lg">
          Servicios que complementan la producción: {cota.businessLines.find((l) => l.id === "soluciones")?.short.toLowerCase()}
        </p>
        <a
          href="#contacto"
          className="font-label mt-8 inline-block w-fit border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60"
        >
          Ir a contacto <span className="cta-arrow">→</span>
        </a>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-line-on-light pb-6">
          {SEGMENTS.map((seg) => (
            <button
              key={seg.id}
              onClick={() => setActiveId(seg.id)}
              className={`font-label underline-offset-4 transition-colors ${
                activeId === seg.id ? "text-ink underline" : "text-ink/45 hover:text-ink"
              }`}
            >
              {seg.label}
            </button>
          ))}
        </div>

        {/* Auditoría comparativa (COTA_REFERENCE_GAP_AUDIT.md, intervención
            #1): grid-cols-2 le daba a la foto el mismo ancho que al
            texto, y ambas quedaban dentro del padding de
            .container-industrial — la foto nunca tocaba el borde real
            del viewport. md:grid-cols-[1.6fr_1fr] le da a la foto la
            porción dominante (~62/38, mismo objetivo que WhatCotaDoes);
            el margen negativo en la foto cancela el padding-inline del
            container en sus mismos breakpoints (3rem/5rem), empujándola
            hasta el borde izquierdo real. El texto no se toca. */}
        <div className="relative mt-10 grid grid-cols-1 gap-8 md:grid-cols-[1.6fr_1fr] md:items-center md:gap-16">
          {/* Los 3 segmentos pasaron a placeholder — pasada de "ninguna
              foto se repite": bobinas-deposito.jpeg y quimicos-tanques.png
              le quedaron a ChemicalsToPaper.tsx (sus dos capítulos no
              pueden perder ninguna de las dos fotos sin quedar un
              capítulo entero vacío). "Distribuidores" ya estaba en
              placeholder desde antes (nunca hubo foto de producto
              Guardián en punto de venta); ahora los 3 comparten el mismo
              tratamiento en vez de mezclar 2 fotos reales con 1 marcada. */}
          <div className="relative h-[42vh] w-full overflow-hidden md:-ml-12 md:h-[48vh] min-[1440px]:-ml-20!">
            {SEGMENTS.map((seg) => (
              <div
                key={seg.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeId === seg.id ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                {seg.video ? (
                  <VideoMedia src={seg.video.src} poster={seg.video.poster} ariaLabel={seg.video.alt} />
                ) : seg.photo ? (
                  <PhotoMedia src={seg.photo.src} alt={seg.photo.alt} sizes="(min-width: 768px) 62vw, 100vw" />
                ) : (
                  <PlaceholderMedia tone="dark" label={seg.mediaLabel} />
                )}
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-heading text-ink">{active.headline}</h3>
            <p className="mt-4 max-w-md text-ink/60">{active.copy}</p>
            <a
              href={mailto}
              className="font-label mt-8 inline-block w-fit border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60"
            >
              {active.cta} <span className="cta-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
