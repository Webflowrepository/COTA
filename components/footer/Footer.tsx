import type { ReactElement } from "react";
import Image from "next/image";
import { cota } from "@/lib/content/cota";
import { InstagramIcon, LinkedInIcon, TikTokIcon } from "@/components/ui/SocialIcons";

// Sin cuenta real confirmada todavía (ver cota.socialPlaceholders) — los
// íconos quedan sin link, solo como indicador visual de qué redes se van a
// sumar, con el mismo "Próximamente" que antes tenía el texto plano.
const SOCIAL_ICONS: Record<string, (props: { className?: string }) => ReactElement> = {
  Instagram: InstagramIcon,
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
