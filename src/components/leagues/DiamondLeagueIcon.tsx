export function DiamondLeagueIcon({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
      <defs>
        <linearGradient id="diamond-blue-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id="diamond-blue-mid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="diamond-blue-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0C4A6E" />
        </linearGradient>
        <linearGradient id="diamond-silver-wing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
      </defs>
      {/* Left Bracket */}
      <path d="M 12,14 L 4,26 L 14,48 L 20,44 L 10,26 L 16,18 Z" fill="url(#diamond-silver-wing)" stroke="#94A3B8" strokeWidth="0.5" />
      {/* Right Bracket */}
      <path d="M 52,14 L 60,26 L 50,48 L 44,44 L 54,26 L 48,18 Z" fill="url(#diamond-silver-wing)" stroke="#94A3B8" strokeWidth="0.5" />

      {/* Top Flat Face */}
      <path d="M 22,20 L 42,20 L 37,28 L 27,28 Z" fill="url(#diamond-blue-light)" />
      {/* Top Left Face */}
      <path d="M 14,28 L 22,20 L 27,28 Z" fill="url(#diamond-blue-mid)" />
      {/* Top Right Face */}
      <path d="M 42,20 L 50,28 L 37,28 Z" fill="url(#diamond-blue-dark)" />
      {/* Bottom Left Face */}
      <path d="M 14,28 L 27,28 L 32,50 Z" fill="url(#diamond-blue-mid)" />
      {/* Bottom Center Face */}
      <path d="M 27,28 L 37,28 L 32,50 Z" fill="url(#diamond-blue-light)" />
      {/* Bottom Right Face */}
      <path d="M 37,28 L 50,28 L 32,50 Z" fill="url(#diamond-blue-dark)" />

      <path d="M 22,20 L 42,20 L 50,28 L 32,50 L 14,28 Z" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeLinejoin="round" opacity="0.8" />
    </svg>
  );
}
