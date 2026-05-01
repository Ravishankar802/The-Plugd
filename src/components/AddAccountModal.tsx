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
    
    // Set preview immediately for better UX
    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(localPreviewUrl);

    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body
      });
      
      if (!res.ok) throw new Error("Upload failed");
      
      const data = await res.json();
      if (data.filePath) {
        setAvatarPath(data.filePath);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
      setPreviewUrl(null);
      setAvatarPath("");
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
    console.log("handleSubmit triggered", { isFormValid, isLoading });
    
    if (!isFormValid) {
      console.log("Form is invalid", formData, avatarPath);
      return;
    }
    
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

      console.log("Saving submission...", submissionData);

      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create account");
      }
      
      const responseData = await res.json();
      const accountId = responseData.accountId;

      console.log("Account created, redirecting to payment...", accountId);

      // Build the Dodo Payments URL
      const dodoBaseUrl = "https://checkout.dodopayments.com/buy/pdt_0NduKJ5KdWe8CXogjNol1";
      const origin = typeof window !== "undefined" ? window.location.origin : "https://the-plugd.vercel.app";
      const redirectUrl = encodeURIComponent(`${origin}/dashboard?email=${formData.email}`);
      
      const checkoutUrl = `${dodoBaseUrl}?quantity=1&showDiscounts=false&redirect_url=${redirectUrl}&customer_email=${formData.email}&metadata_accountId=${accountId}`;

      window.location.href = checkoutUrl;
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-pill border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
        
        {/* Header - Fixed */}
        <div className="px-8 py-6 border-b border-border flex items-center justify-between bg-pill z-20 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-foreground tracking-tight">Add Your Account</h2>
            <p className="text-sm text-muted mt-1 font-medium">Get discovered by X builders, founders and creators.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-all text-muted hover:text-foreground border border-transparent hover:border-border">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-pill">
          <form onSubmit={handleSubmit} id="add-account-form" className="px-8 py-8 space-y-7">
            
            {/* Full Name */}
            <div className="flex flex-col gap-3">
              <label className="text-[1rem] font-[500] text-foreground tracking-wide block">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. John Doe"
                className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-muted transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* X Username */}
            <div className="flex flex-col gap-3">
              <label className="text-[1rem] font-[500] text-foreground tracking-wide block">X Username</label>
              <input
                required
                type="text"
                placeholder="@username"
                className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-muted transition-all"
                value={formData.xHandle}
                onChange={(e) => handleXHandleChange(e.target.value)}
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="text-[1rem] font-[500] text-foreground tracking-wide block">One-line Bio</label>
                <span className={`text-[0.75rem] font-mono ${formData.bio.length > 100 ? "text-red-500" : "text-muted"}`}>
                  {formData.bio.length}/100
                </span>
              </div>
              <input
                required
                maxLength={100}
                type="text"
                placeholder="Founder | Building in public | Shipping daily"
                className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-muted transition-all"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>

            {/* Niche - Compact Select with Icons */}
            <div className="flex flex-col gap-3">
              <label className="text-[1rem] font-[500] text-foreground tracking-wide block">Niche</label>
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
                          ? "bg-selected text-selected-foreground border-selected font-bold shadow-lg" 
                          : "bg-background text-muted border-border hover:border-muted hover:text-foreground"
                      }`}
                    >
                      <Icon size={16} className={isSelected ? "text-selected-foreground" : "text-muted"} />
                      <span>{niche.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Followers Range - Compact pills */}
            <div className="flex flex-col gap-3">
              <label className="text-[1rem] font-[500] text-foreground tracking-wide block">Followers Range</label>
              <div className="flex flex-wrap gap-2.5">
                {FOLLOWERS_RANGES.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setFormData({ ...formData, followersRange: range })}
                    className={`px-4 py-2.5 rounded-xl text-sm transition-all border ${
                      formData.followersRange === range 
                        ? "bg-selected text-selected-foreground border-selected font-bold shadow-lg" 
                        : "bg-background text-muted border-border hover:border-muted hover:text-foreground"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Picture */}
            <div className="flex flex-col gap-3">
              <label className="text-[1rem] font-[500] text-foreground tracking-wide block">Profile Picture</label>
              <div className="flex items-center gap-6">
                <div 
                  className="relative shrink-0 cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewUrl ? (
                    <div className="relative w-16 h-16">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-16 h-16 rounded-full object-cover border-2 border-border shadow-xl group-hover:opacity-80 transition-opacity"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage();
                        }}
                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1.5 shadow-lg hover:bg-red-700 transition-colors border-2 border-pill z-30"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-background border-2 border-border border-dashed flex items-center justify-center group-hover:border-muted transition-colors">
                      <Upload className="w-7 h-7 text-muted group-hover:text-foreground transition-colors" />
                    </div>
                  )}
                  {uploading && (
                    <div className="absolute inset-0 bg-background/60 rounded-full flex items-center justify-center z-20">
                      <Loader2 className="w-6 h-6 animate-spin text-foreground" />
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
                    className="bg-background border border-border text-foreground px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-accent transition-all flex items-center gap-2.5 shadow-sm active:scale-[0.98]"
                  >
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    Upload
                  </button>
                  <p className="text-[0.75rem] text-muted mt-2.5 font-medium tracking-tight">JPG, PNG or WebP. Max 2MB.</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-3">
              <label className="text-[1rem] font-[500] text-foreground tracking-wide block">Email</label>
              <input
                required
                type="email"
                placeholder="you@example.com"
                className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-muted transition-all"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <p className="text-[0.75rem] text-muted font-medium leading-relaxed">We&apos;ll only use this email for your receipt. It won&apos;t be shown publicly.</p>
            </div>

            {/* Confirmation Checkbox */}
            <div className="flex items-start gap-4 pt-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, confirmed: !formData.confirmed })}
                className={`mt-1 w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                  formData.confirmed 
                    ? "bg-selected border-selected text-selected-foreground shadow-lg" 
                    : "bg-background border-border hover:border-muted"
                }`}
              >
                {formData.confirmed && <Check className="w-4 h-4 text-selected-foreground" />}
              </button>
              <label 
                className="text-[0.95rem] text-muted cursor-pointer select-none leading-relaxed hover:text-foreground transition-colors font-medium"
                onClick={() => setFormData({ ...formData, confirmed: !formData.confirmed })}
              >
                I confirm this information is accurate and belongs to me.
              </label>
            </div>

            {/* Submit Button inside form for better compatibility */}
            <div className="pt-4 pb-2">
              {!isFormValid && (
                <p className="text-[0.7rem] text-red-500/80 mb-3 text-center font-bold uppercase tracking-wider">
                  Please fill all fields and upload a profile picture
                </p>
              )}
              <button
                disabled={!isFormValid || isLoading}
                type="submit"
                className="w-full bg-background border border-pill-border text-foreground font-black text-base py-5 rounded-xl transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-2.5 hover:bg-accent shadow-2xl active:scale-[0.99] uppercase tracking-wider"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay $1 to Get Listed"}
              </button>
              <p className="text-center text-[0.7rem] text-muted mt-5 font-bold uppercase tracking-[0.15em]">
                Secure payment via Dodo Payments
              </p>
            </div>
          </form>
        </div>

        {/* Footer - Optional or empty since button is now inside */}
        <div className="px-8 py-2 border-t border-border bg-pill z-20 shrink-0 hidden md:block" />
        
      </div>
    </div>
  );
}
