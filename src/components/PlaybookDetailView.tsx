"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  Check,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ThumbsUp,
  ShoppingBag,
} from "lucide-react";
import Header from "@/components/Header";
import PlaybookFeedCard from "@/components/PlaybookFeedCard";
import { addToCart, useIsInCart, openCartDrawer, getCustomerPurchasedSlugs } from "@/lib/cart";
import { IS_REVIEW_PHASE_FREE_ACCESS } from "@/lib/config";
import type { PlaybookDetailData } from "@/lib/dating-playbook-detail";
import { ALL_PLAYBOOK_SUMMARIES } from "@/lib/playbooks-catalog";
import { isFollowingAuthor as isFollowingAuthorStore, followAuthor, unfollowAuthor } from "@/lib/following-store";
import { slugifyAuthorName } from "@/lib/authors";
import {
  getAuthorProfile,
  getCuratedCommunityReviews,
  getAvatarBgColor,
} from "@/lib/book-utils";

interface PlaybookDetailViewProps {
  playbook: PlaybookDetailData;
  hasAccess?: boolean;
}

export default function PlaybookDetailView({
  playbook,
  hasAccess = false,
}: PlaybookDetailViewProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showUnfollowModal, setShowUnfollowModal] = useState(false);
  const [addedToCartToast, setAddedToCartToast] = useState(false);
  const [clientHasAccess, setClientHasAccess] = useState(hasAccess);
  const inCart = useIsInCart(playbook.slug);

  const [hasStartedReading, setHasStartedReading] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(`plugd_started_${playbook.slug}`) === "true";
  });

  // Author profile
  const author = useMemo(
    () => getAuthorProfile(playbook.categoryName, playbook.slug),
    [playbook.categoryName, playbook.slug]
  );

  const [isFollowingAuthor, setIsFollowingAuthor] = useState(() =>
    isFollowingAuthorStore(author.name)
  );

  useEffect(() => {
    let active = true;
    if (typeof window !== "undefined") {
      // Revalidate ownership with server session
      getCustomerPurchasedSlugs().then((slugs) => {
        if (active && slugs.includes(playbook.slug.toLowerCase())) {
          setClientHasAccess(true);
        }
      });
    }

    const handleFollowingChange = () => {
      if (active) {
        setIsFollowingAuthor(isFollowingAuthorStore(author.name));
      }
    };
    window.addEventListener("plugd-following-change", handleFollowingChange);
    return () => {
      active = false;
      window.removeEventListener("plugd-following-change", handleFollowingChange);
    };
  }, [playbook.slug, author.name]);

  const isFreeReview = Boolean(IS_REVIEW_PHASE_FREE_ACCESS);
  const canAccess = hasAccess || isFreeReview || clientHasAccess;

  const handleStartReading = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`plugd_started_${playbook.slug}`, "true");
        setHasStartedReading(true);
      } catch {}
    }
  };

  // Catalog summary lookup for consistent catalog metadata (rating, count, published date)
  const catalogEntry = useMemo(() => {
    return ALL_PLAYBOOK_SUMMARIES.find(
      (p) => p.slug === playbook.slug || p.id === playbook.id
    );
  }, [playbook.slug, playbook.id]);

  const effectiveRating = catalogEntry?.rating ?? playbook.rating ?? 4.8;

  // Clean description without repeated bold headline prefix
  const cleanDescription = useMemo(() => {
    let desc = (playbook.description || "").replace(/\\n/g, "\n");
    if (desc.startsWith("**")) {
      desc = desc.replace(/^\*\*[\s\S]*?\*\*\s*\n*/, "");
    }
    if (playbook.headline && desc.startsWith(playbook.headline) && desc.length > playbook.headline.length) {
      desc = desc.slice(playbook.headline.length).replace(/^\s*\n*/, "");
    }
    return desc;
  }, [playbook.description, playbook.headline]);

  // Readers also enjoyed: 8 related playbooks from catalog for smooth horizontal scroll
  const relatedBooks = useMemo(() => {
    return ALL_PLAYBOOK_SUMMARIES.filter((p) => p.slug !== playbook.slug).slice(0, 8);
  }, [playbook.slug]);

  // Curated community reviews
  const communityReviews = useMemo(
    () => getCuratedCommunityReviews(playbook.title, effectiveRating, playbook.slug),
    [playbook.title, effectiveRating, playbook.slug]
  );

  // Direct checkout handler (triggers Dodo checkout session)
  const handleCheckout = async () => {
    if (canAccess) {
      window.location.href = `/learn/${playbook.slug}`;
      return;
    }

    try {
      setIsCheckingOut(true);
      setCheckoutError("");

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug: playbook.slug,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to start checkout. Please try again.");
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("[PLAYBOOK_CHECKOUT_ERROR]", errorMsg);
      setCheckoutError(errorMsg || "Failed to initiate checkout. Please try again.");
      setIsCheckingOut(false);
    }
  };

  const handleAddToCart = () => {
    if (inCart) {
      openCartDrawer();
      return;
    }

    addToCart({
      slug: playbook.slug,
      playbookId: playbook.id || playbook.slug,
      title: playbook.title,
      thumbnail: playbook.thumbnail || "/images/placeholder.png",
      price: effectivePrice,
      originalPrice: effectiveOriginalPrice,
      discountPercent: discountPercentage > 0 ? discountPercentage : undefined,
      authorName: author.name,
    });

    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 3500);
  };

  const effectivePrice = catalogEntry?.price ?? playbook.price ?? 3;
  const effectiveOriginalPrice = catalogEntry?.originalPrice ?? playbook.originalPrice ?? 9;
  const discountPercentage = effectiveOriginalPrice > effectivePrice
    ? Math.round(((effectiveOriginalPrice - effectivePrice) / effectiveOriginalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1c1917] font-sans antialiased">
      <Header />

      {/* Back to all playbooks navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#78716c] hover:text-[#1c1917] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to all playbooks</span>
        </Link>
      </div>

      {/* Main Book Showcase (Two-Column Layout) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[330px_1fr] lg:grid-cols-[360px_1fr] gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT COLUMN: UNIFIED HOMEPAGE-STYLE CARD ================= */}
          <div className="flex flex-col items-center md:items-start md:sticky md:top-24 w-full">
            
            {/* Unified Playbook Card (Matches Homepage Card Architecture with Add to Cart + Buy Now) */}
            <div className="w-full max-w-[340px] lg:max-w-[360px] rounded-2xl bg-white border border-[#dcd8d0] p-3.5 sm:p-4 shadow-[0_1px_3px_rgba(28,25,23,0.06),0_1px_2px_rgba(28,25,23,0.04)] space-y-3.5">
              
              {/* 16:9 Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#eeebe5] border border-[#e5e1d8] shrink-0">
                {playbook.thumbnail ? (
                  <Image
                    src={playbook.thumbnail}
                    alt={playbook.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover object-center"
                    priority
                  />
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center bg-[#eeebe5] text-stone-600">
                    <BookOpen className="h-10 w-10 mb-2 text-stone-400" />
                    <span className="font-semibold text-xs leading-snug">{playbook.title}</span>
                  </div>
                )}
              </div>

              {/* Title and Author */}
              <div className="space-y-1">
                <h3 className="text-[15px] sm:text-base font-semibold text-[#1c1917] leading-snug line-clamp-2">
                  {playbook.title}
                </h3>
                <div className="flex items-center gap-2 text-[13px] text-[#57534e] w-full">
                  <span className="font-medium text-[#44403c] truncate">{author.name}</span>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="pt-2 space-y-2">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#1c1917]">
                      ${effectivePrice.toFixed(2)}
                    </span>
                    {effectiveOriginalPrice > effectivePrice && (
                      <span className="text-sm text-[#a8a29e] line-through">
                        ${effectiveOriginalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {discountPercentage > 0 && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                      {discountPercentage}% off
                    </span>
                  )}
                </div>
              </div>

              {checkoutError && (
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 leading-snug">
                  {checkoutError}
                </div>
              )}

              {/* Action Buttons: Buy Now (Primary) & Add to Cart (Secondary) */}
              <div className="space-y-2 pt-1">
                {canAccess ? (
                  <Link
                    href={`/learn/${playbook.slug}`}
                    onClick={handleStartReading}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>{hasStartedReading ? "Continue Reading" : "Start Reading"}</span>
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                    >
                      {isCheckingOut ? (
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <span>Buy now</span>
                      )}
                    </button>

                    <button
                      onClick={handleAddToCart}
                      disabled={isCheckingOut}
                      className="w-full py-2 px-4 rounded-xl bg-white hover:bg-[#eff6ff] text-[#2563eb] font-semibold text-sm border border-[#2563eb] flex items-center justify-center gap-2 shadow-xs transition-colors active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                    >
                      {inCart ? (
                        <>
                          <Check className="h-4 w-4 text-[#2563eb]" />
                          <span>In Cart · View Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-4 w-4 text-[#2563eb]" />
                          <span>Add to cart</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>

              {addedToCartToast && (
                <div className="text-xs text-emerald-700 font-medium bg-emerald-50 py-2 px-3 rounded-xl border border-emerald-200 animate-fade-in flex items-center justify-between gap-2">
                  <span>✓ Added to cart</span>
                  <button
                    type="button"
                    onClick={openCartDrawer}
                    className="font-bold underline hover:text-emerald-900 cursor-pointer text-[11px]"
                  >
                    View Cart →
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="space-y-8 min-w-0">
            
            {/* Book Title & Author Header */}
            <div className="space-y-2.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1c1917] leading-tight tracking-tight">
                {playbook.title}
              </h1>

              {/* Author / Publisher with Verified Badge */}
              <div className="flex items-center gap-2 text-stone-700 text-sm">
                <span className="font-semibold text-[#292524]">{author.name}</span>
                <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-stone-700 text-white text-[10px]" title="Verified Publisher">
                  ✓
                </span>
              </div>
            </div>

            {/* Book Description / Synopsis */}
            <div className="text-stone-700 leading-relaxed text-[15px] space-y-3">
              <p className="font-medium text-stone-900 leading-relaxed text-base">
                {playbook.headline || playbook.description}
              </p>

              <div className={`space-y-3 whitespace-pre-line ${!isDescriptionExpanded ? "line-clamp-6" : ""}`}>
                {cleanDescription}
              </div>

              <button
                type="button"
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-stone-900 font-semibold text-xs flex items-center gap-1 hover:underline pt-1 cursor-pointer"
              >
                {isDescriptionExpanded ? (
                  <>Show less <ChevronUp className="h-3.5 w-3.5" /></>
                ) : (
                  <>Show more <ChevronDown className="h-3.5 w-3.5" /></>
                )}
              </button>
            </div>

            {/* Author */}
            <div className="border-t border-stone-200 pt-8 space-y-4">
              <h2 className="text-xl font-bold text-[#1c1917]">
                Author
              </h2>

              <div className="flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
                <Link
                  href={`/author/${slugifyAuthorName(author.name)}`}
                  className="flex items-center gap-3.5 sm:gap-4 hover:opacity-85 transition-opacity group"
                  title={`View ${author.name}'s playbooks`}
                >
                  <div
                    className="h-12 w-12 sm:h-13 sm:w-13 rounded-full text-white flex items-center justify-center font-bold text-lg sm:text-xl uppercase shrink-0 shadow-2xs group-hover:ring-2 group-hover:ring-[#1c1917]/20 transition-all"
                    style={{ backgroundColor: getAvatarBgColor(author.name) }}
                  >
                    {author.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-[#1c1917] flex items-center gap-2 group-hover:text-[#2563eb] transition-colors">
                      {author.name}
                      <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-stone-700 text-white text-[10px]">
                        ✓
                      </span>
                    </h3>
                  </div>
                </Link>

                {/* Follow / Following Button */}
                <div>
                  {isFollowingAuthor ? (
                    <button
                      type="button"
                      onClick={() => setShowUnfollowModal(true)}
                      className="px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-semibold bg-[#eeebe2] hover:bg-[#e4e0d5] text-[#1c1917] border border-[#d6d3d1] transition-all cursor-pointer shadow-2xs"
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        followAuthor({
                          name: author.name,
                          avatarBg: getAvatarBgColor(author.name),
                          slug: slugifyAuthorName(author.name),
                        });
                        setIsFollowingAuthor(true);
                      }}
                      className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-semibold bg-[#1c1917] hover:bg-[#2563eb] text-white transition-all cursor-pointer shadow-xs"
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Readers Also Enjoyed (With Homepage Sized Cards & Smooth Horizontal Scroll) */}
            <div className="border-t border-stone-200 pt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#1c1917]">
                  Readers also enjoyed
                </h2>
                <Link
                  href="/"
                  className="text-xs font-semibold text-stone-700 hover:text-stone-950 hover:underline"
                >
                  See All &gt;
                </Link>
              </div>

              {/* Horizontal Scroll Row - each card matches exact homepage sizing */}
              <div className="relative -mx-4 sm:mx-0 px-4 sm:px-0">
                <div className="flex gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth no-scrollbar">
                  {relatedBooks.map((rel) => (
                    <div key={rel.slug} className="w-[280px] min-w-[280px] shrink-0">
                      <PlaybookFeedCard playbook={rel} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-stone-200 pt-8 space-y-6">
              <h2 className="text-2xl font-bold text-[#1c1917]">
                Reviews
              </h2>

              {/* Display Reviews List */}
              <div className="space-y-4">
                {communityReviews.map((rev, revIdx) => (
                  <div
                    key={rev.id}
                    className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-10 w-10 rounded-full text-white flex items-center justify-center font-bold text-xs uppercase shadow-2xs shrink-0"
                          style={{ backgroundColor: getAvatarBgColor(rev.name, revIdx) }}
                        >
                          {rev.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-xs text-stone-900 block">{rev.name}</span>
                          <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
                            <span className="flex items-center gap-0.5">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                              ))}
                            </span>
                            <span>•</span>
                            <span>{rev.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs">
                      <p className="text-stone-700 leading-relaxed">
                        {rev.content}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px] text-stone-500">
                      <button
                        type="button"
                        className="flex items-center gap-1 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer font-medium"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        <span>Helpful ({rev.likes})</span>
                      </button>
                      <span className="font-medium">Verified purchase</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>
      {/* Unfollow Confirmation Modal */}
      {showUnfollowModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4"
          onClick={() => setShowUnfollowModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-5 sm:p-6 border border-[#dcd8d0] shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-1">
              <p className="text-sm sm:text-[15px] font-medium text-[#1c1917] leading-snug">
                Are you sure you want to unfollow {author.name}?
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowUnfollowModal(false)}
                className="px-4 py-2 rounded-xl border border-[#d6d3d1] text-xs font-semibold text-[#57534e] hover:bg-black/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  unfollowAuthor(author.name);
                  setIsFollowingAuthor(false);
                  setShowUnfollowModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
              >
                Unfollow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
