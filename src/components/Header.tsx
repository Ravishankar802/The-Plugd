"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, LogIn, Menu, X, User } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ email: string; isPaid: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to check auth:", err);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("plugd_user_email");
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="pt-4 pb-0 flex flex-col relative overflow-hidden">
      {/* Navigation Row */}
      <div className="w-full flex items-center justify-between py-4 mb-8 relative z-[100]">
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 bg-selected rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-selected-foreground font-black text-lg italic tracking-tighter">P</span>
          </div>
          <span className="text-xl font-black italic tracking-tighter text-foreground group-hover:text-glow transition-all">PLUGD</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          {loading ? (
            <div className="h-10 w-24 bg-card animate-pulse rounded-lg" />
          ) : user ? (
            <>
              <div className="flex items-center gap-2 mr-2 px-3 py-1 rounded-full bg-accent/50 border border-border">
                <div className="w-1.5 h-1.5 rounded-full bg-selected animate-pulse" />
                <span className="text-[0.7rem] font-medium text-muted truncate max-w-[120px]">{user.email}</span>
              </div>
              <Link 
                href="/dashboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm ${
                  pathname === "/dashboard" 
                    ? "bg-selected text-selected-foreground" 
                    : "bg-card text-foreground hover:bg-accent border border-border"
                }`}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card text-muted hover:text-red-500 hover:bg-red-500/10 border border-border font-bold text-sm transition-all shadow-sm cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <Link 
              href="/login"
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-selected text-selected-foreground font-bold text-sm transition-all hover:bg-selected/90 shadow-lg"
            >
              <LogIn size={16} />
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 left-0 mt-2 p-4 bg-pill border border-border rounded-xl shadow-2xl z-[200] md:hidden animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col gap-2">
              {user ? (
                <>
                  <div className="text-xs font-medium text-muted p-2 truncate">{user.email}</div>
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg bg-selected text-selected-foreground font-bold">
                    <LayoutDashboard size={20} /> Dashboard
                  </Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border text-red-500 font-bold">
                    <LogOut size={20} /> Logout
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-4 rounded-lg bg-selected text-selected-foreground font-bold justify-center">
                  <LogIn size={20} /> Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center">
        <Link href="/" className="flex items-center gap-4 mb-8 hover:opacity-80 transition-opacity group relative z-10">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-full h-full fill-none stroke-[#ff6b00] stroke-[1.5]">
              <line x1="20" y1="20" x2="8" y2="8" className="opacity-60" />
              <line x1="20" y1="20" x2="32" y2="8" className="opacity-60" />
              <line x1="20" y1="20" x2="37" y2="25" className="opacity-60" />
              <line x1="20" y1="20" x2="25" y2="37" className="opacity-60" />
              <line x1="20" y1="20" x2="3" y2="28" className="opacity-60" />
              <circle cx="20" cy="20" r="5" className="fill-[#ff6b00] stroke-none" />
              <circle cx="8" cy="8" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
              <circle cx="32" cy="8" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
              <circle cx="37" cy="25" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
              <circle cx="25" cy="37" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
              <circle cx="3" cy="28" r="2.5" className="fill-[#ff6b00] stroke-none opacity-90" />
            </svg>
          </div>
          <span className="text-3xl font-[800] tracking-[-0.02em] text-foreground">Plugd</span>
        </Link>
        <h1 className="text-[clamp(1.75rem,4.5vw,2.85rem)] font-[800] tracking-[-0.035em] leading-[1.1] text-foreground mb-4 relative z-10">
          Just follow each other and Grow on X
        </h1>
        <p className="text-muted text-[0.875rem] md:text-[1.25rem] font-normal max-w-[340px] md:max-w-2xl leading-tight md:leading-relaxed mx-auto relative z-10 px-4">
          Pay $1 to get listed and gain access to the Status feature. If you are already on the list, pay $1 to claim your account and gain access to the Status feature.
        </p>
      </div>
    </header>
  );
}
