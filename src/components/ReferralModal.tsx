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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-[480px] max-h-[90vh] md:max-h-[85vh] bg-white dark:bg-[#1a1a1a] rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-border flex flex-col animate-in fade-in zoom-in duration-300 overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 hover:bg-accent rounded-full transition-all text-muted hover:text-foreground z-50 border border-transparent hover:border-border"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-8 md:px-12 pt-12 pb-10">
          
          {/* Top Decorative Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#f97316]/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-20 h-20 bg-[#f97316]/10 rounded-3xl flex items-center justify-center border border-[#f97316]/20">
                <Gift className="w-10 h-10 text-[#f97316]" strokeWidth={1.5} />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-[#f97316] animate-bounce" />
            </div>
          </div>

          {/* Typography */}
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-[1.85rem] font-[800] text-foreground tracking-tight leading-[1.1]">
              Join Plugd&apos;s <br /> Referral Program
            </h2>
            <p className="text-[1.05rem] text-[#f97316] font-bold tracking-tight">
              Earn $1 for every builder you refer
            </p>
          </div>

          {/* Clean Left-Aligned List (Mercor Style) */}
          <div className="space-y-6 mb-10 max-w-[320px] mx-auto">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-accent/50 flex items-center justify-center shrink-0 border border-border group-hover:border-[#f97316]/30 transition-colors">
                <LinkIcon className="w-5 h-5 text-foreground/70" />
              </div>
              <p className="text-foreground font-semibold text-[1.05rem]">Share your referral link</p>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-accent/50 flex items-center justify-center shrink-0 border border-border group-hover:border-[#f97316]/30 transition-colors">
                <DollarSign className="w-5 h-5 text-foreground/70" />
              </div>
              <p className="text-foreground font-semibold text-[1.05rem]">Get paid for each referral</p>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-accent/50 flex items-center justify-center shrink-0 border border-border group-hover:border-[#f97316]/30 transition-colors">
                <Infinity className="w-5 h-5 text-foreground/70" />
              </div>
              <p className="text-foreground font-semibold text-[1.05rem]">Unlimited earning potential</p>
            </div>
          </div>

          {/* Stat Boxes (Mercor inspired clean bordered cards) */}
          <div className="grid grid-cols-2 gap-3 mb-10">
            <div className="bg-white dark:bg-[#1a1a1a] border border-border rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm">
              <span className="text-[0.65rem] text-muted font-bold uppercase tracking-[0.1em] mb-2 text-center leading-tight">
                if you refer <br /> 1,000 builders
              </span>
              <span className="text-[1.75rem] font-[900] text-foreground tracking-tighter">$1,000</span>
            </div>
            
            <div className="bg-white dark:bg-[#1a1a1a] border border-border rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm">
              <span className="text-[0.65rem] text-muted font-bold uppercase tracking-[0.1em] mb-2 text-center leading-tight">
                top referrers <br /> could earn
              </span>
              <span className="text-[1.75rem] font-[900] text-foreground tracking-tighter">$10,000+</span>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="space-y-4">
            <button
              onClick={onJoin}
              className="w-full bg-[#f97316] text-white font-[800] text-[1.1rem] py-[18px] rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-[#f97316]/90 active:scale-[0.98] shadow-xl shadow-orange-500/20"
            >
              <span>Join now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-[0.85rem] text-muted font-medium opacity-60">
              No upfront cost. No commitment.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
