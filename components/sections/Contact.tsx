import { cota } from "@/lib/content/cota";
import { WhatsAppIcon, InstagramIcon, MailIcon } from "@/components/ui/SocialIcons";

const INFO_ROWS = [
  { label: "Cel.", value: cota.contact.phone },
  { label: "Planta", value: `${cota.plant.location} (${cota.plant.postalCode}), ${cota.country}` },
  { label: "Oficina", value: cota.offices.commercial },
];

// El formulario se sacó a pedido explícito del cliente ("me espanta a la
// gente, es como que te abstrae") — se reemplazó por mail + 3 íconos
// grandes (WhatsApp/Instagram/mail), más directo. Se pierde la
// segmentación por categoría/volumen que tenía el formulario viejo
// (ContactForm.tsx queda sin usar en el repo, no se borró por si se
// quiere volver atrás).
const CHANNELS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: cota.whatsapp.number ? `https://wa.me/${cota.whatsapp.number}` : null,
    Icon: WhatsAppIcon,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: cota.social.find((s) => s.name === "Instagram")?.href ?? null,
    Icon: InstagramIcon,
  },
  {
    id: "mail",
    label: "Mail",
    href: `mailto:${cota.contact.email}`,
    Icon: MailIcon,
  },
];

export default function Contact() {
  return (
    <section id="contacto" className="section-py-lg relative w-full bg-paper text-ink">
      <div className="container-industrial">
        <span className="font-label mb-8 block text-ink/50">Contacto</span>

        <div className="grid grid-cols-1 gap-x-16 gap-y-12 border-t border-line-on-light pt-10 md:grid-cols-12 md:pt-12">
          <div className="md:col-span-6">
            <h2 className="text-display max-w-md text-ink">Hablemos de su próxima operación industrial.</h2>

            <a
              href={`mailto:${cota.contact.email}`}
              className="mt-8 inline-block border-b-2 border-ink text-xl text-ink transition-opacity hover:opacity-60 md:text-2xl"
            >
              {cota.contact.email}
            </a>

            <div className="mt-7 flex items-center gap-4">
              {CHANNELS.map(({ id, label, href, Icon }) => (
                <a
                  key={id}
                  href={href ?? undefined}
                  target={href ? "_blank" : undefined}
                  rel={href ? "noopener noreferrer" : undefined}
                  aria-disabled={!href}
                  title={href ? label : `${label} — próximamente`}
                  className={`flex h-14 w-14 items-center justify-center border border-line-on-light text-ink transition-colors ${
                    href ? "hover:border-ink hover:bg-ink hover:text-paper" : "cursor-default text-ink/30"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>

            <dl className="mt-8 flex flex-col gap-3 border-t border-line-on-light pt-6">
              {INFO_ROWS.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-6">
                  <dt className="font-label shrink-0 text-ink/40">{row.label}</dt>
                  <dd className="font-label text-right text-ink/60">{row.value}</dd>
                </div>
              ))}
            </dl>

            {/* Horario de atención — no confirmado por COTA todavía, no se
                inventa un rango. Sumar acá cuando esté confirmado. */}
          </div>

          <div className="md:col-span-6">
            <div className="h-72 w-full overflow-hidden border border-line-on-light grayscale transition-[filter] duration-500 hover:grayscale-0 md:h-full md:min-h-[22rem]">
              <iframe
                title={`Ubicación de la planta de COTA en ${cota.plant.location}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(`${cota.plant.location}, ${cota.country}`)}&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
