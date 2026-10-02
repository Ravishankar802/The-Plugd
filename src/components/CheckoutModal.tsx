"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Lock, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { getMoodById } from "@/lib/experiences";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  target: "her" | "him";
  mood: string;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  target,
  mood,
}: CheckoutModalProps) {
  const router = useRouter();
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentMood = getMoodById(mood, target);
  const targetTitle = target === "her" ? "her" : "him";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target,
          mood,
          recipientName: recipientName.trim(),
          senderName: senderName.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Payment initialization failed.");
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else if (data.redirectUrl) {
        router.push(data.redirectUrl);
      } else {
        router.push(`/order/${data.slug}`);
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f13] p-6 sm:p-8 shadow-2xl text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute right-5 top-5 rounded-full p-2 text-zinc-400 hover:bg-white/5 hover:text-white transition"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider text-rose-300">
            <span>{currentMood.emoji}</span>
            <span>{currentMood.name} Experience</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
            Unlock for {targetTitle}
          </h2>
          <p className="text-xs text-zinc-400 font-light">
            We will generate the complete private mini-site. No account needed.
          </p>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
              {target === "her" ? "Her name or nickname" : "His name or nickname"}{" "}
              <span className="text-zinc-600">(optional)</span>
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder={target === "her" ? "e.g. Maya, babe" : "e.g. Leo, babe"}
              maxLength={40}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-rose-500/60 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
              Your name or nickname <span className="text-zinc-600">(optional)</span>
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g. your person"
              maxLength={40}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-rose-500/60 focus:outline-none focus:ring-1 focus:ring-rose-500/50"
            />
          </div>

          {/* Experience summary card */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-zinc-400 uppercase tracking-wider text-[10px]">
                Selected site
              </span>
              <span className="text-rose-300 font-medium">
                {currentMood.name}
              </span>
            </div>
            <p className="text-xs text-zinc-400 italic">
              &ldquo;{currentMood.summary}&rdquo;
            </p>
          </div>

          {/* Price breakdown pill */}
          <div className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/5 px-4 py-3 text-xs">
            <span className="text-zinc-400">Total charge</span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-base font-semibold text-white">
                $2.99
              </span>
              <span className="text-[10px] text-zinc-500 uppercase">USD</span>
            </div>
          </div>

          {/* CTA */}
          <button
            type="submit"
            disabled={loading}
            className="group mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-black shadow-lg hover:bg-zinc-200 active:scale-[0.99] transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-black" />
                <span>Generating mini-site...</span>
              </>
            ) : (
              <>
                <span>Get private link — $2.99</span>
                <ArrowRight className="h-4 w-4 text-zinc-800 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Security badge */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 font-mono">
          <Lock className="h-3 w-3" />
          <span>One-time purchase • Instant shareable link</span>
        </div>
      </div>
    </div>
  );
}
