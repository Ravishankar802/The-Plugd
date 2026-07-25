"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-200/10 dark:border-zinc-800/40 h-16 md:h-20 flex items-center justify-between">
      {/* LEFT: Logo & Brand */}
      <div className="flex items-center gap-4 pl-4 md:pl-8 h-full">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image src="/logo.png" alt="Plugd Logo" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10" />
          <span className="text-foreground font-black text-lg md:text-xl tracking-tight" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
            plugd
          </span>
        </Link>
        
        {/* Pill Badge */}
        <div className="hidden sm:flex items-center bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
          ★ Active
        </div>
      </div>

      {/* CENTER: Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted/80">
        <Link href="/resources" className="hover:text-foreground transition-colors">
          Resources
        </Link>
        <button 
          onClick={() => scrollToSection("calculator")} 
          className="hover:text-foreground transition-colors cursor-pointer font-semibold"
        >
          Calculate
        </button>
        <button 
          onClick={() => scrollToSection("how-it-works")} 
          className="hover:text-foreground transition-colors cursor-pointer font-semibold"
        >
          How It Works
        </button>
      </nav>

      {/* RIGHT: Dashboard Block Button */}
      <div className="h-full flex items-center">
        {/* Mobile menu link for Resources */}
        <Link 
          href="/resources" 
          className="md:hidden text-xs font-bold text-muted hover:text-foreground px-4 py-2 mr-2"
        >
          Resources
        </Link>
        <Link 
          href="/vault" 
          className="h-full bg-[#16a34a] text-black font-extrabold text-xs md:text-sm uppercase tracking-wider px-6 md:px-10 flex items-center justify-center border-l border-zinc-200/10 dark:border-zinc-800/40 hover:bg-[#16a34a]/90 transition-colors"
          style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
        >
          Dashboard
        </Link>
      </div>
    </header>
  );
}
