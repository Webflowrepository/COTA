import type { Metadata } from "next";
import IndustrialProcess from "@/components/sections/IndustrialProcess";

export const metadata: Metadata = {
  title: "Proceso industrial — COTA",
  description:
    "Recorrido completo del proceso industrial de COTA: de la materia prima al producto terminado, en 6 etapas — química, fabricación de papel Tissue, rebobinado y logística.",
};

export default function ProcesoPage() {
  return (
    <main className="flex-1 bg-ink-deep">
      <div className="container-industrial pt-32 pb-4 md:pt-40">
        <span className="font-label mb-4 block text-paper/50">Proceso — recorrido completo</span>
        <h1 className="text-hero max-w-2xl text-paper">Materia prima → producto terminado.</h1>
        <p className="mt-6 max-w-md text-base text-paper/65">
          Las 6 etapas del proceso industrial de COTA, desde el ingreso de fibra hasta el despacho de bobinas
          terminadas.
        </p>
      </div>
      <IndustrialProcess />
    </main>
  );
}
