import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

// Scroll-triggered 3D entrance: content rotates in from a slight tilt with
// perspective depth, rather than a flat fade/slide. Used throughout the site
// so every section feels like it's arriving in 3D space, not just 2D content.
// Respects prefers-reduced-motion: falls back to a plain fade, no rotation/movement.
export default function Reveal3D({
  children,
  className = "",
  delay = 0,
  axis = "x",
}: {
  children: ReactNode
  className?: string
  delay?: number
  axis?: "x" | "y"
}) {
  const reduceMotion = useReducedMotion()

  const initial = reduceMotion
    ? { opacity: 0 }
    : axis === "x"
      ? { opacity: 0, rotateX: -18, y: 28 }
      : { opacity: 0, rotateY: -18, x: 28 }

  const animate = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, rotateX: 0, rotateY: 0, x: 0, y: 0 }

  return (
    <motion.div
      className={className}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduceMotion ? 0.3 : 0.65, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}
