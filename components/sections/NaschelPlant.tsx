"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion/gsap";
import Counter from "@/components/ui/Counter";
import { cota } from "@/lib/content/cota";

export default function NaschelPlant() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();

    const ctx = gsap.context(() => {
      // el conteo de "Años"/"T/mes" ya NO va acá — usa Counter.tsx: cuenta
      // una sola vez, apenas entra en viewport.

      // Antes esta sección era un pin de 180vh con la foto de fondo atada
      // al progreso del scroll (parallax vía scrub) y el heading revelado
      // recién al pisar el pin — el cliente lo sintió pesado/lageado Y
      // había que scrollear mucho antes de que apareciera la info. Ahora
      // es una sección normal (sin pin, altura de 1 viewport): el fondo es
      // un video que se mueve solo (no atado al scroll — nada que
      // recalcular en cada frame de scroll) y el heading/stats aparecen
      // con el mismo reveal corto de una sola vez que usa el resto del
      // sitio (WhyCota, WhatCotaDoes), disparado apenas la sección entra
      // bastante en pantalla — no hace falta llegar a pinnear nada.
      gsap.fromTo(
        ".naschel-heading",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%", toggleActions: "play none none none" },
        },
      );
    }, rootRef);

    // El <video> no trae `src` en el HTML inicial — recién se le asigna
    // cuando la sección está por entrar en pantalla (mismo criterio que
    // Counter.tsx: IntersectionObserver, dispara una sola vez) — así no se
    // gasta ancho de banda bajando un video que puede estar a 15+
    // pantallas de scroll de distancia. Antes de eso queda el fondo
    // bg-ink-deep de la sección (sin `poster`) — se sacó el poster que
    // apuntaba a naschel-planta-aerea.png para que esa foto no aparezca
    // dos veces en el sitio (pasada de "ninguna foto se repite"): esa
    // foto ya es la real usada en IndustrialProcess, etapa "Logística".
    // El video en sí (naschel-planta-aerea.mp4) es un archivo generado
    // aparte, no la foto — sigue siendo el contenido real de esta
    // sección una vez que carga.
    const video = videoRef.current;
    const section = rootRef.current;
    let io: IntersectionObserver | undefined;
    // prefers-reduced-motion: se queda en el poster (foto fija), no se
    // baja ni se reproduce el video.
    if (video && section && !prefersReducedMotion()) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          if (!video.src) {
            // `preload="none"` no arranca la descarga solo con asignar
            // `src` — hace falta `.load()`. Pero llamar a `.play()` en el
            // mismo tick que `.load()` puede interrumpir el propio
            // `play()` (AbortError) en algunos navegadores, así que se
            // espera a `loadedmetadata` antes de reproducir.
            video.src = "/videos/naschel-planta-aerea.mp4";
            video.addEventListener("loadedmetadata", () => video.play().catch(() => {}), { once: true });
            video.load();
          }
          io?.disconnect();
        },
        { rootMargin: "600px 0px" },
      );
      io.observe(section);
    }

    return () => {
      ctx.revert();
      io?.disconnect();
    };
  }, []);

  return (
    <section id="planta" ref={rootRef} className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-ink-deep">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        aria-label={`Planta de COTA en ${cota.plant.location}, vista aérea`}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(0deg, rgba(6,8,17,0.85) 0%, rgba(6,8,17,0.1) 50%, rgba(6,8,17,0.35) 100%)" }}
      />

      <div className="container-industrial naschel-heading relative flex w-full flex-col justify-end pb-20 md:pb-28">
        <span className="font-label mb-4 block text-paper/60">Planta industrial — {cota.plant.location}</span>

        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-8">
          <div>
            <h2 className="text-hero max-w-xl text-paper">Naschel.</h2>

            <div className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-6">
              <div>
                <span className="font-impact-number text-stat block text-paper">
                  <Counter target={cota.yearsOfOperation} />+
                </span>
                <span className="font-label text-paper/60">Años</span>
              </div>
              <div>
                <span className="font-impact-number text-stat block text-paper">1</span>
                <span className="font-label text-paper/60">Planta propia</span>
              </div>
              <span className="font-label pb-1 text-paper/50">
                {cota.plant.location}, {cota.country}
              </span>
            </div>

            {cota.plant.ownCapital && (
              <p className="font-label mt-6 max-w-md text-paper/45">Instalación realizada con capitales propios.</p>
            )}

            <a
              href="#contacto"
              className="font-label mt-8 inline-block w-fit border-b border-paper/40 pb-1 text-paper transition-colors hover:border-paper"
            >
              Ir al formulario <span className="cta-arrow">→</span>
            </a>
          </div>

          <div className="shrink-0 md:text-right">
            <span className="font-label mb-2 block text-paper/60">Capacidad — Químicos</span>
            <div className="flex items-end gap-3 md:justify-end">
              <span className="font-impact-number text-mega block text-paper">
                <Counter target={cota.production.chemicalsMonthlyTons} />
              </span>
              <span className="font-label mb-3 text-paper/70 md:mb-6">T/MES</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
