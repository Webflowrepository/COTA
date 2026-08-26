import { cota } from "@/lib/content/cota";

export default function Contact() {
  return (
    <section id="contacto" className="relative flex min-h-[80vh] w-full items-center bg-paper text-ink">
      <div className="container-industrial py-28 md:py-32">
        <span className="font-label mb-8 block text-ink/50">Contacto</span>
        <h2 className="text-display max-w-3xl text-ink">Hablemos de su próxima operación industrial.</h2>

        <a
          href={`mailto:${cota.contact.email}`}
          className="mt-10 inline-block border-b-2 border-blue text-2xl text-ink transition-colors hover:text-blue md:text-3xl"
        >
          {cota.contact.email}
        </a>
        <p className="font-label mt-3 text-ink/50">{cota.contact.phone}</p>

        <div className="mt-16 border-t border-line-on-light pt-8">
          <span className="font-label mb-5 block text-ink/40">¿Por dónde empezamos?</span>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {cota.contactCategories.map((cat) => (
              <a
                key={cat.id}
                href={`mailto:${cota.contact.email}?subject=${encodeURIComponent(`Consulta — ${cat.label}`)}`}
                className="font-label text-ink/70 underline decoration-line-on-light underline-offset-4 transition-colors hover:text-blue hover:decoration-blue"
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
