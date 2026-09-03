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
import InstagramFeed from "@/components/sections/InstagramFeed";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <StatsBand />
      <WhatCotaDoes />
      <WhyCota />
      <IndustrialProcess />
      <ChemicalsToPaper />
      <PapelTissueSpecs />
      <ProductFamilies />
      <SolutionsByApplication />
      <NaschelPlant />
      {/* Certificaciones se sacó del todo (auditoría visual, hallazgo #1) —
          mostraba "(pendiente)" en cada badge, sin ninguna certificación
          real confirmada. Mismo criterio ya aplicado a Testimonio, el logo
          band de clientes y Sostenibilidad: ninguno tenía un dato real de
          COTA detrás y el cliente prefirió que no queden ni como ejemplo.
          Volver a agregar sólo con certificaciones confirmadas y vigentes. */}
      <InstagramFeed />
      <Contact />
    </main>
  );
}
