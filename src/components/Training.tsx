import { useMemo, useState } from "react"
import { Search, Calendar, ChevronDown, Laptop } from "lucide-react"
import { courses } from "../data/content"
import { schedule2026 } from "../data/schedule2026"
import { useEnquiry, type DeliveryMode } from "../context/EnquiryContext"
import Reveal3D from "./Reveal3D"

export default function Training() {
  const [query, setQuery] = useState("")
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { setEnquiry } = useEnquiry()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return courses.map((c, i) => ({ ...c, index: i }))
    return courses
      .map((c, i) => ({ ...c, index: i }))
      .filter((c) => c.title.toLowerCase().includes(q) || c.audience.toLowerCase().includes(q))
  }, [query])

  const handleEnroll = (title: string, mode: DeliveryMode = "") => {
    setEnquiry("training", title, mode)
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="training" className="bg-paper-50 py-24">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <Reveal3D>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-600 mb-4">
              Training Programmes
            </p>
            <h2 className="font-display text-4xl md:text-5xl 2xl:text-6xl uppercase leading-tight text-navy-900">
              50+ courses, in-plant
              <br />
              or at your convenience
            </h2>
          </div>
          <p className="max-w-md text-steel-600">
            Run as customised in-plant training, scheduled weekend cohorts, or online.
            Click any course to see its scheduled 2026 dates.
          </p>
        </div>
        </Reveal3D>

        <div className="mb-8 flex items-start gap-3 rounded-sm border border-amber-200 bg-amber-50 px-5 py-4">
          <Laptop size={20} className="shrink-0 text-amber-600 mt-0.5" />
          <p className="text-sm text-navy-900">
            <span className="font-semibold">We now run online trainings too.</span> Any course below
            can be requested as a live online class or in-person — just pick your preferred format
            when you enroll.
          </p>
        </div>

        <div className="relative mb-6 max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-steel-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses — e.g. fire, HAZOP, first aid"
            className="w-full rounded-sm border border-steel-200 bg-white py-3 pl-11 pr-4 text-sm text-navy-900 placeholder:text-steel-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="border border-steel-200 bg-white overflow-hidden">
          <div className="hidden lg:grid grid-cols-[1fr_200px_80px_110px_100px_40px] gap-4 px-6 py-3 border-b border-steel-200 bg-navy-900 text-white font-mono text-[11px] uppercase tracking-widest">
            <span>Course</span>
            <span>Target Audience</span>
            <span>Duration</span>
            <span>Fee (₦)</span>
            <span className="text-right">Enroll</span>
            <span />
          </div>
          <div className="max-h-[600px] overflow-y-auto divide-y divide-steel-200">
            {filtered.map((c) => {
              const isOpen = openIndex === c.index
              const dates = schedule2026[c.index] ?? []
              const runsAllYear = dates.some((d) => d.dates.includes("THROUGHOUT"))
              return (
                <div key={c.title}>
                  <div className="grid lg:grid-cols-[1fr_200px_80px_110px_100px_40px] gap-2 lg:gap-3 px-6 py-4 hover:bg-paper-100 transition-colors lg:items-center">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : c.index)}
                      aria-expanded={isOpen}
                      aria-controls={`course-panel-${c.index}`}
                      className="text-left font-medium text-navy-900 hover:text-amber-600 transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600 focus-visible:outline-offset-2"
                    >
                      {c.title}
                    </button>
                    <span className="text-sm text-steel-600">{c.audience}</span>
                    <span className="text-sm font-mono text-steel-600">
                      {c.days} {c.days === 1 ? "day" : "days"}
                    </span>
                    <span className="text-sm font-mono font-semibold text-navy-700">
                      {c.fee.toLocaleString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleEnroll(c.title)}
                      aria-label={`Enroll in ${c.title}`}
                      className="justify-self-start lg:justify-self-end inline-flex min-h-[44px] lg:min-h-0 items-center rounded-sm border border-amber-500 px-3 py-2.5 lg:py-1.5 text-xs font-semibold text-amber-600 hover:bg-amber-500 hover:text-navy-950 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600 focus-visible:outline-offset-2"
                    >
                      Enroll
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : c.index)}
                      aria-expanded={isOpen}
                      aria-controls={`course-panel-${c.index}`}
                      aria-label={`Toggle ${c.title} schedule`}
                      className="justify-self-end p-2.5 -m-2.5 text-steel-400 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600"
                    >
                      <ChevronDown
                        size={18}
                        aria-hidden="true"
                        className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  {isOpen && (
                    <div
                      id={`course-panel-${c.index}`}
                      role="region"
                      aria-label={`${c.title} schedule and enrollment`}
                      className="bg-navy-950 px-6 py-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar size={16} className="text-amber-400" aria-hidden="true" />
                        <span className="font-mono text-xs uppercase tracking-widest text-amber-400">
                          2026 Schedule — {c.title}
                        </span>
                      </div>

                      {runsAllYear ? (
                        <p className="text-steel-200 text-sm mb-5">
                          This course runs continuously throughout the year — enquire for your
                          preferred start date.
                        </p>
                      ) : dates.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-5">
                          {dates.map((d) => (
                            <div
                              key={d.month}
                              className="rounded-sm border border-navy-700 bg-navy-900 px-3 py-2.5 text-center"
                            >
                              <p className="font-mono text-[10px] uppercase tracking-widest text-amber-400 mb-1">
                                {d.month}
                              </p>
                              <p className="text-sm text-white font-medium">{d.dates}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-steel-200 text-sm mb-5">
                          Dates for this course are scheduled on request — enquire for the next
                          available cohort.
                        </p>
                      )}

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => handleEnroll(c.title, "in-person")}
                          className="rounded-sm bg-white px-4 py-2.5 text-xs font-semibold text-navy-950 hover:bg-amber-500 transition-colors min-h-[44px]"
                        >
                          Enroll — In-person
                        </button>
                        <button
                          onClick={() => handleEnroll(c.title, "online")}
                          className="rounded-sm border border-white/40 px-4 py-2.5 text-xs font-semibold text-white hover:border-amber-400 hover:text-amber-400 transition-colors min-h-[44px]"
                        >
                          Enroll — Online
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
            {filtered.length === 0 && (
              <p className="px-6 py-10 text-center text-steel-400 text-sm">
                No courses match "{query}". Every course can be customised on request —
                get in touch below.
              </p>
            )}
          </div>
        </div>

        <p className="mt-6 text-sm text-steel-500">
          Courses run throughout the year as customised in-plant, online or scheduled weekend
          cohorts. Prefer email? Send course title, format, location, participant count and
          organisation details to{" "}
          <a href="mailto:info@rholuckng.com" className="text-amber-600 font-medium hover:underline">
            info@rholuckng.com
          </a>.
        </p>
      </div>
    </section>
  )
}
