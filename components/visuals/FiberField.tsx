export default function FiberField({
  tone = "paper",
  className = "",
  opacity = 0.9,
}: {
  tone?: "paper" | "ink";
  className?: string;
  opacity?: number;
}) {
  const base = tone === "paper" ? "#f4f2ec" : "#0a0a0a";
  const fiber = tone === "paper" ? "#0a0a0a" : "#f4f2ec";

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ background: base }}>
      <div
        className="absolute inset-0"
        style={{
          filter: "url(#fiber-macro)",
          mixBlendMode: tone === "paper" ? "multiply" : "screen",
          opacity,
          background: fiber,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            tone === "paper"
              ? "linear-gradient(160deg, rgba(255,255,255,0.5) 0%, transparent 40%, rgba(0,0,0,0.06) 100%)"
              : "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)",
        }}
      />
    </div>
  );
}
