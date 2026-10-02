"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MoodSelector from "@/components/MoodSelector";
import CheckoutModal from "@/components/CheckoutModal";
import { getMoodById } from "@/lib/experiences";

export default function ForHimPage() {
  const [selectedMood, setSelectedMood] = useState("romantic");
  const [modalOpen, setModalOpen] = useState(false);

  const moodObj = getMoodById(selectedMood, "him");

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-rose-500 selection:text-white overflow-x-hidden">
      {/* Subtle ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[450px] w-full max-w-4xl rounded-full bg-gradient-to-b from-amber-500/10 via-rose-600/5 to-transparent blur-3xl"
      />

      {/* Navigation Header */}
      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-5 py-6 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </Link>

        <span className="text-[12px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
          plugd
        </span>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1 text-xs font-mono text-rose-300 hover:text-rose-200 transition"
        >
          <span>$2.99</span>
          <span className="text-zinc-600">/</span>
          <span>Get Link →</span>
        </button>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 mx-auto max-w-5xl px-5 pt-4 pb-20 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/10 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-zinc-300">
              <span className="text-sm">👨</span>
              <span>For Your Man</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.03em] text-white leading-[1.08]">
                Get this for your man.
              </h1>
              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                Choose the mood. We&apos;ll make the site.
              </p>
            </div>

            {/* Price & Primary CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="group inline-flex h-12 sm:h-13 items-center justify-center gap-2 rounded-full bg-white px-7 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-black shadow-xl shadow-rose-950/20 transition hover:bg-zinc-200 active:scale-[0.98]"
              >
                <span>GET IT FOR HIM — $2.99</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pl-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Instant private link • No app required</span>
              </div>
            </div>

            {/* Core Flow */}
            <div className="pt-8 border-t border-white/10 space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                BUY → SEND → WATCH WHAT HAPPENS
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-zinc-300">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <span className="font-mono text-xs text-rose-400 block mb-1">01</span>
                  <span className="font-medium text-white block">Pick the mood.</span>
                  <span className="text-zinc-500 text-xs mt-0.5 block">Hype, romantic, or chaotic.</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <span className="font-mono text-xs text-rose-400 block mb-1">02</span>
                  <span className="font-medium text-white block">Get private link.</span>
                  <span className="text-zinc-500 text-xs mt-0.5 block">$2.99 one-time.</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <span className="font-mono text-xs text-rose-400 block mb-1">03</span>
                  <span className="font-medium text-white block">Send it to him.</span>
                  <span className="text-zinc-500 text-xs mt-0.5 block">He clicks thinking it&apos;s a meme.</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <span className="font-mono text-xs text-rose-400 block mb-1">04</span>
                  <span className="font-medium text-white block">He loses his mind.</span>
                  <span className="text-zinc-500 text-xs mt-0.5 block">Screenshots it immediately.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Mood Selection Section */}
          <div className="lg:col-span-6 w-full">
            <MoodSelector
              target="him"
              selectedMood={selectedMood}
              onSelectMood={(m) => setSelectedMood(m)}
            />
          </div>
        </div>

        {/* Storytelling Banner */}
        <section className="mt-20 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 mb-2">
            The Surprise
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal">
            No guy ever expects someone to send them a whole website.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed font-light max-w-xl mx-auto">
            Instead of a dry &ldquo;good morning&rdquo; text, you drop a link to a private,
            custom interactive experience. Watch him figure out that someone made it for him.
          </p>

          <div className="mt-8">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-xs font-semibold uppercase tracking-[0.14em] text-black shadow-lg hover:bg-zinc-200 transition active:scale-[0.98]"
            >
              <span>GET IT FOR HIM — $2.99</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-zinc-500 font-mono">
        One tiny thing. Send it to someone you like.
      </footer>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        target="him"
        mood={selectedMood}
      />
    </div>
  );
}
