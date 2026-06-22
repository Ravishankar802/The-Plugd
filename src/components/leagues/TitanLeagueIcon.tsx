export function TitanLeagueIcon({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
      <defs>
        <linearGradient id="titan-gold-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="titan-gold-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>
      <path d="M 12,12 C 10,22 14,32 26,34 L 28,34 C 18,32 14,22 16,12 Z" fill="url(#titan-gold-light)" stroke="#D97706" strokeWidth="0.5" />
      <path d="M 12,12 L 16,12 L 16,16 L 12,16 Z" fill="#FEF08A" />
      
      <path d="M 52,12 C 54,22 50,32 38,34 L 36,34 C 46,32 50,22 48,12 Z" fill="url(#titan-gold-dark)" stroke="#78350F" strokeWidth="0.5" />
      <path d="M 48,12 L 52,12 L 52,16 L 48,16 Z" fill="#F59E0B" />

      {/* Center prong */}
      <path d="M 32,4 L 28,16 L 32,24 Z" fill="url(#titan-gold-light)" />
      <path d="M 32,4 L 32,24 L 36,16 Z" fill="url(#titan-gold-dark)" />
      
      {/* Connection bar */}
      <path d="M 22,34 L 42,34 L 38,40 L 26,40 Z" fill="url(#titan-gold-light)" stroke="#D97706" strokeWidth="0.5" />
      <path d="M 32,34 L 42,34 L 38,40 L 32,40 Z" fill="url(#titan-gold-dark)" />

      {/* Shaft */}
      <path d="M 30,40 L 32,40 L 32,58 L 30,58 Z" fill="url(#titan-gold-light)" />
      <path d="M 32,40 L 34,40 L 34,58 L 32,58 Z" fill="url(#titan-gold-dark)" />
    </svg>
  );
}
