"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Copy, Share2, MessageCircle, ExternalLink, Sparkles, Plus, ArrowRight, Loader2 } from "lucide-react";
import { getTemplateById } from "@/lib/templates";

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

  // New instance state
  const [activeSlug, setActiveSlug] = useState(gift.slug);
  const [activeRecipient, setActiveRecipient] = useState(gift.recipientName);
  const [showNewLinkModal, setShowNewLinkModal] = useState(false);
  const [newRecipientName, setNewRecipientName] = useState("");
  const [creatingInstance, setCreatingInstance] = useState(false);
  const [instanceSuccessMsg, setInstanceSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
      if (typeof navigator.share === "function") {
        setCanShare(true);
      }
    }
  }, []);

  const shareUrl = `${origin}/g/${activeSlug}`;
  const isHer = gift.target === "her";
  const targetLabel = isHer ? "her" : "him";
  const template = getTemplateById(gift.mood || "after-dark", isHer ? "her" : "him");

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

  async function handleCreateNewLink(e: React.FormEvent) {
    e.preventDefault();
    setCreatingInstance(true);
    setInstanceSuccessMsg(null);

    try {
      const res = await fetch("/api/customer/instance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: template.id,
          target: gift.target,
          recipientName: newRecipientName.trim(),
          senderName: gift.senderName || "",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create new link.");
      }

      setActiveSlug(data.instance.slug);
      setActiveRecipient(data.instance.recipientName);
      setNewRecipientName("");
      setShowNewLinkModal(false);
      setInstanceSuccessMsg("New link created! You can copy and send it below.");
    } catch (err: any) {
      alert(err.message || "Failed to create link.");
    } finally {
      setCreatingInstance(false);
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

      {/* Brand & Nav */}
      <header className="relative z-10 w-full flex justify-between items-center max-w-md">
        <Link
          href="/"
          className="text-[12px] font-mono tracking-[0.2em] text-zinc-500 uppercase hover:text-white transition"
        >
          plugd
        </Link>
        <Link
          href="/my-templates"
          className="text-[11px] font-mono uppercase tracking-wider text-rose-300 hover:text-white flex items-center gap-1.5 transition"
        >
          <span>My Templates →</span>
        </Link>
      </header>

      {/* Main Success Container */}
      <main className="relative z-10 w-full max-w-md my-auto py-8 text-center space-y-6">
        {/* Success Eyebrow */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono text-emerald-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{template.name} Template Owned Forever</span>
        </div>

        {/* Core Headlines */}
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight">
            You own this experience.
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm font-light">
            One purchase. Unlimited sends. Your current link is ready below.
          </p>
        </div>

        {instanceSuccessMsg && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 animate-in fade-in">
            {instanceSuccessMsg}
          </div>
        )}

        {/* Link Card Box */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md space-y-3.5 text-left shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
              YOUR PRIVATE LINK
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              {activeRecipient ? `For ${activeRecipient}` : "Ready to open"}
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

          <div className="pt-2 text-center">
            <Link
              href={`/g/${activeSlug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition"
            >
              <span>Preview this link</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Template Ownership Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-left space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
              OWNED TEMPLATE
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              OWNED FOREVER
            </span>
          </div>

          <div>
            <h3 className="font-serif text-xl text-white font-normal">
              {template.name}
            </h3>
            <p className="text-xs text-zinc-400 italic mt-0.5">
              &ldquo;{template.tagline}&rdquo;
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setShowNewLinkModal(true)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 py-2.5 px-3 text-xs font-mono text-white hover:bg-white/10 transition"
            >
              <Plus className="h-3.5 w-3.5 text-rose-400" />
              <span>CREATE A NEW LINK →</span>
            </button>

            <Link
              href="/my-templates"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/5 bg-transparent py-2.5 px-3 text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/[0.03] transition"
            >
              <span>My Templates</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center pb-2">
        <p className="text-xs text-zinc-500 font-mono">
          One purchase. Unlimited sends. Plugd.
        </p>
      </footer>

      {/* New Link Creation Modal */}
      {showNewLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-[#0f0f13] p-6 text-zinc-100 text-left space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                New Instance
              </span>
              <button
                onClick={() => setShowNewLinkModal(false)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <h3 className="font-serif text-xl text-white">
                Generate new link
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-light">
                Generate a fresh link for {template.name}. No additional charge.
              </p>
            </div>

            <form onSubmit={handleCreateNewLink} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                  Recipient name (optional)
                </label>
                <input
                  type="text"
                  value={newRecipientName}
                  onChange={(e) => setNewRecipientName(e.target.value)}
                  placeholder="e.g. babe"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:border-rose-500/60 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={creatingInstance}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-black hover:bg-zinc-200 transition disabled:opacity-50"
              >
                {creatingInstance ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <span>GENERATE LINK (FREE)</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
