import { cota } from "@/lib/content/cota";

export default function Footer() {
  return (
    <footer className="border-t border-line-on-light bg-paper-dim px-5 py-10 md:px-12 md:py-14">
      <div className="container-industrial flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-display text-2xl font-extrabold text-ink">COTA</div>
          <p className="mt-2 max-w-xs text-sm text-ink/55">
            Empresa industrial argentina — químicos, papel y soluciones industriales.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {[
            ["Compañía", "#compania"],
            ["Químicos", "#quimicos"],
            ["Papel", "#papel"],
            ["Soluciones", "#soluciones"],
            ["Planta", "#planta"],
            ["Contacto", "#contacto"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="font-technical text-[11px] text-ink/60 hover:text-ink">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <div className="font-technical text-[11px] text-ink/40">
            {cota.contact.email} — {cota.contact.phone}
            <br />© {new Date().getFullYear()} {cota.legalName} — {cota.country}
          </div>
          <div className="font-technical flex gap-4 text-[10px] text-ink/25">
            {cota.socialPlaceholders.map((s) => (
              <span key={s} title="Próximamente">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
