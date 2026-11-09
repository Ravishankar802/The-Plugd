"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  Share2,
  Check,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal,
  Bookmark,
  Award,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ThumbsUp,
  UserCheck,
} from "lucide-react";
import Header from "@/components/Header";
import PlaybookFeedCard from "@/components/PlaybookFeedCard";
import { IS_REVIEW_PHASE_FREE_ACCESS } from "@/lib/config";
import type { PlaybookDetailData } from "@/lib/dating-playbook-detail";
import { ALL_PLAYBOOK_SUMMARIES } from "@/lib/playbooks-catalog";
import {
  getPlaybookPageCount,
  getChapterPageRange,
  getReadingStats,
  getAuthorProfile,
  getCuratedCommunityReviews,
  getAvatarBgColor,
  getRelativePublishedTime,
  getPlaybookRatingBreakdown,
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
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isBookDetailsOpen, setIsBookDetailsOpen] = useState(false);
  const [openChapterIndices, setOpenChapterIndices] = useState<number[]>([0, 1]);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isFollowingAuthor, setIsFollowingAuthor] = useState(false);
  const [reviewSearchQuery, setReviewSearchQuery] = useState("");
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReviewText, setNewReviewText] = useState("");
  const [submittedReview, setSubmittedReview] = useState(false);
  const [addedToCartToast, setAddedToCartToast] = useState(false);
  const [hasStartedReading, setHasStartedReading] = useState(false);
  const [clientHasAccess, setClientHasAccess] = useState(hasAccess);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const started = localStorage.getItem(`plugd_started_${playbook.slug}`);
      if (started) {
        setHasStartedReading(true);
      }

      const urlParams = new URLSearchParams(window.location.search);
      if (
        urlParams.get("purchased") === "true" ||
        urlParams.get("purchased") === playbook.slug ||
        urlParams.get("access") === "true" ||
        urlParams.get("session_id")
      ) {
        setClientHasAccess(true);
        try {
          localStorage.setItem(`plugd_owned_${playbook.slug}`, "true");
        } catch {}
      } else if (localStorage.getItem(`plugd_owned_${playbook.slug}`) === "true") {
        setClientHasAccess(true);
      }
    }
  }, [playbook.slug]);

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

  // Book page count mapped by price tier ($3 -> 100-150, $5 -> 150-200, etc.)
  const pageCount = useMemo(
    () => getPlaybookPageCount(playbook.price, playbook.slug),
    [playbook.price, playbook.slug]
  );

  // Social reading statistics
  const readingStats = useMemo(() => getReadingStats(playbook.slug), [playbook.slug]);

  // Author profile
  const author = useMemo(
    () => getAuthorProfile(playbook.categoryName, playbook.slug),
    [playbook.categoryName, playbook.slug]
  );

  // Catalog summary lookup for consistent catalog metadata (rating, count, published date)
  const catalogEntry = useMemo(() => {
    return ALL_PLAYBOOK_SUMMARIES.find(
      (p) => p.slug === playbook.slug || p.id === playbook.id
    );
  }, [playbook.slug, playbook.id]);

  const effectiveRating = catalogEntry?.rating ?? playbook.rating ?? 4.8;
  const effectiveRatingCount = catalogEntry?.ratingCount ?? playbook.ratingCount ?? "4.9k";
  const effectivePublishedAt = catalogEntry?.publishedAt ?? (playbook as any).publishedAt;

  // Relative published time ("xd ago" or "xmo ago")
  const relativePublishedDate = useMemo(
    () => getRelativePublishedTime(playbook.slug, effectivePublishedAt),
    [playbook.slug, effectivePublishedAt]
  );

  // Mathematically calculated star rating distribution
  const ratingBreakdown = useMemo(
    () => getPlaybookRatingBreakdown(effectiveRating, effectiveRatingCount),
    [effectiveRating, effectiveRatingCount]
  );

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

  // Flattened chapters from modules and lessons
  const chapters = useMemo(() => {
    const list: {
      id: string;
      title: string;
      description?: string;
      partTitle: string;
      partIndex: number;
      chapterIndex: number;
    }[] = [];

    let cIndex = 0;
    playbook.modules?.forEach((mod, mIdx) => {
      mod.lessons?.forEach((les) => {
        list.push({
          id: les.id,
          title: les.title,
          description: (les as any).description || (les as any).summary,
          partTitle: mod.title,
          partIndex: mIdx + 1,
          chapterIndex: cIndex++,
        });
      });
    });

    return list;
  }, [playbook.modules]);

  // Readers also enjoyed: 8 related playbooks from catalog for smooth horizontal scroll
  const relatedBooks = useMemo(() => {
    return ALL_PLAYBOOK_SUMMARIES.filter((p) => p.slug !== playbook.slug).slice(0, 8);
  }, [playbook.slug]);

  // Curated community reviews
  const communityReviews = useMemo(
    () => getCuratedCommunityReviews(playbook.title, effectiveRating, playbook.slug),
    [playbook.title, effectiveRating, playbook.slug]
  );

  const filteredReviews = useMemo(() => {
    if (!reviewSearchQuery.trim()) return communityReviews;
    const q = reviewSearchQuery.toLowerCase();
    return communityReviews.filter(
      (r) =>
        r.headline.toLowerCase().includes(q) ||
        r.content.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q)
    );
  }, [communityReviews, reviewSearchQuery]);

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
    } catch (err: any) {
      console.error("[PLAYBOOK_CHECKOUT_ERROR]", err);
      setCheckoutError(err?.message || "Failed to initiate checkout. Please try again.");
      setIsCheckingOut(false);
    }
  };

  const handleAddToCart = () => {
    setAddedToCartToast(true);
    setTimeout(() => setAddedToCartToast(false), 3000);
    // Proceed to checkout
    handleCheckout();
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const toggleChapter = (index: number) => {
    setOpenChapterIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
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
                <div className="flex items-center justify-between gap-2 text-[13px] text-[#57534e] w-full">
                  <span className="font-medium text-[#44403c] truncate">{author.name}</span>
                  <span className="text-[12px] text-[#78716c] shrink-0">{relativePublishedDate}</span>
                </div>
              </div>

              {/* Rating & Ratings Count */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[13px] font-bold text-[#1c1917]">
                  <Star className="h-3 w-3 fill-[#d97706] text-[#d97706]" />
                  <span>{effectiveRating.toFixed(1)}</span>
                </div>
                {effectiveRatingCount && (
                  <div className="inline-flex items-center rounded-md border border-[#e7e5e4] bg-white px-1.5 py-0.5 text-[11px] text-[#78716c] shadow-2xs shrink-0 font-medium">
                    <span>
                      {typeof effectiveRatingCount === "number"
                        ? effectiveRatingCount.toLocaleString()
                        : effectiveRatingCount}{" "}
                      ratings
                    </span>
                  </div>
                )}
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

              {/* Action Buttons: Add to cart & Buy now */}
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
                      onClick={handleAddToCart}
                      disabled={isCheckingOut}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                    >
                      {isCheckingOut ? (
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        "Add to cart"
                      )}
                    </button>

                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="w-full py-2 px-4 rounded-xl bg-white hover:bg-[#eff6ff] text-[#2563eb] font-semibold text-sm border border-[#2563eb] transition-colors active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                    >
                      Buy now
                    </button>
                  </>
                )}
              </div>

              {addedToCartToast && (
                <div className="text-center text-xs text-emerald-700 font-medium bg-emerald-50 py-1.5 rounded-md border border-emerald-200 animate-fade-in">
                  ✓ Playbook added. Redirecting to checkout...
                </div>
              )}

              {/* Rate This Playbook (Integrated into Bottom of Card) */}
              <div className="pt-3 border-t border-[#f0eee6] text-center space-y-1">
                <span className="text-[11.5px] font-medium text-stone-600 block">
                  {userRating ? `You rated this ${userRating} stars` : "Rate this Playbook"}
                </span>
                <div className="flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setUserRating(star)}
                      className="p-1 text-stone-300 hover:text-amber-500 transition-colors focus:outline-none cursor-pointer"
                      title={`Rate ${star} stars`}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          (hoverRating ?? userRating ?? 0) >= star
                            ? "fill-amber-500 text-amber-500"
                            : "text-stone-300 stroke-[1.5]"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {userRating && (
                  <p className="text-[11px] text-emerald-600 font-medium">Thank you for rating!</p>
                )}
              </div>

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
                <span className="text-stone-300">•</span>
                <span className="text-stone-500">{relativePublishedDate}</span>
              </div>

              {/* Star Rating & Ratings / Reviews Count */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>
                <span className="font-bold text-sm text-[#1c1917] ml-0.5">
                  {effectiveRating.toFixed(1)}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs text-stone-500">
                  {typeof effectiveRatingCount === "number"
                    ? effectiveRatingCount.toLocaleString()
                    : effectiveRatingCount}{" "}
                  ratings
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

              <div className="flex items-center gap-3.5 sm:gap-4">
                <div
                  className="h-12 w-12 sm:h-13 sm:w-13 rounded-full text-white flex items-center justify-center font-bold text-lg sm:text-xl uppercase shrink-0 shadow-2xs"
                  style={{ backgroundColor: getAvatarBgColor(author.name) }}
                >
                  {author.name.charAt(0)}
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-[#1c1917] flex items-center gap-2">
                  {author.name}
                  <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-stone-700 text-white text-[10px]">
                    ✓
                  </span>
                </h3>
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

            {/* Ratings & Reviews Section */}
            <div className="border-t border-stone-200 pt-8 space-y-6">
              <h2 className="text-2xl font-bold text-[#1c1917]">
                Ratings & Reviews
              </h2>

              {/* What Do You Think? Box */}
              <div className="bg-white rounded-xl border border-stone-200 p-6 text-center space-y-3 shadow-2xs">
                <div className="h-10 w-10 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">
                    What do you think?
                  </h3>
                  <p className="text-xs text-stone-500">Share your thoughts with other readers</p>
                </div>

                <div className="flex items-center justify-center gap-1.5 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className="text-stone-300 hover:text-amber-500 transition-colors p-1 cursor-pointer"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          (userRating ?? 0) >= star
                            ? "fill-amber-500 text-amber-500"
                            : "stroke-[1.5]"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setIsWritingReview(!isWritingReview)}
                    className="px-5 py-2 rounded-full bg-[#1c1917] text-white hover:bg-stone-800 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    Write a Review
                  </button>
                </div>

                {isWritingReview && (
                  <div className="pt-3 max-w-lg mx-auto space-y-2.5 text-left">
                    <textarea
                      rows={3}
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="Write your review about the playbook's frameworks, mental models, and practical utility..."
                      className="w-full text-xs p-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-800"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsWritingReview(false)}
                        className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmittedReview(true);
                          setIsWritingReview(false);
                          setNewReviewText("");
                        }}
                        className="px-4 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 cursor-pointer"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                )}

                {submittedReview && (
                  <p className="text-xs text-emerald-600 font-medium">
                    ✓ Your review has been submitted for verified reader publication!
                  </p>
                )}
              </div>

              {/* Community Reviews Breakdown */}
              <div className="space-y-5">

                {/* Score & Histogram */}
                <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6 items-center bg-white rounded-xl border border-stone-200 p-5 shadow-2xs">
                  <div className="text-center sm:text-left space-y-1">
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <div className="text-3xl font-bold text-stone-900">
                      {playbook.rating?.toFixed(1) || "4.8"}
                    </div>
                    <div className="text-xs text-stone-500 font-medium">
                      {typeof playbook.ratingCount === "number"
                        ? playbook.ratingCount.toLocaleString()
                        : playbook.ratingCount}{" "}
                      ratings
                    </div>
                  </div>

                  {/* Rating Histogram */}
                  <div className="space-y-1.5 text-xs text-stone-600 font-medium">
                    {ratingBreakdown.map((item) => (
                      <div key={item.stars} className="flex items-center gap-3">
                        <span className="w-12 text-stone-500">{item.label}</span>
                        <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all duration-300"
                            style={{ width: `${item.percentage > 0 ? item.percentage : 1}%` }}
                          />
                        </div>
                        <span
                          className="w-16 text-right text-stone-400 tabular-nums"
                          title={`${item.count.toLocaleString()} ratings`}
                        >
                          {item.percentage > 0 ? `${item.percentage}%` : "<1%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Display Reviews List */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-base font-bold text-stone-900 pt-2">
                    Reviews
                  </h4>
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

        </div>
      </main>
    </div>
  );
}
