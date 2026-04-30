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
  Info
} from "lucide-react";

interface Account {
  id: number;
  name: string;
  xHandle: string;
  avatarUrl: string;
  bio: string;
  niche: string;
  followers: number;
}

const NICHES = [
  { name: "All", icon: Globe },
  { name: "Founder", icon: Rocket },
  { name: "Builder", icon: Hammer },
  { name: "Developer", icon: Laptop },
  { name: "Designer", icon: Palette },
  { name: "Indie Hacker", icon: Zap },
  { name: "AI", icon: Bot },
  { name: "Marketer", icon: TrendingUp },
  { name: "Writer", icon: Pen },
  { name: "Creator", icon: Clapperboard },
  { name: "Investor", icon: Banknote },
  { name: "SaaS", icon: Box },
  { name: "No-Code", icon: Puzzle },
  { name: "Crypto", icon: Coins },
  { name: "Agency", icon: Building },
  { name: "Student", icon: GraduationCap },
  { name: "Podcaster", icon: Mic },
  { name: "Other", icon: Plus },
];

const MOCK_ACCOUNTS: Account[] = [
  {
    id: -1,
    name: "Ravi Shankar",
    xHandle: "ravishankar802",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    bio: "Building The Plugd. Growth hacker & founder.",
    niche: "Founder",
    followers: 12500
  },
  {
    id: -2,
    name: "Sarah Chen",
    xHandle: "sarahcodes",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    bio: "Full-stack developer at Vercel. Next.js enthusiast.",
    niche: "Developer",
    followers: 8400
  },
  {
    id: -3,
    name: "James Wilson",
    xHandle: "jdesign",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    bio: "Minimalist designer. Making the web beautiful.",
    niche: "Designer",
    followers: 21000
  },
  {
    id: -4,
    name: "Elena Rodriguez",
    xHandle: "elenarai",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    bio: "AI researcher. Exploring the future of LLMs.",
    niche: "AI",
    followers: 5600
  },
  {
    id: -5,
    name: "Marc Lou",
    xHandle: "marclou",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
    bio: "Indie hacker. Shipping 12 startups in 12 months.",
    niche: "Indie Hacker",
    followers: 45000
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
      
      return matchesSearch && matchesNiche;
    });

    setFilteredAccounts(result);
  }, [searchQuery, selectedNiches, accounts]);

  const toggleNiche = (name: string) => {
    if (name === "All") {
      setSelectedNiches([]);
      return;
    }
    
    setSelectedNiches(prev => {
      if (prev.includes(name)) {
        return prev.filter(n => n !== name);
      }
      return [...prev, name];
    });
  };

  const sortedNiches = [...NICHES]
    .filter(n => n.name !== "All")
    .sort((a, b) => {
      const indexA = selectedNiches.indexOf(a.name);
      const indexB = selectedNiches.indexOf(b.name);
      
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      
      return NICHES.findIndex(n => n.name === a.name) - NICHES.findIndex(n => n.name === b.name);
    });

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/accounts");
      const data = await response.json();
      // Prepend mock accounts to fetched data for testing
      const combinedAccounts = Array.isArray(data) ? [...MOCK_ACCOUNTS, ...data] : [...MOCK_ACCOUNTS];
      setAccounts(combinedAccounts);
      setFilteredAccounts(combinedAccounts);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 50);
  };

  const displayedAccounts = filteredAccounts.slice(0, visibleCount);
  const remainingCount = filteredAccounts.length - visibleCount;

  return (
    <main className="flex-1 flex flex-col">
      <Header />

      <section className="mb-12">
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 mb-12">
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
            className="h-[48px] bg-foreground text-background font-[700] px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:opacity-90"
          >
            <Plus className="w-5 h-5" />
            Add Account
          </button>
        </div>

        {/* Niche Categories */}
        <div className="flex justify-center w-full mb-12">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 px-4 mask-fade-right max-w-full sm:max-w-4xl scroll-smooth">
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

        <DirectoryTable accounts={displayedAccounts} isLoading={isLoading} />

        <div className="flex flex-col items-center gap-4 py-8">
          {remainingCount > 0 && (
            <button
              onClick={handleLoadMore}
              className="flex items-center gap-2 bg-card hover:bg-accent border border-border px-8 py-3 rounded-xl text-sm font-medium transition-all mb-4"
            >
              Load more ({remainingCount} remaining) ↓
            </button>
          )}
          <p className="text-[#a1a1aa] text-[0.85rem] flex items-center gap-2 font-mono-custom">
            <Info className="w-4 h-4" />
            Accounts listed here are submitted by real X creators. Every listing is verified by a $1 payment. No bots. No spam.
          </p>
        </div>
      </section>

      <Footer />

      <AddAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
