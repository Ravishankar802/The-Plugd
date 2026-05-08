"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Plus, LayoutDashboard, ExternalLink } from "lucide-react";
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

  const maxFollowers = Math.max(...followerStats.map(s => s.count), 1);
  const maxNiches = Math.max(...nicheStats.map(s => s.count), 1);

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-12 flex flex-col items-center">
        
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
          {totalCount} Accounts Statistics
        </h1>
        <p className="text-muted text-center mb-12 text-lg">
          Live data from {totalCount} accounts listed on Plugd
        </p>

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
          <div className="ticker-container w-full max-w-5xl bg-[#111] border border-border rounded-[10px] overflow-hidden py-3 mb-12 cursor-default">
            <div className="ticker-content flex items-center gap-12 px-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 shrink-0">
                  <span className="text-[#f97316] text-xl leading-none">●</span>
                  <span className="text-white font-medium text-[15px] tracking-wide">
                    Add or claim your account for $1 to track, save and skip X accounts
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Card 1: X Followers Distribution */}
          <div className="bg-[#161616] border border-border rounded-2xl p-6 shadow-xl">
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
          <div className="bg-[#161616] border border-border rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-foreground">Niche</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {nicheStats.map((stat) => {
                const percentage = totalCount > 0 ? (stat.count / totalCount) * 100 : 0;
                return (
                  <div key={stat.niche} className="flex items-center gap-4">
                    <span className="w-32 text-sm text-muted font-medium shrink-0 truncate">{stat.niche}</span>
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

        </div>

        <Footer />
      </div>

      <AddAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
