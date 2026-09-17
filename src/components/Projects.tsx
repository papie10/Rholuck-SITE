import { projects } from "../data/content"
import Tilt3D from "./Tilt3D"
import Reveal3D from "./Reveal3D"

export default function Projects() {
  return (
    <section id="projects" className="bg-navy-950 text-white py-24">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <Reveal3D>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 mb-4">
          Executed Projects
        </p>
        <h2 className="font-display text-4xl md:text-5xl 2xl:text-6xl uppercase leading-tight mb-14">
          Track record across
          <br />
          power, pharma &amp; oil and gas
        </h2>
        </Reveal3D>

        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {projects.map((p) => (
            <Tilt3D key={p.client + p.desc} intensity={3}>
              <div className="grid lg:grid-cols-[1fr_2fr_auto_auto] gap-2 lg:gap-6 py-6 lg:items-center">
                <span className="font-display text-lg uppercase tracking-wide">{p.client}</span>
                <span className="text-steel-200 text-sm md:text-base">{p.desc}</span>
                <span className="font-mono text-xs text-amber-400">{p.year}</span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 border justify-self-start lg:justify-self-end ${
                    p.status === "Completed"
                      ? "border-steel-400/40 text-steel-200"
                      : "border-amber-400 text-amber-400"
                  }`}
                >
                  {p.status}
                </span>
              </div>
            </Tilt3D>
          ))}
        </div>
      </div>
    </section>
  )
}
