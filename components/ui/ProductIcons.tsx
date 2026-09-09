/**
 * Set de íconos de línea para "Nuestros Productos" (PapelTissueSpecs.tsx).
 * Mismo criterio que SocialIcons.tsx: SVG con currentColor (el color lo
 * define quien los usa, acá siempre text-green) y trazo fino consistente
 * (strokeWidth 1.5, sin relleno) para que las 5 tarjetas lean como un
 * mismo set de íconos de packaging, no 5 estilos distintos.
 */
const STROKE = 1.5;

export function RollIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <ellipse cx="32" cy="17" rx="13" ry="5.5" stroke="currentColor" strokeWidth={STROKE} />
      <ellipse cx="32" cy="17" rx="4.5" ry="1.9" stroke="currentColor" strokeWidth={STROKE} />
      <path d="M19 17v28c0 3 5.8 5.5 13 5.5s13-2.5 13-5.5V17" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" />
      {/* hoja saliendo del rollo, sugiere "en uso" */}
      <path
        d="M19 40c-5 1.5-8 4.4-8 7.4 0 3.6 4.4 6.1 7.6 4.6 1.6-.75 1.9-2.4.9-3.7"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IndustrialRollIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      {/* bobina grande vista de frente, apoyada — escala industrial */}
      <circle cx="32" cy="30" r="17" stroke="currentColor" strokeWidth={STROKE} />
      <circle cx="32" cy="30" r="11" stroke="currentColor" strokeWidth={STROKE} />
      <circle cx="32" cy="30" r="5" stroke="currentColor" strokeWidth={STROKE} />
      <path d="M9 49h46" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" />
      <path d="M15 49v4M49 49v4" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" />
    </svg>
  );
}

export function InterfoldBoxIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <rect x="13" y="26" width="38" height="26" rx="3" stroke="currentColor" strokeWidth={STROKE} />
      <ellipse cx="32" cy="26" rx="9" ry="2.4" stroke="currentColor" strokeWidth={STROKE} />
      {/* hoja intercalada en zigzag saliendo de la ranura */}
      <path
        d="M25 26c1.6-4.2 3.6-4.2 5.2 0s3.6 4.2 5.2 0"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ToiletRollIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <ellipse cx="32" cy="16" rx="12" ry="5" stroke="currentColor" strokeWidth={STROKE} />
      <ellipse cx="32" cy="16" rx="4.2" ry="1.8" stroke="currentColor" strokeWidth={STROKE} />
      <path d="M20 16v30c0 2.76 5.4 5 12 5s12-2.24 12-5V16" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" />
      {/* línea de perforado, punteada, sobre el cuerpo del rollo */}
      <path
        d="M32 24v20"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray="0.5 4.5"
      />
    </svg>
  );
}

export function NapkinBoxIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <rect x="10" y="30" width="44" height="18" rx="3" stroke="currentColor" strokeWidth={STROKE} />
      <ellipse cx="32" cy="30" rx="8" ry="2.2" stroke="currentColor" strokeWidth={STROKE} />
      {/* servilleta doblada asomando, forma de rombo simple */}
      <path d="M28 30 32 22 36 30" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Ícono de marca minimalista bajo el heading de "Nuestros Productos" —
 * una hoja simple, mismo trazo fino que el resto del set. No es un logo,
 * es un separador visual entre el título y la grilla. */
export function LeafIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 20c0-9 5-15 16-16-1 11-7 16-16 16Z"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.5 18.5 15 9" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" />
    </svg>
  );
}
