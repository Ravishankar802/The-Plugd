export function EliteLeagueIcon({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
      <defs>
        <linearGradient id="elite-silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="elite-green-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="50%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="elite-green-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>
      </defs>
      <path
        d="M 32,4 L 58,19 L 58,45 L 32,60 L 6,45 L 6,19 Z"
        fill="none"
        stroke="url(#elite-silver-grad)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M 32,8 L 54,21 L 54,43 L 32,56 L 10,43 L 10,21 Z"
        fill="#022c22"
        stroke="#065F46"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path d="M 32,22 L 41,27 L 41,37 L 32,42 L 23,37 L 23,27 Z" fill="url(#elite-green-light)" />

      <path d="M 32,14 L 48,22 L 41,27 L 32,22 Z" fill="url(#elite-green-light)" opacity="0.9" />
      <path d="M 48,22 L 48,42 L 41,37 L 41,27 Z" fill="url(#elite-green-dark)" opacity="0.8" />
      <path d="M 48,42 L 32,50 L 32,42 L 41,37 Z" fill="url(#elite-green-dark)" />
      <path d="M 32,50 L 16,42 L 23,37 L 32,42 Z" fill="url(#elite-green-light)" opacity="0.75" />
      <path d="M 16,42 L 16,22 L 23,27 L 23,37 Z" fill="url(#elite-green-light)" opacity="0.85" />
      <path d="M 16,22 L 32,14 L 32,22 L 23,27 Z" fill="url(#elite-green-light)" />

      <path d="M 32,14 L 48,22 L 48,42 L 32,50 L 16,42 L 16,22 Z" fill="none" stroke="#6EE7B7" strokeWidth="0.75" />
    </svg>
  );
}
