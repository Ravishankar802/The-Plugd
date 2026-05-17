"use client";

import { useState, useEffect, Suspense } from "react";
import { 
  Loader2, 
  Check,
  ArrowRight,
  Gift,
  Copy,
  ExternalLink,
  Lock,
  Wallet,
  TrendingUp,
  X,
  Save
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { NICHES } from "@/lib/constants";


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

  const POST_VARIATIONS = [
    "This referral program pays $1 every time someone joins through your link. No cap. Keep sharing, keep earning. $10,000 is not unrealistic. 👇",
    "Easiest $1 you'll make today — share a link, someone joins Plugd, you get paid. Stack enough of those and it adds up to $10,000+. 👇",
    "Most people sleep on referral programs. This one pays $1 per signup, no limit. The people who move first earn the most. 👇"
  ];

  // Determine active section from tab param
  const activeSection = ["profile", "referrals", "earnings"].includes(tab) ? tab : "profile";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setHasPromoter(data.hasPromoter);
          setIsAdmin(data.isAdmin);
          setPromoterData(data.promoterData);
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




  const handlePromoterSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoterData) {
      setPromoterError("Promoter data not loaded.");
      return;
    }

    setPromoterSaving(true);
    setPromoterSuccess(false);
    setPromoterError(null);

    try {
      const res = await fetch("/api/promoters/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: promoterData.name,
          xHandle: promoterData.xHandle,
          payoutMethod: promoterData.payoutMethod,
          payoutDetails: promoterData.payoutDetails
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
    } catch (err) {
      console.error("Clipboard error:", err);
    }
  };


  if (loading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-10 w-48 bg-card rounded-lg" />
        <div className="h-4 w-64 bg-card rounded-lg" />
        <div className="h-[600px] w-full bg-card rounded-xl mt-8" />
      </div>
    );
  }


  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Profile Section */}
      {activeSection === "profile" && (
        <>
          {/* Promoter Settings Section */}
          {(hasPromoter || isAdmin) && promoterData && (
            <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <div className="mb-8">
                <h2 className="text-[2rem] font-[700] text-foreground leading-tight tracking-tight">Your Profile</h2>
                <p className="text-muted text-[1rem] mt-1.5 font-normal">Your referral identity and payout details.</p>
              </div>

              <div className="bg-pill border border-border rounded-[16px] p-10 shadow-2xl">
                <form onSubmit={handlePromoterSave} className="space-y-10">
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
                    {/* X Handle */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">X Handle</label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted/60 font-medium text-[1rem]">@</span>
                        <input
                          type="text"
                          value={promoterData.xHandle?.replace(/^@+/, "") || ""}
                          onChange={(e) => setPromoterData({ ...promoterData, xHandle: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl pl-11 pr-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Member Since */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Member since</label>
                      <div className="w-full bg-background border border-border rounded-xl px-5 py-4 text-muted/60 text-[1rem] opacity-70 font-medium">
                        {new Date(promoterData.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </div>
                    </div>
                  </div>

                  {/* Payout Method Toggle */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Payout Method</label>
                    <div className="flex gap-3 max-w-sm">
                      <button
                        type="button"
                        onClick={() => setPromoterData({ ...promoterData, payoutMethod: "PayPal" })}
                        className={`flex-1 py-4 rounded-xl border font-bold transition-all ${
                          promoterData.payoutMethod === "PayPal" 
                          ? "bg-[#16a34a] text-white border-[#16a34a] shadow-lg shadow-green-600/20" 
                          : "bg-background text-muted border-border hover:border-muted"
                        }`}
                      >
                        PayPal
                      </button>
                      <button
                        type="button"
                        onClick={() => setPromoterData({ ...promoterData, payoutMethod: "UPI" })}
                        className={`flex-1 py-4 rounded-xl border font-bold transition-all ${
                          promoterData.payoutMethod === "UPI" 
                          ? "bg-[#16a34a] text-white border-[#16a34a] shadow-lg shadow-green-600/20" 
                          : "bg-background text-muted border-border hover:border-muted"
                        }`}
                      >
                        UPI
                      </button>
                    </div>
                  </div>

                  {/* Payout Details */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Payout Details</label>
                    <input
                      required
                      type="text"
                      placeholder={promoterData.payoutMethod === "PayPal" ? "Your PayPal email" : "Your UPI ID (e.g. name@upi)"}
                      value={promoterData.payoutDetails || ""}
                      onChange={(e) => setPromoterData({ ...promoterData, payoutDetails: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
                    />
                  </div>

                  {/* Referral Link */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[0.95rem] font-bold text-foreground block tracking-wide">Your Referral Link</label>
                    <div className="flex gap-3">
                      <div className="flex-1 bg-background border border-border rounded-xl px-5 py-4 text-[#16a34a] font-mono font-bold text-[1rem] shadow-inner flex items-center truncate">
                        https://theplugd.com?ref={promoterData.referralCode}
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(`https://theplugd.com?ref=${promoterData.referralCode}`, 'link')}
                        className="px-8 rounded-xl bg-accent border border-border text-foreground font-bold hover:bg-accent/80 transition-all flex items-center gap-2.5 active:scale-[0.98] shrink-0"
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
            <p className="text-muted text-[1rem] mt-1.5 font-normal">Share Plugd and earn $1 for every successful referral.</p>
          </div>

          {(!hasPromoter && !isAdmin) ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#16a34a]/10 flex items-center justify-center mb-6">
                <Gift className="w-10 h-10 text-[#16a34a]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Join Referral Program</h2>
              <p className="text-muted max-w-sm mb-8">Earn $1 from every sale by sharing Plugd with your audience. (Listing Profile = $2, Promoter Profile = $2, both = $4)</p>
              <button 
                onClick={() => setIsReferModalOpen(true)}
                className="bg-[#16a34a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#16a34a]/90 transition-all flex items-center gap-2 shadow-xl shadow-green-600/20"
              >
                Join for $2 <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="bg-pill border border-border rounded-[16px] p-10 shadow-2xl space-y-8">
              <div className="space-y-4">
                <label className="text-[0.8rem] font-bold text-muted/60 block tracking-widest uppercase">YOUR REFERRAL LINK</label>
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] font-medium truncate flex items-center">
                    theplugd.com?ref={promoterData?.referralCode}
                  </div>
                  <button 
                    type="button"
                    onClick={() => copyToClipboard(`https://theplugd.com?ref=${promoterData?.referralCode}`, 'link')}
                    className="bg-[#16a34a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#16a34a]/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-[0.98]"
                  >
                    {copied === 'link' ? <Check className="w-5 h-5" /> : <><Copy className="w-5 h-5" /> Copy Link</>}
                  </button>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center border border-border">
                    <svg className="w-4 h-4 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">X Sharing Kit</h3>
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="bg-pill border border-border rounded-2xl p-6 space-y-4">
                      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                        {[1, 2, 3].map((num, idx) => (
                          <button
                            key={num}
                            onClick={() => setSelectedVariation(idx)}
                            className={`px-3 py-1.5 rounded-lg text-[0.7rem] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                              selectedVariation === idx 
                              ? "bg-selected text-selected-foreground border border-selected" 
                              : "bg-background text-muted border border-border hover:border-muted"
                            }`}
                          >
                            Variation {num}
                          </button>
                        ))}
                      </div>
                      <div className="min-h-[80px] flex items-center">
                        <p className="text-sm text-muted font-medium leading-relaxed">
                          &quot;{POST_VARIATIONS[selectedVariation]}&quot;
                        </p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => copyToClipboard(POST_VARIATIONS[selectedVariation], 'post')}
                        className="w-full bg-background text-foreground border border-border py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all active:scale-[0.98]"
                      >
                        {copied === 'post' ? <Check className="w-4 h-4 text-green-500" /> : "Copy Post"}
                      </button>
                    </div>

                    <div className="bg-pill border border-border rounded-2xl p-6 space-y-4 md:mt-10">
                      <div className="min-h-[80px] flex items-center">
                        <p className="text-sm text-muted font-medium break-all">
                          https://theplugd.com?ref={promoterData?.referralCode}
                        </p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => copyToClipboard(`https://theplugd.com?ref=${promoterData?.referralCode}`, 'reply')}
                        className="w-full border border-border py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all active:scale-[0.98]"
                      >
                        {copied === 'reply' ? <Check className="w-4 h-4 text-green-500" /> : "Copy Reply Link"}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center text-center px-4">
                    <p className="text-[0.75rem] text-muted font-medium italic">
                      ① Post the first one. Then immediately ② reply to your own post with the link. This bypasses X&apos;s link suppression.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center border border-border">
                    <ExternalLink className="w-4 h-4 text-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">DM Template</h3>
                </div>

                <div className="bg-pill border border-border rounded-2xl p-6 space-y-5">
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    Hey [name] — there&apos;s a referral program that pays $1 every time someone joins through your link. No cap. People are already making serious money with this. 1,000 referrals = $1,000. 10,000 referrals = $10,000. The product is Plugd — a directory of X builders that&apos;s blowing up right now. Share it, start earning 👉 theplugd.com?ref={promoterData?.referralCode}
                  </p>
                  <div className="space-y-3">
                    <button 
                      type="button"
                      onClick={() => copyToClipboard(`Hey [name] — there's a referral program that pays $1 every time someone joins through your link. No cap. People are already making serious money with this. 1,000 referrals = $1,000. 10,000 referrals = $10,000. The product is Plugd — a directory of X builders that's blowing up right now. Share it, start earning 👉 theplugd.com?ref=${promoterData?.referralCode}`, 'dm')}
                      className="w-full bg-background text-foreground border border-border py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all active:scale-[0.98]"
                    >
                      {copied === 'dm' ? <Check className="w-4 h-4 text-green-500" /> : <><Copy className="w-5 h-5" /> Copy DM Template</>}
                    </button>
                    <p className="text-[0.7rem] text-muted/60 font-bold uppercase tracking-wider text-center">
                      Replace [name] with their actual name before sending.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center border border-border">
                    <TrendingUp className="w-4 h-4 text-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">How to hit $1,000 fast</h3>
                </div>

                <div className="bg-pill border border-border rounded-2xl p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        Post 10-20 times per day using the variations above. Immediately reply to your own post with the link — this bypasses X&apos;s link suppression
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        DM 10-20 people every day who are active builders on X — consistency beats everything
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        Reply under big builder accounts&apos; posts — add value first, then drop your link in a follow-up reply
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        The math is simple: 1,000 people = $1,000. Start today, not tomorrow
                      </p>
                    </div>
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
              <p className="text-muted max-w-sm mb-8">Join the referral program to start earning rewards. (Listing Profile = $2, Promoter Profile = $2, both = $4)</p>
              <button 
                onClick={() => setIsReferModalOpen(true)}
                className="bg-[#16a34a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#16a34a]/90 transition-all flex items-center gap-2 shadow-xl shadow-green-600/20"
              >
                Join for $2 <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
                  <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Total Earned</p>
                  <p className="text-4xl font-bold text-foreground">${promoterData?.totalEarned || 0}</p>
                </div>
                <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl border-[#16a34a]/20">
                  <p className="text-[#16a34a] text-[0.7rem] font-bold uppercase tracking-widest mb-2">Pending Payout</p>
                  <p className="text-4xl font-bold text-[#16a34a]">${promoterData?.pendingPayout || 0}</p>
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

              <div className="bg-pill border border-border rounded-[16px] p-10 shadow-2xl flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-selected/10 flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-selected" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Withdraw Funds</h3>
                  <p className="text-muted max-w-sm mt-2 font-medium">Request a payout to your PayPal or Bank account. Minimum withdrawal is $10.</p>
                </div>
                <button 
                  disabled={(promoterData?.pendingPayout || 0) < 10}
                  onClick={() => alert("Payout request sent to admin! We will contact you at " + promoterData.email)}
                  className="bg-white text-black px-12 py-4 rounded-xl font-bold hover:bg-white/90 transition-all disabled:opacity-50 disabled:grayscale shadow-xl active:scale-[0.98]"
                >
                  {(promoterData?.pendingPayout || 0) < 10 ? "Minimum $10 required" : "Withdraw Funds"}
                </button>
              </div>

              <p className="text-[0.75rem] text-muted text-center font-medium flex items-center justify-center gap-2">
                Payouts are processed twice a month.
                <Link href="https://x.com/ravx003" target="_blank" className="text-[#16a34a] font-bold hover:underline inline-flex items-center gap-1">
                  Contact Support <ExternalLink className="w-3 h-3" />
                </Link>
              </p>
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
