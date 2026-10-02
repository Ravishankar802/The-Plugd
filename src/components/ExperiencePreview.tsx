"use client";

import { useState } from "react";
import { Sparkles, Check, Heart, Flame } from "lucide-react";

interface ExperiencePreviewProps {
  target: "her" | "him";
}

export default function ExperiencePreview({ target }: ExperiencePreviewProps) {
  const [selectedOption, setSelectedOption] = useState<number>(0);

  const herOptions = [
    {
      icon: "🍷",
      title: "Dinner date — anywhere I point at",
      desc: "Zero budget arguments. You pick me up, open the door, and pay.",
    },
    {
      icon: "💆‍♀️",
      title: "30-minute uninterrupted massage",
      desc: "Shoulders and back. Hands cannot stop before timer rings.",
    },
    {
      icon: "👑",
      title: "Admit I was 100% right",
      desc: "Look me dead in the eye and say 'You were right, I was wrong.'",
    },
    {
      icon: "🍿",
      title: "Cancel all plans tonight",
      desc: "Stay in bed, warm takeout, and watch whatever show I pick.",
    },
  ];

  const himOptions = [
    {
      icon: "🏎️",
      title: "Late night drive — just us",
      desc: "Windows cracked, favorite playlist, no questions about where we're going.",
    },
    {
      icon: "🍕",
      title: "Homemade feast of my choice",
      desc: "I pick my comfort food, you cook it with love, zero complaints.",
    },
    {
      icon: "🎮",
      title: "2 hours of guilt-free peace",
      desc: "Gaming or doing whatever without any side-eye or chores.",
    },
    {
      icon: "😴",
      title: "No-talking recharge night",
      desc: "Takeout in bed, total quiet, just unwinding together.",
    },
  ];

  const options = target === "her" ? herOptions : himOptions;
  const partnerTitle = target === "her" ? "her" : "him";
  const recipientRole = target === "her" ? "Her view on mobile" : "His view on mobile";

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Phone container */}
      <div className="relative rounded-[32px] border border-white/15 bg-gradient-to-b from-[#141418] via-[#0f0f13] to-[#09090b] p-5 sm:p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        {/* Phone Notch/Header preview indicator */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>{recipientRole}</span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">
            /g/private-link
          </span>
        </div>

        {/* Content Inside Mockup */}
        <div className="mt-5 space-y-4">
          <div className="space-y-1">
            <p className="text-[11px] font-mono uppercase tracking-widest text-rose-400">
              {target === "her" ? "One Unrestricted Pass" : "Guilt-Free Coupon"}
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
              {target === "her"
                ? "Pick your demand for tonight."
                : "Choose your reward for tonight."}
            </h3>
            <p className="text-xs text-zinc-400">
              {target === "her"
                ? "He has to agree. Tap one to lock it in."
                : "She granted this to you. Tap one to claim."}
            </p>
          </div>

          {/* Option list */}
          <div className="space-y-2.5 pt-1">
            {options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left rounded-2xl p-3 sm:p-3.5 transition-all duration-200 border ${
                    isSelected
                      ? "border-rose-500/80 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.15)]"
                      : "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="text-xl sm:text-2xl shrink-0 mt-0.5">
                        {opt.icon}
                      </span>
                      <div>
                        <p
                          className={`text-xs sm:text-sm font-medium ${
                            isSelected ? "text-rose-100" : "text-zinc-200"
                          }`}
                        >
                          {opt.title}
                        </p>
                        <p className="mt-0.5 text-[11px] text-zinc-400 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`h-4 w-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-rose-500 bg-rose-500 text-white"
                          : "border-zinc-700"
                      }`}
                    >
                      {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Simulated Lock In button */}
          <div className="pt-2">
            <div className="w-full rounded-xl bg-white/[0.08] border border-white/10 py-2.5 text-center text-[11px] font-mono uppercase tracking-widest text-zinc-300">
              {target === "her"
                ? "Tap to lock in & text him →"
                : "Tap to lock in & text her →"}
            </div>
          </div>
        </div>

        {/* Ambient bottom glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 h-20 w-3/4 rounded-full bg-rose-500/10 blur-xl"
        />
      </div>

      <p className="mt-3 text-center text-[11px] text-zinc-500 font-mono">
        (Interactive preview: tap the cards above)
      </p>
    </div>
  );
}
