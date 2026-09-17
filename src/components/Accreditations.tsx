import { useEffect, useRef, useState } from "react"
import { ShieldCheck, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { accreditations, memberships, type Accreditation } from "../data/accreditations"
import Tilt3D from "./Tilt3D"
import Reveal3D from "./Reveal3D"

export default function Accreditations() {
  const [active, setActive] = useState<Accreditation | null>(null)
  const [docIndex, setDocIndex] = useState(0)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const openDoc = (a: Accreditation, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget
    setActive(a)
    setDocIndex(0)
  }

  const closeDoc = () => setActive(null)

  const docs = active ? [{ label: "Certificate", image: active.image }, ...(active.extraDocs ?? [])] : []

  // Modal behavior: lock scroll, move focus in, trap Tab, close on Escape,
  // and return focus to whichever badge opened it.
  useEffect(() => {
    if (!active) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeBtnRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        closeDoc()
        return
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      triggerRef.current?.focus()
    }
  }, [active])

  return (
    <section className="bg-paper-50 py-24">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <Reveal3D>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-600 mb-4">
            Regulatory Standing
          </p>
          <h2 className="font-display text-4xl md:text-5xl 2xl:text-6xl uppercase leading-tight text-navy-900 mb-4">
            Accredited nationwide,
            <br />
            certificate by certificate
          </h2>
          <p className="text-steel-600 text-lg max-w-2xl mb-12">
            Rholuck holds active accreditation from the Federal Ministry of Environment, NESREA
            and {accreditations.length - 2} state environmental agencies. Tap any badge to view
            the scanned certificate.
          </p>
        </Reveal3D>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {accreditations.map((a, i) => (
            <Reveal3D key={a.code} delay={i * 0.04}>
              <Tilt3D intensity={10}>
                <button
                  type="button"
                  onClick={(e) => openDoc(a, e)}
                  aria-haspopup="dialog"
                  className="group w-full h-full text-left border border-steel-200 bg-white p-5 hover:border-amber-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600 focus-visible:outline-offset-2"
                  style={{ transform: "translateZ(12px)" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-11 w-11 rounded-full bg-navy-950 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-navy-950 transition-colors">
                      <ShieldCheck size={20} aria-hidden="true" />
                    </div>
                    <ExternalLink
                      size={15}
                      aria-hidden="true"
                      className="text-steel-300 group-hover:text-amber-600 transition-colors"
                    />
                  </div>
                  <p className="font-display text-lg text-navy-900 leading-tight mb-1">{a.code}</p>
                  <p className="text-xs text-steel-500 leading-snug mb-2">{a.jurisdiction}</p>
                  {a.expiry && (
                    <p className="font-mono text-[10px] uppercase tracking-widest text-steel-400">
                      Valid to {a.expiry}
                    </p>
                  )}
                </button>
              </Tilt3D>
            </Reveal3D>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-steel-400">
            Also recognised by
          </p>
          {memberships.map((m) => (
            <span key={m} className="font-display text-lg text-navy-700 tracking-wide">
              {m}
            </span>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[70] bg-navy-950/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={closeDoc}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="accreditation-dialog-title"
            className="relative max-w-2xl w-full bg-white max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-navy-950 text-white px-5 py-4 flex items-center justify-between">
              <div>
                <p id="accreditation-dialog-title" className="font-display text-lg leading-tight">
                  {active.name}
                </p>
                <p className="text-xs text-steel-300">
                  {docs[docIndex].label}
                  {active.certNo ? ` · No. ${active.certNo}` : ""}
                </p>
              </div>
              <button
                ref={closeBtnRef}
                onClick={closeDoc}
                aria-label="Close certificate viewer"
                className="flex items-center justify-center h-11 w-11 -m-2 text-steel-300 hover:text-amber-400 transition-colors shrink-0 ml-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400 rounded-full"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <img src={docs[docIndex].image} alt={`${active.name} ${docs[docIndex].label}`} className="w-full" />

            {docs.length > 1 && (
              <div className="sticky bottom-0 bg-white border-t border-steel-200 px-5 py-3 flex items-center justify-between">
                <button
                  onClick={() => setDocIndex((i) => (i - 1 + docs.length) % docs.length)}
                  className="flex items-center gap-1 text-sm text-navy-900 hover:text-amber-600 min-h-[44px] px-2 -mx-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600 rounded-sm"
                >
                  <ChevronLeft size={16} aria-hidden="true" /> Prev
                </button>
                <span className="font-mono text-xs text-steel-400" aria-live="polite">
                  {docIndex + 1} / {docs.length}
                </span>
                <button
                  onClick={() => setDocIndex((i) => (i + 1) % docs.length)}
                  className="flex items-center gap-1 text-sm text-navy-900 hover:text-amber-600 min-h-[44px] px-2 -mx-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600 rounded-sm"
                >
                  Next <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
