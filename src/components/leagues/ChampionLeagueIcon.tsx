export function ChampionLeagueIcon({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
      <defs>
        <linearGradient id="champion-shield-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7F1D1D" />
          <stop offset="100%" stopColor="#350505" />
        </linearGradient>
        <linearGradient id="champion-red-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient id="champion-red-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#991B1B" />
          <stop offset="100%" stopColor="#450A0A" />
        </linearGradient>
      </defs>
      {/* Outer aggressive esports shield */}
      <path
        d="M 32,10 L 46,5 L 50,15 L 56,20 L 52,38 C 48,48 32,58 32,58 C 32,58 16,48 12,38 L 8,20 L 14,15 L 18,5 Z"
        fill="url(#champion-shield-grad)"
        stroke="#EF4444"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Inner dark area */}
      <path
        d="M 32,13 L 44,8 L 47,16 L 52,20 L 49,36 C 45,45 32,54 32,54 C 32,54 19,45 15,36 L 12,20 L 17,16 L 20,8 Z"
        fill="#0f0505"
        stroke="#991B1B"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      
      {/* Pillar 1 (Left) */}
      <path d="M 21,20 L 23,16 L 23,38 L 21,34 Z" fill="url(#champion-red-light)" />
      <path d="M 23,16 L 25,20 L 25,34 L 23,38 Z" fill="url(#champion-red-dark)" />

      {/* Pillar 2 (Center) */}
      <path d="M 30,14 L 32,10 L 32,42 L 30,38 Z" fill="url(#champion-red-light)" />
      <path d="M 32,10 L 34,14 L 34,38 L 32,42 Z" fill="url(#champion-red-dark)" />

      {/* Pillar 3 (Right) */}
      <path d="M 39,20 L 41,16 L 41,38 L 39,34 Z" fill="url(#champion-red-light)" />
      <path d="M 41,16 L 43,20 L 43,34 L 41,38 Z" fill="url(#champion-red-dark)" />
    </svg>
  );
}
