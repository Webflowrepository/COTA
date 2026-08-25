import { cota } from "@/lib/content/cota";

export default function Footer() {
  return (
    <footer className="border-t border-line-on-dark bg-ink px-5 py-10 md:px-12 md:py-14">
      <div className="container-industrial flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-display text-2xl font-extrabold text-paper">COTA</div>
          <p className="mt-2 max-w-xs text-sm text-paper/50">
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
            <a key={href} href={href} className="font-technical text-[11px] text-paper/60 hover:text-paper">
              {label}
            </a>
          ))}
        </nav>

        <div className="font-technical text-[11px] text-paper/40">
          © {new Date().getFullYear()} {cota.name} — {cota.country}
        </div>
      </div>
    </footer>
  );
}
