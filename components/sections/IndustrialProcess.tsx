"use client";

import { useEffect, useRef, useState } from "react";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion/gsap";
import PlaceholderMedia from "@/components/visuals/PlaceholderMedia";
import PhotoMedia from "@/components/visuals/PhotoMedia";

// Antes había una 6ta etapa "Producto Terminado" sin foto real (caía en
// PlaceholderMedia) entre Rebobinado y Logística — quedaba como el frame
// terminal de la secuencia (el pin la deja congelada en pantalla completa
// al soltar) y era la única etapa sin evidencia fotográfica en las 3
// referencias comparadas (COTA_REFERENCE_GAP_AUDIT.md, gap 4 / intervención
// #2). Se sacó del todo — no había ningún concepto exclusivo ahí:
// Rebobinado ya cierra en "se prepara para su conversión" y Logística
// abre con "distribución de bobinas", así que el paso de "producto
// terminado" ya queda implícito entre esas dos. Si en algún momento llega
// una foto real de bobina/producto terminado, se puede volver a sumar acá.
const STAGES = [
  {
    n: "01",
    title: "Materia Prima",
    copy: "Fibra ingresa al proceso industrial.",
    label: "Foto — recepción de fibra / materia prima",
    dark: false,
    photo: { src: "/photos/proceso-materia-prima.png", alt: "Ingreso a la planta de COTA" },
  },
  {
    n: "02",
    title: "Proceso Químico",
    copy: "Blanqueadores ópticos desarrollados por COTA integran el proceso.",
    label: "Foto — tanque de proceso químico",
    dark: true,
    // Reemplazo directo (pedido del cliente) de la foto interior de
    // tanques (auditoría fotográfica, intervención #4: era la única con
    // negros reventados del sitio — 76% de píxeles por debajo de
    // luminancia 20/255 — y se le había aplicado un levantado de sombras
    // vía CSS para compensar). Esta foto nueva es una imagen generada de
    // tanques exteriores a la luz del día, ya bien expuesta — no necesita
    // ningún tratamiento de color, por eso se sacó el `photoClassName`
    // que tenía la versión anterior.
    photo: { src: "/photos/proceso-tanques-exterior.png", alt: "Tanques de proceso químico de la planta de COTA, a la luz del día" },
  },
  {
    n: "03",
    title: "Fabricación de Papel Tissue",
    copy: "La fibra se transforma en papel Tissue a escala industrial.",
    label: "Foto — máquina papelera en producción",
    dark: false,
    photo: { src: "/photos/papel-produccion-tissue.jpeg", alt: "Máquina de producción de papel Tissue en la planta de COTA" },
  },
  {
    n: "04",
    title: "Rebobinado",
    copy: "El papel se rebobina y se prepara para su conversión.",
    label: "Foto — rebobinadora industrial",
    dark: false,
    photo: { src: "/photos/proceso-rebobinado-real.jpeg", alt: "Bobina de papel en máquina rebobinadora, planta de COTA" },
  },
  {
    n: "05",
    title: "Logística",
    copy: "Distribución de bobinas hacia convertidores y distribuidores.",
    label: "Foto — despacho / logística",
    dark: false,
    photo: { src: "/photos/naschel-planta-aerea.png", alt: "Planta de COTA, vista aérea con patio de despacho" },
  },
];

export default function IndustrialProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      stRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight}`,
        pin: true,
        scrub: 0.3,
        animation: tween,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgress(self.progress),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // navegación por puntos en mobile — el scroll horizontal por gesto de
  // scroll vertical no siempre es intuitivo en touch, así que cada punto
  // saltea directamente a la posición de scroll de página que corresponde
  // a esa etapa (mismo ScrollTrigger que ya maneja el desktop).
  function goToStage(i: number) {
    const st = stRef.current;
    if (!st) return;
    const target = st.start + (i / (STAGES.length - 1)) * (st.end - st.start);
    window.scrollTo({ top: target, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  const activeStage = Math.min(STAGES.length - 1, Math.round(progress * (STAGES.length - 1)));

  return (
    <section
      id="proceso"
      ref={sectionRef}
      /* scroll-mt: al entrar por el link del nav (o por scroll normal), el
         kicker "Recorrido industrial" arrancaba pegado al borde superior
         de la sección — quedaba tapado por el nav fijo (~80px en desktop,
         ~64px en mobile). Ningún otro anchor del sitio tenía este problema
         porque sus kickers ya arrancan más abajo. */
      className="relative w-full scroll-mt-24 bg-ink-deep"
    >
      <div className="flex h-[100svh] w-full flex-col overflow-hidden">
        <div className="container-industrial flex shrink-0 items-end justify-between pt-10 pb-6 md:pt-14 md:pb-8">
          <div>
            <span className="font-label mb-4 block text-paper/50">Recorrido industrial</span>
            <h2 className="text-display max-w-md text-paper">Materia prima → producto terminado.</h2>
          </div>
          <span className="font-label hidden text-paper/40 md:block">Scroll para avanzar</span>
        </div>

        <div
          ref={trackRef}
          className="flex min-h-0 flex-1 gap-4 pb-6 pl-5 will-change-transform md:gap-6 md:pb-8 md:pl-12"
        >
          {STAGES.map((stage) => (
            <div
              key={stage.n}
              className="ip-panel relative h-full w-[86vw] shrink-0 overflow-hidden md:w-[46vw] lg:w-[36vw]"
            >
              <div className="absolute inset-0">
                {stage.photo ? (
                  <PhotoMedia src={stage.photo.src} alt={stage.photo.alt} />
                ) : (
                  <PlaceholderMedia tone={stage.dark ? "dark" : "light"} label={stage.label} />
                )}
              </div>
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(0deg, rgba(6,8,17,0.75) 0%, transparent 45%)" }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-7 text-paper md:p-9">
                <span className="font-label mb-3 block text-paper/60">
                  {stage.n} / {String(STAGES.length).padStart(2, "0")}
                </span>
                <h3 className="text-heading">{stage.title}</h3>
                <p className="mt-3 max-w-xs text-sm text-paper/70">{stage.copy}</p>
              </div>
            </div>
          ))}
          <div className="w-5 shrink-0 md:w-12" aria-hidden />
        </div>

        <div className="container-industrial shrink-0 pb-8 md:pb-10">
          <div className="h-px w-full bg-line-on-dark">
            <div
              className="h-px bg-paper/60 transition-[width] duration-150 ease-out"
              style={{ width: `${Math.max(2, progress * 100)}%` }}
            />
          </div>

          {/* En mobile, el gesto de scroll vertical→horizontal no siempre es
              obvio — se agregan puntos como forma explícita de navegar. */}
          <div className="mt-5 flex items-center justify-center gap-2.5 md:hidden">
            {STAGES.map((stage, i) => (
              <button
                key={stage.n}
                type="button"
                aria-label={`Ir a etapa ${stage.n} — ${stage.title}`}
                aria-current={activeStage === i}
                onClick={() => goToStage(i)}
                className="p-1.5"
              >
                <span
                  className={`block h-1 transition-[width,background-color] duration-300 ${
                    activeStage === i ? "w-7 bg-paper" : "w-2.5 bg-paper/35"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
