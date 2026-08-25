"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion/gsap";

type Particle = {
  x: number;
  y: number;
  r: number;
  seed: number;
  speed: number;
};

/**
 * Campo de partículas generativo en canvas — representa materia (fibra/polvo)
 * en movimiento constante. No es una animación decorativa de relleno: es el
 * fondo vivo del Hero, en vez de un gradiente CSS estático.
 */
export default function ParticleField({
  className = "",
  color = "11,14,26",
  count = 260,
}: {
  className?: string;
  color?: string;
  count?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let raf = 0;
    let time = 0;
    const pointer = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4 };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        seed: Math.random() * 1000,
        speed: Math.random() * 0.6 + 0.3,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      pointer.tx += (pointer.x - pointer.tx) * 0.04;
      pointer.ty += (pointer.y - pointer.ty) * 0.04;
      const px = (pointer.tx - 0.5) * 40;
      const py = (pointer.ty - 0.5) * 24;

      for (const p of particles) {
        const angle = Math.sin(p.seed + time * 0.06) * 2 + Math.cos(time * 0.04 + p.x * 0.002);
        p.x += Math.cos(angle) * p.speed;
        p.y += Math.sin(angle * 0.6) * p.speed * 0.6 - 0.12;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const alpha = 0.12 + 0.18 * (Math.sin(p.seed + time * 0.05) * 0.5 + 0.5);
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${color},${alpha.toFixed(3)})`;
        ctx!.arc(p.x + px * (p.r / 2), p.y + py * (p.r / 2), p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop() {
      time += 1;
      draw();
      raf = requestAnimationFrame(loop);
    }

    function onPointerMove(e: PointerEvent) {
      pointer.x = e.clientX / window.innerWidth;
      pointer.y = e.clientY / window.innerHeight;
    }

    resize();
    seed();

    if (reduced) {
      draw();
    } else {
      loop();
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [color, count]);

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} />;
}
