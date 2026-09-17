import { lazy, Suspense, useState } from "react"
import { ShieldCheck } from "lucide-react"
import Reveal3D from "./Reveal3D"
import Canvas3DErrorBoundary from "./Canvas3DErrorBoundary"

const SafetyGlobe3D = lazy(() => import("./SafetyGlobe3D"))

function GlobeFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center px-8">
      <div className="h-24 w-24 rounded-full border-2 border-amber-500/50 flex items-center justify-center">
        <ShieldCheck size={40} className="text-amber-400" aria-hidden="true" />
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-500 max-w-[220px]">
        One consistent QHSE standard, nationwide
      </p>
    </div>
  )
}

export default function SafetyNetwork() {
  const [globeFailed, setGlobeFailed] = useState(false)

  return (
    <section className="relative bg-navy-950 text-white py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 sm:px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal3D>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 mb-4">
            Nationwide Coverage
          </p>
          <h2 className="font-display text-4xl md:text-5xl 2xl:text-6xl uppercase leading-tight mb-6">
            One safety network,
            <br />
            deployed anywhere
            <br />
            you operate
          </h2>
          <p className="text-steel-200 text-lg leading-relaxed max-w-lg mb-8">
            From oil & gas terminals to manufacturing floors, hospitals and
            construction sites — Rholuck fields consultants, trainers and
            certified equipment across Nigeria's every region, built on one
            consistent QHSE standard.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md">
            {[
              { value: "36", label: "States Covered", back: "Every state HQ reachable within 48hrs" },
              { value: "6", label: "Industry Sectors", back: "Oil & gas, power, manufacturing, health, telecoms, construction" },
              { value: "50+", label: "Training Courses", back: "In-plant, online or scheduled cohorts" },
              { value: "2010", label: "Operating Since", back: "15+ years of continuous QHSE practice" },
            ].map((stat) => (
              <div key={stat.label} className="group h-28 sm:h-24" style={{ perspective: 800 }}>
                <div
                  className="relative w-full h-full transition-transform duration-500 motion-reduce:transition-none"
                  style={{ transformStyle: "preserve-3d" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "rotateY(180deg)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "rotateY(0deg)"
                  }}
                >
                  <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
                    <p className="font-display text-2xl sm:text-3xl text-amber-400">{stat.value}</p>
                    <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-steel-400 mt-1">
                      {stat.label}
                    </p>
                  </div>
                  <div
                    className="absolute inset-0 flex items-center"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <p className="text-[11px] sm:text-xs text-steel-200 leading-snug">{stat.back}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </Reveal3D>

        <div className="relative">
          <div className="aspect-square w-full max-w-lg mx-auto">
            <Canvas3DErrorBoundary fallback={<GlobeFallback />}>
              {globeFailed ? (
                <GlobeFallback />
              ) : (
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="h-40 w-40 rounded-full border-2 border-amber-500/40 motion-safe:animate-pulse" />
                    </div>
                  }
                >
                  <SafetyGlobe3D className="w-full h-full" onError={() => setGlobeFailed(true)} />
                </Suspense>
              )}
            </Canvas3DErrorBoundary>
          </div>
          {!globeFailed && (
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-steel-500 -mt-4">
              Drag to rotate
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
