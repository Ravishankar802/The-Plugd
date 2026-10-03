"use client";

import { Sparkles, ArrowRight } from "lucide-react";
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
    <div className="w-full max-w-lg mx-auto space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-rose-400">
            {headerTitle}
          </p>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            $2.99 • Own forever
          </span>
        </div>
        <p className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">
          Choose the template. Own it forever.
        </p>
      </div>

      {/* Sexy High-End Editorial Mood Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
        {moods.map((mood, idx) => {
          const isSelected = selectedMood === mood.id;
          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => onSelectMood(mood.id)}
              className={`group relative overflow-hidden rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 border ${
                isSelected
                  ? "border-rose-500 bg-gradient-to-br from-rose-950/40 via-black to-[#09090c] shadow-[0_0_35px_rgba(244,63,94,0.22)] scale-[1.01]"
                  : "border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent hover:border-white/25 hover:bg-white/[0.06]"
              } active:scale-[0.98]`}
            >
              {/* Subtle Ambient Radial Highlight on Selected */}
              {isSelected && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full bg-rose-500/25 blur-2xl"
                />
              )}

              <div className="relative z-10 flex items-start justify-between">
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 group-hover:text-zinc-400 transition-colors">
                  0{idx + 1}
                </span>
                <span
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    isSelected
                      ? "bg-rose-500 shadow-[0_0_10px_#f43f5e] scale-125"
                      : "bg-zinc-700 group-hover:bg-zinc-500"
                  }`}
                />
              </div>

              {/* Bold Editorial Typography */}
              <div className="relative z-10 mt-6 sm:mt-8 space-y-1">
                <h3
                  className={`text-sm sm:text-base font-serif font-normal tracking-wide uppercase leading-tight transition-colors duration-200 ${
                    isSelected ? "text-white" : "text-zinc-200 group-hover:text-white"
                  }`}
                >
                  {mood.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-400 font-light leading-snug line-clamp-2">
                  {mood.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Vibe Teaser Bar */}
      <div className="rounded-2xl border border-rose-500/20 bg-gradient-to-r from-rose-950/30 via-black to-black p-4 flex items-center justify-between backdrop-blur-md">
        <div className="space-y-0.5 text-left">
          <p className="text-xs font-medium text-rose-200 flex items-center gap-1.5 font-mono uppercase tracking-wider text-[11px]">
            <Sparkles className="h-3 w-3 text-rose-400" />
            <span>{currentMood.name} DESIGNER TEMPLATE</span>
          </p>
          <p className="text-xs text-zinc-400 font-light">
            {currentMood.vibe}
          </p>
        </div>
      </div>
    </div>
  );
}
