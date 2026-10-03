"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, Smartphone, Share2, Check, Lock } from "lucide-react";
import { Template } from "@/lib/templates";
import TemplatePreviewArt from "./TemplatePreviewArt";
import CheckoutModal from "@/components/CheckoutModal";

interface TemplateDetailPageClientProps {
  template: Template;
}

export default function TemplateDetailPageClient({
  template,
}: TemplateDetailPageClientProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const targetLabel =
    template.target === "her"
      ? "For Her"
      : template.target === "him"
      ? "For Him"
      : "For Anyone";

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-rose-500 selection:text-white">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[450px] w-full max-w-4xl rounded-full bg-gradient-to-b from-rose-500/10 via-rose-600/5 to-transparent blur-3xl"
      />

      {/* Navigation Header */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8 border-b border-white/10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Marketplace</span>
        </Link>

        <span className="text-[12px] font-mono tracking-[0.2em] text-zinc-500 uppercase font-bold">
          plugd
        </span>

        <Link
          href="/my-templates"
          className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition"
        >
          My Templates
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-6xl px-5 pt-8 pb-20 sm:px-8 space-y-12">
        {/* Large Immersive Preview Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <TemplatePreviewArt template={template} size="large" />
        </div>

        {/* Product Details Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-white/10 pb-10">
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-rose-300">
                {template.mood}
              </span>
              <span className="rounded-full bg-white/[0.04] border border-white/10 px-3 py-1 font-mono text-[11px] text-zinc-300">
                {targetLabel}
              </span>
              <span className="rounded-full bg-white/[0.04] border border-white/10 px-3 py-1 font-mono text-[11px] text-zinc-300">
                {template.style} Style
              </span>
              <span className="font-mono text-xs text-zinc-500 ml-1">
                By {template.creator}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white">
              {template.name}
            </h1>

            <p className="font-serif italic text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">
              &ldquo;{template.tagline}&rdquo;
            </p>

            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed pt-2">
              {template.description}
            </p>
          </div>

          {/* Pricing & Checkout Card */}
          <div className="lg:col-span-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md space-y-5 text-left shadow-2xl">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block">
                  Price
                </span>
                <span className="font-mono text-3xl font-semibold text-white">
                  $2.99
                </span>
                <span className="font-mono text-xs text-zinc-500 uppercase ml-1">
                  USD
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                OWN FOREVER
              </span>
            </div>

            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Buy this template once. You own permanent access to generate unlimited private shareable links whenever you want.
            </p>

            <button
              onClick={() => setModalOpen(true)}
              className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-xs font-semibold uppercase tracking-[0.14em] text-black shadow-lg hover:bg-zinc-200 active:scale-[0.98] transition"
            >
              <span>OWN THIS TEMPLATE FOREVER</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="border-t border-white/5 pt-4 space-y-2 text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Unlimited sends to anyone</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Zero monthly subscription fees</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Mobile-optimized full-bleed site</span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Details & What Recipient Sees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-rose-300">
              <Smartphone className="h-4 w-4" />
              <span>Full-Bleed Canvas</span>
            </div>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              Opens instantly in their browser with borderless continuous 3D canvas physics and zero clutter. No app or download required.
            </p>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-rose-300">
              <Sparkles className="h-4 w-4" />
              <span>Tactile Interactions</span>
            </div>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              Subtle press-and-hold triggers, starlight gravity, and guaranteed 100% text contrast across all phone screens.
            </p>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-rose-300">
              <Share2 className="h-4 w-4" />
              <span>1-Tap Direct Response</span>
            </div>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              When they finish opening the site, a single tap fires their reaction directly back to your iMessage or WhatsApp.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-zinc-500 font-mono">
        Plugd Experience Marketplace · One purchase. Unlimited sends.
      </footer>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        target={template.target === "him" ? "him" : "her"}
        mood={template.id}
      />
    </div>
  );
}
