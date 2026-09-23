"use client";

import { useState } from "react";
import VideoMedia from "@/components/visuals/VideoMedia";
import PlaceholderMedia from "@/components/visuals/PlaceholderMedia";
import { cota } from "@/lib/content/cota";

const bobinas = cota.services.find((s) => s.id === "bobinas")!;

const SEGMENTS = [
  {
    id: "convertidores",
    label: "Convertidores",
    headline: "Bobinas listas para su línea de conversión.",
    copy: bobinas.short,
    cta: "Ver bobinas",
    mediaLabel: "Foto — convertidor trabajando con bobina",
    categoryId: "bobinas",
    // Video generado que subió el cliente (kling_20260904_VIDEO_que_aprsca
    // _937_0.mp4), recomprimido a ~800KB/1280px para web (original pesaba
    // 7MB). El poster es el mismo frame que se usaba antes como foto fija,
    // pero pasado a WebP (48KB vs. 116KB el .jpg — un <video poster> no
    // pasa por next/image, así que conviene optimizarlo a mano una sola
    // vez). Evita cualquier parpadeo/negro mientras el video carga.
    video: {
      src: "/videos/soluciones-convertidor-bobina.mp4",
      poster: "/photos/soluciones-convertidor-bobina-poster.webp",
      alt: "Operario junto a bobina de papel en máquina convertidora",
    },
  },
  {
    id: "distribuidores",
    label: "Distribuidores",
    headline: cota.guardian.tagline,
    copy: `Línea profesional ${cota.guardian.name}, con apoyo a distribuidores en todo el país.`,
    cta: "Ver Guardián",
    mediaLabel: "Foto — producto Guardián en punto de venta",
    categoryId: "distribucion",
    // Video real subido por el cliente (Images/"usa estaaaa.mp4", 17MB/
    // 900x900/10s) — recomprimido a 1280x1280 (~1.5MB) siguiendo el mismo
    // criterio que los otros 2 videos de esta sección. A diferencia de
    // esos 2 (generados con Kling), este es footage real de la planta:
    // operarios junto a una máquina rebobinadora/convertidora — no muestra
    // literalmente "distribución" ni producto Guardián en punto de venta,
    // pero el cliente pidió explícitamente usarlo acá en vez de dejarlo en
    // placeholder. Reemplazar si en algún momento llega material que
    // muestre distribución/punto de venta más directamente.
    video: {
      src: "/videos/soluciones-guardian-distribucion.mp4",
      poster: "/photos/soluciones-guardian-distribucion-poster.webp",
      alt: "Operarios junto a máquina rebobinadora de papel en la planta de COTA",
    },
  },
];

export default function SolutionsByApplication() {
  const [activeId, setActiveId] = useState(SEGMENTS[0].id);

  // Split editorial, mismo lineamiento que Blanqueadores ópticos
  // (ChemicalsToPaper.tsx): texto a la izquierda, media a sangre a la
  // derecha. La columna de texto se ordena en 2 zonas (grilla vertical):
  // arriba el encabezado; abajo, anclada al pie, la lista de perfiles con
  // divisores finos — mismo patrón que "Por qué COTA" en Compañía. Sólo el
  // perfil activo se despliega (título, texto y CTA), así la columna no
  // apila todo a la vez. Mismos textos que antes.
  return (
    <section id="soluciones" className="relative grid w-full grid-cols-1 bg-paper md:grid-cols-2">
      <div className="flex w-full flex-col justify-center px-5 py-20 md:ml-auto md:max-w-[720px] md:py-24 md:pl-12 md:pr-16 md:min-h-[40rem] min-[1440px]:pl-20!">
        <div>
          <span className="font-label mb-6 block text-ink/50">Soluciones — 03</span>
          <h2 className="text-display max-w-md text-ink">De la materia a la operación del cliente.</h2>
          <p className="mt-6 max-w-md text-base text-ink/60 md:text-lg">
            Cada línea de COTA se integra en procesos industriales más amplios. Elija su perfil.
          </p>
        </div>

        {/* Los 2 perfiles con su info completa a la vista (pedido del
            cliente) — sin acordeón ni CTA por perfil. Pasar el mouse o
            tocar un perfil cambia el video de la derecha. */}
        <ul className="mt-12 flex max-w-md flex-col border-b border-line-on-light md:mt-16">
          {SEGMENTS.map((seg, i) => (
            <li
              key={seg.id}
              onMouseEnter={() => setActiveId(seg.id)}
              onClick={() => setActiveId(seg.id)}
              className="grid cursor-default grid-cols-[2.5rem_1fr] border-t border-line-on-light py-6"
            >
              <span className="font-label text-ink">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <span className="font-label block text-ink">{seg.label}</span>
                <h3 className="mt-3 text-base font-semibold text-ink md:text-lg">{seg.headline}</h3>
                <p className="mt-2 text-sm text-ink/60 md:text-base">{seg.copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-full">
        {SEGMENTS.map((seg) => (
          <div
            key={seg.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              activeId === seg.id ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {seg.video ? (
              <VideoMedia src={seg.video.src} poster={seg.video.poster} ariaLabel={seg.video.alt} />
            ) : (
              <PlaceholderMedia tone="dark" label={seg.mediaLabel} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
