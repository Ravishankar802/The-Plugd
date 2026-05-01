"use client";

import { useState, useEffect } from "react";
import { 
  Loader2, 
  Trash2, 
  Edit3, 
  ChevronDown, 
  Sliders, 
  TrendingUp, 
  Check,
  Search,
  Users,
  ArrowRight
} from "lucide-react";
import AdminEditAccountModal from "./AdminEditAccountModal";

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
  const [sortBy, setSortBy] = useState("latest");
  const [isRangeOpen, setIsRangeOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<number | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await fetch("/api/accounts");
      if (res.ok) {
        const data = await res.json();
        setAccounts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/accounts/${id}`, {
        method: "DELETE",
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

  // Filter and Sort Logic
  const filteredAccounts = accounts
    .filter(a => selectedRange === "All Ranges" || a.followersRange === selectedRange)
    .sort((a, b) => {
      if (sortBy === "latest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === "shuffle") return 0.5 - Math.random();
      return 0;
    });

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 animate-spin text-white" />
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-[2rem] font-[700] text-white leading-tight">Manage Accounts</h1>
        <p className="text-[#8b8b8b] text-[1rem] mt-1">View and manage all account submissions.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button className="px-5 py-2 rounded-lg bg-white text-black font-bold text-sm hover:bg-[#e5e5e5] transition-all">
            All ({accounts.length})
          </button>
          <button className="px-5 py-2 rounded-lg bg-transparent text-[#8b8b8b] hover:text-white font-bold text-sm transition-colors">
            Recently Added
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Range Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRangeOpen(!isRangeOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-[#8b8b8b] hover:text-white transition-all text-sm font-bold"
            >
              <Sliders size={14} />
              <span>{selectedRange === "All Ranges" ? "Followers Range" : selectedRange}</span>
              <ChevronDown size={14} className={`transition-transform ${isRangeOpen ? "rotate-180" : ""}`} />
            </button>
            {isRangeOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#111111] border border-[#2a2a2a] rounded-xl shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                  {FOLLOWERS_RANGES.map(range => (
                    <button
                      key={range}
                      onClick={() => { setSelectedRange(range); setIsRangeOpen(false); }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-[#8b8b8b] hover:text-white hover:bg-[#1a1a1a] transition-all"
                    >
                      {range}
                      {selectedRange === range && <Check size={14} className="text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-[#8b8b8b] hover:text-white transition-all text-sm font-bold"
            >
              <TrendingUp size={14} />
              <span>{SORT_OPTIONS.find(o => o.id === sortBy)?.name}</span>
              <ChevronDown size={14} className={`transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
            </button>
            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#111111] border border-[#2a2a2a] rounded-xl shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setSortBy(opt.id); setIsSortOpen(false); }}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-[#8b8b8b] hover:text-white hover:bg-[#1a1a1a] transition-all"
                  >
                    {opt.name}
                    {sortBy === opt.id && <Check size={14} className="text-white" />}
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
          <div key={acc.id} className="relative bg-[#111111] border border-[#2a2a2a] rounded-[12px] p-8 flex flex-col md:flex-row md:items-center justify-between group hover:border-[#3a3a3a] transition-all shadow-xl">
            <div className="flex items-start gap-6">
              <img src={acc.avatarPath} className="w-20 h-20 rounded-[12px] object-cover border border-[#2a2a2a] shadow-lg" alt="" />
              <div className="space-y-1.5 pt-1">
                <h3 className="text-white font-[700] text-[1.4rem] tracking-tight">{acc.name}</h3>
                <p className="text-[#8b8b8b] text-[1rem] font-medium leading-snug max-w-xl">{acc.bio}</p>
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-[#555555] text-sm font-medium">Founder: {acc.name}</span>
                  <span className="text-[#555555] text-sm font-medium">Added: {new Date(acc.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-6 md:mt-0">
              <button
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-black text-sm font-bold shadow-lg hover:bg-[#e5e5e5] transition-all active:scale-[0.98]"
              >
                Visit <ArrowRight size={14} />
              </button>
              <button
                onClick={() => setEditingAccount(acc)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm font-bold hover:border-[#3a3a3a] transition-all"
              >
                Edit Profile <Edit3 size={14} />
              </button>
            </div>

            <button
              onClick={() => setIsDeleteModalOpen(acc.id)}
              className="absolute top-8 right-8 p-2 text-[#444444] hover:text-red-500 transition-colors"
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

      {/* Delete Confirmation */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(null)} />
          <div className="relative w-full max-w-sm bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Are you sure?</h3>
            <p className="text-[#a1a1aa] text-sm mb-8 leading-relaxed">This account will be permanently removed from the directory. This cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(null)}
                className="flex-1 px-4 py-3 rounded-xl bg-transparent border border-[#2a2a2a] text-[#a1a1aa] hover:text-white font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(isDeleteModalOpen)}
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
