import Image from "next/image";
import { cota } from "@/lib/content/cota";

/**
 * Últimos posts reales de @cota_papelera — sin API/widget de terceros
 * (Instagram Basic Display API está deprecada, y su embed oficial trae su
 * propio cartel de marca — perfil, "ver en Instagram", etc. — que
 * desentonaba fuerte con el resto del sitio). En vez de eso: las 9 fotos
 * de portada reales, bajadas una vez y servidas desde acá, en una grilla
 * con el mismo lenguaje visual del resto del sitio. Cada una linkea al
 * post real.
 *
 * OJO — esto NO se actualiza solo. Los thumbnails de Instagram vienen con
 * URLs firmadas que expiran, así que hace falta bajarlos (no hotlinkear).
 * Para renovar el feed: abrir instagram.com/cota_papelera, tomar los
 * primeros 9 posts/reels reales y sus URLs, reemplazar los archivos en
 * public/photos/instagram/ y actualizar POSTS acá abajo.
 */
const POSTS = [
  { file: "ig-01.jpg", href: "https://www.instagram.com/cota_papelera/reel/DWz39I4I4Pa/", alt: "Video de Cota S.A., 6 de abril de 2026" },
  { file: "ig-02.jpg", href: "https://www.instagram.com/cota_papelera/p/DOXE-J0jEtS/", alt: "Foto de Cota S.A., 8 de septiembre de 2025" },
  { file: "ig-03.jpg", href: "https://www.instagram.com/cota_papelera/p/DOrragDjGZ-/", alt: "Foto de Cota S.A., 16 de septiembre de 2025" },
  { file: "ig-04.jpg", href: "https://www.instagram.com/cota_papelera/reel/DcyTkH0MweX/", alt: "Video de Cota S.A. — 30 años" },
  { file: "ig-05.jpg", href: "https://www.instagram.com/cota_papelera/p/Dcj0dsNjAOa/", alt: "Foto de Cota S.A." },
  { file: "ig-06.jpg", href: "https://www.instagram.com/cota_papelera/p/DceagomDFVR/", alt: "Foto de Cota S.A." },
  { file: "ig-07.jpg", href: "https://www.instagram.com/cota_papelera/reel/DcTZR5IID9s/", alt: "Video de Cota S.A. — Blanco Premium" },
  { file: "ig-08.jpg", href: "https://www.instagram.com/cota_papelera/p/DcMh56CDB5d/", alt: "Foto de Cota S.A." },
  { file: "ig-09.jpg", href: "https://www.instagram.com/cota_papelera/p/DcBh2SGsDr8/", alt: "Buscamos vendedores y distribuidores en todo el país" },
];

const instagramHref = cota.social.find((s) => s.name === "Instagram")?.href;

export default function InstagramFeed() {
  return (
    <section className="section-py-sm w-full bg-paper">
      <div className="container-industrial">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-label mb-2 block text-ink/45">Instagram</span>
            <h2 className="text-heading text-ink">@cota_papelera</h2>
          </div>
          {instagramHref && (
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label inline-block w-fit border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60"
            >
              Seguir en Instagram <span className="cta-arrow">→</span>
            </a>
          )}
        </div>

        {/* Grilla más chica a propósito — es una sección de apoyo, no un
            momento insignia (ver memoria de dirección de arte, punto 3):
            9 posts en una sola fila desde tablet en vez de 3 imágenes
            gigantes de ~420px cada una a lo ancho del container. */}
        <div className="grid grid-cols-3 gap-1 sm:grid-cols-6 sm:gap-1.5 md:grid-cols-9">
          {POSTS.map((post) => (
            <a
              key={post.file}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={`/photos/instagram/${post.file}`}
                alt={post.alt}
                fill
                sizes="(min-width: 768px) 16vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink-deep/0 transition-colors duration-300 group-hover:bg-ink-deep/20" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
