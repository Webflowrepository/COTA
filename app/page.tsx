import Hero from "@/components/sections/Hero";
import StatsBand from "@/components/sections/StatsBand";
import WhatCotaDoes from "@/components/sections/WhatCotaDoes";
import WhyCota from "@/components/sections/WhyCota";
import IndustrialProcess from "@/components/sections/IndustrialProcess";
import ChemicalsToPaper from "@/components/sections/ChemicalsToPaper";
import PapelTissueSpecs from "@/components/sections/PapelTissueSpecs";
import ProductFamilies from "@/components/sections/ProductFamilies";
import SolutionsByApplication from "@/components/sections/SolutionsByApplication";
import NaschelPlant from "@/components/sections/NaschelPlant";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <StatsBand />
      <WhatCotaDoes />
      {/* ProductFamilies va justo después de Compañía (WhatCotaDoes), no
          más abajo entre Papel y Soluciones como antes — las 2 secciones
          muestran las mismas 4 líneas (Bobinas Industriales / Conversión
          Integrada / Químicos / Soluciones Industriales), sólo que ésta
          es el índice compacto (con preview de foto al hover) y
          ProductFamilies es el detalle con foto grande. Separadas por 6
          secciones se leían como una repetición accidental — pegadas,
          se leen como resumen → detalle, a propósito. Sólo cambio de
          orden, mismo contenido/CTAs de ambas, sin tocar nada más
          (análisis pedido por el cliente sobre por qué "los rubros" y
          "papel" se sentían repetidos en la página). */}
      <ProductFamilies />
      <WhyCota />
      {/* IndustrialProcess dejó de ser un pin/scroll-jack (rediseño
          2026-09-14, ver comentario al tope de IndustrialProcess.tsx) —
          ya no hay dos efectos pesados pegados, así que el conector negro
          que separaba a Proceso de Químicos (necesario cuando ambos
          pineaban) ya no tiene motivo: se sacó. Ayuda además a acortar la
          página, pedido explícito del cliente en la misma revisión. */}
      <IndustrialProcess />
      <ChemicalsToPaper />
      <PapelTissueSpecs />
      <SolutionsByApplication />
      <NaschelPlant />
      {/* Certificaciones se sacó del todo (auditoría visual, hallazgo #1) —
          mostraba "(pendiente)" en cada badge, sin ninguna certificación
          real confirmada. Mismo criterio ya aplicado a Testimonio, el logo
          band de clientes y Sostenibilidad: ninguno tenía un dato real de
          COTA detrás y el cliente prefirió que no queden ni como ejemplo.
          Volver a agregar sólo con certificaciones confirmadas y vigentes.
          InstagramFeed también se sacó (pedido del cliente) — el
          componente sigue en components/sections/InstagramFeed.tsx por si
          se quiere reactivar, sólo se desmontó de la página. */}
      <Contact />
    </main>
  );
}
