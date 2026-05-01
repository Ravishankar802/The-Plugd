"use client";
 
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, TrendingUp, Sliders, Check } from "lucide-react";
 
interface Account {
  id: number;
  name: string;
  xHandle: string;
  avatarPath: string;
  bio: string;
  niche: string;
  followersRange: string;
  createdAt?: string;
}
 
interface DirectoryTableProps {
  accounts: Account[];
  isLoading?: boolean;
  selectedFollowersRange: string;
  setSelectedFollowersRange: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  onShuffle: () => void;
}
 
const FOLLOWERS_RANGES = [
  "All Followers", "0-100", "100-500", "500-1K", "1K-2K", "2K-5K", "5K-10K", "10K-25K", "25K-50K", "50K-100K", "100K+"
];
 
const SORT_OPTIONS = ["Latest", "Oldest", "Shuffle"];
 
export default function DirectoryTable({ 
  accounts, 
  isLoading, 
  selectedFollowersRange, 
  setSelectedFollowersRange, 
  sortBy, 
  setSortBy,
  onShuffle
}: DirectoryTableProps) {
  const [followersOpen, setFollowersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  
  const followersRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (followersRef.current && !followersRef.current.contains(event.target as Node)) {
        setFollowersOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  return (
    <div className="w-full bg-card rounded-2xl border border-border overflow-hidden mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
        <h2 className="text-[1.25rem] font-[700] text-foreground text-glow">Index</h2>
        
        <div className="flex items-center gap-2.5">
          {/* Followers Range Dropdown */}
          <div className="relative" ref={followersRef}>
            <button 
              onClick={() => {
                setFollowersOpen(!followersOpen);
                setSortOpen(false);
              }}
              suppressHydrationWarning
              className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors bg-transparent px-3 py-1.5 rounded-lg border border-border text-glow"
            >
              <Sliders className="w-4 h-4" />
              {selectedFollowersRange === "All Followers" ? "Followers Range" : selectedFollowersRange}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${followersOpen ? "rotate-180" : ""}`} />
            </button>
 
            {followersOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg shadow-xl z-50 py-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {FOLLOWERS_RANGES.map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setSelectedFollowersRange(range);
                      setFollowersOpen(false);
                    }}
                    suppressHydrationWarning
                    className="flex items-center justify-between w-full px-4 py-2.5 text-[0.9rem] text-[#f5f5f5] hover:bg-[#2a2a2a] transition-colors text-left"
                  >
                    <span>{range}</span>
                    {selectedFollowersRange === range && <Check className="w-3.5 h-3.5 text-foreground" />}
                  </button>
                ))}
              </div>
            )}
          </div>
 
          {/* Sort Dropdown */}
          <div className="relative" ref={sortRef}>
            <button 
              onClick={() => {
                setSortOpen(!sortOpen);
                setFollowersOpen(false);
              }}
              suppressHydrationWarning
              className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors bg-transparent px-3 py-1.5 rounded-lg border border-border text-glow"
            >
              <TrendingUp className="w-4 h-4" />
              {sortBy}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
            </button>
 
            {sortOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg shadow-xl z-50 py-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (option === "Shuffle") {
                        onShuffle();
                      } else {
                        setSortBy(option);
                      }
                      setSortOpen(false);
                    }}
                    suppressHydrationWarning
                    className="flex items-center justify-between w-full px-4 py-2.5 text-[0.9rem] text-[#f5f5f5] hover:bg-[#2a2a2a] transition-colors text-left"
                  >
                    <span>{option}</span>
                    {sortBy === option && <Check className="w-3.5 h-3.5 text-foreground" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
 
      <div className="overflow-x-auto">
        <table className="directory-table">
          <thead>
            <tr>
              <th className="w-16">#</th>
              <th>Profile</th>
              <th className="w-52 text-left pl-12">X Handle</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={account.id} className="directory-row group transition-colors">
                <td className="font-mono-custom text-muted text-sm">{index + 1}</td>
                <td>
                  <div className="flex items-center gap-4">
                    <img
                      src={account.avatarPath}
                      alt={account.name}
                      className="w-10 h-10 rounded-full object-cover border border-border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(account.name)}&background=random`;
                      }}
                    />
                    <div>
                      <div className="font-[600] text-base leading-tight text-foreground text-glow">
                        {account.name}
                      </div>
                      <div className="text-muted text-[0.8rem] line-clamp-1 mt-0.5">
                        {account.bio}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-left pl-12">
                  <div className="flex justify-start">
                    <Link
                      href={`https://x.com/${account.xHandle}`}
                      target="_blank"
                      suppressHydrationWarning
                      className="inline-flex items-center gap-2 bg-white text-black hover:bg-white/90 transition-all px-4 py-2 rounded-lg font-mono-custom text-sm font-bold min-w-[150px] text-left"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span>@{account.xHandle}</span>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      {accounts.length === 0 && !isLoading && (
        <div className="p-12 text-center text-muted">
          No accounts found matching your search.
        </div>
      )}
      
      {isLoading && (
        <div className="p-12 text-center text-muted">
          Loading accounts...
        </div>
      )}
    </div>
  );
}
