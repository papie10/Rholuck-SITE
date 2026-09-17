import { stats } from "../data/content"
import Tilt3D from "./Tilt3D"
import Reveal3D from "./Reveal3D"

export default function About() {
  return (
    <section className="bg-paper-50 py-24">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-[0.4fr_0.6fr] gap-16">
          <Reveal3D>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-600 mb-4">The Company</p>
            <h2 className="font-display text-4xl md:text-5xl 2xl:text-6xl uppercase leading-tight text-navy-900">
              Incorporated 2010.
              <br />
              Working nationwide.
            </h2>
          </Reveal3D>
          <Reveal3D delay={0.1} axis="y">
            <div className="space-y-5 text-steel-600 text-lg leading-relaxed">
              <p>
                Rholuck Services Nigeria Ltd was incorporated in Lagos in August 2010 as an
                indigenous Occupational Health, Environmental and Quality training and
                manpower development consultancy. Our team holds membership across the
                American Society of Safety Engineers, the Institute of Safety Professionals
                of Nigeria, the Institute of Chartered Chemists of Nigeria and the Chemical
                Society of Nigeria.
              </p>
              <p>
                We are an accredited environmental consultant for Environmental Impact
                Assessment, Environmental Assessment and Environmental Audit &amp; Report
                preparation — recognised by Nigeria's Federal Ministry of Environment and
                state environmental protection agencies. Our clients' joy is our pride, and
                we hold every engagement to one standard: do it right, first time.
              </p>
            </div>
          </Reveal3D>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-steel-200">
          {stats.map((s, i) => (
            <Reveal3D key={s.label} delay={i * 0.06}>
              <Tilt3D intensity={6}>
                <div className="bg-paper-50 p-6 sm:p-8 h-full">
                  <p className="font-display text-4xl sm:text-5xl text-navy-900" style={{ transform: "translateZ(20px)" }}>
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm text-steel-600">{s.label}</p>
                </div>
              </Tilt3D>
            </Reveal3D>
          ))}
        </div>
      </div>
    </section>
  )
}
