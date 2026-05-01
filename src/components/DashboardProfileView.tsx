"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Loader2, 
  Trash2, 
  Upload, 
  Check,
  Camera,
  Save
} from "lucide-react";

import { 
  Rocket, 
  Hammer, 
  Laptop, 
  Palette, 
  Zap, 
  Bot, 
  Clapperboard, 
  GraduationCap, 
  Coins, 
  TrendingUp, 
  Pen, 
  BarChart2, 
  Briefcase, 
  DollarSign, 
  Cloud, 
  Layers, 
  Building2, 
  Mic,
  Plus
} from "lucide-react";

const NICHES = [
  { name: "Founder", icon: Rocket },
  { name: "Builder", icon: Hammer },
  { name: "Developer", icon: Laptop },
  { name: "Designer", icon: Palette },
  { name: "Indie Hacker", icon: Zap },
  { name: "AI", icon: Bot },
  { name: "Creator", icon: Clapperboard },
  { name: "Student", icon: GraduationCap },
  { name: "Crypto", icon: Coins },
  { name: "Marketer", icon: TrendingUp },
  { name: "Writer", icon: Pen },
  { name: "Investor", icon: TrendingUp },
  { name: "Trader", icon: BarChart2 },
  { name: "Freelancer", icon: Briefcase },
  { name: "Artist", icon: Palette },
  { name: "Finance", icon: DollarSign },
  { name: "SaaS", icon: Cloud },
  { name: "No-Code", icon: Layers },
  { name: "Agency", icon: Building2 },
  { name: "Podcaster", icon: Mic },
  { name: "Other", icon: Plus },
];

const FOLLOWERS_RANGES = [
  "0-100", "100-500", "500-1K", "1K-2K", "2K-5K", "5K-10K", "10K-25K", "25K-50K", "50K-100K", "100K+"
];

export default function DashboardProfileView() {
  const [account, setAccount] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const email = localStorage.getItem("plugd_user_email");
    if (email) {
      fetchAccount(email);
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

      const res = await fetch(`/api/accounts/${account.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body
      });
      const data = await res.json();
      if (data.filePath) {
        setAccount({ ...account, avatarPath: data.filePath });
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-10 w-48 bg-[#111111] rounded-lg" />
        <div className="h-4 w-64 bg-[#111111] rounded-lg" />
        <div className="h-[600px] w-full bg-[#111111] rounded-xl mt-8" />
      </div>
    );
  }

  if (!account) return <div>Account not found.</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-[2.25rem] font-[700] text-white leading-tight tracking-tight">Your Profile</h1>
        <p className="text-[#8b8b8b] text-[1rem] mt-1.5 font-normal">Manage your public listing on Plugd.</p>
      </div>

      <div className="bg-[#111111] border border-[#2a2a2a] rounded-[16px] p-10 shadow-2xl">
        <form onSubmit={handleSave} className="space-y-10">
          
          {/* Profile Picture */}
          <div className="flex flex-col gap-4">
            <label className="text-[0.75rem] font-[600] text-[#6b7280] uppercase tracking-[0.12em]">Profile Picture</label>
            <div className="flex items-center gap-8">
              {account.avatarPath ? (
                <img 
                  src={account.avatarPath} 
                  alt={account.name} 
                  className="w-24 h-24 rounded-[16px] object-cover border border-[#2a2a2a] shadow-2xl"
                />
              ) : (
                <div className="w-24 h-24 rounded-[16px] bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center shadow-inner">
                  <Camera size={28} className="text-[#444444]" />
                </div>
              )}
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#e5e5e5] transition-all flex items-center gap-2 shadow-lg active:scale-[0.98]"
                  >
                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={18} />}
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccount({ ...account, avatarPath: "" })}
                    className="p-3 bg-[#1a1a1a] border border-[#2a2a2a] text-[#8b8b8b] hover:text-red-500 hover:border-red-500/50 rounded-xl transition-all active:scale-[0.98]"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <p className="text-[0.8rem] text-[#6b7280] font-medium">JPG, PNG or WebP. Max 2MB.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="flex flex-col gap-3">
              <label className="text-[0.75rem] font-[600] text-[#6b7280] uppercase tracking-[0.12em]">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. John Doe"
                value={account.name}
                onChange={(e) => setAccount({ ...account, name: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white text-[1rem] focus:outline-none focus:border-[#3a3a3a] focus:ring-1 focus:ring-white/5 transition-all shadow-inner"
              />
            </div>

            {/* X Handle */}
            <div className="flex flex-col gap-3">
              <label className="text-[0.75rem] font-[600] text-[#6b7280] uppercase tracking-[0.12em]">X Username</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6b7280] font-medium text-[1rem]">@</span>
                <input
                  required
                  type="text"
                  placeholder="username"
                  value={account.xHandle.startsWith("@") ? account.xHandle.substring(1) : account.xHandle}
                  onChange={(e) => setAccount({ ...account, xHandle: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl pl-11 pr-5 py-4 text-white text-[1rem] focus:outline-none focus:border-[#3a3a3a] focus:ring-1 focus:ring-white/5 transition-all shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-[0.75rem] font-[600] text-[#6b7280] uppercase tracking-[0.12em]">One-line Bio</label>
              <span className={`text-[0.75rem] font-medium ${account.bio.length > 100 ? "text-red-500" : "text-[#6b7280]"}`}>
                {account.bio.length}/100
              </span>
            </div>
            <input
              required
              maxLength={100}
              type="text"
              placeholder="Founder | Building in public | Shipping daily"
              value={account.bio}
              onChange={(e) => setAccount({ ...account, bio: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white text-[1rem] focus:outline-none focus:border-[#3a3a3a] focus:ring-1 focus:ring-white/5 transition-all shadow-inner"
            />
          </div>

          {/* Email - Read Only */}
          <div className="flex flex-col gap-3">
            <label className="text-[0.75rem] font-[600] text-[#6b7280] uppercase tracking-[0.12em]">Email Address</label>
            <input
              readOnly
              type="email"
              value={account.email}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-5 py-4 text-[#6b7280] cursor-not-allowed text-[1rem] opacity-70"
            />
          </div>

          {/* Niche - Single Select */}
          <div className="flex flex-col gap-5">
            <label className="text-[0.75rem] font-[600] text-[#6b7280] uppercase tracking-[0.12em]">Niche</label>
            <div className="flex flex-wrap gap-3">
              {NICHES.map((niche) => {
                const isSelected = account.niche.includes(niche.name);
                return (
                  <button
                    key={niche.name}
                    type="button"
                    onClick={() => setAccount({ ...account, niche: [niche.name] })}
                    className={`px-5 py-2.5 rounded-full text-[0.9rem] transition-all border ${
                      isSelected 
                        ? "bg-white text-black border-white font-bold shadow-lg" 
                        : "bg-[#111111] text-[#8b8b8b] border-[#2a2a2a] hover:border-[#3a3a3a] hover:text-white"
                    }`}
                  >
                    {niche.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Followers Range */}
          <div className="flex flex-col gap-5">
            <label className="text-[0.75rem] font-[600] text-[#6b7280] uppercase tracking-[0.12em]">Followers Range</label>
            <div className="flex flex-wrap gap-3">
              {FOLLOWERS_RANGES.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setAccount({ ...account, followersRange: range })}
                  className={`px-5 py-2.5 rounded-full text-[0.9rem] transition-all border ${
                    account.followersRange === range 
                      ? "bg-white text-black border-white font-bold shadow-lg" 
                      : "bg-[#111111] text-[#8b8b8b] border-[#2a2a2a] hover:border-[#3a3a3a] hover:text-white"
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
              className="w-full bg-white text-black font-[700] text-[1rem] py-[0.85rem] rounded-xl hover:bg-[#e5e5e5] transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.99] shadow-xl"
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
