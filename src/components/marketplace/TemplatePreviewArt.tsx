"use client";

import { Template } from "@/lib/templates";
import { Sparkles, Eye, Lock } from "lucide-react";

interface TemplatePreviewArtProps {
  template: Template;
  size?: "large" | "medium" | "compact";
  interactive?: boolean;
}

export default function TemplatePreviewArt({
  template,
  size = "medium",
}: TemplatePreviewArtProps) {
  const { previewDesign } = template;

  const isLarge = size === "large";
  const isCompact = size === "compact";

  return (
    <div
      className={`relative w-full overflow-hidden select-none transition-all duration-500 ${
        isLarge
          ? "aspect-[16/10] sm:aspect-[16/9]"
          : isCompact
          ? "aspect-[16/10]"
          : "aspect-[16/10]"
      } ${previewDesign.background}`}
    >
      {/* Dynamic ambient radial light glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-1/3 -right-1/4 h-[120%] w-[120%] rounded-full bg-gradient-to-br ${previewDesign.glow} blur-3xl opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700`}
      />

      {/* Subtle micro-grid or grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Miniature Browser / Device Header Pill */}
      <div className="absolute top-3.5 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/20 group-hover:bg-rose-400 transition-colors" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
          <span className="ml-2 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
            plugd.me/{template.slug}
          </span>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] border border-white/10 px-2 py-0.5 font-mono text-[9px] text-zinc-400 backdrop-blur-sm">
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: previewDesign.accentColor }}
          />
          <span>{previewDesign.tag}</span>
        </span>
      </div>

      {/* Core Artwork / Mini Digital Experience Simulation */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-6 pt-11 sm:p-7 sm:pt-12 text-left">
        {/* Subtle Silhouette / Geometric Art Pattern */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {previewDesign.pattern === "ember" && (
            <div className="relative w-48 h-48 opacity-30 group-hover:opacity-50 transition-opacity duration-700">
              <div className="absolute inset-0 rounded-full border border-rose-500/20 animate-[spin_25s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-red-500/30 animate-[spin_18s_linear_infinite_reverse]" />
              <div className="absolute inset-10 rounded-full bg-gradient-to-br from-rose-600/20 to-transparent blur-md" />
            </div>
          )}

          {previewDesign.pattern === "mesh" && (
            <div className="relative w-64 h-64 opacity-25 group-hover:opacity-45 transition-opacity duration-700">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-rose-600/40 blur-2xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-28 h-28 rounded-full bg-amber-500/30 blur-2xl" />
            </div>
          )}

          {previewDesign.pattern === "grid" && (
            <div className="w-full h-full flex flex-col justify-center items-center opacity-20 group-hover:opacity-35 transition-opacity">
              <div className="border border-white/10 w-3/4 h-3/4 flex items-center justify-center p-4">
                <div className="border border-white/15 w-full h-full" />
              </div>
            </div>
          )}

          {previewDesign.pattern === "stars" && (
            <div className="relative w-full h-full opacity-40">
              <span className="absolute top-1/3 left-1/4 h-1 w-1 rounded-full bg-blue-300 animate-ping" />
              <span className="absolute top-1/2 right-1/3 h-1.5 w-1.5 rounded-full bg-indigo-200" />
              <span className="absolute bottom-1/3 left-1/2 h-1 w-1 rounded-full bg-white/60" />
            </div>
          )}
        </div>

        {/* Center Editorial Visual Typography */}
        <div className="my-auto space-y-2 z-10">
          <div className="space-y-1">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-400">
              {template.mood}
            </p>
            <h2
              className={`font-serif tracking-tight text-white transition-transform duration-500 group-hover:scale-[1.02] ${
                isLarge
                  ? "text-3xl sm:text-4xl md:text-5xl"
                  : "text-2xl sm:text-3xl"
              }`}
            >
              {previewDesign.headline}
            </h2>
          </div>

          <p className="font-serif italic text-xs sm:text-sm text-zinc-300/90 font-light max-w-xs leading-relaxed">
            &ldquo;{previewDesign.subtext}&rdquo;
          </p>
        </div>

        {/* Bottom Floating Interactive Element Mockup */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <div className="h-5 w-5 rounded-full border border-black/40 bg-zinc-800 flex items-center justify-center text-[8px] font-mono text-zinc-300">
                You
              </div>
              <div
                className="h-5 w-5 rounded-full border border-black/40 flex items-center justify-center text-[8px] font-mono text-black font-semibold"
                style={{ backgroundColor: previewDesign.accentColor }}
              >
                ✦
              </div>
            </div>
            <span className="font-mono text-[10px] text-zinc-400">
              1-Tap Interactive Site
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-black/60 border border-white/10 px-2.5 py-1 text-[10px] font-mono text-zinc-300 backdrop-blur-md">
            <span>$2.99</span>
            <span className="text-zinc-600">·</span>
            <span className="text-rose-300 font-medium">Own Forever</span>
          </div>
        </div>
      </div>

      {/* Subtle bottom gradient shadow to guarantee card legibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
    </div>
  );
}
