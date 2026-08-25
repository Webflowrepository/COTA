export default function PaperRollVisual({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex h-full w-full items-start justify-center ${className}`}>
      <div className="relative w-[62%] max-w-[720px]">
        {/* cara circular del rollo — corte transversal de papel enrollado */}
        <div
          className="relative aspect-[10/3] w-full rounded-[50%]"
          style={{
            background:
              "repeating-radial-gradient(circle at 50% 50%, #efece3 0px, #e6e2d6 3px, #f4f2ec 6px, #ddd8c8 9px)",
          }}
        >
          <div
            className="absolute inset-0 rounded-[50%]"
            style={{
              background:
                "radial-gradient(45% 60% at 32% 30%, rgba(255,255,255,0.65) 0%, transparent 55%), radial-gradient(60% 80% at 75% 80%, rgba(10,10,10,0.18) 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 aspect-square w-[16%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 30%, #d9642f, #7a2c0c 75%)",
              boxShadow: "0 0 0 3px rgba(10,10,10,0.15)",
            }}
          />
        </div>

        {/* cuerpo del rollo, extendiéndose fuera de cuadro */}
        <div
          className="relative -mt-[3%] h-[52vh] w-full rounded-b-[6%]"
          style={{
            background:
              "linear-gradient(90deg, #d8d4c6 0%, #f8f6f0 22%, #efece3 50%, #dcd8ca 78%, #c9c5b6 100%)",
          }}
        >
          <div
            className="absolute inset-0 rounded-b-[6%] opacity-40"
            style={{
              background:
                "repeating-linear-gradient(180deg, rgba(10,10,10,0.05) 0px, transparent 2px, transparent 14px)",
            }}
          />
          <div
            className="absolute inset-0 rounded-b-[6%]"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,10,10,0.12) 0%, transparent 15%, transparent 85%, rgba(10,10,10,0.16) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
