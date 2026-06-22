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
  Trophy,
  Award,
  Flame,
  Zap
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { NICHES } from "@/lib/constants";
import { getFieldsForCountry } from "@/lib/payoutFieldsByCountry";
import { COUNTRY_CODES } from "@/lib/countryCodes";


import ReferralModal from "@/components/ReferralModal";



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

  const POST_VARIATIONS = [
    `if you've never heard of Plugd, it's a referral platform 💸

pay ₹199 once, get your link, share it everywhere - whatsapp, telegram, discord, twitter, wherever

every person who joins through your link = ₹100 in your earnings

stay consistent and it builds up fast 👉 ${link}`,
    `Plugd is a referral program and honestly one of the simplest ways to make money online 💸

₹199 to join. you get a unique link. every signup through your link pays you ₹100 back.

share it consistently and it compounds. i'm doing it.

👉 ${link}`,
    `joined this referral platform called Plugd a while back 💸

the model is simple - pay ₹199, get your own referral link, earn ₹100 every time someone signs up through it

the more consistently you share it, the more it adds up

here's my link 👉 ${link}`
  ];

  // Determine active section from tab param
  const activeSection = ["profile", "referrals", "earnings", "missions", "achievements"].includes(tab) ? tab : "profile";

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

  // 1. Click Missions (10 levels)
  const clickMissions = [
    { level: 1, target: 1, xp: 100 },
    { level: 2, target: 10, xp: 150 },
    { level: 3, target: 50, xp: 200 },
    { level: 4, target: 100, xp: 250 },
    { level: 5, target: 250, xp: 300 },
    { level: 6, target: 500, xp: 350 },
    { level: 7, target: 1000, xp: 400 },
    { level: 8, target: 2500, xp: 500 },
    { level: 9, target: 5000, xp: 600 },
    { level: 10, target: 10000, xp: 800 },
  ];

  // 2. Signup Missions (9 levels)
  const signupMissions = [
    { level: 1, target: 1, xp: 150 },
    { level: 2, target: 5, xp: 200 },
    { level: 3, target: 10, xp: 250 },
    { level: 4, target: 25, xp: 300 },
    { level: 5, target: 50, xp: 350 },
    { level: 6, target: 100, xp: 400 },
    { level: 7, target: 250, xp: 500 },
    { level: 8, target: 500, xp: 600 },
    { level: 9, target: 1000, xp: 800 },
  ];

  // 3. Earnings Missions (10 levels)
  const earningsMissions = [
    { level: 1, target: 100, xp: 200 },
    { level: 2, target: 1000, xp: 250 },
    { level: 3, target: 5000, xp: 300 },
    { level: 4, target: 10000, xp: 350 },
    { level: 5, target: 25000, xp: 400 },
    { level: 6, target: 50000, xp: 500 },
    { level: 7, target: 100000, xp: 600 },
    { level: 8, target: 250000, xp: 700 },
    { level: 9, target: 500000, xp: 800 },
    { level: 10, target: 1000000, xp: 1000 },
  ];

  // 4. Distribution Platforms (9 platforms)
  const distributionPlatforms = [
    { id: "whatsapp", name: "WhatsApp", xp: 50 },
    { id: "telegram", name: "Telegram", xp: 50 },
    { id: "x", name: "X", xp: 50 },
    { id: "reddit", name: "Reddit", xp: 50 },
    { id: "discord", name: "Discord", xp: 50 },
    { id: "instagram", name: "Instagram", xp: 50 },
    { id: "facebook", name: "Facebook", xp: 50 },
    { id: "linkedin", name: "LinkedIn", xp: 50 },
    { id: "youtube", name: "YouTube", xp: 50 },
  ];

  // 5. Consistency Missions (5 levels)
  const consistencyMissions = [
    { level: 1, target: 7, xp: 100 },
    { level: 2, target: 14, xp: 150 },
    { level: 3, target: 30, xp: 250 },
    { level: 4, target: 60, xp: 400 },
    { level: 5, target: 90, xp: 600 },
  ];

  let totalXp = 0;
  
  clickMissions.forEach(m => {
    if (clicks >= m.target) totalXp += m.xp;
  });

  signupMissions.forEach(m => {
    if (signups >= m.target) totalXp += m.xp;
  });

  earningsMissions.forEach(m => {
    if (earnings >= m.target) totalXp += m.xp;
  });

  distributionPlatforms.forEach(p => {
    if (copiedPlatforms[p.id]) totalXp += p.xp;
  });

  consistencyMissions.forEach(m => {
    if (streak >= m.target) totalXp += m.xp;
  });

  const currentLevel = Math.floor(totalXp / 1000) + 1;
  const xpInCurrentLevel = totalXp % 1000;
  const progressToNextLevel = (xpInCurrentLevel / 1000) * 100;

  // Active mission selectors
  const currentClickMissionIndex = clickMissions.findIndex(m => clicks < m.target);
  const activeClickMission = currentClickMissionIndex === -1 ? null : clickMissions[currentClickMissionIndex];
  const completedClickMissionsCount = currentClickMissionIndex === -1 ? clickMissions.length : currentClickMissionIndex;

  const currentSignupMissionIndex = signupMissions.findIndex(m => signups < m.target);
  const activeSignupMission = currentSignupMissionIndex === -1 ? null : signupMissions[currentSignupMissionIndex];
  const completedSignupMissionsCount = currentSignupMissionIndex === -1 ? signupMissions.length : currentSignupMissionIndex;

  const currentEarningsMissionIndex = earningsMissions.findIndex(m => earnings < m.target);
  const activeEarningsMission = currentEarningsMissionIndex === -1 ? null : earningsMissions[currentEarningsMissionIndex];
  const completedEarningsMissionsCount = currentEarningsMissionIndex === -1 ? earningsMissions.length : currentEarningsMissionIndex;

  const currentConsistencyMissionIndex = consistencyMissions.findIndex(m => streak < m.target);
  const activeConsistencyMission = currentConsistencyMissionIndex === -1 ? null : consistencyMissions[currentConsistencyMissionIndex];
  const completedConsistencyMissionsCount = currentConsistencyMissionIndex === -1 ? consistencyMissions.length : currentConsistencyMissionIndex;

  const completedDistributionCount = Object.values(copiedPlatforms).filter(Boolean).length;

  const achievements = [
    {
      id: "first_click",
      name: "First Click",
      rarity: "Common",
      emoji: "🥉",
      unlocked: clicks >= 1,
      desc: "Generate your first link click",
      requirement: "1 Click",
      badgeColor: "from-zinc-500/20 to-zinc-600/30 border-zinc-500/40 text-zinc-400"
    },
    {
      id: "first_signup",
      name: "First Signup",
      rarity: "Common",
      emoji: "🏅",
      unlocked: signups >= 1,
      desc: "Get your first paid signup",
      requirement: "1 Signup",
      badgeColor: "from-zinc-500/20 to-zinc-600/30 border-zinc-500/40 text-zinc-400"
    },
    {
      id: "first_100",
      name: "₹100 Earned",
      rarity: "Common",
      emoji: "💸",
      unlocked: earnings >= 100,
      desc: "Earn your first ₹100 reward",
      requirement: "₹100 Earned",
      badgeColor: "from-zinc-500/20 to-zinc-600/30 border-zinc-500/40 text-zinc-400"
    },
    {
      id: "7_day_streak",
      name: "7 Day Streak",
      rarity: "Common",
      emoji: "🔥",
      unlocked: streak >= 7,
      desc: "Promote for 7 consecutive days",
      requirement: "7 Day Streak",
      badgeColor: "from-zinc-500/20 to-zinc-600/30 border-zinc-500/40 text-zinc-400"
    },
    {
      id: "10_signups",
      name: "10 Signups",
      rarity: "Rare",
      emoji: "🥈",
      unlocked: signups >= 10,
      desc: "Secure 10 successful promoter signups",
      requirement: "10 Signups",
      badgeColor: "from-teal-600/20 to-teal-500/30 border-teal-500/40 text-teal-400"
    },
    {
      id: "1000_earned",
      name: "₹1,000 Earned",
      rarity: "Rare",
      emoji: "💰",
      unlocked: earnings >= 1000,
      desc: "Accumulate ₹1,000 in total commissions",
      requirement: "₹1,000 Earned",
      badgeColor: "from-teal-600/20 to-teal-500/30 border-teal-500/40 text-teal-400"
    },
    {
      id: "viral_promoter",
      name: "Viral Promoter",
      rarity: "Rare",
      emoji: "🚀",
      unlocked: trafficSources.filter(s => s.clicks > 0).length >= 5,
      desc: "Get clicks from 5 or more platforms",
      requirement: "5 Active Channels",
      badgeColor: "from-teal-600/20 to-teal-500/30 border-teal-500/40 text-teal-400"
    },
    {
      id: "100_clicks",
      name: "100 Clicks",
      rarity: "Epic",
      emoji: "⚡",
      unlocked: clicks >= 100,
      desc: "Drive 100 total clicks to your link",
      requirement: "100 Clicks",
      badgeColor: "from-purple-600/20 to-purple-500/30 border-purple-500/40 text-purple-400"
    },
    {
      id: "100_signups",
      name: "100 Signups",
      rarity: "Epic",
      emoji: "🎖️",
      unlocked: signups >= 100,
      desc: "Register 100 paid promoters",
      requirement: "100 Signups",
      badgeColor: "from-purple-600/20 to-purple-500/30 border-purple-500/40 text-purple-400"
    },
    {
      id: "10000_earned",
      name: "₹10,000 Earned",
      rarity: "Epic",
      emoji: "💎",
      unlocked: earnings >= 10000,
      desc: "Cross ₹10,000 in total earned commissions",
      requirement: "₹10,000 Earned",
      badgeColor: "from-purple-600/20 to-purple-500/30 border-purple-500/40 text-purple-400"
    },
    {
      id: "30_day_streak",
      name: "30 Day Streak",
      rarity: "Epic",
      emoji: "💥",
      unlocked: streak >= 30,
      desc: "Promote for 30 consecutive days",
      requirement: "30 Day Streak",
      badgeColor: "from-purple-600/20 to-purple-500/30 border-purple-500/40 text-purple-400"
    },
    {
      id: "1000_clicks",
      name: "1,000 Clicks",
      rarity: "Legendary",
      emoji: "🌟",
      unlocked: clicks >= 1000,
      desc: "Drive 1,000 total clicks to your link",
      requirement: "1,000 Clicks",
      badgeColor: "from-amber-600/20 to-amber-500/30 border-amber-500/40 text-amber-400"
    },
    {
      id: "100000_earned",
      name: "₹100,000 Earned",
      rarity: "Legendary",
      emoji: "👑",
      unlocked: earnings >= 100000,
      desc: "Unlock the 6-figure promoters club",
      requirement: "₹100,000 Earned",
      badgeColor: "from-amber-600/20 to-amber-500/30 border-amber-500/40 text-amber-400"
    },
    {
      id: "distribution_master",
      name: "Distribution Master",
      rarity: "Legendary",
      emoji: "🕸️",
      unlocked: Object.values(copiedPlatforms).filter(Boolean).length >= 9,
      desc: "Copy referral links for all 9 platforms",
      requirement: "9 Links Copied",
      badgeColor: "from-amber-600/20 to-amber-500/30 border-amber-500/40 text-amber-400"
    },
    {
      id: "10000_clicks",
      name: "10,000 Clicks",
      rarity: "Mythic",
      emoji: "🌌",
      unlocked: clicks >= 10000,
      desc: "Drive 10,000 total clicks to your link",
      requirement: "10,000 Clicks",
      badgeColor: "from-red-600/25 to-red-500/35 border-red-500/50 text-red-400"
    },
    {
      id: "1000_signups",
      name: "1,000 Signups",
      rarity: "Mythic",
      emoji: "🏆",
      unlocked: signups >= 1000,
      desc: "Amass a promoter army of 1,000 users",
      requirement: "1,000 Signups",
      badgeColor: "from-red-600/25 to-red-500/35 border-red-500/50 text-red-400"
    },
    {
      id: "1000000_earned",
      name: "₹1,000,000 Earned",
      rarity: "Mythic",
      emoji: "🔱",
      unlocked: earnings >= 1000000,
      desc: "Achieve legendary status: Earn ₹10 Lakhs",
      requirement: "₹1,000,000 Earned",
      badgeColor: "from-red-600/25 to-red-500/35 border-red-500/50 text-red-400"
    },
    {
      id: "plugd_legend",
      name: "Plugd Legend",
      rarity: "Mythic",
      emoji: "🐉",
      unlocked: currentLevel >= 10,
      desc: "Reach Level 10 on the promoter dashboard",
      requirement: "Level 10 reached",
      badgeColor: "from-red-600/25 to-red-500/35 border-red-500/50 text-red-400"
    },
    {
      id: "cup_legend",
      name: "Cup Legend",
      rarity: "Mythic",
      emoji: "🏆",
      unlocked: promoterData?.rank !== undefined && promoterData.rank <= 3,
      desc: "Rank in the top 3 global promoter leaderboard",
      requirement: "Top 3 Rank",
      badgeColor: "from-red-600/25 to-red-500/35 border-red-500/50 text-red-400"
    }
  ];

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
                  {/* Profile Picture Upload */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border/40">
                    <div className="relative group shrink-0">
                      {promoterData.avatarUrl ? (
                        <img 
                          src={promoterData.avatarUrl} 
                          alt="Profile Picture" 
                          className="w-24 h-24 rounded-full object-cover border border-border shadow-lg"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-green-300 text-white font-black text-2xl flex items-center justify-center border border-border shadow-lg">
                          {(promoterData.name || "").split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) || <User className="w-8 h-8" />}
                        </div>
                      )}
                      <label 
                        htmlFor="avatar-upload" 
                        className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white text-xs font-bold"
                      >
                        <Camera className="w-5 h-5" />
                      </label>
                    </div>

                    <div className="flex flex-col items-center sm:items-start gap-2.5 text-center sm:text-left">
                      <span className="text-[1.1rem] font-bold text-foreground">Profile Picture</span>
                      <div className="flex items-center gap-2">
                        <label 
                          htmlFor="avatar-upload"
                          className="px-4 py-2 rounded-lg bg-accent border border-border text-foreground hover:bg-accent/80 transition-all font-bold text-xs cursor-pointer flex items-center gap-1.5 active:scale-[0.98]"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          Upload Photo
                        </label>
                        <input 
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        {promoterData.avatarUrl && (
                          <button
                            type="button"
                            onClick={handleRemoveAvatar}
                            className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all font-bold text-xs flex items-center gap-1.5 active:scale-[0.98]"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remove
                          </button>
                        )}
                      </div>
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

                    {/* Member Since */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Member since</label>
                      <div className="w-full bg-background border border-border rounded-xl px-5 py-4 text-muted/60 text-[1rem] opacity-70 font-medium">
                        {new Date(promoterData.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </div>
                    </div>
                  </div>

                  {/* Tier & Commission Structure Section */}
                  <div className="border-t border-border/40 pt-8 space-y-6">
                    <h3 className="text-lg font-bold text-foreground">Promoter Tier & Commissions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-950/40 border border-border/60 rounded-xl p-6">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs text-muted uppercase font-bold tracking-wider">Current Tier</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-extrabold text-foreground tracking-tight">{promoterData.tier || "STARTER"}</span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Active</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-muted uppercase font-bold tracking-wider">Commission Structure</span>
                        <div className="space-y-1 text-sm font-medium text-foreground">
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
                    <div className="flex gap-2">
                      <div className="relative flex-1 max-w-[220px] shrink-0">
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
                            <div className="absolute left-0 mt-1.5 w-[260px] bg-card border border-border rounded-xl shadow-2xl p-1 z-50 max-h-[300px] overflow-y-auto">
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
                        className="flex-1 bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner font-sans"
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
                                className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
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
                                  className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
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
                                  className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
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
                                  className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
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
                                    className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
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
                                className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
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
            <p className="text-muted text-[1rem] mt-1.5 font-normal">Share Plugd and earn ₹100 for every successful referral.</p>
          </div>

          {(!hasPromoter && !isAdmin) ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#16a34a]/10 flex items-center justify-center mb-6">
                <Gift className="w-10 h-10 text-[#16a34a]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Join Referral Program</h2>
              <p className="text-muted max-w-sm mb-8">Earn ₹100 from every sale by sharing Plugd with your audience. (Listing Profile = ₹199, Promoter Profile = ₹199, both = ₹398)</p>
              <button 
                onClick={() => setIsReferModalOpen(true)}
                className="bg-[#16a34a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#16a34a]/90 transition-all flex items-center gap-2 shadow-xl shadow-green-600/20"
              >
                Join for ₹199 <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Left Column: Link Copying and Post Ideas */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-pill border border-border rounded-[16px] p-6 md:p-8 shadow-2xl space-y-6">
                  {/* Referral Link */}
                  <div className="space-y-4">
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

                  {/* Source link generator */}
                  <div className="space-y-4 pt-4 border-t border-border/60">
                    <label className="text-[0.8rem] font-bold text-muted/60 block tracking-widest uppercase">Generate Source Link</label>
                    <div className="flex flex-wrap gap-2">
                      {["WhatsApp", "Telegram", "X", "Reddit", "Discord", "Instagram", "Facebook", "LinkedIn", "YouTube"].map(srcName => {
                        const srcId = srcName.toLowerCase();
                        const sourceLink = `https://theplugd.com?ref=${referralLinkSuffix}&src=${srcId}`;
                        const isCopied = copied === `link_${srcId}`;
                        return (
                          <button
                            key={srcId}
                            type="button"
                            onClick={() => copyToClipboard(sourceLink, `link_${srcId}`)}
                            className="bg-background border border-border hover:bg-accent text-foreground text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-all"
                          >
                            {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            <span>{srcName} Link</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Post Ideas */}
                <div className="bg-pill border border-border rounded-[16px] p-6 md:p-8 shadow-2xl space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center border border-border">
                      <Share2 className="w-4 h-4 text-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Post Ideas</h3>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                      <div className="bg-pill border border-border rounded-2xl p-6 space-y-4 flex flex-col justify-between bg-zinc-950/20">
                        <div className="space-y-4">
                          <p className="text-xs text-muted font-normal">
                            these are just post ideas to get you started, customize them, make it sound like you
                          </p>
                          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                            {[1, 2, 3].map((num, idx) => (
                              <button
                                key={num}
                                onClick={() => setSelectedVariation(idx)}
                                className={`px-3 py-1.5 rounded-lg text-[0.7rem] font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
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
                            <p className="text-sm text-muted font-medium leading-relaxed" style={{ whiteSpace: "pre-line" }}>
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

                      <div className="bg-pill border border-border rounded-2xl p-6 space-y-4 flex flex-col justify-between bg-zinc-950/20">
                        <div className="space-y-4">
                          <span className="text-[0.7rem] font-bold text-muted/60 block tracking-widest uppercase">YOUR REFERRAL LINK</span>
                          <div className="min-h-[80px] flex items-center">
                            <p className="text-sm text-muted font-medium break-all">
                              https://theplugd.com?ref={referralLinkSuffix}
                            </p>
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => copyToClipboard(`https://theplugd.com?ref=${referralLinkSuffix}`, 'referral')}
                          className="w-full bg-background text-foreground border border-border py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all active:scale-[0.98]"
                        >
                          {copied === 'referral' ? <Check className="w-4 h-4 text-green-500" /> : <><Copy className="w-4 h-4" /> Copy Link</>}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* How to hit ₹1,00,000 fast */}
                <div className="bg-pill border border-border rounded-[16px] p-6 md:p-8 shadow-2xl space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center border border-border">
                      <TrendingUp className="w-4 h-4 text-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">How to hit ₹1,00,000 fast</h3>
                  </div>

                  <div className="bg-zinc-950/20 border border-border rounded-2xl p-6 space-y-6">
                    <div className="space-y-4">
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
                          <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{idx + 1}</div>
                          <p className="text-sm text-muted font-medium leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Missions, Achievements, Traffic Sources clicks */}
              <div className="space-y-8">
                {/* Referral Missions */}
                <div className="bg-pill border border-border rounded-2xl p-6 shadow-xl space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-foreground">Referral Missions</h4>
                    <p className="text-xs text-muted mt-0.5">Complete these tasks to kickstart your earnings.</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Copy referral link", completed: copiedLinkMission },
                      { label: "Get 10 clicks", completed: (promoterData?.totalClicks || 0) >= 10, current: `${promoterData?.totalClicks || 0}/10` },
                      { label: "Get first signup", completed: (promoterData?.totalConversions || 0) >= 1 },
                      { label: "Earn first ₹100", completed: (promoterData?.totalEarned || 0) >= 100 }
                    ].map((mission, idx) => (
                      <div key={idx} className="flex items-center justify-between border border-border/40 bg-zinc-900/30 rounded-xl p-3.5 text-left">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            mission.completed 
                            ? "bg-[#16a34a] border-[#16a34a] text-black" 
                            : "border-border text-transparent"
                          }`}>
                            <Check size={14} className="stroke-[3]" />
                          </div>
                          <span className={`text-xs font-semibold ${mission.completed ? "text-muted line-through font-normal" : "text-foreground font-bold"}`}>
                            {mission.label}
                          </span>
                        </div>
                        {mission.current && !mission.completed && (
                          <span className="text-[10px] bg-accent border border-border px-2 py-0.5 rounded-full font-bold text-muted">
                            {mission.current}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements Badges */}
                <div className="bg-pill border border-border rounded-2xl p-6 shadow-xl space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-foreground">Achievements</h4>
                    <p className="text-xs text-muted mt-0.5">Unlock collectible promoter badges.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "First Click", emoji: "🏅", unlocked: (promoterData?.totalClicks || 0) > 0, desc: "Get 1 link click" },
                      { label: "First Signup", emoji: "🏅", unlocked: (promoterData?.totalConversions || 0) > 0, desc: "Get 1 signup" },
                      { label: "First ₹100", emoji: "🏅", unlocked: (promoterData?.totalEarned || 0) >= 100, desc: "Earn ₹100 total" },
                      { label: "First ₹1000", emoji: "🏅", unlocked: (promoterData?.totalEarned || 0) >= 1000, desc: "Earn ₹1,000 total" }
                    ].map((badge, idx) => (
                      <div 
                        key={idx}
                        className={`border rounded-xl p-3 flex flex-col items-center text-center transition-all ${
                          badge.unlocked 
                          ? "bg-green-950/15 border-green-500/35 text-white" 
                          : "bg-zinc-900/40 border-zinc-800/80 text-muted/40 opacity-40"
                        }`}
                      >
                        <span className={`text-2xl mb-1.5 ${badge.unlocked ? "animate-pulse" : ""}`}>{badge.emoji}</span>
                        <span className="text-xs font-bold block leading-none">{badge.label}</span>
                        <span className="text-[9px] text-muted mt-1 leading-tight">{badge.desc}</span>
                        {!badge.unlocked && <Lock size={10} className="mt-1.5 text-muted/30" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Traffic Sources list */}
                <div className="bg-pill border border-border rounded-2xl p-6 shadow-xl space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-foreground">Traffic Sources</h4>
                    <p className="text-xs text-muted mt-0.5">Clicks tracked from each share destination.</p>
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
                      { name: "Others", key: "others", color: "bg-zinc-500" }
                    ].map(source => {
                      const clicks = trafficSources.find(s => s.source.toLowerCase() === source.key)?.clicks || 0;
                      const totalClicks = trafficSources.reduce((acc, curr) => acc + curr.clicks, 0) || 1;
                      const percentage = Math.round((clicks / totalClicks) * 100);
                      return (
                        <div key={source.key} className="space-y-1.5 text-left">
                          <div className="flex justify-between items-center text-xs font-semibold">
                            <span className="text-foreground">{source.name}</span>
                            <span className="text-muted">{clicks} clicks</span>
                          </div>
                          <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
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
              <p className="text-muted max-w-sm mb-8">Join the referral program to start earning rewards. (Listing Profile = ₹199, Promoter Profile = ₹199, both = ₹398)</p>
              <button 
                onClick={() => setIsReferModalOpen(true)}
                className="bg-[#16a34a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#16a34a]/90 transition-all flex items-center gap-2 shadow-xl shadow-green-600/20"
              >
                Join for ₹199 <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
                  <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Total Earned</p>
                  <p className="text-4xl font-bold text-foreground">₹{promoterData?.totalEarned || 0}</p>
                </div>
                <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl border-[#16a34a]/20">
                  <p className="text-[#16a34a] text-[0.7rem] font-bold uppercase tracking-widest mb-2">Pending Payout</p>
                  <p className="text-4xl font-bold text-[#16a34a]">₹{promoterData?.pendingPayout || 0}</p>
                </div>
                <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
                  <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Total Clicks</p>
                  <p className="text-4xl font-bold text-foreground">{promoterData?.totalClicks || 0}</p>
                </div>
                <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
                  <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Conversions</p>
                  <p className="text-4xl font-bold text-foreground">{promoterData?.totalConversions || 0}</p>
                </div>
              </div>

              {/* Earnings Milestones and Funnel Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left side: Earnings Milestones */}
                <div className="lg:col-span-2 bg-pill border border-border rounded-2xl p-6 md:p-8 shadow-xl flex flex-col justify-between text-left">
                  <div>
                    <h4 className="text-lg font-bold text-foreground">Earnings Milestones</h4>
                    <p className="text-xs text-muted mt-0.5">Complete these earnings milestones to unlock exclusive promoter badges.</p>
                  </div>
                  
                  {/* Milestones list */}
                  <div className="space-y-4 mt-6">
                    {[
                      { value: 100, label: "Milestone 1", badge: "First Earner Badge", emoji: "🥉" },
                      { value: 1000, label: "Milestone 2", badge: "Bronze Earner Badge", emoji: "🥉" },
                      { value: 5000, label: "Milestone 3", badge: "Silver Earner Badge", emoji: "🥈" },
                      { value: 10000, label: "Milestone 4", badge: "Gold Earner Badge", emoji: "🥇" },
                      { value: 50000, label: "Milestone 5", badge: "Elite Earner Badge", emoji: "💎" },
                      { value: 100000, label: "Milestone 6", badge: "Legend Earner Badge", emoji: "💎" },
                      { value: 500000, label: "Milestone 7", badge: "Titan Earner Badge", emoji: "👑" },
                      { value: 1000000, label: "Milestone 8", badge: "Plugd Icon Badge", emoji: "👑" }
                    ].map((milestone, idx) => {
                      const totalEarned = promoterData?.totalEarned || 0;
                      const completed = totalEarned >= milestone.value;
                      
                      // Highlight the next uncompleted milestone
                      const isNextToUnlock = !completed && (idx === 0 || totalEarned >= [100, 1000, 5000, 10000, 50000, 100000, 500000, 1000000][idx - 1]);
                      
                      const progressPercent = Math.min(100, (totalEarned / milestone.value) * 100);

                      return (
                        <div 
                          key={idx} 
                          className={`border rounded-xl p-4 transition-all duration-300 ${
                            completed 
                            ? "bg-green-950/10 border-green-500/30 shadow-[0_0_12px_rgba(22,163,74,0.05)]" 
                            : isNextToUnlock 
                              ? "bg-zinc-900/50 border-[#16a34a] shadow-[0_0_15px_rgba(22,163,74,0.15)] ring-1 ring-[#16a34a]/30"
                              : "bg-zinc-950/25 border-border/40 opacity-50"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-2.5">
                              <span className="text-xl shrink-0">{milestone.emoji}</span>
                              <div>
                                <span className="text-xs text-muted/80 font-bold uppercase tracking-wider block leading-none">{milestone.label}</span>
                                <span className="text-sm font-extrabold text-foreground mt-1.5 block leading-none">{milestone.badge}</span>
                              </div>
                            </div>
                            <div className="text-left sm:text-right">
                              <span className={`text-sm font-bold ${completed ? "text-[#16a34a]" : "text-white"}`}>
                                ₹{new Intl.NumberFormat("en-IN").format(totalEarned)}
                              </span>
                              <span className="text-muted text-xs font-semibold"> / ₹{new Intl.NumberFormat("en-IN").format(milestone.value)}</span>
                            </div>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                completed 
                                ? "bg-emerald-500" 
                                : isNextToUnlock 
                                  ? "bg-[#16a34a] shadow-[0_0_6px_#16a34a]" 
                                  : "bg-muted/40"
                              }`}
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          
                          {/* Highlight Tag */}
                          {isNextToUnlock && (
                            <div className="mt-2 text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest animate-pulse">
                              ⚡ Next Target to Chase
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right side: Funnel */}
                <div className="space-y-6">
                  {/* Conversion Funnel Card */}
                  <div className="bg-pill border border-border rounded-2xl p-6 shadow-xl text-left">
                    <h4 className="text-base font-bold text-foreground mb-1">Conversion Funnel</h4>
                    <p className="text-xs text-muted mb-5">Your conversion flow at a glance.</p>
                    <div className="flex flex-col items-center gap-1.5">
                      {/* Clicks */}
                      <div className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex flex-col items-center text-center">
                        <span className="text-xl font-black text-white">{promoterData?.totalClicks || 0}</span>
                        <span className="text-[9px] text-muted font-bold uppercase tracking-wider mt-0.5">Clicks</span>
                      </div>
                      
                      <span className="text-muted/40 font-bold text-sm my-0.5">↓</span>
                      
                      {/* Signups */}
                      <div className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex flex-col items-center text-center">
                        <span className="text-xl font-black text-emerald-400">{promoterData?.totalConversions || 0}</span>
                        <span className="text-[9px] text-muted font-bold uppercase tracking-wider mt-0.5">Signups</span>
                      </div>
                      
                      <span className="text-muted/40 font-bold text-sm my-0.5">↓</span>
                      
                      {/* Earnings */}
                      <div className="w-full bg-green-950/15 border border-green-500/25 rounded-xl p-3 flex flex-col items-center text-center">
                        <span className="text-xl font-black text-[#16a34a]">₹{promoterData?.totalEarned || 0}</span>
                        <span className="text-[9px] text-emerald-400/80 font-bold uppercase tracking-wider mt-0.5">Earnings</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Earnings Over Time Chart Card */}
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
                                <div className="bg-pill border border-border px-3 py-2 rounded-xl shadow-xl font-['Georgia',_serif]">
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
                  <p className="text-muted max-w-sm mt-2 font-medium">Request a payout to your PayPal or Bank account. Minimum withdrawal is ₹5,000.</p>
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
                    className="bg-[#16a34a] hover:bg-[#16a34a]/90 text-white disabled:bg-white disabled:text-black disabled:opacity-50 disabled:grayscale px-12 py-4 rounded-xl font-bold transition-all shadow-xl active:scale-[0.98]"
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

      {/* Missions Section */}
      {activeSection === "missions" && (
        <div className="space-y-8">
          <div>
            <h1 className="text-[2.25rem] font-[700] text-foreground leading-tight tracking-tight">Missions</h1>
            <p className="text-muted text-[1rem] mt-1.5 font-normal">Complete promoter tasks, rank up, and earn XP badges.</p>
          </div>

          {(!hasPromoter && !isAdmin) ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#16a34a]/10 flex items-center justify-center mb-6">
                <Trophy className="w-10 h-10 text-[#16a34a]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Missions Locked</h2>
              <p className="text-muted max-w-sm mb-8">Join the referral program to start earning XP and rank up.</p>
              <button 
                onClick={() => setIsReferModalOpen(true)}
                className="bg-[#16a34a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#16a34a]/90 transition-all flex items-center gap-2 shadow-xl shadow-green-600/20"
              >
                Join for ₹199 <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-8 text-left">
              {/* Level progression board */}
              <div className="bg-pill border border-border rounded-2xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#16a34a] to-emerald-400 text-black flex flex-col items-center justify-center font-black shadow-lg relative border border-emerald-500/20 shrink-0">
                    <span className="text-[10px] uppercase tracking-wider opacity-85 leading-none">Level</span>
                    <span className="text-3xl leading-none mt-1">{currentLevel}</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-baseline gap-2">
                      <h4 className="text-lg font-extrabold text-foreground">Promoter Rank</h4>
                      <span className="text-xs text-[#16a34a] font-bold">({totalXp} XP Earned)</span>
                    </div>
                    <p className="text-xs text-muted font-medium text-left">
                      Level up every 1,000 XP. Keep completing missions to reach the next tier!
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-[#16a34a] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#16a34a]"
                          style={{ width: `${progressToNextLevel}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-muted shrink-0">{xpInCurrentLevel} / 1,000 XP</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                  <div className="bg-zinc-950/40 border border-border/60 rounded-xl p-4 text-center min-w-[120px]">
                    <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Completed</span>
                    <p className="text-2xl font-black text-foreground mt-1">
                      {completedClickMissionsCount + completedSignupMissionsCount + completedEarningsMissionsCount + completedDistributionCount + completedConsistencyMissionsCount}
                    </p>
                  </div>
                  <div className="bg-zinc-950/40 border border-border/60 rounded-xl p-4 text-center min-w-[120px]">
                    <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Active Missions</span>
                    <p className="text-2xl font-black text-[#16a34a] mt-1">
                      {(activeClickMission ? 1 : 0) + (activeSignupMission ? 1 : 0) + (activeEarningsMission ? 1 : 0) + (9 - completedDistributionCount > 0 ? 1 : 0) + (activeConsistencyMission ? 1 : 0)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Missions Lists */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
                {/* Left side: Activity category missions */}
                <div className="space-y-6">
                  {/* Click Missions */}
                  <div className="bg-pill border border-border rounded-2xl p-6 shadow-xl space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Zap size={16} className="text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-foreground">Click Missions</h4>
                        <p className="text-xs text-muted">Drive unique promoter clicks to your link</p>
                      </div>
                    </div>
                    {activeClickMission ? (
                      <div className="bg-zinc-900/40 border border-border/40 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-baseline text-xs font-semibold">
                          <span className="text-foreground">Level {activeClickMission.level}: Get {activeClickMission.target} clicks</span>
                          <span className="text-emerald-400">+{activeClickMission.xp} XP</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-[#16a34a] h-full rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, (clicks / activeClickMission.target) * 100)}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-muted shrink-0">{clicks} / {activeClickMission.target}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-green-950/10 border border-green-500/20 text-[#16a34a] rounded-xl p-4 text-xs font-bold text-center">
                        🎉 All Click Missions Completed! (Level 10 reached)
                      </div>
                    )}
                    {/* Collapsible/mini-list of Click missions */}
                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                      {clickMissions.map((m) => {
                        const isCompleted = clicks >= m.target;
                        return (
                          <div key={m.level} className="flex justify-between items-center text-xs py-1 border-b border-border/20 last:border-0">
                            <span className={isCompleted ? "text-muted line-through" : "text-foreground font-medium"}>
                              Level {m.level}: {m.target} clicks
                            </span>
                            <span className={`font-bold ${isCompleted ? "text-muted" : "text-emerald-400"}`}>
                              {isCompleted ? "✓ Completed" : `+${m.xp} XP`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Signup Missions */}
                  <div className="bg-pill border border-border rounded-2xl p-6 shadow-xl space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <User className="text-emerald-400" size={16} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-foreground">Signup Missions</h4>
                        <p className="text-xs text-muted">Convert unique click referrals into paid accounts</p>
                      </div>
                    </div>
                    {activeSignupMission ? (
                      <div className="bg-zinc-900/40 border border-border/40 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-baseline text-xs font-semibold">
                          <span className="text-foreground">Level {activeSignupMission.level}: Get {activeSignupMission.target} signups</span>
                          <span className="text-emerald-400">+{activeSignupMission.xp} XP</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-[#16a34a] h-full rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, (signups / activeSignupMission.target) * 100)}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-muted shrink-0">{signups} / {activeSignupMission.target}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-green-950/10 border border-green-500/20 text-[#16a34a] rounded-xl p-4 text-xs font-bold text-center">
                        🎉 All Signup Missions Completed! (Level 9 reached)
                      </div>
                    )}
                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                      {signupMissions.map((m) => {
                        const isCompleted = signups >= m.target;
                        return (
                          <div key={m.level} className="flex justify-between items-center text-xs py-1 border-b border-border/20 last:border-0">
                            <span className={isCompleted ? "text-muted line-through" : "text-foreground font-medium"}>
                              Level {m.level}: {m.target} signups
                            </span>
                            <span className={`font-bold ${isCompleted ? "text-muted" : "text-emerald-400"}`}>
                              {isCompleted ? "✓ Completed" : `+${m.xp} XP`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Earnings Missions */}
                  <div className="bg-pill border border-border rounded-2xl p-6 shadow-xl space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Wallet className="text-emerald-400" size={16} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-foreground">Earnings Missions</h4>
                        <p className="text-xs text-muted">Amass commissions from successful referrals</p>
                      </div>
                    </div>
                    {activeEarningsMission ? (
                      <div className="bg-zinc-900/40 border border-border/40 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-baseline text-xs font-semibold">
                          <span className="text-foreground">Level {activeEarningsMission.level}: Earn ₹{activeEarningsMission.target}</span>
                          <span className="text-emerald-400">+{activeEarningsMission.xp} XP</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-[#16a34a] h-full rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, (earnings / activeEarningsMission.target) * 100)}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-muted shrink-0">₹{earnings} / ₹{activeEarningsMission.target}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-green-950/10 border border-green-500/20 text-[#16a34a] rounded-xl p-4 text-xs font-bold text-center">
                        🎉 All Earnings Missions Completed! (Level 10 reached)
                      </div>
                    )}
                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                      {earningsMissions.map((m) => {
                        const isCompleted = earnings >= m.target;
                        return (
                          <div key={m.level} className="flex justify-between items-center text-xs py-1 border-b border-border/20 last:border-0">
                            <span className={isCompleted ? "text-muted line-through" : "text-foreground font-medium"}>
                              Level {m.level}: Earn ₹{m.target}
                            </span>
                            <span className={`font-bold ${isCompleted ? "text-muted" : "text-emerald-400"}`}>
                              {isCompleted ? "✓ Completed" : `+${m.xp} XP`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right side: Distribution and Streak consistency */}
                <div className="space-y-6">
                  {/* Distribution Platforms (9 share links) */}
                  <div className="bg-pill border border-border rounded-2xl p-6 shadow-xl space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Share2 className="text-emerald-400" size={16} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-foreground">Distribution Channels</h4>
                        <p className="text-xs text-muted">Generate & copy referral links for all 9 core sharing platforms</p>
                      </div>
                    </div>
                    <div className="bg-zinc-950/30 border border-border/60 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-muted uppercase">Progress</span>
                        <span className="text-xs font-bold text-[#16a34a]">{completedDistributionCount} / 9 Completed</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden mb-5">
                        <div 
                          className="bg-[#16a34a] h-full rounded-full transition-all duration-350"
                          style={{ width: `${(completedDistributionCount / 9) * 100}%` }}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[280px] overflow-y-auto pr-1">
                        {distributionPlatforms.map((platform) => {
                          const isCopied = !!copiedPlatforms[platform.id];
                          const sourceLink = `https://theplugd.com?ref=${referralLinkSuffix}&src=${platform.id}`;
                          const isJustCopied = copied === `link_${platform.id}`;
                          return (
                            <div key={platform.id} className="flex justify-between items-center bg-zinc-900/40 border border-border/30 rounded-xl p-2 px-3 text-xs text-left">
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                                  isCopied 
                                  ? "bg-[#16a34a] border-[#16a34a] text-black" 
                                  : "border-border text-transparent"
                                }`}>
                                  <Check size={11} className="stroke-[3]" />
                                </div>
                                <span className={isCopied ? "text-muted line-through font-normal" : "text-foreground font-bold"}>
                                  {platform.name} Link
                                </span>
                              </div>
                              
                              <button
                                type="button"
                                onClick={() => copyToClipboard(sourceLink, `link_${platform.id}`)}
                                className="bg-accent hover:bg-accent/80 border border-border hover:border-muted font-bold p-1 px-2.5 rounded-lg text-[10px] shrink-0 text-foreground transition-all flex items-center gap-1 cursor-pointer"
                              >
                                {isJustCopied ? <Check size={10} className="text-green-500" /> : <Copy size={10} />}
                                <span>{isJustCopied ? "Copied" : "Copy"}</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Consistency streak missions */}
                  <div className="bg-pill border border-border rounded-2xl p-6 shadow-xl space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Flame className="text-emerald-400" size={16} />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-foreground">Consistency Streaks</h4>
                        <p className="text-xs text-muted">Generate activity for consecutive days</p>
                      </div>
                    </div>
                    
                    <div className="bg-zinc-900/50 border border-border/40 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl text-orange-500 animate-pulse">🔥</span>
                        <div className="text-left">
                          <span className="text-xs text-muted uppercase font-bold block leading-none">Your Daily Active Streak</span>
                          <span className="text-2xl font-black text-foreground mt-1.5 block leading-none">{streakCount} Days</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-[#16a34a]/10 border border-[#16a34a]/30 px-3 py-1 rounded-full text-emerald-400 font-bold uppercase tracking-wider animate-pulse">
                        Active
                      </span>
                    </div>

                    {activeConsistencyMission ? (
                      <div className="bg-zinc-900/40 border border-border/40 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-baseline text-xs font-semibold">
                          <span className="text-foreground">Level {activeConsistencyMission.level}: Hit a {activeConsistencyMission.target} day streak</span>
                          <span className="text-emerald-400">+{activeConsistencyMission.xp} XP</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-[#16a34a] h-full rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, (streakCount / activeConsistencyMission.target) * 100)}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-muted shrink-0">{streakCount} / {activeConsistencyMission.target}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-green-950/10 border border-green-500/20 text-[#16a34a] rounded-xl p-4 text-xs font-bold text-center">
                        🎉 All Streak Missions Completed! (Level 5 reached)
                      </div>
                    )}
                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                      {consistencyMissions.map((m) => {
                        const isCompleted = streakCount >= m.target;
                        return (
                          <div key={m.level} className="flex justify-between items-center text-xs py-1 border-b border-border/20 last:border-0">
                            <span className={isCompleted ? "text-muted line-through" : "text-foreground font-medium"}>
                              Level {m.level}: {m.target} Day Streak
                            </span>
                            <span className={`font-bold ${isCompleted ? "text-muted" : "text-emerald-400"}`}>
                              {isCompleted ? "✓ Completed" : `+${m.xp} XP`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Achievements Section */}
      {activeSection === "achievements" && (
        <div className="space-y-8">
          <div>
            <h1 className="text-[2.25rem] font-[700] text-foreground leading-tight tracking-tight">Achievements</h1>
            <p className="text-muted text-[1rem] mt-1.5 font-normal">Collect visual promoter badge medallions as rewards.</p>
          </div>

          {(!hasPromoter && !isAdmin) ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#16a34a]/10 flex items-center justify-center mb-6">
                <Award className="w-10 h-10 text-[#16a34a]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Achievements Locked</h2>
              <p className="text-muted max-w-sm mb-8">Join the referral program to start unlocking promoter achievements.</p>
              <button 
                onClick={() => setIsReferModalOpen(true)}
                className="bg-[#16a34a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#16a34a]/90 transition-all flex items-center gap-2 shadow-xl shadow-green-600/20"
              >
                Join for ₹199 <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-12 text-left">
              {/* Summary stat board */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-pill border border-border p-6 rounded-2xl shadow-xl">
                <div>
                  <span className="text-xs text-muted uppercase font-bold tracking-wider">Unlocked</span>
                  <p className="text-3xl font-black text-foreground mt-1">
                    {achievements.filter(a => a.unlocked).length} / {achievements.length}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted uppercase font-bold tracking-wider">Completion Rate</span>
                  <p className="text-3xl font-black text-[#16a34a] mt-1">
                    {Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}%
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted uppercase font-bold tracking-wider">Mythic Badges</span>
                  <p className="text-3xl font-black text-red-500 mt-1">
                    {achievements.filter(a => a.unlocked && a.rarity === "Mythic").length} Unlocked
                  </p>
                </div>
                <div>
                  <span className="text-xs text-muted uppercase font-bold tracking-wider">Legendary Badges</span>
                  <p className="text-3xl font-black text-amber-500 mt-1">
                    {achievements.filter(a => a.unlocked && a.rarity === "Legendary").length} Unlocked
                  </p>
                </div>
              </div>

              {/* Medallions Categorized by Rarity */}
              {(["Common", "Rare", "Epic", "Legendary", "Mythic"] as const).map(rarity => {
                const rarityBadges = achievements.filter(a => a.rarity === rarity);
                const rarityColorsMap = {
                  Common: { text: "text-zinc-400", border: "border-zinc-500/20", bg: "bg-zinc-950/20", glow: "" },
                  Rare: { text: "text-teal-400", border: "border-teal-500/30", bg: "bg-teal-950/10", glow: "shadow-[0_0_12px_rgba(20,184,166,0.15)]" },
                  Epic: { text: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-950/10", glow: "shadow-[0_0_15px_rgba(168,85,247,0.15)]" },
                  Legendary: { text: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-950/10", glow: "shadow-[0_0_20px_rgba(245,158,11,0.2)]" },
                  Mythic: { text: "text-red-500 font-extrabold uppercase tracking-wide", border: "border-red-500/40", bg: "bg-red-950/15", glow: "shadow-[0_0_25px_rgba(239,68,68,0.25)]" }
                };
                const colorConfig = rarityColorsMap[rarity];
                
                return (
                  <div key={rarity} className="space-y-4">
                    <div className="flex items-center gap-2 pb-1 border-b border-border/40">
                      <h3 className={`text-base md:text-lg font-black ${colorConfig.text}`}>
                        {rarity} Achievements
                      </h3>
                      <span className="text-xs bg-accent px-2 py-0.5 border border-border rounded-full font-bold text-muted">
                        {rarityBadges.filter(a => a.unlocked).length} / {rarityBadges.length}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {rarityBadges.map((badge) => (
                        <div 
                          key={badge.id}
                          className={`relative border rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 ${
                            badge.unlocked 
                            ? `bg-gradient-to-br ${badge.badgeColor} border-opacity-70 ${colorConfig.glow}` 
                            : "bg-zinc-950/45 border-zinc-900/60 text-muted/30 opacity-40 grayscale"
                          }`}
                        >
                          <div className={`w-16 h-16 rounded-full bg-zinc-900/80 border flex items-center justify-center text-3xl mb-4 relative ${
                            badge.unlocked ? "border-[#16a34a]/30 shadow-md" : "border-border/40"
                          }`}>
                            {badge.emoji}
                            {!badge.unlocked && (
                              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                                <Lock size={14} className="text-muted/50" />
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-1">
                            <span className={`text-sm font-black block tracking-tight ${badge.unlocked ? "text-foreground" : "text-muted"}`}>
                              {badge.name}
                            </span>
                            <span className="text-[11px] text-muted leading-tight block">
                              {badge.desc}
                            </span>
                            <span className="text-[9px] font-bold text-[#16a34a] uppercase tracking-wider block mt-2.5">
                              {badge.unlocked ? "✓ Unlocked" : `Req: ${badge.requirement}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
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
