"use client";

import { useEffect, useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  LayoutDashboard,
  TrendingUp,
  ChevronDown,
  Check,
  Wallet,
  Users,
  Trophy,
  Coins,
  Share2,
  UserPlus,
  Award,
  Activity,
  Info
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReferralModal from "@/components/ReferralModal";

interface HomeClientProps {
  userEmail: string | null;
  referralCode?: string;
}

interface Earner {
  id: number;
  name: string;
  email?: string;
  handle: string;
  initials: string;
  gradient: string;
  baseEarnings: number;
  baseLastMonth: number;
  earningRatePerSec: number;
  baseGrowth: number;
  avatarUrl?: string | null;
  createdAt: string;
}

interface ActiveEarner extends Earner {
  currentEarnings: number;
  momGrowth: number;
}

const FIRST_NAMES = ["Alex", "Sarah", "Marcus", "Elena", "David", "Jessica", "Ryan", "Emily", "James", "Sophia", "Michael", "Olivia", "William", "Emma", "Daniel", "Isabella", "John", "Mia", "Robert", "Charlotte", "Joseph", "Amelia", "David", "Harper", "Andrew", "Evelyn", "Chris", "Abigail", "Matthew", "Emily", "Joshua", "Elizabeth", "Nathan", "Sofia", "Tyler", "Avery", "Brandon", "Ella", "Kevin", "Madison", "Justin", "Scarlett", "Brian", "Victoria", "Dylan", "Grace", "Ethan", "Chloe", "Connor", "Lily"];
const LAST_NAMES = ["Rivers", "Jenkins", "Chen", "Rostova", "Kim", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez"];
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


export default function HomeClient({ 
  userEmail: serverUserEmail,
  referralCode: initialReferralCode = ""
}: HomeClientProps) {
  const router = useRouter();
  
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(serverUserEmail);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [earners, setEarners] = useState<ActiveEarner[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [sliderVal, setSliderVal] = useState(2); // 10^2 = 100 referrals default

  const getLogValue = (val: number) => {
    const raw = Math.pow(10, val);
    if (raw <= 10) return Math.round(raw);
    if (raw <= 100) return Math.round(raw / 1) * 1;
    if (raw <= 1000) return Math.round(raw / 10) * 10;
    if (raw <= 10000) return Math.round(raw / 100) * 100;
    return Math.round(raw / 1000) * 1000;
  };

  const sliderReferrals = getLogValue(sliderVal);
  const [activities, setActivities] = useState([
    { id: 1, text: "Someone earned ₹500", timeAgo: "2 minutes ago", badge: "Max" },
    { id: 2, text: "Someone joined Pro", timeAgo: "5 minutes ago", badge: "Signup" },
    { id: 3, text: "Someone earned ₹250", timeAgo: "12 minutes ago", badge: "Pro" },
    { id: 4, text: "Someone upgraded to Max", timeAgo: "18 minutes ago", badge: "Upgrade" },
    { id: 5, text: "Someone joined Starter", timeAgo: "24 minutes ago", badge: "Signup" }
  ]);

  // Filters State
  const [timeframe, setTimeframe] = useState<"All time" | "Last 30 days">("All time");
  const [timeframeOpen, setTimeframeOpen] = useState(false);

  // Memoized processed earners based on filters
  const processedEarners = useMemo(() => {
    const mapped = earners.map((e) => {
      const signupDate = e.createdAt ? new Date(e.createdAt) : new Date();
      const actualDays = Math.max(0.1, (Date.now() - signupDate.getTime()) / (1000 * 60 * 60 * 24));
      
      const dailyRate = e.earningRatePerSec * 86400;
      const seededDaysActive = 45 + ((e.id * 17) % 45);
      const virtualDays = e.baseEarnings > 100000 && dailyRate > 0 ? Math.max(seededDaysActive, e.baseEarnings / dailyRate) : 0;
      
      const daysActive = Math.max(1, actualDays, virtualDays);
      const avgEarningsPerDay = e.currentEarnings / daysActive;
      
      const earningsLast30 = avgEarningsPerDay * Math.min(30, daysActive);
      const growthAllTime = e.momGrowth;
      
      let growthLast30 = 15.0;
      if (growthAllTime < 0) {
        growthLast30 = growthAllTime * (0.9 + ((e.id * 13) % 3) / 10);
      } else {
        const base30DaysAgo = e.currentEarnings - earningsLast30;
        growthLast30 = base30DaysAgo > 10 ? (earningsLast30 / base30DaysAgo) * 100 : 15.0;
      }
      
      return {
        ...e,
        earningsLast30,
        growthAllTime,
        growthLast30,
      };
    });

    return [...mapped].sort((a, b) => {
      if (timeframe === "All time") {
        return b.currentEarnings - a.currentEarnings;
      } else {
        return b.earningsLast30 - a.earningsLast30;
      }
    });
  }, [earners, timeframe]);

  useEffect(() => {
    async function loadTopEarners() {
      try {
        const res = await fetch("/api/top-earners");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.promoters) {
            // Load from localStorage if present
            let storedData: Record<string, number> = {};
            try {
              const stored = localStorage.getItem("plugd_leaderboard_earnings_v2");
              if (stored) {
                storedData = JSON.parse(stored);
              }
            } catch (err) {
              console.error("Failed to parse stored earnings:", err);
            }

            // Map promoters to ActiveEarner
            const mappedEarners = data.promoters.map((p: any, index: number) => {
              const isDisplayPromoter = p.email?.toLowerCase().endsWith("@example.com");
              const handle = p.username ? `@${p.username}` : `@${p.name.toLowerCase().replace(/[^a-z0-9_]/g, "_")}`;
              const initials = p.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
              const gradient = GRADIENTS[p.id % GRADIENTS.length];

              if (!isDisplayPromoter) {
                return {
                  id: p.id,
                  name: p.name,
                  email: p.email,
                  handle,
                  initials,
                  gradient,
                  baseEarnings: p.totalEarned,
                  baseLastMonth: p.totalEarned,
                  earningRatePerSec: 0,
                  baseGrowth: 0,
                  currentEarnings: p.totalEarned,
                  momGrowth: 0,
                  avatarUrl: p.avatarUrl,
                  createdAt: p.createdAt
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

              // Deterministic growth rate based on rank and slowly varying daily offset
              const dayOfYear = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
              const dailyOffset = Math.sin((dayOfYear + rank * 3) * 2 * Math.PI / 10) * 1.5;
              const baseGrowthVal = 8 + ((rank * 73) % 28) + dailyOffset; // 8% to 35% base, with daily shift
              const isNegative = rank > 10 && (rank % 12 === 0 || rank % 19 === 0);
              const initialGrowth = isNegative ? -baseGrowthVal / 4 : baseGrowthVal;
              const baseLastMonth = p.totalEarned / (1 + initialGrowth / 100);

              const storedVal = storedData[p.id.toString()];
              const cleanStoredVal = storedVal ? Math.round(storedVal / 100) * 100 : null;
              const finalEarnings = cleanStoredVal ? Math.max(cleanStoredVal, Math.round(p.totalEarned / 100) * 100) : Math.round(p.totalEarned / 100) * 100;
              const momGrowth = ((finalEarnings - baseLastMonth) / baseLastMonth) * 100;

              return {
                id: p.id,
                name: p.name,
                email: p.email,
                handle,
                initials,
                gradient,
                baseEarnings: p.totalEarned,
                baseLastMonth,
                earningRatePerSec,
                baseGrowth: 15.0,
                currentEarnings: finalEarnings,
                momGrowth,
                avatarUrl: p.avatarUrl,
                createdAt: p.createdAt
              };
            });

            // Sort by currentEarnings descending
            const sortedEarners = [...mappedEarners].sort((a, b) => b.currentEarnings - a.currentEarnings);
            setEarners(sortedEarners);

            // Save initial values to localStorage
            const dataToStore: Record<string, number> = {};
            sortedEarners.forEach(e => {
              const isDisplayPromoter = e.email?.toLowerCase().endsWith("@example.com");
              if (isDisplayPromoter) {
                dataToStore[e.id.toString()] = e.currentEarnings;
              }
            });
            try {
              localStorage.setItem("plugd_leaderboard_earnings_v2", JSON.stringify(dataToStore));
            } catch (err) {}
          }
        }
      } catch (err) {
        console.error("Failed to load top earners:", err);
      }
    }

    loadTopEarners();

    // Live update interval
    const interval = setInterval(() => {
      setEarners(prev => {
        const nextList = prev.map(e => {
          if (!e.earningRatePerSec) return e;
          const expectedReferralsPerMin = e.earningRatePerSec * 0.6;
          const numReferrals = Math.floor(expectedReferralsPerMin) + (Math.random() < (expectedReferralsPerMin % 1) ? 1 : 0);
          const increment = numReferrals * 100;
          const nextEarnings = e.currentEarnings + increment;
          const nextMomGrowth = ((nextEarnings - e.baseLastMonth) / e.baseLastMonth) * 100;
          return {
            ...e,
            currentEarnings: nextEarnings,
            momGrowth: nextMomGrowth
          };
        });
        
        const sorted = [...nextList].sort((a, b) => b.currentEarnings - a.currentEarnings);
        
        // Save to localStorage
        const storeData: Record<string, number> = {};
        sorted.forEach(e => {
          const isDisplayPromoter = e.email?.toLowerCase().endsWith("@example.com");
          if (isDisplayPromoter) {
            storeData[e.id.toString()] = e.currentEarnings;
          }
        });
        try {
          localStorage.setItem("plugd_leaderboard_earnings_v2", JSON.stringify(storeData));
        } catch (err) {}

        return sorted;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const activityTypes = [
      { text: "Someone earned ₹500", badge: "Max" },
      { text: "Someone joined Pro", badge: "Signup" },
      { text: "Someone earned ₹250", badge: "Pro" },
      { text: "Someone upgraded to Max", badge: "Upgrade" },
      { text: "Someone joined Starter", badge: "Signup" },
      { text: "Someone earned ₹100", badge: "Starter" },
      { text: "Someone joined Max", badge: "Signup" }
    ];

    const interval = setInterval(() => {
      const randomActivity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      setActivities(prev => {
        const nextId = prev.length ? Math.max(...prev.map(a => a.id)) + 1 : 1;
        const newEvent = {
          id: nextId,
          text: randomActivity.text,
          timeAgo: "Just now",
          badge: randomActivity.badge
        };
        const updatedPrev = prev.map(act => {
          if (act.timeAgo === "Just now") return { ...act, timeAgo: "1 minute ago" };
          const minMatch = act.timeAgo.match(/^(\d+) minute/);
          if (minMatch) {
            const nextMin = parseInt(minMatch[1]) + 1;
            return { ...act, timeAgo: `${nextMin} minutes ago` };
          }
          return act;
        });
        return [newEvent, ...updatedPrev].slice(0, 5);
      });
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auth Check
    async function checkAuth() {
      try {
        const meRes = await fetch("/api/auth/me");
        if (meRes.ok) {
          const userData = await meRes.json();
          setUserEmail(userData.email);
          setIsPaidUser(userData.hasPromoter);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      }
    }
    checkAuth();
  }, []);

  const handleJoinReferral = () => {
    setIsReferModalOpen(false);
    router.push("/vault?tab=referrals");
  };

  const handleStartEarning = async () => {
    // If we already know they are a paid member, redirect instantly
    if (userEmail && isPaidUser) {
      router.push("/vault");
      return;
    }

    // Otherwise, do a live fetch to guarantee fresh confirmed auth state
    try {
      const meRes = await fetch("/api/auth/me");
      if (meRes.ok) {
        const userData = await meRes.json();
        setUserEmail(userData.email);
        setIsPaidUser(userData.hasPromoter);
        
        if (userData.email && userData.hasPromoter) {
          router.push("/vault");
          return;
        }
      }
    } catch (err) {
      console.error("Auth check failed in click handler:", err);
    }

    setIsReferModalOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col items-center w-full max-w-full overflow-x-hidden">
      <div className="w-full relative flex flex-col items-center pt-2 pb-4">

        <div className="w-full max-w-5xl mx-auto px-4 md:px-8 relative z-[60] flex flex-col items-center">
          <div className="max-w-[800px] w-full">
            <Header />

            <section className="mb-0">
              <div className="flex flex-row gap-4 mb-6 items-center justify-center">
                 <button
                  onClick={handleStartEarning}
                  suppressHydrationWarning
                  className="bg-[#16a34a] border border-[#16a34a] text-black dark:text-white flex items-center justify-center gap-2 transition-all hover:bg-[#16a34a]/90 active:scale-[0.98] shadow-lg cursor-pointer"
                  style={{ 
                    fontFamily: 'var(--font-eb-garamond), serif', 
                    padding: '0.6rem 1.75rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: '8px'
                  }}
                >
                  Start Earning
                </button>
                <Link
                  href="/vault"
                  className="bg-selected border border-selected text-selected-foreground flex items-center justify-center gap-2 transition-all hover:bg-selected/90 active:scale-[0.98] shadow-lg cursor-pointer"
                  style={{ 
                    fontFamily: 'var(--font-eb-garamond), serif', 
                    padding: '0.6rem 1.75rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: '8px'
                  }}
                >
                  Vault
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* SECTION 2: PLATFORM STATS */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 mb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Paid Out */}
          <div className="bg-pill border border-border/80 rounded-2xl p-6 flex items-center gap-5 shadow-xl hover:border-border transition-all duration-300">
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-emerald-400">
              <Wallet className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted font-bold uppercase tracking-[0.1em] leading-none font-sans">
                Total Paid Out
              </span>
              <span className="text-2xl md:text-3xl font-[900] tracking-tighter text-white font-sans mt-2 rich-number">
                ₹100Cr+
              </span>
            </div>
          </div>

          {/* Promoters */}
          <div className="bg-pill border border-border/80 rounded-2xl p-6 flex items-center gap-5 shadow-xl hover:border-border transition-all duration-300">
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-emerald-400">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted font-bold uppercase tracking-[0.1em] leading-none font-sans">
                Promoters
              </span>
              <span className="text-2xl md:text-3xl font-[900] tracking-tighter text-white font-sans mt-2 rich-number">
                1,00,000+
              </span>
            </div>
          </div>

          {/* Top Earner */}
          <div className="bg-pill border border-border/80 rounded-2xl p-6 flex items-center gap-5 shadow-xl hover:border-border transition-all duration-300">
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-emerald-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted font-bold uppercase tracking-[0.1em] leading-none font-sans">
                Top Earner
              </span>
              <span className="text-2xl md:text-3xl font-[900] tracking-tighter text-white font-sans mt-2 rich-number">
                ₹1Cr+
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EARNINGS CALCULATOR */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 mb-16 relative z-10">
        <div className="bg-pill border border-border rounded-[24px] p-6 sm:p-8 md:p-10 shadow-xl flex flex-col items-center">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-3" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              Calculate Your Earnings
            </h2>
            <p className="text-muted text-sm md:text-base font-medium" style={{ fontFamily: '"EB Garamond", serif' }}>
              See how much you could earn by sharing your referral link.
            </p>
          </div>

          <div className="w-full max-w-3xl flex flex-col items-center gap-8">
            {/* Slider Widget */}
            <div className="w-full flex flex-col items-center gap-4 bg-zinc-950/40 border border-border/60 rounded-2xl p-6">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl md:text-5xl font-black text-white font-sans tracking-tight rich-number">
                  {new Intl.NumberFormat("en-IN").format(sliderReferrals)}
                </span>
                <span className="text-muted text-sm font-semibold uppercase tracking-wider font-sans">Referrals</span>
              </div>

              <input
                type="range"
                min="0"
                max="5"
                step="0.01"
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#16a34a]"
                style={{
                  background: `linear-gradient(to right, #16a34a 0%, #16a34a ${(sliderVal / 5) * 100}%, #27272a ${(sliderVal / 5) * 100}%, #27272a 100%)`
                }}
              />
              <div className="relative w-full h-4 text-[10px] sm:text-xs text-muted/60 font-semibold font-sans mt-1">
                <span className="absolute left-0">1</span>
                <span className="absolute left-[20%] -translate-x-1/2">10</span>
                <span className="absolute left-[40%] -translate-x-1/2">100</span>
                <span className="absolute left-[60%] -translate-x-1/2">1,000</span>
                <span className="absolute left-[80%] -translate-x-1/2">10,000</span>
                <span className="absolute right-0">1,00,000</span>
              </div>
            </div>

            {/* Live Earnings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {/* Starter */}
              <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 flex flex-col items-center text-center shadow-lg hover:border-[#16a34a]/30 transition-all duration-300 group">
                <span className="text-xs text-muted font-bold uppercase tracking-widest font-sans mb-1">Starter</span>
                <span className="text-xs text-muted/60 font-medium font-sans mb-3">₹100 per referral</span>
                <span className="text-xs text-muted/50 font-semibold font-sans mb-0.5">Up to</span>
                <span className="text-3xl font-extrabold text-[#16a34a] font-sans tracking-tight rich-number group-hover:scale-105 transition-transform">
                  ₹{new Intl.NumberFormat("en-IN").format(sliderReferrals * 100)}
                </span>
              </div>

              {/* Pro */}
              <div className="bg-zinc-900/40 border border-[#16a34a]/40 shadow-[0_0_20px_rgba(22,163,74,0.05)] rounded-2xl p-5 flex flex-col items-center text-center shadow-lg hover:border-[#16a34a]/80 transition-all duration-300 group relative">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#16a34a] text-white text-[9px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
                  Most Popular
                </div>
                <span className="text-xs text-white font-bold uppercase tracking-widest font-sans mb-1 mt-1">Pro</span>
                <span className="text-xs text-muted/60 font-medium font-sans mb-3">₹250 per referral</span>
                <span className="text-xs text-muted/50 font-semibold font-sans mb-0.5">Up to</span>
                <span className="text-3xl font-extrabold text-[#16a34a] font-sans tracking-tight rich-number group-hover:scale-105 transition-transform">
                  ₹{new Intl.NumberFormat("en-IN").format(sliderReferrals * 250)}
                </span>
              </div>

              {/* Max */}
              <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 flex flex-col items-center text-center shadow-lg hover:border-[#16a34a]/30 transition-all duration-300 group relative">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[9px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
                  Highest Yield
                </div>
                <span className="text-xs text-muted font-bold uppercase tracking-widest font-sans mb-1 mt-1">Max</span>
                <span className="text-xs text-muted/60 font-medium font-sans mb-3">₹500 per referral</span>
                <span className="text-xs text-muted/50 font-semibold font-sans mb-0.5">Up to</span>
                <span className="text-3xl font-extrabold text-amber-500 font-sans tracking-tight rich-number group-hover:scale-105 transition-transform">
                  ₹{new Intl.NumberFormat("en-IN").format(sliderReferrals * 500)}
                </span>
              </div>
            </div>

            {/* Note */}
            <div className="flex items-center gap-1.5 text-xs text-muted/50 font-medium font-sans select-none mt-1">
              <Info className="w-3.5 h-3.5 flex-shrink-0 text-muted/40" />
              <span>Based on referral purchase type. Actual earnings depend on which plan your referrals purchase.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 mb-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-3" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
            How Plugd Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Join */}
          <div className="bg-pill border border-border/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:border-border transition-all">
            <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 text-[#16a34a] flex items-center justify-center mb-4">
              <UserPlus className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: '"Times New Roman", Times, serif' }}>1. Join</h3>
            <p className="text-sm text-muted/80 leading-relaxed font-sans max-w-[280px]">
              Choose a promoter plan and receive your unique referral link.
            </p>
          </div>

          {/* Card 2: Share */}
          <div className="bg-pill border border-border/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:border-border transition-all">
            <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 text-[#16a34a] flex items-center justify-center mb-4">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: '"Times New Roman", Times, serif' }}>2. Share</h3>
            <p className="text-sm text-muted/80 leading-relaxed font-sans max-w-[280px]">
              Share your link across WhatsApp, Instagram, X, Reddit, Discord, Telegram, communities, and groups.
            </p>
          </div>

          {/* Card 3: Earn */}
          <div className="bg-pill border border-border/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:border-border transition-all">
            <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 text-[#16a34a] flex items-center justify-center mb-4">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: '"Times New Roman", Times, serif' }}>3. Earn</h3>
            <p className="text-sm text-muted/80 leading-relaxed font-sans max-w-[280px]">
              Receive commissions every time someone joins through your referral link.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY PLUGD EXISTS */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 mb-16 relative z-10">
        <div className="bg-pill border border-border rounded-[24px] p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-[#16a34a]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              Distribution Has Value
            </h2>
            <div className="h-[2px] w-16 bg-[#16a34a] mb-2" />
            <p className="text-muted text-sm md:text-base leading-relaxed max-w-xl font-sans">
              Creators have audiences. Students have networks. Communities have attention.
            </p>
            <p className="text-white text-base md:text-lg font-bold leading-relaxed max-w-xl" style={{ fontFamily: '"EB Garamond", serif' }}>
              Plugd lets anyone monetize distribution. If you can bring attention, you can earn.
            </p>
          </div>
          
          <div className="flex-shrink-0 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-6 text-center shadow-lg min-w-[240px] md:min-w-[280px] self-stretch flex flex-col justify-center">
            <span className="text-[10px] text-muted font-bold uppercase tracking-[0.15em] mb-1 font-sans">Distribution Monetization</span>
            <span className="text-3xl font-extrabold text-[#16a34a] font-sans rich-number">100% Direct</span>
            <span className="text-xs text-muted/60 mt-1 font-sans">No middleman fees</span>
          </div>
        </div>
      </section>

      {/* SECTION 6: LIVE ACTIVITY FEED */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 mb-16 relative z-10">
        <div className="bg-pill border border-border rounded-[24px] p-6 sm:p-8 md:p-10 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="flex h-3.5 w-3.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              Recent Activity
            </h2>
          </div>

          <div className="space-y-4">
            {activities.map((act) => (
              <div 
                key={act.id} 
                className="flex items-center justify-between p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-xl shadow-sm hover:border-zinc-805 transition-all duration-300 animate-in fade-in duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full ${
                    act.badge === "Max" || act.badge === "Upgrade" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                    act.badge === "Pro" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                    "bg-[#16a34a]/10 text-[#16a34a] border border-[#16a34a]/20"
                  }`}>
                    {act.badge}
                  </div>
                  <span className="text-sm font-bold text-white leading-none font-sans">
                    {act.text}
                  </span>
                </div>
                <span className="text-xs text-muted font-semibold font-sans">
                  {act.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: ACHIEVEMENTS */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 mb-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-3" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
            Unlock Milestones
          </h2>
          <p className="text-muted text-sm font-medium" style={{ fontFamily: '"EB Garamond", serif' }}>
            Unlock exclusive collector milestones as your network expands.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Badge 1: First Referral */}
          <div className="bg-pill border border-border/60 hover:border-border rounded-2xl p-6 flex flex-col items-center text-center shadow-lg transition-all duration-300 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-16 h-16 rounded-full bg-amber-900/20 border-2 border-amber-600/40 text-amber-500 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(217,119,6,0.1)] group-hover:scale-110 transition-transform duration-300">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: '"Times New Roman", Times, serif' }}>First Referral</h3>
            <span className="text-[10px] text-muted/80 font-semibold font-sans">Beginner Status</span>
          </div>

          {/* Badge 2: ₹1,000 Club */}
          <div className="bg-pill border border-border/60 hover:border-border rounded-2xl p-6 flex flex-col items-center text-center shadow-lg transition-all duration-300 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-700/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-16 h-16 rounded-full bg-slate-800/40 border-2 border-slate-500/40 text-slate-300 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(148,163,184,0.1)] group-hover:scale-110 transition-transform duration-300">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: '"Times New Roman", Times, serif' }}>₹1,000 Club</h3>
            <span className="text-[10px] text-muted/80 font-semibold font-sans">Silver Tier</span>
          </div>

          {/* Badge 3: ₹10,000 Club */}
          <div className="bg-pill border border-border/60 hover:border-border rounded-2xl p-6 flex flex-col items-center text-center shadow-lg transition-all duration-300 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-16 h-16 rounded-full bg-yellow-950/20 border-2 border-yellow-500/40 text-yellow-400 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(234,179,8,0.15)] group-hover:scale-110 transition-transform duration-300">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: '"Times New Roman", Times, serif' }}>₹10,000 Club</h3>
            <span className="text-[10px] text-muted/80 font-semibold font-sans">Gold Badge</span>
          </div>

          {/* Badge 4: ₹1 Lakh Club */}
          <div className="bg-pill border border-border/60 hover:border-border rounded-2xl p-6 flex flex-col items-center text-center shadow-lg transition-all duration-300 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-16 h-16 rounded-full bg-emerald-950/20 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:scale-110 transition-transform duration-300">
              <Coins className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: '"Times New Roman", Times, serif' }}>₹1 Lakh Club</h3>
            <span className="text-[10px] text-muted/80 font-semibold font-sans">Emerald Collector</span>
          </div>

          {/* Badge 5: Top 1% */}
          <div className="bg-pill border border-border/60 hover:border-border rounded-2xl p-6 flex flex-col items-center text-center shadow-lg transition-all duration-300 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-16 h-16 rounded-full bg-purple-950/20 border-2 border-purple-500/40 text-purple-400 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(168,85,247,0.15)] group-hover:scale-110 transition-transform duration-300">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Top 1%</h3>
            <span className="text-[10px] text-muted/80 font-semibold font-sans">Platinum Status</span>
          </div>

          {/* Badge 6: Top 100 Promoters */}
          <div className="bg-pill border border-border/60 hover:border-border rounded-2xl p-6 flex flex-col items-center text-center shadow-lg transition-all duration-300 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-16 h-16 rounded-full bg-cyan-950/20 border-2 border-cyan-500/40 text-cyan-400 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:scale-110 transition-transform duration-300">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Top 100 Promoters</h3>
            <span className="text-[10px] text-muted/80 font-semibold font-sans">Diamond Badge</span>
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 mb-16 relative z-10">
        <div className="bg-pill border border-border rounded-[24px] p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/[0.03] to-transparent pointer-events-none" />
          
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-3" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
            Start Earning Today
          </h2>
          <p className="text-muted text-sm md:text-base font-medium mb-8 max-w-lg mx-auto" style={{ fontFamily: '"EB Garamond", serif' }}>
            Turn your network into income.
          </p>

          <div className="flex flex-row gap-4 items-center justify-center">
            <button
              onClick={handleStartEarning}
              className="bg-[#16a34a] border border-[#16a34a] text-black dark:text-white flex items-center justify-center gap-2 transition-all hover:bg-[#16a34a]/90 active:scale-[0.98] shadow-lg cursor-pointer"
              style={{ 
                fontFamily: 'var(--font-eb-garamond), serif', 
                padding: '0.6rem 2.25rem',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '8px'
              }}
            >
              Start Earning
            </button>
            <Link
              href="/vault"
              className="bg-selected border border-selected text-selected-foreground flex items-center justify-center gap-2 transition-all hover:bg-selected/90 active:scale-[0.98] shadow-lg cursor-pointer"
              style={{ 
                fontFamily: 'var(--font-eb-garamond), serif', 
                padding: '0.6rem 2.25rem',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '8px'
              }}
            >
              Vault
            </Link>
          </div>
        </div>
      </section>

      <div className="w-full mt-16">
        <Footer 
          showBorder={false} 
          minimal={true} 
          onStartEarning={handleStartEarning} 
        />
      </div>

      <ReferralModal 
        isOpen={isReferModalOpen} 
        onClose={() => setIsReferModalOpen(false)} 
        userEmail={userEmail} 
        referralCode={initialReferralCode}
      />
    </main>
  );
}
