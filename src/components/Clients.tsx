import { useEffect, useState } from "react"
import { clients } from "../data/content"
import Reveal3D from "./Reveal3D"

// Auto-load any logo files dropped into src/assets/clients/ (see README.md there).
// Matched by kebab-case slug of the client name; falls back to a text wordmark if absent.
const logoFiles = import.meta.glob("../assets/clients/*.{png,svg,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

const logoBySlug: Record<string, string> = {}
for (const path in logoFiles) {
  const filename = path.split("/").pop() ?? ""
  const slug = filename.replace(/\.[a-z]+$/i, "")
  logoBySlug[slug] = logoFiles[path]
}

export default function Clients() {
  const withLogos = clients.map((c) => ({ ...c, logo: c.logo ?? logoBySlug[slugify(c.name)] }))
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const marqueeItems = reduceMotion ? withLogos : [...withLogos, ...withLogos]

  return (
    <section id="clients" className="bg-paper-50 py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 sm:px-6 lg:px-10 mb-12">
        <Reveal3D>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-600 mb-4">Trusted By</p>
        <h2 className="font-display text-4xl md:text-5xl 2xl:text-6xl uppercase leading-tight text-navy-900">
          Clients across every
          <br />
          major industrial sector
        </h2>
        </Reveal3D>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper-50 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper-50 to-transparent z-10" />
        <div className="flex gap-4 whitespace-nowrap animate-[marquee_44s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:whitespace-normal motion-reduce:justify-center">
          {marqueeItems.map((c, i) =>
            c.logo ? (
              <div
                key={c.name + i}
                className="shrink-0 h-16 w-40 flex items-center justify-center bg-white border border-steel-200 px-5 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
              >
                <img src={c.logo} alt={c.name} className="max-h-8 max-w-full object-contain" />
              </div>
            ) : (
              <div
                key={c.name + i}
                className="shrink-0 h-16 flex items-center px-6 bg-white border border-steel-200"
              >
                <span className="font-display text-lg md:text-xl uppercase text-steel-500 tracking-wide">
                  {c.name}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
