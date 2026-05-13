"use client";

import { X, TrendingUp, DollarSign, Zap, ArrowRight, Gift } from "lucide-react";

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
      
      <div className="relative w-full max-w-lg bg-pill border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-border flex items-center justify-between bg-pill z-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-selected/10 flex items-center justify-center border border-selected/20">
              <Gift className="w-6 h-6 text-selected" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground tracking-tight">Join Plugd&apos;s Referral Program</h2>
              <p className="text-sm text-muted mt-0.5 font-medium">Share your link. Earn $1 every time someone gets listed.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-all text-muted hover:text-foreground border border-transparent hover:border-border">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8 space-y-8 bg-pill">
          
          {/* Steps */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-foreground border border-border">1</div>
              <p className="text-foreground font-medium">Share your referral link</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-foreground border border-border">2</div>
              <p className="text-foreground font-medium">Earn $1 per successful referral</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-foreground border border-border">3</div>
              <p className="text-foreground font-medium">Unlimited earning potential</p>
            </div>
          </div>

          {/* Stats boxes */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-accent/30 border border-border rounded-xl p-5 text-center">
              <p className="text-2xl font-bold text-foreground tracking-tight">$1,000</p>
              <p className="text-[0.7rem] text-muted font-bold uppercase tracking-wider mt-1">if you refer 1,000 builders</p>
            </div>
            <div className="bg-accent/30 border border-border rounded-xl p-5 text-center">
              <p className="text-2xl font-bold text-foreground tracking-tight">$10,000+</p>
              <p className="text-[0.7rem] text-muted font-bold uppercase tracking-wider mt-1">top referrers could earn</p>
            </div>
          </div>

          {/* Action */}
          <button
            onClick={onJoin}
            className="w-full bg-[#f97316] text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-[#f97316]/90 active:scale-[0.98] shadow-lg shadow-orange-500/10"
          >
            Join now <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
