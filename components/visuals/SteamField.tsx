export default function SteamField({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const color = tone === "light" ? "11,14,26" : "250,250,248";

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="animate-steam-drift absolute left-[10%] top-[20%] h-[60%] w-[45%] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, rgba(${color},0.18) 0%, transparent 70%)` }}
      />
      <div
        className="animate-steam-drift absolute right-[5%] top-[35%] h-[50%] w-[40%] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(${color},0.13) 0%, transparent 70%)`,
          animationDelay: "-5s",
          animationDuration: "16s",
        }}
      />
    </div>
  );
}
