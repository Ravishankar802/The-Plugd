"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, Link as LinkIcon, DollarSign, Infinity, Gift, Sparkles, Loader2, Mail } from "lucide-react";
import { useTheme } from "next-themes";

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string | null;
}

export default function ReferralModal({ isOpen, onClose, userEmail }: ReferralModalProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: userEmail || "",
    xHandle: "",
    payoutMethod: "PayPal" as "PayPal" | "UPI",
    payoutDetails: ""
  });

  useEffect(() => {
    setMounted(true);
    if (userEmail) {
      setFormData(prev => ({ ...prev, email: userEmail }));
    }
  }, [userEmail]);

  if (!isOpen) return null;

  // Use resolvedTheme to handle 'system' preference
  const currentTheme = mounted ? resolvedTheme : 'dark';
  const isDark = currentTheme === 'dark';

  const handleJoin = async () => {
    // Admin Bypass Check
    const adminEmail = "ravx003@gmail.com";
    if (userEmail === adminEmail) {
      setLoading(true);
      try {
        const res = await fetch("/api/referral/join-admin", { method: "POST" });
        if (res.ok) {
          window.location.reload();
          return;
        }
      } catch (err) {
        console.error("Admin bypass failed:", err);
      }
      setLoading(false);
    }

    if (!showEmailInput) {
      setShowEmailInput(true);
      return;
    }

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.payoutDetails.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    setLoading(true);
    
    // Clean X Handle
    let handle = formData.xHandle.trim();
    if (handle.startsWith("@")) handle = handle.substring(1);

    // Hardcoded URL format as requested by user
    const redirectUrl = 'https://the-plugd.vercel.app/dashboard';
    const baseUrl = 'https://www.checkout.dodopayments.com/buy/pdt_0NejIjx2mdXJSOgzLprt5';
    
    const params = new URLSearchParams({
      quantity: '1',
      redirect_url: redirectUrl,
      showDiscounts: 'false',
      customer_email: formData.email,
      metadata_type: 'promoter',
      metadata_name: formData.name,
      metadata_email: formData.email,
      metadata_xHandle: handle,
      metadata_payoutMethod: formData.payoutMethod,
      metadata_payoutDetails: formData.payoutDetails
    });

    const checkoutUrl = `${baseUrl}?${params.toString()}`;
    console.log("DODO_DEBUG: Constructed Checkout URL:", checkoutUrl);
    window.location.href = checkoutUrl;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div 
        style={{ 
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
          color: isDark ? '#ffffff' : '#000000',
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        }}
        className="relative w-full max-w-[540px] rounded-[24px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border flex flex-col animate-in fade-in zoom-in duration-300 overflow-hidden"
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          style={{ color: isDark ? '#a1a1aa' : '#666666' }}
          className="absolute top-4 right-4 p-1.5 hover:bg-accent rounded-full transition-all z-50"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Area */}
        <div className={`px-8 pt-10 pb-8 flex flex-col items-center max-h-[90vh] overflow-y-auto no-scrollbar`}>
          
          {/* Top Decorative Icon */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="absolute -inset-2 bg-[#f97316]/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-12 h-12 bg-[#f97316]/10 rounded-2xl flex items-center justify-center border border-[#f97316]/20">
                <Gift className="w-6 h-6 text-[#f97316]" strokeWidth={1.5} />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-[#f97316] animate-bounce" />
            </div>
          </div>

          {/* Typography */}
          <div className="text-center space-y-1.5 mb-7">
            <h2 className="text-[1.5rem] font-[800] tracking-tight leading-[1.1]">
              Join Plugd&apos;s Referral Program
            </h2>
            <p className="text-[0.95rem] text-[#f97316] font-bold tracking-tight">
              Refer your network to join Plugd and earn $1 for every successful referral.
            </p>
          </div>

          {showEmailInput ? (
            <div className="w-full space-y-5 mb-7 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[0.7rem] font-bold text-muted uppercase tracking-wider ml-1">Full Name</label>
                  <input 
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ backgroundColor: isDark ? '#262626' : '#f9f9f9', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', color: isDark ? '#ffffff' : '#000000' }}
                    className="w-full border rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#f97316] transition-all text-[0.95rem]"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[0.7rem] font-bold text-muted uppercase tracking-wider ml-1">Email</label>
                  <input 
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ backgroundColor: isDark ? '#262626' : '#f9f9f9', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', color: isDark ? '#ffffff' : '#000000' }}
                    className="w-full border rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#f97316] transition-all text-[0.95rem]"
                  />
                </div>

                {/* X Handle */}
                <div className="space-y-1.5">
                  <label className="text-[0.7rem] font-bold text-muted uppercase tracking-wider ml-1">X Handle</label>
                  <input 
                    type="text"
                    placeholder="@yourhandle"
                    value={formData.xHandle}
                    onChange={(e) => setFormData({ ...formData, xHandle: e.target.value })}
                    style={{ backgroundColor: isDark ? '#262626' : '#f9f9f9', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', color: isDark ? '#ffffff' : '#000000' }}
                    className="w-full border rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#f97316] transition-all text-[0.95rem]"
                  />
                </div>

                {/* Payout Method Toggle */}
                <div className="space-y-1.5">
                  <label className="text-[0.7rem] font-bold text-muted uppercase tracking-wider ml-1">Payout Method</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, payoutMethod: "PayPal" })}
                      className={`flex-1 py-3 rounded-xl border font-bold transition-all ${
                        formData.payoutMethod === "PayPal" 
                        ? "bg-[#f97316] text-white border-[#f97316]" 
                        : "bg-transparent text-muted border-border hover:bg-accent"
                      }`}
                    >
                      PayPal
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, payoutMethod: "UPI" })}
                      className={`flex-1 py-3 rounded-xl border font-bold transition-all ${
                        formData.payoutMethod === "UPI" 
                        ? "bg-[#f97316] text-white border-[#f97316]" 
                        : "bg-transparent text-muted border-border hover:bg-accent"
                      }`}
                    >
                      UPI
                    </button>
                  </div>
                </div>

                {/* Payout Details */}
                <div className="space-y-1.5">
                  <label className="text-[0.7rem] font-bold text-muted uppercase tracking-wider ml-1">Payout Details</label>
                  <input 
                    type="text"
                    placeholder={formData.payoutMethod === "PayPal" ? "Your PayPal email" : "Your UPI ID (e.g. name@upi)"}
                    value={formData.payoutDetails}
                    onChange={(e) => setFormData({ ...formData, payoutDetails: e.target.value })}
                    style={{ backgroundColor: isDark ? '#262626' : '#f9f9f9', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', color: isDark ? '#ffffff' : '#000000' }}
                    className="w-full border rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#f97316] transition-all text-[0.95rem]"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 mb-7 max-w-[280px] mx-auto">
              <div className="flex items-center gap-3">
                <div 
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-border"
                >
                  <LinkIcon className="w-4 h-4" style={{ color: isDark ? '#ffffff' : '#000000' }} />
                </div>
                <p className="font-semibold text-[0.95rem]">Share your referral link</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div 
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-border"
                >
                  <DollarSign className="w-4 h-4" style={{ color: isDark ? '#ffffff' : '#000000' }} />
                </div>
                <p className="font-semibold text-[0.95rem]">Get paid for each referral</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div 
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-border"
                >
                  <Infinity className="w-4 h-4" style={{ color: isDark ? '#ffffff' : '#000000' }} />
                </div>
                <p className="font-semibold text-[0.95rem]">Unlimited earning potential</p>
              </div>
            </div>
          )}

          {/* Stat Boxes */}
          {!showEmailInput && (
            <div className="grid grid-cols-2 gap-3 mb-7 w-full">
              <div 
                style={{ 
                  backgroundColor: isDark ? '#262626' : '#f9f9f9',
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }}
                className="border rounded-xl p-4 flex flex-col items-center justify-center space-y-0.5 shadow-sm"
              >
                <span style={{ color: isDark ? '#a1a1aa' : '#666666' }} className="text-[0.6rem] font-bold uppercase tracking-[0.05em] text-center leading-tight">
                  if you refer <br /> 1,000 builders
                </span>
                <span className="text-[1.35rem] font-[900] tracking-tighter">$1,000</span>
              </div>
              
              <div 
                style={{ 
                  backgroundColor: isDark ? '#262626' : '#f9f9f9',
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }}
                className="border rounded-xl p-4 flex flex-col items-center justify-center space-y-0.5 shadow-sm"
              >
                <span style={{ color: isDark ? '#a1a1aa' : '#666666' }} className="text-[0.6rem] font-bold uppercase tracking-[0.05em] text-center leading-tight">
                  top referrers <br /> could earn
                </span>
                <span className="text-[1.35rem] font-[900] tracking-tighter">$10,000+</span>
              </div>
            </div>
          )}

          {/* Primary CTA */}
          <div className="w-full">
            <button
              onClick={handleJoin}
              disabled={loading}
              className="w-full bg-[#f97316] text-white font-[800] text-[1rem] py-[14px] rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-[#f97316]/90 active:scale-[0.98] shadow-lg shadow-orange-500/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <span>{showEmailInput ? "Continue to Payment" : "Join now for $1"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
