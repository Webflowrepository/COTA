export default function LiquidChemical({
  className = "",
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden bg-ink-deep ${className}`}>
      <div
        className="animate-liquid-drift absolute -inset-[15%]"
        style={{ filter: "url(#liquid-warp)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(38% 45% at 30% 35%, rgba(84,104,214,0.32) 0%, rgba(84,104,214,0.06) 35%, transparent 60%), radial-gradient(45% 50% at 75% 65%, rgba(46,61,150,0.28) 0%, transparent 55%), #060811",
            opacity: intensity,
          }}
        />
      </div>
      <div
        className="animate-liquid-drift absolute -inset-[15%]"
        style={{ filter: "url(#liquid-warp-soft)", animationDelay: "-6s", animationDuration: "24s" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(30% 35% at 65% 25%, rgba(250,250,248,0.10) 0%, transparent 55%)",
          }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
