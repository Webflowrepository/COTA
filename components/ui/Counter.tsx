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
  duration = 900,
  threshold = 0.4,
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
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return <span ref={ref}>0</span>;
}
