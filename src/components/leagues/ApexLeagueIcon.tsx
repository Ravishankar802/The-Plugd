export function ApexLeagueIcon({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
      <defs>
        <linearGradient id="apex-gold-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
        <linearGradient id="apex-gold-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#854D0E" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
      </defs>
      <path d="M 20,18 C 12,18 10,30 20,32 L 20,28 C 14,26 15,22 20,22 Z" fill="url(#apex-gold-light)" stroke="#CA8A04" strokeWidth="0.5" />
      <path d="M 44,18 C 52,18 54,30 44,32 L 44,28 C 50,26 49,22 44,22 Z" fill="url(#apex-gold-dark)" stroke="#854D0E" strokeWidth="0.5" />

      <path d="M 18,12 L 46,12 L 44,16 L 20,16 Z" fill="url(#apex-gold-light)" />
      
      <path d="M 20,16 L 28,34 L 18,28 Z" fill="url(#apex-gold-light)" opacity="0.8" />
      <path d="M 20,16 L 32,16 L 32,36 L 28,34 Z" fill="url(#apex-gold-light)" />
      <path d="M 32,16 L 44,16 L 36,34 L 32,36 Z" fill="url(#apex-gold-dark)" />
      <path d="M 44,16 L 46,28 L 36,34 Z" fill="url(#apex-gold-dark)" opacity="0.9" />

      <path d="M 28,34 L 36,34 L 34,46 L 30,46 Z" fill="url(#apex-gold-light)" />
      <path d="M 32,34 L 36,34 L 34,46 L 32,46 Z" fill="url(#apex-gold-dark)" />

      <path d="M 26,46 L 38,46 L 36,50 L 28,50 Z" fill="url(#apex-gold-light)" />
      <path d="M 32,46 L 38,46 L 36,50 L 32,50 Z" fill="url(#apex-gold-dark)" />
      <path d="M 22,50 L 42,50 L 40,58 L 24,58 Z" fill="url(#apex-gold-light)" />
      <path d="M 32,50 L 42,50 L 40,58 L 32,58 Z" fill="url(#apex-gold-dark)" />

      <path d="M 18,12 L 46,12 L 44,34 L 32,36 L 20,34 Z" fill="none" stroke="#FEF08A" strokeWidth="0.75" />
    </svg>
  );
}
