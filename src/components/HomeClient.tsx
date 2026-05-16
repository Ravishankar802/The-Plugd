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
import Image from "next/image";

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
    <main className="relative min-h-screen flex flex-col w-full overflow-hidden">
      {/* Full Page Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=2070&auto=format&fit=crop"
          alt="Wealth Background"
          fill
          unoptimized
          className="object-cover"
          priority
        />
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col items-center">
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
                  >
                    <TrendingUp className="w-5 h-5" />
                    Refer & Earn
                  </button>
                  <Link
                    href="/dashboard"
                    className="h-[48px] w-full md:w-auto bg-selected border border-selected text-selected-foreground font-[600] px-6 rounded-lg flex items-center justify-center gap-2 transition-all hover:bg-selected/90 active:scale-[0.98] shadow-lg cursor-pointer"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Spacer to push footer to bottom */}
        <div className="flex-1" />

        <div className="w-full max-w-5xl mx-auto px-4 md:px-8 pb-10">
          <Footer showBorder={false} variant="white" />
        </div>
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
