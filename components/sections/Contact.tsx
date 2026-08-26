import { cota } from "@/lib/content/cota";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contacto" className="relative flex min-h-[100svh] w-full flex-col bg-paper text-ink">
      <div className="container-industrial flex flex-1 flex-col justify-center py-16 md:py-20">
        <span className="font-label mb-8 block text-ink/50">Contacto</span>
        <h2 className="text-display max-w-3xl text-ink">Hablemos de su próxima operación industrial.</h2>

        <a
          href={`mailto:${cota.contact.email}`}
          className="mt-10 inline-block border-b-2 border-blue text-2xl text-ink transition-colors hover:text-blue md:text-3xl"
        >
          {cota.contact.email}
        </a>
        <p className="font-label mt-3 text-ink/50">{cota.contact.phone}</p>

        <ContactForm />
      </div>

      <div className="container-industrial flex flex-col gap-6 border-t border-line-on-light py-6 md:flex-row md:items-center md:justify-between">
        <span className="text-sm font-medium text-ink">COTA</span>

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
    </section>
  );
}
