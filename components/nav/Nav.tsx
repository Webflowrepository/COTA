"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#compania", id: "compania", label: "Compañía" },
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

  const base = scrolled ? "text-ink/65 hover:text-ink" : "text-paper/75 hover:text-paper";
  const logoColor = scrolled ? "text-ink" : "text-paper";

  return (
    <header className="fixed inset-x-0 top-5 z-50 md:top-8">
      <div className="container-industrial flex items-center justify-between">
        <a href="#top" className={`text-sm font-medium tracking-tight transition-colors ${logoColor}`}>
          COTA
        </a>

        <nav
          className={`font-label hidden items-center gap-7 rounded-none px-6 py-3 transition-colors duration-300 md:flex ${
            scrolled ? "bg-paper/90 backdrop-blur-md" : ""
          }`}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeId === link.id ? "true" : undefined}
              className={`nav-underline transition-colors ${activeId === link.id ? "text-blue" : base}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className={`nav-underline font-label hidden transition-colors md:block ${scrolled ? "text-ink/65 hover:text-ink" : "text-paper/75 hover:text-paper"}`}
        >
          Contacto
        </a>

        <button
          aria-label="Abrir navegación"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-px w-6 transition-transform ${logoColor === "text-ink" ? "bg-ink" : "bg-paper"} ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 transition-transform ${logoColor === "text-ink" ? "bg-ink" : "bg-paper"} ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="mt-3 flex flex-col gap-6 bg-paper px-5 py-8 md:hidden">
          {LINKS.concat([{ href: "#contacto", id: "contacto", label: "Contacto" }]).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-2xl ${activeId === link.id ? "text-blue" : "text-ink"}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
