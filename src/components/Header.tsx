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
    <header className="sticky top-0 left-0 w-full z-50 bg-[#09090b]/95 backdrop-blur-md border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] h-16 md:h-20 flex items-center justify-between">
      {/* LEFT: Logo */}
      <div className="flex items-center pl-4 md:pl-8 h-full">
        <Link href="/" className="hover:scale-105 active:scale-95 transition-transform duration-200">
          <Image src="/logo.png" alt="Plugd Logo" width={80} height={80} className="w-12 h-12 md:w-20 md:h-20" />
        </Link>
      </div>

      {/* RIGHT: Navigation & Dashboard */}
      <div className="h-full flex items-center">
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 mr-8">
          <Link 
            href="/resources" 
            className="text-zinc-100 hover:text-[#16a34a] font-normal text-base md:text-lg transition-colors duration-200"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            Resources
          </Link>
          <button 
            onClick={() => scrollToSection("calculator")} 
            className="text-zinc-100 hover:text-[#16a34a] font-normal text-base md:text-lg transition-colors duration-200 cursor-pointer"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            Calculate
          </button>
          <button 
            onClick={() => scrollToSection("how-it-works")} 
            className="text-zinc-100 hover:text-[#16a34a] font-normal text-base md:text-lg transition-colors duration-200 cursor-pointer"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            How It Works
          </button>
        </nav>

        {/* Mobile menu link for Resources */}
        <Link 
          href="/resources" 
          className="md:hidden text-sm font-normal text-zinc-100 hover:text-[#16a34a] px-4 py-2 mr-2"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          Resources
        </Link>

        {/* Dashboard Block Button */}
        <Link 
          href="/vault" 
          className="h-full bg-[#16a34a] text-black font-normal text-base md:text-lg px-8 md:px-12 flex items-center justify-center border-l border-white/10 hover:bg-[#16a34a]/90 hover:scale-[1.02] active:scale-100 transition-all duration-150"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
          Dashboard
        </Link>
      </div>
    </header>
  );
}
