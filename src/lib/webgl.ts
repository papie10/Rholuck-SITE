// Detects real WebGL support before we attempt to construct a Three.js
// renderer. Some corporate/industrial IT policies disable WebGL entirely —
// exactly the kind of locked-down laptop this site's own target audience
// (oil & gas, manufacturing, HSE managers) is likely to be browsing from.
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas")
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    return !!gl
  } catch {
    return false
  }
}
