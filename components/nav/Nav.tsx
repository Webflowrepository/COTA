"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#compania", label: "Compañía" },
  { href: "#quimicos", label: "Químicos" },
  { href: "#papel", label: "Papel" },
  { href: "#soluciones", label: "Soluciones" },
  { href: "#planta", label: "Planta" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-paper/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-industrial flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl">
          COTA
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-technical text-[11px] text-ink/65 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="font-technical border-b border-blue pb-0.5 text-[11px] text-blue transition-colors hover:text-ink hover:border-ink"
          >
            Contacto
          </a>
        </nav>

        <button
          aria-label="Abrir navegación"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-px w-6 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-6 bg-paper px-5 pb-10 pt-4 md:hidden">
          {LINKS.concat([{ href: "#contacto", label: "Contacto" }]).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-2xl text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
