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
          pausa visual entre los dos, mismo bg-ink-deep de ambos lados
          para que no haya ningún flash de color.

          .section-py-xs (el ritmo más chico, pensado como "conector
          rápido") no alcanzaba — confirmado por el cliente viendo el
          resultado: con las dos fotos industriales oscuras a los lados,
          112/144px de negro liso se leía como más de lo mismo, no como
          una pausa a propósito. .section-py-lg (el ritmo más grande de la
          escala) da un negro liso lo bastante largo como para que se lea
          como una pausa real entre dos momentos, no como que se pisan.

          `relative`, no un div estático: el contenido pineado de Proceso
          (contentWrap, en IndustrialProcess.tsx) queda `position:absolute`
          incluso una vez suelto el pin — GSAP lo reposiciona por transform
          en vez de devolverlo al flujo normal. Un elemento absoluto
          SIEMPRE pinta por encima de hermanos `static` sin importar el
          orden del DOM — con este div sin `position`, el último frame de
          Proceso quedaba visible ENCIMA del conector (confirmado con
          Playwright: el heading "Materia prima" seguía en pantalla,
          superpuesto con Químicos). #quimicos (la sección de al lado) ya
          es `position:relative`, por eso ahí sí ganaba el orden del DOM.
          `relative` acá hace que este conector compita en el mismo grupo
          de apilado y tape ese frame residual como corresponde. */}
      <div className="relative section-py-lg bg-ink-deep" aria-hidden="true" />
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
