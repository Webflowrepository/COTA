import { cota } from "@/lib/content/cota";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contacto" className="relative flex min-h-[100svh] w-full flex-col justify-center bg-paper py-20 text-ink md:py-28">
      <div className="container-industrial">
        <span className="font-label mb-8 block text-ink/50">Contacto</span>
        <h2 className="text-display max-w-3xl text-ink">Hablemos de su próxima operación industrial.</h2>

        <a
          href={`mailto:${cota.contact.email}`}
          className="mt-10 inline-block border-b-2 border-ink text-2xl text-ink transition-opacity hover:opacity-60 md:text-3xl"
        >
          {cota.contact.email}
        </a>
        <p className="font-label mt-3 text-ink/50">
          {cota.contact.phone} — {cota.offices.commercial}
        </p>

        <ContactForm />
      </div>
    </section>
  );
}
