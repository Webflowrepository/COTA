import ExampleNotice from "@/components/ui/ExampleNotice";

/**
 * Franja "Quienes nos eligen" pedida en el brief. No hay logos de clientes
 * reales ni autorización de uso todavía (ver ASSETS.md) — en vez de inventar
 * nombres de empresa creíbles (lo que fabricaría prueba social falsa), los
 * 6 slots quedan vacíos y marcados como ejemplo. Reemplazar cada slot por
 * <img> cuando haya logos + autorización confirmada.
 */
const SLOTS = 6;

export default function LogoBand() {
  return (
    <section className="w-full bg-paper-dim py-16 md:py-20">
      <div className="container-industrial">
        <span className="font-label mb-2 block text-ink/50">Quienes nos eligen</span>
        <ExampleNotice text="Ejemplo — logos pendientes de autorización de clientes" />

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {Array.from({ length: SLOTS }).map((_, i) => (
            <div
              key={i}
              className="flex h-20 items-center justify-center border border-dashed border-ink/20 text-ink/30 transition-colors hover:border-ink/40 hover:text-ink/45"
            >
              <span className="font-label">Logo</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
