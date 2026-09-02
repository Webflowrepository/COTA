import ExampleNotice from "@/components/ui/ExampleNotice";
import PhotoMedia from "@/components/visuals/PhotoMedia";

/**
 * Sección "Sostenibilidad" pedida en el brief. COTA no tiene ningún dato
 * ambiental verificado todavía (ni en cota.com.ar ni provisto por el
 * cliente) — ya se había declinado inventar esto una vez (ver ASSETS.md).
 * El cliente pidió esta vez maquetarla igual, con los 3 puntos de ejemplo
 * del brief, pero marcados sin ambigüedad como contenido de muestra.
 * Reemplazar POINTS por datos reales de COTA antes de publicar.
 */
const POINTS = [
  "90% del agua del proceso se recircula",
  "Fibra proveniente de fuentes certificadas",
  "Reducción continua del impacto por tonelada producida",
];

export default function Sustainability() {
  return (
    <section className="section-py-sm relative w-full overflow-hidden bg-ink-deep text-paper">
      {/* Antes: opacity-30 en la foto + un overlay plano encima — entre las
          dos, la foto quedaba casi invisible (7% de brillo real). El resto
          del sitio usa una sola foto a opacidad completa con un degradé
          (más oscuro abajo, donde vive el texto) — este era el único lugar
          que rompía ese patrón. */}
      <div className="absolute inset-0">
        <PhotoMedia src="/photos/naschel-planta-aerea.png" alt="Planta de COTA en Naschel" />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(0deg, rgba(6,8,17,0.9) 0%, rgba(6,8,17,0.55) 55%, rgba(6,8,17,0.7) 100%)" }}
      />

      <div className="container-industrial relative">
        <span className="font-label mb-2 block text-paper/50">Sostenibilidad</span>
        <ExampleNotice text="Ejemplo — sin dato ambiental verificado de COTA todavía" />

        <h2 className="text-display mt-4 max-w-xl text-paper">Producimos pensando en el mañana.</h2>

        <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {POINTS.map((point) => (
            <li key={point} className="border-t border-line-on-dark pt-5">
              <p className="text-lg text-paper/80">{point}</p>
              <span className="font-label mt-3 block text-paper/40">Ejemplo, no confirmado</span>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="font-label mt-12 inline-block w-fit border-b border-paper/40 pb-1 text-paper transition-colors hover:border-paper"
        >
          Conocer nuestras prácticas <span className="cta-arrow">→</span>
        </a>
      </div>
    </section>
  );
}
