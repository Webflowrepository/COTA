"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Mismo orden en que las secciones aparecen en el scroll real de la página
// (ver app/page.tsx) — antes el array no coincidía con el DOM (ej. "Papel"
// listado antes que "Proceso", que en la página va segundo), así que el
// resaltado de sección activa (más abajo) marcaba un link que no era el
// siguiente en aparecer.
const LINKS = [
  { href: "#compania", id: "compania", label: "Compañía" },
  { href: "#proceso", id: "proceso", label: "Proceso" },
  { href: "#quimicos", id: "quimicos", label: "Químicos" },
  { href: "#papel", id: "papel", label: "Papel" },
  { href: "#soluciones", id: "soluciones", label: "Soluciones" },
  { href: "#planta", id: "planta", label: "Planta" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    let ticking = false;
    const updateActive = () => {
      ticking = false;
      const triggerY = window.scrollY + window.innerHeight * 0.35;
      let current: string | null = null;
      for (const el of targets) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= triggerY) current = el.id;
      }

      // ChemicalsToPaper (#quimicos) hace un crossfade interno de un
      // capítulo "Químicos" a uno "Papel" sin cambiar de sección de DOM —
      // el nav marcaba "Químicos" durante todo el pin, incluso mientras en
      // pantalla ya se leía "PAPEL — 02". El crossfade cambia de capítulo
      // ~40% del recorrido del pin (mismo punto que anima ChemicalsToPaper.tsx).
      if (current === "quimicos") {
        const quimicos = document.getElementById("quimicos");
        if (quimicos) {
          const rect = quimicos.getBoundingClientRect();
          const scrollable = rect.height - window.innerHeight;
          const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
          if (progress > 0.4) current = "papel";
        }
      }

      setActiveId(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // el pill de fondo cubre TODO el header (logo + links + contacto) una vez
  // scrolleado, para que el texto siempre tenga contraste garantizado sin
  // importar qué sección (clara u oscura) esté detrás en ese momento.
  const base = scrolled ? "text-ink/65 hover:text-ink" : "text-paper/75 hover:text-paper";

  return (
    <header className="fixed inset-x-0 top-5 z-50 md:top-8">
      <div className="container-industrial">
        <div
          className={`flex items-center justify-between px-5 py-3 transition-colors duration-300 md:px-7 ${
            scrolled ? "bg-paper/95 shadow-[0_1px_0_0_rgba(11,14,26,0.08)] backdrop-blur-md" : ""
          }`}
        >
          <a href="#top" className="shrink-0">
            <Image
              src="/logo-cota.png"
              alt="COTA"
              width={327}
              height={80}
              priority
              className={`h-6 w-auto transition-[filter] duration-300 ${scrolled ? "invert" : ""}`}
            />
          </a>

          <nav className="font-label hidden items-center gap-7 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={activeId === link.id ? "true" : undefined}
                className={`nav-underline transition-colors ${activeId === link.id ? "text-green" : base}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a href="#contacto" className={`nav-underline font-label hidden transition-colors md:block ${base}`}>
            Contacto
          </a>

          <button
            aria-label="Abrir navegación"
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-px w-6 transition-transform ${scrolled ? "bg-ink" : "bg-paper"} ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 transition-transform ${scrolled ? "bg-ink" : "bg-paper"} ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="mt-3 flex flex-col gap-6 bg-paper px-5 py-8 md:hidden">
          {LINKS.concat([{ href: "#contacto", id: "contacto", label: "Contacto" }]).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-2xl ${activeId === link.id ? "text-green" : "text-ink"}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
