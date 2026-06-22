export function MasterLeagueIcon({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
      <defs>
        <linearGradient id="master-purple-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F3E8FF" />
          <stop offset="50%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="master-purple-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
      </defs>
      {/* Chevron 1 (Top) */}
      <path d="M 32,24 L 8,10 L 8,18 L 32,32 Z" fill="url(#master-purple-light)" />
      <path d="M 32,24 L 56,10 L 56,18 L 32,32 Z" fill="url(#master-purple-dark)" />
      
      {/* Chevron 2 (Middle) */}
      <path d="M 32,38 L 8,24 L 8,32 L 32,46 Z" fill="url(#master-purple-light)" />
      <path d="M 32,38 L 56,24 L 56,32 L 32,46 Z" fill="url(#master-purple-dark)" />

      {/* Chevron 3 (Bottom) */}
      <path d="M 32,52 L 8,38 L 8,46 L 32,60 Z" fill="url(#master-purple-light)" />
      <path d="M 32,52 L 56,38 L 56,46 L 32,60 Z" fill="url(#master-purple-dark)" />

      <path d="M 8,10 L 32,24 L 56,10 M 8,24 L 32,38 L 56,26 M 8,38 L 32,52 L 56,38" fill="none" stroke="#E9D5FF" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}
