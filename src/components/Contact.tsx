import { useEffect, useState, type FormEvent } from "react"
import { Mail, MapPin, Phone, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react"
import { courses, socials } from "../data/content"
import { FacebookIcon, LinkedInIcon, XIcon } from "./SocialIcons"
import Reveal3D from "./Reveal3D"
import { useEnquiry, type RequestType, type DeliveryMode } from "../context/EnquiryContext"

const iconMap = { LinkedIn: LinkedInIcon, Facebook: FacebookIcon, X: XIcon }

// Real form submission via Web3Forms (no backend needed on this static site).
// To go live: get a free access key at https://web3forms.com (instant, just
// an email address — no account/login needed), then paste it below. Until
// it's set, the form clearly tells the visitor to use the direct email/phone
// links instead of pretending to submit.
const WEB3FORMS_ACCESS_KEY = "" // e.g. "a1b2c3d4-...-e5f6" — from web3forms.com

const requestOptions: { value: RequestType; label: string }[] = [
  { value: "", label: "Select an option" },
  { value: "environmental", label: "Environmental Consultancy (EIA, EAR, monitoring)" },
  { value: "training", label: "HSE Training Enrollment" },
  { value: "fire-safety", label: "Fire & Life Safety Systems (supply/installation)" },
  { value: "laboratory", label: "Chemical Laboratory Services" },
  { value: "other", label: "Something else" },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type SubmitState = "idle" | "submitting" | "success" | "error"

export default function Contact() {
  const { requestType, course, deliveryMode, setEnquiry } = useEnquiry()
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" })
  const [type, setType] = useState<RequestType>(requestType)
  const [selectedCourse, setSelectedCourse] = useState(course)
  const [mode, setMode] = useState<DeliveryMode>(deliveryMode)
  const [submitState, setSubmitState] = useState<SubmitState>("idle")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  // Sync local dropdown state whenever an Enroll / Request button elsewhere sets the shared enquiry
  useEffect(() => {
    setType(requestType)
    setSelectedCourse(course)
    setMode(deliveryMode)
  }, [requestType, course, deliveryMode])

  const requestLabel = requestOptions.find((o) => o.value === type)?.label ?? ""
  const modeLabel = mode === "online" ? "Online" : mode === "in-person" ? "In-person" : ""

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!type) errors.type = "Please select what you need help with."
    if (type === "training" && !selectedCourse) errors.course = "Please select a course."
    if (!form.name.trim()) errors.name = "Please enter your name."
    if (!form.email.trim()) errors.email = "Please enter your email."
    else if (!EMAIL_RE.test(form.email.trim())) errors.email = "Please enter a valid email address."
    if (!form.message.trim()) errors.message = "Please enter a message."
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (submitState === "submitting") return // prevent duplicate submissions
    if (!validate()) return

    if (!WEB3FORMS_ACCESS_KEY) {
      // No submission endpoint configured yet — tell the visitor plainly
      // rather than pretending the message went anywhere.
      setSubmitState("error")
      return
    }

    setSubmitState("submitting")
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          company: form.company,
          email: form.email,
          message: form.message,
          request_type: requestLabel,
          course: type === "training" ? selectedCourse : undefined,
          preferred_format: type === "training" ? modeLabel || "Not specified" : undefined,
          subject: `Website enquiry: ${requestLabel || "General"} — ${form.company || form.name}`,
        }),
      })

      const data = await res.json().catch(() => null)

      if (res.ok && data?.success) {
        setSubmitState("success")
      } else {
        setSubmitState("error")
      }
    } catch {
      setSubmitState("error")
    }
  }

  if (submitState === "success") {
    return (
      <section id="contact" className="bg-paper-50 py-24">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 sm:px-6 lg:px-10">
          <div
            role="status"
            className="max-w-xl mx-auto bg-white border border-steel-200 p-10 text-center"
          >
            <CheckCircle2 size={44} className="mx-auto text-amber-600 mb-4" aria-hidden="true" />
            <h2 className="font-display text-2xl uppercase text-navy-900 mb-3">
              Thank you — your enquiry has been received
            </h2>
            <p className="text-steel-600 mb-6">
              Our team will get back to you within one business day. If it's urgent, call{" "}
              <a href="tel:+2348028427429" className="text-amber-600 font-semibold hover:underline">
                0802 842 7429
              </a>.
            </p>
            <button
              type="button"
              onClick={() => {
                setForm({ name: "", company: "", email: "", message: "" })
                setSubmitState("idle")
              }}
              className="rounded-sm border border-navy-950 px-6 py-2.5 text-sm font-semibold text-navy-950 hover:bg-navy-950 hover:text-white transition-colors"
            >
              Send another enquiry
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="bg-paper-50 py-24">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <Reveal3D>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-600 mb-4">Get In Touch</p>
            <h2 className="font-display text-4xl md:text-5xl 2xl:text-6xl uppercase leading-tight text-navy-900 mb-8">
              Let's build your
              <br />
              HSE management system
            </h2>
            <p className="text-steel-600 text-lg leading-relaxed mb-10 max-w-md">
              Reach out for environmental consultancy, HSE training bookings or fire
              safety installation. Our team responds within one business day.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin size={22} className="shrink-0 text-amber-600 mt-0.5" aria-hidden="true" />
                <p className="text-navy-900">
                  #7, Unity Close, Unity Estate, Off Segun Kujore Street,
                  <br />
                  Off CMD Road, By GTB, Magodo, Shangisha, Lagos State, Nigeria.
                  <br />
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=7+Unity+Close+Unity+Estate+Off+Segun+Kujore+Street+Magodo+Shangisha+Lagos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1 text-sm font-semibold text-amber-600 hover:text-navy-900 underline underline-offset-2"
                  >
                    Get directions
                  </a>
                </p>
              </div>
              <div className="flex gap-4">
                <Phone size={22} className="shrink-0 text-amber-600 mt-0.5" aria-hidden="true" />
                <p className="text-navy-900">
                  <a href="tel:+2348028427429" className="hover:text-amber-600 underline-offset-2 hover:underline">0802 842 7429</a>
                  {" "}·{" "}
                  <a href="tel:+2347062288830" className="hover:text-amber-600 underline-offset-2 hover:underline">0706 228 8830</a>
                  <br />
                  <a href="tel:+2348064046790" className="hover:text-amber-600 underline-offset-2 hover:underline">0806 404 6790</a>
                  {" "}·{" "}
                  <a href="tel:+2348098217205" className="hover:text-amber-600 underline-offset-2 hover:underline">0809 821 7205</a>
                </p>
              </div>
              <div className="flex gap-4">
                <Mail size={22} className="shrink-0 text-amber-600 mt-0.5" aria-hidden="true" />
                <p className="text-navy-900">
                  <a href="mailto:info@rholuckng.com" className="hover:text-amber-600 underline-offset-2 hover:underline">info@rholuckng.com</a>
                  <br />
                  <a href="mailto:rholuckservices@gmail.com" className="hover:text-amber-600 underline-offset-2 hover:underline">rholuckservices@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-steel-400">
                Follow us
              </span>
              {socials.map((s) => {
                const Icon = iconMap[s.name as keyof typeof iconMap]
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex items-center justify-center h-11 w-11 -m-2 text-navy-900 hover:text-amber-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600 rounded-full"
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>
          </Reveal3D>

          <form onSubmit={handleSubmit} noValidate className="bg-white border border-steel-200 p-8">
            {submitState === "error" && (
              <div
                role="alert"
                className="mb-6 flex gap-3 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                <AlertTriangle size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
                <p>
                  {WEB3FORMS_ACCESS_KEY
                    ? "Something went wrong sending your message — nothing was lost, please try again, or "
                    : "Online submission isn't connected yet — please email us directly at "}
                  <a href="mailto:info@rholuckng.com" className="font-semibold underline">
                    info@rholuckng.com
                  </a>
                  {" "}or call{" "}
                  <a href="tel:+2348028427429" className="font-semibold underline">
                    0802 842 7429
                  </a>.
                </p>
              </div>
            )}

            <label className="text-sm block mb-5">
              <span className="block mb-2 font-medium text-navy-900">
                What do you need help with?
              </span>
              <select
                required
                aria-invalid={!!fieldErrors.type}
                aria-describedby={fieldErrors.type ? "error-type" : undefined}
                value={type}
                onChange={(e) => {
                  const val = e.target.value as RequestType
                  setType(val)
                  setEnquiry(val, val === "training" ? selectedCourse : "")
                }}
                className={`w-full border px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 ${fieldErrors.type ? "border-red-400" : "border-steel-200"}`}
              >
                {requestOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              {fieldErrors.type && (
                <span id="error-type" className="mt-1.5 block text-xs text-red-700">
                  {fieldErrors.type}
                </span>
              )}
            </label>

            {type === "training" && (
              <label className="text-sm block mb-5">
                <span className="block mb-2 font-medium text-navy-900">Which course?</span>
                <select
                  required
                  aria-invalid={!!fieldErrors.course}
                  aria-describedby={fieldErrors.course ? "error-course" : undefined}
                  value={selectedCourse}
                  onChange={(e) => {
                    setSelectedCourse(e.target.value)
                    setEnquiry("training", e.target.value)
                  }}
                  className={`w-full border px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 ${fieldErrors.course ? "border-red-400" : "border-steel-200"}`}
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c.title} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
                {fieldErrors.course && (
                  <span id="error-course" className="mt-1.5 block text-xs text-red-700">
                    {fieldErrors.course}
                  </span>
                )}
              </label>
            )}

            {type === "training" && (
              <fieldset className="text-sm block mb-5 border-0 p-0 m-0">
                <legend className="block mb-2 font-medium text-navy-900">Preferred format</legend>
                <div className="grid grid-cols-2 gap-3">
                  {(["in-person", "online"] as DeliveryMode[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={mode === m}
                      onClick={() => {
                        setMode(m)
                        setEnquiry("training", selectedCourse, m)
                      }}
                      className={`min-h-[44px] rounded-sm border px-4 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-600 focus-visible:outline-offset-2 ${
                        mode === m
                          ? "border-amber-500 bg-amber-500 text-navy-950"
                          : "border-steel-200 text-steel-600 hover:border-amber-500"
                      }`}
                    >
                      {m === "online" ? "Online" : "In-person"}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="grid sm:grid-cols-2 gap-5">
              <label className="text-sm">
                <span className="block mb-2 font-medium text-navy-900">Full name</span>
                <input
                  required
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? "error-name" : undefined}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 ${fieldErrors.name ? "border-red-400" : "border-steel-200"}`}
                />
                {fieldErrors.name && (
                  <span id="error-name" className="mt-1.5 block text-xs text-red-700">
                    {fieldErrors.name}
                  </span>
                )}
              </label>
              <label className="text-sm">
                <span className="block mb-2 font-medium text-navy-900">Company</span>
                <input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full border border-steel-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </label>
            </div>
            <label className="text-sm block mt-5">
              <span className="block mb-2 font-medium text-navy-900">Email</span>
              <input
                required
                type="email"
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "error-email" : undefined}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 ${fieldErrors.email ? "border-red-400" : "border-steel-200"}`}
              />
              {fieldErrors.email && (
                <span id="error-email" className="mt-1.5 block text-xs text-red-700">
                  {fieldErrors.email}
                </span>
              )}
            </label>
            <label className="text-sm block mt-5">
              <span className="block mb-2 font-medium text-navy-900">
                {type === "training" ? "Anything else we should know?" : "What do you need help with?"}
              </span>
              <textarea
                required
                rows={5}
                aria-invalid={!!fieldErrors.message}
                aria-describedby={fieldErrors.message ? "error-message" : undefined}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={
                  type === "training"
                    ? "Number of participants, preferred dates, location..."
                    : undefined
                }
                className={`w-full border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 ${fieldErrors.message ? "border-red-400" : "border-steel-200"}`}
              />
              {fieldErrors.message && (
                <span id="error-message" className="mt-1.5 block text-xs text-red-700">
                  {fieldErrors.message}
                </span>
              )}
            </label>
            <button
              type="submit"
              disabled={submitState === "submitting"}
              className="mt-6 w-full min-h-[52px] flex items-center justify-center gap-2 rounded-sm bg-navy-950 py-3.5 font-semibold text-white hover:bg-navy-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitState === "submitting" && (
                <Loader2 size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
              )}
              {submitState === "submitting"
                ? "Sending..."
                : type === "training"
                  ? "Submit Enrollment"
                  : "Send Enquiry"}
            </button>
            <p className="mt-3 text-xs text-steel-400">
              Sends directly to our team — or reach us anytime at{" "}
              <a href="mailto:info@rholuckng.com" className="underline hover:text-amber-600">
                info@rholuckng.com
              </a>.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
