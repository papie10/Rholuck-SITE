import { valueProps, testimonials } from "../data/content"
import { Quote } from "lucide-react"
import Tilt3D from "./Tilt3D"

export default function WhyUs() {
  return (
    <section className="bg-paper-50 py-24">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-600 mb-4">Why Rholuck</p>
        <h2 className="font-display text-4xl md:text-5xl 2xl:text-6xl uppercase leading-tight text-navy-900 mb-14">
          What clients get from
          <br />
          using our services
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {valueProps.map((v) => (
            <Tilt3D key={v.title} intensity={7}>
              <div className="h-full border-t-2 border-amber-500 pt-5" style={{ transform: "translateZ(10px)" }}>
                <h3 className="font-display text-lg uppercase text-navy-900 mb-2">{v.title}</h3>
                <p className="text-steel-600 text-sm leading-relaxed">{v.detail}</p>
              </div>
            </Tilt3D>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <Tilt3D key={t.quote} intensity={5}>
              <div className="h-full bg-white border border-steel-200 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <Quote size={28} className="text-amber-500 mb-4" style={{ transform: "translateZ(20px)" }} aria-hidden="true" />
                <p className="text-navy-900 text-lg leading-relaxed mb-4" style={{ transform: "translateZ(15px)" }}>
                  "{t.quote}"
                </p>
                <p className="font-mono text-xs uppercase tracking-widest text-steel-400">
                  {t.attribution}
                </p>
              </div>
            </Tilt3D>
          ))}
        </div>
      </div>
    </section>
  )
}
