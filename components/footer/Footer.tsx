import type { ReactElement } from "react";
import Image from "next/image";
import { cota } from "@/lib/content/cota";

// Sin cuenta real confirmada todavía (ver cota.socialPlaceholders) — los
// íconos quedan sin link, solo como indicador visual de qué redes se van a
// sumar, con el mismo "Próximamente" que antes tenía el texto plano.
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
      <path
        fill="currentColor"
        d="M16.6 5.82c-.9-.9-1.4-2.1-1.4-3.4h-3.1v13.4c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .6.05.9.14V9.9c-.3-.04-.6-.06-.9-.06-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8 5.8-2.6 5.8-5.8V9.3c1.2.9 2.7 1.4 4.3 1.4V7.6c-1 0-1.9-.3-2.6-.9-.5-.3-.9-.6-1.3-.89Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
      <path
        fill="currentColor"
        d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.4 8.75h3.4V21H3.4V8.75Zm6.6 0h3.26v1.68h.05c.45-.86 1.56-1.77 3.22-1.77 3.44 0 4.07 2.27 4.07 5.22V21h-3.4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21H10V8.75Z"
      />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, () => ReactElement> = {
  TikTok: TikTokIcon,
  LinkedIn: LinkedInIcon,
};

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-ink-deep text-paper">
      <div className="absolute inset-0">
        <Image
          src="/photos/naschel-planta-aerea.png"
          alt="Planta de COTA en Naschel, vista aérea"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink-deep/80" />
      </div>

      <div className="container-industrial relative flex flex-col gap-6 border-t border-line-on-dark py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-start gap-1">
          <Image src="/logo-cota.png" alt="COTA" width={327} height={80} className="h-5 w-auto shrink-0" />
          <span className="font-label mt-2 block text-paper/45">
            Planta: {cota.plant.location} ({cota.plant.postalCode}), {cota.country}
          </span>
        </div>

        <div className="flex items-center gap-4 text-paper/45">
          {cota.socialPlaceholders.map((s) => {
            const Icon = SOCIAL_ICONS[s];
            return (
              <span key={s} title={`${s} — próximamente`} className="flex items-center gap-1.5">
                {Icon && <Icon />}
                <span className="font-label">{s}</span>
              </span>
            );
          })}
        </div>

        <span className="font-label text-paper/45">
          © {new Date().getFullYear()} {cota.legalName} — {cota.country}
        </span>
      </div>
    </footer>
  );
}
