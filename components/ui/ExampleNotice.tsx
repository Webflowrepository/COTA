/**
 * Marca contenido de EJEMPLO en secciones que el cliente pidió maquetar
 * aunque todavía no exista el dato real de COTA (testimonio, certificaciones,
 * logos de clientes, sostenibilidad — ver ASSETS.md). A diferencia de
 * PlaceholderMedia (una foto que falta), acá lo que falta es el dato/texto
 * en sí, así que la marca tiene que ser imposible de confundir con contenido
 * real aunque el copy alrededor suene creíble. Hereda el color del texto
 * padre (text-ink en fondo claro, text-paper en fondo oscuro) vía currentColor.
 */
export default function ExampleNotice({
  text = "Ejemplo — contenido de muestra, pendiente de dato real de COTA",
}: {
  text?: string;
}) {
  return (
    <div className="mb-6 inline-flex items-center gap-2 border border-dashed border-current/35 px-3 py-1.5 opacity-70">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden />
      <span className="font-label">{text}</span>
    </div>
  );
}
