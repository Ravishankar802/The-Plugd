"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Copy, Share2, MessageCircle, ExternalLink, Sparkles } from "lucide-react";
import { getMoodById } from "@/lib/experiences";

interface OrderSuccessClientProps {
  gift: {
    slug: string;
    target: string;
    mood?: string;
    recipientName: string | null;
    senderName: string | null;
    customNote: string | null;
  };
}

export default function OrderSuccessClient({ gift }: OrderSuccessClientProps) {
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("https://theplugd.com");
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
      if (typeof navigator.share === "function") {
        setCanShare(true);
      }
    }
  }, []);

  const shareUrl = `${origin}/g/${gift.slug}`;
  const isHer = gift.target === "her";
  const targetLabel = isHer ? "her" : "him";
  const moodObj = getMoodById(gift.mood || "romantic", isHer ? "her" : "him");

  const defaultMessage = isHer
    ? `I made you a tiny website. Open this on your phone: ${shareUrl}`
    : `I made you a tiny website. Open this on your phone right now: ${shareUrl}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "I made you a website",
          text: defaultMessage,
          url: shareUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  }

  const whatsappHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    defaultMessage
  )}`;
  const smsHref = `sms:?&body=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col items-center justify-between px-5 py-8 sm:px-8 sm:py-12 selection:bg-rose-500 selection:text-white">
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-80 w-[90vw] max-w-xl rounded-full bg-gradient-to-b from-rose-500/15 via-amber-500/5 to-transparent blur-3xl"
      />

      {/* Brand */}
      <header className="relative z-10 w-full flex justify-between items-center max-w-md">
        <Link
          href="/"
          className="text-[12px] font-mono tracking-[0.2em] text-zinc-500 uppercase hover:text-white transition"
        >
          plugd
        </Link>
        <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          Site Live
        </span>
      </header>

      {/* Main Success Container */}
      <main className="relative z-10 w-full max-w-md my-auto py-8 text-center space-y-6">
        {/* Success Eyebrow */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono text-emerald-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{moodObj.name} Site Unlocked</span>
        </div>

        {/* Core Headlines */}
        <div className="space-y-2">
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-white tracking-tight">
            Your site is ready.
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Send it to {isHer ? "her" : "him"}.
          </p>
        </div>

        {/* Link Card Box */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md space-y-3.5 text-left shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
              YOUR PRIVATE LINK
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              {gift.recipientName ? `For ${gift.recipientName}` : "Ready to open"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 rounded-xl bg-black/50 border border-white/10 px-3.5 py-3">
            <span className="font-mono text-xs text-rose-300 truncate select-all">
              {shareUrl}
            </span>
          </div>

          {/* Primary Action: Copy Link */}
          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 active:scale-[0.98] ${
              copied
                ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                : "bg-white text-black hover:bg-zinc-200 shadow-lg"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 stroke-[2.5]" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>COPY LINK</span>
              </>
            )}
          </button>

          {/* Secondary Quick Share Actions */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {canShare ? (
              <button
                onClick={handleNativeShare}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] py-2.5 px-3 text-xs font-mono text-zinc-300 hover:border-white/30 hover:bg-white/[0.05] transition"
              >
                <Share2 className="h-3.5 w-3.5 text-zinc-400" />
                <span>Share sheet</span>
              </button>
            ) : (
              <a
                href={smsHref}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] py-2.5 px-3 text-xs font-mono text-zinc-300 hover:border-white/30 hover:bg-white/[0.05] transition"
              >
                <MessageCircle className="h-3.5 w-3.5 text-zinc-400" />
                <span>iMessage</span>
              </a>
            )}

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] py-2.5 px-3 text-xs font-mono text-zinc-300 hover:border-white/30 hover:bg-white/[0.05] transition"
            >
              <span className="text-emerald-400">💬</span>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* The Instructions */}
        <div className="space-y-1 pt-2">
          <p className="font-serif text-2xl text-white font-normal">
            {isHer ? "Send it to her." : "Send it to him."}
          </p>
          <p className="text-xs text-zinc-400 font-light">
            Don&apos;t over-explain. Just send the link and let {targetLabel} open it.
          </p>
        </div>

        {/* Preview Link */}
        <div className="pt-2">
          <Link
            href={`/g/${gift.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition"
          >
            <span>Preview the experience</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center pb-2">
        <p className="text-xs text-zinc-500 font-mono">
          One tiny thing. Send it to someone you like.
        </p>
      </footer>
    </div>
  );
}
