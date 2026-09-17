import { useRef, type ReactNode, type MouseEvent } from "react"

// Lightweight cursor-tracked 3D tilt wrapper — no dependencies, CSS transforms only.
// Skips the tilt transform entirely for prefers-reduced-motion users.
export default function Tilt3D({
  children,
  className = "",
  intensity = 10,
}: {
  children: ReactNode
  className?: string
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const reduceMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || reduceMotion()) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(6px)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)"
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`[transition:transform_0.25s_ease-out] [transform-style:preserve-3d] will-change-transform ${className}`}
    >
      {children}
    </div>
  )
}
