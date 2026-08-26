"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered } from "@/lib/motion/gsap";
import PlaceholderMedia from "@/components/visuals/PlaceholderMedia";
import PhotoMedia from "@/components/visuals/PhotoMedia";
import { cota } from "@/lib/content/cota";

const CHEM_ITEMS = cota.chemicalTypes.map((type) => `Blanqueadores ${type}`);
const PAPER_ITEMS = ["Bobinas para convertidores", `${cota.guardian.name} — línea profesional`, "Producción propia en Naschel"];

export default function ChemicalsToPaper() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const chemLayerRef = useRef<HTMLDivElement>(null);
  const paperLayerRef = useRef<HTMLDivElement>(null);
  const chemTextRef = useRef<HTMLDivElement>(null);
  const paperTextRef = useRef<HTMLDivElement>(null);
  const chemCountRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsapRegistered();

    const ctx = gsap.context(() => {
      // valor real ya está en el HTML como fallback — recién acá se
      // resetea a 0 para poder animar el conteo.
      if (chemCountRef.current) chemCountRef.current.textContent = "0";

      const chemItems = chemTextRef.current!.querySelectorAll<HTMLLIElement>(".chem-item");
      const paperItems = paperTextRef.current!.querySelectorAll<HTMLLIElement>(".paper-item");

      gsap.set(paperLayerRef.current, { autoAlpha: 0 });
      gsap.set(paperTextRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(chemItems, { autoAlpha: 0, y: 8 });
      gsap.set(paperItems, { autoAlpha: 0, y: 8 });

      const tl = gsap.timeline({ paused: true });

      tl.to(chemLayerRef.current, { autoAlpha: 0, duration: 0.2 }, 0.38);
      tl.to(paperLayerRef.current, { autoAlpha: 1, duration: 0.2 }, 0.42);

      tl.to(chemTextRef.current, { autoAlpha: 0, y: -16, duration: 0.14 }, 0.32);
      tl.to(paperTextRef.current, { autoAlpha: 1, y: 0, duration: 0.16 }, 0.52);

      [0.06, 0.16, 0.26].forEach((t, i) => {
        tl.to(chemItems[i], { autoAlpha: 1, y: 0, duration: 0.1 }, t);
      });
      [0.58, 0.68, 0.78].forEach((t, i) => {
        tl.to(paperItems[i], { autoAlpha: 1, y: 0, duration: 0.1 }, t);
      });

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15,
        onUpdate: (self) => {
          tl.totalProgress(self.progress);
          const countProgress = Math.min(1, self.progress / 0.3);
          if (chemCountRef.current) {
            chemCountRef.current.textContent = String(Math.round(countProgress * cota.chemicalTypes.length));
          }
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} id="quimicos" className="relative h-[400vh] w-full bg-ink-deep">
      <span id="papel" className="absolute left-0 top-1/2 block h-px w-px" aria-hidden />

      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div ref={chemLayerRef} className="absolute inset-0">
          <PhotoMedia src="/photos/quimicos-planta.jpeg" alt="Planta química industrial — atmósfera" />
          <div className="absolute inset-0" style={{ background: "rgba(6,8,17,0.5)" }} />
        </div>
        <div ref={paperLayerRef} className="absolute inset-0">
          <PlaceholderMedia tone="light" label="Foto — macro de papel Tissue" />
          <div className="absolute inset-0" style={{ background: "rgba(6,8,17,0.35)" }} />
        </div>

        {/* Capítulo Químicos */}
        <div ref={chemTextRef} className="container-industrial absolute inset-0 flex flex-col justify-end pb-20 md:pb-28">
          <span className="font-label mb-4 block text-paper/60">Químicos — 01</span>
          <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
            <h3 className="text-display max-w-2xl text-paper">Precisión en cada reacción.</h3>
            <div>
              <span className="font-impact-number text-stat block text-paper">
                <span ref={chemCountRef}>{cota.chemicalTypes.length}</span>
              </span>
              <span className="font-label text-paper/50">Tipos de blanqueadores</span>
            </div>
          </div>
          <ul className="mt-8 flex flex-col gap-2">
            {CHEM_ITEMS.map((item, i) => (
              <li key={item} className="chem-item font-label text-paper/65">
                {String(i + 1).padStart(2, "0")} — {item}
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${cota.contact.email}?subject=${encodeURIComponent("Ficha técnica — Blanqueadores y químicos")}`}
            className="font-label mt-6 inline-block w-fit border-b border-paper/40 pb-0.5 text-paper transition-colors hover:border-paper"
          >
            Solicitar ficha técnica →
          </a>
        </div>

        {/* Capítulo Papel */}
        <div ref={paperTextRef} className="container-industrial absolute inset-0 flex flex-col justify-end pb-20 md:pb-28">
          <span className="font-label mb-4 block text-paper/60">Papel — 02</span>
          <h3 className="text-display max-w-2xl text-paper">Papel Tissue a escala industrial.</h3>
          <ul className="mt-8 flex flex-col gap-2">
            {PAPER_ITEMS.map((item, i) => (
              <li key={item} className="paper-item font-label text-paper/65">
                {String(i + 1).padStart(2, "0")} — {item}
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${cota.contact.email}?subject=${encodeURIComponent("Ficha técnica — Bobinas para convertidores")}`}
            className="font-label mt-6 inline-block w-fit border-b border-paper/40 pb-0.5 text-paper transition-colors hover:border-paper"
          >
            Solicitar ficha técnica →
          </a>
        </div>
      </div>
    </section>
  );
}
