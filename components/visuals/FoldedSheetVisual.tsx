import FiberField from "./FiberField";

export default function FoldedSheetVisual({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-0 translate-x-[6%] translate-y-[4%] rotate-[4deg] rounded-sm bg-paper-dim shadow-2xl"
        style={{ boxShadow: "0 30px 60px rgba(0,0,0,0.35)" }}
      />
      <div
        className="absolute inset-0 translate-x-[3%] translate-y-[2%] rotate-[-2deg] rounded-sm bg-paper-dim shadow-2xl"
        style={{ boxShadow: "0 24px 48px rgba(0,0,0,0.3)" }}
      />
      <div className="relative overflow-hidden rounded-sm shadow-2xl" style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.4)" }}>
        <FiberField tone="paper" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(120deg, transparent 55%, rgba(0,0,0,0.08) 100%)" }}
        />
      </div>
    </div>
  );
}
