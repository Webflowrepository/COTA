import Hero from "@/components/sections/Hero";
import StatsBand from "@/components/sections/StatsBand";
import WhatCotaDoes from "@/components/sections/WhatCotaDoes";
import ChemicalsToPaper from "@/components/sections/ChemicalsToPaper";
import PapelTissueSpecs from "@/components/sections/PapelTissueSpecs";
import ProductosConvertidos from "@/components/sections/ProductosConvertidos";
import PapelTissue from "@/components/sections/PapelTissue";
import SolutionsByApplication from "@/components/sections/SolutionsByApplication";
import NaschelPlant from "@/components/sections/NaschelPlant";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <StatsBand />
      <WhatCotaDoes />
      {/* Jerarquía de contenido (2026-09-23): COTA → Papel Tissue (división
          principal) → Bobinas Industriales (producto principal) → Productos
          convertidos → Químicos → Soluciones → Planta → Contacto.
          ProductFamilies (los 4 paneles con el mismo peso: Bobinas /
          Conversión / Químicos / Soluciones) se desmontó: repetía como
          índice lo que ahora tiene sección propia y era justamente lo que
          ponía a las 4 líneas al mismo nivel. El componente sigue en
          components/sections/ProductFamilies.tsx por si se quiere volver. */}
      <PapelTissue />
      <PapelTissueSpecs />
      <ProductosConvertidos />
      <ChemicalsToPaper />
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
