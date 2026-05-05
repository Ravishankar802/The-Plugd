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
  Rocket, 
  Hammer, 
  Laptop, 
  Palette, 
  Zap, 
  Bot, 
  TrendingUp, 
  Pen, 
  Clapperboard, 
  Banknote, 
  Box, 
  Puzzle, 
  Coins, 
  Building, 
  GraduationCap, 
  Mic,
  Info,
  BarChart2,
  Briefcase,
  DollarSign,
  Cloud,
  Layers,
  Building2,
  ExternalLink
} from "lucide-react";

interface Account {
  id: number;
  name: string;
  xHandle: string;
  avatarUrl: string;
  bio: string;
  niche: string;
  followersRange: string;
  createdAt?: string;
}

const NICHES = [
  { name: "All", icon: Globe },
  { name: "Founder", icon: Rocket },
  { name: "Builder", icon: Hammer },
  { name: "Developer", icon: Laptop },
  { name: "Designer", icon: Palette },
  { name: "Indie Hacker", icon: Zap },
  { name: "AI", icon: Bot },
  { name: "Creator", icon: Clapperboard },
  { name: "Student", icon: GraduationCap },
  { name: "Crypto", icon: Coins },
  { name: "Marketer", icon: TrendingUp },
  { name: "Writer", icon: Pen },
  { name: "Investor", icon: TrendingUp },
  { name: "Trader", icon: BarChart2 },
  { name: "Freelancer", icon: Briefcase },
  { name: "Artist", icon: Palette },
  { name: "Finance", icon: DollarSign },
  { name: "SaaS", icon: Cloud },
  { name: "No-Code", icon: Layers },
  { name: "Agency", icon: Building2 },
  { name: "Podcaster", icon: Mic },
  { name: "Other", icon: Plus },
];

interface HomeClientProps {
  initialAccounts: Account[];
}

export default function HomeClient({ initialAccounts }: HomeClientProps) {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>(initialAccounts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(50);
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedFollowersRange, setSelectedFollowersRange] = useState("All Ranges");
  const [sortBy, setSortBy] = useState("Latest");
  const [shuffleKey, setShuffleKey] = useState(0);
  const [searchResults, setSearchResults] = useState<Account[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [stats, setStats] = useState<{ count: number; loading: boolean; error: boolean }>({
    count: 0,
    loading: true,
    error: false,
  });

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
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const result = accounts.filter(account => {
      const matchesNiche = selectedNiches.length === 0 || selectedNiches.includes(account.niche);
      const matchesFollowers = selectedFollowersRange === "All Ranges" || account.followersRange === selectedFollowersRange;
      
      return matchesNiche && matchesFollowers;
    });

    // Apply Sorting
    let sorted = [...result];
    if (sortBy === "Latest") {
      sorted.sort((a, b) => b.id - a.id);
    } else if (sortBy === "Oldest") {
      sorted.sort((a, b) => a.id - b.id);
    } else if (sortBy === "Shuffle") {
      // Use the shuffleKey to ensure a re-shuffle if user clicks Shuffle again
      sorted.sort(() => Math.random() - 0.5);
    }

    setFilteredAccounts(sorted);
    setVisibleCount(50); // Reset pagination on any filter change
  }, [selectedNiches, accounts, selectedFollowersRange, sortBy, shuffleKey]);

  // Separate Search Logic for Dropdown
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const q = searchQuery.toLowerCase();
    const results = accounts.filter(acc => 
      acc.name.toLowerCase().includes(q) || 
      acc.xHandle.toLowerCase().includes(q)
    ).slice(0, 8); // Limit to 8 results for the dropdown

    setSearchResults(results);
    setShowResults(true);
  }, [searchQuery, accounts]);

  // Click outside to close search results
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".search-container")) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  const toggleNiche = (nicheName: string) => {
    if (nicheName === "All") {
      setSelectedNiches([]);
      return;
    }
    
    setSelectedNiches(prev => {
      setVisibleCount(50); // Reset pagination on niche toggle
      if (prev.includes(nicheName)) {
        return prev.filter(n => n !== nicheName);
      } else {
        return [...prev, nicheName];
      }
    });
  };

  const sortedNiches = [...NICHES.filter(n => n.name !== "All")].sort((a, b) => {
    const aSelected = selectedNiches.includes(a.name);
    const bSelected = selectedNiches.includes(b.name);
    
    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    
    const aIndex = NICHES.findIndex(n => n.name === a.name);
    const bIndex = NICHES.findIndex(n => n.name === b.name);
    
    if (aSelected && bSelected) {
      return selectedNiches.indexOf(a.name) - selectedNiches.indexOf(b.name);
    }
    
    return aIndex - bIndex;
  });

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 50);
  };

  const displayedAccounts = filteredAccounts.slice(0, visibleCount);
  const remainingCount = filteredAccounts.length - visibleCount;

  const handleShuffle = () => {
    setSortBy("Shuffle");
    setShuffleKey(prev => prev + 1);
  };

  return (
    <main className="flex-1 flex flex-col items-center w-full max-w-full overflow-x-hidden">
      {/* Hero Wrapper with Scattered Hashtags - Now truly full width */}
      <div className="w-full relative flex flex-col items-center pt-2 pb-4">
        {/* Background Hashtags Container - This handles overflow for hashtags only */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {/* Left Side Hashtags */}
          <div className="hidden min-[1100px]:block absolute inset-0">
            <span className="absolute text-[#ffffff] opacity-[0.12] font-mono-custom font-[500] whitespace-nowrap" 
                  style={{ top: "8%", left: "5%", transform: "rotate(-6deg)", fontSize: "1.8rem" }}>#LetsConnect</span>
            <span className="absolute text-[#ffffff] opacity-[0.12] font-mono-custom font-[500] whitespace-nowrap" 
                  style={{ top: "48%", left: "3%", transform: "rotate(8deg)", fontSize: "1.35rem" }}>#BuildInPublic</span>
            <span className="absolute text-[#ffffff] opacity-[0.12] font-mono-custom font-[500] whitespace-nowrap" 
                  style={{ top: "88%", left: "5%", transform: "rotate(-7deg)", fontSize: "1.45rem" }}>#ShipIt</span>
          </div>

          {/* Right Side Hashtags */}
          <div className="hidden min-[1100px]:block absolute inset-0">
            <span className="absolute text-[#ffffff] opacity-[0.12] font-mono-custom font-[500] whitespace-nowrap" 
                  style={{ top: "12%", right: "5%", transform: "rotate(9deg)", fontSize: "1.5rem" }}>#Networking</span>
            <span className="absolute text-[#ffffff] opacity-[0.12] font-mono-custom font-[500] whitespace-nowrap" 
                  style={{ top: "52%", right: "3%", transform: "rotate(-8deg)", fontSize: "1.45rem" }}>#IndieHackers</span>
            <span className="absolute text-[#ffffff] opacity-[0.12] font-mono-custom font-[500] whitespace-nowrap" 
                  style={{ top: "92%", right: "5%", transform: "rotate(10deg)", fontSize: "1.1rem" }}>#StartupLife</span>
          </div>
        </div>

        {/* Center Content Content */}
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8 relative z-[60] flex flex-col items-center">
          <div className="max-w-[800px] w-full">
            <Header />

            {!stats.error && (
              <div className="w-full bg-[#111111] border border-[#1f1f1f] rounded-[12px] p-[1.25rem_1.75rem] mx-auto mb-8 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="flex justify-between items-end">
                  <span className="font-mono text-[0.7rem] text-[#6b7280] uppercase tracking-[0.08em]">
                    Free spots claimed
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white text-[1.4rem] font-bold leading-none">
                      {stats.loading ? "0" : stats.count}
                    </span>
                    <span className="text-[#6b7280] text-[0.9rem]">/ 1000</span>
                  </div>
                </div>
                
                <div className="w-full bg-[#1a1a1a] rounded-full h-[8px] overflow-hidden mt-[0.75rem]">
                  <div 
                    className="bg-[#f97316] h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: stats.loading ? "0%" : `${Math.min(Math.round((stats.count / 1000) * 100), 100)}%` }}
                  />
                </div>
                
                <div className="flex justify-between mt-[0.5rem]">
                  <span className="text-[#6b7280] text-[0.75rem] font-mono">
                    {stats.loading ? "Calculating..." : `${Math.max(1000 - stats.count, 0)} free spots left`}
                  </span>
                  <span className="text-[#f97316] text-[0.75rem] font-mono">
                    {stats.loading ? "0% full" : `${Math.min(Math.round((stats.count / 1000) * 100), 100)}% full`}
                  </span>
                </div>
              </div>
            )}

            <section className="mb-0">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1 search-container">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    type="text"
                    placeholder="Search accounts or names..."
                    className="w-full h-[48px] bg-pill border border-border rounded-lg pl-12 pr-4 text-foreground placeholder:text-[#6b7280] focus:outline-none focus:ring-1 focus:ring-border transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.trim() !== "" && setShowResults(true)}
                    suppressHydrationWarning
                  />

                  {/* Search Results Dropdown */}
                  {showResults && searchQuery.trim() !== "" && (
                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-pill border border-border rounded-xl shadow-2xl z-[150] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      {searchResults.length > 0 ? (
                        <div className="py-2">
                          {searchResults.map((acc) => (
                            <div 
                              key={acc.id} 
                              className="px-4 py-3 hover:bg-accent cursor-pointer flex items-center gap-4 transition-colors group"
                              onClick={() => {
                                window.open(`https://x.com/${acc.xHandle.replace(/^@+/, '')}`, '_blank');
                                setShowResults(false);
                              }}
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
              </div>

              {/* Niche Categories */}
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
                  
                  {(hasMounted ? sortedNiches : NICHES.filter(n => n.name !== "All")).map((niche) => {
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
                        <Icon size={16} />
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
        <DirectoryTable 
          accounts={displayedAccounts} 
          isLoading={false}
          selectedFollowersRange={selectedFollowersRange}
          setSelectedFollowersRange={setSelectedFollowersRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onShuffle={handleShuffle}
        />

        <div className="flex flex-col items-center gap-6 pt-12 pb-20">
          {remainingCount > 0 && (
            <button
              onClick={handleLoadMore}
              className="flex items-center justify-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] px-8 py-3 rounded-full text-[0.95rem] font-medium text-[#f5f5f5] transition-all hover:bg-[#252525] active:scale-[0.98]"
            >
              Next {remainingCount >= 50 ? "50" : remainingCount} ›
            </button>
          )}
          <p className="text-[#a1a1aa] text-[0.8rem] md:text-[0.85rem] font-mono-custom text-center px-4 md:whitespace-nowrap whitespace-normal max-w-sm mx-auto md:max-w-none leading-relaxed">
            <Info className="w-4 h-4 shrink-0 inline-block mr-2 -mt-0.5" />
            Accounts listed here are submitted by real X creators. Every listing is verified by a $1 payment. No bots. No spam.
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        <Footer />
      </div>

      <AddAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
