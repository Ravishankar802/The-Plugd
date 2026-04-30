import Link from "next/link";

export default function Header() {
  return (
    <header className="py-12 flex flex-col items-center text-center">
      <Link href="/" className="flex items-center gap-3 mb-8 hover:opacity-80 transition-opacity">
        <span className="text-4xl">⚡</span>
        <span className="text-3xl font-[800] tracking-[-0.02em] text-foreground">The Plugd</span>
      </Link>
      <h1 className="text-[clamp(1.75rem,4.5vw,2.85rem)] font-[800] tracking-[-0.035em] leading-[1.1] text-foreground mb-4">
        Get seen. Get followed. Blow up on X.
      </h1>
      <p className="text-muted text-[1.25rem] font-normal max-w-2xl leading-relaxed mx-auto">
        <span className="wave mr-2">👋</span>
        $1 to get listed and get more followers, more impressions, more growth — or keep posting into the void.
      </p>
    </header>
  );
}
