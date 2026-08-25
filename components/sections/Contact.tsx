import { cota } from "@/lib/content/cota";

export default function Contact() {
  return (
    <section id="contacto" className="relative flex min-h-[80vh] w-full items-center bg-paper text-ink">
      <div className="container-industrial py-28 md:py-32">
        <span className="font-technical mb-8 block text-[11px] text-ink/50">Contacto</span>
        <h2 className="max-w-3xl text-[11vw] leading-[0.9] text-ink md:text-[6vw]">
          Hablemos de su próxima operación industrial.
        </h2>

        <a
          href={`mailto:${cota.contact.email}`}
          className="mt-10 inline-block border-b-2 border-rust text-2xl text-ink transition-colors hover:text-rust md:text-3xl"
        >
          {cota.contact.email}
        </a>
      </div>
    </section>
  );
}
