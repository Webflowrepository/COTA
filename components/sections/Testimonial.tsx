import ExampleNotice from "@/components/ui/ExampleNotice";
import PhotoMedia from "@/components/visuals/PhotoMedia";

/**
 * Testimonio pedido en el brief. No hay ningún caso de éxito ni cita real
 * de un cliente de COTA todavía (ver ASSETS.md — ya se había declinado
 * inventar esto una vez). Se maqueta con el texto de ejemplo del brief,
 * marcado sin ambigüedad, para reemplazar por una cita y resultado reales
 * en cuanto el cliente los confirme — nunca publicar esta sección tal cual.
 */
export default function Testimonial() {
  return (
    <section className="relative w-full bg-paper py-24 md:py-32">
      <div className="container-industrial">
        <span className="font-label mb-2 block text-ink/45">Caso de éxito</span>
        <ExampleNotice text="Ejemplo — cita, resultado y autor ficticios, sin confirmar con un cliente real" />

        <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <blockquote className="text-display max-w-xl text-ink">
              “Desde que integramos los blanqueadores ópticos de COTA en nuestra línea, redujimos el consumo de
              reactivo en un 20% y mejoramos la blancura final del papel.”
            </blockquote>
            <p className="font-label mt-6 text-ink/50">Nombre Apellido — Cargo, Empresa (ejemplo)</p>
          </div>
          <div className="relative h-[32vh] overflow-hidden md:col-span-5 md:h-auto">
            <PhotoMedia src="/photos/papel-produccion.jpeg" alt="Línea de producción de bobinas de papel" />
          </div>
        </div>
      </div>
    </section>
  );
}
