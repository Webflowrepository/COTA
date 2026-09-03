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
  objectPosition,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  /** Valor CSS de object-position (ej. "top", "50% 20%") — para fotos con
   * gente/sujeto cerca del borde superior, donde el recorte centrado
   * default de object-cover corta cabezas en filas cortas y anchas
   * (ver WhatCotaDoes: Papel Tissue y Soluciones Industriales). */
  objectPosition?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
