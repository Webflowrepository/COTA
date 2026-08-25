import { forwardRef } from "react";

const ROLLERS = Array.from({ length: 14 });

const ProductionLineStrip = forwardRef<HTMLDivElement, { className?: string; tone?: "ink" | "paper" }>(
  function ProductionLineStrip({ className = "", tone = "ink" }, ref) {
    const rollerColor = tone === "paper" ? "#0a0a0a" : "#f4f2ec";
    const trackColor = tone === "paper" ? "rgba(10,10,10,0.14)" : "rgba(244,242,236,0.14)";

    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <div ref={ref} className="absolute inset-y-0 left-0 flex w-[200%] items-center gap-16 will-change-transform">
          {[...ROLLERS, ...ROLLERS].map((_, i) => (
            <div key={i} className="relative flex h-full items-center">
              <div className="absolute left-1/2 top-1/2 h-[2px] w-32 -translate-y-1/2" style={{ background: trackColor }} />
              <div
                className="relative h-20 w-20 rounded-full"
                style={{
                  background: `radial-gradient(circle at 32% 28%, ${rollerColor}dd, ${rollerColor}22 60%, transparent 75%)`,
                  boxShadow: `0 0 0 1px ${trackColor}`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
);

export default ProductionLineStrip;
