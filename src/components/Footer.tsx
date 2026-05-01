"use client";

import Link from "next/link";
import { Moon, Sun, Monitor, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface FooterProps {
  showBorder?: boolean;
}

export default function Footer({ showBorder = true }: FooterProps) {
  const [theme, setTheme] = useState("Dark");
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <footer className={`mt-auto py-8 ${showBorder ? "border-t border-border" : ""}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-[0.875rem] text-muted">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
          <Link href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>

        {hasMounted && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              suppressHydrationWarning
              className="flex items-center gap-2 bg-transparent border border-border hover:bg-accent px-4 py-2 rounded-lg text-sm text-muted transition-colors"
            >
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4" />
                <span>{theme}</span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-28 bg-card border border-border rounded-xl overflow-hidden shadow-2xl z-50 p-1">
                {[
                  { name: "Dark", icon: Moon },
                  { name: "Light", icon: Sun },
                  { name: "System", icon: Monitor },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setTheme(item.name);
                      setIsOpen(false);
                      if (item.name === "Light") document.documentElement.classList.remove("dark");
                      if (item.name === "Dark") document.documentElement.classList.add("dark");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-accent transition-colors rounded-lg text-left"
                  >
                    <item.icon className="w-4 h-4 text-muted shrink-0" />
                    <span className="font-semibold">{item.name}</span>
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
