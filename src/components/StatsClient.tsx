"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Plus, LayoutDashboard } from "lucide-react";
import Footer from "@/components/Footer";
import AddAccountModal from "@/components/AddAccountModal";

interface StatsClientProps {
  totalCount: number;
  followerStats: { range: string; count: number }[];
  nicheStats: { niche: string; count: number }[];
  isPaidUser: boolean;
  userEmail: string | null;
}

export default function StatsClient({ 
  totalCount, 
  followerStats, 
  nicheStats, 
  isPaidUser, 
  userEmail 
}: StatsClientProps) {
  const router = useRouter();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leftCardHeight, setLeftCardHeight] = useState<number | null>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (leftCardRef.current) {
      setLeftCardHeight(leftCardRef.current.clientHeight);
    }
    
    // Update on resize
    const handleResize = () => {
      if (leftCardRef.current) {
        setLeftCardHeight(leftCardRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 pt-12 flex flex-col items-center">
        
        {/* Header (Same as Login Logo style) */}
        <Link href="/" className="flex items-center gap-4 mb-8 hover:opacity-80 transition-opacity group">
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
          <span className="text-3xl font-[800] tracking-[-0.02em] text-foreground transition-all">Plugd</span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 tracking-tight">
          Accounts Statistics
        </h1>
        
        {/* Live Counter (Same as Homepage) */}
        <div className="w-full flex flex-col items-center justify-center my-8 animate-in fade-in slide-in-from-top-2 duration-500">
          <span className="font-mono text-[0.7rem] text-muted uppercase tracking-[0.08em] font-[700] mb-1">
            TOTAL ACCOUNTS LISTED
          </span>
          <div className="flex flex-col items-center gap-1">
            <span className="text-foreground text-[40px] md:text-[56px] font-bold leading-none">
              {totalCount}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#f97316] pulse" />
              <span className="text-[#f97316] text-[0.875rem] font-medium">live</span>
            </div>
          </div>
        </div>

        {/* Action Row (Search bar + Buttons) */}
        <div className="w-full max-w-[800px] flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search accounts or names..."
              className="w-full h-[48px] bg-pill border border-border rounded-lg pl-12 pr-4 text-foreground placeholder:text-[#6b7280] focus:outline-none focus:ring-1 focus:ring-border transition-all"
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push(`/?q=${encodeURIComponent(localSearchQuery)}`);
                }
              }}
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="h-[48px] w-full md:w-auto bg-selected border border-selected text-selected-foreground font-[600] px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-selected/90 active:scale-[0.98] shadow-lg cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Add Account
          </button>
          <button
            onClick={() => router.push(userEmail ? "/dashboard" : "/login")}
            className="h-[48px] w-full md:w-auto bg-pill border border-border text-foreground font-[600] px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-accent active:scale-[0.98] shadow-lg cursor-pointer"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
        </div>

        {/* Ad Ticker */}
        {!isPaidUser && (
          <div className="ticker-container w-full max-w-5xl bg-card border border-border rounded-[10px] overflow-hidden py-3 mb-12 cursor-default">
            <div className="ticker-content flex items-center gap-12 px-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 shrink-0">
                  <span className="text-[#f97316] text-xl leading-none">●</span>
                  <span className="text-foreground font-medium text-[15px] tracking-wide">
                    1,000 referrals = $1,000. 10,000 referrals = $10,000. Start earning big.
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 items-start">
          
          {/* Card 1: X Followers Distribution */}
          <div ref={leftCardRef} className="bg-card border border-border rounded-2xl p-6 shadow-xl h-fit">
            <h2 className="text-xl font-bold mb-6 text-foreground">X Followers</h2>
            <div className="space-y-4">
              {followerStats.map((stat) => {
                const percentage = totalCount > 0 ? (stat.count / totalCount) * 100 : 0;
                return (
                  <div key={stat.range} className="flex items-center gap-4">
                    <span className="w-24 text-sm text-muted font-medium shrink-0">{stat.range}</span>
                    <div className="flex-1 h-2 bg-pill rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#f97316] transition-all duration-1000 ease-out" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-28 text-sm text-right font-mono-custom flex justify-end gap-2 shrink-0">
                      <span className="text-foreground font-bold">{percentage.toFixed(1)}%</span>
                      <span className="text-muted">({stat.count})</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: Niche Distribution */}
          <div 
            className="bg-card border border-border rounded-2xl p-6 shadow-xl flex flex-col"
            style={{ height: leftCardHeight ? `${leftCardHeight}px` : 'auto' }}
          >
            <h2 className="text-xl font-bold mb-6 text-foreground">Niche</h2>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div>
                {nicheStats.map((stat) => (
                  <div key={stat.niche} className="flex items-center justify-between border-b border-white/5 last:border-0 py-2.5">
                    <span className="text-[0.9rem] text-muted font-medium">{stat.niche}</span>
                    <span className="text-[0.9rem] font-mono-custom font-bold text-foreground">{stat.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 mt-auto">
        <Footer />
      </div>

      <AddAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
