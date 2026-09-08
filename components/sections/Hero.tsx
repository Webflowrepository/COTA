"use client";

import { useEffect, useRef } from "react";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion/gsap";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video generado (drone, sobrevuelo de la planta) que subió el cliente
  // (kling_20260904_VIDEO_angulo_epi_1004_0.mp4) para reemplazar la foto
  // estática del Hero — recomprimido a ~2MB/1920px (original pesaba 32MB,
  // inviable arriba del fold). El poster es la misma foto que usaba antes
  // pero convertida a WebP (hero-planta-aerea-poster.webp, 205KB vs. 2.4MB
  // el PNG original) — un <video poster> no pasa por el pipeline de
  // next/image (eso sólo optimiza <Image>), así que servía el PNG entero
  // sin comprimir; medido con Lighthouse en producción, ese solo archivo
  // era casi la mitad del peso total de la página. Se ve instantánea en
  // el primer paint, igual que antes, y el <video> la reemplaza recién
  // cuando carga — no hay salto de layout ni de composición, sólo empieza
  // a moverse.
  // A diferencia de NaschelPlant (que difiere la carga hasta que la
  // sección entra en viewport, porque puede estar a pantallas de
  // distancia), acá el Hero siempre está en pantalla al cargar la página,
  // así que el video arranca de una — sin IntersectionObserver. Con
  // prefers-reduced-motion no se le asigna `src` nunca: la foto del
  // poster queda fija, como página estática.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion()) return;
    video.src = "/videos/hero-planta-aerea-drone.mp4";
    video.addEventListener("loadedmetadata", () => video.play().catch(() => {}), { once: true });
    video.load();
  }, []);

  useEffect(() => {
    const { gsap } = ensureGsapRegistered();
    const ctx = gsap.context(() => {
      // Duraciones a la mitad de las originales (1.2/1/0.7s → 0.6/0.5/0.5s),
      // misma coreografía relativa (fade de fondo → reveal del H1 en
      // clip-path → subtítulo/label/cue). Medido con Lighthouse (mobile,
      // preset default con CPU throttling): el LCP real de la página es el
      // segundo renglón del H1 ("transformación."), y el clip-path que lo
      // arranca 100% oculto hacía que el navegador no lo contara como
      // "pintado" hasta que la animación lo revelaba — 91% del LCP (4.4s
      // de 4.9s) era "Render Delay" por esto, no carga de red. Acortar a
      // la mitad no saca el efecto, sólo lo hace bastante más rápido.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".hero-bg", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" })
        .fromTo(
          ".hero-line",
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.5, stagger: 0.06, ease: "power4.out" },
          "-=0.35",
        )
        .fromTo(
          ".hero-sub, .hero-label, .hero-cue",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 },
          "-=0.25",
        );

      if (!prefersReducedMotion()) {
        gsap.to(".hero-parallax", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative h-[100svh] w-full overflow-hidden bg-ink-deep">
      <div className="hero-bg hero-parallax absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="none"
          poster="/photos/hero-planta-aerea-poster.webp"
          aria-label="Planta de COTA — vista aérea al amanecer"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(6,8,17,0.75) 0%, rgba(6,8,17,0.15) 45%, rgba(6,8,17,0.35) 100%)" }}
        />
      </div>

      <div className="container-industrial relative z-10 flex h-full flex-col justify-end pb-20 md:pb-28">
        <span className="hero-label font-label mb-6 block text-paper/60">
          Argentina — Químicos / Papel Tissue / Soluciones Industriales
        </span>

        <h1 className="max-w-3xl overflow-hidden">
          <span className="hero-line text-hero block overflow-hidden text-paper">Materia en</span>
          <span className="hero-line text-hero block overflow-hidden text-paper">transformación.</span>
        </h1>

        <p className="hero-sub mt-7 max-w-md text-base text-paper/65 md:text-lg">
          Blanqueadores ópticos, papel Tissue y soluciones industriales, desde 1994.
        </p>

        <a
          href="#contacto"
          className="hero-sub font-label mt-9 inline-block w-fit border-b border-paper/50 pb-1 text-paper transition-colors hover:border-paper"
        >
          Solicitar asesoramiento técnico <span className="cta-arrow">→</span>
        </a>
      </div>

      <div className="hero-cue absolute bottom-8 right-24 z-10 flex items-center gap-3">
        <span className="font-label text-paper/50">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-paper/40" />
      </div>
    </section>
  );
}
