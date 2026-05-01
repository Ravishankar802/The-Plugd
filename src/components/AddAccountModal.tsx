"use client";

import { useState, useRef, useEffect } from "react";
import { 
  X, 
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
import { useRouter } from "next/navigation";

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export default function AddAccountModal({ isOpen, onClose }: AddAccountModalProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [avatarPath, setAvatarPath] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    xHandle: "",
    bio: "",
    niches: [] as string[],
    followersRange: "",
    email: "",
    confirmed: false
  });

  const isFormValid = 
    formData.name.trim() !== "" &&
    formData.xHandle.trim() !== "" &&
    formData.bio.trim() !== "" &&
    formData.niches.length > 0 &&
    formData.followersRange !== "" &&
    formData.email.trim() !== "" &&
    formData.confirmed &&
    avatarPath !== "";

  if (!isOpen) return null;

  const handleXHandleChange = (val: string) => {
    let cleaned = val.trim();
    if (cleaned !== "" && !cleaned.startsWith("@")) {
      cleaned = "@" + cleaned;
    }
    setFormData({ ...formData, xHandle: cleaned });
  };

  const toggleNiche = (nicheName: string) => {
    setFormData(prev => {
      const current = prev.niches;
      if (current.includes(nicheName)) {
        return { ...prev, niches: current.filter(n => n !== nicheName) };
      } else {
        return { ...prev, niches: [...current, nicheName] };
      }
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File is too large. Max 2MB.");
      return;
    }

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
        setAvatarPath(data.filePath);
        setPreviewUrl(URL.createObjectURL(file));
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setAvatarPath("");
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsLoading(true);

    try {
      const xHandleToStore = formData.xHandle.startsWith("@") 
        ? formData.xHandle.substring(1) 
        : formData.xHandle;

      const submissionData = {
        name: formData.name,
        xHandle: xHandleToStore,
        bio: formData.bio,
        niche: formData.niches,
        followersRange: formData.followersRange,
        email: formData.email,
        avatarPath
      };

      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!res.ok) throw new Error("Failed to create account");
      const { accountId } = await res.json();

      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId }),
      });

      if (!checkoutRes.ok) throw new Error("Failed to create checkout session");
      const { url } = await checkoutRes.json();

      window.location.href = url;
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
        
        {/* Header - Fixed */}
        <div className="px-8 py-6 border-b border-[#2a2a2a] flex items-center justify-between bg-[#1c1c1c] z-20 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Add Your Account</h2>
            <p className="text-sm text-[#a1a1aa] mt-1 font-medium">Get discovered by X builders, founders and creators.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#2a2a2a] rounded-full transition-all text-[#a1a1aa] hover:text-white border border-transparent hover:border-[#3f3f46]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#1c1c1c]">
          <form onSubmit={handleSubmit} id="add-account-form" className="px-8 py-8 space-y-7">
            
            {/* Full Name */}
            <div className="flex flex-col gap-3">
              <label className="text-[1rem] font-bold text-gray-200 tracking-wide block">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. John Doe"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-600 transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* X Username */}
            <div className="flex flex-col gap-3">
              <label className="text-[1rem] font-bold text-gray-200 tracking-wide block">X Username</label>
              <input
                required
                type="text"
                placeholder="@username"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-600 transition-all"
                value={formData.xHandle}
                onChange={(e) => handleXHandleChange(e.target.value)}
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="text-[1rem] font-bold text-gray-200 tracking-wide block">One-line Bio</label>
                <span className={`text-[0.75rem] font-mono ${formData.bio.length > 100 ? "text-red-500" : "text-gray-500"}`}>
                  {formData.bio.length}/100
                </span>
              </div>
              <input
                required
                maxLength={100}
                type="text"
                placeholder="Founder | Building in public | Shipping daily"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-600 transition-all"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>

            {/* Niche - Compact Select with Icons */}
            <div className="flex flex-col gap-3">
              <label className="text-[1rem] font-bold text-gray-200 tracking-wide block">Niche</label>
              <div className="flex flex-wrap gap-2.5">
                {NICHES.map((niche) => {
                  const Icon = niche.icon;
                  const isSelected = formData.niches.includes(niche.name);
                  return (
                    <button
                      key={niche.name}
                      type="button"
                      onClick={() => toggleNiche(niche.name)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm transition-all border ${
                        isSelected 
                          ? "bg-white text-black border-white font-bold shadow-lg shadow-white/5" 
                          : "bg-[#0f0f0f] text-[#a1a1aa] border-[#2a2a2a] hover:border-[#3f3f46] hover:text-white"
                      }`}
                    >
                      <Icon size={16} className={isSelected ? "text-black" : "text-[#71717a]"} />
                      <span>{niche.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Followers Range - Compact pills */}
            <div className="flex flex-col gap-3">
              <label className="text-[1rem] font-bold text-gray-200 tracking-wide block">Followers Range</label>
              <div className="flex flex-wrap gap-2.5">
                {FOLLOWERS_RANGES.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setFormData({ ...formData, followersRange: range })}
                    className={`px-4 py-2.5 rounded-xl text-sm transition-all border ${
                      formData.followersRange === range 
                        ? "bg-white text-black border-white font-bold shadow-lg shadow-white/5" 
                        : "bg-[#0f0f0f] text-[#a1a1aa] border-[#2a2a2a] hover:border-[#3f3f46] hover:text-white"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Picture */}
            <div className="flex flex-col gap-3">
              <label className="text-[1rem] font-bold text-gray-200 tracking-wide block">Profile Picture</label>
              <div className="flex items-center gap-6">
                <div className="relative shrink-0">
                  {previewUrl ? (
                    <div className="relative w-16 h-16">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#2a2a2a] shadow-xl"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1.5 shadow-lg hover:bg-red-700 transition-colors border-2 border-[#1c1c1c]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[#0f0f0f] border-2 border-[#2a2a2a] border-dashed flex items-center justify-center group hover:border-[#3f3f46] transition-colors">
                      <Upload className="w-7 h-7 text-[#3f3f46] group-hover:text-[#71717a] transition-colors" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="bg-[#0f0f0f] border border-[#2a2a2a] text-white px-6 py-3.5 rounded-xl text-sm font-bold hover:border-[#3f3f46] transition-all flex items-center gap-2.5 shadow-sm active:scale-[0.98]"
                  >
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    Upload
                  </button>
                  <p className="text-[0.75rem] text-[#71717a] mt-2.5 font-medium tracking-tight">JPG, PNG or WebP. Max 2MB.</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-3">
              <label className="text-[1rem] font-bold text-gray-200 tracking-wide block">Email</label>
              <input
                required
                type="email"
                placeholder="you@example.com"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-5 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-600 transition-all"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <p className="text-[0.75rem] text-[#71717a] font-medium leading-relaxed">We&apos;ll only use this email for your receipt. It won&apos;t be shown publicly.</p>
            </div>

            {/* Confirmation Checkbox */}
            <div className="flex items-start gap-4 pt-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, confirmed: !formData.confirmed })}
                className={`mt-1 w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                  formData.confirmed 
                    ? "bg-white border-white text-black shadow-lg shadow-white/5" 
                    : "bg-[#0f0f0f] border-[#2a2a2a] hover:border-[#3f3f46]"
                }`}
              >
                {formData.confirmed && <Check className="w-4 h-4 text-black" />}
              </button>
              <label 
                className="text-[0.95rem] text-[#a1a1aa] cursor-pointer select-none leading-relaxed hover:text-gray-300 transition-colors font-medium"
                onClick={() => setFormData({ ...formData, confirmed: !formData.confirmed })}
              >
                I confirm this information is accurate and belongs to me.
              </label>
            </div>

          </form>
        </div>

        {/* Submit Button - Fixed at bottom */}
        <div className="px-8 py-8 border-t border-[#2a2a2a] bg-[#1c1c1c] z-20 shrink-0">
          <button
            disabled={!isFormValid || isLoading}
            type="submit"
            form="add-account-form"
            className="w-full bg-white text-black font-black text-base py-5 rounded-xl transition-all disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-2.5 hover:bg-gray-100 shadow-2xl active:scale-[0.99] uppercase tracking-wider"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay $1 to Get Listed"}
          </button>
          <p className="text-center text-[0.7rem] text-[#52525b] mt-5 font-bold uppercase tracking-[0.15em]">
            Secure payment via Dodo Payments
          </p>
        </div>
        
      </div>
    </div>
  );
}
