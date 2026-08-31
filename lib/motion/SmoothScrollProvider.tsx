"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion/gsap";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsapRegistered();

    if (prefersReducedMotion()) return;

    // Lenis re-suaviza el scroll nativo con su propio raf loop — en
    // desktop con mouse/trackpad se siente premium, pero en mobile compite
    // con el scroll táctil nativo (que ya es suave) y sumado a todas las
    // animaciones scrub de GSAP terminaba sintiéndose con lag/delay al
    // scrollear con el dedo. Por eso queda gateado a <768px, tal como
    // estaba planeado desde el arranque del proyecto pero nunca se había
    // implementado. Sin Lenis, ScrollTrigger sigue andando igual —
    // escucha el scroll nativo por su cuenta.
    let lenis: Lenis | null = null;
    let rafCb: ((time: number) => void) | null = null;
    const mq = window.matchMedia("(min-width: 768px)");

    function enable() {
      if (lenis) return;
      lenis = new Lenis({
        duration: 0.7,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        touchMultiplier: 1.1,
      });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      rafCb = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(rafCb);
    }

    function disable() {
      if (!lenis) return;
      if (rafCb) gsap.ticker.remove(rafCb);
      lenis.destroy();
      lenis = null;
      lenisRef.current = null;
    }

    gsap.ticker.lagSmoothing(0);
    if (mq.matches) enable();

    const onChange = (e: MediaQueryListEvent) => (e.matches ? enable() : disable());
    mq.addEventListener("change", onChange);

    return () => {
      mq.removeEventListener("change", onChange);
      disable();
    };
  }, []);

  return <>{children}</>;
}
