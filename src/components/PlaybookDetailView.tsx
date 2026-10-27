"use client";

import { useState, useMemo } from "react";
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
  ThumbsUp,
  UserCheck,
} from "lucide-react";
import Header from "@/components/Header";
import { IS_REVIEW_PHASE_FREE_ACCESS } from "@/lib/config";
import type { PlaybookDetailData } from "@/lib/dating-playbook-detail";
import { ALL_PLAYBOOK_SUMMARIES } from "@/lib/playbooks-catalog";
import {
  getPlaybookPageCount,
  getChapterPageRange,
  getReadingStats,
  getAuthorProfile,
  getCuratedCommunityReviews,
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

  const isFreeReview = Boolean(IS_REVIEW_PHASE_FREE_ACCESS);
  const canAccess = hasAccess || isFreeReview;

  // Book page count mapped by price tier ($3 -> 100-150, $5 -> 150-200, etc.)
  const pageCount = useMemo(
    () => getPlaybookPageCount(playbook.price, playbook.slug),
    [playbook.price, playbook.slug]
  );

  // Social reading statistics
  const readingStats = useMemo(() => getReadingStats(playbook.slug), [playbook.slug]);

  // Author profile
  const author = useMemo(() => getAuthorProfile(playbook.categoryName), [playbook.categoryName]);

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

  // Readers also enjoyed: 4 related books from catalog
  const relatedBooks = useMemo(() => {
    return ALL_PLAYBOOK_SUMMARIES.filter((p) => p.slug !== playbook.slug)
      .slice(0, 4);
  }, [playbook.slug]);

  // Curated community reviews
  const communityReviews = useMemo(
    () => getCuratedCommunityReviews(playbook.title, playbook.rating || 4.8, playbook.slug),
    [playbook.title, playbook.rating, playbook.slug]
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

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1c1917] font-sans antialiased">
      <Header />

      {/* Breadcrumbs & Top Meta */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <div className="flex items-center justify-between text-xs text-[#78716c]">
          <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <Link href="/" className="hover:text-[#1c1917] transition-colors">
              Plugd
            </Link>
            <span>›</span>
            <Link
              href={`/${playbook.categorySlug}`}
              className="hover:text-[#1c1917] transition-colors font-medium text-[#44403c]"
            >
              {playbook.categoryName}
            </Link>
            <span>›</span>
            <span className="text-[#a8a29e] truncate">{playbook.title}</span>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-stone-200 hover:border-stone-400 bg-white text-stone-600 transition-colors shrink-0 shadow-2xs"
            title="Share this Playbook"
          >
            {copiedLink ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-[11px] text-emerald-600 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span className="text-[11px]">Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Book Showcase (Two-Column Goodreads Layout) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[330px_1fr] gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="flex flex-col items-center md:items-start space-y-6 md:sticky md:top-24">
            
            {/* Book Cover (Curved corners & realistic book shadow) */}
            <div className="relative w-full max-w-[280px] md:max-w-[320px] aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border border-stone-200/90 bg-white transition-transform hover:scale-[1.01] duration-300">
              {playbook.thumbnail ? (
                <Image
                  src={playbook.thumbnail}
                  alt={playbook.title}
                  fill
                  sizes="(max-width: 768px) 280px, 320px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-stone-900 to-stone-800 text-white">
                  <BookOpen className="h-14 w-14 mb-4 text-stone-400" />
                  <span className="font-serif text-lg font-bold leading-snug">{playbook.title}</span>
                </div>
              )}
              {/* Subtle book spine lighting effect */}
              <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl pointer-events-none" />
            </div>

            {/* Price & Action Box */}
            <div className="w-full max-w-[280px] md:max-w-[320px] bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
              
              {/* Price Header */}
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-serif text-[#1c1917]">
                    ${playbook.price.toFixed(2)}
                  </span>
                  {playbook.originalPrice > playbook.price && (
                    <span className="text-base text-stone-400 line-through">
                      ${playbook.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {playbook.originalPrice > playbook.price && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                    {Math.round(((playbook.originalPrice - playbook.price) / playbook.originalPrice) * 100)}% off
                  </span>
                )}
              </div>

              <div className="text-[12px] text-stone-500 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Digital Playbook Edition · Instant Lifetime Access
              </div>

              {checkoutError && (
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 leading-snug">
                  {checkoutError}
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                {canAccess ? (
                  <Link
                    href={`/learn/${playbook.slug}`}
                    className="w-full py-3 px-4 rounded-lg bg-[#1c1917] hover:bg-stone-800 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    Read Playbook
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={handleAddToCart}
                      disabled={isCheckingOut}
                      className="w-full py-3 px-4 rounded-lg bg-[#2e6930] hover:bg-[#255427] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] disabled:opacity-50"
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
                      className="w-full py-2.5 px-4 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-800 font-semibold text-sm border border-stone-300 transition-colors active:scale-[0.99] disabled:opacity-50"
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
            </div>

            {/* Rate This Playbook Widget (Matches Screenshot 1 Bottom Left) */}
            <div className="w-full max-w-[280px] md:max-w-[320px] bg-white rounded-xl border border-stone-200 p-4 shadow-2xs text-center space-y-2">
              <span className="text-xs font-medium text-stone-600 block">
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
                    className="p-1 text-stone-300 hover:text-amber-500 transition-colors focus:outline-none"
                    title={`Rate ${star} stars`}
                  >
                    <Star
                      className={`h-6 w-6 ${
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

          {/* ================= RIGHT COLUMN ================= */}
          <div className="space-y-8">
            
            {/* Book Title & Author Header */}
            <div className="space-y-2.5">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1c1917] leading-tight tracking-tight">
                {playbook.title}
              </h1>

              {/* Author / Publisher with Verified Badge */}
              <div className="flex items-center gap-2 text-stone-700 text-sm">
                <span className="font-medium text-[#292524]">{author.name}</span>
                <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-stone-700 text-white text-[10px]" title="Verified Publisher">
                  ✓
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-stone-500">{playbook.categoryName}</span>
              </div>

              {/* Star Rating & Ratings / Reviews Count (Matches Screenshot 1) */}
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
                  {playbook.rating?.toFixed(1) || "4.8"}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs text-stone-500">
                  {typeof playbook.ratingCount === "number"
                    ? playbook.ratingCount.toLocaleString()
                    : playbook.ratingCount}{" "}
                  ratings
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs text-stone-500">312 reviews</span>
              </div>
            </div>

            {/* Book Description / Synopsis */}
            <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed text-[15px] space-y-3 font-serif">
              <p className="font-normal text-stone-800 leading-relaxed text-base">
                {playbook.headline || playbook.description}
              </p>

              <div className={`space-y-3 ${!isDescriptionExpanded ? "line-clamp-4" : ""}`}>
                <p>
                  {playbook.description}
                </p>
                <p>
                  Engineered with the tactical precision of classic foundational business treatises, this playbook cuts through superficial theory and fleeting internet tactics. Rather than teaching commoditized trivia, each chapter systematically unpacks mental models, defensible operational architectures, unit economics, and step-by-step systems designed to create asymmetric leverage.
                </p>
                <p>
                  Every section delivers concrete decision frameworks, failure analysis matrices, worked financial models, and battle-tested execution blueprints.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-stone-900 font-sans font-semibold text-xs flex items-center gap-1 hover:underline pt-1 cursor-pointer"
              >
                {isDescriptionExpanded ? (
                  <>Show less <ChevronUp className="h-3.5 w-3.5" /></>
                ) : (
                  <>Show more <ChevronDown className="h-3.5 w-3.5" /></>
                )}
              </button>
            </div>

            {/* Book Details & Editions (Matches Screenshot 2) */}
            <div className="border-t border-b border-stone-200 py-3">
              <button
                type="button"
                onClick={() => setIsBookDetailsOpen(!isBookDetailsOpen)}
                className="w-full flex items-center justify-between text-left text-xs font-semibold text-stone-800 hover:text-stone-950"
              >
                <span>Book details & editions</span>
                {isBookDetailsOpen ? (
                  <ChevronUp className="h-4 w-4 text-stone-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-stone-500" />
                )}
              </button>

              {isBookDetailsOpen && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3.5 text-xs text-stone-600">
                  <div>
                    <span className="text-stone-400 block text-[11px]">Format</span>
                    <span className="font-medium text-stone-800">Digital Edition / Playbook</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">Length</span>
                    <span className="font-medium text-stone-800">{pageCount} pages</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">Language</span>
                    <span className="font-medium text-stone-800">English</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">Published</span>
                    <span className="font-medium text-stone-800">Plugd Publishing</span>
                  </div>
                </div>
              )}
            </div>

            {/* Social Reading Activity (Matches Screenshot 2) */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-stone-600 py-1">
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                    alt="Reader"
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                    alt="Reader"
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                    alt="Reader"
                  />
                </div>
                <span>
                  <strong className="text-stone-800 font-semibold">{readingStats.currentlyReading}</strong> people are currently reading
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80"
                    alt="Reader"
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80"
                    alt="Reader"
                  />
                </div>
                <span>
                  <strong className="text-stone-800 font-semibold">{readingStats.wantToRead}</strong> people want to read
                </span>
              </div>
            </div>

            {/* Table of Contents & Chapter Index (Book-style) */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#1c1917]">
                    Table of Contents & Index
                  </h2>
                  <p className="text-xs text-stone-500">
                    {playbook.modules?.length || 7} Parts · {chapters.length} Chapters · {pageCount} Total Pages
                  </p>
                </div>
                <Link
                  href={`/learn/${playbook.slug}`}
                  className="text-xs font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 hover:underline"
                >
                  Open Table of Contents <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Front Matter */}
              <div className="bg-white rounded-lg border border-stone-200 p-3.5 flex items-center justify-between text-xs text-stone-700">
                <div className="flex items-center gap-3">
                  <span className="font-serif font-bold text-stone-400">Front Matter</span>
                  <span className="font-medium text-stone-800">Cover, Preface, Index & Operational Thesis</span>
                </div>
                <span className="text-stone-400 font-mono text-[11px]">pp. 1 – 8</span>
              </div>

              {/* Parts & Chapters List */}
              <div className="space-y-2.5">
                {playbook.modules?.map((mod, mIdx) => {
                  const isOpen = openChapterIndices.includes(mIdx);
                  const firstChapterIdx = mIdx * 4;
                  const lastChapterIdx = firstChapterIdx + (mod.lessons?.length || 4) - 1;
                  const partPageStart = getChapterPageRange(firstChapterIdx, chapters.length, pageCount).startPage;
                  const partPageEnd = getChapterPageRange(lastChapterIdx, chapters.length, pageCount).endPage;

                  return (
                    <div
                      key={mod.id || mIdx}
                      className="bg-white rounded-lg border border-stone-200 overflow-hidden shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={() => toggleChapter(mIdx)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-stone-50 transition-colors cursor-pointer"
                      >
                        <div className="space-y-0.5 pr-4">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                            Part {mIdx + 1}
                          </span>
                          <h3 className="font-serif font-bold text-sm text-[#1c1917] leading-snug">
                            {mod.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 text-xs text-stone-500">
                          <span className="font-mono text-[11px] text-stone-400">
                            pp. {partPageStart} – {partPageEnd}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="border-t border-stone-100 bg-[#FAFAF8] divide-y divide-stone-100">
                          {mod.lessons?.map((les, lIdx) => {
                            const globalChapterIndex = mIdx * 4 + lIdx;
                            const range = getChapterPageRange(globalChapterIndex, chapters.length, pageCount);

                            return (
                              <div
                                key={les.id || lIdx}
                                className="px-4 py-3 flex items-center justify-between text-xs hover:bg-white transition-colors"
                              >
                                <div className="space-y-0.5 pr-4">
                                  <div className="flex items-center gap-2">
                                    <span className="text-stone-400 font-mono text-[11px]">
                                      {mIdx + 1}.{lIdx + 1}
                                    </span>
                                    <span className="font-medium text-stone-800">
                                      {les.title}
                                    </span>
                                  </div>
                                </div>
                                <span className="font-mono text-[11px] text-stone-400 shrink-0">
                                  pp. {range.startPage} – {range.endPage}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* About the Author (Matches Screenshot 2) */}
            <div className="border-t border-stone-200 pt-8 space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#1c1917]">
                About the author
              </h2>

              <div className="flex items-start gap-4">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-14 w-14 rounded-full object-cover border border-stone-200 shrink-0"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-[#1c1917] flex items-center gap-1.5">
                        {author.name}
                        <span className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full bg-stone-700 text-white text-[9px]">
                          ✓
                        </span>
                      </h3>
                      <p className="text-xs text-stone-500">
                        {author.booksCount} books · {author.followersCount} followers
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFollowingAuthor(!isFollowingAuthor)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        isFollowingAuthor
                          ? "bg-stone-200 text-stone-800"
                          : "bg-[#1c1917] text-white hover:bg-stone-800"
                      }`}
                    >
                      {isFollowingAuthor ? "Following" : "Follow"}
                    </button>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed font-serif pt-1">
                    {author.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Readers Also Enjoyed (Matches Screenshot 3) */}
            <div className="border-t border-stone-200 pt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-[#1c1917]">
                  Readers <span className="italic font-normal">also enjoyed</span>
                </h2>
                <Link
                  href="/"
                  className="text-xs font-semibold text-stone-700 hover:text-stone-950 hover:underline"
                >
                  All similar books ›
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedBooks.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/${rel.slug}`}
                    className="group flex flex-col space-y-2 bg-white rounded-lg border border-stone-200 p-2.5 shadow-2xs hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-[4/5] rounded-md overflow-hidden bg-stone-100 border border-stone-200">
                      {rel.thumbnail ? (
                        <Image
                          src={rel.thumbnail}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-stone-400 p-2 text-center">
                          {rel.title}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-xs font-bold text-stone-900 line-clamp-2 leading-snug group-hover:underline">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] text-stone-500">Plugd Publishing</p>
                      <div className="flex items-center justify-between pt-0.5 text-[11px]">
                        <span className="flex items-center gap-1 font-bold text-stone-800">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          {rel.rating}
                        </span>
                        <span className="font-semibold text-stone-900">
                          ${rel.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Ratings & Reviews Section (Matches Screenshots 4 & 5) */}
            <div className="border-t border-stone-200 pt-8 space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#1c1917]">
                Ratings & Reviews
              </h2>

              {/* What Do You Think? Box (Matches Screenshot 4) */}
              <div className="bg-white rounded-xl border border-stone-200 p-6 text-center space-y-3 shadow-2xs">
                <div className="h-10 w-10 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    What do <span className="italic font-normal">you</span> think?
                  </h3>
                  <p className="text-xs text-stone-500">Share your thoughts with other operators</p>
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
                      placeholder="Write your detailed review about the book's frameworks, mental models, and practical utility..."
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

              {/* Community Reviews Breakdown (Matches Screenshot 5) */}
              <div className="space-y-5">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Community Reviews
                </h3>

                {/* Score & Histogram */}
                <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6 items-center bg-white rounded-xl border border-stone-200 p-5 shadow-2xs">
                  <div className="text-center sm:text-left space-y-1">
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <div className="font-serif text-3xl font-bold text-stone-900">
                      {playbook.rating?.toFixed(1) || "4.8"}
                    </div>
                    <div className="text-xs text-stone-500">
                      {typeof playbook.ratingCount === "number"
                        ? playbook.ratingCount.toLocaleString()
                        : playbook.ratingCount}{" "}
                      ratings · 312 reviews
                    </div>
                  </div>

                  {/* Rating Histogram */}
                  <div className="space-y-1.5 text-xs text-stone-600">
                    <div className="flex items-center gap-3">
                      <span className="w-12 text-stone-500">5 stars</span>
                      <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: "72%" }} />
                      </div>
                      <span className="w-16 text-right text-stone-400">72%</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="w-12 text-stone-500">4 stars</span>
                      <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: "20%" }} />
                      </div>
                      <span className="w-16 text-right text-stone-400">20%</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="w-12 text-stone-500">3 stars</span>
                      <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: "5%" }} />
                      </div>
                      <span className="w-16 text-right text-stone-400">5%</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="w-12 text-stone-500">2 stars</span>
                      <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: "2%" }} />
                      </div>
                      <span className="w-16 text-right text-stone-400">2%</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="w-12 text-stone-500">1 star</span>
                      <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: "1%" }} />
                      </div>
                      <span className="w-16 text-right text-stone-400">1%</span>
                    </div>
                  </div>
                </div>

                {/* Search / Filter Reviews Input (Matches Screenshot 5) */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
                    <input
                      type="text"
                      value={reviewSearchQuery}
                      onChange={(e) => setReviewSearchQuery(e.target.value)}
                      placeholder="Search review text..."
                      className="w-full text-xs pl-9 pr-4 py-2.5 rounded-full border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-stone-800 placeholder-stone-400"
                    />
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-stone-200 bg-white text-xs font-medium text-stone-700 hover:bg-stone-50 shadow-2xs"
                  >
                    <SlidersHorizontal className="h-3 w-3" />
                    <span>Filters</span>
                  </button>
                </div>

                {/* Display Reviews List */}
                <div className="space-y-4 pt-2">
                  {filteredReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.avatar}
                            alt={rev.name}
                            className="h-10 w-10 rounded-full object-cover border border-stone-200"
                          />
                          <div>
                            <span className="font-bold text-xs text-stone-900 block">{rev.name}</span>
                            <div className="flex items-center gap-2 text-[11px] text-stone-500">
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

                        <span className="text-[11px] text-stone-400">Verified Reader</span>
                      </div>

                      <div className="space-y-1 text-xs">
                        <h4 className="font-serif font-bold text-stone-900 text-[13px]">
                          {rev.headline}
                        </h4>
                        <p className="text-stone-700 leading-relaxed font-serif">
                          {rev.content}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px] text-stone-500">
                        <button
                          type="button"
                          className="flex items-center gap-1 text-stone-500 hover:text-stone-900 transition-colors"
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span>Helpful ({rev.likes})</span>
                        </button>
                        <span>Verified purchase</span>
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
