import Image from "next/image";
import { cota } from "@/lib/content/cota";

export default function Footer() {
  return (
    <footer className="w-full bg-paper text-ink">
      <div className="container-industrial flex flex-col gap-6 border-t border-line-on-light py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <Image src="/logo-cota.png" alt="COTA" width={327} height={80} className="h-5 w-auto invert" />
          <span className="font-label mt-2 block text-ink/35">
            {cota.offices.commercial} — Planta: {cota.plant.location}
          </span>
        </div>

        <div className="font-label flex gap-5 text-ink/35">
          {cota.socialPlaceholders.map((s) => (
            <span key={s} title="Próximamente">
              {s}
            </span>
          ))}
        </div>

        <span className="font-label text-ink/35">
          © {new Date().getFullYear()} {cota.legalName} — {cota.country}
        </span>
      </div>
    </footer>
  );
}
