"use client";

import { useState, useEffect, Suspense } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line
} from "recharts";
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
  Save,
  Share2
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
  
  const [hasPendingWithdrawal, setHasPendingWithdrawal] = useState(false);
  const [withdrawalSuccessMessage, setWithdrawalSuccessMessage] = useState<string | null>(null);
  const [requestingWithdrawal, setRequestingWithdrawal] = useState(false);

  const referralLinkSuffix = promoterData?.username || promoterData?.referralCode || "";
  const link = `https://theplugd.com?ref=${referralLinkSuffix}`;
  const totalEarnedStr = `${promoterData?.totalEarned || 0}`;

  const POST_VARIATIONS = [
    `guys I've been sharing this link for a week and made $${totalEarnedStr} already. every time someone signs up through it I get $1. it's ${link} — join and you get your own link too`,
    `not gonna lie I was skeptical but this actually works. share a link, someone joins, you get $1. been doing it in my groups. link — ${link}`,
    `if you're in a lot of WhatsApp groups or have decent followers anywhere, this is worth 2 minutes of your time. $1 per signup through your link — ${link}`
  ];

  const dmTemplate = `hey [name], random but thought of you — there's this thing called Plugd, you share a referral link and get $1 every time someone joins. I've made $${totalEarnedStr} so far just dropping it in groups. here's mine if you want to check it out first: ${link}. if you join you get your own link`;

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
          setHasPendingWithdrawal(data.hasPendingWithdrawal || false);
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
          username: promoterData.username,
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
                        https://theplugd.com?ref={referralLinkSuffix}
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(`https://theplugd.com?ref=${referralLinkSuffix}`, 'link')}
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

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center border border-border">
                    <Share2 className="w-4 h-4 text-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Sharing Kit</h3>
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    <div className="bg-pill border border-border rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                      <div className="space-y-4">
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
                      </div>
                      <button 
                        type="button"
                        onClick={() => copyToClipboard(POST_VARIATIONS[selectedVariation], 'post')}
                        className="w-full bg-background text-foreground border border-border py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all active:scale-[0.98]"
                      >
                        {copied === 'post' ? <Check className="w-4 h-4 text-green-500" /> : "Copy Post"}
                      </button>
                    </div>

                    <div className="bg-pill border border-border rounded-2xl p-6 space-y-4 flex flex-col justify-between">
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

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center border border-border">
                    <ExternalLink className="w-4 h-4 text-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">DM Template</h3>
                </div>

                <div className="bg-pill border border-border rounded-2xl p-6 space-y-5">
                  <p className="text-sm text-muted font-medium leading-relaxed">
                    {dmTemplate}
                  </p>
                  <div className="space-y-3">
                    <button 
                      type="button"
                      onClick={() => copyToClipboard(dmTemplate, 'dm')}
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
                        Send the DM template to 20 people you know today — not a blast, actual people you'd text normally
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        Drop it in your WhatsApp groups as a genuine tip, not an ad — people trust you there
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        Post on X replying to your own post with the link — your followers see it twice
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        Find 3 Discord or Telegram groups where people talk about making money and share it there once
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">5</div>
                      <p className="text-sm text-muted font-medium leading-relaxed">
                        Pin it in your Instagram bio and mention it in one story — passive clicks forever
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

              {/* Earnings Over Time Chart Card */}
              <div className="bg-pill border border-border rounded-[16px] p-6 md:p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Earnings Over Time</h3>
                    <p className="text-xs text-muted mt-1 font-medium">Track your conversion velocity and growth.</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    {/* Time Range Toggle */}
                    <div className="flex bg-[#111] dark:bg-[#111] bg-selected rounded-xl p-1 border border-border/40">
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
                    <div className="flex bg-[#111] dark:bg-[#111] bg-selected rounded-xl p-1 border border-border/40">
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
                      <LineChart
                        data={processedChartData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorEarning" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
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
                        />
                        <YAxis 
                          stroke="var(--muted)" 
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(v) => `$${v}`}
                          dx={-10}
                        />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-pill border border-border px-3 py-2 rounded-xl shadow-xl font-['Georgia',_serif]">
                                  <p className="text-[10px] text-muted font-medium mb-0.5">{data.date}</p>
                                  <p className="text-xs font-bold text-[#22c55e]">
                                    ${Number(payload[0].value).toFixed(2)}
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="displayAmount"
                          stroke="#22c55e"
                          strokeWidth={2.5}
                          dot={{ r: 4, stroke: '#22c55e', strokeWidth: 1.5, fill: 'var(--background)' }}
                          activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2, fill: 'var(--background)' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : null}
                </div>
              </div>

              <div className="bg-pill border border-border rounded-[16px] p-10 shadow-2xl flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-selected/10 flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-selected" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Withdraw Funds</h3>
                  <p className="text-muted max-w-sm mt-2 font-medium">Request a payout to your PayPal or Bank account. Minimum withdrawal is $50.</p>
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
                    disabled={(promoterData?.pendingPayout || 0) < 50 || requestingWithdrawal}
                    onClick={handleRequestWithdrawal}
                    className="bg-[#16a34a] hover:bg-[#16a34a]/90 text-white disabled:bg-white disabled:text-black disabled:opacity-50 disabled:grayscale px-12 py-4 rounded-xl font-bold transition-all shadow-xl active:scale-[0.98]"
                  >
                    {(promoterData?.pendingPayout || 0) < 50 
                      ? "Minimum $50 required" 
                      : requestingWithdrawal 
                        ? "Submitting..." 
                        : "Request Withdrawal"}
                  </button>
                )}
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
