"use client";

import { X, ArrowRight, Link as LinkIcon, DollarSign, Infinity, Sparkles } from "lucide-react";

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: () => void;
}

export default function ReferralModal({ isOpen, onClose, onJoin }: ReferralModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-[500px] bg-white dark:bg-[#1a1a1a] rounded-[24px] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300 border border-border">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 hover:bg-accent rounded-full transition-all text-muted hover:text-foreground z-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="px-10 pt-12 pb-10 flex flex-col items-center text-center">
          
          {/* Decorative Icon */}
          <div className="w-20 h-20 bg-[#f97316]/10 rounded-2xl flex items-center justify-center mb-8 animate-bounce-subtle">
            <Sparkles className="w-10 h-10 text-[#f97316]" strokeWidth={1.5} />
          </div>

          {/* Typography */}
          <div className="space-y-2 mb-10">
            <h2 className="text-[2rem] font-[800] text-foreground tracking-tight leading-tight">
              Join Plugd&apos;s Referral Program
            </h2>
            <p className="text-[1.1rem] text-[#f97316] font-bold">
              Earn $1 for every builder you refer
            </p>
          </div>

          {/* Value Props */}
          <div className="w-full space-y-5 mb-10 text-left px-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0 border border-border">
                <LinkIcon className="w-5 h-5 text-foreground" />
              </div>
              <p className="text-foreground font-semibold text-[1.05rem]">Share your referral link</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0 border border-border">
                <DollarSign className="w-5 h-5 text-foreground" />
              </div>
              <p className="text-foreground font-semibold text-[1.05rem]">Earn $1 per successful referral</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0 border border-border">
                <Infinity className="w-5 h-5 text-foreground" />
              </div>
              <p className="text-foreground font-semibold text-[1.05rem]">Unlimited earning potential</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="w-full grid grid-cols-2 gap-4 mb-10">
            <div className="bg-transparent border border-border rounded-2xl p-5 flex flex-col items-center justify-center space-y-1">
              <p className="text-[0.7rem] text-muted font-bold uppercase tracking-widest">if you refer 1,000 builders</p>
              <p className="text-[1.75rem] font-[900] text-foreground tracking-tighter">$1,000</p>
            </div>
            <div className="bg-transparent border border-border rounded-2xl p-5 flex flex-col items-center justify-center space-y-1">
              <p className="text-[0.7rem] text-muted font-bold uppercase tracking-widest">top referrers could earn</p>
              <p className="text-[1.75rem] font-[900] text-foreground tracking-tighter">$10,000+</p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onJoin}
            className="w-full bg-[#f97316] text-white font-[800] text-[1.1rem] py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-[#f97316]/90 active:scale-[0.98] shadow-xl shadow-orange-500/20"
          >
            <span>Join now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <p className="mt-6 text-[0.85rem] text-muted font-medium">
            No upfront cost. No commitment.
          </p>
        </div>

      </div>
    </div>
  );
}
