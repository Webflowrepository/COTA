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
    // Antes decía "Fabricación de Papel Tissue" — el cliente marcó que la
    // foto (papel-produccion-tissue.jpeg) en realidad muestra conversión
    // (corte y apilado de servilletas en la línea), no la fabricación del
    // papel en sí. En vez de salir a buscar otra foto de fabricación pura,
    // se ajustó el título/copy para que describan lo que la foto
    // efectivamente muestra.
    title: "Conversión Integrada",
    copy: "El papel se corta y convierte en línea, a escala industrial.",
    label: "Foto — máquina papelera en producción",
    dark: false,
    photo: { src: "/photos/papel-produccion-tissue.jpeg", alt: "Línea de conversión de papel Tissue en la planta de COTA" },
  },
  {
    n: "04",
    title: "Rebobinado",
    copy: "El papel se rebobina y se prepara para su conversión.",
    label: "Foto — rebobinadora industrial",
    dark: false,
    photo: { src: "/photos/proceso-rebobinado-real.jpeg", alt: "Bobina de papel en máquina rebobinadora, planta de COTA" },
  },
  // Etapa "Logística" (naschel-planta-aerea.png) sacada a pedido del
  // cliente — la misma foto/escena (galpón aéreo) ya es el video de
  // NaschelPlant.tsx, el momento de firma del "700 T/MES"; mostrarla acá
  // también leía como repetida. Mismo criterio que cuando se sacó
  // "Producto Terminado" (arriba): no queda placeholder ni foto
  // reemplazo — Rebobinado ya cierra en "se prepara para su conversión"
  // y el concepto de logística/distribución sigue cubierto en
  // SolutionsByApplication y en la propia NaschelPlant.
];

export default function IndustrialProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
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

      // pin: pinRef (no trigger, con altura 0 en flujo normal — ver el
      // comentario junto al JSX) en vez de pinear el propio trigger.
      // Medido con Playwright: antes, con pin:true pineando directamente
      // sectionRef (que sí tiene altura real, 100svh), el spacer que
      // arma GSAP reservaba altura-natural (900px) + rango-de-scrub
      // (900px) = 1800px totales, pero el paneo horizontal sólo usa los
      // primeros 900px — los segundos 900px quedaban con el track
      // completamente pineado (position:fixed) y congelado, sin ningún
      // cambio visual pese a que el usuario seguía scrolleando: la
      // sensación reportada de "se traba la pantalla". Pinear un
      // elemento con altura 0 en el flujo normal elimina esa reserva
      // extra — el spacer pasa a ser sólo el rango de scrub (900px),
      // sin cola muerta.
      stRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: pinRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight}`,
        scrub: 0.3,
        animation: tween,
        invalidateOnRefresh: true,
        onUpdate: (self) => setProgress(self.progress),
        // z-index sólo mientras está activamente pineado (fixed) — ver
        // comentario en el JSX. Un z-10 fijo en la clase se quedaba
        // pegado incluso después de soltarse (vuelve a position:relative,
        // scrollea como cualquier bloque normal), tapando otros 900px de
        // scroll normal a ChemicalsToPaper entrando por abajo — mismo
        // síntoma raro reportado, sólo que corrido de lugar. onEnter/
        // onEnterBack (arranca a pinear, en cualquier dirección) le suman
        // el z-index; onLeave/onLeaveBack (se suelta, en cualquier
        // dirección) se lo sacan — así el orden normal por DOM (que
        // funciona bien para dos secciones que no están pineadas) vuelve
        // a mandar apenas termina el pin.
        onEnter: () => pinRef.current?.classList.add("z-10"),
        onEnterBack: () => pinRef.current?.classList.add("z-10"),
        onLeave: () => pinRef.current?.classList.remove("z-10"),
        onLeaveBack: () => pinRef.current?.classList.remove("z-10"),
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
    // La última etapa (progreso 1) cae justo en st.end — el borde exacto
    // donde el pin se suelta y arranca ChemicalsToPaper. Confirmado con
    // Playwright en mobile: tocar el punto de "Rebobinado" saltaba directo
    // a Químicos en vez de mostrar la etapa — el scroll suave (behavior:
    // "smooth", con Lenis interceptando el scroll global) se pasaba del
    // límite por el propio decay del scroll, soltando el pin antes de
    // asentarse. Frenar unos px antes del borde deja el track
    // visualmente en el mismo lugar (ya casi en su posición final) pero
    // sin cruzar el límite. Solo afecta a la última etapa — el resto da
    // valores muy por debajo del límite.
    const rawTarget = st.start + (i / (STAGES.length - 1)) * (st.end - st.start);
    const target = Math.min(rawTarget, st.end - 40);
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
      {/* pinRef: altura 0 a propósito — es lo que GSAP pinea (ver
          ScrollTrigger.create arriba). El contenido real, visualmente
          idéntico a como estaba antes, va adentro con position:absolute
          para no aportarle altura al wrapper — así el spacer que arma el
          pin no reserva una pantalla completa de más.
          El z-10 que agregan/sacan los callbacks onEnter/onLeave de arriba
          (no está en esta clase — sólo mientras el pin está activo)
          resuelve que ChemicalsToPaper (#quimicos, que arranca pegado sin
          ningún margen desde que se sacó la zona muerta) se pintaba
          ENCIMA del contenido todavía pineado acá — confirmado con
          Playwright. Un z-10 fijo en la clase "arregla" eso pero rompe la
          transición normal de salida (queda pegado 900px de más después
          de soltarse, ahora tapando a Químicos en sentido contrario) —
          por eso se maneja dinámico, sólo durante el pin real. */}
      <div ref={pinRef} className="relative h-0">
        {/* bg-ink-deep acá (no solo en la <section> de afuera): mientras
            GSAP pinea, este div pasa a position:fixed y pasa a pintarse
            como una capa aparte, ya no "dentro" de la caja de la section
            para efectos visuales — el bg-ink-deep de la section de afuera
            no lo cubre. Sin fondo propio, cualquier franja sin foto encima
            (la barra de progreso de abajo, ~41px, sólo tiene texto/línea,
            sin bg) queda transparente y deja ver lo que hay scrolleando
            debajo en ese momento — que ya es ChemicalsToPaper (#quimicos,
            arranca pegado apenas termina el spacer del pin). Confirmado
            con Playwright: a mitad del pin se veía una franja de Químicos
            asomando por debajo de la barra de progreso, y a simple vista
            se leía como "otra copia" de los paneles (misma estética de
            tanques) — no era un duplicado, era la sección siguiente
            filtrándose por la franja transparente. */}
        <div className="absolute inset-x-0 top-0 flex h-[100svh] w-full flex-col overflow-hidden bg-ink-deep">
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
                  // El panel mide 86vw en mobile, 46vw en md, 36vw en lg —
                  // sin esto next/image bajaba la imagen a 100vw siempre.
                  <PhotoMedia
                    src={stage.photo.src}
                    alt={stage.photo.alt}
                    sizes="(min-width: 1024px) 36vw, (min-width: 768px) 46vw, 86vw"
                  />
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
      </div>
    </section>
  );
}
