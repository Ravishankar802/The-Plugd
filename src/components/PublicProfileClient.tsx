"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  Share2,
  Check,
  Sparkles,
  Edit3,
  HeartHandshake,
  Plus,
  Lock,
  Globe,
  ArrowRight,
} from "lucide-react";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import CategoryIcon from "@/components/CategoryIcon";
import PaymentSupportModal from "@/components/PaymentSupportModal";
import UnlockSharingModal from "@/components/UnlockSharingModal";

// Inline social SVGs
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" fill="currentColor" />
  </svg>
);

interface CategoryShape {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

interface WishlistShape {
  id: string;
  slug: string;
  name: string;
  image: string | null;
  shortDescription?: string | null;
  description?: string | null;
  personalNote?: string | null;
  isFeatured: boolean;
  categoryId?: string | null;
  catalogItemId?: string | null;
  category?: CategoryShape | null;
  externalUrl?: string | null;
}

interface PublicProfileClientProps {
  creator: {
    username: string;
    displayName: string;
    bio?: string | null;
    avatarUrl?: string | null;
    paymentLink?: string | null;
    paymentQr?: string | null;
    instagramUrl?: string | null;
    xUrl?: string | null;
    youtubeUrl?: string | null;
    tiktokUrl?: string | null;
  };
  categories: CategoryShape[];
  items: WishlistShape[];
  isOwner?: boolean;
  isViewerLoggedIn?: boolean;
  isWishlistPublic?: boolean;
  isSubscribed?: boolean;
  subscriptionPlan?: string | null;
}

export default function PublicProfileClient({
  creator,
  categories,
  items,
  isOwner = false,
  isViewerLoggedIn = false,
  isWishlistPublic = false,
}: PublicProfileClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const visibleItems = useMemo(() => {
    if (selectedCategory === "all") return items;
    return items.filter(
      (item) => item.category?.id === selectedCategory || item.categoryId === selectedCategory
    );
  }, [items, selectedCategory]);

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    if (isOwner && !isWishlistPublic) {
      setUnlockModalOpen(true);
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${creator.displayName}'s Wishlist on Plugd`,
          text: creator.bio || `Check out ${creator.displayName}'s wishlist on Plugd!`,
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

  const hasPayment = Boolean(creator.paymentLink || creator.paymentQr);
  const hasSocials = Boolean(
    creator.instagramUrl || creator.xUrl || creator.youtubeUrl || creator.tiktokUrl
  );

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      {/* 1. TOP HEADER BAR */}
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/95 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1 group">
            <span className="font-logo text-2xl sm:text-3xl font-extrabold tracking-normal text-orange-500 select-none">
              Plugd
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {isOwner && (
              <>
                {!isWishlistPublic ? (
                  <button
                    type="button"
                    onClick={() => setUnlockModalOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-orange-50 border border-orange-200 px-3 py-1.5 text-xs font-bold text-orange-800 hover:bg-orange-100 transition cursor-pointer"
                  >
                    <Lock className="h-3.5 w-3.5 text-orange-600" />
                    <span className="hidden sm:inline">Private • Unlock Sharing</span>
                    <span className="sm:hidden">Private</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 text-xs font-bold text-emerald-800">
                    <Globe className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Public</span>
                  </span>
                )}

                <Link
                  href="/profile"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-bold text-zinc-700 shadow-xs hover:border-zinc-300 hover:bg-zinc-50 transition"
                >
                  <Edit3 className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Edit Profile</span>
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-3.5 py-1.5 text-xs font-extrabold text-black shadow-xs hover:bg-orange-400 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. CENTERED PERSONAL PROFILE HEADER */}
      <div className="border-b border-zinc-100 bg-gradient-to-b from-orange-50/25 via-white to-white py-10 px-4">
        <div className="mx-auto max-w-2xl flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-white bg-zinc-100 shadow-md overflow-hidden flex items-center justify-center">
              {creator.avatarUrl ? (
                <img
                  src={creator.avatarUrl}
                  alt={creator.displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-3xl sm:text-4xl font-black text-orange-500">
                  {creator.displayName.slice(0, 1).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* Full Name & @username */}
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">
            {creator.displayName}
          </h1>
          <p className="mt-1 text-sm font-semibold text-zinc-500">
            @{creator.username}
          </p>

          {/* About Section */}
          {creator.bio ? (
            <div className="mt-5 w-full max-w-lg rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 sm:p-5 text-left shadow-xs">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                About
              </h3>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed whitespace-pre-line font-normal">
                {creator.bio}
              </p>
            </div>
          ) : null}

          {/* Optional Social Links */}
          {hasSocials && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {creator.instagramUrl && (
                <a
                  href={creator.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-zinc-200 bg-white text-zinc-600 hover:text-orange-600 hover:border-orange-300 transition shadow-xs"
                  title="Instagram"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              )}
              {creator.xUrl && (
                <a
                  href={creator.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-zinc-200 bg-white text-zinc-600 hover:text-orange-600 hover:border-orange-300 transition shadow-xs"
                  title="X (Twitter)"
                >
                  <TwitterIcon className="h-4 w-4" />
                </a>
              )}
              {creator.youtubeUrl && (
                <a
                  href={creator.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-zinc-200 bg-white text-zinc-600 hover:text-orange-600 hover:border-orange-300 transition shadow-xs"
                  title="YouTube"
                >
                  <YoutubeIcon className="h-4 w-4" />
                </a>
              )}
              {creator.tiktokUrl && (
                <a
                  href={creator.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-zinc-200 bg-white text-zinc-600 hover:text-orange-600 hover:border-orange-300 transition shadow-xs"
                  title="TikTok"
                >
                  <span className="text-xs">🎵</span>
                </a>
              )}
            </div>
          )}

          {/* Direct Support / Gift CTA Button */}
          {hasPayment && (
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setSupportModalOpen(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 text-sm font-extrabold text-black shadow-xs hover:bg-orange-400 transition cursor-pointer"
              >
                <HeartHandshake className="h-4 w-4" />
                <span>Support / Send Gift</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. MAIN WISHLIST SECTION */}
      <main className="mx-auto max-w-6xl flex-1 px-4 py-8 md:px-6 w-full space-y-6">
        {/* Private Wishlist Banner for Owner */}
        {isOwner && !isWishlistPublic && (
          <div className="rounded-2xl border-2 border-orange-300/80 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-black shadow-xs">
                <Lock className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-zinc-900">Your wishlist is currently private</h3>
                  <span className="rounded-full bg-zinc-200/90 px-2 py-0.5 text-[10px] font-bold text-zinc-700">Free (₹0)</span>
                </div>
                <p className="text-xs text-zinc-600 max-w-xl">
                  Only you can see these items. Unlock public sharing for <strong>₹39/month</strong> or <strong>₹299/year</strong> so your friends can view your wishlist and gift what you want.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setUnlockModalOpen(true)}
              className="h-10 px-4 rounded-xl bg-orange-500 text-black font-extrabold text-xs shadow-xs hover:bg-orange-400 transition flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Unlock Public Sharing</span>
            </button>
          </div>
        )}

        {/* Wishlist Header & Count */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
              Wishlist
            </h2>
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-800">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>

          {isOwner && (
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add more items</span>
            </Link>
          )}
        </div>

        {/* Category Pills Filter */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition ${
                selectedCategory === "all"
                  ? "bg-orange-500 text-black shadow-xs"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>All ({items.length})</span>
            </button>

            {categories.map((category) => {
              const active = selectedCategory === category.id;
              const count = items.filter(
                (i) => i.category?.id === category.id || i.categoryId === category.id
              ).length;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition ${
                    active
                      ? "bg-orange-500 text-black shadow-xs"
                      : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  <CategoryIcon name={category.icon} className="h-3.5 w-3.5" />
                  <span>
                    {category.name} ({count})
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Wishlist Items Grid */}
        {visibleItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleItems.map((item) => (
              <Link
                key={item.id}
                href={`/${creator.username}/${item.slug || item.id}`}
                className="group rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-xs hover:border-orange-500/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <Sparkles className="h-8 w-8 text-orange-400" />
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                      {item.category?.name || "Wishlist"}
                    </span>
                    <h3 className="mt-1 text-xs sm:text-sm font-bold text-zinc-900 line-clamp-2 leading-snug group-hover:text-orange-600 transition">
                      {item.name}
                    </h3>
                    {item.personalNote && (
                      <p className="mt-1 text-[11px] text-zinc-500 line-clamp-1 italic">
                        &ldquo;{item.personalNote}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 group-hover:translate-x-0.5 transition-transform">
                    <span>View Wish</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                  <div onClick={(e) => e.stopPropagation()}>
                    <AddToWishlistButton
                      catalogItemId={item.catalogItemId || item.slug}
                      isLoggedIn={isViewerLoggedIn}
                      compact
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50/50 p-12 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">
              No wishlist items yet
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              {isOwner
                ? "Browse the Plugd catalog to add items to your wishlist, or create custom items."
                : `${creator.displayName} hasn't added any items to this wishlist yet.`}
            </p>
            {isOwner && (
              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2 text-xs font-extrabold text-black hover:bg-orange-400 transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Explore Items to Wish For</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 4. PUBLIC PROFILE MINIMAL FOOTER */}
      <footer className="border-t border-zinc-100 py-6 text-center text-xs text-zinc-400 mt-auto">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Plugd • {creator.displayName}&apos;s Wishlist</p>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-zinc-500 hover:text-orange-600 transition font-bold"
          >
            <span>Create your own wishlist on Plugd →</span>
          </Link>
        </div>
      </footer>

      {/* Support / Payment Modal */}
      <PaymentSupportModal
        open={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
        creatorName={creator.displayName}
        username={creator.username}
        paymentLink={creator.paymentLink}
        paymentQr={creator.paymentQr}
      />

      {/* Unlock Public Sharing Modal */}
      <UnlockSharingModal
        open={unlockModalOpen}
        onClose={() => setUnlockModalOpen(false)}
        username={creator.username}
        onSuccess={() => window.location.reload()}
      />
    </div>
  );
}
