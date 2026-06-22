export function GoldLeagueIcon({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
      <defs>
        <linearGradient id="gold-metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#854D0E" />
        </linearGradient>
        <linearGradient id="gold-gem-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
        <linearGradient id="gold-gem-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A16207" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
      </defs>
      {/* Hexagon Outer Border */}
      <path
        d="M 32,4 L 58,19 L 58,45 L 32,60 L 6,45 L 6,19 Z"
        fill="none"
        stroke="url(#gold-metal-grad)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Inner Hexagon Border */}
      <path
        d="M 32,8 L 54,21 L 54,43 L 32,56 L 10,43 L 10,21 Z"
        fill="#120e06"
        stroke="#854D0E"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Flat Center Face */}
      <path d="M 32,24 L 38,28 L 38,36 L 32,40 L 26,36 L 26,28 Z" fill="url(#gold-gem-light)" />
      {/* Top Facet */}
      <path d="M 32,16 L 42,24 L 38,28 L 32,24 Z" fill="url(#gold-gem-light)" opacity="0.9" />
      {/* Top-Right Facet */}
      <path d="M 42,24 L 42,40 L 38,36 L 38,28 Z" fill="url(#gold-gem-dark)" opacity="0.8" />
      {/* Bottom-Right Facet */}
      <path d="M 42,40 L 32,48 L 32,40 L 38,36 Z" fill="url(#gold-gem-dark)" />
      {/* Bottom Facet */}
      <path d="M 32,48 L 22,40 L 26,36 L 32,40 Z" fill="url(#gold-gem-light)" opacity="0.7" />
      {/* Bottom-Left Facet */}
      <path d="M 22,40 L 22,24 L 26,28 L 26,36 Z" fill="url(#gold-gem-light)" opacity="0.85" />
      {/* Top-Left Facet */}
      <path d="M 22,24 L 32,16 L 32,24 L 26,28 Z" fill="url(#gold-gem-light)" />
      
      <path d="M 32,16 L 42,24 L 42,40 L 32,48 L 22,40 L 22,24 Z" fill="none" stroke="#FDE047" strokeWidth="0.75" />
    </svg>
  );
}
