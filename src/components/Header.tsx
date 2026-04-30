import Link from "next/link";

export default function Header() {
  return (
    <header className="py-12 flex flex-col items-center text-center">
      <Link href="/" className="flex items-center gap-4 mb-8 hover:opacity-80 transition-opacity group">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg viewBox="0 0 40 40" className="w-full h-full fill-none stroke-[#ff6b00] stroke-2">
            {/* Connections */}
            <line x1="20" y1="20" x2="10" y2="10" className="signal-line" style={{ animationDuration: '2.1s', animationDelay: '0s' }} />
            <line x1="20" y1="20" x2="30" y2="10" className="signal-line" style={{ animationDuration: '1.8s', animationDelay: '0.4s' }} />
            <line x1="20" y1="20" x2="35" y2="25" className="signal-line" style={{ animationDuration: '2.4s', animationDelay: '1.2s' }} />
            <line x1="20" y1="20" x2="25" y2="35" className="signal-line" style={{ animationDuration: '1.9s', animationDelay: '0.7s' }} />
            <line x1="20" y1="20" x2="5" y2="28" className="signal-line" style={{ animationDuration: '2.2s', animationDelay: '1.5s' }} />
            
            {/* Nodes (Static) */}
            <circle cx="20" cy="20" r="3" className="fill-[#ff6b00] stroke-none" />
            <circle cx="10" cy="10" r="2.5" className="fill-[#ff6b00] stroke-none opacity-80" />
            <circle cx="30" cy="10" r="2.5" className="fill-[#ff6b00] stroke-none opacity-80" />
            <circle cx="35" cy="25" r="2.5" className="fill-[#ff6b00] stroke-none opacity-80" />
            <circle cx="25" cy="35" r="2.5" className="fill-[#ff6b00] stroke-none opacity-80" />
            <circle cx="5" cy="28" r="2.5" className="fill-[#ff6b00] stroke-none opacity-80" />
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
