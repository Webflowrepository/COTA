import { cota } from "@/lib/content/cota";
import Counter from "@/components/ui/Counter";

/**
 * Franja de números reales debajo del Hero. Sólo datos verificados en
 * lib/content/cota.ts — nada de la tonelada/año total de planta que pedía
 * el brief original (no está confirmada, sólo la capacidad de Químicos sí).
 */
// Antes el único stat "de negocio" era 700 T/mes Químicos — sin ningún
// número de Papel al lado, la franja se sentía orientada solo a química.
// Se suma el ancho máximo de bobina (220cm, dato real y verificado en
// cota.bobinaSpecs) para que Papel también tenga su número acá.
const STATS = [
  { value: cota.yearsOfOperation, suffix: "+", label: "Años operando" },
  { value: cota.production.chemicalsMonthlyTons, suffix: "", label: "Tn/mes — capacidad Químicos" },
  { value: 220, suffix: " cm", label: "Ancho máx. de bobina — Papel" },
  { value: cota.businessLines.length, suffix: "", label: "Divisiones integradas" },
] as const;

export default function StatsBand() {
  return (
    <section className="section-py-sm w-full bg-paper">
      <div className="container-industrial">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line-on-light pt-10 md:grid-cols-4 md:gap-x-10">
        {STATS.map((stat, i) => (
          <div key={stat.label}>
            {/* El primer dato (Anos operando) es el que respalda la
                promesa del H1 del Hero ("Lideres en la produccion") - de
                los 4, es el unico que es una credencial de confianza, no
                una especificacion tecnica. Un solo acento en verde (el
                unico color de marca del sitio) le da a la franja un lugar
                donde apoyar la mirada antes de recorrer el resto en negro
                - evita que las 4 cifras compitan con el mismo peso, sin
                sumar ningun elemento nuevo al sistema. */}
            <span className={`font-impact-number text-stat block ${i === 0 ? "text-green" : "text-ink"}`}>
              <Counter target={stat.value} />
              {stat.suffix}
            </span>
            <span className="font-label mt-3 block text-ink/50">{stat.label}</span>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
