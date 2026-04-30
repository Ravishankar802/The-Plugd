"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DirectoryTable from "@/components/DirectoryTable";
import AddAccountModal from "@/components/AddAccountModal";
import { Search, Plus } from "lucide-react";

interface Account {
  id: number;
  name: string;
  xHandle: string;
  avatarUrl: string;
  bio: string;
  niche: string;
  followers: number;
}

const NICHES = ["All", "Founder", "Builder", "Student", "Creator", "Crypto", "Other"];

export default function Home() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(50);

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    let result = accounts;

    if (selectedNiche !== "All") {
      result = result.filter((a) => a.niche === selectedNiche);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.xHandle.toLowerCase().includes(q) ||
          a.bio.toLowerCase().includes(q) ||
          a.niche.toLowerCase().includes(q)
      );
    }

    setFilteredAccounts(result);
  }, [searchQuery, selectedNiche, accounts]);

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/accounts");
      const data = await res.json();
      if (Array.isArray(data)) {
        setAccounts(data);
        setFilteredAccounts(data);
      } else {
        setAccounts([]);
        setFilteredAccounts([]);
      }
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
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search accounts, niches, names..."
              className="w-full h-[48px] bg-pill border border-border rounded-lg pl-12 pr-4 text-foreground placeholder:text-[#6b7280] dark:placeholder:text-[#6b7280] light:placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-border transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

        <div className="flex flex-wrap gap-2 mb-8">
          {NICHES.map((niche) => (
            <button
              key={niche}
              onClick={() => setSelectedNiche(niche)}
              className={`px-4 py-1.5 rounded-full text-[0.875rem] font-[500] transition-all ${
                selectedNiche === niche
                  ? "bg-foreground text-background border border-foreground"
                  : "bg-transparent text-muted border border-border hover:text-foreground hover:border-muted"
              }`}
            >
              {niche}
            </button>
          ))}
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
          <p className="text-muted text-[0.85rem] flex items-center gap-2 font-medium">
            <svg className="w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            Accounts listed here are added by founders and creators
          </p>
        </div>
      </section>

      <Footer />

      <AddAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
