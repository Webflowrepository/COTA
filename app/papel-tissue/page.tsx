import type { Metadata } from "next";
import Link from "next/link";
import { cota } from "@/lib/content/cota";

export const metadata: Metadata = {
  title: "Papel Tissue — Bobinas y productos terminados | COTA",
  description:
    "Bobinas de papel Tissue para convertidores en Argentina — anchos 220/200 cm, diámetros 110/100 cm, cono interior 7,5 cm. Fabricación, marca privada y línea Guardián.",
};

export default function PapelTissuePage() {
  return (
    <main className="flex-1 bg-paper text-ink">
      <div className="container-industrial pt-32 pb-16 md:pt-40 md:pb-20">
        <span className="font-label mb-4 block text-ink/45">Papel Tissue</span>
        <h1 className="text-hero max-w-2xl text-ink">Bobinas para convertidores, a su medida.</h1>
        <p className="mt-6 max-w-lg text-base text-ink/60 md:text-lg">
          {cota.businessLines.find((l) => l.id === "papel")?.short} Producción propia en{" "}
          {cota.plant.location}, con tres formas de trabajar según lo que necesite su operación.
        </p>
      </div>

      {/* Modelos de negocio */}
      <div className="container-industrial pb-20 md:pb-28">
        <span className="font-label mb-8 block text-ink/45">Modelos de negocio</span>
        <div className="grid grid-cols-1 gap-8 divide-y divide-line-on-light md:grid-cols-3 md:gap-10 md:divide-y-0">
          {cota.businessModels.map((model, i) => (
            <div key={model.id} className="pt-8 first:pt-0 md:pt-0">
              <span className="font-label text-ink/40">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-heading mt-2 text-ink">{model.label}</h3>
              <p className="mt-3 text-sm text-ink/60 md:text-base">{model.short}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Especificaciones técnicas */}
      <div className="w-full bg-ink-deep py-20 md:py-28">
        <div className="container-industrial">
          <span className="font-label mb-8 block text-paper/50">Especificaciones técnicas — bobinas</span>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line-on-dark">
                  <th className="font-label py-4 pr-8 font-normal text-paper/50">Medida</th>
                  <th className="font-label py-4 pr-8 font-normal text-paper/50">Valores disponibles</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line-on-dark">
                  <td className="py-5 pr-8 text-paper/70">Ancho</td>
                  <td className="font-impact-number text-2xl text-paper md:text-3xl">
                    {cota.bobinaSpecs.anchos.join(" / ")}
                  </td>
                </tr>
                <tr className="border-b border-line-on-dark">
                  <td className="py-5 pr-8 text-paper/70">Diámetro</td>
                  <td className="font-impact-number text-2xl text-paper md:text-3xl">
                    {cota.bobinaSpecs.diametros.join(" / ")}
                  </td>
                </tr>
                <tr>
                  <td className="py-5 pr-8 text-paper/70">Cono interior</td>
                  <td className="font-impact-number text-2xl text-paper md:text-3xl">
                    {cota.bobinaSpecs.conoInterior}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <a
            href={`mailto:${cota.contact.email}?subject=${encodeURIComponent("Ficha técnica — Bobinas para convertidores")}`}
            className="font-label mt-8 inline-block w-fit border-b border-paper/40 pb-0.5 text-paper transition-colors hover:border-paper"
          >
            Solicitar ficha técnica completa →
          </a>
        </div>
      </div>

      {/* Catálogo de productos terminados */}
      <div className="container-industrial py-20 md:py-28">
        <span className="font-label mb-8 block text-ink/45">Productos terminados</span>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-3">
          {cota.finishedProducts.map((product, i) => (
            <li key={product} className="font-label border-t border-line-on-light py-4 text-ink/70">
              {String(i + 1).padStart(2, "0")} — {product}
            </li>
          ))}
        </ul>
      </div>

      {/* Guardián */}
      <div className="container-industrial pb-20 md:pb-28">
        <div className="border-t border-line-on-light pt-12 md:pt-16">
          <span className="font-label mb-4 block text-ink/45">Línea propia</span>
          <h2 className="text-display max-w-xl text-ink">{cota.guardian.name}</h2>
          <p className="mt-4 max-w-md text-ink/60">
            {cota.guardian.tagline}. Con apoyo a distribuidores en todo el país.
          </p>
        </div>
      </div>

      <div className="container-industrial pb-24 md:pb-32">
        <Link
          href="/contacto"
          className="font-label inline-block w-fit border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60"
        >
          Solicitar cotización de bobinas →
        </Link>
      </div>
    </main>
  );
}
