import Hero from "@/components/sections/Hero";
import WhatCotaDoes from "@/components/sections/WhatCotaDoes";
import IndustrialProcess from "@/components/sections/IndustrialProcess";
import ChemicalsToPaper from "@/components/sections/ChemicalsToPaper";
import ProductFamilies from "@/components/sections/ProductFamilies";
import SolutionsByApplication from "@/components/sections/SolutionsByApplication";
import NaschelPlant from "@/components/sections/NaschelPlant";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <WhatCotaDoes />
      <IndustrialProcess />
      <ChemicalsToPaper />
      <ProductFamilies />
      <SolutionsByApplication />
      <NaschelPlant />
      <Contact />
    </main>
  );
}
