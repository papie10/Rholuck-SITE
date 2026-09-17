// lucide-react v1 dropped brand icons, so these are small inline marks
// sized to match lucide's 24x24 stroke-icon footprint.

export function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

export function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46A21 21 0 0 0 14.1 4.3c-2.24 0-3.78 1.37-3.78 3.87v2.16H7.75v2.96h2.57V21h3.18Z" />
    </svg>
  )
}

export function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.53 10.6 20.1 3h-1.56l-5.7 6.6L8.27 3H3l6.9 10.05L3 21h1.56l6.02-6.98L15.73 21H21l-7.47-10.4Zm-2.13 2.48-.7-1-5.55-7.94h2.4l4.48 6.4.7 1 5.83 8.34h-2.4l-4.76-6.8Z" />
    </svg>
  )
}
