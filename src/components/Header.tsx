import Link from "next/link";

export default function Header() {
  return (
    <header className="py-12 flex flex-col items-center text-center">
      <Link href="/" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black">
          <span className="text-xl font-bold">⚡</span>
        </div>
        <span className="text-xl font-bold tracking-tight">The Plugd</span>
      </Link>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Get Found. Grow Your Network.
      </h1>
      <p className="text-muted text-lg md:text-xl">
        The directory for X builders, founders and creators.
      </p>
    </header>
  );
}
