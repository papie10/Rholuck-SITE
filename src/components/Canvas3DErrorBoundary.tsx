import { Component, type ReactNode } from "react"

type Props = {
  children: ReactNode
  fallback: ReactNode
}

type State = { hasError: boolean }

// Wraps any WebGL/Three.js scene. If construction or rendering throws for
// any reason (no WebGL, driver issue, context loss), this catches it and
// swaps in a static fallback instead of taking down the surrounding page.
export default class Canvas3DErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.warn("3D scene failed to render, showing fallback:", error)
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}
