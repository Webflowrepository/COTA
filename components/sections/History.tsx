import { cota } from "@/lib/content/cota";

const MILESTONES = [
  {
    when: `${cota.foundedYear}`,
    title: "Origen",
    copy: "COTA nace como una pyme química en Naschel, San Luis.",
  },
  {
    when: "Expansión",
    title: "Capitales propios",
    copy: "Instala su propia planta papelera, especializada en papel Tissue.",
  },
  {
    when: `Hoy — ${cota.yearsOfOperation}+ años`,
    title: "Escala industrial",
    copy: `Planta propia en ${cota.plant.location}, ~${cota.production.monthlyTons} ${cota.production.unit} de capacidad, operando en química, papel Tissue y soluciones industriales.`,
  },
];

export default function History() {
  return (
    <section className="relative w-full bg-paper py-28 md:py-40">
      <div className="container-industrial">
        <span className="font-technical mb-14 block text-[11px] text-ink/50 md:mb-20">Trayectoria</span>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {MILESTONES.map((m, i) => {
            const isLast = i === MILESTONES.length - 1;
            return (
              <div key={m.title} className={`border-t pt-6 ${isLast ? "border-blue" : "border-line-on-light"}`}>
                <span className={`font-technical block text-[11px] ${isLast ? "text-blue" : "text-ink/45"}`}>
                  {m.when}
                </span>
                <h3 className="mt-2 text-2xl text-ink md:text-3xl">{m.title}</h3>
                <p className="mt-3 max-w-xs text-ink/65">{m.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
