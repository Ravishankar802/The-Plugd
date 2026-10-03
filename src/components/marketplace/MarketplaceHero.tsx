"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface MarketplaceHeroProps {
  onExploreClick: () => void;
}

export default function MarketplaceHero({ onExploreClick }: MarketplaceHeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-20 text-center">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[90vw] max-w-4xl rounded-full bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 space-y-6">
        {/* Subtle Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/10 px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-300">
          <Sparkles className="h-3 w-3 text-rose-400" />
          <span>EXPERIENCE TEMPLATE MARKETPLACE</span>
        </div>

        {/* Confident Editorial Headline */}
        <div className="space-y-3">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-[-0.03em] text-white leading-[1.05]">
            Digital experiences <br className="hidden sm:block" />
            <span className="italic font-light text-zinc-300">worth sending.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
            Beautiful interactive templates for the person you can&apos;t stop thinking about.
          </p>
        </div>

        {/* Secondary line & Call to Actions */}
        <div className="pt-2 flex flex-col items-center gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">
            BUY ONCE · OWN FOREVER · SEND WHENEVER
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              onClick={onExploreClick}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-xs font-semibold uppercase tracking-[0.14em] text-black shadow-xl hover:bg-zinc-200 transition active:scale-[0.98]"
            >
              <span>EXPLORE TEMPLATES</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <Link
              href="/for-her"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-200 hover:border-white/30 hover:bg-white/[0.06] hover:text-white transition active:scale-[0.98]"
            >
              <span>FOR HER →</span>
            </Link>

            <Link
              href="/for-him"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-200 hover:border-white/30 hover:bg-white/[0.06] hover:text-white transition active:scale-[0.98]"
            >
              <span>FOR HIM →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
