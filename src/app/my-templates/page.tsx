"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Plus, Copy, Check, ExternalLink, ArrowRight, ArrowLeft, Loader2, Lock } from "lucide-react";
import { Template } from "@/lib/templates";

interface OwnedTemplateItem {
  id: string;
  templateId: string;
  createdAt: string;
  status: string;
  template: Template;
  instanceCount: number;
}

interface CustomerData {
  id: string;
  email: string;
  accessKey: string;
  ownerships: OwnedTemplateItem[];
}

export default function MyTemplatesPage() {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [lookingUp, setLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);

  // Instance creation modal state
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [creating, setCreating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<{
    slug: string;
    shareUrl: string;
    recipientName: string | null;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadCustomer() {
      try {
        const res = await fetch("/api/customer/me");
        const data = await res.json();
        if (data.authenticated && data.customer) {
          setCustomer(data.customer);
        }
      } catch (err) {
        console.error("Failed to load customer collection", err);
      } finally {
        setLoading(false);
      }
    }
    loadCustomer();
  }, []);

  async function handleEmailLookup(e: React.FormEvent) {
    e.preventDefault();
    setLookingUp(true);
    setLookupError(null);

    try {
      const res = await fetch("/api/customer/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not find templates for this email.");
      }
      setCustomer(data.customer);
    } catch (err: any) {
      setLookupError(err.message || "Failed to look up templates.");
    } finally {
      setLookingUp(false);
    }
  }

  async function handleCreateLink(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedTemplate) return;
    setCreating(true);

    try {
      const res = await fetch("/api/customer/instance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: selectedTemplate.id,
          target: selectedTemplate.target === "him" ? "him" : "her",
          recipientName: recipientName.trim(),
          senderName: senderName.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate link.");
      }

      setGeneratedLink({
        slug: data.instance.slug,
        shareUrl: data.instance.shareUrl,
        recipientName: data.instance.recipientName,
      });

      // Update instance count in local state
      if (customer) {
        setCustomer({
          ...customer,
          ownerships: customer.ownerships.map((o) =>
            o.templateId === selectedTemplate.id
              ? { ...o, instanceCount: o.instanceCount + 1 }
              : o
          ),
        });
      }
    } catch (err: any) {
      alert(err.message || "Failed to create link.");
    } finally {
      setCreating(false);
    }
  }

  async function handleCopy() {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink.shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-rose-500 selection:text-white overflow-x-hidden">
      {/* Background ambient warmth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[450px] w-full max-w-4xl rounded-full bg-gradient-to-b from-rose-500/10 via-rose-600/5 to-transparent blur-3xl"
      />

      {/* Header */}
      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-5 py-6 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>

        <span className="text-[12px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
          plugd
        </span>

        <div className="flex items-center gap-3">
          <Link
            href="/for-her"
            className="text-xs font-mono text-zinc-400 hover:text-white transition"
          >
            Templates →
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-4xl px-5 pt-6 pb-20 sm:px-8">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-zinc-500 font-mono text-xs">
            <Loader2 className="h-5 w-5 animate-spin text-rose-400" />
            <span>Loading your collection...</span>
          </div>
        ) : !customer ? (
          /* Email Lookup Screen */
          <div className="max-w-md mx-auto my-12 text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/10 px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-zinc-300">
              <Sparkles className="h-3 w-3 text-rose-400" />
              <span>Customer Collection</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                Your Templates
              </h1>
              <p className="text-zinc-400 text-xs sm:text-sm font-light">
                Enter your email to view the experiences you own and generate links anytime.
              </p>
            </div>

            {lookupError && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
                {lookupError}
              </div>
            )}

            <form onSubmit={handleEmailLookup} className="space-y-3 text-left">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                  Your purchase email
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-rose-500/60 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={lookingUp}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-black hover:bg-zinc-200 transition disabled:opacity-50"
              >
                {lookingUp ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    <span>Accessing collection...</span>
                  </>
                ) : (
                  <span>ACCESS MY TEMPLATES →</span>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Collection Screen */
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[11px] font-mono text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{customer.email}</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                  My Templates
                </h1>
                <p className="text-zinc-400 text-xs sm:text-sm font-light">
                  Designer experiences you own forever. One purchase, unlimited sends.
                </p>
              </div>

              <div className="text-xs font-mono text-zinc-500">
                {customer.ownerships.length} {customer.ownerships.length === 1 ? "template" : "templates"} owned
              </div>
            </div>

            {customer.ownerships.length === 0 ? (
              <div className="text-center py-16 space-y-4 rounded-3xl border border-white/5 bg-white/[0.01] p-8">
                <p className="text-sm text-zinc-400 font-light">
                  You haven&apos;t unlocked any designer templates yet.
                </p>
                <div className="flex justify-center gap-3">
                  <Link
                    href="/for-her"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-zinc-200 transition"
                  >
                    <span>Browse for Her →</span>
                  </Link>
                  <Link
                    href="/for-him"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 transition"
                  >
                    <span>Browse for Him →</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {customer.ownerships.map((item) => (
                  <div
                    key={item.id}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md flex flex-col justify-between space-y-6 hover:border-white/20 transition shadow-xl"
                  >
                    {/* Top row */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                          OWNED FOREVER
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {item.instanceCount} {item.instanceCount === 1 ? "send" : "sends"}
                        </span>
                      </div>

                      <div>
                        <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                          {item.template.name}
                        </h2>
                        <p className="text-xs text-zinc-400 italic mt-1 font-light">
                          &ldquo;{item.template.tagline}&rdquo;
                        </p>
                        <p className="text-xs text-zinc-500 mt-2 font-light">
                          {item.template.vibe}
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                      <button
                        onClick={() => {
                          setSelectedTemplate(item.template);
                          setGeneratedLink(null);
                          setRecipientName("");
                          setSenderName("");
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white py-3 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-black hover:bg-zinc-200 transition active:scale-[0.98]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>CREATE A NEW LINK →</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-zinc-500 font-mono">
        One purchase. Unlimited sends. Plugd.
      </footer>

      {/* Create Instance Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0f0f13] p-6 sm:p-7 text-zinc-100 text-left space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                {selectedTemplate.name}
              </span>
              <button
                onClick={() => {
                  setSelectedTemplate(null);
                  setGeneratedLink(null);
                }}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            {generatedLink ? (
              /* Success / Link Ready view */
              <div className="space-y-4 animate-in fade-in">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-mono text-emerald-300">
                    <Sparkles className="h-3 w-3" />
                    <span>YOUR LINK IS READY</span>
                  </div>
                  <h3 className="font-serif text-2xl text-white">
                    Send it to {generatedLink.recipientName || "them"}.
                  </h3>
                  <p className="text-xs text-zinc-400 font-light">
                    Generated from your owned {selectedTemplate.name} template.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                  <div className="rounded-xl bg-black/50 border border-white/10 px-3 py-2.5">
                    <span className="font-mono text-xs text-rose-300 truncate select-all block">
                      {generatedLink.shareUrl}
                    </span>
                  </div>

                  <button
                    onClick={handleCopy}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                      copied
                        ? "bg-emerald-500 text-black"
                        : "bg-white text-black hover:bg-zinc-200"
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
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Link
                    href={`/g/${generatedLink.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white transition"
                  >
                    <span>Preview site</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>

                  <button
                    onClick={() => {
                      setGeneratedLink(null);
                      setRecipientName("");
                    }}
                    className="text-xs font-mono text-rose-400 hover:underline"
                  >
                    Generate another link →
                  </button>
                </div>
              </div>
            ) : (
              /* Input form view */
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-2xl text-white">
                    Create a new link
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 font-light">
                    You own {selectedTemplate.name}. Generate a fresh private link for someone with zero extra charges.
                  </p>
                </div>

                <form onSubmit={handleCreateLink} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                      Recipient&apos;s name or nickname <span className="text-zinc-600">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Maya, babe"
                      maxLength={40}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-rose-500/60 focus:outline-none"
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
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-rose-500/60 focus:outline-none"
                    />
                  </div>

                  <div className="rounded-xl bg-white/[0.02] border border-white/5 px-4 py-3 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">Charge</span>
                    <span className="text-emerald-400 font-semibold">$0.00 (Owned Forever)</span>
                  </div>

                  <button
                    type="submit"
                    disabled={creating}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-black hover:bg-zinc-200 transition disabled:opacity-50"
                  >
                    {creating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-black" />
                        <span>Generating instance...</span>
                      </>
                    ) : (
                      <span>GENERATE LINK (FREE)</span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
