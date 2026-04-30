"use client";

import Link from "next/link";
import { Moon, Sun, Monitor, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [theme, setTheme] = useState("Dark");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="mt-auto py-12 border-t border-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-sm text-muted">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#222] px-3 py-1.5 rounded-lg text-sm transition-colors"
          >
            <Moon className="w-4 h-4" />
            <span>{theme}</span>
            <ChevronDown className="w-4 h-4 text-muted" />
          </button>

          {isOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-32 bg-[#1a1a1a] border border-border rounded-lg overflow-hidden shadow-xl z-50">
              {["Dark", "Light", "System"].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTheme(t);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#222] transition-colors"
                >
                  {t === "Dark" && <Moon className="w-4 h-4" />}
                  {t === "Light" && <Sun className="w-4 h-4" />}
                  {t === "System" && <Monitor className="w-4 h-4" />}
                  <span>{t}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
