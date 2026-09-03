import Image from "next/image";
import { cota } from "@/lib/content/cota";

// Instagram ya vive en Contact.tsx y en InstagramFeed.tsx (con la grilla
// de posts reales) — repetirlo acá también quedaba de más, se sacó.
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

        <span className="font-label text-paper/45">
          © {new Date().getFullYear()} {cota.legalName} — {cota.country}
        </span>
      </div>
    </footer>
  );
}
