import PlaceholderMedia from "@/components/visuals/PlaceholderMedia";
import { cota } from "@/lib/content/cota";

const bobinas = cota.services.find((s) => s.id === "bobinas")!;
const quimicos = cota.businessLines.find((l) => l.id === "quimicos")!;
const soluciones = cota.businessLines.find((l) => l.id === "soluciones")!;

const PANELS = [
  { id: "quimicos", label: quimicos.label, short: quimicos.short, mediaLabel: "Foto — proceso químico" },
  { id: "bobinas", label: "Bobinas Industriales", short: bobinas.short, mediaLabel: "Foto — bobina de papel" },
  {
    id: "guardian",
    label: cota.guardian.name,
    short: cota.guardian.tagline,
    mediaLabel: "Foto — producto Guardián",
  },
  { id: "soluciones", label: soluciones.label, short: soluciones.short, mediaLabel: "Foto — maquinaria / instalación" },
];

export default function ProductFamilies() {
  return (
    <section className="relative w-full bg-paper py-24 md:py-32">
      <div className="container-industrial mb-10 flex items-end justify-between md:mb-14">
        <h2 className="text-display max-w-md text-ink">Un sistema industrial integrado.</h2>
        <span className="font-label hidden text-ink/40 md:block">Desplazar horizontalmente →</span>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:gap-6 md:px-12">
        {PANELS.map((panel) => (
          <div
            key={panel.id}
            className="relative h-[62vh] w-[86vw] shrink-0 snap-start overflow-hidden md:h-[68vh] md:w-[46vw] lg:w-[36vw]"
          >
            <PlaceholderMedia tone="dark" label={panel.mediaLabel} />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(0deg, rgba(6,8,17,0.75) 0%, transparent 45%)" }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-7 text-paper md:p-9">
              <span className="font-label mb-3 block text-paper/70">Línea de producto</span>
              <h3 className="text-heading">{panel.label}</h3>
              <p className="mt-3 max-w-xs text-sm text-paper/70">{panel.short}</p>
              <span className="font-label mt-6 block text-paper/50">Especificaciones técnicas — a pedido</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
