"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Monitor, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface FooterProps {
  showBorder?: boolean;
}

export default function Footer({ showBorder = true }: FooterProps) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const themeOptions = [
    { name: "light", label: "Light", icon: Sun },
    { name: "dark", label: "Dark", icon: Moon },
    { name: "system", label: "System", icon: Monitor },
  ];

  const currentThemeOption = themeOptions.find(opt => opt.name === theme) || themeOptions[2];
  const CurrentIcon = currentThemeOption.icon;

  const isPublicPage = pathname?.startsWith("/@");

  if (isPublicPage) {
    return null; // Public creator pages render their own simplified brand footer
  }

  return (
    <footer className={`w-full bg-zinc-950 border-t ${showBorder ? "border-zinc-900" : "border-transparent"} py-8 font-sans`}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand info & Links */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs text-zinc-500 font-medium">
          <span>© {new Date().getFullYear()} Plugd Inc.</span>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <Link href="/dashboard" className="hover:text-zinc-300 transition-colors">Dashboard</Link>
            <Link href="/terms-of-service" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
            <a href="mailto:support@theplugd.com" className="hover:text-zinc-300 transition-colors">Contact</a>
          </div>
        </div>

        {/* Right: Theme Toggle */}
        {hasMounted && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 px-3 py-1.5 rounded-xl text-xs text-zinc-400 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <CurrentIcon className="w-3.5 h-3.5" />
                <span className="font-semibold capitalize">{theme === "system" ? "System" : theme}</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <div className="absolute bottom-full right-0 mb-1.5 w-32 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl z-50 p-1 animate-in fade-in slide-in-from-bottom-1">
                {themeOptions.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setTheme(item.name);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold transition-colors rounded-lg text-left ${
                      theme === item.name ? "bg-zinc-850 text-zinc-100" : "text-zinc-450 hover:bg-zinc-850/50 hover:text-zinc-200"
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
      </div>
    </footer>
  );
}
