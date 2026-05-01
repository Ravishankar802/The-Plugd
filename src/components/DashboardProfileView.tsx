"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Loader2, 
  Trash2, 
  Upload, 
  Check,
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
  Plus,
  BarChart2,
  Briefcase,
  DollarSign,
  Cloud,
  Layers,
  Building2,
  Mic
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
        <div className="h-8 w-48 bg-[#111111] rounded-lg" />
        <div className="h-4 w-64 bg-[#111111] rounded-lg" />
        <div className="h-[600px] w-full bg-[#111111] rounded-2xl mt-8" />
      </div>
    );
  }

  if (!account) return <div>Account not found.</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Your Profile</h1>
        <p className="text-[#a1a1aa] mt-2 text-lg">Edit your public listing on The Plugd.</p>
      </div>

      <div className="bg-[#111111] border border-[#1a1a1a] rounded-2xl p-10 shadow-2xl">
        <form onSubmit={handleSave} className="space-y-12">
          
          {/* Profile Picture */}
          <div className="space-y-4">
            <label className="text-[0.65rem] font-bold text-[#444444] uppercase tracking-[0.2em]">Profile Picture</label>
            <div className="flex items-center gap-8">
              <img 
                src={account.avatarPath} 
                alt={account.name} 
                className="w-28 h-28 rounded-xl object-cover border border-[#1a1a1a] shadow-2xl"
              />
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
                    className="bg-[#161616] border border-[#222222] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:border-[#333333] transition-all flex items-center gap-2"
                  >
                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccount({ ...account, avatarPath: "" })}
                    className="p-2.5 bg-[#161616] border border-[#222222] text-[#444444] hover:text-red-500 hover:border-red-500/50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="text-[0.7rem] text-[#444444] font-medium">JPG, PNG or WebP. Max 2MB.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Name */}
            <div className="space-y-3">
              <label className="text-[0.65rem] font-bold text-[#444444] uppercase tracking-[0.2em]">Full Name</label>
              <input
                required
                type="text"
                value={account.name}
                onChange={(e) => setAccount({ ...account, name: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-5 py-4 text-white focus:outline-none focus:border-[#333333] transition-all font-medium"
              />
            </div>

            {/* X Handle */}
            <div className="space-y-3">
              <label className="text-[0.65rem] font-bold text-[#444444] uppercase tracking-[0.2em]">X Username</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#444444] font-medium">@</span>
                <input
                  required
                  type="text"
                  value={account.xHandle.startsWith("@") ? account.xHandle.substring(1) : account.xHandle}
                  onChange={(e) => setAccount({ ...account, xHandle: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg pl-10 pr-5 py-4 text-white focus:outline-none focus:border-[#333333] transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[0.65rem] font-bold text-[#444444] uppercase tracking-[0.2em]">One-line Bio</label>
              <span className={`text-[0.65rem] font-bold ${account.bio.length > 100 ? "text-red-500" : "text-[#444444]"}`}>
                {account.bio.length}/100
              </span>
            </div>
            <input
              required
              maxLength={100}
              type="text"
              value={account.bio}
              onChange={(e) => setAccount({ ...account, bio: e.target.value })}
              className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-5 py-4 text-white focus:outline-none focus:border-[#333333] transition-all font-medium"
            />
          </div>

          {/* Email - Read Only */}
          <div className="space-y-3">
            <label className="text-[0.65rem] font-bold text-[#444444] uppercase tracking-[0.2em]">Email Address</label>
            <input
              readOnly
              type="email"
              value={account.email}
              className="w-full bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg px-5 py-4 text-[#444444] cursor-not-allowed font-medium opacity-50"
            />
          </div>

          {/* Niche - Single Select */}
          <div className="space-y-4">
            <label className="text-[0.65rem] font-bold text-[#444444] uppercase tracking-[0.2em]">Niche</label>
            <div className="flex flex-wrap gap-2.5">
              {NICHES.map((niche) => {
                const isSelected = account.niche.includes(niche.name);
                return (
                  <button
                    key={niche.name}
                    type="button"
                    onClick={() => setAccount({ ...account, niche: [niche.name] })}
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-lg text-[0.85rem] transition-all border font-bold ${
                      isSelected 
                        ? "bg-white text-black border-white" 
                        : "bg-[#111111] text-[#888888] border-[#1a1a1a] hover:text-white"
                    }`}
                  >
                    <span>{niche.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Followers Range */}
          <div className="space-y-4">
            <label className="text-[0.65rem] font-bold text-[#444444] uppercase tracking-[0.2em]">Followers Range</label>
            <div className="flex flex-wrap gap-2.5">
              {FOLLOWERS_RANGES.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setAccount({ ...account, followersRange: range })}
                  className={`px-4 py-2 rounded-lg text-[0.85rem] transition-all border font-bold ${
                    account.followersRange === range 
                      ? "bg-white text-black border-white" 
                      : "bg-[#111111] text-[#888888] border-[#1a1a1a] hover:text-white"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6">
            <button
              disabled={saving}
              type="submit"
              className="w-full bg-white text-black font-black text-lg py-5 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.99]"
            >
              {saving ? <Loader2 size={24} className="animate-spin" /> : "Save Changes"}
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
