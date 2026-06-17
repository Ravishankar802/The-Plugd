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
  AlertCircle,
  Edit,
  X,
  Camera,
  Trash2,
  Upload
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { COUNTRY_CODES } from "@/lib/countryCodes";

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahrain", "Bangladesh", "Belarus", "Belgium", "Benin", "Bolivia", "Bosnia and Herzegovina", "Botswana",
  "Brazil", "Bulgaria", "Burkina Faso", "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia",
  "Costa Rica", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Estonia", "Ethiopia", "Finland", "France", "Georgia", "Germany", "Ghana", "Greece",
  "Guatemala", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iraq", "Ireland",
  "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kosovo",
  "Kuwait", "Kyrgyzstan", "Latvia", "Lebanon", "Libya", "Lithuania", "Luxembourg", "Malaysia", "Mali",
  "Malta", "Mexico", "Moldova", "Mongolia", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal",
  "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palestine", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Sierra Leone", "Singapore",
  "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden", "Switzerland",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tunisia", "Turkey", "Turkmenistan", "Uganda",
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Other"
];


interface Payout {
  id: string;
  amount: number;
  note: string | null;
  createdAt: string;
}

interface WithdrawalRequest {
  id: string;
  amount: number;
  method: string;
  details: string;
  status: string;
  createdAt: string;
}

interface Promoter {
  id: number;
  email: string;
  name: string;
  xHandle: string | null;
  phoneNumber?: string | null;
  username: string | null;
  referralCode: string;
  payoutMethod: string | null;
  payoutDetails: string | null;
  payoutRegion: string | null;
  upiId: string | null;
  bankAccountName: string | null;
  bankAccountNumber: string | null;
  bankIfsc: string | null;
  intlAccountHolderName: string | null;
  intlRoutingNumber: string | null;
  intlAccountNumber: string | null;
  intlSortCode: string | null;
  intlIban: string | null;
  intlBicSwift: string | null;
  intlBsbCode: string | null;
  intlTransitNumber: string | null;
  intlInstitutionNumber: string | null;
  intlBankCountry: string | null;
  paypalEmail: string | null;
  totalEarned: number;
  pendingPayout: number;
  totalPaid: number;
  totalClicks: number;
  totalSignups: number;
  paidUsers: number;
  revenueGenerated: number;
  avatarUrl: string | null;
  currentEarnings?: number;
  earningRatePerSec?: number;
  baseLastMonth?: number;
  createdAt: string;
  payouts: Payout[];
  pendingWithdrawalRequest: WithdrawalRequest | null;
}

function getPayoutSummary(promoter: Promoter) {
  if (promoter.payoutRegion === "INDIA") {
    if (promoter.upiId) {
      return `UPI: ${promoter.upiId}`;
    } else if (promoter.bankAccountNumber) {
      return `Bank: ${promoter.bankAccountName || ""} | ${promoter.bankAccountNumber} | ${promoter.bankIfsc || ""}`;
    }
    return promoter.payoutDetails || "";
  }
  
  if (promoter.payoutRegion === "INTERNATIONAL") {
    if (promoter.paypalEmail) {
      return `PayPal: ${promoter.paypalEmail}`;
    }
    const intlParts = [
      promoter.intlAccountHolderName,
      promoter.intlIban || promoter.intlAccountNumber,
      promoter.intlBicSwift || promoter.intlSortCode || promoter.intlBsbCode || promoter.intlRoutingNumber,
    ].filter(Boolean);
    if (intlParts.length) return `Bank: ${intlParts.join(" | ")}`;
    return promoter.payoutDetails || "";
  }
  
  return promoter.payoutDetails || "";
}

const GRADIENTS = [
  "from-emerald-500 to-green-300",
  "from-purple-500 to-pink-300",
  "from-blue-500 to-cyan-300",
  "from-amber-500 to-yellow-300",
  "from-red-500 to-orange-300",
  "from-violet-600 to-indigo-400",
  "from-fuchsia-500 to-purple-300",
  "from-rose-500 to-red-300",
  "from-teal-500 to-emerald-300",
  "from-sky-500 to-blue-300"
];

export default function ManageReferralsClient() {
  const router = useRouter();
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [historyPromoter, setHistoryPromoter] = useState<Promoter | null>(null);
  const [payoutPromoter, setPayoutPromoter] = useState<Promoter | null>(null);
  const [payoutNote, setPayoutNote] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  // Edit Profile States
  const [editingPromoter, setEditingPromoter] = useState<Promoter | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editPhoneCode, setEditPhoneCode] = useState("+91");
  const [editPhoneNo, setEditPhoneNo] = useState("");
  
  // Sorting state
  const [sortField, setSortField] = useState<keyof Promoter>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    fetchPromoters();

    // Live update interval
    const interval = setInterval(() => {
      setPromoters(prev => {
        const nextList = prev.map(p => {
          if (!p.earningRatePerSec) return p;
          const hasEarned = Math.random() > 0.3; 
          const multiplier = hasEarned ? (0.5 + Math.random() * 1.5) : 0;
          const expectedReferralsPerMin = (p.earningRatePerSec * 0.6) * multiplier;
          const numReferrals = Math.floor(expectedReferralsPerMin) + (Math.random() < (expectedReferralsPerMin % 1) ? 1 : 0);
          const increment = numReferrals * 100;
          const currentEarnings = (p.currentEarnings || Math.round(p.totalEarned / 100) * 100) + increment;
          return {
            ...p,
            currentEarnings,
            totalSignups: Math.floor(currentEarnings / 100)
          };
        });

        // Save to localStorage so it stays perfectly synced with the homepage
        const storeData: Record<string, number> = {};
        nextList.forEach(p => {
          const isDisplayPromoter = p.email.toLowerCase().endsWith("@example.com");
          if (isDisplayPromoter && p.currentEarnings) {
            storeData[p.id.toString()] = p.currentEarnings;
          }
        });
        try {
          localStorage.setItem("plugd_leaderboard_earnings_v2", JSON.stringify(storeData));
        } catch (err) {}

        return nextList;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (editingPromoter) {
      setEditForm({
        name: editingPromoter.name || "",
        email: editingPromoter.email || "",
        username: editingPromoter.username || "",
        xHandle: editingPromoter.xHandle || "",
        avatarUrl: editingPromoter.avatarUrl || "",
        totalEarned: editingPromoter.totalEarned || 0,
        pendingPayout: editingPromoter.pendingPayout || 0,
        totalPaid: editingPromoter.totalPaid || 0,
        payoutRegion: editingPromoter.payoutRegion || "INDIA",
        upiId: editingPromoter.upiId || "",
        paypalEmail: editingPromoter.paypalEmail || "",
        bankAccountName: editingPromoter.bankAccountName || "",
        bankAccountNumber: editingPromoter.bankAccountNumber || "",
        bankIfsc: editingPromoter.bankIfsc || "",
        intlAccountHolderName: editingPromoter.intlAccountHolderName || "",
        intlRoutingNumber: editingPromoter.intlRoutingNumber || "",
        intlAccountNumber: editingPromoter.intlAccountNumber || "",
        intlSortCode: editingPromoter.intlSortCode || "",
        intlIban: editingPromoter.intlIban || "",
        intlBicSwift: editingPromoter.intlBicSwift || "",
        intlBsbCode: editingPromoter.intlBsbCode || "",
        intlTransitNumber: editingPromoter.intlTransitNumber || "",
        intlInstitutionNumber: editingPromoter.intlInstitutionNumber || "",
        intlBankCountry: editingPromoter.intlBankCountry || "",
      });
      const phone = editingPromoter.phoneNumber || "";
      let parsedCode = "+91";
      let parsedNo = "";
      if (phone) {
        const sortedCodes = [...COUNTRY_CODES].sort((a, b) => b.dialCode.length - a.dialCode.length);
        const matched = sortedCodes.find(c => phone.startsWith(c.dialCode));
        if (matched) {
          parsedCode = matched.dialCode;
          parsedNo = phone.slice(matched.dialCode.length);
        } else {
          parsedNo = phone;
        }
      }
      setEditPhoneCode(parsedCode);
      setEditPhoneNo(parsedNo);
      setEditError(null);
    }
  }, [editingPromoter]);

  const fetchPromoters = async () => {
    try {
      const res = await fetch("/api/admin/referrals");
      if (res.ok) {
        const data = await res.json();
        
        let storedData: Record<string, number> = {};
        try {
          const stored = localStorage.getItem("plugd_leaderboard_earnings_v2");
          if (stored) {
            storedData = JSON.parse(stored);
          }
        } catch (err) {}

        // Sort by totalEarned desc to calculate rank-based daily earning rate
        const sortedData = [...data].sort((a: any, b: any) => b.totalEarned - a.totalEarned);

        const mapped = sortedData.map((p: any, index: number) => {
          const isDisplayPromoter = p.email.toLowerCase().endsWith("@example.com");
          if (!isDisplayPromoter) {
            return {
              ...p,
              earningRatePerSec: 0,
              baseLastMonth: p.totalEarned,
              currentEarnings: p.totalEarned,
              totalSignups: Math.floor(p.totalEarned / 100)
            };
          }

          const rank = index + 1;
          const factor = Math.max(0, (50 - rank) / 48); // from 1.0 down to 0.0
          
          let dailyRate = 0;
          if (rank === 1) {
            dailyRate = 120000;
          } else {
            dailyRate = 30000 + 60000 * Math.pow(factor, 2.0);
          }
          const earningRatePerSec = dailyRate / 86400;
          
          // Deterministic growth rate based on rank
          const baseGrowthVal = 8 + ((rank * 73) % 28); // 8% to 35%
          const isNegative = rank > 10 && (rank % 12 === 0 || rank % 19 === 0);
          const initialGrowth = isNegative ? -baseGrowthVal / 4 : baseGrowthVal;
          const baseLastMonth = p.totalEarned / (1 + initialGrowth / 100);

          const storedVal = storedData[p.id.toString()];
          const cleanStoredVal = storedVal ? Math.round(storedVal / 100) * 100 : null;
          const finalEarnings = cleanStoredVal ? Math.max(cleanStoredVal, Math.round(p.totalEarned / 100) * 100) : Math.round(p.totalEarned / 100) * 100;

          return {
            ...p,
            earningRatePerSec,
            baseLastMonth,
            currentEarnings: finalEarnings,
            totalSignups: Math.floor(finalEarnings / 100)
          };
        });

        setPromoters(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch promoters:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPromoter) return;

    setEditSaving(true);
    setEditError(null);

    try {
      const payload = {
        ...editForm,
        phoneNumber: editPhoneNo.trim() ? `${editPhoneCode}${editPhoneNo.trim()}` : null
      };
      const res = await fetch(`/api/admin/referrals/${editingPromoter.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        await fetchPromoters();
        setEditingPromoter(null);
      } else {
        const data = await res.json();
        setEditError(data.error || "Failed to update profile");
      }
    } catch (err: any) {
      setEditError(err.message || "An error occurred");
    } finally {
      setEditSaving(false);
    }
  };
  
  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB. Please select a smaller file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxDim = 150;
        
        let width = img.width;
        let height = img.height;
        const size = Math.min(width, height);
        
        canvas.width = maxDim;
        canvas.height = maxDim;
        
        if (ctx) {
          const sx = (width - size) / 2;
          const sy = (height - size) / 2;
          ctx.drawImage(img, sx, sy, size, size, 0, 0, maxDim, maxDim);
          try {
            const compressedBase64 = canvas.toDataURL("image/jpeg", 0.85);
            setEditForm((prev: any) => ({
              ...prev,
              avatarUrl: compressedBase64
            }));
          } catch (err) {
            console.error("Canvas toDataURL failed:", err);
            alert("Failed to process image.");
          }
        }
      };
      img.onerror = () => {
        alert("Failed to load image file.");
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setEditForm((prev: any) => ({
      ...prev,
      avatarUrl: ""
    }));
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

  const isTop50Earner = useMemo(() => {
    if (!editingPromoter) return false;
    const sorted = [...promoters].sort((a, b) => b.totalEarned - a.totalEarned);
    return sorted.slice(0, 50).some(p => p.id === editingPromoter.id);
  }, [editingPromoter, promoters]);

  // Calculations
  const stats = useMemo(() => {
    return promoters.reduce((acc, p) => {
      acc.totalPending += p.pendingPayout;
      acc.totalPaid += p.totalPaid;
      // Exclude seeded display promoters from platform revenue and conversions summary
      const isDisplayPromoter = p.email.toLowerCase().endsWith("@example.com");
      if (!isDisplayPromoter) {
        acc.totalRevenue += p.revenueGenerated;
        acc.totalConversions += p.totalSignups;
      }
      return acc;
    }, { totalPending: 0, totalPaid: 0, totalRevenue: 0, totalConversions: 0 });
  }, [promoters]);

  const filteredAndSorted = useMemo(() => {
    return promoters
      .filter(p => 
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.referralCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.username && p.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
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
    const headers = ["Name", "Email", "Username", "Referral Code", "Total Clicks", "Conversions", "Earnings", "Pending Payout", "Total Paid", "Joined"];
    const rows = promoters.map(p => [
      p.name,
      p.email,
      p.username || "",
      p.referralCode,
      p.totalClicks,
      p.totalSignups,
      `₹${Math.round(p.currentEarnings || p.totalEarned)}`,
      `₹${p.pendingPayout}`,
      `₹${p.totalPaid}`,
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1200px] mx-auto w-full space-y-5 overflow-x-hidden px-1 md:px-0">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground leading-tight tracking-tight">Manage Referrals</h1>
          <p className="text-muted-foreground text-sm mt-1 font-normal">Track promoter performance and manage payouts.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={exportCsv}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pill border border-border text-foreground hover:bg-accent transition-all font-bold text-xs shadow-sm"
          >
            <Download size={12} />
            CSV
          </button>
          <Link 
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-selected text-selected-foreground font-bold text-xs shadow-sm hover:opacity-90 transition-all"
          >
            Home <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="bg-pill border border-border rounded-xl p-4 shadow-sm">
          <p className="text-muted text-[0.6rem] font-bold uppercase tracking-[0.15em] mb-1.5">Total Pending</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-[#16a34a]">₹{stats.totalPending.toFixed(2)}</p>
            <div className="w-7 h-7 rounded-lg bg-green-600/10 flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5 text-[#16a34a]" />
            </div>
          </div>
        </div>
        <div className="bg-pill border border-border rounded-xl p-4 shadow-sm">
          <p className="text-muted text-[0.6rem] font-bold uppercase tracking-[0.15em] mb-1.5">Total Paid Out</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-foreground">₹{stats.totalPaid.toFixed(2)}</p>
            <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-pill border border-border rounded-xl p-4 shadow-sm">
          <p className="text-muted text-[0.6rem] font-bold uppercase tracking-[0.15em] mb-1.5">Platform Revenue</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-foreground">₹{stats.totalRevenue.toFixed(2)}</p>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="bg-pill border border-border rounded-xl p-4 shadow-sm">
          <p className="text-muted text-[0.6rem] font-bold uppercase tracking-[0.15em] mb-1.5">Conversions</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold text-foreground">{stats.totalConversions}</p>
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-pill border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-3 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 max-w-md w-full">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted/60" />
              <input 
                type="text"
                placeholder="Search email, name or code..."
                className="w-full bg-background border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted/40 focus:outline-none focus:border-muted transition-all shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <p className="text-muted text-[0.7rem] font-medium hidden sm:block">Found {filteredAndSorted.length}</p>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto z-30">
            <p className="text-muted text-[0.7rem] font-medium sm:hidden">Found {filteredAndSorted.length}</p>
            {/* Custom Sort Joined Dropdown */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => {
                  setSortOpen(!sortOpen);
                }}
                className="flex items-center justify-between gap-2 px-4 py-2 bg-accent border border-border text-foreground rounded-lg text-sm font-semibold focus:outline-none transition-all min-w-[160px] whitespace-nowrap shadow-sm select-none cursor-pointer hover:bg-accent/80"
              >
                <span>
                  {sortField === "createdAt" 
                    ? (sortOrder === "desc" ? "Recently Joined" : "Earliest Joined") 
                    : "Custom Sorted"}
                </span>
                <ChevronDown size={16} className={`text-muted transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
              </button>
              
              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setSortOpen(false)} />
                  <div className="absolute right-0 mt-1.5 w-[190px] bg-card border border-border rounded-xl shadow-2xl p-1 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button
                      type="button"
                      onClick={() => {
                        setSortField("createdAt");
                        setSortOrder("desc");
                        setSortOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left text-sm font-bold transition-colors whitespace-nowrap ${
                        sortField === "createdAt" && sortOrder === "desc"
                        ? "bg-white/10 text-foreground" 
                        : "text-foreground hover:bg-accent"
                      }`}
                    >
                      <span>Recently Joined</span>
                      {sortField === "createdAt" && sortOrder === "desc" && <Check size={12} className="text-foreground shrink-0" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSortField("createdAt");
                        setSortOrder("asc");
                        setSortOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left text-sm font-bold transition-colors whitespace-nowrap ${
                        sortField === "createdAt" && sortOrder === "asc"
                        ? "bg-white/10 text-foreground" 
                        : "text-foreground hover:bg-accent"
                      }`}
                    >
                      <span>Earliest Joined</span>
                      {sortField === "createdAt" && sortOrder === "asc" && <Check size={12} className="text-foreground shrink-0" />}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[800px] md:min-w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-foreground/[0.02] border-b border-border">
                <th className="px-3 py-2 text-[0.65rem] font-bold text-muted uppercase tracking-widest w-10 text-center">
                  #
                </th>
                <th className="px-3 py-2 text-[0.65rem] font-bold text-muted uppercase tracking-widest cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("name")}>
                  <div className="flex items-center gap-1.5">User {sortField === "name" && <ChevronDown size={10} className={sortOrder === "asc" ? "rotate-180" : ""} />}</div>
                </th>
                <th className="px-3 py-2 text-[0.65rem] font-bold text-muted uppercase tracking-widest cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("referralCode")}>
                  Code
                </th>
                <th className="px-3 py-2 text-[0.65rem] font-bold text-muted uppercase tracking-widest">
                  Phone Number
                </th>
                <th className="hidden sm:table-cell px-3 py-2 text-[0.65rem] font-bold text-muted uppercase tracking-widest text-center cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("totalClicks")}>
                  Clicks
                </th>
                <th className="px-3 py-2 text-[0.65rem] font-bold text-muted uppercase tracking-widest text-center cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("totalSignups")}>
                  Conversions
                </th>
                <th className="hidden lg:table-cell px-3 py-2 text-[0.65rem] font-bold text-muted uppercase tracking-widest text-center cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("totalEarned")}>
                  Earnings
                </th>
                <th className="px-3 py-2 text-[0.65rem] font-bold text-muted uppercase tracking-widest text-right cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("pendingPayout")}>
                  Pending
                </th>
                <th className="hidden lg:table-cell px-3 py-2 text-[0.65rem] font-bold text-muted uppercase tracking-widest text-right cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort("totalPaid")}>
                  Paid
                </th>
                <th className="px-3 py-2 text-[0.65rem] font-bold text-muted uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredAndSorted.length > 0 ? filteredAndSorted.map((p, index) => (
                <tr 
                  key={p.id} 
                  className="hover:bg-foreground/[0.01] transition-colors group cursor-pointer"
                  onClick={() => router.push(`/p/${p.username || p.referralCode}`)}
                >
                  <td className="px-3 py-2.5 text-center text-muted font-bold w-10">
                    {index + 1}
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      {p.avatarUrl ? (
                        <img 
                          src={p.avatarUrl} 
                          alt={p.name}
                          className="w-7 h-7 rounded-full object-cover border border-border/40 shrink-0"
                        />
                      ) : (
                        <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${GRADIENTS[p.id % GRADIENTS.length]} text-white font-bold text-[10px] flex items-center justify-center shadow-sm shrink-0`}>
                          {p.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-foreground font-bold truncate" title={p.name}>{p.name}</span>
                        <span className="text-muted text-[0.65rem] truncate" title={p.email}>{p.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="max-w-[100px] truncate">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(`https://theplugd.com?ref=${p.username || p.referralCode}`, `link-${p.id}`);
                        }}
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-accent/50 border border-border text-foreground text-[0.65rem] font-mono font-bold hover:bg-accent transition-all group/btn"
                      >
                        <span className="truncate">{p.username || p.referralCode}</span>
                        {copied === `link-${p.id}` ? <Check size={8} className="text-green-500" /> : <Copy size={8} className="text-muted group-hover/btn:text-foreground" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="font-mono font-medium text-foreground text-[0.75rem]">
                      {p.phoneNumber || "—"}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell px-3 py-2.5 text-center text-muted font-medium">{p.totalClicks}</td>
                  <td className="px-3 py-2.5 text-center">
                    <span className="px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[0.6rem] font-bold">
                      {p.totalSignups}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell px-3 py-2.5 text-center font-bold text-foreground">
                    ₹{new Intl.NumberFormat("en-IN", {
                      maximumFractionDigits: 0
                    }).format(p.currentEarnings || p.totalEarned)}
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className={`px-1.5 py-0.5 rounded-md font-bold text-[0.7rem] ${p.pendingPayout > 0 ? "bg-green-600/10 text-[#16a34a]" : "bg-muted/10 text-muted/60"}`}>
                      ₹{p.pendingPayout.toFixed(2)}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell px-3 py-2.5 text-right text-foreground font-bold">
                    ₹{p.totalPaid.toFixed(2)}
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingPromoter(p);
                        }}
                        className="p-1 rounded-md bg-background border border-border text-muted hover:text-[#16a34a] hover:border-[#16a34a]/40 transition-all shadow-sm cursor-pointer"
                        title="Edit Profile"
                      >
                        <Edit size={12} />
                      </button>

                      {p.pendingWithdrawalRequest ? (
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[0.65rem] font-bold shrink-0 animate-pulse border border-amber-500/20">
                            REQUESTED (₹{p.pendingWithdrawalRequest.amount})
                          </span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setPayoutPromoter(p);
                            }}
                            className="bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded-md font-bold text-[0.65rem] transition-all shadow-sm active:scale-[0.98] shrink-0 cursor-pointer"
                          >
                            Mark Paid
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setHistoryPromoter(p);
                            }}
                            className="p-1 rounded-md bg-background border border-border text-muted hover:text-foreground hover:border-muted transition-all shadow-sm"
                            title="Payout History"
                          >
                            <History size={12} />
                          </button>
                          <button 
                            disabled={p.pendingPayout <= 0}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPayoutPromoter(p);
                            }}
                            className={`px-2 py-1 rounded-md font-bold text-[0.65rem] transition-all shadow-sm ${
                              p.pendingPayout > 0 
                              ? "bg-[#16a34a] text-white hover:opacity-90 active:scale-[0.98]" 
                              : "bg-muted/10 text-muted/40 cursor-not-allowed"
                            }`}
                          >
                            Paid
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={9} className="px-3 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-5 h-5 text-muted/40" />
                      <p className="text-muted font-medium text-[0.65rem]">No promoters found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Promoter Profile Modal */}
      {editingPromoter && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setEditingPromoter(null)} />
          <div className="relative w-full max-w-2xl bg-card border border-border rounded-[24px] shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh] overflow-hidden">
            <div className="p-6 md:p-8 border-b border-border flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">Edit Promoter Profile</h3>
                <p className="text-muted font-medium text-xs md:text-sm mt-1">
                  Update credentials, earnings, and payment details for {editingPromoter.name}
                </p>
              </div>
              <button onClick={() => setEditingPromoter(null)} className="p-2 hover:bg-accent rounded-lg transition-colors text-muted hover:text-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {editError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="text-xs md:text-sm font-medium">{editError}</div>
                </div>
              )}

              {/* Section: Basic Information */}
              <div className="space-y-4">
                <h4 className="text-[0.7rem] font-bold text-muted uppercase tracking-widest border-b border-border/40 pb-2">
                  Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted uppercase tracking-wider">Full Name</label>
                    <input
                      required
                      type="text"
                      value={editForm.name || ""}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted uppercase tracking-wider">Username</label>
                    <input
                      required
                      type="text"
                      value={editForm.username || ""}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-muted uppercase tracking-wider">Email Address</label>
                    <input
                      required
                      type="email"
                      value={editForm.email || ""}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-muted uppercase tracking-wider">Phone Number</label>
                    <div className="flex gap-2">
                      <div className="relative w-1/3 shrink-0">
                        <select
                          disabled={isTop50Earner}
                          value={isTop50Earner ? "" : editPhoneCode}
                          onChange={(e) => setEditPhoneCode(e.target.value)}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all appearance-none pr-8 font-sans disabled:opacity-50"
                        >
                          {isTop50Earner ? (
                            <option value="">—</option>
                          ) : (
                            COUNTRY_CODES.map((c) => (
                              <option key={`${c.code}-${c.dialCode}`} value={c.dialCode}>
                                {c.code} ({c.dialCode})
                              </option>
                            ))
                          )}
                        </select>
                        {!isTop50Earner && (
                          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <input
                        disabled={isTop50Earner}
                        type="tel"
                        placeholder={isTop50Earner ? "N/A (Top 50 Earner)" : "Enter phone number"}
                        value={isTop50Earner ? "" : editPhoneNo}
                        onChange={(e) => setEditPhoneNo(e.target.value.replace(/[^0-9]/g, ""))}
                        className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all disabled:opacity-50 font-sans"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Picture Upload */}
              <div className="flex items-center gap-6 pb-2">
                <div className="relative group shrink-0">
                  {editForm.avatarUrl ? (
                    <img 
                      src={editForm.avatarUrl} 
                      alt="Profile Picture" 
                      className="w-16 h-16 rounded-full object-cover border border-border shadow-lg"
                    />
                  ) : (
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${GRADIENTS[editingPromoter.id % GRADIENTS.length]} text-white font-black text-lg flex items-center justify-center border border-border shadow-lg`}>
                      {editForm.name ? editForm.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : <Camera className="w-5 h-5" />}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-start gap-2">
                  <span className="text-xs font-bold text-muted uppercase tracking-wider">Profile Picture</span>
                  <div className="flex items-center gap-2">
                    <label 
                      htmlFor="admin-avatar-upload"
                      className="px-3 py-1.5 rounded-lg bg-accent border border-border text-foreground hover:bg-accent/80 transition-all font-bold text-[0.7rem] cursor-pointer flex items-center gap-1.5 active:scale-[0.98]"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Upload Photo
                    </label>
                    <input 
                      id="admin-avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFileChange}
                      className="hidden"
                    />
                    {editForm.avatarUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all font-bold text-[0.7rem] flex items-center gap-1.5 active:scale-[0.98]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Section: Promoter Stats / Earnings */}
              <div className="space-y-4">
                <h4 className="text-[0.7rem] font-bold text-muted uppercase tracking-widest border-b border-border/40 pb-2">
                  Stats & Earnings
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted uppercase tracking-wider">Total Earned (₹)</label>
                    <input
                      required
                      type="number"
                      step="any"
                      value={editForm.totalEarned === undefined ? "" : editForm.totalEarned}
                      onChange={(e) => setEditForm({ ...editForm, totalEarned: e.target.value === "" ? 0 : parseFloat(e.target.value) })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted uppercase tracking-wider">Pending Payout (₹)</label>
                    <input
                      required
                      type="number"
                      step="any"
                      value={editForm.pendingPayout === undefined ? "" : editForm.pendingPayout}
                      onChange={(e) => setEditForm({ ...editForm, pendingPayout: e.target.value === "" ? 0 : parseFloat(e.target.value) })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted uppercase tracking-wider">Total Paid (₹)</label>
                    <input
                      required
                      type="number"
                      step="any"
                      value={editForm.totalPaid === undefined ? "" : editForm.totalPaid}
                      onChange={(e) => setEditForm({ ...editForm, totalPaid: e.target.value === "" ? 0 : parseFloat(e.target.value) })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Section: Payout Information */}
              <div className="space-y-4">
                <h4 className="text-[0.7rem] font-bold text-muted uppercase tracking-widest border-b border-border/40 pb-2">
                  Payout Information
                </h4>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted uppercase tracking-wider">Country</label>
                    <select
                      value={editForm.intlBankCountry || (editForm.payoutRegion === "INDIA" ? "India" : "United States")}
                      onChange={(e) => {
                        const country = e.target.value;
                        const region = country === "India" ? "INDIA" : "INTERNATIONAL";
                        setEditForm({ 
                          ...editForm, 
                          intlBankCountry: country,
                          payoutRegion: region 
                        });
                      }}
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                    >
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  {editForm.payoutRegion === "INDIA" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">UPI ID</label>
                        <input
                          type="text"
                          placeholder="e.g. username@upi"
                          value={editForm.upiId || ""}
                          onChange={(e) => setEditForm({ ...editForm, upiId: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Bank Account Name</label>
                        <input
                          type="text"
                          placeholder="e.g. John Doe"
                          value={editForm.bankAccountName || ""}
                          onChange={(e) => setEditForm({ ...editForm, bankAccountName: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Bank Account Number</label>
                        <input
                          type="text"
                          placeholder="e.g. 1234567890"
                          value={editForm.bankAccountNumber || ""}
                          onChange={(e) => setEditForm({ ...editForm, bankAccountNumber: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                        />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Bank IFSC Code</label>
                        <input
                          type="text"
                          placeholder="e.g. SBIN0001234"
                          value={editForm.bankIfsc || ""}
                          onChange={(e) => setEditForm({ ...editForm, bankIfsc: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">PayPal Email</label>
                        <input
                          type="email"
                          placeholder="e.g. paypal@example.com"
                          value={editForm.paypalEmail || ""}
                          onChange={(e) => setEditForm({ ...editForm, paypalEmail: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Account Holder Name</label>
                        <input
                          type="text"
                          placeholder="e.g. John Doe"
                          value={editForm.intlAccountHolderName || ""}
                          onChange={(e) => setEditForm({ ...editForm, intlAccountHolderName: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Bank Country</label>
                        <input
                          type="text"
                          placeholder="e.g. United States"
                          value={editForm.intlBankCountry || ""}
                          onChange={(e) => setEditForm({ ...editForm, intlBankCountry: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Account Number</label>
                        <input
                          type="text"
                          placeholder="e.g. 1234567890"
                          value={editForm.intlAccountNumber || ""}
                          onChange={(e) => setEditForm({ ...editForm, intlAccountNumber: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">IBAN</label>
                        <input
                          type="text"
                          placeholder="e.g. GB82WEST123456..."
                          value={editForm.intlIban || ""}
                          onChange={(e) => setEditForm({ ...editForm, intlIban: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">BIC / SWIFT Code</label>
                        <input
                          type="text"
                          placeholder="e.g. WESTGB2LXXX"
                          value={editForm.intlBicSwift || ""}
                          onChange={(e) => setEditForm({ ...editForm, intlBicSwift: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Routing Number</label>
                        <input
                          type="text"
                          placeholder="e.g. 123456789"
                          value={editForm.intlRoutingNumber || ""}
                          onChange={(e) => setEditForm({ ...editForm, intlRoutingNumber: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Sort Code</label>
                        <input
                          type="text"
                          placeholder="e.g. 12-34-56"
                          value={editForm.intlSortCode || ""}
                          onChange={(e) => setEditForm({ ...editForm, intlSortCode: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">BSB Code</label>
                        <input
                          type="text"
                          placeholder="e.g. 123-456"
                          value={editForm.intlBsbCode || ""}
                          onChange={(e) => setEditForm({ ...editForm, intlBsbCode: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Transit Number</label>
                        <input
                          type="text"
                          placeholder="e.g. 12345"
                          value={editForm.intlTransitNumber || ""}
                          onChange={(e) => setEditForm({ ...editForm, intlTransitNumber: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Institution Number</label>
                        <input
                          type="text"
                          placeholder="e.g. 123"
                          value={editForm.intlInstitutionNumber || ""}
                          onChange={(e) => setEditForm({ ...editForm, intlInstitutionNumber: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs md:text-sm text-foreground focus:outline-none focus:border-muted transition-all"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center gap-4 pt-4 border-t border-border/40 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingPromoter(null)}
                  className="flex-1 py-3 rounded-xl bg-transparent border border-border text-foreground font-bold hover:bg-accent transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editSaving}
                  className="flex-1 py-3 rounded-xl bg-[#16a34a] text-white font-black hover:opacity-90 transition-all shadow-lg shadow-green-700/20 text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {editSaving ? <Loader2 size={16} className="animate-spin" /> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payout History Modal */}
      {historyPromoter && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setHistoryPromoter(null)} />
          <div className="relative w-full max-w-2xl bg-card border border-border rounded-[24px] shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[80vh] overflow-hidden">
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
                    <p className="text-foreground font-black text-lg">₹{payout.amount.toFixed(2)}</p>
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
          <div className="relative w-full max-w-lg bg-card border border-border rounded-[24px] p-6 md:p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-[#16a34a]/10 rounded-2xl flex items-center justify-center shrink-0 border border-[#16a34a]/20">
                <Wallet size={32} className="text-[#16a34a]" />
              </div>
              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Confirm Payout</h3>
                  <p className="text-muted text-[1.05rem] leading-relaxed">
                    You are marking <span className="text-foreground font-bold">₹{payoutPromoter.pendingPayout.toFixed(2)}</span> as paid for <span className="text-foreground font-bold">{payoutPromoter.name}</span>.
                  </p>
                </div>

                {(payoutPromoter.payoutMethod || payoutPromoter.payoutRegion || payoutPromoter.pendingWithdrawalRequest) && (
                  <div className="bg-pill border border-border rounded-xl p-4 space-y-2">
                    <p className="text-[0.7rem] text-muted font-bold uppercase tracking-widest text-left">
                      {payoutPromoter.pendingWithdrawalRequest ? "Requested Payout Info" : "Payment Info"}
                    </p>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-foreground font-bold shrink-0">
                        {payoutPromoter.pendingWithdrawalRequest?.method || payoutPromoter.payoutRegion || payoutPromoter.payoutMethod}
                      </span>
                      <button 
                        onClick={() => handleCopy(payoutPromoter.pendingWithdrawalRequest?.details || getPayoutSummary(payoutPromoter), 'details')}
                        className="text-[#16a34a] font-bold text-sm hover:underline flex items-center gap-1 text-right break-all"
                      >
                        {payoutPromoter.pendingWithdrawalRequest?.details || getPayoutSummary(payoutPromoter)} <Copy size={12} className="shrink-0" />
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
                    className="flex-1 py-4 rounded-xl bg-[#16a34a] text-white font-black hover:opacity-90 transition-all shadow-lg shadow-green-700/20 text-[1rem] disabled:opacity-50 flex items-center justify-center gap-2"
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
