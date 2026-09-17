import { useEffect, useState } from "react"
import BrandMark from "./BrandMark"
import { socials } from "../data/content"
import { FacebookIcon, LinkedInIcon, XIcon } from "./SocialIcons"
import Tilt3D from "./Tilt3D"
import { ArrowUp } from "lucide-react"

const iconMap = { LinkedIn: LinkedInIcon, Facebook: FacebookIcon, X: XIcon }

export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <footer className="bg-navy-950 text-steel-400 border-t border-white/10 relative">
      <div className="hazard-rule h-1.5" />
      <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-6 lg:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Tilt3D intensity={16}>
            <BrandMark size={28} />
          </Tilt3D>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-lg text-white tracking-wide">RHOLUCK</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400">
              Services Nigeria Ltd
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {socials.map((s) => {
            const Icon = iconMap[s.name as keyof typeof iconMap]
            return (
              <Tilt3D key={s.name} intensity={20}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex items-center justify-center h-11 w-11 -m-2.5 text-steel-400 hover:text-amber-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400 rounded-full"
                >
                  <Icon size={18} />
                </a>
              </Tilt3D>
            )
          })}
        </div>

        <p className="text-xs font-mono text-center sm:text-right">
          RC 904885 &nbsp;·&nbsp; © {new Date().getFullYear()} Rholuck Services Nigeria Ltd.
          <br className="sm:hidden" />
          &nbsp;·&nbsp; Good safety systems = good business.
        </p>
      </div>

      <a
        href="#top"
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <Tilt3D intensity={14}>
          <div className="h-12 w-12 rounded-full bg-amber-500 text-navy-950 flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:bg-amber-400 transition-colors">
            <ArrowUp size={20} />
          </div>
        </Tilt3D>
      </a>
    </footer>
  )
}
