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
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

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

  return (
    <footer className={`${isDashboard ? "py-10" : "py-20"} ${showBorder ? "border-t border-border" : ""}`}>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 relative">
        {isDashboard ? (
          <>
            {/* Dashboard style: Centered Home */}
            <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center justify-center gap-6 text-[0.9rem] text-muted font-medium">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            </div>
            <div className="hidden md:block flex-1" />
          </>
        ) : (
          /* Default style: Minimal row on mobile, links on left on desktop */
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-sm md:text-[0.9rem] text-muted font-medium w-full md:w-auto">
            <div className="md:hidden flex items-center justify-center gap-2 whitespace-nowrap">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="opacity-40">·</span>
              <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
              <span className="opacity-40">·</span>
              <Link href="/terms-of-service" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
              <Link href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        )}

        {hasMounted && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              suppressHydrationWarning
              className="flex items-center gap-2 bg-pill border border-border hover:bg-accent px-3.5 py-1.5 rounded-2xl text-[0.9rem] text-muted transition-colors"
            >
              <div className="flex items-center gap-2">
                <CurrentIcon className="w-4 h-4" />
                <span className="font-medium capitalize">{theme === "system" ? "System" : theme}</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <div className="absolute bottom-full left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 mb-2 w-32 bg-card border border-border rounded-xl overflow-hidden shadow-2xl z-50 p-1 animate-in fade-in slide-in-from-bottom-2">
                {themeOptions.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setTheme(item.name);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors rounded-lg text-left ${
                      theme === item.name ? "bg-accent text-foreground" : "text-muted hover:bg-accent/50 hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span className="font-medium">{item.label}</span>
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
