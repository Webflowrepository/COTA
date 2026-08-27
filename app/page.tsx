import Hero from "@/components/sections/Hero";
import WhatCotaDoes from "@/components/sections/WhatCotaDoes";
import IndustrialProcessTeaser from "@/components/sections/IndustrialProcessTeaser";
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
      <IndustrialProcessTeaser />
      <ChemicalsToPaper />
      <ProductFamilies />
      <SolutionsByApplication />
      <NaschelPlant />
      <Contact />
    </main>
  );
}
