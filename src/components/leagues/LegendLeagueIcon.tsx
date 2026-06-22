export function LegendLeagueIcon({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
      <defs>
        <linearGradient id="legend-shield-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0B5394" />
          <stop offset="100%" stopColor="#073763" />
        </linearGradient>
        <linearGradient id="legend-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE599" />
          <stop offset="50%" stopColor="#F1C232" />
          <stop offset="100%" stopColor="#BF9000" />
        </linearGradient>
      </defs>
      {/* Blue Banner / Pennant Shield */}
      <path
        d="M 14,8 L 50,8 L 50,38 L 32,54 L 14,38 Z"
        fill="url(#legend-shield-grad)"
        stroke="#3D85C6"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M 17,11 L 47,11 L 47,36 L 32,50 L 17,36 Z"
        fill="#051b2c"
        stroke="#073763"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Spikes on the top-left side of the club */}
      <path d="M 22,37 L 17,30 L 27,32 Z" fill="url(#legend-gold-grad)" stroke="#BF9000" strokeWidth="0.5" />
      <path d="M 29,30 L 24,23 L 34,25 Z" fill="url(#legend-gold-grad)" stroke="#BF9000" strokeWidth="0.5" />
      <path d="M 36,23 L 31,16 L 41,18 Z" fill="url(#legend-gold-grad)" stroke="#BF9000" strokeWidth="0.5" />

      {/* Spikes on the bottom-right side of the club */}
      <path d="M 25,42 L 31,47 L 30,37 Z" fill="url(#legend-gold-grad)" stroke="#BF9000" strokeWidth="0.5" />
      <path d="M 32,35 L 38,40 L 37,30 Z" fill="url(#legend-gold-grad)" stroke="#BF9000" strokeWidth="0.5" />
      <path d="M 39,28 L 45,33 L 44,23 Z" fill="url(#legend-gold-grad)" stroke="#BF9000" strokeWidth="0.5" />

      {/* Main Club Cylinder */}
      <path d="M 18,41 L 44,15 L 48,19 L 22,45 Z" fill="url(#legend-gold-grad)" stroke="#BF9000" strokeWidth="0.5" />

      {/* Gold tip/hilt details */}
      <path d="M 12,47 L 20,39 L 18,37 L 10,45 Z" fill="#BF9000" />
      <circle cx="11" cy="46" r="2.5" fill="#FFE599" />
      
      {/* Highlight line */}
      <path d="M 18,41 L 44,15" stroke="#FFFFFF" strokeWidth="0.75" opacity="0.6" />
    </svg>
  );
}
