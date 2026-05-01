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
  Plus
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
  { name: "Other", icon: Plus },
];

const FOLLOWERS_RANGES = [
  "0 - 100", "100 - 500", "500 - 1K", "1K - 5K", "5K - 10K", "10K+"
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
        niche: formData.niches, // This will be the array
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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-[#111111] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Header - Fixed */}
        <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between bg-[#111111] z-20 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white">Add Your Account</h2>
            <p className="text-sm text-gray-400 mt-1">Get discovered by X builders, founders and creators.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[0.9rem] font-semibold text-gray-200">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. John Doe"
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-700 transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* X Username */}
            <div className="space-y-2">
              <label className="text-[0.9rem] font-semibold text-gray-200">X Username</label>
              <input
                required
                type="text"
                placeholder="@username"
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-700 transition-all"
                value={formData.xHandle}
                onChange={(e) => handleXHandleChange(e.target.value)}
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[0.9rem] font-semibold text-gray-200">One-line Bio</label>
                <span className={`text-[0.75rem] ${formData.bio.length > 100 ? "text-red-500" : "text-gray-500"}`}>
                  {formData.bio.length}/100
                </span>
              </div>
              <input
                required
                maxLength={100}
                type="text"
                placeholder="Founder | Building in public | Shipping daily"
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-700 transition-all"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>

            {/* Niche - Multi Select with Icons */}
            <div className="space-y-4">
              <label className="text-[0.9rem] font-semibold text-gray-200">Categories (Multi-select)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {NICHES.map((niche) => {
                  const Icon = niche.icon;
                  const isSelected = formData.niches.includes(niche.name);
                  return (
                    <button
                      key={niche.name}
                      type="button"
                      onClick={() => toggleNiche(niche.name)}
                      className={`flex items-center gap-3 p-3 rounded-xl text-sm transition-all border text-left ${
                        isSelected 
                          ? "bg-white text-black border-white font-semibold shadow-lg" 
                          : "bg-[#1a1a1a] text-gray-400 border-[#2a2a2a] hover:border-gray-600 hover:text-white"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${isSelected ? "bg-black/10" : "bg-[#111111]"}`}>
                        <Icon size={16} />
                      </div>
                      <span>{niche.name}</span>
                      {isSelected && <Check className="ml-auto w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Followers Range */}
            <div className="space-y-4">
              <label className="text-[0.9rem] font-semibold text-gray-200">Followers Range</label>
              <div className="flex flex-wrap gap-2">
                {FOLLOWERS_RANGES.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setFormData({ ...formData, followersRange: range })}
                    className={`py-2 px-4 rounded-xl text-sm transition-all border ${
                      formData.followersRange === range 
                        ? "bg-white text-black border-white font-semibold shadow-lg" 
                        : "bg-[#1a1a1a] text-gray-400 border-[#2a2a2a] hover:border-gray-600 hover:text-white"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Picture */}
            <div className="space-y-4">
              <label className="text-[0.9rem] font-semibold text-gray-200">Profile Picture</label>
              <div className="flex items-center gap-5">
                <div className="relative">
                  {previewUrl ? (
                    <div className="relative w-14 h-14">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#2a2a2a]"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors border-2 border-[#111111]"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[#1a1a1a] border-2 border-[#2a2a2a] border-dashed flex items-center justify-center">
                      <Upload className="w-6 h-6 text-gray-700" />
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
                    className="bg-[#1a1a1a] border border-[#2a2a2a] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:border-gray-600 transition-all flex items-center gap-2 shadow-sm"
                  >
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    Upload
                  </button>
                  <p className="text-[0.75rem] text-gray-500 mt-2 font-medium">JPG, PNG or WebP. Max 2MB.</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[0.9rem] font-semibold text-gray-200">Email</label>
              <input
                required
                type="email"
                placeholder="you@example.com"
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-700 transition-all"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <p className="text-[0.75rem] text-gray-500 font-medium">We&apos;ll only use this email for your receipt. It won&apos;t be shown publicly.</p>
            </div>

            {/* Confirmation Checkbox */}
            <div className="flex items-start gap-4 pt-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, confirmed: !formData.confirmed })}
                className={`mt-1 w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                  formData.confirmed 
                    ? "bg-white border-white text-black shadow-lg" 
                    : "bg-[#1a1a1a] border-[#2a2a2a] hover:border-gray-600"
                }`}
              >
                {formData.confirmed && <Check className="w-4 h-4" />}
              </button>
              <label 
                className="text-sm text-gray-400 cursor-pointer select-none leading-relaxed"
                onClick={() => setFormData({ ...formData, confirmed: !formData.confirmed })}
              >
                I confirm this information is accurate and belongs to me.
              </label>
            </div>

            {/* Bottom Spacing for fixed button */}
            <div className="h-10" />
          </form>
        </div>

        {/* Submit Button - Fixed at bottom */}
        <div className="p-6 border-t border-[#2a2a2a] bg-[#111111] z-20 shrink-0">
          <button
            disabled={!isFormValid || isLoading}
            type="button"
            onClick={(e) => {
              const form = document.querySelector('form');
              if (form) form.requestSubmit();
            }}
            className="w-full bg-white text-black font-bold py-4 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-gray-100 shadow-xl active:scale-[0.98]"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay $1 to Get Listed"}
          </button>
          <p className="text-center text-[0.7rem] text-gray-500 mt-4 font-medium uppercase tracking-wider">
            Secure payment via Dodo Payments
          </p>
        </div>
        
      </div>
    </div>
  );
}
