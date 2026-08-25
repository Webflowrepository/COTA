import type { ReactNode } from "react";
import MacroSurface from "@/components/visuals/MacroSurface";
import LiquidChemical from "@/components/visuals/LiquidChemical";
import FiberField from "@/components/visuals/FiberField";
import { cota } from "@/lib/content/cota";

const PANELS: { id: string; visual: ReactNode; text: string }[] = [
  { id: "quimicos", visual: <LiquidChemical intensity={0.85} />, text: "text-paper" },
  { id: "papel", visual: <FiberField tone="paper" />, text: "text-ink" },
  { id: "soluciones", visual: <MacroSurface tone="rust" />, text: "text-paper" },
];

export default function ProductFamilies() {
  return (
    <section className="relative w-full bg-ink py-24 md:py-32">
      <div className="container-industrial mb-10 flex items-end justify-between md:mb-14">
        <h2 className="max-w-md text-[9vw] leading-[0.92] text-paper md:text-[4vw]">
          Un sistema industrial integrado.
        </h2>
        <span className="font-technical hidden text-[11px] text-paper/40 md:block">
          Desplazar horizontalmente →
        </span>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:gap-6 md:px-12">
        {PANELS.map((panel) => {
          const line = cota.businessLines.find((l) => l.id === panel.id)!;
          return (
            <div
              key={panel.id}
              className="relative h-[62vh] w-[86vw] shrink-0 snap-start overflow-hidden rounded-sm md:h-[68vh] md:w-[46vw] lg:w-[36vw]"
            >
              {panel.visual}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(0deg, rgba(5,5,4,0.65) 0%, transparent 45%)" }}
              />
              <div className={`absolute inset-0 flex flex-col justify-end p-7 md:p-9 ${panel.text}`}>
                <span className="font-technical mb-3 block text-[11px] opacity-70">Línea de producto</span>
                <h3 className="text-[9vw] leading-[0.9] md:text-[3.2vw]">{line.label}</h3>
                <p className="mt-3 max-w-xs text-sm opacity-70">{line.short}</p>
                <span className="font-technical mt-6 block text-[10px] opacity-50">
                  Especificaciones técnicas — a pedido
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
