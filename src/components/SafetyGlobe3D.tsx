import { useEffect, useRef } from "react"
import * as THREE from "three"
import { isWebGLAvailable } from "../lib/webgl"

// Standout WebGL scene: a wireframe geodesic globe (nationwide network) with
// an inner rotating shield core (protection). Drag to rotate, auto-spins when idle.
export default function SafetyGlobe3D({
  className = "",
  onError,
}: {
  className?: string
  onError?: () => void
}) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    if (!isWebGLAvailable()) {
      onError?.()
      return
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    try {
      const width = mount.clientWidth
      const height = mount.clientHeight

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
      camera.position.set(0, 0, 6.2)

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      mount.appendChild(renderer.domElement)

      const group = new THREE.Group()
      scene.add(group)

      // Outer wireframe geodesic sphere — "nationwide network"
      const outerGeo = new THREE.IcosahedronGeometry(2.15, 2)
      const outerMat = new THREE.MeshBasicMaterial({
        color: 0xe8a33d,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      })
      const outer = new THREE.Mesh(outerGeo, outerMat)
      group.add(outer)

      // Node points at vertices
      const pointsMat = new THREE.PointsMaterial({ color: 0xffd27a, size: 0.045 })
      const points = new THREE.Points(outerGeo, pointsMat)
      group.add(points)

      // Inner faceted shield core — "protection"
      const coreGeo = new THREE.IcosahedronGeometry(1.15, 1)
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x0a2540,
        emissive: 0xe8a33d,
        emissiveIntensity: 0.12,
        metalness: 0.4,
        roughness: 0.35,
        flatShading: true,
      })
      const core = new THREE.Mesh(coreGeo, coreMat)
      group.add(core)

      const coreEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(coreGeo),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })
      )
      core.add(coreEdges)

      // Lighting
      scene.add(new THREE.AmbientLight(0xffffff, 0.5))
      const key = new THREE.DirectionalLight(0xffffff, 1.1)
      key.position.set(3, 4, 5)
      scene.add(key)
      const rim = new THREE.DirectionalLight(0xe8a33d, 0.6)
      rim.position.set(-4, -2, -3)
      scene.add(rim)

      // Interaction: drag to rotate always works (user-initiated).
      // Idle auto-spin only runs when the visitor hasn't asked for reduced motion.
      let rotX = 0.15
      let rotY = 0
      let dragging = false
      let lastX = 0
      let lastY = 0

      const onPointerDown = (e: PointerEvent) => {
        dragging = true
        lastX = e.clientX
        lastY = e.clientY
      }
      const onPointerMove = (e: PointerEvent) => {
        if (!dragging) return
        const dx = e.clientX - lastX
        const dy = e.clientY - lastY
        rotY += dx * 0.005
        rotX += dy * 0.005
        rotX = Math.max(-1.1, Math.min(1.1, rotX))
        lastX = e.clientX
        lastY = e.clientY
      }
      const onPointerUp = () => {
        dragging = false
      }

      renderer.domElement.style.touchAction = "none"
      renderer.domElement.style.cursor = "grab"
      renderer.domElement.addEventListener("pointerdown", (e) => {
        onPointerDown(e)
        renderer.domElement.style.cursor = "grabbing"
      })
      window.addEventListener("pointermove", onPointerMove)
      window.addEventListener("pointerup", () => {
        onPointerUp()
        renderer.domElement.style.cursor = "grab"
      })

      let raf = 0
      const animate = () => {
        try {
          raf = requestAnimationFrame(animate)
          if (!dragging && !reducedMotion) {
            rotY += 0.0028
          }
          group.rotation.set(rotX, rotY, 0)
          if (!reducedMotion) core.rotation.y -= 0.004
          renderer.render(scene, camera)
        } catch (err) {
          console.warn("SafetyGlobe3D render loop failed, stopping:", err)
          cancelAnimationFrame(raf)
        }
      }
      animate()

      const onResize = () => {
        if (!mount) return
        const w = mount.clientWidth
        const h = mount.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener("resize", onResize)

      return () => {
        cancelAnimationFrame(raf)
        window.removeEventListener("resize", onResize)
        window.removeEventListener("pointermove", onPointerMove)
        renderer.dispose()
        outerGeo.dispose()
        outerMat.dispose()
        coreGeo.dispose()
        coreMat.dispose()
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
      }
    } catch (err) {
      console.warn("SafetyGlobe3D failed to initialize:", err)
      onError?.()
      return
    }
  }, [onError])

  return <div ref={mountRef} className={className} />
}
