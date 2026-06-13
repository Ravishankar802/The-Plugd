"use client";

import { useEffect, useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  LayoutDashboard,
  TrendingUp,
  ChevronDown,
  Check
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
      const virtualDays = e.baseEarnings > 1000 && dailyRate > 0 ? Math.max(seededDaysActive, e.baseEarnings / dailyRate) : 0;
      
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
                dailyRate = 1200;
              } else {
                dailyRate = 300 + 600 * Math.pow(factor, 2.0);
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
              const finalEarnings = storedVal ? Math.max(storedVal, p.totalEarned) : p.totalEarned;
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
          const hasEarned = Math.random() > 0.3; 
          const multiplier = hasEarned ? (0.5 + Math.random() * 1.5) : 0;
          const increment = 60 * e.earningRatePerSec * multiplier;
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

      {/* Top Earners Leaderboard Section */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 mb-10">
        <div className="bg-pill border border-border rounded-[24px] p-4 sm:p-6 md:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Top Earners</h2>
            </div>
            
            <div className="flex items-center gap-3 z-30">
              {/* Timeframe Dropdown */}
              <div className="relative">
                <button 
                  type="button"
                  onClick={() => {
                    setTimeframeOpen(!timeframeOpen);
                  }}
                  className="flex items-center justify-between gap-2 px-4 py-2 bg-accent border border-border text-foreground rounded-lg text-sm font-semibold focus:outline-none transition-all min-w-[135px] shadow-sm select-none cursor-pointer hover:bg-accent/80"
                >
                  <span>{timeframe === "All time" ? "All time" : "Last 30 days"}</span>
                  <ChevronDown size={16} className={`text-muted transition-transform duration-200 ${timeframeOpen ? "rotate-180" : ""}`} />
                </button>
                
                {timeframeOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setTimeframeOpen(false)} />
                    <div className="absolute right-0 mt-1.5 w-[160px] bg-card border border-border rounded-xl shadow-2xl p-1 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                      <button
                        type="button"
                        onClick={() => {
                          setTimeframe("All time");
                          setTimeframeOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left text-sm font-bold transition-colors ${
                          timeframe === "All time" 
                          ? "bg-white/10 text-foreground" 
                          : "text-foreground hover:bg-accent"
                        }`}
                      >
                        <span>All time</span>
                        {timeframe === "All time" && <Check size={12} className="text-foreground shrink-0" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTimeframe("Last 30 days");
                          setTimeframeOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left text-sm font-bold transition-colors ${
                          timeframe === "Last 30 days" 
                          ? "bg-white/10 text-foreground" 
                          : "text-foreground hover:bg-accent"
                        }`}
                      >
                        <span>Last 30 days</span>
                        {timeframe === "Last 30 days" && <Check size={12} className="text-foreground shrink-0" />}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar w-full">
            <table className="w-full min-w-[380px] md:min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="pb-3 pt-1 w-8 md:w-10 text-[0.65rem] font-bold text-muted uppercase tracking-widest text-center">#</th>
                  <th className="pb-3 pt-1 md:w-[60%] text-[0.65rem] font-bold text-muted uppercase tracking-widest pl-1 md:pl-2">Promoter</th>
                  <th className="pb-3 pt-1 md:w-[20%] text-[0.65rem] font-bold text-muted uppercase tracking-widest text-right md:text-left whitespace-nowrap md:pl-6">EARNINGS</th>
                  <th className="pb-3 pt-1 md:w-[20%] text-[0.65rem] font-bold text-muted tracking-widest text-right whitespace-nowrap pl-2 md:pl-4 uppercase">
                    {timeframe === "All time" ? "MoM GROWTH" : "30-Day Growth"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {processedEarners.slice(0, visibleCount).map((earner, index) => {
                  const rank = index + 1;
                  
                  // Column 3 display calculation (Earnings)
                  const earningsVal = timeframe === "All time" ? earner.currentEarnings : earner.earningsLast30;
                  const col3Display = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0
                  }).format(earningsVal);

                  // Column 4 display calculation (Growth)
                  const growthVal = timeframe === "All time" ? earner.growthAllTime : earner.growthLast30;
                  const isZero = Math.abs(growthVal) < 0.005;
                  const growthText = isZero ? "—" : `${growthVal > 0 ? "↑" : "↓"} ${Math.abs(growthVal).toFixed(2)}%`;
                  const growthColor = isZero ? "text-muted/60 bg-muted/10" : growthVal > 0 ? "text-emerald-500 bg-emerald-500/10" : "text-red-500 bg-red-500/10";
                  const col4Display = (
                    <span className={`${growthColor} font-bold text-[10px] md:text-xs px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-md`}>
                      {growthText}
                    </span>
                  );

                  let rankDisplay: React.ReactNode = rank;
                  if (rank === 1) rankDisplay = <span className="text-base md:text-lg">🥇</span>;
                  else if (rank === 2) rankDisplay = <span className="text-base md:text-lg">🥈</span>;
                  else if (rank === 3) rankDisplay = <span className="text-base md:text-lg">🥉</span>;

                  return (
                    <tr 
                      key={earner.id} 
                      onClick={() => router.push(`/p/${earner.handle.substring(1)}`)}
                      className="hover:bg-foreground/[0.02] transition-colors group animate-in fade-in duration-300 cursor-pointer"
                    >
                      <td className="py-3 text-center w-8 md:w-10 font-bold text-muted text-xs md:text-sm">
                        {rankDisplay}
                      </td>
                      <td className="py-3 pl-1 md:pl-2 md:w-[60%]">
                        <div className="flex items-center gap-2 md:gap-3">
                          {earner.avatarUrl ? (
                            <img 
                              src={earner.avatarUrl} 
                              alt={earner.name}
                              className="w-8 h-8 md:w-9 h-9 rounded-full object-cover shadow-md shrink-0 border border-border/40"
                            />
                          ) : (
                            <div className={`w-8 h-8 md:w-9 h-9 rounded-full bg-gradient-to-tr ${earner.gradient} text-white font-bold text-xs flex items-center justify-center shadow-md shrink-0`}>
                              {earner.initials}
                            </div>
                          )}
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-foreground text-xs md:text-sm leading-snug truncate group-hover:underline">{earner.name}</span>
                            <span className="text-muted text-[10px] md:text-xs leading-none truncate">{earner.handle}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-right md:text-left font-bold text-foreground text-xs md:text-sm whitespace-nowrap md:w-[20%] md:pl-6">
                        {col3Display}
                      </td>
                      <td className="py-3 text-right whitespace-nowrap pl-2 md:pl-4 md:w-[20%]">
                        {col4Display}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {earners.length > 10 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setVisibleCount(prev => prev === 10 ? 50 : 10)}
                className="bg-accent border border-border text-foreground hover:bg-accent/80 transition-all font-bold text-xs px-4 py-2 rounded-lg cursor-pointer active:scale-[0.98]"
                style={{ fontFamily: 'var(--font-eb-garamond), serif' }}
              >
                {visibleCount === 10 ? "Show Top 50" : "Show Top 10"}
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="w-full mt-20">
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
