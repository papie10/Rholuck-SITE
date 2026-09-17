import { useEffect, useState, lazy, Suspense } from "react"
import RotatingBadge from "./RotatingBadge"
import Tilt3D from "./Tilt3D"
import Canvas3DErrorBoundary from "./Canvas3DErrorBoundary"

const ParticleField3D = lazy(() => import("./ParticleField3D"))

// Incorporation date per company profile: 6 August 2010
const INCORPORATION = new Date("2010-08-06T00:00:00Z")

function daysSince() {
  return Math.floor((Date.now() - INCORPORATION.getTime()) / 86400000)
}

export default function Hero() {
  const [days, setDays] = useState(daysSince())

  useEffect(() => {
    const id = setInterval(() => setDays(daysSince()), 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="top" className="relative bg-navy-950 text-white overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* live 3D particle network backdrop — the ambient grid texture below
          already provides a complete background on its own, so if this
          fails or WebGL is unavailable we simply render nothing extra */}
      <Canvas3DErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <ParticleField3D fixed={false} />
        </Suspense>
      </Canvas3DErrorBoundary>
      {/* ambient grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-24 right-8 lg:right-16">
        <RotatingBadge size={150} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 sm:px-6 lg:px-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 mb-6">
            RC 904885 &nbsp;·&nbsp; Lagos, Nigeria &nbsp;·&nbsp; Est. 2010
          </p>
          <h1 className="font-display text-[clamp(2.25rem,9vw,3.75rem)] leading-[0.95] sm:text-6xl md:text-7xl xl:text-[5.5rem] uppercase tracking-tight break-words">
            Good safety
            <br />
            systems
            <br />
            <span className="text-amber-500">=</span>&nbsp;good business<span className="text-amber-500">.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-steel-200 leading-relaxed">
            Rholuck Services Nigeria Ltd is an accredited Quality, Health, Safety
            &amp; Environmental consultancy — delivering environmental audits,
            HSE training and fire safety systems to Nigeria's oil &amp; gas,
            power, manufacturing and construction sectors.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center rounded-sm bg-amber-500 px-6 py-3.5 font-semibold text-navy-950 hover:bg-amber-400 transition-colors"
            >
              Request a Consultation
            </a>
            <a
              href="#training"
              className="inline-flex items-center rounded-sm border border-white/25 px-6 py-3.5 font-semibold text-white hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              View Training Calendar
            </a>
          </div>
        </div>

        {/* Signature element: industrial site safety placard */}
        <div className="relative">
          <Tilt3D intensity={6}>
            <div className="border-4 border-amber-500 bg-navy-900 p-6 sm:p-8 shadow-[10px_10px_0_0_rgba(232,163,61,0.15)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-steel-400">
                Site Safety Record
              </p>
              <p className="font-display text-4xl sm:text-5xl mt-2 text-amber-400 font-tabular">
                {days.toLocaleString()}
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel-200 mt-1">
                days delivering QHSE consultancy
              </p>
              <div className="hazard-rule h-2 my-6" />
              <dl className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
                <div>
                  <dt className="font-mono text-[10px] uppercase text-steel-400 tracking-widest">Target</dt>
                  <dd className="font-semibold text-white">Zero Fatalities</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase text-steel-400 tracking-widest">Standard</dt>
                  <dd className="font-semibold text-white">"Do It Right First Time"</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase text-steel-400 tracking-widest">Accreditations</dt>
                  <dd className="font-semibold text-white">FMEnv · NESREA · DPR</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase text-steel-400 tracking-widest">Coverage</dt>
                  <dd className="font-semibold text-white">Nationwide, Nigeria</dd>
                </div>
              </dl>
            </div>
          </Tilt3D>
        </div>
      </div>
    </section>
  )
}
