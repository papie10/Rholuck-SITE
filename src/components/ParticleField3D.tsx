import { useEffect, useRef } from "react"
import * as THREE from "three"
import { isWebGLAvailable } from "../lib/webgl"

// Fixed, full-viewport WebGL particle field that sits behind the entire site.
// Gives the whole page a persistent sense of 3D depth: a sparse field of amber
// "safety network" nodes that drift, and parallax gently with scroll + cursor.
export default function ParticleField3D({ fixed = true }: { fixed?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!isWebGLAvailable()) return

    try {
      const width = mount.clientWidth || window.innerWidth
      const height = mount.clientHeight || window.innerHeight

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 60)
      camera.position.z = 18

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
      mount.appendChild(renderer.domElement)

      // Node field
      const COUNT = window.innerWidth < 768 ? 140 : 320
      const positions = new Float32Array(COUNT * 3)
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 40
        positions[i * 3 + 1] = (Math.random() - 0.5) * 60
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      const mat = new THREE.PointsMaterial({
        color: 0xc08f52,
        size: 0.09,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      })
      const points = new THREE.Points(geo, mat)
      scene.add(points)

      // Faint connecting lines between nearby points (network feel), capped for perf
      const lineGeo = new THREE.BufferGeometry()
      const linePositions: number[] = []
      const maxDist = 5.5
      let linkCount = 0
      for (let i = 0; i < COUNT && linkCount < 260; i++) {
        for (let j = i + 1; j < COUNT && linkCount < 260; j++) {
          const dx = positions[i * 3] - positions[j * 3]
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (d < maxDist) {
            linePositions.push(
              positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
              positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
            )
            linkCount++
          }
        }
      }
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3))
      const lineMat = new THREE.LineBasicMaterial({ color: 0x2c4263, transparent: true, opacity: 0.25 })
      const lines = new THREE.LineSegments(lineGeo, lineMat)
      scene.add(lines)

      let mouseX = 0
      let mouseY = 0
      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener("mousemove", onMouseMove)

      let scrollY = window.scrollY
      const onScroll = () => {
        scrollY = window.scrollY
      }
      window.addEventListener("scroll", onScroll, { passive: true })

      let raf = 0
      const animate = () => {
        try {
          raf = requestAnimationFrame(animate)
          points.rotation.y += 0.0006
          lines.rotation.y += 0.0006
          camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.02
          camera.position.y += (-mouseY * 1.2 - camera.position.y - scrollY * 0.006) * 0.02
          camera.lookAt(0, -scrollY * 0.006, 0)
          renderer.render(scene, camera)
        } catch (err) {
          console.warn("ParticleField3D render loop failed, stopping:", err)
          cancelAnimationFrame(raf)
        }
      }
      animate()

      const onResize = () => {
        const w = mount.clientWidth || window.innerWidth
        const h = mount.clientHeight || window.innerHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener("resize", onResize)

      return () => {
        cancelAnimationFrame(raf)
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("scroll", onScroll)
        window.removeEventListener("resize", onResize)
        renderer.dispose()
        geo.dispose()
        mat.dispose()
        lineGeo.dispose()
        lineMat.dispose()
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
      }
    } catch (err) {
      console.warn("ParticleField3D failed to initialize, skipping 3D backdrop:", err)
      return
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden
      className={`pointer-events-none z-0 opacity-70 ${fixed ? "fixed inset-0" : "absolute inset-0"}`}
    />
  )
}
