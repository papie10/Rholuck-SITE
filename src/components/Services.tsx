import { services } from "../data/content"
import { serviceRequestMap } from "../data/serviceRequestMap"
import { useEnquiry } from "../context/EnquiryContext"
import Tilt3D from "./Tilt3D"
import Reveal3D from "./Reveal3D"

export default function Services() {
  const { setEnquiry } = useEnquiry()

  const handleRequest = (title: string) => {
    setEnquiry(serviceRequestMap[title] ?? "other")
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="services" className="bg-navy-950 text-white py-24">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <Reveal3D>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 mb-4">What We Do</p>
              <h2 className="font-display text-4xl md:text-5xl 2xl:text-6xl uppercase leading-tight">
                Consultancy across the
                <br />
                full HSE lifecycle
              </h2>
            </div>
            <p className="max-w-md text-steel-200">
              From regulatory paperwork to the equipment bolted to the wall, we cover
              environmental compliance, workforce training and physical fire &amp; life
              safety systems under one contract.
            </p>
          </div>
        </Reveal3D>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <Reveal3D key={s.title} delay={i * 0.05}>
            <Tilt3D intensity={8}>
              <div className="h-full bg-navy-900/60 border border-white/10 p-8 hover:border-amber-500/50 transition-colors group flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                <p className="font-mono text-xs text-amber-400 mb-6" style={{ transform: "translateZ(20px)" }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="font-display text-xl uppercase mb-3 group-hover:text-amber-400 transition-colors"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {s.title}
                </h3>
                <p className="text-steel-200 text-sm leading-relaxed flex-1" style={{ transform: "translateZ(15px)" }}>
                  {s.detail}
                </p>
                <button
                  onClick={() => handleRequest(s.title)}
                  className="mt-6 self-start text-xs font-mono uppercase tracking-widest text-amber-400 border-b border-amber-400/40 hover:border-amber-400 pb-0.5 transition-colors"
                  style={{ transform: "translateZ(25px)" }}
                >
                  Request this service →
                </button>
              </div>
            </Tilt3D>
            </Reveal3D>
          ))}
        </div>
      </div>
    </section>
  )
}
