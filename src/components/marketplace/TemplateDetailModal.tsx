"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ArrowRight, Sparkles, Check, Lock, Smartphone, Share2, Eye } from "lucide-react";
import { Template } from "@/lib/templates";
import TemplatePreviewArt from "./TemplatePreviewArt";

interface TemplateDetailModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onUnlock: (template: Template) => void;
}

export default function TemplateDetailModal({
  template,
  isOpen,
  onClose,
  onUnlock,
}: TemplateDetailModalProps) {
  if (!isOpen || !template) return null;

  const targetLabel =
    template.target === "her"
      ? "For Her"
      : template.target === "him"
      ? "For Him"
      : "For Anyone";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="relative my-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f13] text-zinc-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-30 rounded-full bg-black/60 p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Large Immersive Preview */}
        <div className="relative w-full border-b border-white/10">
          <TemplatePreviewArt template={template} size="large" />
        </div>

        {/* Product Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header & Price Banner */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-rose-300">
                  {template.mood}
                </span>
                <span className="rounded-full bg-white/[0.04] border border-white/10 px-2.5 py-0.5 font-mono text-[10px] text-zinc-400">
                  {targetLabel}
                </span>
                <span className="rounded-full bg-white/[0.04] border border-white/10 px-2.5 py-0.5 font-mono text-[10px] text-zinc-400">
                  {template.style} Style
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                {template.name}
              </h2>
              <p className="font-serif italic text-sm sm:text-base text-zinc-300 font-light">
                &ldquo;{template.tagline}&rdquo;
              </p>
            </div>

            {/* Price & Primary CTA */}
            <div className="flex flex-col sm:items-end gap-2 text-left sm:text-right shrink-0">
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-2xl font-semibold text-white">$2.99</span>
                <span className="font-mono text-xs text-zinc-500 uppercase">USD</span>
              </div>

              <button
                onClick={() => onUnlock(template)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-xs font-semibold uppercase tracking-[0.14em] text-black shadow-lg hover:bg-zinc-200 active:scale-[0.98] transition"
              >
                <span>OWN THIS TEMPLATE FOREVER</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <span className="font-mono text-[10px] text-zinc-500">
                Pay once · Unlimited sends · Zero subscription
              </span>
            </div>
          </div>

          {/* Description & Mechanics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-2">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-zinc-400">
                About The Experience
              </h3>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                {template.description}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-zinc-400">
                What The Recipient Sees
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300 font-light">
                <li className="flex items-start gap-2">
                  <Smartphone className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>A borderless, full-bleed interactive website on their phone.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Kinetic 3D canvas physics, subtle touch triggers, and starlight.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Share2 className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>Single-tap response directly back to your iMessage / WhatsApp.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How It Works Row */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-left">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-rose-400">01</span>
                <p className="text-xs font-medium text-white">Buy Once</p>
                <p className="text-[11px] text-zinc-500 font-light">$2.99 permanent ownership</p>
              </div>
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-rose-400">02</span>
                <p className="text-xs font-medium text-white">Generate Link</p>
                <p className="text-[11px] text-zinc-500 font-light">Create new links anytime</p>
              </div>
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-rose-400">03</span>
                <p className="text-xs font-medium text-white">Send Forever</p>
                <p className="text-[11px] text-zinc-500 font-light">Zero recurring charges</p>
              </div>
            </div>
          </div>

          {/* Bottom Link to Full Page */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-1">
            <Link
              href={`/t/${template.slug}`}
              className="text-zinc-400 hover:text-white transition flex items-center gap-1"
            >
              <span>View full template page →</span>
            </Link>

            <span>Curated by {template.creator}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
