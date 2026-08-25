"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return !window.matchMedia(QUERY).matches;
}

/**
 * Filtros SVG compartidos por todos los visuales generativos (fibra,
 * líquido, grano macro). Se definen una sola vez acá y se referencian
 * desde CSS (`filter: url(#id)`) en los componentes de visuals/.
 */
export default function VisualDefs() {
  const animate = useSyncExternalStore(subscribe, getSnapshot, () => true);

  return (
    <svg aria-hidden className="absolute h-0 w-0 overflow-hidden">
      <defs>
        <filter id="grain-fine" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="4"
            result="n"
          />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" />
        </filter>

        <filter id="fiber-macro" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.012 0.35"
            numOctaves="3"
            seed="7"
            result="n"
          />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0" />
        </filter>

        <filter id="liquid-warp" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.012"
            numOctaves="2"
            seed="2"
            result="noise"
          >
            {animate && (
              <animate
                attributeName="baseFrequency"
                values="0.006 0.012;0.010 0.018;0.006 0.012"
                dur="22s"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="90" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="liquid-warp-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.02"
            numOctaves="2"
            seed="9"
            result="noise2"
          >
            {animate && (
              <animate
                attributeName="baseFrequency"
                values="0.01 0.02;0.016 0.03;0.01 0.02"
                dur="16s"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise2" scale="36" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
