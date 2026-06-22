export function BronzeLeagueIcon({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
      <defs>
        <linearGradient id="bronze-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5A97C" />
          <stop offset="35%" stopColor="#C68052" />
          <stop offset="70%" stopColor="#8C4F2D" />
          <stop offset="100%" stopColor="#5C3119" />
        </linearGradient>
        <linearGradient id="bronze-star-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5D0A9" />
          <stop offset="100%" stopColor="#C68052" />
        </linearGradient>
        <linearGradient id="bronze-star-dark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8C4F2D" />
          <stop offset="100%" stopColor="#4A2511" />
        </linearGradient>
      </defs>
      {/* Hexagon Outer Border */}
      <path
        d="M 32,4 L 58,19 L 58,45 L 32,60 L 6,45 L 6,19 Z"
        fill="none"
        stroke="url(#bronze-gold-grad)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Inner Hexagon Border */}
      <path
        d="M 32,8 L 54,21 L 54,43 L 32,56 L 10,43 L 10,21 Z"
        fill="#120c08"
        stroke="#5C3119"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* 3D Star in the Center */}
      <path d="M 32,16 L 32,32 L 28,27 Z" fill="url(#bronze-star-light)" />
      <path d="M 32,16 L 36,27 L 32,32 Z" fill="url(#bronze-star-dark)" />
      <path d="M 47,27 L 32,32 L 36,27 Z" fill="url(#bronze-star-light)" />
      <path d="M 47,27 L 38,34 L 32,32 Z" fill="url(#bronze-star-dark)" />
      <path d="M 41,45 L 32,32 L 38,34 Z" fill="url(#bronze-star-light)" />
      <path d="M 41,45 L 32,38.5 L 32,32 Z" fill="url(#bronze-star-dark)" />
      <path d="M 23,45 L 32,32 L 32,38.5 Z" fill="url(#bronze-star-light)" />
      <path d="M 23,45 L 26,34 L 32,32 Z" fill="url(#bronze-star-dark)" />
      <path d="M 17,27 L 32,32 L 26,34 Z" fill="url(#bronze-star-light)" />
      <path d="M 17,27 L 28,27 L 32,32 Z" fill="url(#bronze-star-dark)" />
      
      <path
        d="M 32,16 L 36,27 L 47,27 L 38,34 L 41,45 L 32,38.5 L 23,45 L 26,34 L 17,27 L 28,27 Z"
        fill="none"
        stroke="#E5A97C"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
