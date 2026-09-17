// A slowly-rotating 3D hexagonal safety badge, built from stacked CSS 3D
// planes. Purely decorative — reinforces the "certified / accredited" motif.
export default function RotatingBadge({ size = 180 }: { size?: number }) {
  return (
    <div
      className="hidden md:block pointer-events-none select-none"
      style={{ width: size, height: size, perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full animate-[spin3d_16s_linear_infinite] motion-reduce:animate-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* front face */}
        <div
          className="absolute inset-0 flex items-center justify-center border-2 border-amber-500/70 bg-navy-900/60 backdrop-blur-sm"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            transform: "translateZ(14px)",
          }}
        >
          <span className="font-display text-amber-400 text-2xl uppercase tracking-tight text-center leading-none px-4">
            QHSE
          </span>
        </div>
        {/* back face */}
        <div
          className="absolute inset-0 flex items-center justify-center border-2 border-steel-400/50 bg-navy-950/80"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            transform: "translateZ(-14px) rotateY(180deg)",
          }}
        >
          <span className="font-mono text-steel-200 text-[10px] uppercase tracking-[0.2em] text-center leading-tight px-4">
            Certified
            <br />
            Since 2010
          </span>
        </div>
        {/* rim, gives the badge visible thickness */}
        <div
          className="absolute inset-0 border border-amber-500/30 bg-amber-500/10"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            transform: "translateZ(0px)",
          }}
        />
      </div>

      <style>{`
        @keyframes spin3d {
          from { transform: rotateY(0deg) rotateX(8deg); }
          to { transform: rotateY(360deg) rotateX(8deg); }
        }
      `}</style>
    </div>
  )
}
