"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Loader2, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  Palette, 
  Image as ImageIcon
} from "lucide-react";

// Bulletproof inline SVG social icons
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" fill="currentColor" />
  </svg>
);


export default function AppearancePage() {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Profile fields
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [accentColor, setAccentColor] = useState("#f97316");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");

  // Social URLs
  const [instagramUrl, setInstagramUrl] = useState("");
  const [xUrl, setXUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          const u = data.user;
          setDisplayName(u.displayName || "");
          setBio(u.bio || "");
          setAccentColor(u.accentColor || "#f97316");
          setAvatarUrl(u.avatarUrl || "");
          setBannerUrl(u.bannerUrl || "");
          setInstagramUrl(u.instagramUrl || "");
          setXUrl(u.xUrl || "");
          setYoutubeUrl(u.youtubeUrl || "");
          setTiktokUrl(u.tiktokUrl || "");
        }
      } catch (err) {
        console.error("Failed to load profile details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "avatar" | "banner") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB.");
      return;
    }

    if (type === "avatar") setUploadingAvatar(true);
    else setUploadingBanner(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", type === "avatar" ? "avatars" : "banners");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        if (type === "avatar") setAvatarUrl(data.url);
        else setBannerUrl(data.url);
      } else {
        setError(data.error || `Failed to upload ${type}.`);
      }
    } catch (err) {
      console.error(`Error uploading ${type}:`, err);
      setError(`Failed to upload ${type}.`);
    } finally {
      if (type === "avatar") setUploadingAvatar(false);
      else setUploadingBanner(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName,
          bio,
          accentColor,
          avatarUrl,
          bannerUrl,
          instagramUrl: instagramUrl.trim(),
          xUrl: xUrl.trim(),
          youtubeUrl: youtubeUrl.trim(),
          tiktokUrl: tiktokUrl.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Profile appearance updated successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error saving profile details:", err);
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const presetColors = [
    "#f97316", // Plugd Orange (default)
    "#ef4444", // Red
    "#ec4899", // Pink
    "#8b5cf6", // Purple
    "#3b82f6", // Blue
    "#10b981", // Emerald Green
    "#eab308", // Yellow
    "#71717a", // Zinc Grey
  ];

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 py-2 font-sans max-w-3xl">
      <div>
        <h1 className="text-3xl font-black text-zinc-100 tracking-tight">Appearance</h1>
        <p className="text-zinc-400 text-sm mt-1.5 font-normal">
          Customize your public profile page aesthetics and social links.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Details Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-zinc-200">Profile Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Display Name */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Display Name *</label>
              <input
                type="text"
                placeholder="e.g. Ravi Shankar"
                className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                maxLength={50}
                required
              />
            </div>

            {/* Bio */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Bio (Tell supporters what you're building)</label>
              <textarea
                placeholder="e.g. Building things on the internet. Here's what I'm working toward."
                rows={4}
                className="w-full bg-zinc-950 border border-zinc-850 rounded-xl p-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors font-medium resize-none leading-relaxed"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={300}
              />
              <p className="text-[10px] text-zinc-500 text-right">{bio.length}/300 characters</p>
            </div>
          </div>
        </div>

        {/* Visual Assets Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-zinc-200">Page Visuals</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Avatar Upload */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Profile Avatar</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-zinc-950 border border-zinc-850 flex items-center justify-center text-zinc-500 overflow-hidden shrink-0">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-zinc-700" />
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      disabled={uploadingAvatar}
                      className="px-4 py-2 bg-zinc-800 border border-zinc-700/50 hover:bg-zinc-750 text-zinc-200 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      {uploadingAvatar ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      Upload
                    </button>
                    {avatarUrl && (
                      <button
                        type="button"
                        onClick={() => setAvatarUrl("")}
                        className="p-2 bg-zinc-950 border border-zinc-850 hover:border-red-500/20 text-zinc-500 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-500">Square images work best (JPEG, PNG, WEBP)</span>
                </div>
              </div>
              <input 
                type="file" 
                ref={avatarInputRef}
                onChange={(e) => handleImageUpload(e, "avatar")}
                className="hidden" 
                accept="image/*"
              />
            </div>

            {/* Banner Upload */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Cover Banner</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-center text-zinc-500 overflow-hidden shrink-0">
                  {bannerUrl ? (
                    <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-zinc-700" />
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => bannerInputRef.current?.click()}
                      disabled={uploadingBanner}
                      className="px-4 py-2 bg-zinc-800 border border-zinc-700/50 hover:bg-zinc-750 text-zinc-200 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      {uploadingBanner ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      Upload
                    </button>
                    {bannerUrl && (
                      <button
                        type="button"
                        onClick={() => setBannerUrl("")}
                        className="p-2 bg-zinc-950 border border-zinc-850 hover:border-red-500/20 text-zinc-500 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-500">Wide banner (16:9 or similar ratio)</span>
                </div>
              </div>
              <input 
                type="file" 
                ref={bannerInputRef}
                onChange={(e) => handleImageUpload(e, "banner")}
                className="hidden" 
                accept="image/*"
              />
            </div>
          </div>

          {/* Accent Color picker */}
          <div className="space-y-3 pt-4 border-t border-zinc-850">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-zinc-400" />
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Page Accent Color</label>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Preset buttons */}
              {presetColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setAccentColor(color)}
                  className={`w-9 h-9 rounded-full relative transition-transform active:scale-95 cursor-pointer ${
                    accentColor === color ? "scale-110 ring-2 ring-zinc-100" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}

              {/* Custom color picker */}
              <div className="flex items-center gap-2 border border-zinc-850 bg-zinc-950 p-2 rounded-xl h-9 ml-2">
                <input 
                  type="color" 
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-5 h-5 bg-transparent border-0 rounded cursor-pointer shrink-0"
                />
                <span className="text-[11px] font-bold text-zinc-400 font-sans tracking-wide uppercase">{accentColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-zinc-200">Social Connections</h2>
          <p className="text-xs text-zinc-500 -mt-2 leading-relaxed">Add links to your social channels. These will display as neat icons in your page hero.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Instagram */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <InstagramIcon className="w-4 h-4 text-zinc-500" />
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Instagram Profile Link</label>
              </div>
              <input
                type="url"
                placeholder="https://instagram.com/yourprofile"
                className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
              />
            </div>

            {/* X / Twitter */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <TwitterIcon className="w-4 h-4 text-zinc-500" />
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">X (Twitter) Profile Link</label>
              </div>
              <input
                type="url"
                placeholder="https://x.com/yourprofile"
                className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                value={xUrl}
                onChange={(e) => setXUrl(e.target.value)}
              />
            </div>

            {/* YouTube */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <YoutubeIcon className="w-4 h-4 text-zinc-500" />
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">YouTube Channel Link</label>
              </div>
              <input
                type="url"
                placeholder="https://youtube.com/@yourchannel"
                className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
            </div>

            {/* TikTok */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 flex-row">
                <span className="text-xs font-bold text-zinc-500">🎵</span>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1.5">TikTok Profile Link</label>
              </div>
              <input
                type="url"
                placeholder="https://tiktok.com/@yourprofile"
                className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-zinc-100 placeholder:text-zinc-700 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                value={tiktokUrl}
                onChange={(e) => setTiktokUrl(e.target.value)}
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500 font-semibold">{error}</p>
        )}
        {success && (
          <p className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> {success}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="h-14 px-8 bg-orange-500 text-black font-extrabold rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors disabled:opacity-40 text-sm cursor-pointer shadow-lg shadow-orange-500/10"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin text-black" />
          ) : (
            "Save Appearance Settings"
          )}
        </button>
      </form>
    </div>
  );
}
