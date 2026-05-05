"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Loader2, 
  Trash2, 
  SquarePen, 
  ChevronDown, 
  Sliders, 
  TrendingUp, 
  Check,
  Search,
  Users,
  ArrowRight,
  ExternalLink,
  AlertTriangle,
  Globe
} from "lucide-react";
import AdminEditAccountModal from "./AdminEditAccountModal";
import { NICHES } from "@/lib/constants";

const FOLLOWERS_RANGES = [
  "All Ranges", "0-100", "100-500", "500-1K", "1K-2K", "2K-5K", "5K-10K", "10K-25K", "25K-50K", "50K-100K", "100K+"
];

const SORT_OPTIONS = [
  { id: "latest", name: "Latest", icon: TrendingUp },
  { id: "oldest", name: "Oldest", icon: TrendingUp },
  { id: "shuffle", name: "Shuffle", icon: TrendingUp },
];

export default function AdminManageView() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState("All Ranges");
  const [selectedNiche, setSelectedNiche] = useState("All Niches");
  const [sortBy, setSortBy] = useState("latest");
  const [isRangeOpen, setIsRangeOpen] = useState(false);
  const [isNicheOpen, setIsNicheOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<number | null>(null);
  const [isCleaningUp, setIsCleaningUp] = useState(false);
  const [cleanupMessage, setCleanupMessage] = useState<string | null>(null);

  const rangeRef = useRef<HTMLDivElement>(null);
  const nicheRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAccounts();

    const handleClickOutside = (event: MouseEvent) => {
      if (rangeRef.current && !rangeRef.current.contains(event.target as Node)) {
        setIsRangeOpen(false);
      }
      if (nicheRef.current && !nicheRef.current.contains(event.target as Node)) {
        setIsNicheOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchAccounts = async () => {
    try {
      const email = localStorage.getItem("plugd_user_email");
      const res = await fetch("/api/accounts/admin", {
        headers: {
          "x-admin-email": email || "", // Keep for legacy if needed, but we'll transition to x-user-email
          "x-user-email": email || "",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setAccounts(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const email = localStorage.getItem("plugd_user_email");
      const res = await fetch(`/api/accounts/${id}`, {
        method: "DELETE",
        headers: {
          "x-user-email": email || "",
        },
      });
      if (res.ok) {
        setAccounts(accounts.filter(a => a.id !== id));
        setIsDeleteModalOpen(null);
      }
    } catch (err) {
      alert("Failed to delete account.");
    }
  };

  const handleUpdate = (updated: any) => {
    setAccounts(accounts.map(a => a.id === updated.id ? updated : a));
  };

  const handleCleanup = async () => {
    setIsCleaningUp(true);
    setCleanupMessage(null);
    try {
      const email = localStorage.getItem("plugd_user_email");
      const res = await fetch("/api/accounts/admin", {
        method: "DELETE",
        headers: { "x-user-email": email || "" },
      });
      const data = await res.json();
      setCleanupMessage(data.message || "Done.");
    } catch {
      setCleanupMessage("Cleanup failed.");
    } finally {
      setIsCleaningUp(false);
      setTimeout(() => setCleanupMessage(null), 4000);
    }
  };

  // Filter and Sort Logic
  const filteredAccounts = accounts
    .filter(a => {
      const matchesRange = selectedRange === "All Ranges" || a.followersRange === selectedRange;
      const matchesNiche = selectedNiche === "All Niches" || (Array.isArray(a.niche) ? a.niche.includes(selectedNiche) : a.niche === selectedNiche);
      return matchesRange && matchesNiche;
    })
    .sort((a, b) => {
      if (sortBy === "latest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === "shuffle") return 0.5 - Math.random();
      return 0;
    });

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 animate-spin text-foreground" />
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-[2.5rem] font-[500] text-foreground leading-tight tracking-tighter">Manage Accounts</h1>
        <p className="text-muted text-[1rem] mt-1 font-[300]">Showing paid accounts only. Abandoned pending payments are excluded.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-xl bg-selected text-selected-foreground border-selected font-bold text-sm hover:bg-accent transition-all shadow-lg">
            Paid ({accounts.length})
          </button>
          <button
            onClick={handleCleanup}
            disabled={isCleaningUp}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pill border border-border text-muted hover:text-red-500 hover:border-red-500/40 transition-all text-sm font-bold shadow-lg disabled:opacity-50"
          >
            {isCleaningUp ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            Clean up stale
          </button>
          {cleanupMessage && (
            <span className="text-green-500 text-xs font-medium animate-in fade-in">{cleanupMessage}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Range Dropdown */}
          <div className="relative" ref={rangeRef}>
            <button
              onClick={() => setIsRangeOpen(!isRangeOpen)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pill border border-border text-muted hover:text-foreground hover:border-muted transition-all text-sm font-bold shadow-xl"
            >
              <Sliders size={14} />
              <span>{selectedRange === "All Ranges" ? "Followers Range" : selectedRange}</span>
              <ChevronDown size={14} className={`transition-transform ${isRangeOpen ? "rotate-180" : ""}`} />
            </button>
            {isRangeOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                  {FOLLOWERS_RANGES.map(range => (
                    <button
                      key={range}
                      onClick={() => { setSelectedRange(range); setIsRangeOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all ${
                        selectedRange === range ? "bg-accent text-foreground" : "text-muted hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {range}
                      {selectedRange === range && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Niche Dropdown */}
          <div className="relative" ref={nicheRef}>
            <button
              onClick={() => setIsNicheOpen(!isNicheOpen)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pill border border-border text-muted hover:text-foreground hover:border-muted transition-all text-sm font-bold shadow-xl"
            >
              <Globe size={14} />
              <span>{selectedNiche === "All Niches" ? "Niche" : selectedNiche}</span>
              <ChevronDown size={14} className={`transition-transform ${isNicheOpen ? "rotate-180" : ""}`} />
            </button>
            {isNicheOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                  <button
                    onClick={() => { setSelectedNiche("All Niches"); setIsNicheOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all ${
                      selectedNiche === "All Niches" ? "bg-accent text-foreground" : "text-muted hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    All Niches
                    {selectedNiche === "All Niches" && <Check size={14} />}
                  </button>
                    {NICHES.map(niche => {
                      const Icon = niche.icon;
                      return (
                        <button
                          key={niche.name}
                          onClick={() => { setSelectedNiche(niche.name); setIsNicheOpen(false); }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all ${
                            selectedNiche === niche.name ? "bg-accent text-foreground" : "text-muted hover:text-foreground hover:bg-accent"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {Icon && <Icon size={14} />}
                            <span>{niche.name}</span>
                          </div>
                          {selectedNiche === niche.name && <Check size={14} />}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pill border border-border text-muted hover:text-foreground hover:border-muted transition-all text-sm font-bold shadow-xl"
            >
              <TrendingUp size={14} />
              <span>{SORT_OPTIONS.find(o => o.id === sortBy)?.name}</span>
              <ChevronDown size={14} className={`transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
            </button>
            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setSortBy(opt.id); setIsSortOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all ${
                      sortBy === opt.id ? "bg-accent text-foreground" : "text-muted hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    {opt.name}
                    {sortBy === opt.id && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredAccounts.map(acc => (
          <div key={acc.id} className="relative bg-pill border border-border rounded-[16px] p-8 flex flex-col group transition-all shadow-xl">
            <div className="flex items-start gap-6">
              <img src={acc.avatarUrl} className="w-14 h-14 rounded-[12px] object-cover border border-border shadow-lg" alt="" />
              <div className="space-y-1 pt-0">
                <h3 className="text-foreground font-[500] text-[1.4rem] tracking-tight">{acc.name}</h3>
                <p className="text-muted text-[1rem] font-[300] leading-snug max-w-2xl">{acc.bio}</p>
                <div className="flex items-center gap-4 pt-1">
                  <span className="text-muted/60 text-sm font-[300]">Added: {new Date(acc.createdAt).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    {(Array.isArray(acc.niche) ? acc.niche : [acc.niche]).map((n: string) => {
                      const nicheData = NICHES.find(ni => ni.name === n);
                      const Icon = nicheData?.icon;
                      return (
                        <span key={n} className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-selected/10 border border-selected/20 text-selected-foreground text-[0.7rem] font-bold">
                          {Icon && <Icon size={12} />}
                          {n}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-row items-center gap-3 mt-6 ml-0 md:ml-20 overflow-hidden">
              <a
                href={`https://x.com/${acc.xHandle.startsWith("@") ? acc.xHandle.substring(1) : acc.xHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center gap-2.5 px-4 md:px-6 py-2 rounded-lg bg-background dark:bg-selected border border-border text-foreground dark:text-selected-foreground text-sm font-bold shadow-lg hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                Visit <ExternalLink size={14} />
              </a>
              <button
                onClick={() => setEditingAccount(acc)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2.5 px-4 md:px-6 py-2 rounded-lg bg-background dark:bg-selected border border-border text-foreground dark:text-selected-foreground text-sm font-bold shadow-lg hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                Edit Profile <SquarePen size={14} />
              </button>
            </div>

            <button
              onClick={() => setIsDeleteModalOpen(acc.id)}
              className="absolute top-8 right-8 p-2 text-muted/40 hover:text-red-500 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      {editingAccount && (
        <AdminEditAccountModal
          account={editingAccount}
          isOpen={!!editingAccount}
          onClose={() => setEditingAccount(null)}
          onSave={handleUpdate}
        />
      )}

      {/* Delete Confirmation Modal Refined */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(null)} />
          <div className="relative w-full max-w-lg bg-card border border-border rounded-[24px] p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0 border border-red-500/20">
                <AlertTriangle size={28} className="text-red-500" />
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-[1.5rem] font-bold text-foreground">Delete Account</h3>
                  <p className="text-muted text-[1.05rem] leading-relaxed">
                    Are you sure you want to delete <span className="text-foreground font-bold">{accounts.find(a => a.id === isDeleteModalOpen)?.name}</span>? This action cannot be undone and will permanently remove the account profile.
                  </p>
                </div>
                
                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={() => setIsDeleteModalOpen(null)}
                    className="px-8 py-3 rounded-xl bg-transparent border border-border text-foreground font-bold hover:bg-accent transition-all text-[0.95rem]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(isDeleteModalOpen)}
                    className="px-8 py-3 rounded-xl bg-[#8b0000] text-white font-bold hover:bg-red-800 transition-all shadow-lg shadow-red-900/20 text-[0.95rem]"
                  >
                    Delete Permanently
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
