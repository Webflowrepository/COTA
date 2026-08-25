import type { ReactNode } from "react";
import MacroSurface from "@/components/visuals/MacroSurface";
import LiquidChemical from "@/components/visuals/LiquidChemical";
import FiberField from "@/components/visuals/FiberField";
import FoldedSheetVisual from "@/components/visuals/FoldedSheetVisual";
import DevTag from "@/components/visuals/DevTag";
import { cota } from "@/lib/content/cota";

const bobinas = cota.services.find((s) => s.id === "bobinas")!;
const quimicos = cota.businessLines.find((l) => l.id === "quimicos")!;
const soluciones = cota.businessLines.find((l) => l.id === "soluciones")!;

const PANELS: { id: string; label: string; short: string; visual: ReactNode; dark: boolean; devTag?: string }[] = [
  { id: "quimicos", label: quimicos.label, short: quimicos.short, visual: <LiquidChemical intensity={0.85} />, dark: true },
  {
    id: "bobinas",
    label: "Bobinas Industriales",
    short: bobinas.short,
    visual: <FiberField tone="paper" />,
    dark: false,
  },
  {
    id: "guardian",
    label: cota.guardian.name,
    short: cota.guardian.tagline,
    visual: (
      <div className="absolute inset-6 md:inset-10">
        <FoldedSheetVisual className="h-full w-full" />
      </div>
    ),
    dark: false,
    devTag: "proxy — reemplazar por foto real de producto Guardián",
  },
  {
    id: "soluciones",
    label: soluciones.label,
    short: soluciones.short,
    visual: <MacroSurface tone="blue" />,
    dark: false,
  },
];

export default function ProductFamilies() {
  return (
    <section className="relative w-full bg-paper py-24 md:py-32">
      <div className="container-industrial mb-10 flex items-end justify-between md:mb-14">
        <h2 className="max-w-md text-[9vw] leading-[0.92] text-ink md:text-[4vw]">
          Un sistema industrial integrado.
        </h2>
        <span className="font-technical hidden text-[11px] text-ink/40 md:block">
          Desplazar horizontalmente →
        </span>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:gap-6 md:px-12">
        {PANELS.map((panel) => (
          <div
            key={panel.id}
            className="relative h-[62vh] w-[86vw] shrink-0 snap-start overflow-hidden rounded-sm md:h-[68vh] md:w-[46vw] lg:w-[36vw]"
          >
            {panel.visual}
            <div
              className="absolute inset-0"
              style={{
                background: panel.dark
                  ? "linear-gradient(0deg, rgba(6,8,17,0.7) 0%, transparent 45%)"
                  : "linear-gradient(0deg, rgba(250,250,248,0.85) 0%, transparent 45%)",
              }}
            />
            {panel.devTag && <DevTag>{panel.devTag}</DevTag>}
            <div
              className={`absolute inset-0 flex flex-col justify-end p-7 md:p-9 ${
                panel.dark ? "text-paper" : "text-ink"
              }`}
            >
              <span className="font-technical mb-3 block text-[11px] opacity-70">Línea de producto</span>
              <h3 className="text-[9vw] leading-[0.9] md:text-[3.2vw]">{panel.label}</h3>
              <p className="mt-3 max-w-xs text-sm opacity-70">{panel.short}</p>
              <span className="font-technical mt-6 block text-[10px] opacity-50">
                Especificaciones técnicas — a pedido
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
