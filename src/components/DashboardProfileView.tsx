"use client";

import { useState, useEffect } from "react";
import { 
  Loader2, 
  Trash2, 
  Upload, 
  Check,
  Camera,
  Save,
  User,
  Plus as PlusIcon,
  ArrowRight,
  Gift,
  Copy,
  ExternalLink,
  Lock,
  Wallet
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { NICHES } from "@/lib/constants";


import ReferralModal from "@/components/ReferralModal";

const FOLLOWERS_RANGES = [
  "0-100", "100-500", "500-1K", "1K-2K", "2K-5K", "5K-10K", "10K-25K", "25K-50K", "50K-100K", "100K+"
];

export default function DashboardProfileView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "profile";
  
  const [account, setAccount] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [hasAccount, setHasAccount] = useState(false);
  const [hasPromoter, setHasPromoter] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [promoterData, setPromoterData] = useState<any>(null);
  const [promoterSaving, setPromoterSaving] = useState(false);
  const [promoterSuccess, setPromoterSuccess] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState(0);

  const POST_VARIATIONS = [
    "There's a directory of X builders where you get paid $1 just for sharing it. Been using it. Here's my link 👇",
    "Found a directory of every builder, founder and creator on X — sorted by niche and follower count. Actually useful for finding people to follow. 👇",
    "If you're building on X and you're not in this directory yet, you're missing out on free visibility. 👇"
  ];

  // Determine active section from tab param
  const activeSection = ["profile", "referrals", "earnings"].includes(tab) ? tab : "profile";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setHasAccount(data.hasAccount);
          setHasPromoter(data.hasPromoter);
          setIsAdmin(data.isAdmin);
          setPromoterData(data.promoterData);
          setAccount(data.accountData);
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


  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      // Clean Handle
      let handle = account.xHandle;
      if (handle.startsWith("@")) handle = handle.substring(1);

      const emailHeader = localStorage.getItem("plugd_user_email");
      const res = await fetch(`/api/accounts/${account.id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "x-user-email": emailHeader || ""
        },
        body: JSON.stringify({
          ...account,
          xHandle: handle
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handlePromoterSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPromoterSaving(true);
    setPromoterSuccess(false);

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
        alert("Failed to save changes: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Failed to save changes.");
    } finally {
      setPromoterSaving(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
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
          {/* Account Profile Section */}
          {(hasAccount || isAdmin) ? (
            <>
              <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-[2.25rem] font-[700] text-foreground leading-tight tracking-tight">Listing Profile</h1>
                  <p className="text-muted text-[1rem] mt-1.5 font-normal">Your public listing in the Plugd index.</p>
                </div>
                
                {account && (
                  <Link 
                    href={`/u/${account.xHandle.replace(/^@+/, '')}`}
                    className="flex items-center gap-2 text-[#f97316] font-bold text-sm hover:underline"
                  >
                    Visit Public Profile <ArrowRight size={14} />
                  </Link>
                )}
              </div>

              {account?.status === "pending_payment" && (
                <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <p className="text-yellow-500 text-sm font-bold uppercase tracking-wider">
                    We&apos;re confirming your payment. Your profile will appear shortly.
                  </p>
                </div>
              )}

              <div className="bg-pill border border-border rounded-[16px] p-10 shadow-2xl mb-12">
                <form onSubmit={handleSave} className="space-y-10">
                  {/* Profile Picture */}
                  <div className="flex flex-col gap-6">
                    <label className="text-[0.8rem] font-bold text-muted/60 block tracking-widest uppercase">PROFILE PICTURE URL</label>
                    
                    <div className="flex flex-col gap-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-pill border border-border flex items-center justify-center shadow-2xl shrink-0">
                        {account?.avatarUrl ? (
                          <img 
                            src={account.avatarUrl} 
                            alt={account.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user text-muted/40"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>';
                            }}
                          />
                        ) : (
                          <User size={32} className="text-muted/40" />
                        )}
                      </div>

                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          placeholder="https://pbs.twimg.com/profile_images/..."
                          value={account?.avatarUrl || ""}
                          onChange={(e) => setAccount({ ...account, avatarUrl: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
                        />
                        <p className="text-[0.8rem] text-muted/60 font-medium">Paste your X profile picture URL here</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-[0.95rem] font-[500] text-foreground block">Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. John Doe"
                        value={account?.name || ""}
                        onChange={(e) => setAccount({ ...account, name: e.target.value })}
                        className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-[0.95rem] font-[500] text-foreground block">X Username</label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted/60 font-medium text-[1rem]">@</span>
                        <input
                          required
                          type="text"
                          placeholder="username"
                          value={((account?.xHandle || "") as string).startsWith("@") ? ((account?.xHandle || "") as string).substring(1) : (account?.xHandle || "")}
                          onChange={(e) => setAccount({ ...account, xHandle: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl pl-11 pr-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[0.95rem] font-[500] text-foreground block">One-line Bio</label>
                      <span className={`text-[0.75rem] font-medium ${(account?.bio || "").length > 100 ? "text-red-500" : "text-muted/60"}`}>
                        {(account?.bio || "").length}/100
                      </span>
                    </div>
                    <input
                      required
                      maxLength={100}
                      type="text"
                      placeholder="Founder | Building in public | Shipping daily"
                      value={account?.bio || ""}
                      onChange={(e) => setAccount({ ...account, bio: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-[0.95rem] font-[500] text-foreground block">Email Address</label>
                    <input
                      readOnly
                      type="email"
                      value={account?.email || ""}
                      className="w-full bg-background border border-border rounded-xl px-5 py-4 text-muted cursor-not-allowed text-[1rem] opacity-70"
                    />
                  </div>

                  <div className="flex flex-col gap-5">
                    <label className="text-[0.95rem] font-[500] text-foreground block">Niche</label>
                    <div className="flex flex-wrap gap-3">
                      {NICHES.map((niche) => {
                        const Icon = niche.icon;
                        const isSelected = (account?.niche || []).includes(niche.name);
                        return (
                          <button
                            key={niche.name}
                            type="button"
                            onClick={() => {
                              const current = account?.niche || [];
                              const updated = current.includes(niche.name)
                                ? current.filter((n: string) => n !== niche.name)
                                : [...current, niche.name];
                              setAccount({ ...account, niche: updated });
                            }}
                            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[0.9rem] transition-all border ${
                              isSelected 
                                ? "bg-selected text-selected-foreground border-selected font-bold shadow-lg" 
                                : "bg-pill text-muted border-border hover:border-muted hover:text-foreground hover:bg-accent"
                            }`}
                          >
                            {Icon && <Icon size={16} className={isSelected ? "text-selected-foreground" : "text-muted"} />}
                            <span>{niche.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <label className="text-[0.95rem] font-[500] text-foreground block">Followers Range</label>
                    <div className="flex flex-wrap gap-3">
                      {FOLLOWERS_RANGES.map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setAccount({ ...account, followersRange: range })}
                          className={`px-5 py-2.5 rounded-full text-[0.9rem] transition-all border ${
                            account?.followersRange === range 
                              ? "bg-selected text-selected-foreground border-selected font-bold shadow-lg" 
                              : "bg-pill text-muted border-border hover:border-muted hover:text-foreground hover:bg-accent"
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full md:w-auto min-w-[240px] bg-white text-black font-black text-lg py-5 px-12 rounded-xl transition-all hover:bg-white/90 shadow-2xl active:scale-[0.99] uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          Save Changes
                        </>
                      )}
                    </button>
                    {success && (
                      <p className="text-green-500 text-center md:text-left mt-4 font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                        <Check size={20} />
                        Profile updated successfully
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </>
          ) : !hasPromoter && !isAdmin && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-foreground/5 flex items-center justify-center mb-6">
                <Lock className="w-10 h-10 text-muted" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Listing Required</h2>
              <p className="text-muted max-w-sm mb-8">You need to add your account to the directory to access profile editing.</p>
              <button 
                onClick={() => window.location.href = "/?modal=add"}
                className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-white/90 transition-all flex items-center gap-2 shadow-xl"
              >
                Get Listed for $2 <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* Promoter Settings Section */}
          {(hasPromoter || isAdmin) && promoterData && (
            <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <div className="mb-8">
                <h2 className="text-[2rem] font-[700] text-foreground leading-tight tracking-tight">Promoter Profile</h2>
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
                          ? "bg-[#f97316] text-white border-[#f97316] shadow-lg shadow-orange-500/20" 
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
                          ? "bg-[#f97316] text-white border-[#f97316] shadow-lg shadow-orange-500/20" 
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
                      <div className="flex-1 bg-background border border-border rounded-xl px-5 py-4 text-[#f97316] font-mono font-bold text-[1rem] shadow-inner flex items-center truncate">
                        https://the-plugd.vercel.app?ref={promoterData.referralCode}
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(`https://the-plugd.vercel.app?ref=${promoterData.referralCode}`, 'link')}
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
                      className="w-full md:w-auto min-w-[260px] bg-[#f97316] text-white font-black text-lg py-5 px-12 rounded-xl transition-all hover:bg-[#f97316]/90 shadow-2xl active:scale-[0.99] uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-3"
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
            <p className="text-muted text-[1rem] mt-1.5 font-normal">Share Plugd and earn rewards for every referral.</p>
          </div>

          {(!hasPromoter && !isAdmin) ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#f97316]/10 flex items-center justify-center mb-6">
                <Gift className="w-10 h-10 text-[#f97316]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Join Referral Program</h2>
              <p className="text-muted max-w-sm mb-8">Earn $1 from every sale by sharing Plugd with your audience.</p>
              <button 
                onClick={() => setIsReferModalOpen(true)}
                className="bg-[#f97316] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#f97316]/90 transition-all flex items-center gap-2 shadow-xl shadow-orange-500/20"
              >
                Join for $1 <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="bg-pill border border-border rounded-[16px] p-10 shadow-2xl space-y-8">
              <div className="space-y-4">
                <label className="text-[0.8rem] font-bold text-muted/60 block tracking-widest uppercase">YOUR REFERRAL LINK</label>
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] font-medium truncate flex items-center">
                    the-plugd.vercel.app?ref={promoterData?.referralCode}
                  </div>
                  <button 
                    type="button"
                    onClick={() => copyToClipboard(`https://the-plugd.vercel.app?ref=${promoterData?.referralCode}`, 'link')}
                    className="bg-[#f97316] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#f97316]/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.98]"
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
                          https://the-plugd.vercel.app?ref={promoterData?.referralCode}
                        </p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => copyToClipboard(`https://the-plugd.vercel.app?ref=${promoterData?.referralCode}`, 'reply')}
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
                    Hey [name], saw you&apos;re building on X — there&apos;s a directory called Plugd where builders get listed and discovered by niche and follower count. Thought you&apos;d find it useful: https://the-plugd.vercel.app?ref={promoterData?.referralCode}
                  </p>
                  <div className="space-y-3">
                    <button 
                      type="button"
                      onClick={() => copyToClipboard(`Hey [name], saw you're building on X — there's a directory called Plugd where builders get listed and discovered by niche and follower count. Thought you'd find it useful: https://the-plugd.vercel.app?ref=${promoterData?.referralCode}`, 'dm')}
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
            </div>
          )}
        </div>
      )}

      {/* Earnings Section */}
      {activeSection === "earnings" && (
        <div className="space-y-8">
          <div>
            <h1 className="text-[2.25rem] font-[700] text-foreground leading-tight tracking-tight">Your Earnings</h1>
            <p className="text-muted text-[1rem] mt-1.5 font-normal">Track your rewards and request payouts.</p>
          </div>

          {(!hasPromoter && !isAdmin) ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#f97316]/10 flex items-center justify-center mb-6">
                <Wallet className="w-10 h-10 text-[#f97316]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Earnings Locked</h2>
              <p className="text-muted max-w-sm mb-8">Join the referral program to start earning rewards.</p>
              <button 
                onClick={() => setIsReferModalOpen(true)}
                className="bg-[#f97316] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#f97316]/90 transition-all flex items-center gap-2 shadow-xl shadow-orange-500/20"
              >
                Join for $1 <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
                  <p className="text-muted text-[0.7rem] font-bold uppercase tracking-widest mb-2">Total Earned</p>
                  <p className="text-4xl font-bold text-foreground">${promoterData?.totalEarned || 0}</p>
                </div>
                <div className="bg-pill border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl border-[#f97316]/20">
                  <p className="text-[#f97316] text-[0.7rem] font-bold uppercase tracking-widest mb-2">Pending Payout</p>
                  <p className="text-4xl font-bold text-[#f97316]">${promoterData?.pendingPayout || 0}</p>
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
                <Link href="https://x.com/ravx003" target="_blank" className="text-[#f97316] font-bold hover:underline inline-flex items-center gap-1">
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
        userEmail={account?.email || promoterData?.email || ""} 
      />
    </div>
  );
}
