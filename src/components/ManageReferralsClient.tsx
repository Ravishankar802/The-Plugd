"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Loader2, 
  Search, 
  Check, 
  Copy, 
  History, 
  Wallet, 
  TrendingUp, 
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Download,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

interface Payout {
  id: string;
  amount: number;
  note: string | null;
  createdAt: string;
}

interface Promoter {
  id: number;
  email: string;
  name: string;
  xHandle: string | null;
  referralCode: string;
  payoutMethod: string | null;
  payoutDetails: string | null;
  totalEarned: number;
  pendingPayout: number;
  totalPaid: number;
  totalClicks: number;
  totalSignups: number;
  paidUsers: number;
  revenueGenerated: number;
  createdAt: string;
  payouts: Payout[];
}

export default function ManageReferralsClient() {
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [historyPromoter, setHistoryPromoter] = useState<Promoter | null>(null);
  const [payoutPromoter, setPayoutPromoter] = useState<Promoter | null>(null);
  const [payoutNote, setPayoutNote] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  
  // Sorting state
  const [sortField, setSortField] = useState<keyof Promoter>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchPromoters();
  }, []);

  const fetchPromoters = async () => {
    try {
      const res = await fetch("/api/admin/referrals");
      if (res.ok) {
        const data = await res.json();
        setPromoters(data);
      }
    } catch (err) {
      console.error("Failed to fetch promoters:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleMarkAsPaid = async () => {
    if (!payoutPromoter) return;
    
    setIsPaying(true);
    try {
      const res = await fetch(`/api/admin/referrals/${payoutPromoter.id}/mark-paid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: payoutNote })
      });

      if (res.ok) {
        // Optimistic UI/Refresh
        await fetchPromoters();
        setPayoutPromoter(null);
        setPayoutNote("");
      } else {
        const error = await res.json();
        alert("Failed to process payout: " + (error.error || "Unknown error"));
      }
    } catch (err) {
      alert("Failed to process payout.");
    } finally {
      setIsPaying(false);
    }
  };

  // Calculations
  const stats = useMemo(() => {
    return promoters.reduce((acc, p) => {
      acc.totalPending += p.pendingPayout;
      acc.totalPaid += p.totalPaid;
      acc.totalRevenue += p.revenueGenerated;
      acc.totalConversions += p.totalSignups;
      return acc;
    }, { totalPending: 0, totalPaid: 0, totalRevenue: 0, totalConversions: 0 });
  }, [promoters]);

  const filteredAndSorted = useMemo(() => {
    return promoters
      .filter(p => 
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.referralCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        
        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortOrder === "asc" 
            ? aVal.localeCompare(bVal) 
            : bVal.localeCompare(aVal);
        }
        
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        }
        
        return 0;
      });
  }, [promoters, searchQuery, sortField, sortOrder]);

  const handleSort = (field: keyof Promoter) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const exportCsv = () => {
    const headers = ["Name", "Email", "Referral Code", "Total Clicks", "Conversions", "Revenue", "Pending Payout", "Total Paid", "Joined"];
    const rows = promoters.map(p => [
      p.name,
      p.email,
      p.referralCode,
      p.totalClicks,
      p.totalSignups,
      `$${p.revenueGenerated}`,
      `$${p.pendingPayout}`,
      `$${p.totalPaid}`,
      new Date(p.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(r => r.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `plugd_referrals_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return (
    <div className="flex flex-col gap-8 animate-pulse">
      <div className="h-10 w-64 bg-card rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-card rounded-2xl" />)}
      </div>
      <div className="h-[600px] w-full bg-card rounded-xl" />
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1400px] mx-auto">
      <div className="mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div>
          <h1 className="text-[2.5rem] font-[700] text-foreground leading-tight tracking-tight">Manage Referrals</h1>
          <p className="text-muted text-[1.1rem] mt-1.5 font-normal">Track promoter performance and manage payouts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={exportCsv}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-pill border border-border text-foreground hover:bg-accent transition-all font-bold text-sm shadow-xl"
          >
            <Download size={16} />
            Export CSV
          </button>
          <Link 
            href="/"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-selected text-selected-foreground font-bold text-sm shadow-xl hover:opacity-90 transition-all"
          >
            Home <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-pill border border-border rounded-2xl p-8 shadow-xl">
          <p className="text-muted text-[0.75rem] font-bold uppercase tracking-[0.15em] mb-3">Total Pending</p>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-black text-[#f97316]">${stats.totalPending.toFixed(2)}</p>
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-[#f97316]" />
            </div>
          </div>
        </div>
        <div className="bg-pill border border-border rounded-2xl p-8 shadow-xl">
          <p className="text-muted text-[0.75rem] font-bold uppercase tracking-[0.15em] mb-3">Total Paid Out</p>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-black text-foreground">${stats.totalPaid.toFixed(2)}</p>
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-pill border border-border rounded-2xl p-8 shadow-xl">
          <p className="text-muted text-[0.75rem] font-bold uppercase tracking-[0.15em] mb-3">Platform Revenue</p>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-black text-foreground">${stats.totalRevenue.toFixed(2)}</p>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="bg-pill border border-border rounded-2xl p-8 shadow-xl">
          <p className="text-muted text-[0.75rem] font-bold uppercase tracking-[0.15em] mb-3">Total Conversions</p>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-black text-foreground">{stats.totalConversions}</p>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-pill border border-border rounded-[24px] shadow-2xl overflow-hidden flex flex-col">
        <div className="p-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/60" />
            <input 
              type="text"
              placeholder="Search by email, name or code..."
              className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-3.5 text-foreground placeholder:text-muted/40 focus:outline-none focus:border-muted transition-all shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <p className="text-muted text-sm font-medium">Found {filteredAndSorted.length} promoters</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-foreground/[0.02] border-b border-border">
                <th className="px-6 py-5 text-[0.75rem] font-bold text-muted uppercase tracking-widest cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("name")}>
                  <div className="flex items-center gap-2">User {sortField === "name" && <ChevronDown size={14} className={sortOrder === "asc" ? "rotate-180" : ""} />}</div>
                </th>
                <th className="px-6 py-5 text-[0.75rem] font-bold text-muted uppercase tracking-widest cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("referralCode")}>
                  Code
                </th>
                <th className="px-6 py-5 text-[0.75rem] font-bold text-muted uppercase tracking-widest text-center cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("totalClicks")}>
                  Clicks
                </th>
                <th className="px-6 py-5 text-[0.75rem] font-bold text-muted uppercase tracking-widest text-center cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("totalSignups")}>
                  Signups
                </th>
                <th className="px-6 py-5 text-[0.75rem] font-bold text-muted uppercase tracking-widest text-center cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("revenueGenerated")}>
                  Revenue
                </th>
                <th className="px-6 py-5 text-[0.75rem] font-bold text-muted uppercase tracking-widest text-right cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("pendingPayout")}>
                  Pending
                </th>
                <th className="px-6 py-5 text-[0.75rem] font-bold text-muted uppercase tracking-widest text-right cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("totalPaid")}>
                  Total Paid
                </th>
                <th className="px-6 py-5 text-[0.75rem] font-bold text-muted uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredAndSorted.length > 0 ? filteredAndSorted.map((p) => (
                <tr key={p.id} className="hover:bg-foreground/[0.01] transition-colors group">
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-foreground font-bold text-[0.95rem]">{p.name}</span>
                      <span className="text-muted text-[0.8rem]">{p.email}</span>
                      {p.xHandle && <span className="text-[#f97316] text-[0.75rem] font-medium">@{p.xHandle.replace(/^@+/, '')}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <button 
                      onClick={() => handleCopy(`https://the-plugd.vercel.app?ref=${p.referralCode}`, `link-${p.id}`)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/50 border border-border text-foreground text-[0.8rem] font-mono font-bold hover:bg-accent transition-all group/btn"
                    >
                      {p.referralCode}
                      {copied === `link-${p.id}` ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-muted group-hover/btn:text-foreground" />}
                    </button>
                  </td>
                  <td className="px-6 py-6 text-center text-muted font-medium">{p.totalClicks}</td>
                  <td className="px-6 py-6 text-center">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[0.8rem] font-bold">
                      {p.totalSignups}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-center font-bold text-foreground">
                    ${p.revenueGenerated.toFixed(0)}
                  </td>
                  <td className="px-6 py-6 text-right">
                    <span className={`px-3 py-1.5 rounded-lg font-black text-[0.9rem] ${p.pendingPayout > 0 ? "bg-orange-500/10 text-[#f97316]" : "bg-muted/10 text-muted/60"}`}>
                      ${p.pendingPayout.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right text-foreground font-bold">
                    ${p.totalPaid.toFixed(2)}
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setHistoryPromoter(p)}
                        className="p-2.5 rounded-lg bg-background border border-border text-muted hover:text-foreground hover:border-muted transition-all shadow-sm"
                        title="Payout History"
                      >
                        <History size={18} />
                      </button>
                      <button 
                        disabled={p.pendingPayout <= 0}
                        onClick={() => setPayoutPromoter(p)}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm ${
                          p.pendingPayout > 0 
                          ? "bg-[#f97316] text-white hover:opacity-90 active:scale-[0.98]" 
                          : "bg-muted/10 text-muted/40 cursor-not-allowed"
                        }`}
                      >
                        Mark Paid
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center">
                        <Search className="w-8 h-8 text-muted/40" />
                      </div>
                      <p className="text-muted font-medium">No promoters found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout History Modal */}
      {historyPromoter && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setHistoryPromoter(null)} />
          <div className="relative w-full max-w-2xl bg-card border border-border rounded-[24px] shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
            <div className="p-8 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Payout History</h3>
                <p className="text-muted font-medium mt-1">{historyPromoter.name} ({historyPromoter.email})</p>
              </div>
              <button onClick={() => setHistoryPromoter(null)} className="p-2 hover:bg-accent rounded-lg transition-colors">
                <ArrowRight className="w-6 h-6 rotate-180" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              {historyPromoter.payouts.length > 0 ? historyPromoter.payouts.map(payout => (
                <div key={payout.id} className="bg-pill border border-border rounded-xl p-5 flex items-center justify-between">
                  <div>
                    <p className="text-foreground font-black text-lg">${payout.amount.toFixed(2)}</p>
                    <p className="text-muted text-sm font-medium mt-1">{payout.note || "No note added"}</p>
                  </div>
                  <p className="text-muted text-xs font-bold uppercase tracking-wider">
                    {new Date(payout.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              )) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-4">
                    <History className="w-6 h-6 text-muted/40" />
                  </div>
                  <p className="text-muted font-medium">No previous payouts found for this promoter.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mark as Paid Modal */}
      {payoutPromoter && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setPayoutPromoter(null)} />
          <div className="relative w-full max-w-lg bg-card border border-border rounded-[24px] p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-[#f97316]/10 rounded-2xl flex items-center justify-center shrink-0 border border-[#f97316]/20">
                <Wallet size={32} className="text-[#f97316]" />
              </div>
              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Confirm Payout</h3>
                  <p className="text-muted text-[1.05rem] leading-relaxed">
                    You are marking <span className="text-foreground font-bold">${payoutPromoter.pendingPayout.toFixed(2)}</span> as paid for <span className="text-foreground font-bold">{payoutPromoter.name}</span>.
                  </p>
                </div>

                {payoutPromoter.payoutMethod && (
                  <div className="bg-pill border border-border rounded-xl p-4 space-y-2">
                    <p className="text-[0.7rem] text-muted font-bold uppercase tracking-widest">Payment Info</p>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground font-bold">{payoutPromoter.payoutMethod}</span>
                      <button 
                        onClick={() => handleCopy(payoutPromoter.payoutDetails || "", 'details')}
                        className="text-[#f97316] font-bold text-sm hover:underline flex items-center gap-1"
                      >
                        {payoutPromoter.payoutDetails} <Copy size={12} />
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  <label className="text-sm font-bold text-muted uppercase tracking-wider">Internal Note (Optional)</label>
                  <textarea 
                    placeholder="e.g. Paid via PayPal transaction #12345"
                    className="w-full bg-background border border-border rounded-xl p-4 text-foreground focus:outline-none focus:border-muted transition-all shadow-inner h-24 resize-none"
                    value={payoutNote}
                    onChange={(e) => setPayoutNote(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    onClick={() => setPayoutPromoter(null)}
                    className="flex-1 py-4 rounded-xl bg-transparent border border-border text-foreground font-bold hover:bg-accent transition-all text-[1rem]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleMarkAsPaid}
                    disabled={isPaying}
                    className="flex-1 py-4 rounded-xl bg-[#f97316] text-white font-black hover:opacity-90 transition-all shadow-lg shadow-orange-900/20 text-[1rem] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isPaying ? <Loader2 size={20} className="animate-spin" /> : "Confirm Payout"}
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
