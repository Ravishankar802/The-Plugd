import Link from "next/link";

export default function Header() {
  return (
    <header className="py-12 flex flex-col items-center text-center">
      <Link href="/" className="flex items-center gap-4 mb-8 hover:opacity-80 transition-opacity group">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg viewBox="0 0 40 40" className="w-full h-full fill-none stroke-[#ff6b00] stroke-[1.5]">
            {/* Connections */}
            <line x1="20" y1="20" x2="8" y2="8" className="opacity-60" />
            <line x1="20" y1="20" x2="32" y2="8" className="opacity-60" />
            <line x1="20" y1="20" x2="37" y2="25" className="opacity-60" />
            <line x1="20" y1="20" x2="25" y2="37" className="opacity-60" />
            <line x1="20" y1="20" x2="3" y2="28" className="opacity-60" />
            
            {/* Nodes (Static) */}
            <circle cx="20" cy="20" r="5" className="fill-[#ff6b00] stroke-none" />
            <circle cx="8" cy="8" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
            <circle cx="32" cy="8" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
            <circle cx="37" cy="25" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
            <circle cx="25" cy="37" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
            <circle cx="3" cy="28" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
          </svg>
        </div>
        <span className="text-3xl font-[800] tracking-[-0.02em] text-foreground">The Plugd</span>
      </Link>
      <h1 className="text-[clamp(1.75rem,4.5vw,2.85rem)] font-[800] tracking-[-0.035em] leading-[1.1] text-foreground mb-4">
        Get seen. Get followed. Blow up on X.
      </h1>
      <p className="text-muted text-[1.25rem] font-normal max-w-2xl leading-relaxed mx-auto">
        <span className="wave mr-2">👋</span>
        $1 to get listed and get more followers, more impressions,<br />
        more growth — or keep posting into the void.
      </p>
    </header>
  );
}
