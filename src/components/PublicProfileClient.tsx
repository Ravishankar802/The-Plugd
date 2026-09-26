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
} from "lucide-react";
import CatalogCard from "@/components/CatalogCard";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import CategoryIcon from "@/components/CategoryIcon";
import PaymentSupportModal from "@/components/PaymentSupportModal";
import UnlockSharingModal from "@/components/UnlockSharingModal";

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
  isSubscribed = false,
  subscriptionPlan = null,
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

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      {/* Top Profile Header Area */}
      <header className="border-b border-zinc-200/80 bg-zinc-50/70 pt-8 pb-10 px-4 md:px-6">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">
          {/* Top navigation row: back to plugd & share/status */}
          <div className="w-full flex items-center justify-between pb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-orange-600 transition"
            >
              <span className="font-logo text-xl font-extrabold text-orange-500">Plugd</span>
            </Link>

            <div className="flex items-center gap-2">
              {isOwner && (
                !isWishlistPublic ? (
                  <button
                    type="button"
                    onClick={() => setUnlockModalOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-orange-100/90 border border-orange-200 px-2.5 py-1.5 text-xs font-bold text-orange-800 hover:bg-orange-200 transition cursor-pointer"
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
                )
              )}

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
                    <Share2 className="h-3.5 w-3.5 text-zinc-500" />
                    <span>{isOwner && !isWishlistPublic ? "Share" : "Share"}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="relative mb-3.5">
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

          {/* Display Name & @username */}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
            {creator.displayName}
          </h1>
          <p className="mt-1 text-xs sm:text-sm font-semibold text-zinc-500">
            @{creator.username}
          </p>

          {/* Bio text */}
          {creator.bio && (
            <p className="mt-2.5 max-w-md text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              {creator.bio}
            </p>
          )}

          {/* Action Buttons: Support / Pay & Edit Profile */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            {hasPayment && (
              <button
                type="button"
                onClick={() => setSupportModalOpen(true)}
                className="h-10 px-5 rounded-2xl bg-orange-500 text-black font-extrabold text-xs shadow-xs hover:bg-orange-600 transition flex items-center gap-1.5 cursor-pointer"
              >
                <HeartHandshake className="h-4 w-4" />
                <span>Support / Pay</span>
              </button>
            )}

            {isOwner && (
              <Link
                href="/profile"
                className="h-10 px-4 rounded-2xl border border-zinc-200 bg-white text-zinc-800 font-bold text-xs shadow-xs hover:border-zinc-300 hover:bg-zinc-50 transition flex items-center gap-1.5"
              >
                <Edit3 className="h-3.5 w-3.5 text-zinc-500" />
                <span>Edit Profile</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Wishlist Section */}
      <main className="mx-auto max-w-6xl flex-1 px-4 py-8 md:px-6 w-full space-y-6">
        {/* Private Wishlist Banner for Owner */}
        {isOwner && !isWishlistPublic && (
          <div className="rounded-2xl border-2 border-orange-300/80 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
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
              className="h-10 px-4 rounded-xl bg-orange-500 text-black font-extrabold text-xs shadow-xs hover:bg-orange-600 transition flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Unlock Public Sharing</span>
            </button>
          </div>
        )}

        {/* Wishlist Heading & Count */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg md:text-xl font-black text-zinc-900">
              Wishlist
            </h2>
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-700">
              {items.length}
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

        {/* Wishlist Items Grid using EXISTING CatalogCard */}
        {visibleItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {visibleItems.map((item) => (
              <CatalogCard
                key={item.id}
                href={`/@${creator.username}/${item.slug}`}
                image={item.image}
                name={item.name}
                category={item.category?.name || "Wishlist"}
                action={
                  <AddToWishlistButton
                    catalogItemId={item.catalogItemId || item.slug}
                    isLoggedIn={isViewerLoggedIn}
                    compact
                  />
                }
              />
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
                  className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2 text-xs font-extrabold text-black hover:bg-orange-600 transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Explore Items to Wish For</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Public Profile Minimal Footer */}
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
