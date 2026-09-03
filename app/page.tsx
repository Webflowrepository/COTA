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
import Certifications from "@/components/sections/Certifications";
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
      {/* Certificaciones se agrupa cerca del final, antes de Contacto —
          mantiene intacta la secuencia narrativa Proceso → Químicos →
          Papel que se construyó como un tramo continuo (ver memoria de
          dirección de arte, punto 2), en vez de cortarla justo después
          del recorrido industrial como sugería el brief original. El
          Testimonio, el logo band de clientes y Sostenibilidad se
          sacaron del todo — ninguno tenía un dato real de COTA detrás
          (legal, en el caso de testimonios/logos; ambiental, en el de
          Sostenibilidad) y el cliente prefirió que no queden ni como
          ejemplo. */}
      <Certifications />
      <InstagramFeed />
      <Contact />
    </main>
  );
}
