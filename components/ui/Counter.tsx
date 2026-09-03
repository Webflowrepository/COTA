"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion/gsap";

/**
 * Cuenta desde 0 hasta `target` una sola vez, al entrar en viewport —
 * independiente del scroll (no como los contadores viejos de
 * NaschelPlant.tsx / ChemicalsToPaper.tsx, que ataban el número al
 * progreso exacto del scroll dentro de una sección pinneada larga: eso
 * hacía que no quedara claro qué relación tenía "cuánto scrolleás" con
 * "qué número se ve", y que tardara mucho en terminar si el usuario
 * scrolleaba despacio. Acá el conteo es corto y se dispara solo.
 */
export default function Counter({
  target,
  duration = 1400,
  threshold = 0.2,
}: {
  target: number;
  duration?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = String(target);
      return;
    }
    // Ronda anterior: threshold 0 + 150px de rootMargin arrancaba TAN
    // temprano (antes de que el número entrara en pantalla) que para
    // cuando el usuario lo veía, el conteo (700ms) ya había terminado —
    // se percibía como que "no cargaba", no como que contaba. threshold
    // 0.2 + sin rootMargin arranca cuando el número realmente empieza a
    // verse, y 1400ms alcanza para que el conteo se note mientras se
    // termina de scrollear hacia la sección.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        setStarted(true);
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = String(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold },
    );
    io.observe(el);

    // red de seguridad: si por lo que sea el observer nunca llega a
    // disparar (tab en background, alguna condición rara del browser),
    // el número no debería quedar en "0" para siempre — a los 4s se
    // completa igual.
    const fallback = window.setTimeout(() => {
      if (!started) {
        setStarted(true);
        el.textContent = String(target);
      }
    }, 4000);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return <span ref={ref}>0</span>;
}
