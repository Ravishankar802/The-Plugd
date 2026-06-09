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

export default function HomeClient({ 
  userEmail: serverUserEmail,
  referralCode: initialReferralCode = ""
}: HomeClientProps) {
  const router = useRouter();
  
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(serverUserEmail);
  const [isPaidUser, setIsPaidUser] = useState(false);

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
        <div className="bg-pill border border-border rounded-[24px] p-6 md:p-8 shadow-xl">
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
            <table className="w-full min-w-[600px] text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="pb-4 pt-2 w-12 text-[0.65rem] font-bold text-muted uppercase tracking-widest text-center">#</th>
                  <th className="pb-4 pt-2 text-[0.65rem] font-bold text-muted uppercase tracking-widest pl-2">Creator</th>
                  <th className="pb-4 pt-2 text-[0.65rem] font-bold text-muted uppercase tracking-widest">Niche</th>
                  <th className="pb-4 pt-2 text-[0.65rem] font-bold text-muted uppercase tracking-widest text-right">Earnings</th>
                  <th className="pb-4 pt-2 text-[0.65rem] font-bold text-muted uppercase tracking-widest text-right">MoM Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {/* Rank 1 */}
                <tr className="hover:bg-foreground/[0.01] transition-colors group">
                  <td className="py-4 text-center">
                    <span className="text-lg">🥇</span>
                  </td>
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-green-300 text-white font-bold text-xs flex items-center justify-center shadow-md">
                        AR
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm leading-snug">Alex Rivers</span>
                        <span className="text-muted text-xs leading-none">@alexrivers</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-xs font-semibold text-muted bg-foreground/[0.04] px-2.5 py-1 rounded-full border border-border/40">
                      SaaS & Tech
                    </span>
                  </td>
                  <td className="py-4 text-right font-bold text-foreground text-sm">
                    $14,850
                  </td>
                  <td className="py-4 text-right">
                    <span className="text-emerald-500 font-bold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      ↑ 28%
                    </span>
                  </td>
                </tr>

                {/* Rank 2 */}
                <tr className="hover:bg-foreground/[0.01] transition-colors group">
                  <td className="py-4 text-center">
                    <span className="text-lg">🥈</span>
                  </td>
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-300 text-white font-bold text-xs flex items-center justify-center shadow-md">
                        SJ
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm leading-snug">Sarah Jenkins</span>
                        <span className="text-muted text-xs leading-none">@sarahj</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-xs font-semibold text-muted bg-foreground/[0.04] px-2.5 py-1 rounded-full border border-border/40">
                      Design & Creative
                    </span>
                  </td>
                  <td className="py-4 text-right font-bold text-foreground text-sm">
                    $9,320
                  </td>
                  <td className="py-4 text-right">
                    <span className="text-emerald-500 font-bold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      ↑ 14%
                    </span>
                  </td>
                </tr>

                {/* Rank 3 */}
                <tr className="hover:bg-foreground/[0.01] transition-colors group">
                  <td className="py-4 text-center">
                    <span className="text-lg">🥉</span>
                  </td>
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-300 text-white font-bold text-xs flex items-center justify-center shadow-md">
                        MC
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm leading-snug">Marcus Chen</span>
                        <span className="text-muted text-xs leading-none">@marcus_writes</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-xs font-semibold text-muted bg-foreground/[0.04] px-2.5 py-1 rounded-full border border-border/40">
                      Copywriting & Marketing
                    </span>
                  </td>
                  <td className="py-4 text-right font-bold text-foreground text-sm">
                    $7,150
                  </td>
                  <td className="py-4 text-right">
                    <span className="text-red-500 font-bold text-xs bg-red-500/10 px-2 py-0.5 rounded-md">
                      ↓ 2%
                    </span>
                  </td>
                </tr>

                {/* Rank 4 */}
                <tr className="hover:bg-foreground/[0.01] transition-colors group">
                  <td className="py-4 text-center font-bold text-muted text-sm">
                    4
                  </td>
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-white font-bold text-xs flex items-center justify-center shadow-md">
                        ER
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm leading-snug">Elena Rostova</span>
                        <span className="text-muted text-xs leading-none">@elena_ros</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-xs font-semibold text-muted bg-foreground/[0.04] px-2.5 py-1 rounded-full border border-border/40">
                      Finance & Crypto
                    </span>
                  </td>
                  <td className="py-4 text-right font-bold text-foreground text-sm">
                    $5,890
                  </td>
                  <td className="py-4 text-right">
                    <span className="text-emerald-500 font-bold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      ↑ 8%
                    </span>
                  </td>
                </tr>

                {/* Rank 5 */}
                <tr className="hover:bg-foreground/[0.01] transition-colors group">
                  <td className="py-4 text-center font-bold text-muted text-sm">
                    5
                  </td>
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-500 to-orange-300 text-white font-bold text-xs flex items-center justify-center shadow-md">
                        DK
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm leading-snug">David Kim</span>
                        <span className="text-muted text-xs leading-none">@dkim_dev</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-xs font-semibold text-muted bg-foreground/[0.04] px-2.5 py-1 rounded-full border border-border/40">
                      Development & Coding
                    </span>
                  </td>
                  <td className="py-4 text-right font-bold text-foreground text-sm">
                    $4,230
                  </td>
                  <td className="py-4 text-right">
                    <span className="text-muted font-bold text-xs bg-muted/10 px-2 py-0.5 rounded-md">
                      —
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
