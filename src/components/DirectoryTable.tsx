"use client";
 
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, TrendingUp, Sliders, Check, Filter, Search } from "lucide-react";
import AccountStatusButtons from "./AccountStatusButtons";
 
interface Account {
  id: number;
  name: string;
  xHandle: string;
  avatarUrl: string;
  bio: string;
  niche: string[];
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
  startIndex: number;
  userEmail: string | null;
  isPaidUser: boolean;
  userStatuses: Record<number, string>;
  setUserStatuses: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  selectedStatusFilter: string;
  setSelectedStatusFilter: (val: string) => void;
}

const STATUS_FILTERS = ["All", "Followed", "Saved", "Not Interested", "Not Viewed"];
 
const FOLLOWERS_RANGES = [
  "All Ranges", "0-100", "100-500", "500-1K", "1K-2K", "2K-5K", "5K-10K", "10K-25K", "25K-50K", "50K-100K", "100K+"
];
 
const SORT_OPTIONS = ["Latest", "Oldest", "Shuffle"];
export default function DirectoryTable({ 
  accounts, 
  isLoading, 
  selectedFollowersRange, 
  setSelectedFollowersRange, 
  sortBy, 
  setSortBy,
  onShuffle,
  startIndex,
  userEmail,
  isPaidUser,
  userStatuses,
  setUserStatuses,
  selectedStatusFilter,
  setSelectedStatusFilter
}: DirectoryTableProps) {
  const router = useRouter();
  const [followersOpen, setFollowersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  
  const followersRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (followersRef.current && !followersRef.current.contains(event.target as Node)) {
        setFollowersOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setStatusOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  return (
    <div className="w-full bg-card rounded-2xl border border-border overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
        <h2 className="text-[1.5rem] font-[800] text-foreground text-glow">Index</h2>
        
        <div className="flex flex-wrap items-center gap-2.5 pb-1 md:pb-0">
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
              {selectedFollowersRange === "All Ranges" ? "Followers Range" : selectedFollowersRange}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${followersOpen ? "rotate-180" : ""}`} />
            </button>
 
            {followersOpen && (
              <div className="absolute left-0 md:right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl z-[9999] py-1 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[320px] overflow-y-auto no-scrollbar">
                {FOLLOWERS_RANGES.map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setSelectedFollowersRange(range);
                      setFollowersOpen(false);
                    }}
                    suppressHydrationWarning
                    className={`flex items-center justify-between w-full px-4 py-2.5 text-[0.9rem] transition-colors text-left ${
                      selectedFollowersRange === range ? "text-foreground bg-accent" : "text-muted hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <span>{range}</span>
                    {selectedFollowersRange === range && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative group/filter-container" ref={statusRef}>
            <button 
              onClick={() => {
                setStatusOpen(!statusOpen);
                setFollowersOpen(false);
                setSortOpen(false);
              }}
              suppressHydrationWarning
              className="flex items-center gap-2 text-sm transition-colors bg-transparent px-3 py-1.5 rounded-lg border border-border text-glow text-muted hover:text-foreground cursor-pointer"
            >
              <Filter className="w-4 h-4" />
              {selectedStatusFilter === "All" ? "Status" : selectedStatusFilter}
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${statusOpen ? "rotate-180" : ""}`} />
            </button>

            {statusOpen && (
              <div className="absolute left-0 md:right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl z-[9999] py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                {STATUS_FILTERS.map((filter) => (
                  <div key={filter} className="relative group/filter-item">
                    <button
                      onClick={() => {
                        if (isPaidUser) {
                          setSelectedStatusFilter(filter);
                          setStatusOpen(false);
                        }
                      }}
                      suppressHydrationWarning
                      className={`flex items-center justify-between w-full px-4 py-2.5 text-[0.9rem] transition-colors text-left ${
                        !isPaidUser 
                          ? "opacity-40 cursor-not-allowed text-muted" 
                          : selectedStatusFilter === filter 
                            ? "text-foreground bg-accent" 
                            : "text-muted hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{filter}</span>
                        {!isPaidUser && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="opacity-60">
                            <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v3H9V7zm3 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>
                          </svg>
                        )}
                      </div>
                      {isPaidUser && selectedStatusFilter === filter && <Check className="w-3.5 h-3.5" />}
                    </button>
                  </div>
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
              <div className="absolute left-0 md:right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-xl z-[9999] py-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
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
                    className={`flex items-center justify-between w-full px-4 py-2.5 text-[0.9rem] transition-colors text-left ${
                      sortBy === option ? "text-foreground bg-accent" : "text-muted hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <span>{option}</span>
                    {sortBy === option && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
 
      <div className="overflow-x-hidden md:overflow-x-visible">
        <table className="w-full block md:table border-collapse">
          <thead className="hidden md:table-header-group">
            <tr>
              <th className="w-10 text-left pl-6 pb-3 text-muted text-sm font-medium">#</th>
              <th className="text-left pl-16 pb-3 text-muted text-sm font-medium">Profile</th>
              <th className="w-52 text-left pl-12 pb-3 text-muted text-sm font-medium">X Handle</th>
              <th className="w-44 text-left pl-12 pb-3 text-muted text-sm font-medium">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span>Status</span>
                  {!isPaidUser && (
                    <span className="text-[11px] text-muted-foreground/60 font-normal tracking-tight">
                      (Unlock for $1)
                    </span>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {accounts.map((account, index) => (
              <tr 
                key={account.id} 
                className="directory-row group transition-all duration-200 flex flex-col md:table-row border-b last:border-b-0 border-border py-6 md:py-0 cursor-pointer hover:bg-accent/30 relative active:scale-[0.998]"
                onClick={() => router.push(`/u/${account.xHandle.replace(/^@+/, '')}`)}
                onMouseEnter={() => router.prefetch(`/u/${account.xHandle.replace(/^@+/, '')}`)}
              >
                {/* Desktop Number Cell */}
                <td className="font-mono-custom text-muted text-sm hidden md:table-cell px-6 py-4 md:w-10">
                  {startIndex + index + 1}
                </td>
                <td className="block md:table-cell px-6 py-2 md:py-4">
                  <div className="flex items-center gap-4">
                    {/* Mobile Number Indicator */}
                    <span className="md:hidden font-mono-custom text-muted text-xs w-4 shrink-0">
                      {startIndex + index + 1}
                    </span>
                    <img
                      src={account.avatarUrl}
                      alt={account.name}
                      className="w-12 h-12 md:w-10 md:h-10 rounded-full object-cover border border-border shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(account.name)}&background=random`;
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-[600] text-base md:text-base leading-tight text-foreground text-glow truncate">
                        {account.name}
                      </div>
                      <div className="text-muted text-[0.8rem] line-clamp-2 md:line-clamp-1 mt-1 md:mt-0.5">
                        {account.bio}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="block md:table-cell px-6 pt-4 pb-0 md:py-4 md:pl-12">
                  <div className="flex justify-start" onClick={(e) => e.stopPropagation()}>
                    <Link
                      href={`https://x.com/${account.xHandle.replace(/^@+/, '')}`}
                      target="_blank"
                      suppressHydrationWarning
                      className="inline-flex items-center gap-2 bg-white text-black hover:bg-white/90 transition-all px-4 py-3 md:py-2 rounded-lg font-mono-custom text-sm font-bold w-full md:min-w-[150px] md:w-auto justify-center md:justify-start shadow-sm"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span>@{account.xHandle.replace(/^@+/, '')}</span>
                    </Link>
                  </div>
                </td>
                <td className="block md:table-cell px-6 pt-4 pb-0 md:py-4 md:pl-12">
                  <div className="flex justify-between md:justify-start w-full">
                    <AccountStatusButtons 
                      accountId={account.id}
                      currentStatus={userStatuses[account.id]}
                      isPaidUser={isPaidUser}
                      userEmail={userEmail}
                      size="sm"
                      onStatusChange={(newStatus) => {
                        setUserStatuses(prev => {
                          const next = { ...prev };
                          if (newStatus) next[account.id] = newStatus;
                          else delete next[account.id];
                          return next;
                        });
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      {accounts.length === 0 && !isLoading && (
        <div className="p-16 text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-2">
            <Search className="w-8 h-8 text-muted" />
          </div>
          <div className="space-y-1">
            <p className="text-foreground font-bold text-lg">No accounts found</p>
            <p className="text-muted text-sm max-w-[280px] mx-auto">Try adjusting your filters or search terms to find what you&apos;re looking for.</p>
          </div>
          <button 
            onClick={() => {
              setSelectedFollowersRange("All Ranges");
              setSelectedStatusFilter("All");
              setSortBy("Latest");
              router.push("/");
            }}
            className="mt-2 text-[#f97316] font-bold text-sm hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
      
    </div>
  );
}
