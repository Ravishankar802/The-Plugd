"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, Link as LinkIcon, DollarSign, Infinity, Gift, Sparkles, Loader2, Mail } from "lucide-react";

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string | null;
}

export default function ReferralModal({ isOpen, onClose, userEmail }: ReferralModalProps) {
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail);
    }
  }, [userEmail]);

  if (!isOpen) return null;

  const handleJoin = async () => {
    // If not logged in and email input not shown yet, show it
    if (!userEmail && !showEmailInput) {
      setShowEmailInput(true);
      return;
    }

    // Validate email if input is shown
    if (showEmailInput && (!email || !email.includes("@"))) {
      alert("Please enter a valid email to continue.");
      return;
    }

    setLoading(true);
    
    // Redirect to Dodo Checkout
    const productId = process.env.NEXT_PUBLIC_DODO_PROMOTER_PRODUCT_ID || "pdt_0NejlJx2mdXJSOgzLprt5";
    const checkoutUrl = `https://checkout.dodopayments.com/buy/${productId}?quantity=1&redirect_url=${encodeURIComponent('https://the-plugd.vercel.app/dashboard')}&customer_email=${encodeURIComponent(email)}&metadata_type=promoter&metadata_email=${encodeURIComponent(email)}`;
    
    window.location.href = checkoutUrl;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-[540px] bg-white dark:bg-[#1a1a1a] rounded-[24px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-border flex flex-col animate-in fade-in zoom-in duration-300 overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1.5 hover:bg-accent rounded-full transition-all text-muted hover:text-foreground z-50"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Area */}
        <div className="px-8 pt-10 pb-8 flex flex-col items-center">
          
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
            <h2 className="text-[1.5rem] font-[800] text-foreground tracking-tight leading-[1.1]">
              Join Plugd&apos;s Referral Program
            </h2>
            <p className="text-[0.95rem] text-[#f97316] font-bold tracking-tight">
              Refer your network to join Plugd and earn $1 for every successful referral.
            </p>
          </div>

          {showEmailInput ? (
            <div className="w-full space-y-4 mb-7 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  type="email"
                  placeholder="Enter your email to join"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-4 text-foreground focus:outline-none focus:border-[#f97316] transition-all"
                  autoFocus
                />
              </div>
              <p className="text-[0.75rem] text-muted text-center font-medium">
                We&apos;ll use this email to create your promoter account and track earnings.
              </p>
            </div>
          ) : (
            <div className="space-y-4 mb-7 max-w-[280px] mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/50 flex items-center justify-center shrink-0 border border-border">
                  <LinkIcon className="w-4 h-4 text-foreground/70" />
                </div>
                <p className="text-foreground font-semibold text-[0.95rem]">Share your referral link</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/50 flex items-center justify-center shrink-0 border border-border">
                  <DollarSign className="w-4 h-4 text-foreground/70" />
                </div>
                <p className="text-foreground font-semibold text-[0.95rem]">Get paid for each referral</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/50 flex items-center justify-center shrink-0 border border-border">
                  <Infinity className="w-4 h-4 text-foreground/70" />
                </div>
                <p className="text-foreground font-semibold text-[0.95rem]">Unlimited earning potential</p>
              </div>
            </div>
          )}

          {/* Stat Boxes */}
          {!showEmailInput && (
            <div className="grid grid-cols-2 gap-3 mb-7 w-full">
              <div className="bg-white dark:bg-card border border-border rounded-xl p-4 flex flex-col items-center justify-center space-y-0.5 shadow-sm">
                <span className="text-[0.6rem] text-muted font-bold uppercase tracking-[0.05em] text-center leading-tight">
                  if you refer <br /> 1,000 builders
                </span>
                <span className="text-[1.35rem] font-[900] text-foreground tracking-tighter">$1,000</span>
              </div>
              
              <div className="bg-white dark:bg-card border border-border rounded-xl p-4 flex flex-col items-center justify-center space-y-0.5 shadow-sm">
                <span className="text-[0.6rem] text-muted font-bold uppercase tracking-[0.05em] text-center leading-tight">
                  top referrers <br /> could earn
                </span>
                <span className="text-[1.35rem] font-[900] text-foreground tracking-tighter">$10,000+</span>
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
