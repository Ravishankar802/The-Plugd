"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, HeartHandshake, Share2, Check } from "lucide-react";
import { useState } from "react";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import PaymentSupportModal from "@/components/PaymentSupportModal";

interface ItemDetailClientProps {
  creator: {
    username: string;
    displayName: string;
    avatarUrl?: string | null;
    paymentLink?: string | null;
    paymentQr?: string | null;
  };
  item: {
    id: string;
    name: string;
    image?: string | null;
    shortDescription?: string | null;
    description?: string | null;
    personalNote?: string | null;
    category?: {
      name: string;
    } | null;
    catalogItemId?: string | null;
    slug: string;
  };
  isViewerLoggedIn?: boolean;
}

export default function ItemDetailClient({ creator, item, isViewerLoggedIn = false }: ItemDetailClientProps) {
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const hasPayment = Boolean(creator.paymentLink || creator.paymentQr);

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${item.name} — ${creator.displayName}'s Wishlist on Plugd`,
          text: item.personalNote || `Check out ${item.name} on ${creator.displayName}'s wishlist!`,
          url: window.location.href,
        });
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/95 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link
            href={`/${creator.username}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-orange-600 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to {creator.displayName}&apos;s Wishlist</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-bold text-zinc-700 shadow-xs hover:border-zinc-300 hover:bg-zinc-50 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Share</span>
                </>
              )}
            </button>

            <Link href="/" className="inline-flex items-center">
              <span className="font-logo text-2xl font-extrabold text-orange-500 select-none">
                Plugd
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Item Detail Card */}
      <main className="mx-auto max-w-4xl flex-1 px-4 py-8 sm:py-12 w-full">
        <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-10 shadow-xs grid md:grid-cols-2 gap-8 sm:gap-10">
          {/* Left Column: Image */}
          <div className="flex flex-col justify-start">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 flex items-center justify-center shadow-xs">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-zinc-400">
                  <Sparkles className="h-12 w-12 text-orange-400" />
                  <span className="text-xs font-semibold">Wishlist Item</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Context / Category Pill */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 border border-orange-200 px-3 py-1 text-xs font-bold text-orange-800">
                  <Sparkles className="h-3 w-3 text-orange-600" />
                  <span>On {creator.displayName}&apos;s Wishlist</span>
                </span>

                {item.category?.name && (
                  <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
                    {item.category.name}
                  </span>
                )}
              </div>

              {/* Item Name */}
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                {item.name}
              </h1>

              {/* Description if present */}
              {(item.shortDescription || item.description) && (
                <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                  {item.shortDescription || item.description}
                </p>
              )}

              {/* Personal Note Callout from Wishlist Owner */}
              {item.personalNote && (
                <div className="rounded-2xl border border-orange-200/90 bg-orange-50/50 p-4 space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-orange-700">
                    Note from {creator.displayName}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed italic">
                    &ldquo;{item.personalNote}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Wishlist Owner Identity Box */}
            <div className="pt-4 border-t border-zinc-100 space-y-4">
              <Link
                href={`/${creator.username}`}
                className="group flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-3 hover:border-orange-300 hover:bg-orange-50/30 transition shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full border-2 border-white bg-zinc-200 overflow-hidden flex items-center justify-center shrink-0">
                    {creator.avatarUrl ? (
                      <img
                        src={creator.avatarUrl}
                        alt={creator.displayName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-orange-600">
                        {creator.displayName.slice(0, 1).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 group-hover:text-orange-600 transition">
                      {creator.displayName}
                    </p>
                    <p className="text-[11px] text-zinc-500 font-medium">
                      @{creator.username}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-orange-600 group-hover:underline pr-2">
                  View Wishlist →
                </span>
              </Link>

              {/* Actions */}
              <div className="space-y-2.5">
                {hasPayment && (
                  <button
                    type="button"
                    onClick={() => setSupportModalOpen(true)}
                    className="w-full h-12 rounded-2xl bg-orange-500 font-extrabold text-sm text-black shadow-xs hover:bg-orange-400 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <HeartHandshake className="h-4 w-4" />
                    <span>Gift or Support This Wish</span>
                  </button>
                )}

                <div className="flex items-center justify-center pt-1">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-zinc-700">
                    <span>Want this too?</span>
                    <AddToWishlistButton
                      catalogItemId={item.catalogItemId || item.slug}
                      isLoggedIn={isViewerLoggedIn}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-6 text-center text-xs text-zinc-400 mt-auto">
        <div className="mx-auto max-w-4xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Plugd • {creator.displayName}&apos;s Wishlist</p>
          <Link
            href={`/${creator.username}`}
            className="inline-flex items-center gap-1 text-zinc-500 hover:text-orange-600 transition font-bold"
          >
            <span>Back to {creator.displayName}&apos;s Wishlist →</span>
          </Link>
        </div>
      </footer>

      {/* Payment Support Modal */}
      <PaymentSupportModal
        open={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
        creatorName={creator.displayName}
        username={creator.username}
        paymentLink={creator.paymentLink}
        paymentQr={creator.paymentQr}
      />
    </div>
  );
}
