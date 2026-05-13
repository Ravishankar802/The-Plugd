"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DirectoryTable from "@/components/DirectoryTable";
import AddAccountModal from "@/components/AddAccountModal";
import { 
  Search, 
  Plus, 
  Globe, 
  ExternalLink,
  Info,
  Filter,
  LayoutDashboard,
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { NICHES } from "@/lib/constants";
import ReferralModal from "@/components/ReferralModal";

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

// Component local "All" option
const HOME_NICHES = [
  { name: "All", icon: Globe },
  ...NICHES
];

interface HomeClientProps {
  initialAccounts: Account[];
  allAccounts: Account[];
  totalFilteredCount: number;
  currentPage: number;
  pageSize: number;
  initialIsPaid: boolean;
  userEmail: string | null;
}

export default function HomeClient({ 
  initialAccounts, 
  allAccounts,
  totalFilteredCount,
  currentPage,
  pageSize,
  initialIsPaid,
  userEmail: serverUserEmail
}: HomeClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL-driven filters (mostly for UI state)
  const searchQuery = searchParams.get("q") || "";
  const selectedNiches = searchParams.get("niches")?.split(",").filter(Boolean) || [];
  const selectedFollowersRange = searchParams.get("followers") || "All Ranges";
  const selectedStatusFilter = searchParams.get("status") || "All";
  const sortBy = searchParams.get("sort") || "Latest";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [searchResults, setSearchResults] = useState<Account[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [stats, setStats] = useState<{ count: number; loading: boolean; error: boolean }>({
    count: 0,
    loading: true,
    error: false,
  });
  const [userEmail, setUserEmail] = useState<string | null>(serverUserEmail);
  const [isPaidUser, setIsPaidUser] = useState(initialIsPaid);
  const [userStatuses, setUserStatuses] = useState<Record<number, string>>({});
  
  // Search state
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [history, setHistory] = useState<Account[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem("plugd_search_history_v2");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const addToAccountHistory = (account: Account) => {
    setHistory(prev => {
      const filtered = prev.filter(h => h.id !== account.id);
      const next = [account, ...filtered].slice(0, 5);
      localStorage.setItem("plugd_search_history_v2", JSON.stringify(next));
      return next;
    });
  };

  const removeFromHistory = (accountId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory(prev => {
      const next = prev.filter(h => h.id !== accountId);
      localStorage.setItem("plugd_search_history_v2", JSON.stringify(next));
      return next;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("plugd_search_history_v2");
  };

  // Sync local search with URL if it changes externally
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Helper to update URL params
  const updateUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === "All" || value === "All Ranges" || value === "Latest") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`/?${params.toString()}`, { scroll: true });
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();
      setStats({ count: data.count, loading: false, error: false });
    } catch (err) {
      console.error("Stats fetch failed:", err);
      setStats(prev => ({ ...prev, loading: false, error: true }));
    }
  };

  useEffect(() => {
    setHasMounted(true);
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    
    // Auth Check
    async function checkAuth() {
      try {
        const meRes = await fetch("/api/auth/me");
        if (meRes.ok) {
          const userData = await meRes.json();
          setUserEmail(userData.email);
          setIsPaidUser(userData.isPaid);

          // Fetch Statuses
          const statusRes = await fetch("/api/status");
          if (statusRes.ok) {
            const data = await statusRes.json();
            const statusMap: Record<number, string> = {};
            data.forEach((s: any) => {
              statusMap[s.accountId] = s.status;
            });
            setUserStatuses(statusMap);
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      }
    }
    checkAuth();

    return () => clearInterval(interval);
  }, []);

  // Instant Client-side Search Logic for Dropdown
  useEffect(() => {
    if (localSearchQuery.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const q = localSearchQuery.toLowerCase();
    const filtered = allAccounts.filter(acc => 
      acc.name.toLowerCase().includes(q) || 
      acc.xHandle.toLowerCase().includes(q)
    );

    // Ranking Logic: Exact name start > Handle start > Others
    const ranked = filtered.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const aHandle = a.xHandle.toLowerCase().replace(/^@+/, '');
      const bHandle = b.xHandle.toLowerCase().replace(/^@+/, '');

      const aNameStarts = aName.startsWith(q);
      const bNameStarts = bName.startsWith(q);
      if (aNameStarts && !bNameStarts) return -1;
      if (!aNameStarts && bNameStarts) return 1;

      const aHandleStarts = aHandle.startsWith(q);
      const bHandleStarts = bHandle.startsWith(q);
      if (aHandleStarts && !bHandleStarts) return -1;
      if (!aHandleStarts && bHandleStarts) return 1;
      
      return 0;
    });

    setSearchResults(ranked.slice(0, 6)); // Max 6 results
    setShowResults(true);

    // Debug logs
    console.log("Search Debug:", {
      allAccountsCount: allAccounts.length,
      query: localSearchQuery,
      resultsFound: ranked.length
    });
  }, [localSearchQuery, allAccounts]);

  // Click outside to close search results
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".search-container")) {
        setShowResults(false);
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleNiche = (nicheName: string) => {
    if (nicheName === "All") {
      updateUrl({ niches: null, page: "1" });
      return;
    }
    
    const newNiches = selectedNiches.includes(nicheName)
      ? selectedNiches.filter(n => n !== nicheName)
      : [...selectedNiches, nicheName];
    
    updateUrl({ niches: newNiches.join(","), page: "1" });
  };

  const sortedNiches = [...HOME_NICHES.filter(n => n.name !== "All")].sort((a, b) => {
    const aSelected = selectedNiches.includes(a.name);
    const bSelected = selectedNiches.includes(b.name);
    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    return HOME_NICHES.findIndex(n => n.name === a.name) - HOME_NICHES.findIndex(n => n.name === b.name);
  });

  const startIndex = (currentPage - 1) * pageSize;
  const hasNextPage = startIndex + pageSize < totalFilteredCount;
  const hasPrevPage = currentPage > 1;

  const remainingAfterCurrent = totalFilteredCount - (startIndex + pageSize);
  const nextCount = remainingAfterCurrent >= 50 ? 50 : remainingAfterCurrent;

  const handleJoinReferral = () => {
    setIsReferModalOpen(false);
    if (!userEmail || !isPaidUser) {
      setIsModalOpen(true);
    } else {
      router.push("/dashboard#refer");
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center w-full max-w-full overflow-x-hidden">
      <div className="w-full relative flex flex-col items-center pt-2 pb-4">

        <div className="w-full max-w-5xl mx-auto px-4 md:px-8 relative z-[60] flex flex-col items-center">
          <div className="max-w-[800px] w-full">
            <Header />

            <div className="w-full flex flex-col items-center justify-center my-4 md:my-8 animate-in fade-in slide-in-from-top-2 duration-500">
              <span className="font-mono text-[0.65rem] md:text-[0.7rem] text-muted uppercase tracking-[0.12em] font-[700] mb-1">
                TOTAL ACCOUNTS LISTED
              </span>
              <div className="flex flex-col items-center gap-0.5 md:gap-1">
                <span className="text-foreground text-[32px] md:text-[56px] font-extrabold leading-none tracking-tight">
                  {stats.loading ? "..." : stats.count}
                </span>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#f97316] pulse" />
                  <span className="text-[#f97316] text-[0.75rem] md:text-[0.875rem] font-bold uppercase tracking-wider">live</span>
                </div>
              </div>
            </div>

            <section className="mb-0">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1 search-container">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    type="text"
                    placeholder="Search accounts or names..."
                    className="w-full h-[48px] bg-pill border border-border rounded-lg pl-12 pr-4 text-foreground placeholder:text-[#6b7280] focus:outline-none focus:ring-1 focus:ring-border transition-all"
                    value={localSearchQuery}
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateUrl({ q: localSearchQuery, page: "1" });
                        setShowResults(false);
                      }
                    }}
                    onFocus={() => {
                      if (localSearchQuery.trim() !== "") setShowResults(true);
                      else setShowHistory(true);
                    }}
                    suppressHydrationWarning
                  />

                  {/* Recent Searches Dropdown (Visited Accounts) */}
                  {showHistory && localSearchQuery.trim() === "" && history.length > 0 && (
                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-pill border border-border rounded-xl shadow-2xl z-[150] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                        <span className="text-[0.7rem] uppercase font-bold text-muted tracking-wider">Recent Searches</span>
                        <button onClick={clearHistory} className="text-[0.7rem] text-[#f97316] hover:underline font-bold">Clear all</button>
                      </div>
                      <div className="py-1">
                        {history.map((acc) => (
                          <div 
                            key={acc.id}
                            className="px-4 py-2.5 hover:bg-accent cursor-pointer flex items-center justify-between group transition-colors"
                            onClick={() => {
                              router.push(`/u/${acc.xHandle.replace(/^@+/, '')}`);
                              setShowHistory(false);
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <img src={acc.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover border border-border" />
                              <div className="min-w-0">
                                <p className="text-foreground font-bold text-[0.85rem] leading-tight truncate">{acc.name}</p>
                                <p className="text-muted text-[0.75rem] truncate">@{acc.xHandle.replace(/^@+/, '')}</p>
                              </div>
                            </div>
                            <button 
                              onClick={(e) => removeFromHistory(acc.id, e)}
                              className="w-6 h-6 rounded-md hover:bg-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3 text-muted" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {showResults && localSearchQuery.trim() !== "" && (
                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-pill border border-border rounded-xl shadow-2xl z-[9999] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      {searchResults.length > 0 ? (
                        <div className="py-2">
                          {searchResults.map((acc) => (
                            <div 
                              key={acc.id} 
                              className="px-4 py-3 hover:bg-accent cursor-pointer flex items-center gap-4 transition-colors group"
                              onClick={() => {
                                addToAccountHistory(acc);
                                updateUrl({ q: acc.name, page: "1" }); // Update URL on click
                                router.push(`/u/${acc.xHandle.replace(/^@+/, '')}`);
                                setShowResults(false);
                              }}
                              onMouseEnter={() => router.prefetch(`/u/${acc.xHandle.replace(/^@+/, '')}`)}
                            >
                              <img src={acc.avatarUrl} alt="" className="w-10 h-10 rounded-lg object-cover border border-border shadow-sm" />
                              <div className="flex-1 min-w-0">
                                <p className="text-foreground font-bold text-[0.95rem] truncate">{acc.name}</p>
                                <p className="text-muted text-[0.8rem] truncate">@{acc.xHandle.replace(/^@+/, '')}</p>
                              </div>
                              <div className="px-3 py-1.5 rounded-lg bg-selected border border-selected text-selected-foreground text-[0.75rem] font-bold transition-all flex items-center gap-1.5 shadow-sm">
                                Visit <ExternalLink className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <p className="text-muted font-medium">No accounts found for &quot;{searchQuery}&quot;</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  suppressHydrationWarning
                  className="h-[48px] w-full md:w-auto bg-selected border border-selected text-selected-foreground font-[600] px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-selected/90 active:scale-[0.98] shadow-lg cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                  Add Account
                </button>
                <button
                  onClick={() => setIsReferModalOpen(true)}
                  suppressHydrationWarning
                  className="h-[48px] w-full md:w-auto bg-pill border border-border text-foreground font-[600] px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-accent active:scale-[0.98] shadow-lg cursor-pointer"
                >
                  <TrendingUp className="w-5 h-5" />
                  Refer & Earn
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 mb-6 text-[13px] text-[#666] -mt-2">
                <Link href="/stats" className="hover:text-foreground transition-colors">Stats</Link>
                <span className="select-none">·</span>
                <Link href="/100-vs-100k" className="hover:text-foreground transition-colors">100 vs 100K</Link>
              </div>

              <div className="flex justify-center w-full relative group">
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 mask-fade-right w-full scroll-smooth px-4 md:px-0">
                  <button
                    onClick={() => toggleNiche("All")}
                    suppressHydrationWarning
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap font-[600] cursor-pointer ${
                      selectedNiches.length === 0
                        ? "bg-selected border-selected text-selected-foreground shadow-sm"
                        : "bg-card border-border text-muted hover:border-muted-foreground"
                    }`}
                  >
                    <Globe size={16} />
                    <span>All</span>
                  </button>
                  
                  {(hasMounted ? sortedNiches : HOME_NICHES.filter(n => n.name !== "All")).map((niche) => {
                    const Icon = niche.icon;
                    const isSelected = hasMounted && selectedNiches.includes(niche.name);
                    return (
                      <button
                        key={niche.name}
                        onClick={() => toggleNiche(niche.name)}
                        suppressHydrationWarning
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap font-[600] cursor-pointer ${
                          isSelected
                            ? "bg-selected border-selected text-selected-foreground shadow-sm"
                            : "bg-card border-border text-muted hover:border-muted-foreground"
                        }`}
                      >
                        {Icon && <Icon size={16} />}
                        <span>{niche.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 mt-4">
        {!isPaidUser && (
          <div className="ticker-container w-full bg-card border border-border rounded-[10px] overflow-hidden py-3 mb-8 cursor-default">
            <div className="ticker-content flex items-center gap-12 px-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 shrink-0">
                  <span className="text-[#f97316] text-xl leading-none">●</span>
                  <span className="text-foreground font-medium text-[15px] tracking-wide">
                    Add or claim your account for $2 to track, save and skip X accounts
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <DirectoryTable 
          accounts={initialAccounts} 
          isLoading={false}
          selectedFollowersRange={selectedFollowersRange}
          setSelectedFollowersRange={(val) => updateUrl({ followers: val, page: "1" })}
          sortBy={sortBy}
          setSortBy={(val) => updateUrl({ sort: val, page: "1" })}
          onShuffle={() => updateUrl({ sort: "Shuffle", page: "1" })}
          startIndex={startIndex}
          userEmail={userEmail}
          isPaidUser={isPaidUser}
          userStatuses={userStatuses}
          setUserStatuses={setUserStatuses}
          selectedStatusFilter={selectedStatusFilter}
          setSelectedStatusFilter={(val) => updateUrl({ status: val, page: "1" })}
        />

        <div className="flex flex-col items-center gap-6 pt-12 pb-20">
          <div className="flex items-center gap-4">
            {hasPrevPage && (
              <button
                onClick={() => updateUrl({ page: String(currentPage - 1) })}
                className="flex items-center justify-center bg-card border border-border px-6 py-2.5 rounded-lg text-muted hover:text-foreground hover:border-muted-foreground transition-all font-medium text-[0.95rem] cursor-pointer shadow-sm active:scale-[0.98]"
              >
                ‹ Prev 50
              </button>
            )}
            {hasNextPage && (
              <button
                onClick={() => updateUrl({ page: String(currentPage + 1) })}
                className="flex items-center justify-center bg-card border border-border px-6 py-2.5 rounded-lg text-muted hover:text-foreground hover:border-muted-foreground transition-all font-medium text-[0.95rem] cursor-pointer shadow-sm active:scale-[0.98]"
              >
                Next {nextCount} ›
              </button>
            )}
          </div>
          <p className="text-[#a1a1aa] text-[0.8rem] md:text-[0.85rem] font-mono-custom text-center px-4 md:whitespace-nowrap whitespace-normal max-w-sm mx-auto md:max-w-none leading-relaxed">
            <Info className="w-4 h-4 shrink-0 inline-block mr-2 -mt-0.5" />
            Accounts listed here are either submitted by the account owners themselves or added by Plugd's founder.
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        <Footer />
      </div>

      <AddAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ReferralModal 
        isOpen={isReferModalOpen} 
        onClose={() => setIsReferModalOpen(false)} 
        onJoin={handleJoinReferral}
      />
    </main>
  );
}
