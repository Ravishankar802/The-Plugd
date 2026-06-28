"use client";

import { useState, useEffect, Suspense } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area
} from "recharts";
import { 
  Loader2, 
  Check,
  ChevronDown,
  ArrowRight,
  Gift,
  Copy,
  ExternalLink,
  Lock,
  Wallet,
  TrendingUp,
  X,
  Save,
  Share2,
  Camera,
  Trash2,
  Upload,
  User,
  Trophy
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { NICHES } from "@/lib/constants";
import { getFieldsForCountry } from "@/lib/payoutFieldsByCountry";
import { COUNTRY_CODES } from "@/lib/countryCodes";


import ReferralModal from "@/components/ReferralModal";
import { BronzeLeagueIcon } from "@/components/leagues/BronzeLeagueIcon";
import { SilverLeagueIcon } from "@/components/leagues/SilverLeagueIcon";
import { GoldLeagueIcon } from "@/components/leagues/GoldLeagueIcon";
import { DiamondLeagueIcon } from "@/components/leagues/DiamondLeagueIcon";
import { MasterLeagueIcon } from "@/components/leagues/MasterLeagueIcon";
import { ChampionLeagueIcon } from "@/components/leagues/ChampionLeagueIcon";
import { TitanLeagueIcon } from "@/components/leagues/TitanLeagueIcon";
import { LegendLeagueIcon } from "@/components/leagues/LegendLeagueIcon";
import { EliteLeagueIcon } from "@/components/leagues/EliteLeagueIcon";
import { ApexLeagueIcon } from "@/components/leagues/ApexLeagueIcon";
import { SovereignLeagueIcon } from "@/components/leagues/SovereignLeagueIcon";


interface LeagueIconProps {
  id: string;
  className?: string;
  size?: number;
}

export function LeagueIcon({ id, className = "", size = 56 }: LeagueIconProps) {
  switch (id) {
    case "bronze":
      return <BronzeLeagueIcon size={size} className={className} />;
    case "silver":
      return <SilverLeagueIcon size={size} className={className} />;
    case "gold":
      return <GoldLeagueIcon size={size} className={className} />;
    case "diamond":
      return <DiamondLeagueIcon size={size} className={className} />;
    case "master":
      return <MasterLeagueIcon size={size} className={className} />;
    case "champion":
      return <ChampionLeagueIcon size={size} className={className} />;
    case "titan":
      return <TitanLeagueIcon size={size} className={className} />;
    case "legend":
      return <LegendLeagueIcon size={size} className={className} />;
    case "elite":
      return <EliteLeagueIcon size={size} className={className} />;
    case "apex":
      return <ApexLeagueIcon size={size} className={className} />;
    case "sovereign":
      return <SovereignLeagueIcon size={size} className={className} />;
    default:
      return null;
  }
}

function DashboardProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "profile";
  
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [hasPromoter, setHasPromoter] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [promoterData, setPromoterData] = useState<any>(null);
  const [promoterSaving, setPromoterSaving] = useState(false);
  const [promoterSuccess, setPromoterSuccess] = useState(false);
  const [promoterError, setPromoterError] = useState<string | null>(null);
  const [selectedVariation, setSelectedVariation] = useState(0);
  
  const [hasPendingWithdrawal, setHasPendingWithdrawal] = useState(false);
  const [withdrawalSuccessMessage, setWithdrawalSuccessMessage] = useState<string | null>(null);
  const [requestingWithdrawal, setRequestingWithdrawal] = useState(false);
  const [useBankTransfer, setUseBankTransfer] = useState(false);
  const [usePaypal, setUsePaypal] = useState(false);
  const [phoneCode, setPhoneCode] = useState("+91");
  const [phoneNo, setPhoneNo] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [phoneCodeDropdownOpen, setPhoneCodeDropdownOpen] = useState(false);
  const [copiedLinkMission, setCopiedLinkMission] = useState(false);
  const [trafficSources, setTrafficSources] = useState<Array<{ source: string; clicks: number }>>([]);
  const [streakCount, setStreakCount] = useState(0);
  const [copiedPlatforms, setCopiedPlatforms] = useState<Record<string, boolean>>({});

  const referralLinkSuffix = promoterData?.username || promoterData?.referralCode || "";
  const link = `https://theplugd.com?ref=${referralLinkSuffix}`;

  const tier = promoterData?.tier || "STARTER";
  const joinFee = tier === "MAX" ? "₹999" : (tier === "PRO" ? "₹499" : "₹199");
  const commission = tier === "MAX" ? "₹500" : (tier === "PRO" ? "₹250" : "₹100");

  const POST_VARIATIONS = [
    `if you've never heard of Plugd, it's a referral platform 💸

pay ${joinFee} once, get your link, share it everywhere - whatsapp, telegram, discord, twitter, wherever

every person who joins through your link = ${commission} in your earnings

stay consistent and it builds up fast 👉 ${link}`,
    `Plugd is a referral program and honestly one of the simplest ways to make money online 💸

${joinFee} to join. you get a unique link. every signup through your link pays you ${commission} back.

share it consistently and it compounds. i'm doing it.

👉 ${link}`,
    `joined this referral platform called Plugd a while back 💸

the model is simple - pay ${joinFee}, get your own referral link, earn ${commission} every time someone signs up through it

the more consistently you share it, the more it adds up

here's my link 👉 ${link}`
  ];

  // Determine active section from tab param
  const activeSection = ["profile", "referrals", "earnings", "league"].includes(tab) ? tab : "profile";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setHasPromoter(data.hasPromoter);
          setIsAdmin(data.isAdmin);
          setPromoterData(data.promoterData);
          setHasPendingWithdrawal(data.hasPendingWithdrawal || false);
          setTrafficSources(data.trafficSources || []);
          if (data.promoterData) {
            const val = localStorage.getItem(`plugd_mission_copied_${data.promoterData.id}`);
            if (val === 'true') {
              setCopiedLinkMission(true);
            }
            setUseBankTransfer(!!data.promoterData.bankAccountNumber);
            setUsePaypal(!!data.promoterData.paypalEmail && !data.promoterData.intlAccountNumber && !data.promoterData.intlIban);
            const phone = data.promoterData.phoneNumber || "";
            if (phone) {
              const sortedCodes = [...COUNTRY_CODES].sort((a, b) => b.dialCode.length - a.dialCode.length);
              const matched = sortedCodes.find(c => phone.startsWith(c.dialCode));
              if (matched) {
                setPhoneCode(matched.dialCode);
                setPhoneNo(phone.slice(matched.dialCode.length));
              } else {
                setPhoneNo(phone);
              }
            }
          }
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleRequestWithdrawal = async () => {
    if (requestingWithdrawal) return;
    setRequestingWithdrawal(true);
    setWithdrawalSuccessMessage(null);

    try {
      const res = await fetch("/api/request-withdrawal", {
        method: "POST"
      });

      const data = await res.json();

      if (res.ok) {
        setHasPendingWithdrawal(true);
        setWithdrawalSuccessMessage("Request submitted. We'll process it on the next payout date.");
        // Decrease pending payout in UI locally or trigger a reload
        if (promoterData) {
          setPromoterData({
            ...promoterData,
            pendingPayout: 0
          });
        }
      } else {
        alert(data.error || "Failed to submit withdrawal request.");
      }
    } catch (err: any) {
      console.error("Withdrawal error:", err);
      alert(err.message || "An unexpected error occurred.");
    } finally {
      setRequestingWithdrawal(false);
    }
  };

  // Earnings Chart State & Logic
  const [chartData, setChartData] = useState<{ date: string; amount: number }[]>([]);
  const [loadingChart, setLoadingChart] = useState(true);
  const [chartRange, setChartRange] = useState<"7d" | "4w" | "3m">("7d");
  const [chartMode, setChartMode] = useState<"daily" | "cumulative">("daily");
  const [chartMounted, setChartMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    setChartMounted(true);
  }, []);

  useEffect(() => {
    async function fetchChartData() {
      if (tab !== "earnings" || (!hasPromoter && !isAdmin)) return;
      
      setLoadingChart(true);
      try {
        const res = await fetch(`/api/earnings-chart?range=${chartRange}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setChartData(json.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch earnings chart data:", err);
      } finally {
        setLoadingChart(false);
      }
    }
    fetchChartData();
  }, [chartRange, tab, hasPromoter, isAdmin]);

  const processedChartData = (() => {
    let runningTotal = 0;
    return chartData.map(item => {
      runningTotal += item.amount;
      return {
        ...item,
        displayAmount: chartMode === "cumulative" ? runningTotal : item.amount,
        cumulativeAmount: runningTotal
      };
    });
  })();
  
  const maxVal = Math.max(...processedChartData.map(d => d.displayAmount), 0);
  const hasNoEarnings = maxVal === 0;

  const formatYAxis = (value: number) => {
    if (value === 0) return "₹0";
    if (value >= 1e7) {
      return `₹${(value / 1e7).toFixed(1).replace(/\.0$/, "")}Cr`;
    }
    if (value >= 1e5) {
      return `₹${(value / 1e5).toFixed(1).replace(/\.0$/, "")}L`;
    }
    if (value >= 1e3) {
      return `₹${(value / 1e3).toFixed(1).replace(/\.0$/, "")}k`;
    }
    return `₹${value}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            setPromoterData((prev: any) => ({
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
    reader.onerror = () => {
      alert("Failed to read file.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setPromoterData((prev: any) => ({
      ...prev,
      avatarUrl: null
    }));
  };

  const handlePromoterSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoterData) {
      setPromoterError("Promoter data not loaded.");
      return;
    }

    if (!phoneNo.trim()) {
      setPromoterError("Phone number is required.");
      return;
    }

    setPromoterSaving(true);
    setPromoterSuccess(false);
    setPromoterError(null);

    try {
      let derivedMethod = promoterData.payoutMethod;
      let derivedDetails = promoterData.payoutDetails;
      if (promoterData.payoutRegion === "INDIA") {
        derivedMethod = useBankTransfer ? "Bank" : "UPI";
        derivedDetails = useBankTransfer 
          ? `${promoterData.bankAccountName || ""} | ${promoterData.bankAccountNumber || ""} | ${promoterData.bankIfsc || ""}` 
          : promoterData.upiId;
      } else if (promoterData.payoutRegion === "INTERNATIONAL") {
        derivedMethod = usePaypal ? "PayPal" : "Bank";
        if (usePaypal) {
          derivedDetails = promoterData.paypalEmail;
        } else {
          const fields = getFieldsForCountry(promoterData.intlBankCountry || "");
          derivedDetails = fields
            .map(f => promoterData[f.key] || "")
            .filter(Boolean)
            .join(" | ");
        }
      }

      const res = await fetch("/api/promoters/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: promoterData.name,
          xHandle: promoterData.xHandle,
          username: promoterData.username,
          avatarUrl: promoterData.avatarUrl,
          phoneNumber: `${phoneCode}${phoneNo.trim()}`,
          payoutMethod: derivedMethod,
          payoutDetails: derivedDetails,
          payoutRegion: promoterData.payoutRegion,
          upiId: promoterData.upiId,
          bankAccountName: promoterData.bankAccountName,
          bankAccountNumber: promoterData.bankAccountNumber,
          bankIfsc: promoterData.bankIfsc,
          intlAccountHolderName: promoterData.intlAccountHolderName,
          intlRoutingNumber: promoterData.intlRoutingNumber,
          intlAccountNumber: promoterData.intlAccountNumber,
          intlSortCode: promoterData.intlSortCode,
          intlIban: promoterData.intlIban,
          intlBicSwift: promoterData.intlBicSwift,
          intlBsbCode: promoterData.intlBsbCode,
          intlTransitNumber: promoterData.intlTransitNumber,
          intlInstitutionNumber: promoterData.intlInstitutionNumber,
          intlBankCountry: promoterData.intlBankCountry,
          paypalEmail: promoterData.paypalEmail
        })
      });

      if (res.ok) {
        setPromoterSuccess(true);
        setTimeout(() => setPromoterSuccess(false), 3000);
      } else {
        const data = await res.json();
        setPromoterError(data.error || "Failed to save promoter profile.");
      }
    } catch (err: any) {
      console.error("Promoter save error:", err);
      setPromoterError(err.message || "An unexpected error occurred.");
    } finally {
      setPromoterSaving(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);

      if (id === 'link' || id === 'referral' || id.startsWith('link_')) {
        if (promoterData?.id) {
          localStorage.setItem(`plugd_mission_copied_${promoterData.id}`, 'true');
          setCopiedLinkMission(true);
        }
      }

      if (id.startsWith('link_')) {
        const platform = id.replace('link_', '');
        if (promoterData?.id) {
          localStorage.setItem(`plugd_distribution_copied_${platform}_${promoterData.id}`, 'true');
          setCopiedPlatforms(prev => ({ ...prev, [platform]: true }));
        }
      }
    } catch (err) {
      console.error("Clipboard error:", err);
    }
  };

  useEffect(() => {
    if (!promoterData?.id) return;
    
    const countKey = `plugd_streak_count_${promoterData.id}`;
    const dateKey = `plugd_streak_last_date_${promoterData.id}`;
    
    const localCount = localStorage.getItem(countKey);
    const localDate = localStorage.getItem(dateKey);
    const todayStr = new Date().toDateString();
    
    if (localCount && localDate) {
      const lastDate = new Date(localDate);
      const diffTime = Math.abs(new Date(todayStr).getTime() - new Date(lastDate.toDateString()).getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        setStreakCount(parseInt(localCount, 10));
      } else if (diffDays === 1) {
        const newCount = parseInt(localCount, 10) + 1;
        localStorage.setItem(countKey, newCount.toString());
        localStorage.setItem(dateKey, todayStr);
        setStreakCount(newCount);
      } else {
        localStorage.setItem(countKey, "1");
        localStorage.setItem(dateKey, todayStr);
        setStreakCount(1);
      }
    } else {
      let initialStreak = 1;
      if (promoterData.totalClicks > 10) {
        initialStreak = Math.min(5, Math.floor(promoterData.totalClicks / 10));
      }
      localStorage.setItem(countKey, initialStreak.toString());
      localStorage.setItem(dateKey, todayStr);
      setStreakCount(initialStreak);
    }

    const platforms = ["whatsapp", "telegram", "x", "reddit", "discord", "instagram", "facebook", "linkedin", "youtube"];
    const copiedMap: Record<string, boolean> = {};
    platforms.forEach(p => {
      copiedMap[p] = localStorage.getItem(`plugd_distribution_copied_${p}_${promoterData.id}`) === "true";
    });
    setCopiedPlatforms(copiedMap);
  }, [promoterData?.id, copied]);


  if (loading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-10 w-48 bg-card rounded-lg" />
        <div className="h-4 w-64 bg-card rounded-lg" />
        <div className="h-[600px] w-full bg-card rounded-xl mt-8" />
      </div>
    );
  }

  const clicks = promoterData?.totalClicks || 0;
  const signups = promoterData?.totalConversions || 0;
  const earnings = promoterData?.totalEarned || 0;
  const streak = streakCount;

  const LEAGUE_DEFS = [
    { id: "bronze", name: "Bronze League", emoji: "🥉", target: 0 },
    { id: "silver", name: "Silver League", emoji: "🥈", target: 1000 },
    { id: "gold", name: "Gold League", emoji: "🥇", target: 5000 },
    { id: "diamond", name: "Diamond League", emoji: "💎", target: 25000 },
    { id: "master", name: "Master League", emoji: "⚔️", target: 100000 },
    { id: "champion", name: "Champion League", emoji: "🔥", target: 500000 },
    { id: "titan", name: "Titan League", emoji: "👑", target: 1000000 },
    { id: "legend", name: "Legend League", emoji: "🚀", target: 2500000 },
    { id: "elite", name: "Elite League", emoji: "🌟", target: 5000000 },
    { id: "apex", name: "Apex League", emoji: "🏆", target: 10000000 },
    { id: "sovereign", name: "Sovereign League", emoji: "👑", target: 100000000 }
  ];

  let currentLeagueIndex = -1;
  for (let i = 0; i < LEAGUE_DEFS.length; i++) {
    if (earnings >= LEAGUE_DEFS[i].target) {
      currentLeagueIndex = i;
    } else {
      break;
    }
  }

  const targetLeagueIndex = currentLeagueIndex + 1;
  const currentLeague = currentLeagueIndex === -1 ? null : LEAGUE_DEFS[currentLeagueIndex];
  const targetLeague = targetLeagueIndex < LEAGUE_DEFS.length ? LEAGUE_DEFS[targetLeagueIndex] : null;

  let progressPercent = 0;
  let remainingAmount = 0;
  if (targetLeague) {
    progressPercent = targetLeague.target > 0 ? Math.min(100, Math.max(0, Math.round((earnings / targetLeague.target) * 100))) : 0;
    remainingAmount = targetLeague.target - earnings;
  } else {
    progressPercent = 100;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Profile Section */}
      {activeSection === "profile" && (
        <>
          {/* Promoter Settings Section */}
          {(hasPromoter || isAdmin) && promoterData && (
            <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-[2rem] font-[700] text-foreground leading-tight tracking-tight">Your Profile</h2>
                  <p className="text-muted text-[1rem] mt-1.5 font-normal">Your referral identity and payout details.</p>
                </div>
                {promoterData.tier && (
                  <div className="self-start sm:self-center px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                    {promoterData.tier} Tier
                  </div>
                )}
              </div>

              <div className="bg-pill border border-border rounded-[16px] p-6 md:p-10 shadow-2xl">
                <form onSubmit={handlePromoterSave} className="space-y-10">
                  {/* League Emblem and Name */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border/40">
                    <div className="relative group shrink-0">
                      {currentLeague ? (
                        <LeagueIcon id={currentLeague.id} size={96} className="w-24 h-24 filter drop-shadow-[0_0_12px_rgba(22,163,74,0.3)]" />
                      ) : (
                        <LeagueIcon id="bronze" size={96} className="w-24 h-24 filter drop-shadow-[0_0_12px_rgba(22,163,74,0.3)]" />
                      )}
                    </div>

                    <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
                      <span className="text-[1.8rem] font-black text-foreground tracking-tight" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                        {promoterData.name || "Your Name"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Full Name</label>
                      <input
                        required
                        type="text"
                        value={promoterData.name || ""}
                        onChange={(e) => setPromoterData({ ...promoterData, name: e.target.value })}
                        className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
                      />
                    </div>

                    {/* Email (Read-only) */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Email Address</label>
                      <div className="w-full bg-background border border-border rounded-xl px-5 py-4 text-muted/60 text-[1rem] opacity-70 cursor-not-allowed">
                        {promoterData.email}
                      </div>
                      <p className="text-[0.7rem] text-muted/40 font-bold uppercase tracking-wider ml-1 mt-1">Email cannot be changed.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Username (Read-only) */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Username</label>
                      <div className="w-full bg-background border border-border rounded-xl px-5 py-4 text-muted/60 text-[1rem] opacity-70 cursor-not-allowed">
                        {promoterData.username || ""}
                      </div>
                      <p className="text-[0.7rem] text-muted/40 font-bold uppercase tracking-wider ml-1 mt-1">Username cannot be changed.</p>
                    </div>

                    {/* Current League (Read-only) */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Current League</label>
                      <div className="w-full bg-background border border-border rounded-xl px-5 py-4 text-muted/60 text-[1rem] opacity-70 cursor-not-allowed font-medium">
                        {currentLeague ? currentLeague.name : "Bronze League"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Member since */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Member since</label>
                      <div className="w-full bg-background border border-border rounded-xl px-5 py-4 text-muted/60 text-[1rem] opacity-70 font-sans font-medium">
                        {new Date(promoterData.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </div>
                    </div>
                  </div>

                  {/* Tier & Commission Structure Section */}
                  <div className="border-t border-border/40 pt-8 space-y-6">
                    <h3 className="text-lg font-bold text-foreground">Promoter Tier & Commissions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F5F5F5] dark:bg-zinc-950/40 border border-[#e4e4e7] dark:border-border/60 rounded-xl p-6">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs text-muted uppercase font-bold tracking-wider">Current Tier</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-extrabold text-foreground tracking-tight">{promoterData.tier || "STARTER"}</span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Active</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-muted uppercase font-bold tracking-wider">Commission Structure</span>
                        <div className="space-y-1 text-sm font-sans font-medium text-foreground">
                          {promoterData.tier === "STARTER" && (
                            <>
                              <div className="flex justify-between border-b border-border/20 pb-1"><span>₹199 sale</span> <span className="font-bold text-emerald-400">Earn ₹100</span></div>
                              <div className="flex justify-between border-b border-border/20 pb-1"><span>₹499 sale</span> <span className="font-bold text-emerald-400">Earn ₹100</span></div>
                              <div className="flex justify-between"><span>₹999 sale</span> <span className="font-bold text-emerald-400">Earn ₹100</span></div>
                            </>
                          )}
                          {promoterData.tier === "PRO" && (
                            <>
                              <div className="flex justify-between border-b border-border/20 pb-1"><span>₹199 sale</span> <span className="font-bold text-emerald-400">Earn ₹100</span></div>
                              <div className="flex justify-between border-b border-border/20 pb-1"><span>₹499 sale</span> <span className="font-bold text-emerald-400">Earn ₹250</span></div>
                              <div className="flex justify-between"><span>₹999 sale</span> <span className="font-bold text-emerald-400">Earn ₹250</span></div>
                            </>
                          )}
                          {promoterData.tier === "MAX" && (
                            <>
                              <div className="flex justify-between border-b border-border/20 pb-1"><span>₹199 sale</span> <span className="font-bold text-emerald-400">Earn ₹100</span></div>
                              <div className="flex justify-between border-b border-border/20 pb-1"><span>₹499 sale</span> <span className="font-bold text-emerald-400">Earn ₹250</span></div>
                              <div className="flex justify-between"><span>₹999 sale</span> <span className="font-bold text-emerald-400">Earn ₹500</span></div>
                            </>
                          )}
                          {(!promoterData.tier || (promoterData.tier !== "STARTER" && promoterData.tier !== "PRO" && promoterData.tier !== "MAX")) && (
                            <>
                              <div className="flex justify-between border-b border-border/20 pb-1"><span>₹199 sale</span> <span className="font-bold text-emerald-400">Earn ₹100</span></div>
                              <div className="flex justify-between border-b border-border/20 pb-1"><span>₹499 sale</span> <span className="font-bold text-emerald-400">Earn ₹100</span></div>
                              <div className="flex justify-between"><span>₹999 sale</span> <span className="font-bold text-emerald-400">Earn ₹100</span></div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Country Selector */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Country</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                        className="w-full flex items-center justify-between bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner cursor-pointer text-left"
                      >
                        <span className="truncate">
                          {promoterData.intlBankCountry || "Select your country"}
                        </span>
                        <ChevronDown size={16} className={`text-muted transition-transform duration-200 shrink-0 ml-1 ${countryDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {countryDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setCountryDropdownOpen(false)} />
                          <div className="absolute left-0 mt-1.5 w-full bg-card border border-border rounded-xl shadow-2xl p-1 z-50 max-h-[300px] overflow-y-auto">
                            {[...COUNTRY_CODES.map(c => c.name), "Other"].map((country) => (
                              <button
                                key={country}
                                type="button"
                                onClick={() => {
                                  const region = country === "India" ? "INDIA" : "INTERNATIONAL";
                                  const matched = COUNTRY_CODES.find(c => c.name === country);
                                  
                                  setPromoterData({
                                    ...promoterData,
                                    intlBankCountry: country,
                                    payoutRegion: region,
                                    upiId: region === "INTERNATIONAL" ? "" : promoterData.upiId,
                                    bankAccountName: region === "INTERNATIONAL" ? "" : promoterData.bankAccountName,
                                    bankAccountNumber: region === "INTERNATIONAL" ? "" : promoterData.bankAccountNumber,
                                    bankIfsc: region === "INTERNATIONAL" ? "" : promoterData.bankIfsc,
                                    intlAccountHolderName: region === "INDIA" ? "" : promoterData.intlAccountHolderName,
                                    intlRoutingNumber: region === "INDIA" ? "" : promoterData.intlRoutingNumber,
                                    intlAccountNumber: region === "INDIA" ? "" : promoterData.intlAccountNumber,
                                    intlSortCode: region === "INDIA" ? "" : promoterData.intlSortCode,
                                    intlIban: region === "INDIA" ? "" : promoterData.intlIban,
                                    intlBicSwift: region === "INDIA" ? "" : promoterData.intlBicSwift,
                                    intlBsbCode: region === "INDIA" ? "" : promoterData.intlBsbCode,
                                    intlTransitNumber: region === "INDIA" ? "" : promoterData.intlTransitNumber,
                                    intlInstitutionNumber: region === "INDIA" ? "" : promoterData.intlInstitutionNumber,
                                    paypalEmail: region === "INDIA" ? "" : promoterData.paypalEmail,
                                  });
                                  setUsePaypal(false);
                                  if (matched) {
                                    setPhoneCode(matched.dialCode);
                                  }
                                  setCountryDropdownOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left text-xs font-bold transition-colors ${
                                  promoterData.intlBankCountry === country 
                                  ? "bg-accent text-foreground" 
                                  : "text-foreground/80 hover:bg-accent"
                                }`}
                              >
                                <span className="truncate">{country}</span>
                                {promoterData.intlBankCountry === country && <Check size={12} className="text-foreground shrink-0 ml-2" />}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Phone Number</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative w-full sm:max-w-[220px] sm:shrink-0">
                        <button
                          type="button"
                          onClick={() => setPhoneCodeDropdownOpen(!phoneCodeDropdownOpen)}
                          className="w-full flex items-center justify-between bg-background border border-border rounded-xl px-4 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner font-sans cursor-pointer text-left"
                        >
                          <span className="truncate">
                            {(() => {
                              const matched = COUNTRY_CODES.find(c => c.dialCode === phoneCode);
                              return matched ? `${matched.name} (${matched.code} ${matched.dialCode})` : phoneCode;
                            })()}
                          </span>
                          <ChevronDown size={16} className={`text-muted transition-transform duration-200 shrink-0 ml-1 ${phoneCodeDropdownOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        {phoneCodeDropdownOpen && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setPhoneCodeDropdownOpen(false)} />
                            <div className="absolute left-0 mt-1.5 w-full sm:w-[260px] bg-card border border-border rounded-xl shadow-2xl p-1 z-50 max-h-[300px] overflow-y-auto">
                              {COUNTRY_CODES.map((c) => (
                                <button
                                  key={`${c.code}-${c.dialCode}`}
                                  type="button"
                                  onClick={() => {
                                    setPhoneCode(c.dialCode);
                                    setPhoneCodeDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs font-bold transition-colors ${
                                    phoneCode === c.dialCode 
                                    ? "bg-accent text-foreground" 
                                    : "text-foreground/80 hover:bg-accent"
                                  }`}
                                >
                                  <span className="truncate">{c.name} ({c.code} {c.dialCode})</span>
                                  {phoneCode === c.dialCode && <Check size={12} className="text-foreground shrink-0 ml-2" />}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value.replace(/[^0-9]/g, ""))}
                        className="w-full sm:flex-1 bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner font-sans"
                      />
                    </div>
                  </div>

                  {/* If country has been selected */}
                  {promoterData.intlBankCountry && (
                    <>
                      {/* If region is INDIA */}
                      {promoterData.payoutRegion === "INDIA" && (
                        <div className="space-y-6">
                          {!useBankTransfer ? (
                            <div className="flex flex-col gap-3">
                              <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">UPI ID</label>
                              <input
                                required={!useBankTransfer}
                                type="text"
                                placeholder="name@upi"
                                value={promoterData.upiId || ""}
                                onChange={(e) => setPromoterData({ ...promoterData, upiId: e.target.value })}
                                className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner font-sans"
                              />
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="flex flex-col gap-3">
                                <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Account Holder Name</label>
                                <input
                                  required={useBankTransfer}
                                  type="text"
                                  placeholder="As in bank records"
                                  value={promoterData.bankAccountName || ""}
                                  onChange={(e) => setPromoterData({ ...promoterData, bankAccountName: e.target.value })}
                                  className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner font-sans"
                                />
                              </div>
                              <div className="flex flex-col gap-3">
                                <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Bank Account Number</label>
                                <input
                                  required={useBankTransfer}
                                  type="text"
                                  placeholder="Account number"
                                  value={promoterData.bankAccountNumber || ""}
                                  onChange={(e) => setPromoterData({ ...promoterData, bankAccountNumber: e.target.value })}
                                  className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner font-sans"
                                />
                              </div>
                              <div className="flex flex-col gap-3">
                                <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">IFSC Code</label>
                                <input
                                  required={useBankTransfer}
                                  type="text"
                                  placeholder="Enter IFSC code"
                                  value={promoterData.bankIfsc || ""}
                                  onChange={(e) => setPromoterData({ ...promoterData, bankIfsc: e.target.value })}
                                  className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner font-sans"
                                />
                              </div>
                            </div>
                          )}

                          <p className="text-[0.75rem] text-amber-500/80 font-medium mt-1">
                            <span className="block sm:inline">Make sure your details are correct. </span>
                            <span className="block sm:inline">Incorrect details may prevent your payout.</span>
                          </p>

                          <div className="flex items-center gap-3">
                            <input
                              id="useBankTransfer"
                              type="checkbox"
                              checked={useBankTransfer}
                              onChange={(e) => {
                                const val = e.target.checked;
                                setUseBankTransfer(val);
                                if (val) {
                                  setPromoterData({ ...promoterData, upiId: null });
                                } else {
                                  setPromoterData({
                                    ...promoterData,
                                    bankAccountName: null,
                                    bankAccountNumber: null,
                                    bankIfsc: null
                                  });
                                }
                              }}
                              className="w-4 h-4 rounded border-border text-[#16a34a] focus:ring-[#16a34a] cursor-pointer"
                            />
                            <label htmlFor="useBankTransfer" className="text-sm font-bold text-muted cursor-pointer select-none">
                              Use bank transfer instead
                            </label>
                          </div>
                        </div>
                      )}

                      {/* If region is INTERNATIONAL */}
                      {promoterData.payoutRegion === "INTERNATIONAL" && (
                        <div className="space-y-6">
                          {!usePaypal ? (
                            <div className="space-y-6">
                              {getFieldsForCountry(promoterData.intlBankCountry || "").map((field) => (
                                <div key={field.key} className="flex flex-col gap-3">
                                  <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">
                                    {field.label}
                                  </label>
                                  <input
                                    required={field.required}
                                    type="text"
                                    placeholder={field.placeholder}
                                    value={promoterData[field.key] || ""}
                                    onChange={(e) => setPromoterData({ ...promoterData, [field.key]: e.target.value })}
                                    className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner font-sans"
                                  />
                                </div>
                              ))}
                              <p className="text-[0.75rem] text-amber-500/80 font-medium mt-1">
                                <span className="block sm:inline">Make sure your details are correct. </span>
                                <span className="block sm:inline">Incorrect details may prevent your payout.</span>
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-3">
                              <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">PayPal Email</label>
                              <input
                                required={usePaypal}
                                type="email"
                                placeholder="Your PayPal email"
                                value={promoterData.paypalEmail || ""}
                                onChange={(e) => setPromoterData({ ...promoterData, paypalEmail: e.target.value })}
                                className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner font-sans"
                              />
                            </div>
                          )}

                          <div className="flex items-center gap-3">
                            <input
                              id="usePaypal"
                              type="checkbox"
                              checked={usePaypal}
                              onChange={(e) => {
                                const val = e.target.checked;
                                setUsePaypal(val);
                                if (val) {
                                  setPromoterData({
                                    ...promoterData,
                                    intlAccountHolderName: null,
                                    intlRoutingNumber: null,
                                    intlAccountNumber: null,
                                    intlSortCode: null,
                                    intlIban: null,
                                    intlBicSwift: null,
                                    intlBsbCode: null,
                                    intlTransitNumber: null,
                                    intlInstitutionNumber: null
                                  });
                                } else {
                                  setPromoterData({ ...promoterData, paypalEmail: null });
                                }
                              }}
                              className="w-4 h-4 rounded border-border text-[#16a34a] focus:ring-[#16a34a] cursor-pointer"
                            />
                            <label htmlFor="usePaypal" className="text-sm font-bold text-muted cursor-pointer select-none">
                              I don't have a bank account that accepts international wire transfers
                            </label>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Referral Link */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Your Referral Link</label>
                    <div className="flex flex-col md:flex-row gap-3">
                      <div className="flex-1 bg-background border border-border rounded-xl px-5 py-4 text-[#16a34a] font-mono font-bold text-[1rem] shadow-inner flex items-center overflow-x-auto whitespace-nowrap no-scrollbar md:overflow-x-visible">
                        https://theplugd.com?ref={referralLinkSuffix}
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(`https://theplugd.com?ref=${referralLinkSuffix}`, 'link')}
                        className="px-8 py-4 md:py-0 rounded-xl bg-accent border border-border text-foreground font-bold hover:bg-accent/80 transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] shrink-0"
                      >
                        {copied === 'link' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                        {copied === 'link' ? "Copied" : "Copy Link"}
                      </button>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-8 border-t border-border">
                    <button
                      type="submit"
                      disabled={promoterSaving}
                      className="w-full bg-[#16a34a] text-white font-black text-lg py-5 px-12 rounded-xl transition-all hover:bg-[#16a34a]/90 shadow-2xl active:scale-[0.99] uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {promoterSaving ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          Save Changes
                        </>
                      )}
                    </button>
                    {promoterError && (
                      <p className="text-red-500 text-center md:text-left mt-4 font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                        <X size={20} />
                        {promoterError}
                      </p>
                    )}
                    {promoterSuccess && (
                      <p className="text-green-500 text-center md:text-left mt-4 font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                        <Check size={20} />
                        Changes saved successfully!
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}

      {/* Referrals Section */}
      {activeSection === "referrals" && (
        <div className="space-y-8">
          <div>
            <h1 className="text-[2.25rem] font-[700] text-foreground leading-tight tracking-tight">Referrals</h1>
            <p className="text-muted text-[1rem] mt-1.5 font-sans font-normal">Share Plugd and earn ₹100 for every successful referral.</p>
          </div>

          {(!hasPromoter && !isAdmin) ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#16a34a]/10 flex items-center justify-center mb-6">
                <Gift className="w-10 h-10 text-[#16a34a]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Join Referral Program</h2>
              <p className="text-muted max-w-sm mb-8 font-sans">Earn ₹100 from every sale by sharing Plugd with your audience. (Listing Profile = ₹199, Promoter Profile = ₹199, both = ₹398)</p>
              <button 
                onClick={() => setIsReferModalOpen(true)}
                className="bg-[#16a34a] text-white px-8 py-4 rounded-xl font-sans font-bold hover:bg-[#16a34a]/90 transition-all flex items-center gap-2 shadow-xl shadow-green-600/20"
              >
                Join for ₹199 <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Row 1: Your Referral Link card (Full width) */}
              <div className="bg-pill border border-border rounded-[16px] p-6 md:p-8 shadow-2xl space-y-6">
                {/* Referral Link */}
                <div className="space-y-4 text-left">
                  <label className="text-[0.8rem] font-bold text-muted/60 block tracking-widest uppercase">YOUR REFERRAL LINK</label>
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] font-medium flex items-center overflow-x-auto whitespace-nowrap no-scrollbar md:overflow-x-visible">
                      theplugd.com?ref={referralLinkSuffix}
                    </div>
                    <button 
                      type="button"
                      onClick={() => copyToClipboard(`https://theplugd.com?ref=${referralLinkSuffix}`, 'link')}
                      className="bg-[#16a34a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#16a34a]/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-[0.98]"
                    >
                      {copied === 'link' ? <Check className="w-5 h-5" /> : <><Copy className="w-5 h-5" /> Copy Link</>}
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: Post Ideas (Left) and Traffic Sources (Right) side-by-side on desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Post Ideas */}
                <div className="bg-pill border border-border rounded-[16px] p-6 md:p-8 shadow-2xl space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center border border-border">
                      <Share2 className="w-4 h-4 text-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Post Ideas</h3>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="bg-pill border border-border rounded-2xl p-6 space-y-4 flex flex-col justify-between bg-[#F5F5F5] dark:bg-zinc-950/20 text-left">
                      <div className="space-y-4">
                        <p className="text-xs text-zinc-600 dark:text-muted font-normal">
                          these are just post ideas to get you started, customize them, make it sound like you
                        </p>
                        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                          {[1, 2, 3].map((num, idx) => (
                            <button
                              key={num}
                              onClick={() => setSelectedVariation(idx)}
                              className={`px-3 py-1.5 rounded-lg text-[0.7rem] font-sans font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                                selectedVariation === idx 
                                ? "bg-selected text-selected-foreground border border-selected" 
                                : "bg-background text-muted border border-border hover:border-muted"
                              }`}
                            >
                              VARIATION {num}
                            </button>
                          ))}
                        </div>
                        <div className="min-h-[80px] flex items-center">
                          <p className="text-sm text-foreground font-sans font-medium leading-relaxed" style={{ whiteSpace: "pre-line" }}>
                            &quot;{POST_VARIATIONS[selectedVariation]}&quot;
                          </p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => copyToClipboard(POST_VARIATIONS[selectedVariation], 'post')}
                        className="w-full bg-background text-foreground border border-border py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all active:scale-[0.98]"
                      >
                        {copied === 'post' ? <Check className="w-4 h-4 text-green-500" /> : "Copy Post"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Traffic Sources */}
                <div className="bg-pill border border-border rounded-[16px] p-6 md:p-8 shadow-2xl space-y-6">
                  <div className="text-left">
                    <h4 className="text-base font-bold text-foreground">Traffic Sources</h4>
                    <p className="text-xs text-zinc-600 dark:text-muted mt-0.5">Clicks tracked from each share destination.</p>
                  </div>
                  
                  <div className="space-y-3.5">
                    {[
                      { name: "WhatsApp", key: "whatsapp", color: "bg-emerald-500" },
                      { name: "Telegram", key: "telegram", color: "bg-sky-500" },
                      { name: "X", key: "x", color: "bg-zinc-200" },
                      { name: "Reddit", key: "reddit", color: "bg-orange-500" },
                      { name: "Discord", key: "discord", color: "bg-indigo-500" },
                      { name: "Instagram", key: "instagram", color: "bg-pink-500" },
                      { name: "Facebook", key: "facebook", color: "bg-blue-600" },
                      { name: "LinkedIn", key: "linkedin", color: "bg-blue-500" },
                      { name: "YouTube", key: "youtube", color: "bg-red-600" },
                      { name: "TikTok", key: "tiktok", color: "bg-teal-400" },
                      { name: "Threads", key: "threads", color: "bg-stone-300" },
                      { name: "Others", key: "others", color: "bg-zinc-500" }
                    ].map(source => {
                      const clicks = trafficSources.find(s => s.source.toLowerCase() === source.key)?.clicks || 0;
                      const totalClicks = trafficSources.reduce((acc, curr) => acc + curr.clicks, 0) || 1;
                      const percentage = Math.round((clicks / totalClicks) * 100);
                      return (
                        <div key={source.key} className="space-y-1.5 text-left">
                          <div className="flex justify-between items-center text-xs font-semibold">
                            <span className="text-foreground">{source.name}</span>
                            <span className="text-zinc-600 dark:text-muted font-sans">{clicks} clicks</span>
                          </div>
                          <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className={`${source.color} h-full rounded-full transition-all duration-300`}
                              style={{ width: `${clicks > 0 ? Math.max(4, percentage) : 0}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Row 3: How to hit ₹1,00,000 fast card (Full width) */}
              <div className="bg-pill border border-border rounded-[16px] p-6 md:p-8 shadow-2xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center border border-border">
                    <TrendingUp className="w-4 h-4 text-foreground" />
                  </div>
                  <h3 className="text-lg font-sans font-bold text-foreground">How to hit ₹1,00,000 fast</h3>
                </div>

                <div className="bg-[#F5F5F5] dark:bg-zinc-950/20 border border-[#e4e4e7] dark:border-border rounded-2xl p-6 space-y-6">
                  <div className="space-y-4 text-left">
                    {[
                      "Open your contacts. Send your link to everyone you think would actually do something with this. Don't overthink it, just send.",
                      "Drop your link in every WhatsApp and Telegram group you're in.",
                      "Go on X. Post it, reply with it, DM it to your followers. Everywhere.",
                      "Find Reddit threads and Discord servers about making money, side hustles, passive income. Drop your link there.",
                      "Post your link in your Instagram story and TikTok. 10 seconds and it works while you sleep.",
                      "Put your referral link in your Instagram bio, X bio, TikTok bio. Passive clicks every time someone visits your profile.",
                      "Find Facebook groups about making money online. Millions of people in there who haven't seen this yet.",
                      "Go to YouTube. Find videos about making money online and drop your link in the comments. Those people are already looking.",
                      "Find friends who have big followings and ask them to share your link. One post from the right person changes everything.",
                      "Don't just send once and stop. Follow up. People need to see something multiple times before they act."
                    ].map((tip, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-sans font-bold shrink-0 mt-0.5">{idx + 1}</div>
                        <p className="text-sm text-foreground font-medium leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Earnings Section */}
      {activeSection === "earnings" && (
        <div className="space-y-8">
          <div>
            <h1 className="text-[2.25rem] font-[700] text-foreground leading-tight tracking-tight">Your Earnings</h1>
            <p className="text-muted text-[1rem] mt-1.5 font-normal">Track your earnings and request payouts.</p>
          </div>

          {(!hasPromoter && !isAdmin) ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#16a34a]/10 flex items-center justify-center mb-6">
                <Wallet className="w-10 h-10 text-[#16a34a]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Earnings Locked</h2>
              <p className="text-muted max-w-sm mb-8 font-sans">Join the referral program to start earning rewards. (Listing Profile = ₹199, Promoter Profile = ₹199, both = ₹398)</p>
              <button 
                onClick={() => setIsReferModalOpen(true)}
                className="bg-[#16a34a] text-white px-8 py-4 rounded-xl font-sans font-bold hover:bg-[#16a34a]/90 transition-all flex items-center gap-2 shadow-xl shadow-green-600/20"
              >
                Join for ₹199 <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
                  <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Total Earned</p>
                  <p className="text-4xl font-sans font-bold text-foreground">₹{promoterData?.totalEarned || 0}</p>
                </div>
                <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl border-[#16a34a]/20">
                  <p className="text-[#16a34a] text-[0.7rem] font-bold uppercase tracking-widest mb-2">Pending Payout</p>
                  <p className="text-4xl font-sans font-bold text-[#16a34a]">₹{promoterData?.pendingPayout || 0}</p>
                </div>
                <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
                  <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Total Clicks</p>
                  <p className="text-4xl font-sans font-bold text-foreground">{promoterData?.totalClicks || 0}</p>
                </div>
                <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
                  <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Conversions</p>
                  <p className="text-4xl font-sans font-bold text-foreground">{promoterData?.totalConversions || 0}</p>
                </div>
              </div>


              <div className="bg-pill border border-border rounded-[16px] p-6 md:p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Earnings Over Time</h3>
                    <p className="text-xs text-muted mt-1 font-medium">Track your conversion velocity and growth.</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    {/* Time Range Toggle */}
                    <div className="flex bg-accent dark:bg-[#111] rounded-xl p-1 border border-border/40">
                      {(["7d", "4w", "3m"] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => setChartRange(r)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase ${
                            chartRange === r
                              ? "bg-[#22c55e] text-white shadow-md"
                              : "text-muted hover:text-foreground cursor-pointer"
                          }`}
                        >
                          {r === "7d" ? "7D" : r === "4w" ? "4W" : "3M"}
                        </button>
                      ))}
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex bg-accent dark:bg-[#111] rounded-xl p-1 border border-border/40">
                      {(["daily", "cumulative"] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setChartMode(m)}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${
                            chartMode === m
                              ? "bg-[#22c55e] text-white shadow-md"
                              : "text-muted hover:text-foreground cursor-pointer"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full h-72">
                  {loadingChart ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-[#22c55e] animate-spin" />
                    </div>
                  ) : chartMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={processedChartData}
                        margin={{ top: 10, right: isDesktop ? 30 : 10, left: -5, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorEarning" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                        <XAxis 
                          dataKey="date" 
                          stroke="var(--muted)" 
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                          dy={10}
                          interval={
                            (!isDesktop
                              ? (chartRange === "7d" ? 1 : "preserveEnd")
                              : (index: number) => {
                                  const total = processedChartData.length;
                                  const step = chartRange === "7d" ? 2 : chartRange === "4w" ? 2 : 5;
                                  return (total - 1 - index) % step === 0;
                                }) as any
                          }
                        />
                        <YAxis 
                          stroke="var(--muted)" 
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={formatYAxis}
                          dx={-10}
                          domain={hasNoEarnings ? [0, 400] : undefined}
                          ticks={hasNoEarnings ? [0, 100, 200, 300, 400] : undefined}
                        />
                        <Tooltip
                          cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '3 3' }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-pill border border-border px-3 py-2 rounded-xl shadow-xl font-sans">
                                  <p className="text-[10px] text-muted font-medium mb-0.5">{data.date}</p>
                                  <p className="text-xs font-bold text-[#22c55e] font-sans">
                                    ₹{new Intl.NumberFormat('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Number(payload[0].value))}
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="displayAmount"
                          stroke="#22c55e"
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#colorEarning)"
                          dot={false}
                          activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2, fill: 'var(--background)' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : null}
                </div>
              </div>

              <div className="bg-pill border border-border rounded-[16px] p-6 md:p-10 shadow-2xl flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-selected/10 flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-selected" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Withdraw Funds</h3>
                  <p className="text-muted max-w-sm mt-2 font-sans font-medium">Request a payout to your PayPal or Bank account. Minimum withdrawal is ₹5,000.</p>
                </div>
                {withdrawalSuccessMessage && (
                  <p className="text-[#16a34a] font-bold text-sm bg-[#16a34a]/10 px-6 py-3 rounded-xl border border-[#16a34a]/20">
                    {withdrawalSuccessMessage}
                  </p>
                )}
                {hasPendingWithdrawal ? (
                  <button 
                    disabled
                    className="bg-amber-600/10 text-amber-500 border border-amber-600/20 px-12 py-4 rounded-xl font-bold opacity-75 cursor-not-allowed shadow-inner"
                  >
                    Withdrawal requested
                  </button>
                ) : (
                  <button 
                    disabled={(promoterData?.pendingPayout || 0) < 5000 || requestingWithdrawal}
                    onClick={handleRequestWithdrawal}
                    className="bg-[#16a34a] hover:bg-[#16a34a]/90 text-white disabled:bg-white disabled:text-black disabled:opacity-50 disabled:grayscale px-12 py-4 rounded-xl font-sans font-bold transition-all shadow-xl active:scale-[0.98]"
                  >
                    {(promoterData?.pendingPayout || 0) < 5000 
                      ? "Minimum ₹5,000 required" 
                      : requestingWithdrawal 
                        ? "Submitting..." 
                        : "Request Withdrawal"}
                  </button>
                )}
              </div>

              <p className="text-[0.75rem] text-muted text-center font-medium flex items-center justify-center gap-2">
                Payouts are processed twice a month.
                <a href="mailto:support@theplugd.com" className="text-[#16a34a] font-bold hover:underline inline-flex items-center gap-1">
                  Contact Support <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          )}
        </div>
      )}

      {/* League Section */}
      {activeSection === "league" && (
        <div className="space-y-8">
          <div>
            <h1 className="text-[2.25rem] font-[700] text-foreground leading-tight tracking-tight">Promoter League</h1>
            <p className="text-muted text-[1rem] mt-1.5 font-normal">Climb through the promoter leagues based on your lifetime earnings.</p>
          </div>

          {(!hasPromoter && !isAdmin) ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#16a34a]/10 flex items-center justify-center mb-6">
                <Trophy className="w-10 h-10 text-[#16a34a]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">League Locked</h2>
              <p className="text-muted max-w-sm mb-8">Join the referral program to start unlocking promoter leagues.</p>
              <button 
                onClick={() => setIsReferModalOpen(true)}
                className="bg-[#16a34a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#16a34a]/90 transition-all flex items-center gap-2 shadow-xl shadow-green-600/20"
              >
                Join for ₹199 <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-8 text-left">
              {/* CURRENT LEAGUE CENTERPIECE CARD */}
              <div className="bg-pill border border-[#16a34a]/35 rounded-2xl p-6 md:p-8 shadow-[0_0_25px_rgba(22,163,74,0.05)] backdrop-blur-md relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="text-[10px] text-muted uppercase font-bold tracking-widest block">
                      Current League
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 filter drop-shadow-[0_0_15px_rgba(22,163,74,0.15)]">
                        <LeagueIcon id={currentLeague ? currentLeague.id : "bronze"} size={64} />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
                          {currentLeague ? currentLeague.name : "Bronze League"}
                        </h2>
                        <p className="text-xs text-muted mt-0.5">Keep promoting to reach the next status tier.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F5F5F5] dark:bg-zinc-950/45 border border-[#e4e4e7] dark:border-border/40 rounded-xl p-4 min-w-[200px] text-left md:text-right">
                    <span className="text-[9px] text-muted uppercase font-bold tracking-widest block">
                      Lifetime Earnings
                    </span>
                    <span className="text-2xl font-sans font-black text-[#16a34a] mt-1 block">
                      ₹{new Intl.NumberFormat("en-IN").format(earnings)}
                    </span>
                  </div>
                </div>
              </div>

              {/* PROGRESS TO NEXT LEAGUE */}
              {targetLeague && (
                <div className="bg-pill border border-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Progress To Next League</h3>
                    <p className="text-xs text-muted mt-0.5 font-medium">Your current path towards {targetLeague.name}.</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-[#F5F5F5] dark:bg-zinc-950/20 border border-[#e4e4e7] dark:border-border/40 p-4 rounded-xl">
                      <span className="text-[9px] text-muted uppercase font-bold tracking-widest block">Current</span>
                      <span className="text-lg font-sans font-bold text-foreground mt-1 block">
                        ₹{new Intl.NumberFormat("en-IN").format(earnings)}
                      </span>
                    </div>
                    <div className="bg-[#F5F5F5] dark:bg-zinc-950/20 border border-[#e4e4e7] dark:border-border/40 p-4 rounded-xl">
                      <span className="text-[9px] text-muted uppercase font-bold tracking-widest block">Target</span>
                      <span className="text-lg font-sans font-bold text-foreground mt-1 block">
                        ₹{new Intl.NumberFormat("en-IN").format(targetLeague.target)}
                      </span>
                    </div>
                    <div className="bg-[#F5F5F5] dark:bg-zinc-950/20 border border-[#e4e4e7] dark:border-border/40 p-4 rounded-xl col-span-2 md:col-span-1">
                      <span className="text-[9px] text-muted uppercase font-bold tracking-widest block">Remaining</span>
                      <span className="text-lg font-sans font-bold text-emerald-400 mt-1 block">
                        ₹{new Intl.NumberFormat("en-IN").format(remainingAmount)} Remaining
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="w-full bg-zinc-200 dark:bg-zinc-950 rounded-full h-3 overflow-hidden border border-border/30 p-[1px]">
                      {progressPercent > 0 && (
                        <div 
                          className="h-full rounded-full bg-[#16a34a] transition-all duration-500 shadow-[0_0_10px_rgba(22,163,74,0.3)]"
                          style={{ width: `${progressPercent}%` }}
                        />
                      )}
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold text-muted px-1">
                      <span className="font-sans">{progressPercent}% Complete</span>
                      <span className="font-sans">₹{new Intl.NumberFormat("en-IN").format(remainingAmount)} left to unlock {targetLeague.name}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* LEAGUE PROGRESSION VERTICAL STACK */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">League Progression</h3>
                  <p className="text-xs text-zinc-600 dark:text-muted mt-0.5 font-medium">Review the complete hierarchical status ladder.</p>
                </div>

                <div className="space-y-3.5">
                  {LEAGUE_DEFS.map((league, idx) => {
                    const isUnlocked = earnings >= league.target;
                    const isCurrent = currentLeagueIndex === idx;
                    
                    const statusColors = isCurrent
                      ? "bg-green-950/15 border-[#16a34a] text-emerald-400 shadow-[0_0_15px_rgba(22,163,74,0.08)] ring-1 ring-[#16a34a]/30"
                      : isUnlocked
                        ? "bg-zinc-900/40 border-green-500/20 text-emerald-400/80"
                        : "bg-zinc-950/30 dark:bg-zinc-950/30 border-border/30 text-zinc-500 dark:text-muted/80 opacity-70";

                    return (
                      <div 
                        key={league.id}
                        className={`border rounded-2xl p-5 md:p-6 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 text-left ${statusColors}`}
                      >
                        <div className="flex items-center gap-5">
                          <div className={`w-14 h-14 rounded-full bg-zinc-900/80 border flex items-center justify-center shrink-0 ${
                            isCurrent 
                              ? "border-[#16a34a] shadow-[0_0_10px_rgba(34,197,94,0.2)]" 
                              : isUnlocked 
                                ? "border-green-500/30" 
                                : "border-border/30"
                          }`}>
                            <LeagueIcon id={league.id} size={36} />
                          </div>
                          
                          <div>
                            <h4 className="text-lg md:text-xl font-black text-foreground tracking-tight leading-tight">
                              {league.name}
                            </h4>
                            <p className="text-sm md:text-base font-sans font-extrabold text-[#16a34a] mt-1">
                              ₹{new Intl.NumberFormat("en-IN").format(league.target)}+
                            </p>
                          </div>
                        </div>

                        {/* Status Label on Right (Subtle, no header label) */}
                        <div className="flex items-center justify-between md:justify-end border-t border-border/10 md:border-t-0 pt-3 md:pt-0 shrink-0 text-left md:text-right">
                          {isCurrent ? (
                            <span className="text-[10px] font-black text-[#16a34a] uppercase tracking-widest select-none bg-[#16a34a]/10 border border-[#16a34a]/30 px-3 py-1.5 rounded-full">
                              Current League
                            </span>
                          ) : isUnlocked ? (
                            <span className="text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest bg-emerald-500/5 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                              Unlocked
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-zinc-500 dark:text-muted/80 uppercase tracking-widest flex items-center gap-1.5 opacity-85">
                              <Lock size={10} className="text-zinc-500 dark:text-muted/80" /> Locked
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <ReferralModal 
        isOpen={isReferModalOpen} 
        onClose={() => setIsReferModalOpen(false)} 
        userEmail={promoterData?.email || ""} 
        referralCode={searchParams.get("ref") || ""}
      />
    </div>
  );
}

export default function DashboardProfileView() {
  return (
    <Suspense fallback={
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-10 w-48 bg-card rounded-lg" />
        <div className="h-4 w-64 bg-card rounded-lg" />
        <div className="h-[600px] w-full bg-card rounded-xl mt-8" />
      </div>
    }>
      <DashboardProfileContent />
    </Suspense>
  );
}
