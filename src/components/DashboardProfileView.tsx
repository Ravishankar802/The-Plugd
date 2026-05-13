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
  LayoutGrid,
  Wallet
} from "lucide-react";
import Link from "next/link";
import { NICHES } from "@/lib/constants";


import ReferralModal from "@/components/ReferralModal";

const FOLLOWERS_RANGES = [
  "0-100", "100-500", "500-1K", "1K-2K", "2K-5K", "5K-10K", "10K-25K", "25K-50K", "50K-100K", "100K+"
];

export default function DashboardProfileView() {
  const [account, setAccount] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [hasAccount, setHasAccount] = useState(false);
  const [hasPromoter, setHasPromoter] = useState(false);
  const [promoterData, setPromoterData] = useState<any>(null);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [crmData, setCrmData] = useState<any[]>([]);
  const [crmLoading, setCrmLoading] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (["profile", "crm", "referrals", "earnings"].includes(hash)) {
        setActiveSection(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Initial check

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setHasAccount(data.hasAccount);
          setHasPromoter(data.hasPromoter);
          setPromoterData(data.promoterData);
          setAccount(data.accountData);
        } else {
          window.location.href = "/login";
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const fetchCRM = async () => {
    setCrmLoading(true);
    try {
      const res = await fetch("/api/dashboard/crm");
      if (res.ok) {
        const data = await res.json();
        setCrmData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCrmLoading(false);
    }
  };

  useEffect(() => {
    if (activeSection === "crm") {
      fetchCRM();
    }
  }, [activeSection]);

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

  if (!account) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Profile Section */}
      {activeSection === "profile" && (
        <>
          {hasAccount ? (
            <>
              <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-[2.25rem] font-[700] text-foreground leading-tight tracking-tight">Your Profile</h1>
                  <p className="text-muted text-[1rem] mt-1.5 font-normal">Manage your public listing on Plugd.</p>
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

              <div className="bg-pill border border-border rounded-[16px] p-10 shadow-2xl">
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

                  <div className="pt-4">
                    <button
                      disabled={saving}
                      type="submit"
                      className="w-full bg-white text-black font-[700] text-[1rem] py-[0.85rem] rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.99] shadow-xl"
                    >
                      {saving ? <Loader2 size={24} className="animate-spin" /> : (
                        <>
                          <Save size={20} />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                    {success && (
                      <p className="text-green-500 text-center mt-4 font-bold flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2">
                        <Check size={20} />
                        Profile updated successfully
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </>
          ) : (
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
        </>
      )}

      {/* CRM Section */}
      {activeSection === "crm" && (
        <div className="space-y-8">
          <div>
            <h1 className="text-[2.25rem] font-[700] text-foreground leading-tight tracking-tight">Your CRM</h1>
            <p className="text-muted text-[1rem] mt-1.5 font-normal">Manage the accounts you&apos;ve followed, saved, or skipped.</p>
          </div>

          {!hasAccount ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-foreground/5 flex items-center justify-center mb-6">
                <Lock className="w-10 h-10 text-muted" />
              </div>
              <h2 className="text-2xl font-bold mb-2">CRM Locked</h2>
              <p className="text-muted max-w-sm mb-8">CRM features (Follow, Save, Skip) are exclusive to paid members.</p>
              <button 
                onClick={() => window.location.href = "/?modal=add"}
                className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-white/90 transition-all flex items-center gap-2 shadow-xl"
              >
                Unlock CRM for $2 <ArrowRight size={18} />
              </button>
            </div>
          ) : crmLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={40} className="animate-spin text-[#f97316]" />
            </div>
          ) : crmData.length === 0 ? (
            <div className="bg-pill border border-border rounded-2xl p-20 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center">
                <LayoutGrid className="w-8 h-8 text-muted" />
              </div>
              <p className="text-foreground font-bold text-lg">No CRM data yet</p>
              <p className="text-muted text-sm max-w-xs">Start browsing accounts on the homepage to build your list.</p>
              <Link href="/" className="text-[#f97316] font-bold hover:underline mt-2">Go to Homepage</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crmData.map((item) => (
                <Link 
                  key={item.id}
                  href={`/u/${item.account.xHandle.replace(/^@+/, '')}`}
                  className="bg-pill border border-border rounded-2xl p-6 hover:border-[#f97316]/50 transition-all group relative"
                >
                  <div className="absolute top-4 right-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'followed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                      item.status === 'saved' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                      'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <img src={item.account.avatarUrl} className="w-12 h-12 rounded-full border border-border" />
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-[#f97316] transition-colors truncate max-w-[120px]">{item.account.name}</h3>
                      <p className="text-xs text-muted">@{item.account.xHandle.replace(/^@+/, '')}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted line-clamp-2 min-h-[40px]">{item.account.bio}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Referrals Section */}
      {activeSection === "referrals" && (
        <div className="space-y-8">
          <div>
            <h1 className="text-[2.25rem] font-[700] text-foreground leading-tight tracking-tight">Referrals</h1>
            <p className="text-muted text-[1rem] mt-1.5 font-normal">Share Plugd and earn rewards for every referral.</p>
          </div>

          {!hasPromoter ? (
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-pill border border-border rounded-2xl p-6 space-y-4">
                    <p className="text-sm text-muted font-medium line-clamp-3">
                      &quot;Just found this — 430+ X builders, founders and creators all in one place, sorted by niche and follower count. Actually useful. 👇&quot;
                    </p>
                    <button 
                      type="button"
                      onClick={() => copyToClipboard("Just found this — 430+ X builders, founders and creators all in one place, sorted by niche and follower count. Actually useful. 👇", 'post')}
                      className="w-full bg-background text-foreground border border-border py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all active:scale-[0.98]"
                    >
                      {copied === 'post' ? <Check className="w-4 h-4" /> : "Copy Post"}
                    </button>
                  </div>
                  
                  <div className="bg-pill border border-border rounded-2xl p-6 space-y-4">
                    <p className="text-sm text-muted font-medium truncate">
                      https://the-plugd.vercel.app?ref={promoterData?.referralCode}
                    </p>
                    <button 
                      type="button"
                      onClick={() => copyToClipboard(`https://the-plugd.vercel.app?ref=${promoterData?.referralCode}`, 'reply')}
                      className="w-full border border-border py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all active:scale-[0.98]"
                    >
                      {copied === 'reply' ? <Check className="w-4 h-4" /> : "Copy Reply Link"}
                    </button>
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

          {!hasPromoter ? (
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
                  <p className="text-muted max-w-sm mt-2 font-medium">Request a payout to your PayPal or Bank account. Minimum withdrawal is $5.</p>
                </div>
                <button 
                  disabled={(promoterData?.pendingPayout || 0) < 5}
                  onClick={() => alert("Payout request sent to admin! We will contact you at " + promoterData.email)}
                  className="bg-white text-black px-12 py-4 rounded-xl font-bold hover:bg-white/90 transition-all disabled:opacity-50 disabled:grayscale shadow-xl active:scale-[0.98]"
                >
                  {(promoterData?.pendingPayout || 0) < 5 ? "Minimum $5 required" : "Withdraw Funds"}
                </button>
              </div>

              <p className="text-[0.75rem] text-muted text-center font-medium flex items-center justify-center gap-2">
                Earnings are processed manually within 48 hours.
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
