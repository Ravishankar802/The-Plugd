import Link from "next/link";

const HASHTAGS = [
  { text: "#BuildInPublic", top: "15%", left: "8%", size: "1.2rem", rotate: "-12deg" },
  { text: "#LetsConnect", top: "45%", left: "12%", size: "0.95rem", rotate: "8deg" },
  { text: "#Solopreneur", top: "75%", left: "5%", size: "1.3rem", rotate: "-5deg" },
  { text: "#Networking", top: "25%", left: "15%", size: "1.1rem", rotate: "15deg" },
  { text: "#SaaS", top: "60%", left: "10%", size: "1.4rem", rotate: "-10deg" },
  { text: "#Hustle", top: "10%", left: "18%", size: "0.9rem", rotate: "10deg" },
  
  { text: "#PersonalBrand", top: "20%", right: "8%", size: "1.25rem", rotate: "12deg" },
  { text: "#BuildInPublic", top: "50%", right: "12%", size: "1.1rem", rotate: "-8deg" },
  { text: "#LetsConnect", top: "80%", right: "5%", size: "0.95rem", rotate: "5deg" },
  { text: "#Solopreneur", top: "30%", right: "15%", size: "1.4rem", rotate: "-15deg" },
  { text: "#SaaS", top: "65%", right: "10%", size: "1.2rem", rotate: "10deg" },
  { text: "#Networking", top: "15%", right: "18%", size: "1rem", rotate: "-10deg" },
];

export default function Header() {
  return (
    <header className="py-12 flex flex-col items-center text-center relative overflow-hidden">
      {/* Background Hashtags */}
      <div className="absolute inset-0 pointer-events-none select-none hidden md:block">
        {HASHTAGS.map((tag, i) => (
          <span
            key={i}
            className="absolute font-mono-custom font-[500] text-foreground opacity-[0.05] dark:opacity-[0.05] light:opacity-[0.04] transition-opacity"
            style={{
              top: tag.top,
              left: tag.left,
              right: tag.right,
              fontSize: tag.size,
              transform: `rotate(${tag.rotate})`,
            }}
          >
            {tag.text}
          </span>
        ))}
      </div>

      <Link href="/" className="flex items-center gap-4 mb-8 hover:opacity-80 transition-opacity group relative z-10">
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
        <span className="text-3xl font-[800] tracking-[-0.02em] text-[#52525b]">Plugd</span>
      </Link>
      <h1 className="text-[clamp(1.75rem,4.5vw,2.85rem)] font-[800] tracking-[-0.035em] leading-[1.1] text-foreground mb-4 relative z-10">
        Get seen. Get followed. Blow up on X.
      </h1>
      <p className="text-muted text-[1.25rem] font-normal max-w-2xl leading-relaxed mx-auto relative z-10">
        $1 to get listed and get more followers, more impressions, more growth.<br />
        Or keep posting into the void.
      </p>
    </header>
  );
}
