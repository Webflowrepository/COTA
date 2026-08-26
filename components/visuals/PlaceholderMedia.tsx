/**
 * Marcador de foto/video real — reemplaza toda la capa de arte generativo.
 * Preserva la composición exacta (tamaño, encuadre, posición) que va a ocupar
 * el asset real de COTA. Esquinas rectas, sin decoración — como en la
 * referencia. La etiqueta de la esquina indica qué asset conseguir.
 */
export default function PlaceholderMedia({
  tone = "dark",
  label,
  className = "",
}: {
  tone?: "dark" | "light";
  label: string;
  className?: string;
}) {
  const bg = tone === "dark" ? "#111318" : "#c7c4ba";
  const labelColor = tone === "dark" ? "text-paper/60" : "text-ink/55";

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ background: bg }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            tone === "dark"
              ? "linear-gradient(155deg, rgba(255,255,255,0.05) 0%, transparent 55%)"
              : "linear-gradient(155deg, rgba(255,255,255,0.15) 0%, transparent 55%)",
        }}
      />
      <span className={`placeholder-tag absolute bottom-3 left-3 ${labelColor}`}>{label}</span>
    </div>
  );
}
