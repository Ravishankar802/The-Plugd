export function SovereignLeagueIcon({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
      <defs>
        <linearGradient id="sov-purple-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4C1D95" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </linearGradient>
        <linearGradient id="sov-gold-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="sov-gold-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <linearGradient id="sov-gem-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E9D5FF" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="sov-gem-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7E22CE" />
          <stop offset="100%" stopColor="#3B0764" />
        </linearGradient>
      </defs>
      {/* Laurel Wreath Base */}
      <path d="M 32,54 C 26,52 20,44 18,40 C 15,44 20,52 28,54 Z" fill="url(#sov-gold-light)" />
      <path d="M 18,40 C 14,36 12,28 12,22 C 9,28 12,36 16,40 Z" fill="url(#sov-gold-light)" />
      <path d="M 32,54 C 38,52 44,44 46,40 C 49,44 44,52 36,54 Z" fill="url(#sov-gold-dark)" />
      <path d="M 46,40 C 50,36 52,28 52,22 C 55,28 52,36 48,40 Z" fill="url(#sov-gold-dark)" />

      {/* Main Purple Shield */}
      <path
        d="M 14,8 L 50,8 L 50,32 C 50,48 32,58 32,58 C 32,58 14,48 14,32 Z"
        fill="url(#sov-purple-grad)"
        stroke="url(#sov-gold-light)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M 17,11 L 47,11 L 47,30 C 47,44 32,53 32,53 C 32,53 17,44 17,30 Z"
        fill="#090514"
        stroke="#4C1D95"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Gold Inner Frame for Gemstone */}
      <path
        d="M 32,14 L 42,21 L 42,41 L 32,50 L 22,41 L 22,21 Z"
        fill="none"
        stroke="url(#sov-gold-light)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Faceted Purple Gemstone in the Center */}
      <path d="M 32,24 L 37,28 L 37,36 L 32,40 L 27,36 L 27,28 Z" fill="url(#sov-gem-light)" />
      <path d="M 32,16 L 40,22 L 37,28 L 32,24 Z" fill="url(#sov-gem-light)" opacity="0.9" />
      <path d="M 40,22 L 40,40 L 37,36 L 37,28 Z" fill="url(#sov-gem-dark)" opacity="0.8" />
      <path d="M 40,40 L 32,48 L 32,40 L 37,36 Z" fill="url(#sov-gem-dark)" />
      <path d="M 32,48 L 24,40 L 27,36 L 32,40 Z" fill="url(#sov-gem-light)" opacity="0.75" />
      <path d="M 24,40 L 24,22 L 27,28 L 27,36 Z" fill="url(#sov-gem-light)" opacity="0.85" />
      <path d="M 24,22 L 32,16 L 32,24 L 27,28 Z" fill="url(#sov-gem-light)" />
      <path d="M 32,16 L 40,22 L 40,40 L 32,48 L 24,40 L 24,22 Z" fill="none" stroke="#F3E8FF" strokeWidth="0.75" />

      {/* Integrated Golden Crown at the Top */}
      <path
        d="M 24,10 L 22,4 L 27,7 L 32,2 L 37,7 L 42,4 L 40,10 Z"
        fill="url(#sov-gold-light)"
        stroke="#B45309"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="4" r="0.7" fill="#FFE599" />
      <circle cx="32" cy="2" r="0.9" fill="#FFE599" />
      <circle cx="42" cy="4" r="0.7" fill="#FFE599" />
    </svg>
  );
}
