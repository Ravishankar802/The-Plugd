const fs = require('fs');
const path = require('path');

const avatarsDir = path.join(__dirname, '..', 'public', 'avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

const avatars = [
  {
    file: 'avatar-1.svg',
    name: 'Plugd Spark',
    gradient: ['#ffedd5', '#ea580c'],
    accent: '#f97316',
    emoji: '⚡',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff7e40"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#g1)"/>
  <circle cx="60" cy="50" r="28" fill="#fff" opacity="0.95"/>
  <path d="M48 48a4 4 0 1 1 0-.1M72 48a4 4 0 1 1 0-.1" stroke="#ea580c" stroke-width="4" stroke-linecap="round"/>
  <path d="M52 60q8 8 16 0" stroke="#ea580c" stroke-width="3" stroke-linecap="round" fill="none"/>
  <polygon points="60,20 66,35 56,35" fill="#facc15"/>
  <path d="M30 110c0-18 14-30 30-30s30 12 30 30" fill="#fff" opacity="0.95"/>
</svg>`
  },
  {
    file: 'avatar-2.svg',
    name: 'Cosmic Violet',
    gradient: ['#e0e7ff', '#6366f1'],
    accent: '#8b5cf6',
    emoji: '🚀',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#g2)"/>
  <circle cx="60" cy="52" r="28" fill="#fdf4ff"/>
  <rect x="42" y="44" width="36" height="14" rx="7" fill="#18181b"/>
  <rect x="45" y="47" width="13" height="8" rx="4" fill="#a855f7"/>
  <rect x="62" y="47" width="13" height="8" rx="4" fill="#a855f7"/>
  <path d="M54 66q6 5 12 0" stroke="#18181b" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M32 110c0-16 13-28 28-28s28 12 28 28" fill="#fdf4ff"/>
</svg>`
  },
  {
    file: 'avatar-3.svg',
    name: 'Electric Cyan',
    gradient: ['#cffafe', '#06b6d4'],
    accent: '#06b6d4',
    emoji: '🎧',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#g3)"/>
  <path d="M36 50a24 24 0 0 1 48 0" stroke="#1e293b" stroke-width="6" fill="none" stroke-linecap="round"/>
  <rect x="30" y="46" width="10" height="20" rx="5" fill="#facc15"/>
  <rect x="80" y="46" width="10" height="20" rx="5" fill="#facc15"/>
  <circle cx="60" cy="56" r="24" fill="#f0fdfa"/>
  <circle cx="52" cy="54" r="3" fill="#0f172a"/>
  <circle cx="68" cy="54" r="3" fill="#0f172a"/>
  <path d="M55 64q5 4 10 0" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M34 110c0-15 12-26 26-26s26 11 26 26" fill="#f0fdfa"/>
</svg>`
  },
  {
    file: 'avatar-4.svg',
    name: 'Emerald Gamer',
    gradient: ['#d1fae5', '#10b981'],
    accent: '#10b981',
    emoji: '🎮',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#g4)"/>
  <circle cx="60" cy="52" r="28" fill="#f0fdf4"/>
  <path d="M46 36q14-8 28 0" stroke="#047857" stroke-width="5" stroke-linecap="round" fill="none"/>
  <circle cx="50" cy="50" r="3.5" fill="#064e3b"/>
  <circle cx="70" cy="50" r="3.5" fill="#064e3b"/>
  <path d="M53 62q7 6 14 0" stroke="#064e3b" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M32 110c0-16 13-28 28-28s28 12 28 28" fill="#f0fdf4"/>
  <polygon points="56,76 64,76 60,70" fill="#f59e0b"/>
</svg>`
  },
  {
    file: 'avatar-5.svg',
    name: 'Sunset Coral',
    gradient: ['#ffe4e6', '#f43f5e'],
    accent: '#f43f5e',
    emoji: '✨',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fb7185"/>
      <stop offset="100%" stop-color="#e11d48"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#g5)"/>
  <circle cx="60" cy="52" r="28" fill="#fff1f2"/>
  <path d="M48 48l2-5 2 5 5 2-5 2-2 5-2-5-5-2z" fill="#f43f5e"/>
  <path d="M72 48l2-5 2 5 5 2-5 2-2 5-2-5-5-2z" fill="#f43f5e"/>
  <path d="M53 64q7 5 14 0" stroke="#be123c" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M32 110c0-16 13-28 28-28s28 12 28 28" fill="#fff1f2"/>
</svg>`
  },
  {
    file: 'avatar-6.svg',
    name: 'Golden Crown',
    gradient: ['#fef3c7', '#f59e0b'],
    accent: '#f59e0b',
    emoji: '👑',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#g6)"/>
  <polygon points="42,32 50,42 60,30 70,42 78,32 76,46 44,46" fill="#fef08a"/>
  <circle cx="60" cy="60" r="24" fill="#fffbeb"/>
  <circle cx="52" cy="58" r="3" fill="#78350f"/>
  <circle cx="68" cy="58" r="3" fill="#78350f"/>
  <path d="M54 68q6 4 12 0" stroke="#78350f" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M34 110c0-15 12-25 26-25s26 10 26 25" fill="#fffbeb"/>
</svg>`
  },
  {
    file: 'avatar-7.svg',
    name: 'Midnight Star',
    gradient: ['#1e1b4b', '#0f172a'],
    accent: '#f97316',
    emoji: '⭐',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g7" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#g7)"/>
  <circle cx="60" cy="52" r="28" fill="#f8fafc"/>
  <polygon points="60,18 64,28 74,29 66,36 69,46 60,40 51,46 54,36 46,29 56,28" fill="#f97316"/>
  <circle cx="50" cy="54" r="3.5" fill="#0f172a"/>
  <circle cx="70" cy="54" r="3.5" fill="#0f172a"/>
  <path d="M53 66q7 5 14 0" stroke="#0f172a" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M32 110c0-16 13-28 28-28s28 12 28 28" fill="#f8fafc"/>
</svg>`
  },
  {
    file: 'avatar-8.svg',
    name: 'Rose Chic',
    gradient: ['#fce7f3', '#ec4899'],
    accent: '#ec4899',
    emoji: '💖',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g8" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f472b6"/>
      <stop offset="100%" stop-color="#db2777"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#g8)"/>
  <circle cx="60" cy="52" r="28" fill="#fdf2f8"/>
  <path d="M43 45q4-4 8 0t-8 8q-4-4 0-8z M69 45q4-4 8 0t-8 8q-4-4 0-8z" fill="#db2777"/>
  <path d="M54 65q6 5 12 0" stroke="#be185d" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M32 110c0-16 13-28 28-28s28 12 28 28" fill="#fdf2f8"/>
</svg>`
  },
  {
    file: 'avatar-9.svg',
    name: 'Tokyo Neon',
    gradient: ['#3b82f6', '#ec4899'],
    accent: '#a855f7',
    emoji: '🕶️',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g9" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="50%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#g9)"/>
  <circle cx="60" cy="52" r="28" fill="#18181b"/>
  <rect x="42" y="44" width="36" height="12" rx="3" fill="#22d3ee"/>
  <line x1="42" y1="50" x2="78" y2="50" stroke="#fff" stroke-width="1.5"/>
  <path d="M54 66q6 4 12 0" stroke="#f472b6" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M32 110c0-16 13-28 28-28s28 12 28 28" fill="#18181b"/>
</svg>`
  },
  {
    file: 'avatar-10.svg',
    name: 'Zen Mint',
    gradient: ['#ccfbf1', '#14b8a6'],
    accent: '#14b8a6',
    emoji: '🌱',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g10" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14b8a6"/>
      <stop offset="100%" stop-color="#0f766e"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#g10)"/>
  <circle cx="60" cy="54" r="26" fill="#f0fdfa"/>
  <path d="M40 38c0-10 9-18 20-18s20 8 20 18z" fill="#0f766e"/>
  <rect x="36" y="36" width="48" height="6" rx="3" fill="#115e59"/>
  <circle cx="51" cy="54" r="3" fill="#134e4a"/>
  <circle cx="69" cy="54" r="3" fill="#134e4a"/>
  <path d="M54 64q6 4 12 0" stroke="#134e4a" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M34 110c0-15 12-25 26-25s26 10 26 25" fill="#f0fdfa"/>
</svg>`
  },
  {
    file: 'avatar-11.svg',
    name: 'Blaze Tiger',
    gradient: ['#fef08a', '#ea580c'],
    accent: '#ea580c',
    emoji: '🐯',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g11" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#g11)"/>
  <circle cx="40" cy="34" r="10" fill="#ea580c"/>
  <circle cx="80" cy="34" r="10" fill="#ea580c"/>
  <circle cx="60" cy="54" r="28" fill="#ffedd5"/>
  <polygon points="56,32 64,32 60,40" fill="#9a3412"/>
  <polygon points="46,38 52,42 46,44" fill="#9a3412"/>
  <polygon points="74,38 68,42 74,44" fill="#9a3412"/>
  <circle cx="50" cy="52" r="3.5" fill="#7c2d12"/>
  <circle cx="70" cy="52" r="3.5" fill="#7c2d12"/>
  <polygon points="57,60 63,60 60,64" fill="#7c2d12"/>
  <path d="M53 68q7 4 14 0" stroke="#7c2d12" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M32 110c0-16 13-28 28-28s28 12 28 28" fill="#ffedd5"/>
</svg>`
  },
  {
    file: 'avatar-12.svg',
    name: 'Aqua Wave',
    gradient: ['#bae6fd', '#0284c7'],
    accent: '#0284c7',
    emoji: '🌊',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g12" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#g12)"/>
  <path d="M42 36c6-10 30-10 36 0l14 4-20 4-30-8z" fill="#0284c7"/>
  <circle cx="60" cy="54" r="26" fill="#f0f9ff"/>
  <circle cx="51" cy="52" r="3" fill="#0c4a6e"/>
  <circle cx="69" cy="52" r="3" fill="#0c4a6e"/>
  <path d="M54 64q6 4 12 0" stroke="#0c4a6e" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M34 110c0-15 12-25 26-25s26 10 26 25" fill="#f0f9ff"/>
</svg>`
  }
];

avatars.forEach(av => {
  fs.writeFileSync(path.join(avatarsDir, av.file), av.svg.trim());
});

console.log(`Successfully generated ${avatars.length} SVG avatars in ${avatarsDir}`);
