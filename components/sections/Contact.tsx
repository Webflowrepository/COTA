import { cota } from "@/lib/content/cota";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contacto" className="relative flex min-h-[calc(100svh-6rem)] w-full flex-col bg-paper pb-16 pt-28 text-ink md:pb-20 md:pt-32">
      <div className="container-industrial">
        <span className="font-label mb-8 block text-ink/50">Contacto</span>
        <h2 className="text-display max-w-3xl text-ink">Hablemos de su próxima operación industrial.</h2>

        <a
          href={`mailto:${cota.contact.email}`}
          className="mt-10 inline-block border-b-2 border-ink text-2xl text-ink transition-opacity hover:opacity-60 md:text-3xl"
        >
          {cota.contact.email}
        </a>
        <p className="font-label mt-3 text-ink/50">Cel. {cota.contact.phone}</p>
        <p className="font-label mt-1 text-ink/50">
          Planta: {cota.plant.location} ({cota.plant.postalCode}), {cota.country}
        </p>
        <p className="font-label mt-1 text-ink/35">Oficina comercial: {cota.offices.commercial}</p>

        <ContactForm />
      </div>
    </section>
  );
}
