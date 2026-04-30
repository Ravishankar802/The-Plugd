"use client";

import Link from "next/link";
import { Moon, Sun, Monitor, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [theme, setTheme] = useState("Dark");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="mt-auto py-8 border-t border-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-[0.875rem] text-muted">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-transparent border border-border hover:bg-accent px-3 py-1.5 rounded-lg text-sm text-muted transition-colors"
          >
            <Moon className="w-4 h-4" />
            <span>{theme}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-36 bg-card border border-border rounded-xl overflow-hidden shadow-2xl z-50 p-1">
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
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted hover:bg-accent hover:text-foreground transition-colors rounded-lg text-left"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
