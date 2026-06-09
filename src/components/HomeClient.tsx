"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  LayoutDashboard,
  TrendingUp
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
  handle: string;
  initials: string;
  gradient: string;
  baseEarnings: number;
  baseLastMonth: number;
  earningRatePerSec: number;
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

function generateEarners(): Earner[] {
  const list: Earner[] = [];
  
  for (let i = 0; i < 50; i++) {
    const id = i + 1;
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
    const lastName = LAST_NAMES[(i * 3) % LAST_NAMES.length]; 
    const name = `${firstName} ${lastName}`;
    const handle = `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`;
    const initials = `${firstName[0]}${lastName[0]}`;
    const gradient = GRADIENTS[i % GRADIENTS.length];
    
    let baseEarnings = 0;
    let earningRatePerSec = 0;
    
    if (id === 1) {
      // Rank 1 starts at $71,000 base with a $3,500/day rate ($0.0405/sec) so base + accrued = ~$102K+ today
      baseEarnings = 71000;
      earningRatePerSec = 0.0405;
    } else {
      // Ranks 2 to 50 scale down from $25,000 base to $3,200 base
      const factor = (50 - id) / 48; // from 1.0 down to 0.0
      baseEarnings = 3200 + 21800 * Math.pow(factor, 2.0);
      // Daily rate scales from $1,500/day down to $100/day ($0.00115/sec to $0.01735/sec)
      earningRatePerSec = 0.00115 + 0.0162 * Math.pow(factor, 2.0);
    }
    
    // last month base is 75% to 83% of base earnings
    const baseLastMonth = baseEarnings * (0.75 + (i % 5) * 0.02);
    
    list.push({
      id,
      name,
      handle,
      initials,
      gradient,
      baseEarnings,
      baseLastMonth,
      earningRatePerSec
    });
  }
  
  return list;
}

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

  useEffect(() => {
    const baseEpoch = 1780272000000;
    const initialElapsedSeconds = Math.max(0, (Date.now() - baseEpoch) / 1000);
    
    const initialEarners = generateEarners().map(e => {
      const initialAccrued = initialElapsedSeconds * e.earningRatePerSec;
      const currentEarnings = e.baseEarnings + initialAccrued;
      const momGrowth = ((currentEarnings - e.baseLastMonth) / e.baseLastMonth) * 100;
      return {
        ...e,
        currentEarnings,
        momGrowth
      };
    }).sort((a, b) => b.currentEarnings - a.currentEarnings);

    setEarners(initialEarners);

    const interval = setInterval(() => {
      setEarners(prev => {
        const nextList = prev.map(e => {
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
        return [...nextList].sort((a, b) => b.currentEarnings - a.currentEarnings);
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
              <p className="text-muted text-xs md:text-sm mt-1" style={{ fontFamily: '"EB Garamond", serif' }}>Plugd creators ranking by referral earnings.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <select className="bg-background border border-border text-foreground rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none cursor-pointer">
                <option>Earnings</option>
                <option>Conversions</option>
              </select>
              <select className="bg-background border border-border text-foreground rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none cursor-pointer">
                <option>All time</option>
                <option>This month</option>
                <option>This week</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto no-scrollbar w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="pb-3 pt-1 w-8 md:w-10 text-[0.65rem] font-bold text-muted uppercase tracking-widest text-center">#</th>
                  <th className="pb-3 pt-1 text-[0.65rem] font-bold text-muted uppercase tracking-widest pl-1 md:pl-2">Creator</th>
                  <th className="pb-3 pt-1 text-[0.65rem] font-bold text-muted uppercase tracking-widest text-right whitespace-nowrap">Earnings</th>
                  <th className="pb-3 pt-1 text-[0.65rem] font-bold text-muted uppercase tracking-widest text-right whitespace-nowrap pl-2 md:pl-4">MoM Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {earners.slice(0, visibleCount).map((earner, index) => {
                  const rank = index + 1;
                  const formattedEarnings = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0
                  }).format(earner.currentEarnings);
                  
                  const formattedGrowth = `${earner.momGrowth >= 0 ? "↑" : "↓"} ${Math.abs(earner.momGrowth).toFixed(2)}%`;
                  const growthColor = earner.momGrowth >= 0 ? "text-emerald-500 bg-emerald-500/10" : "text-red-500 bg-red-500/10";
                  
                  let rankDisplay: React.ReactNode = rank;
                  if (rank === 1) rankDisplay = <span className="text-base md:text-lg">🥇</span>;
                  else if (rank === 2) rankDisplay = <span className="text-base md:text-lg">🥈</span>;
                  else if (rank === 3) rankDisplay = <span className="text-base md:text-lg">🥉</span>;

                  return (
                    <tr key={earner.id} className="hover:bg-foreground/[0.01] transition-colors group animate-in fade-in duration-300">
                      <td className="py-3 text-center w-8 md:w-10 font-bold text-muted text-xs md:text-sm">
                        {rankDisplay}
                      </td>
                      <td className="py-3 pl-1 md:pl-2">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className={`w-8 h-8 md:w-9 h-9 rounded-full bg-gradient-to-tr ${earner.gradient} text-white font-bold text-xs flex items-center justify-center shadow-md shrink-0`}>
                            {earner.initials}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-foreground text-xs md:text-sm leading-snug truncate">{earner.name}</span>
                            <span className="text-muted text-[10px] md:text-xs leading-none truncate">{earner.handle}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-right font-bold text-foreground text-xs md:text-sm whitespace-nowrap">
                        {formattedEarnings}
                      </td>
                      <td className="py-3 text-right whitespace-nowrap pl-2 md:pl-4">
                        <span className={`${growthColor} font-bold text-[10px] md:text-xs px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-md`}>
                          {formattedGrowth}
                        </span>
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
                {visibleCount === 10 ? "Show Top 50 Earners" : "Show Top 10 Earners"}
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
