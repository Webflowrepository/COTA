/**
 * Íconos de línea para las 4 tarjetas de "Compañía" (WhatCotaDoes.tsx) —
 * mismo criterio de trazo que ProductIcons.tsx (currentColor, sin relleno,
 * strokeWidth 1.5), pero conceptualmente distintos: ProductIcons.tsx son
 * íconos de PACKAGING (rollo de toalla, caja de servilletas, etc.), estos
 * son de LÍNEA DE NEGOCIO/PROCESO (materia prima, conversión, química,
 * ingeniería) — evita reusar el mismo ícono para dos cosas distintas en
 * la misma página (memoria de dirección de arte: priorizar distinción
 * visual). Se agregaron a pedido del cliente — la versión sin ícono (solo
 * número + texto) quedó "sin nada de visual".
 *
 * Formas simples y gruesas a propósito: se ven a 36px (h-9), no a 56px
 * como los de ProductIcons.tsx — el primer intento (rollo de perfil con
 * 2 elipses finas, engranaje de 8 rayos finos) se probó en pantalla y a
 * ese tamaño el rollo se leía como "dos ojos" y el engranaje como un sol,
 * no como sus formas reales. Estos usan menos elementos y más gruesos.
 */
const STROKE = 1.6;

export function RawRollIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      {/* 3 bobinas apiladas, vistas de frente — más reconocible a tamaño
          chico que un rollo de perfil. */}
      <circle cx="23" cy="24" r="12" stroke="currentColor" strokeWidth={STROKE} />
      <circle cx="41" cy="24" r="12" stroke="currentColor" strokeWidth={STROKE} />
      <circle cx="32" cy="41" r="12" stroke="currentColor" strokeWidth={STROKE} />
    </svg>
  );
}

export function ConversionIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      {/* materia prima (círculo) → flecha → producto convertido (cuadrado) */}
      <circle cx="15" cy="32" r="10" stroke="currentColor" strokeWidth={STROKE} />
      <path d="M29 32h9m0 0-4.5-4.5M38 32l-4.5 4.5" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="42" y="22" width="20" height="20" rx="3" stroke="currentColor" strokeWidth={STROKE} />
    </svg>
  );
}

export function FlaskIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path d="M26 9h12" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" />
      <path
        d="M27 9v15L15.4 46.6A4 4 0 0 0 18.9 53h26.2a4 4 0 0 0 3.5-6.4L37 24V9"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20.5 41h23" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" />
      <circle cx="29" cy="47" r="1.5" fill="currentColor" />
      <circle cx="35.5" cy="45" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function GearIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      {/* 4 dientes gruesos (no 8 rayos finos) — a 36px, 8 rayos leían como
          un sol; 4 rectángulos redondeados leen como un engranaje. */}
      <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth={STROKE} />
      <circle cx="32" cy="32" r="3.4" fill="currentColor" />
      <rect x="28" y="4" width="8" height="11" rx="2" stroke="currentColor" strokeWidth={STROKE} />
      <rect x="28" y="49" width="8" height="11" rx="2" stroke="currentColor" strokeWidth={STROKE} />
      <rect x="4" y="28" width="11" height="8" rx="2" stroke="currentColor" strokeWidth={STROKE} />
      <rect x="49" y="28" width="11" height="8" rx="2" stroke="currentColor" strokeWidth={STROKE} />
    </svg>
  );
}
