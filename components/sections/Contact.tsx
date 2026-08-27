import { cota } from "@/lib/content/cota";
import ContactForm from "./ContactForm";

const INFO_ROWS = [
  { label: "Cel.", value: cota.contact.phone },
  { label: "Planta", value: `${cota.plant.location} (${cota.plant.postalCode}), ${cota.country}` },
  { label: "Oficina", value: cota.offices.commercial },
];

export default function Contact() {
  return (
    <section id="contacto" className="relative w-full bg-paper pb-20 pt-28 text-ink md:pb-28 md:pt-36">
      <div className="container-industrial">
        <span className="font-label mb-8 block text-ink/50">Contacto</span>

        <div className="grid grid-cols-1 gap-x-16 gap-y-12 border-t border-line-on-light pt-10 md:grid-cols-12 md:pt-12">
          <div className="md:col-span-5">
            <h2 className="text-display max-w-md text-ink">Hablemos de su próxima operación industrial.</h2>

            <a
              href={`mailto:${cota.contact.email}`}
              className="mt-8 inline-block border-b-2 border-ink text-xl text-ink transition-opacity hover:opacity-60 md:text-2xl"
            >
              {cota.contact.email}
            </a>

            <dl className="mt-8 flex flex-col gap-3 border-t border-line-on-light pt-6">
              {INFO_ROWS.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-6">
                  <dt className="font-label shrink-0 text-ink/40">{row.label}</dt>
                  <dd className="font-label text-right text-ink/60">{row.value}</dd>
                </div>
              ))}
            </dl>

            {cota.whatsapp.number && (
              <a
                href={`https://wa.me/${cota.whatsapp.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label mt-6 inline-block w-fit border-b border-ink pb-1 text-ink transition-opacity hover:opacity-60"
              >
                Escribir por WhatsApp <span className="cta-arrow">→</span>
              </a>
            )}

            {/* Horario de atención — no confirmado por COTA todavía, no se
                inventa un rango. Sumar acá cuando esté confirmado. */}

            <div className="mt-8 h-56 w-full overflow-hidden border border-line-on-light grayscale transition-[filter] duration-500 hover:grayscale-0">
              <iframe
                title={`Ubicación de la planta de COTA en ${cota.plant.location}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(`${cota.plant.location}, ${cota.country}`)}&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
