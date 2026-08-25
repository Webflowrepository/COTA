import { cota } from "@/lib/content/cota";

export default function History() {
  return (
    <section className="relative w-full bg-ink py-28 md:py-40">
      <div className="container-industrial">
        <span className="font-technical mb-14 block text-[11px] text-paper/50 md:mb-20">Trayectoria</span>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <div className="border-t border-line-on-dark pt-6">
            <span className="font-technical block text-[11px] text-paper/40">Origen — año a confirmar</span>
            <p className="mt-4 max-w-xs text-paper/60">
              El inicio de la operación industrial que hoy es COTA.
            </p>
          </div>
          <div className="border-t border-rust pt-6">
            <span className="font-technical block text-[11px] text-rust-light">
              Hoy — +{cota.yearsOfOperation} años
            </span>
            <p className="mt-4 max-w-xs text-paper/80">
              Planta propia en {cota.plant.location}, ~{cota.production.monthlyTons} {cota.production.unit}{" "}
              de capacidad, operando en química, papel y soluciones industriales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
