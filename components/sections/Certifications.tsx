import ExampleNotice from "@/components/ui/ExampleNotice";

/**
 * Fila de certificaciones pedida en el brief. COTA no tiene ninguna
 * certificación verificada todavía — mostrar un sello como real sin
 * confirmación es directamente un riesgo (alegar una certificación que no
 * se tiene). Se maqueta el layout con los ejemplos del brief, marcados como
 * pendientes de verificar; sacar el sufijo "(pendiente)" y ExampleNotice
 * recién cuando el cliente confirme cada certificación con su vigencia real.
 */
const BADGES = [
  { name: "ISO 9001", description: "Gestión de calidad — pendiente de confirmar vigencia con COTA." },
  { name: "BPM", description: "Buenas Prácticas de Manufactura — pendiente de confirmar con COTA." },
  { name: "Normas de seguridad industrial", description: "Pendiente de especificar norma y organismo certificador." },
];

export default function Certifications() {
  return (
    <section className="section-py-xs w-full bg-paper">
      <div className="container-industrial">
        <span className="font-label mb-2 block text-ink/45">Certificaciones</span>
        <ExampleNotice text="Ejemplo — ninguna certificación confirmada todavía" />

        <div className="mt-6 flex flex-wrap gap-4">
          {BADGES.map((badge) => (
            <div
              key={badge.name}
              title={badge.description}
              tabIndex={0}
              className="group relative border border-line-on-light px-4 py-3 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none"
            >
              <span className="font-label text-ink/70">
                {badge.name} <span className="text-ink/35">(pendiente)</span>
              </span>
              <div className="pointer-events-none absolute left-0 top-full z-10 mt-2 w-64 border border-line-on-light bg-paper p-3 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus:opacity-100">
                <p className="font-label text-ink/55">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
