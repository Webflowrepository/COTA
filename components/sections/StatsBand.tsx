import { cota } from "@/lib/content/cota";
import Counter from "@/components/ui/Counter";

/**
 * Franja de números reales debajo del Hero. Sólo datos verificados en
 * lib/content/cota.ts — nada de la tonelada/año total de planta que pedía
 * el brief original (no está confirmada, sólo la capacidad de Químicos sí).
 */
const STATS = [
  { value: cota.yearsOfOperation, suffix: "+", label: "Años operando" },
  { value: cota.production.chemicalsMonthlyTons, suffix: "", label: "T/mes — capacidad Químicos" },
  { value: cota.businessLines.length, suffix: "", label: "Divisiones integradas" },
  { value: null, suffix: "", label: "Abastecimiento nacional", word: "Todo el país" },
] as const;

export default function StatsBand() {
  return (
    <section className="w-full bg-paper py-16 md:py-20">
      <div className="container-industrial grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line-on-light pt-10 md:grid-cols-4 md:gap-x-10">
        {STATS.map((stat) => (
          <div key={stat.label}>
            {stat.value !== null ? (
              <span className="font-impact-number text-stat block text-ink">
                <Counter target={stat.value} />
                {stat.suffix}
              </span>
            ) : (
              <span className="text-heading block text-ink">{stat.word}</span>
            )}
            <span className="font-label mt-3 block text-ink/50">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
