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
      <WhyCota />
      <IndustrialProcess />
      {/* Conector — Proceso y Químicos son los dos únicos scroll-jack
          pesados del sitio (pin horizontal de 4 paneles / pin de 200vh con
          crossfade) y antes iban pegados sin ningún margen (el spacer del
          pin de Proceso termina exactamente donde arranca Químicos). Ya
          no hay ningún bug de transparencia ahí (ver comentarios en
          IndustrialProcess.tsx) pero el cliente lo sintió pesado igual:
          pasar de un efecto intenso al otro sin ningún respiro. Se pidió
          explícitamente NO reordenar las secciones (Químicos tiene su
          propio capítulo "Papel" al final que hace de pase de posta a
          #papel — moverlo rompería esa narrativa) — esto es solo una
          pausa visual corta entre los dos, mismo bg-ink-deep de ambos
          lados para que no haya ningún flash de color, usando el ritmo
          más chico de la escala (.section-py-xs, ya documentado en
          globals.css como "conector rápido entre dos momentos más
          grandes" — este es exactamente ese caso de uso).
          `relative`, no un div estático: el contenido pineado de Proceso
          (contentWrap, en IndustrialProcess.tsx) queda `position:absolute`
          incluso una vez suelto el pin — GSAP lo reposiciona por transform
          en vez de devolverlo al flujo normal. Un elemento
          absoluto SIEMPRE pinta por encima de hermanos `static` sin
          importar el orden del DOM — con este div sin `position`, el
          último frame de Proceso quedaba visible ENCIMA del conector
          (confirmado con Playwright: el heading "Materia prima" seguía
          en pantalla, superpuesto con Químicos). #quimicos (la sección
          de al lado) ya es `position:relative`, por eso ahí sí ganaba el
          orden del DOM. `relative` acá hace que este conector compita en
          el mismo grupo de apilado y tape ese frame residual como corresponde. */}
      <div className="relative section-py-xs bg-ink-deep" aria-hidden="true" />
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
          Volver a agregar sólo con certificaciones confirmadas y vigentes.
          InstagramFeed también se sacó (pedido del cliente) — el
          componente sigue en components/sections/InstagramFeed.tsx por si
          se quiere reactivar, sólo se desmontó de la página. */}
      <Contact />
    </main>
  );
}
