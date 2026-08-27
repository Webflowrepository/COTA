import Image from "next/image";
import { cota } from "@/lib/content/cota";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-ink-deep text-paper">
      <div className="absolute inset-0">
        <Image
          src="/photos/footer-planta-cenital.png"
          alt="Planta de COTA — vista cenital"
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

        <div className="font-label flex gap-5 text-paper/45">
          {cota.socialPlaceholders.map((s) => (
            <span key={s} title="Próximamente">
              {s}
            </span>
          ))}
        </div>

        <span className="font-label text-paper/45">
          © {new Date().getFullYear()} {cota.legalName} — {cota.country}
        </span>
      </div>
    </footer>
  );
}
