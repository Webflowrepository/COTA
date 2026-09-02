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
  { value: cota.production.chemicalsMonthlyTons, suffix: "", label: "T/mes — capacidad Químicos" },
  { value: 220, suffix: " cm", label: "Ancho máx. de bobina — Papel" },
  { value: cota.businessLines.length, suffix: "", label: "Divisiones integradas" },
] as const;

export default function StatsBand() {
  return (
    <section className="w-full bg-paper py-16 md:py-20">
      <div className="container-industrial grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line-on-light pt-10 md:grid-cols-4 md:gap-x-10">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <span className="font-impact-number text-stat block text-ink">
              <Counter target={stat.value} />
              {stat.suffix}
            </span>
            <span className="font-label mt-3 block text-ink/50">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
