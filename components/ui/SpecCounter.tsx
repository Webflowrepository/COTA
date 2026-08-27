"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion/gsap";

/**
 * Cuenta desde 0 hasta el/los valor(es) reales al entrar en viewport —
 * mismo efecto que StatsBand.tsx / NaschelPlant.tsx, pero genérico para
 * strings tipo "220 cm" (con sufijo y, si hace falta, coma decimal como
 * "7,5 cm"). Varios valores se animan juntos y se unen con " / ".
 */
function parse(raw: string) {
  const match = raw.match(/^(-?\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return { target: 0, suffix: raw, decimals: 0 };
  const numStr = match[1].replace(",", ".");
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { target: parseFloat(numStr), suffix: match[2], decimals };
}

function format(n: number, decimals: number) {
  return decimals > 0 ? n.toFixed(decimals).replace(".", ",") : String(Math.round(n));
}

export default function SpecCounter({ values, duration = 1100 }: { values: readonly string[]; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const parsed = values.map(parse);
  const finalText = values.join(" / ");
  const zeroText = parsed.map((v) => format(0, v.decimals) + v.suffix).join(" / ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = finalText;
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
          el.textContent = parsed.map((v) => format(v.target * eased, v.decimals) + v.suffix).join(" / ");
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalText]);

  return <span ref={ref}>{zeroText}</span>;
}
