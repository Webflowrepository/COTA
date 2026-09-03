"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion/gsap";

/**
 * Video generado (loop corto, sin audio) para secciones que hoy no tienen
 * foto real de COTA — mismo criterio de "generado hasta que haya asset
 * real" que PhotoMedia documenta para sus propios usos. Carga diferida vía
 * IntersectionObserver (no baja el archivo hasta que la sección está por
 * entrar en pantalla) — mismo patrón que ya usa NaschelPlant.tsx, factorizado
 * acá porque ahora hay más de un lugar que lo necesita. Con
 * prefers-reduced-motion, se queda en el poster (si hay) o en negro, nunca
 * baja ni reproduce el video.
 */
export default function VideoMedia({
  src,
  poster,
  ariaLabel,
  className = "",
}: {
  src: string;
  poster?: string;
  ariaLabel: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion()) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (!video.src) {
          video.src = src;
          video.addEventListener("loadedmetadata", () => video.play().catch(() => {}), { once: true });
          video.load();
        }
        io.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-label={ariaLabel}
      />
    </div>
  );
}
