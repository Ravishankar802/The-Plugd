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
  Building2
} from "lucide-react";

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

const MOCK_ACCOUNTS: Account[] = [
  {
    id: -1,
    name: "Ravi Shankar",
    xHandle: "ravishankar802",
    avatarPath: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    bio: "Building The Plugd. Growth hacker & founder.",
    niche: "Founder",
    followersRange: "10K+"
  },
  {
    id: -2,
    name: "Sarah Chen",
    xHandle: "sarahcodes",
    avatarPath: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    bio: "Full-stack developer at Vercel. Next.js enthusiast.",
    niche: "Developer",
    followersRange: "5K - 10K"
  },
  {
    id: -3,
    name: "James Wilson",
    xHandle: "jdesign",
    avatarPath: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    bio: "Minimalist designer. Making the web beautiful.",
    niche: "Designer",
    followersRange: "10K+"
  },
  {
    id: -4,
    name: "Elena Rodriguez",
    xHandle: "elenarai",
    avatarPath: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    bio: "AI researcher. Exploring the future of LLMs.",
    niche: "AI",
    followersRange: "5K - 10K"
  },
  {
    id: -5,
    name: "Marc Lou",
    xHandle: "marclou",
    avatarPath: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
    bio: "Indie hacker. Shipping 12 startups in 12 months.",
    niche: "Indie Hacker",
    followersRange: "10K+"
  }
];

export default function Home() {
  const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>(MOCK_ACCOUNTS);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(50);
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedFollowersRange, setSelectedFollowersRange] = useState("All Ranges");
  const [sortBy, setSortBy] = useState("Latest");
  const [shuffleKey, setShuffleKey] = useState(0);

  useEffect(() => {
    setHasMounted(true);
    fetchAccounts();
  }, []);

  useEffect(() => {
    const result = accounts.filter(account => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        account.name.toLowerCase().includes(q) ||
        account.xHandle.toLowerCase().includes(q) ||
        account.bio.toLowerCase().includes(q) ||
        account.niche.toLowerCase().includes(q);
      
      const matchesNiche = selectedNiches.length === 0 || selectedNiches.includes(account.niche);
      const matchesFollowers = selectedFollowersRange === "All Ranges" || account.followersRange === selectedFollowersRange;
      
      return matchesSearch && matchesNiche && matchesFollowers;
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
  }, [searchQuery, selectedNiches, accounts, selectedFollowersRange, sortBy, shuffleKey]);

  const fetchAccounts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/accounts");
      const data = await response.json();
      
      const apiAccounts = Array.isArray(data) ? data : [];
      
      const combinedData = [...MOCK_ACCOUNTS, ...apiAccounts.filter((acc: Account) => 
        !MOCK_ACCOUNTS.some(mock => mock.xHandle === acc.xHandle)
      )];
      
      setAccounts(combinedData);
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    <main className="flex-1 flex flex-col items-center w-full">
      {/* Hero Wrapper with Scattered Hashtags - Now truly full width */}
      <div className="w-full relative overflow-hidden flex flex-col items-center pt-2 pb-4">
        {/* Left Side Hashtags - Truly pushed to screen edges */}
        <div className="hidden min-[1100px]:block absolute inset-0 pointer-events-none select-none">
          <span className="absolute text-[#ffffff] opacity-[0.12] font-mono-custom font-[500] whitespace-nowrap" 
                style={{ top: "8%", left: "5%", transform: "rotate(-6deg)", fontSize: "1.8rem" }}>#LetsConnect</span>
          <span className="absolute text-[#ffffff] opacity-[0.12] font-mono-custom font-[500] whitespace-nowrap" 
                style={{ top: "48%", left: "3%", transform: "rotate(8deg)", fontSize: "1.35rem" }}>#BuildInPublic</span>
          <span className="absolute text-[#ffffff] opacity-[0.12] font-mono-custom font-[500] whitespace-nowrap" 
                style={{ top: "88%", left: "5%", transform: "rotate(-7deg)", fontSize: "1.45rem" }}>#ShipIt</span>
        </div>

        {/* Right Side Hashtags - Truly pushed to screen edges */}
        <div className="hidden min-[1100px]:block absolute inset-0 pointer-events-none select-none">
          <span className="absolute text-[#ffffff] opacity-[0.12] font-mono-custom font-[500] whitespace-nowrap" 
                style={{ top: "12%", right: "5%", transform: "rotate(9deg)", fontSize: "1.5rem" }}>#Networking</span>
          <span className="absolute text-[#ffffff] opacity-[0.12] font-mono-custom font-[500] whitespace-nowrap" 
                style={{ top: "52%", right: "3%", transform: "rotate(-8deg)", fontSize: "1.45rem" }}>#IndieHackers</span>
          <span className="absolute text-[#ffffff] opacity-[0.12] font-mono-custom font-[500] whitespace-nowrap" 
                style={{ top: "92%", right: "5%", transform: "rotate(10deg)", fontSize: "1.1rem" }}>#StartupLife</span>
        </div>

        {/* Center Content Content */}
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
          <div className="max-w-[800px] w-full">
            <Header />

            <section className="mb-0">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    type="text"
                    placeholder="Search accounts, niches, names..."
                    className="w-full h-[48px] bg-pill border border-border rounded-lg pl-12 pr-4 text-foreground placeholder:text-[#6b7280] focus:outline-none focus:ring-1 focus:ring-border transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    suppressHydrationWarning
                  />
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  suppressHydrationWarning
                  className="h-[48px] bg-foreground text-background font-[700] px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:opacity-90"
                >
                  <Plus className="w-5 h-5" />
                  Add Account
                </button>
              </div>

              {/* Niche Categories */}
              <div className="flex justify-center w-full">
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 mask-fade-right w-full scroll-smooth">
                  <button
                    onClick={() => toggleNiche("All")}
                    suppressHydrationWarning
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                      selectedNiches.length === 0
                        ? "bg-foreground text-background border-foreground font-medium"
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
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                          isSelected
                            ? "bg-foreground text-background border-foreground font-medium"
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
          isLoading={isLoading} 
          selectedFollowersRange={selectedFollowersRange}
          setSelectedFollowersRange={setSelectedFollowersRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onShuffle={handleShuffle}
        />

        <div className="flex flex-col items-center gap-6 pt-4 pb-12">
          {remainingCount > 0 && (
            <button
              onClick={handleLoadMore}
              className="flex items-center justify-center gap-2 bg-transparent border border-[#2a2a2a] px-8 py-3 rounded-full text-[0.95rem] font-medium text-[#f5f5f5] transition-all hover:bg-[#1a1a1a] active:scale-[0.98]"
            >
              Show more ({Math.min(50, remainingCount)} more accounts)
            </button>
          )}
          <p className="text-[#a1a1aa] text-[0.85rem] flex items-center justify-center gap-2 font-mono-custom whitespace-nowrap">
            <Info className="w-4 h-4 shrink-0" />
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
