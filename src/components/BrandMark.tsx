// Adapted from the Rholuck Group site's Logo component — the shared "R" mark
// in brushed steel-blue and copper-bronze, used to keep this site visually
// aligned with the wider Rholuck Group brand.
export default function BrandMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`shrink-0 ${className}`} style={{ width: size, height: size }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="steelBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c4263" />
            <stop offset="35%" stopColor="#3d5a80" />
            <stop offset="70%" stopColor="#1e2d42" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="steelBlueLight" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e2d42" />
            <stop offset="50%" stopColor="#4d6f96" />
            <stop offset="100%" stopColor="#2c4263" />
          </linearGradient>
          <linearGradient id="copperBronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9a5832" />
            <stop offset="40%" stopColor="#d28653" />
            <stop offset="75%" stopColor="#814421" />
            <stop offset="100%" stopColor="#54250c" />
          </linearGradient>
          <linearGradient id="copperBronzeLight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c87948" />
            <stop offset="50%" stopColor="#f3ac7f" />
            <stop offset="100%" stopColor="#814421" />
          </linearGradient>
          <filter id="shadow3D" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="1.5" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.45" />
          </filter>
        </defs>

        <path d="M20 12 H36 V88 H20 Z" fill="url(#steelBlueGrad)" stroke="url(#steelBlueLight)" strokeWidth="0.75" filter="url(#shadow3D)" />
        <path d="M20 12 L24 16 V84 L20 88 Z" fill="#ffffff" fillOpacity="0.15" />

        <path
          d="M36 12 C58 12 74 22 74 40 C74 58 58 68 36 68 H30 V56 H36 C50 56 62 48 62 40 C62 32 50 24 36 24 H30 V12 Z"
          fill="url(#steelBlueGrad)"
          stroke="url(#steelBlueLight)"
          strokeWidth="0.5"
          filter="url(#shadow3D)"
        />

        <path
          d="M36 50 L52 50 C58 50 63 53 66 58 L82 88 H64 L50 62 H36 Z"
          fill="url(#copperBronzeGrad)"
          stroke="url(#copperBronzeLight)"
          strokeWidth="0.75"
          filter="url(#shadow3D)"
        />
        <path d="M36 50 H52 L44 62 H36 Z" fill="url(#copperBronzeLight)" opacity="0.3" />
      </svg>
    </div>
  )
}
