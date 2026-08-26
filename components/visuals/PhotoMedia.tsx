import Image from "next/image";

/**
 * Fotografía real (stock con licencia libre, uso comercial) para secciones
 * que representan material genérico — no encuadres específicos de la planta
 * de Naschel ni del proceso real de COTA (esos siguen en PlaceholderMedia).
 */
export default function PhotoMedia({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes="100vw" className="object-cover" />
    </div>
  );
}
