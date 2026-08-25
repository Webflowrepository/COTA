type Tone = "ink" | "paper" | "blue" | "green";

const gradients: Record<Tone, string> = {
  ink: "radial-gradient(120% 90% at 20% 0%, #1a2036 0%, #0b0e1a 45%, #060811 100%)",
  paper: "radial-gradient(120% 90% at 80% 0%, #ffffff 0%, #fafaf8 45%, #eeece6 100%)",
  blue: "radial-gradient(120% 90% at 30% 10%, #eef0fa 0%, #dde1f4 55%, #c6cced 100%)",
  green: "radial-gradient(120% 90% at 30% 10%, #eaf5ee 0%, #d7ecdd 55%, #bfe0c9 100%)",
};

export default function MacroSurface({
  tone = "ink",
  className = "",
  grain = true,
}: {
  tone?: Tone;
  className?: string;
  grain?: boolean;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0" style={{ background: gradients[tone] }} />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            tone === "ink"
              ? "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.05) 48%, transparent 65%)"
              : "linear-gradient(115deg, transparent 30%, rgba(11,14,26,0.04) 48%, transparent 65%)",
        }}
      />
      {grain && (
        <div
          className="absolute inset-0"
          style={{ filter: "url(#grain-fine)" }}
        />
      )}
    </div>
  );
}
