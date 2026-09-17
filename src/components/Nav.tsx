import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import BrandMark from "./BrandMark"
import Tilt3D from "./Tilt3D"

const links = [
  { href: "#services", label: "Services" },
  { href: "#training", label: "Training" },
  { href: "#projects", label: "Projects" },
  { href: "#clients", label: "Clients" },
  { href: "#feedback", label: "Feedback" },
  { href: "#contact", label: "Contact" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-navy-950/95 backdrop-blur border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 sm:px-6 lg:px-10 flex items-center justify-between py-4 gap-4">
        <a href="#top" className="flex items-center gap-2 sm:gap-3 group min-w-0">
          <Tilt3D intensity={18}>
            <BrandMark size={34} />
          </Tilt3D>
          <div className="flex flex-col leading-none min-w-0">
            <span className="font-display font-bold text-base sm:text-lg tracking-wide text-white uppercase truncate">
              Rholuck
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.22em] text-amber-400 whitespace-nowrap">
              Services Nigeria Ltd.
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-steel-200 hover:text-amber-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 inline-flex items-center rounded-sm bg-amber-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-amber-400 transition-colors"
          >
            Request a Quote
          </a>
        </nav>

        <button
          className="md:hidden text-white flex items-center justify-center h-11 w-11 -m-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400 rounded-sm"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-navy-950 border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-steel-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex justify-center items-center rounded-sm bg-amber-500 px-4 py-3 text-sm font-semibold text-navy-950"
          >
            Request a Quote
          </a>
        </div>
      )}
    </header>
  )
}
