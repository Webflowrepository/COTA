import Hero from "@/components/sections/Hero";
import StatsBand from "@/components/sections/StatsBand";
import LogoBand from "@/components/sections/LogoBand";
import WhatCotaDoes from "@/components/sections/WhatCotaDoes";
import WhyCota from "@/components/sections/WhyCota";
import IndustrialProcess from "@/components/sections/IndustrialProcess";
import ChemicalsToPaper from "@/components/sections/ChemicalsToPaper";
import PapelTissueSpecs from "@/components/sections/PapelTissueSpecs";
import ProductFamilies from "@/components/sections/ProductFamilies";
import SolutionsByApplication from "@/components/sections/SolutionsByApplication";
import NaschelPlant from "@/components/sections/NaschelPlant";
import Sustainability from "@/components/sections/Sustainability";
import Testimonial from "@/components/sections/Testimonial";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <StatsBand />
      <LogoBand />
      <WhatCotaDoes />
      <WhyCota />
      <IndustrialProcess />
      <ChemicalsToPaper />
      <PapelTissueSpecs />
      <ProductFamilies />
      <SolutionsByApplication />
      <NaschelPlant />
      {/* Sostenibilidad + Testimonio + Certificaciones se agrupan cerca del
          final, antes de Contacto — mantiene intacta la secuencia narrativa
          Proceso → Químicos → Papel que se construyó como un tramo
          continuo (ver memoria de dirección de arte, punto 2), en vez de
          cortarla justo después del recorrido industrial como sugería el
          brief original. */}
      <Sustainability />
      <Testimonial />
      <Certifications />
      <Contact />
    </main>
  );
}
