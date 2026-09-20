"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import PhotoMedia from "@/components/visuals/PhotoMedia";
import Counter from "@/components/ui/Counter";
import { cota } from "@/lib/content/cota";

const CHEM_ITEMS = cota.chemicalTypes.map((type) => `Blanqueadores ${type}`);
const PAPER_ITEMS = ["Bobinas para convertidores", `${cota.guardian.name} — línea profesional`, "Producción propia en Naschel"];

// Rediseño completo (pedido del cliente, reiterado varias veces: "no quiero
// que tengas que ir scrolleando para que se vaya animando"). La versión
// anterior pineaba esta sección (200vh, sticky) y usaba un timeline de GSAP
// atado al scroll (scrub) para hacer un crossfade entre el capítulo
// "Químicos" y el capítulo "Papel" — el mismo mecanismo que tenía
// IndustrialProcess antes de sacarlo (ver ese archivo/git log). Aunque ya se
// le había sacado el slide effect, el problema de fondo seguía siendo el
// pin+scrub en sí: con la sección entera ya a la vista, había que seguir
// scrolleando para que el texto/lista terminaran de aparecer.
//
// Ahora son 2 secciones normales, sin pin, cada una con su propia foto de
// fondo (antes crossfadeaban entre sí) y un reveal de una sola vez al
// llegar (mismo patrón que NaschelPlant.tsx: fade simple, sin slide,
// disparado apenas la sección empieza a entrar en pantalla — no scrubbed,
// no hay que seguir scrolleando para que termine).
export default function ChemicalsToPaper() {
  const chemRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      [chemRef, paperRef].forEach((ref) => {
        gsap.fromTo(
          ref.current,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: ref.current, start: "top 100%", toggleActions: "play none none none" },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="quimicos" className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink-deep">
        <PhotoMedia src="/photos/quimicos-tanques.png" alt="Tanques de proceso en la planta de COTA" />
        <div className="absolute inset-0" style={{ background: "rgba(6,8,17,0.5)" }} />
        <div ref={chemRef} className="container-industrial relative flex w-full flex-col pb-20 md:pb-28">
          <span className="font-label mb-4 block text-paper/60">Químicos — 01</span>
          <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
            <h3 className="text-display max-w-2xl text-paper">Precisión en cada reacción.</h3>
            <div>
              <span className="font-impact-number text-stat block text-paper">
                <Counter target={cota.chemicalTypes.length} />
              </span>
              <span className="font-label text-paper/50">Tipos de blanqueadores</span>
            </div>
          </div>
          <ul className="mt-8 flex flex-col gap-2">
            {CHEM_ITEMS.map((item, i) => (
              <li key={item} className="font-label text-paper/65">
                {String(i + 1).padStart(2, "0")} — {item}
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${cota.contact.email}?subject=${encodeURIComponent("Ficha técnica — Blanqueadores y químicos")}`}
            className="font-label mt-6 inline-block w-fit border-b border-paper/40 pb-0.5 text-paper transition-colors hover:border-paper"
          >
            Solicitar ficha técnica <span className="cta-arrow">→</span>
          </a>
        </div>
      </section>

      <section className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink-deep">
        <PhotoMedia src="/photos/bobinas-deposito.jpeg" alt="Bobinas de papel Tissue en depósito de COTA" />
        <div className="absolute inset-0" style={{ background: "rgba(6,8,17,0.35)" }} />
        <div ref={paperRef} className="container-industrial relative flex w-full flex-col pb-20 md:pb-28">
          <span className="font-label mb-4 block text-paper/60">Papel — 02</span>
          <h3 className="text-display max-w-2xl text-paper">Papel Tissue a escala industrial.</h3>
          <ul className="mt-8 flex flex-col gap-2">
            {PAPER_ITEMS.map((item, i) => (
              <li key={item} className="font-label text-paper/65">
                {String(i + 1).padStart(2, "0")} — {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            <a
              href={`mailto:${cota.contact.email}?subject=${encodeURIComponent("Ficha técnica — Bobinas para convertidores")}`}
              className="font-label inline-block w-fit border-b border-paper/40 pb-0.5 text-paper transition-colors hover:border-paper"
            >
              Solicitar ficha técnica <span className="cta-arrow">→</span>
            </a>
            <a
              href="#papel"
              className="font-label inline-block w-fit border-b border-paper/40 pb-0.5 text-paper transition-colors hover:border-paper"
            >
              Ver especificaciones técnicas <span className="cta-arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
