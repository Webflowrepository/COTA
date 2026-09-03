import Image from "next/image";
import { cota } from "@/lib/content/cota";

// Instagram ya vive en Contact.tsx y en InstagramFeed.tsx (con la grilla
// de posts reales) — repetirlo acá también quedaba de más, se sacó.
//
// El fondo con naschel-planta-aerea.png se sacó (pasada de "ninguna foto
// se repite") — esa misma foto ya es la pieza central de NaschelPlant.tsx
// (el video de fondo se generó a partir de ella) y ahora también de la
// etapa "Logística" en IndustrialProcess.tsx. El footer vuelve a un fondo
// sólido bg-ink-deep, coherente con el resto del sistema de color oscuro
// del sitio — no necesita una foto propia para funcionar.
export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-ink-deep text-paper">
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
