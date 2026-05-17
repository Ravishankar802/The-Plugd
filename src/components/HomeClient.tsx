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
    router.push("/dashboard?tab=referrals");
  };

  return (
    <main className="min-h-screen flex flex-col items-center w-full max-w-full overflow-x-hidden">
      <div className="w-full relative flex flex-col items-center pt-2 pb-4">

        <div className="w-full max-w-5xl mx-auto px-4 md:px-8 relative z-[60] flex flex-col items-center">
          <div className="max-w-[800px] w-full">
            <Header />

            <section className="mb-0">
              <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center">
                <button
                  onClick={() => setIsReferModalOpen(true)}
                  suppressHydrationWarning
                  className="h-[48px] w-full md:w-auto bg-[#16a34a] border border-[#16a34a] text-black dark:text-white font-[700] px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-[#16a34a]/90 active:scale-[0.98] shadow-lg cursor-pointer"
                  style={{ fontFamily: '"Trebuchet MS", sans-serif' }}
                >
                  <TrendingUp className="w-5 h-5" />
                  Refer & Earn
                </button>
                <Link
                  href="/dashboard"
                  className="h-[48px] w-full md:w-auto bg-selected border border-selected text-selected-foreground font-[600] px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-selected/90 active:scale-[0.98] shadow-lg cursor-pointer"
                  style={{ fontFamily: '"Trebuchet MS", sans-serif' }}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* LEGACY Section */}
      <section className="w-full bg-[#0a0a0a] border-t border-amber-500/30 py-20 px-6">
        <div className="max-w-5xl mx-auto w-full">
          <h2 
            className="text-6xl md:text-7xl font-bold uppercase tracking-tight bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 bg-clip-text text-transparent mb-4"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            LEGACY
          </h2>
          <p className="text-white/60 italic text-lg md:text-xl mb-12">
            The art of earning by sharing — a story as old as commerce itself.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="flex flex-col gap-4 pl-4 border-l-4 border-green-600">
              <div className="bg-zinc-800 h-48 w-full rounded" />
              <div>
                <h3 className="text-white font-bold text-lg mb-2">The Power of Word of Mouth</h3>
                <p className="text-white/40 text-sm line-clamp-2">
                  Discover how human connection drives the most successful business models in modern history.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col gap-4 pl-4 border-l-4 border-green-600">
              <div className="bg-zinc-800 h-48 w-full rounded" />
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Building Your Empire</h3>
                <p className="text-white/40 text-sm line-clamp-2">
                  A step-by-step guide to leveraging your network and turning casual sharing into serious revenue.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col gap-4 pl-4 border-l-4 border-green-600">
              <div className="bg-zinc-800 h-48 w-full rounded" />
              <div>
                <h3 className="text-white font-bold text-lg mb-2">The New Creator Economy</h3>
                <p className="text-white/40 text-sm line-clamp-2">
                  Why traditional advertising is dying and how promoters are taking control of the narrative.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-2xl mx-auto mb-10 px-4 md:px-0 mt-10" style={{ fontFamily: 'Georgia, serif' }}>
        <Footer showBorder={false} minimal={true} />
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
