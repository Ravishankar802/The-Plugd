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
                  href="/dashboard"
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

      {/* LEGACY Section */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 mb-10">
        <Link 
          href="/legacy" 
          className="block w-full h-96 rounded-xl flex items-center justify-center hover:scale-[1.02] transition-transform duration-300 shadow-xl"
          style={{ 
            backgroundColor: '#15803d', 
            backgroundImage: `
              radial-gradient(ellipse at 50% 40%, #22c55e 0%, transparent 60%),
              radial-gradient(ellipse at 20% 50%, #16a34a 0%, transparent 50%),
              radial-gradient(ellipse at 80% 50%, #16a34a 0%, transparent 50%),
              radial-gradient(ellipse at 25% 90%, #92400e 0%, transparent 35%),
              radial-gradient(ellipse at 75% 90%, #92400e 0%, transparent 35%)
            `
          }}
        >
          <h2 
            className="text-5xl md:text-7xl font-bold uppercase tracking-widest text-white"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            LEGACY
          </h2>
        </Link>
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
