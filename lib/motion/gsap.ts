"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsapRegistered() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }).gsap = gsap;
      (window as unknown as { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }).ScrollTrigger =
        ScrollTrigger;
    }

    // Safari iOS: la barra de direcciones se colapsa/expande al
    // scrollear, lo que cambia el alto visible real (y con eso
    // window.innerHeight / 100svh) SIN disparar un 'resize' confiable en
    // `window` — solo en `window.visualViewport`. IndustrialProcess pinea
    // una sección de 100svh y calcula cuánto scroll reservar con
    // `+=${window.innerHeight}` — si ese cálculo quedó hecho con la barra
    // todavía visible (viewport más chico) y después la barra se colapsa,
    // el hueco reservado queda corto y se ve un pedazo de la sección
    // siguiente (Químicos) asomando por abajo. Confirmado en un iPhone
    // real (no se reproduce en Playwright, que emula un viewport fijo sin
    // esta barra dinámica). refresh() vuelve a leer innerHeight actual.
    if (window.visualViewport) {
      let raf = 0;
      window.visualViewport.addEventListener("resize", () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    }
  }
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
