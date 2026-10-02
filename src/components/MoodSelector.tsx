"use client";

import { Check, Sparkles } from "lucide-react";
import { Mood, MOODS_FOR_HER, MOODS_FOR_HIM } from "@/lib/experiences";

interface MoodSelectorProps {
  target: "her" | "him";
  selectedMood: string;
  onSelectMood: (moodId: string) => void;
}

export default function MoodSelector({
  target,
  selectedMood,
  onSelectMood,
}: MoodSelectorProps) {
  const moods = target === "her" ? MOODS_FOR_HER : MOODS_FOR_HIM;
  const currentMood = moods.find((m) => m.id === selectedMood) || moods[0];

  const headerTitle =
    target === "her"
      ? "WHAT DO YOU WANT TO SEND HER?"
      : "WHAT DO YOU WANT TO SEND HIM?";

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-rose-400">
            {headerTitle}
          </p>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            $2.99 / mini-site
          </span>
        </div>
        <p className="font-serif text-xl sm:text-2xl text-white font-normal">
          Choose the mood. We&apos;ll make the site.
        </p>
      </div>

      {/* Mood Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {moods.map((mood) => {
          const isSelected = selectedMood === mood.id;
          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => onSelectMood(mood.id)}
              className={`group relative flex flex-col justify-between rounded-2xl p-4 sm:p-4.5 text-left transition-all duration-200 border ${
                isSelected
                  ? "border-rose-500/80 bg-rose-500/10 shadow-[0_0_25px_rgba(244,63,94,0.18)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
              } active:scale-[0.98]`}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl sm:text-3xl transition-transform group-hover:scale-110 duration-200">
                  {mood.emoji}
                </span>
                <div
                  className={`h-4 w-4 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected
                      ? "border-rose-500 bg-rose-500 text-white"
                      : "border-zinc-700 group-hover:border-zinc-500"
                  }`}
                >
                  {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                </div>
              </div>

              <div className="mt-4 sm:mt-5 space-y-0.5">
                <span
                  className={`block text-xs sm:text-sm font-semibold tracking-wider uppercase font-mono ${
                    isSelected ? "text-white" : "text-zinc-200"
                  }`}
                >
                  {mood.name}
                </span>
                <span className="block text-[11px] sm:text-xs text-zinc-400 font-light leading-snug">
                  {mood.tagline}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Concept Teaser Box */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-transparent p-4 flex items-start gap-3 backdrop-blur-sm">
        <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0 mt-0.5">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="space-y-0.5 text-left">
          <p className="text-xs font-medium text-white flex items-center gap-1.5">
            <span>The {currentMood.name} experience</span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">
              • Pre-built
            </span>
          </p>
          <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
            {currentMood.summary}
          </p>
        </div>
      </div>
    </div>
  );
}
