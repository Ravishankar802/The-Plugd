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
  Plus
} from "lucide-react";
import { NICHES } from "@/lib/constants";


const FOLLOWERS_RANGES = [
  "0-100", "100-500", "500-1K", "1K-2K", "2K-5K", "5K-10K", "10K-25K", "25K-50K", "50K-100K", "100K+"
];

export default function DashboardProfileView() {
  const [account, setAccount] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let email = params.get("email");
    
    if (!email && typeof window !== "undefined") {
      email = localStorage.getItem("plugd_user_email");
    }

    if (email) {
      fetchAccount(email);
      // Persist for refresh
      localStorage.setItem("plugd_user_email", email);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchAccount = async (email: string) => {
    try {
      const res = await fetch("/api/dashboard/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.found) {
          setAccount(data.account);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="mb-8">
        <h1 className="text-[2.25rem] font-[700] text-foreground leading-tight tracking-tight">Your Profile</h1>
        <p className="text-muted text-[1rem] mt-1.5 font-normal">Manage your public listing on Plugd.</p>
        
        {account?.status === "pending_payment" && (
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <p className="text-yellow-500 text-sm font-bold uppercase tracking-wider">
              We&apos;re confirming your payment. Your profile will appear shortly.
            </p>
          </div>
        )}
      </div>

      <div className="bg-pill border border-border rounded-[16px] p-10 shadow-2xl">
        <form onSubmit={handleSave} className="space-y-10">
          
          {/* Profile Picture */}
          <div className="flex flex-col gap-6">
            <label className="text-[0.8rem] font-bold text-muted/60 block tracking-widest uppercase">PROFILE PICTURE URL</label>
            
            <div className="flex flex-col gap-6">
              {/* 80px Preview above input */}
              <div className="w-20 h-20 rounded-full overflow-hidden bg-pill border border-border flex items-center justify-center shadow-2xl shrink-0">
                {account.avatarUrl ? (
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
                  value={account.avatarUrl || ""}
                  onChange={(e) => setAccount({ ...account, avatarUrl: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
                />
                <p className="text-[0.8rem] text-muted/60 font-medium">Paste your X profile picture URL here</p>
                <p className="text-[0.75rem] text-muted/60 font-medium mt-1 whitespace-nowrap">Changed your X profile pic? Update the URL here.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="flex flex-col gap-3">
              <label className="text-[0.95rem] font-[500] text-foreground block">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. John Doe"
                value={account.name}
                onChange={(e) => setAccount({ ...account, name: e.target.value })}
                className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
              />
            </div>

            {/* X Handle */}
            <div className="flex flex-col gap-3">
              <label className="text-[0.95rem] font-[500] text-foreground block">X Username</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted/60 font-medium text-[1rem]">@</span>
                <input
                  required
                  type="text"
                  placeholder="username"
                  value={((account.xHandle || "") as string).startsWith("@") ? ((account.xHandle || "") as string).substring(1) : (account.xHandle || "")}
                  onChange={(e) => setAccount({ ...account, xHandle: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl pl-11 pr-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-[0.95rem] font-[500] text-foreground block">One-line Bio</label>
              <span className={`text-[0.75rem] font-medium ${(account.bio || "").length > 100 ? "text-red-500" : "text-muted/60"}`}>
                {(account.bio || "").length}/100
              </span>
            </div>
            <input
              required
              maxLength={100}
              type="text"
              placeholder="Founder | Building in public | Shipping daily"
              value={account.bio || ""}
              onChange={(e) => setAccount({ ...account, bio: e.target.value })}
              className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground text-[1rem] focus:outline-none focus:border-muted transition-all shadow-inner"
            />
          </div>

          {/* Email - Read Only */}
          <div className="flex flex-col gap-3">
            <label className="text-[0.95rem] font-[500] text-foreground block">Email Address</label>
            <input
              readOnly
              type="email"
              value={account.email}
              className="w-full bg-background border border-border rounded-xl px-5 py-4 text-muted cursor-not-allowed text-[1rem] opacity-70"
            />
          </div>

          {/* Niche - Multi Select */}
          <div className="flex flex-col gap-5">
            <label className="text-[0.95rem] font-[500] text-foreground block">Niche</label>
            <div className="flex flex-wrap gap-3">
              {NICHES.map((niche) => {
                const Icon = niche.icon;
                const isSelected = (account.niche || []).includes(niche.name);
                return (
                  <button
                    key={niche.name}
                    type="button"
                    onClick={() => {
                      const current = account.niche || [];
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

          {/* Followers Range */}
          <div className="flex flex-col gap-5">
            <label className="text-[0.95rem] font-[500] text-foreground block">Followers Range</label>
            <div className="flex flex-wrap gap-3">
              {FOLLOWERS_RANGES.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setAccount({ ...account, followersRange: range })}
                  className={`px-5 py-2.5 rounded-full text-[0.9rem] transition-all border ${
                    account.followersRange === range 
                      ? "bg-selected text-selected-foreground border-selected font-bold shadow-lg" 
                      : "bg-pill text-muted border-border hover:border-muted hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
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
    </div>
  );
}
