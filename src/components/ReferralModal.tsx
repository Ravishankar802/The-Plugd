"use client";

import { X, ArrowRight, Link as LinkIcon, DollarSign, Infinity, Gift, Sparkles } from "lucide-react";

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: () => void;
}

export default function ReferralModal({ isOpen, onClose, onJoin }: ReferralModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-[440px] bg-white dark:bg-[#1a1a1a] rounded-[24px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-border flex flex-col animate-in fade-in zoom-in duration-300 overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1.5 hover:bg-accent rounded-full transition-all text-muted hover:text-foreground z-50"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Area */}
        <div className="px-8 pt-10 pb-8 flex flex-col items-center">
          
          {/* Top Decorative Icon (Reduced to 40px) */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="absolute -inset-2 bg-[#f97316]/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-12 h-12 bg-[#f97316]/10 rounded-2xl flex items-center justify-center border border-[#f97316]/20">
                <Gift className="w-6 h-6 text-[#f97316]" strokeWidth={1.5} />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-[#f97316] animate-bounce" />
            </div>
          </div>

          {/* Typography (Slightly smaller) */}
          <div className="text-center space-y-1.5 mb-7">
            <h2 className="text-[1.5rem] font-[800] text-foreground tracking-tight leading-[1.1]">
              Join Plugd&apos;s Referral Program
            </h2>
            <p className="text-[0.95rem] text-[#f97316] font-bold tracking-tight">
              Earn $1 for every builder you refer
            </p>
          </div>

          {/* Clean Left-Aligned List (Reduced spacing) */}
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

          {/* Stat Boxes (Reduced padding & font) */}
          <div className="grid grid-cols-2 gap-3 mb-7 w-full">
            <div className="bg-white dark:bg-[#1a1a1a] border border-border rounded-xl p-4 flex flex-col items-center justify-center space-y-0.5">
              <span className="text-[0.6rem] text-muted font-bold uppercase tracking-[0.05em] text-center leading-tight">
                if you refer <br /> 1,000 builders
              </span>
              <span className="text-[1.35rem] font-[900] text-foreground tracking-tighter">$1,000</span>
            </div>
            
            <div className="bg-white dark:bg-[#1a1a1a] border border-border rounded-xl p-4 flex flex-col items-center justify-center space-y-0.5">
              <span className="text-[0.6rem] text-muted font-bold uppercase tracking-[0.05em] text-center leading-tight">
                top referrers <br /> could earn
              </span>
              <span className="text-[1.35rem] font-[900] text-foreground tracking-tighter">$10,000+</span>
            </div>
          </div>

          {/* Primary CTA (Reduced padding) */}
          <div className="w-full">
            <button
              onClick={onJoin}
              className="w-full bg-[#f97316] text-white font-[800] text-[1rem] py-[14px] rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-[#f97316]/90 active:scale-[0.98] shadow-lg shadow-orange-500/20"
            >
              <span>Join now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
