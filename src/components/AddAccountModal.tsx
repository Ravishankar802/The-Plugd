"use client";

import { useState, useRef, useEffect } from "react";
// Deployment timestamp: 2026-05-02T00:43:00Z
import { 
  X, 
  Loader2, 
  Trash2, 
  Upload, 
  Check,
  Plus,
  User
} from "lucide-react";
import { NICHES } from "@/lib/constants";
import { useRouter } from "next/navigation";

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const FOLLOWERS_RANGES = [
  "0-100", "100-500", "500-1K", "1K-2K", "2K-5K", "5K-10K", "10K-25K", "25K-50K", "50K-100K", "100K+"
];

export default function AddAccountModal({ isOpen, onClose }: AddAccountModalProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    xHandle: "",
    bio: "",
    niches: [] as string[],
    followersRange: "",
    avatarUrl: "",
    email: "",
    confirmed: false
  });
  const [success, setSuccess] = useState(false);

  const userEmailFromStorage = typeof window !== "undefined" ? (localStorage.getItem('plugd_user_email') || localStorage.getItem('userEmail')) : null;
  const isAdmin = userEmailFromStorage === process.env.NEXT_PUBLIC_ADMIN_EMAIL;


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


  const handleSubmit = async () => {
    // 1. Validate
    if (!formData.name || !formData.xHandle || !formData.niches.length || !formData.email || !formData.confirmed) {
      alert("Please fill in all fields and confirm.");
      return;
    }

    setIsLoading(true);

    try {
      // 2. Save account to DB
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-user-email": userEmailFromStorage || ""
        },
        body: JSON.stringify({ 
          name: formData.name, 
          handle: formData.xHandle.replace(/^@+/, ''), // Strip leading @
          bio: formData.bio,
          category: formData.niches, 
          followersRange: formData.followersRange,
          email: formData.email, 
          avatarUrl: formData.avatarUrl, 
          status: isAdmin ? "paid" : "pending_payment" 
        }),
      });
      const data = await res.json();
      const accountId = data.accountId || data.id; // Support both

      console.log("accountId:", accountId);

      if (!accountId) {
        alert(data.error || "Something went wrong. Please try again.");
        setIsLoading(false);
        return;
      }

      if (isAdmin) {
        setSuccess(true);
        setIsLoading(false);
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 2000);
      } else {
        // 4. Redirect to Dodo checkout with accountId in metadata
        const checkoutUrl = `https://checkout.dodopayments.com/buy/pdt_0NduKJ5KdWe8CXogjNol1?quantity=1&redirect_url=${encodeURIComponent('https://the-plugd.vercel.app/dashboard/login?verified=true')}&showDiscounts=false&customer_email=${encodeURIComponent(formData.email)}&metadata_accountId=${accountId}`;
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
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
          <div className="px-8 py-8 space-y-7">
            
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
                      {Icon && <Icon size={16} className={isSelected ? "text-selected-foreground" : "text-muted"} />}
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

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#111] border border-border flex items-center justify-center shadow-inner shrink-0 mt-1">
                {formData.avatarUrl ? (
                  <img 
                    src={formData.avatarUrl} 
                    alt="preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="flex items-center justify-center w-full h-full"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user text-muted/40"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>';
                    }}
                  />
                ) : (
                  <User size={20} className="text-muted/40" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-[1rem] font-[500] text-foreground tracking-wide block">Profile Picture URL</label>
                <input
                  type="text"
                  placeholder="https://pbs.twimg.com/profile_images/..."
                  className="w-full bg-background border border-border rounded-xl px-5 py-4 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-muted transition-all"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                />
                <p className="text-[0.75rem] text-muted font-medium">Right click your X profile picture → Copy image address → paste it here</p>
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
              <button
                disabled={isLoading || success}
                onClick={handleSubmit}
                className="w-full bg-white border border-white text-black font-black text-base py-5 rounded-xl transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-2.5 hover:bg-white/90 shadow-2xl active:scale-[0.99] uppercase tracking-wider"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isAdmin ? "Add Account Directly" : "Pay $1 to Get Listed")}
              </button>
              
              {success && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center gap-3 animate-in fade-in slide-in-from-top-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <p className="text-green-500 text-sm font-bold">
                    Account listed successfully! It&apos;s now live on Plugd.
                  </p>
                </div>
              )}

              {!isAdmin && (
                <p className="text-center text-[0.7rem] text-muted mt-5 font-bold uppercase tracking-[0.15em]">
                  Secure payment via Dodo Payments
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Optional or empty since button is now inside */}
        <div className="px-8 py-2 border-t border-border bg-pill z-20 shrink-0 hidden md:block" />
        
      </div>
    </div>
  );
}
