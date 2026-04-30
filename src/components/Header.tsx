import Link from "next/link";

export default function Header() {
  return (
    <header className="py-12 flex flex-col items-center text-center">
      <Link href="/" className="flex items-center gap-3 mb-8 hover:opacity-80 transition-opacity">
        <span className="text-4xl">⚡</span>
        <span className="text-3xl font-[800] tracking-[-0.02em] text-foreground">The Plugd</span>
      </Link>
      <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] font-[800] tracking-[-0.03em] leading-[1.1] text-foreground mb-4">
        Get Found. Grow Your Network.
      </h1>
      <p className="text-muted text-[1.1rem] font-normal">
        The directory for X builders, founders and creators.
      </p>
    </header>
  );
}
