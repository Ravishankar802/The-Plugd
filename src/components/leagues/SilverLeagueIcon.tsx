export function SilverLeagueIcon({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
      <defs>
        <linearGradient id="silver-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#E2E8F0" />
          <stop offset="60%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="silver-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id="silver-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
      </defs>
      <path d="M 32,58 C 20,44 12,32 16,14 C 18,24 24,34 32,40 C 40,34 46,24 48,14 C 52,32 44,44 32,58 Z" fill="#0f172a" opacity="0.5" />
      
      {/* Left Wing */}
      <path d="M 32,54 C 20,48 14,36 16,22 C 20,30 26,36 32,38 Z" fill="url(#silver-metal)" stroke="#94A3B8" strokeWidth="0.5" />
      <path d="M 32,42 C 22,36 18,24 20,12 C 24,20 28,26 32,28 Z" fill="url(#silver-highlight)" stroke="#CBD5E1" strokeWidth="0.5" />
      <path d="M 32,30 C 26,24 22,14 24,4 C 26,10 29,16 32,18 Z" fill="url(#silver-metal)" stroke="#94A3B8" strokeWidth="0.5" />

      {/* Right Wing */}
      <path d="M 32,54 C 44,48 50,36 48,22 C 44,30 38,36 32,38 Z" fill="url(#silver-dark)" stroke="#475569" strokeWidth="0.5" />
      <path d="M 32,42 C 42,36 46,24 44,12 C 40,20 36,26 32,28 Z" fill="url(#silver-metal)" stroke="#94A3B8" strokeWidth="0.5" />
      <path d="M 32,30 C 38,24 42,14 40,4 C 38,10 35,16 32,18 Z" fill="url(#silver-dark)" stroke="#475569" strokeWidth="0.5" />

      <path d="M 32,56 L 32,4" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}
