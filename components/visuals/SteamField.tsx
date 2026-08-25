export default function SteamField({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="animate-steam-drift absolute left-[10%] top-[20%] h-[60%] w-[45%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(244,242,236,0.5) 0%, transparent 70%)" }}
      />
      <div
        className="animate-steam-drift absolute right-[5%] top-[35%] h-[50%] w-[40%] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(244,242,236,0.35) 0%, transparent 70%)",
          animationDelay: "-5s",
          animationDuration: "16s",
        }}
      />
    </div>
  );
}
