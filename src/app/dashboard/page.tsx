"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Loader2, 
  Copy, 
  Check, 
  Plus, 
  Palette, 
  CreditCard, 
  Share2, 
  ArrowRight,
  Sparkles,
  Link as LinkIcon
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [itemsCount, setItemsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [completeness, setCompleteness] = useState(0);

  // Onboarding state
  const [usernameInput, setUsernameInput] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [usernameSuccess, setUsernameSuccess] = useState(false);
  const [onboardingSubmitting, setOnboardingSubmitting] = useState(false);

  // Copy state
  const [copied, setCopied] = useState(false);

  // Debounced username check
  useEffect(() => {
    if (!usernameInput) {
      setUsernameError("");
      setUsernameSuccess(false);
      return;
    }

    const clean = usernameInput.toLowerCase().trim().replace(/^@+/, "");
    
    // Quick regex validation before calling API
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (!usernameRegex.test(clean)) {
      setUsernameError("3-20 characters: letters, numbers, underscores, or hyphens.");
      setUsernameSuccess(false);
      return;
    }

    setCheckingUsername(true);
    setUsernameError("");
    setUsernameSuccess(false);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/check-username?username=${clean}`);
        const data = await res.json();
        if (data.available) {
          setUsernameSuccess(true);
          setUsernameError("");
        } else {
          setUsernameError(data.error || "Username is taken.");
          setUsernameSuccess(false);
        }
      } catch (err) {
        console.error("Error checking username:", err);
      } finally {
        setCheckingUsername(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [usernameInput]);

  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setItemsCount(data.items?.length || 0);
        setCategoriesCount(data.categories?.length || 0);
        setCompleteness(data.completeness || 0);
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleClaimUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameSuccess || onboardingSubmitting) return;

    setOnboardingSubmitting(true);
    try {
      const clean = usernameInput.toLowerCase().trim().replace(/^@+/, "");
      const res = await fetch("/api/username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: clean }),
      });

      const data = await res.json();
      if (res.ok) {
        // Success: refresh user data to unlock full dashboard
        await fetchUserData();
        router.refresh();
      } else {
        setUsernameError(data.error || "Failed to claim username.");
        setUsernameSuccess(false);
      }
    } catch (err) {
      console.error("Claim error:", err);
      setUsernameError("Something went wrong. Please try again.");
    } finally {
      setOnboardingSubmitting(false);
    }
  };

  const copyPublicLink = () => {
    if (!user?.username) return;
    const url = `${window.location.origin}/@${user.username}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (!user?.username) return;
    const url = `${window.location.origin}/@${user.username}`;
    if (navigator.share) {
      navigator.share({
        title: `${user.displayName || "My Profile"} on Plugd`,
        text: `Check out the things I'm working toward on my Plugd page!`,
        url: url
      }).catch(err => console.error("Error sharing:", err));
    } else {
      // Fallback
      copyPublicLink();
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  // 1. Render Onboarding Screen if username is not set
  if (!user?.username) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto pt-8 pb-16 font-sans">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-full shadow-2xl space-y-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="text-2xl font-extrabold text-zinc-100 tracking-tight">Claim your @username</h1>
            <p className="text-sm text-zinc-400">
              Welcome to Plugd! Choose a unique username to create your creator support page.
            </p>
          </div>

          <form onSubmit={handleClaimUsername} className="space-y-4">
            <div className="space-y-1.5 relative">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Username</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-semibold text-lg">@</span>
                <input
                  type="text"
                  placeholder="username"
                  className="w-full h-14 bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-12 text-zinc-100 placeholder:text-zinc-700 font-semibold focus:outline-none focus:border-orange-500 transition-colors"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  disabled={onboardingSubmitting}
                  required
                />
                {checkingUsername && (
                  <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-zinc-600" />
                )}
              </div>
              
              {usernameError && (
                <p className="text-xs text-red-500 pl-1 font-medium">{usernameError}</p>
              )}
              {usernameSuccess && (
                <p className="text-xs text-emerald-500 pl-1 font-medium flex items-center gap-1">
                  <span>✨</span> username is available!
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!usernameSuccess || onboardingSubmitting}
              className="w-full h-14 bg-orange-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-base cursor-pointer shadow-lg shadow-orange-500/5"
            >
              {onboardingSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin text-black" />
              ) : (
                <>Claim Username <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const publicUrl = `${window.location.origin}/@${user.username}`;

  // 2. Render Normal Dashboard Overview
  return (
    <div className="space-y-10 py-2">
      {/* Welcome Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-zinc-100 tracking-tight">
            Dashboard
          </h1>
          <p className="text-zinc-400 text-sm mt-1.5 font-normal">
            Welcome back! Monitor your profile state and update your page goals.
          </p>
        </div>
        
        {/* Link to public profile page */}
        <Link
          href={`/@${user.username}`}
          target="_blank"
          className="self-start md:self-center px-4 py-2 border border-zinc-800 text-zinc-300 hover:text-zinc-100 bg-zinc-900/20 hover:bg-zinc-900/60 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <span>View Public Page</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Main Public URL display */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl" />
        
        <div className="space-y-2 relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-500">Your Simple Link</span>
          <h2 className="text-xl md:text-2xl font-bold text-zinc-100 flex items-center gap-1 font-sans tracking-tight">
            theplugd.com/<span className="text-orange-500 font-extrabold">@{user.username}</span>
          </h2>
          <p className="text-xs text-zinc-400">Share this link in your social bio (Instagram, X, YouTube) to receive support.</p>
        </div>

        <div className="flex flex-row gap-3 relative z-10">
          <button
            onClick={copyPublicLink}
            className="flex-1 md:flex-initial h-12 px-5 bg-zinc-800 text-zinc-200 border border-zinc-700/50 hover:bg-zinc-700 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? (
              <><Check className="w-4 h-4 text-emerald-500" /> Copied!</>
            ) : (
              <><Copy className="w-4 h-4 text-zinc-400" /> Copy Link</>
            )}
          </button>
          
          <button
            onClick={handleShare}
            className="h-12 w-12 bg-orange-500 hover:bg-orange-600 text-black rounded-xl flex items-center justify-center transition-colors cursor-pointer shadow-lg shadow-orange-500/10"
            title="Share Page"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Items */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between h-36">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Active Goals</span>
          <div className="space-y-1">
            <p className="text-4xl font-black text-zinc-100 tracking-tight">{itemsCount}</p>
            <p className="text-xs text-zinc-400">Goals displayed on your profile</p>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between h-36">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Categories</span>
          <div className="space-y-1">
            <p className="text-4xl font-black text-zinc-100 tracking-tight">{categoriesCount}</p>
            <p className="text-xs text-zinc-400">Shelves to organize your goals</p>
          </div>
        </div>

        {/* Profile Completeness */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between h-36">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Profile Completeness</span>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-zinc-100">{completeness}%</span>
              {completeness === 100 ? (
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Ready</span>
              ) : (
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-500">Needs Work</span>
              )}
            </div>
            {/* Progress bar */}
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all duration-500 rounded-full" 
                style={{ width: `${completeness}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-zinc-200 tracking-tight">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Add Goal */}
          <Link 
            href="/dashboard/items"
            className="group p-6 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl flex flex-col gap-4 text-left transition-all hover:scale-[1.01]"
          >
            <div className="w-10 h-10 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-black transition-all">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-zinc-100 text-sm">Add Support Goal</p>
              <p className="text-xs text-zinc-400 mt-1 leading-normal">Add something you want, like coffee, headphones, or travel dreams.</p>
            </div>
          </Link>

          {/* Edit Page */}
          <Link 
            href="/dashboard/appearance"
            className="group p-6 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl flex flex-col gap-4 text-left transition-all hover:scale-[1.01]"
          >
            <div className="w-10 h-10 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-black transition-all">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-zinc-100 text-sm">Customize Appearance</p>
              <p className="text-xs text-zinc-400 mt-1 leading-normal">Upload your avatar, banner, write a bio, and configure your page design.</p>
            </div>
          </Link>

          {/* Payments */}
          <Link 
            href="/dashboard/payments"
            className="group p-6 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl flex flex-col gap-4 text-left transition-all hover:scale-[1.01]"
          >
            <div className="w-10 h-10 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-black transition-all">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-zinc-100 text-sm">Configure Payments</p>
              <p className="text-xs text-zinc-400 mt-1 leading-normal">Enable direct supporter payments via your UPI ID, QR code, or bank transfer.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
