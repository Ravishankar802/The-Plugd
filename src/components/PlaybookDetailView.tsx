"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  Play,
  FileText,
  Globe,
  Clock,
  Subtitles,
  ShieldCheck,
  Smartphone,
  Infinity as InfinityIcon,
  Layers,
  Video,
  Share2,
  Heart,
  Info,
} from "lucide-react";
import Header from "@/components/Header";
import type { PlaybookDetailData } from "@/lib/dating-playbook-detail";

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
  const [openModuleIds, setOpenModuleIds] = useState<string[]>(
    playbook.modules.slice(0, 3).map((m) => m.id)
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const heroCtaRef = useRef<HTMLDivElement | null>(null);

  // Direct checkout handler (triggers Dodo checkout session)
  const handleCheckout = async () => {
    if (hasAccess) {
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

  // Scroll observer to trigger top & mobile sticky purchase bars
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Auto-checkout if redirected with ?checkout=true
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("checkout") === "true") {
        handleCheckout();
      }
    } catch {}

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Accordion toggle for individual modules
  const toggleModule = (id: string) => {
    setOpenModuleIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  // Accordion expand / collapse all modules
  const areAllExpanded = openModuleIds.length === playbook.modules.length;
  const toggleAllModules = () => {
    if (areAllExpanded) {
      setOpenModuleIds([]);
    } else {
      setOpenModuleIds(playbook.modules.map((m) => m.id));
    }
  };

  // Copy share link handler
  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2200);
      }
    } catch {}
  };

  const formattedPrice = Number(playbook.price).toFixed(2);
  const formattedOriginalPrice = Number(playbook.originalPrice).toFixed(2);

  return (
    <div className="min-h-screen bg-white text-[#1c1917] font-sans antialiased selection:bg-[#a435f0] selection:text-white">
      {/* Sticky Platform Header */}
      <Header variant="platform" hasAccess={hasAccess} />

      {/* TOP FLOATING STICKY BAR (Udemy Pattern on Scroll) */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-[#1c1d1f] text-white border-b border-zinc-700 shadow-md transition-all duration-300 ease-in-out ${
          showStickyBar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          {/* Left: Title & Rating */}
          <div className="min-w-0 flex items-center gap-3">
            <span className="font-bold text-sm sm:text-base text-white truncate max-w-[320px] sm:max-w-[480px]">
              {playbook.title}
            </span>
            {playbook.badge && (
              <span className="hidden md:inline-flex items-center px-2 py-0.5 text-[11px] font-bold bg-[#eceb98] text-[#3d3c0a] rounded-xs shrink-0">
                {playbook.badge}
              </span>
            )}
            <div className="hidden sm:flex items-center gap-1 text-xs shrink-0">
              <span className="font-bold text-[#f3ca8c]">{playbook.rating}</span>
              <Star className="h-3.5 w-3.5 fill-[#e59819] text-[#e59819]" />
              <span className="text-[#cec0fc] underline">
                ({playbook.ratingCount} ratings)
              </span>
            </div>
          </div>

          {/* Right: Price & CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-bold text-white">
                ${formattedPrice}
              </span>
              <span className="text-xs text-zinc-400 line-through">
                ${formattedOriginalPrice}
              </span>
            </div>

            {hasAccess ? (
              <Link
                href={`/learn/${playbook.slug}`}
                className="inline-flex items-center justify-center px-4 py-2 bg-[#a435f0] hover:bg-[#8710d8] text-white text-xs sm:text-sm font-bold rounded-xs transition-colors"
              >
                Go to Playbook →
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="inline-flex items-center justify-center px-4 py-2 bg-[#a435f0] hover:bg-[#8710d8] text-white text-xs sm:text-sm font-bold rounded-xs transition-colors cursor-pointer"
              >
                {isCheckingOut ? "Connecting..." : "Buy now"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SECTION: UDEMY-STYLE HERO (Dark background) */}
      <section className="bg-[#1c1d1f] text-white pt-6 pb-8 lg:pt-8 lg:pb-10 relative overflow-hidden">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="lg:w-[65%] xl:w-[68%] pr-0 lg:pr-8">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm mb-3 font-semibold text-[#cec0fc]">
              <Link href="/" className="hover:underline">
                Plugd
              </Link>
              <span className="text-zinc-500 font-normal">›</span>
              <Link
                href={`/categories/${playbook.categorySlug}`}
                className="hover:underline"
              >
                {playbook.categoryName}
              </Link>
              <span className="text-zinc-500 font-normal">›</span>
              <span className="text-zinc-300 font-normal truncate max-w-[200px] sm:max-w-none">
                {playbook.title}
              </span>
            </nav>

            {/* Playbook Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight leading-[1.2] mt-2">
              {playbook.title}
            </h1>

            {/* Short Subtitle / Description */}
            <p className="mt-3 text-base sm:text-lg text-zinc-200 leading-relaxed max-w-3xl">
              {playbook.description}
            </p>

            {/* Ratings & Metadata Row */}
            <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-3 text-xs sm:text-sm">
              {playbook.badge && (
                <span className="inline-flex items-center px-2 py-0.5 text-xs font-bold bg-[#eceb98] text-[#3d3c0a] rounded-xs">
                  {playbook.badge}
                </span>
              )}

              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#f3ca8c] text-sm sm:text-base">
                  {playbook.rating}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-[#e59819] text-[#e59819]"
                    />
                  ))}
                </div>
                <a href="#reviews" className="text-[#cec0fc] underline ml-1 hover:text-white transition-colors">
                  ({playbook.ratingCount} ratings)
                </a>
              </div>

              <span className="text-zinc-400">·</span>
              <span className="text-zinc-200">{playbook.studentsCount} students</span>
            </div>

            {/* Creator / Date / Language Row */}
            <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-center gap-1">
                <span>Created by</span>
                <span className="text-[#cec0fc] underline font-medium cursor-pointer">
                  {playbook.instructorName}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-zinc-400" />
                <span>Last updated {playbook.lastUpdated}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-zinc-400" />
                <span>{playbook.language}</span>
              </div>

              {playbook.subtitles && (
                <div className="flex items-center gap-1.5">
                  <Subtitles className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{playbook.subtitles}</span>
                </div>
              )}
            </div>

            {/* Mobile-Only Purchase Card within Hero */}
            <div ref={heroCtaRef} className="block lg:hidden mt-6">
              <div className="rounded-xs border border-zinc-700 bg-white text-[#1c1917] overflow-hidden shadow-lg">
                {/* Thumbnail Preview */}
                <div className="relative aspect-video w-full bg-zinc-900">
                  <Image
                    src={playbook.thumbnail}
                    alt={playbook.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-white/90 text-[#1c1917] flex items-center justify-center shadow-lg">
                      <Play className="h-5 w-5 fill-[#1c1917] ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Mobile Purchase Actions */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-extrabold text-[#1c1917] tracking-tight">
                      ${formattedPrice}
                    </span>
                    <span className="text-base text-zinc-500 line-through">
                      ${formattedOriginalPrice}
                    </span>
                    <span className="text-sm font-semibold text-[#1c1917]">
                      {playbook.discountPercentage}% off
                    </span>
                  </div>

                  {checkoutError && (
                    <div className="rounded border border-red-200 bg-red-50 p-2 text-xs text-red-700 mb-3">
                      {checkoutError}
                    </div>
                  )}

                  {hasAccess ? (
                    <Link
                      href={`/learn/${playbook.slug}`}
                      className="w-full h-12 bg-[#a435f0] hover:bg-[#8710d8] text-white font-bold text-base rounded-xs transition-colors flex items-center justify-center shadow-sm"
                    >
                      Go to Playbook →
                    </Link>
                  ) : (
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full h-12 bg-[#a435f0] hover:bg-[#8710d8] text-white font-bold text-base rounded-xs transition-colors shadow-sm cursor-pointer"
                      >
                        {isCheckingOut ? "Connecting to Checkout..." : "Add to cart"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full h-12 bg-white hover:bg-zinc-50 text-[#1c1917] font-bold text-base rounded-xs border border-[#1c1917] transition-colors cursor-pointer"
                      >
                        Buy now
                      </button>
                    </div>
                  )}

                  <p className="mt-2 text-center text-xs text-zinc-500">
                    Instant digital access · One-time payment · Lifetime access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: MAIN BODY (White background with 2 columns) */}
      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_370px] gap-8 xl:gap-12 items-start relative">
            {/* LEFT COLUMN: Course content & details */}
            <div className="min-w-0">
              {/* 1. "What you'll learn" Card (Framed box matching Udemy) */}
              <div className="border border-[#d1d7dc] bg-white p-5 sm:p-6 mb-8 rounded-none">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1c1917] mb-4">
                  What you&apos;ll learn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                  {playbook.whatYouWillLearn.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-[#1c1917] shrink-0 mt-1 stroke-[2.5]" />
                      <span className="text-sm text-[#2d2f31] leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. "Explore related topics" (Udemy chip pills) */}
              {playbook.relatedTopics && playbook.relatedTopics.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#1c1917] mb-3">
                    Explore related topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {playbook.relatedTopics.map((topic) => (
                      <Link
                        key={topic}
                        href={`/categories/${playbook.categorySlug}`}
                        className="inline-flex items-center px-4 py-2 rounded-full border border-[#d1d7dc] bg-white hover:bg-zinc-50 text-sm font-semibold text-[#1c1917] transition-colors"
                      >
                        {topic}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. "Course content" Accordion Section */}
              <div id="content" className="mb-10 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1c1917] mb-2">
                  Course content
                </h2>

                {/* Subtitle & Expand all toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-[#6a6f73] mb-3 gap-2">
                  <span>
                    {playbook.modulesCount} sections • {playbook.lessonsCount} lectures •{" "}
                    {playbook.hoursOfMaterial} total length
                  </span>
                  <button
                    type="button"
                    onClick={toggleAllModules}
                    className="font-bold text-[#5022c3] hover:text-[#3b198f] self-start sm:self-auto cursor-pointer"
                  >
                    {areAllExpanded ? "Collapse all sections" : "Expand all sections"}
                  </button>
                </div>

                {/* Modules Accordion */}
                <div className="border border-[#d1d7dc] divide-y divide-[#d1d7dc] bg-[#f7f9fa]">
                  {playbook.modules.map((module) => {
                    const isOpen = openModuleIds.includes(module.id);
                    return (
                      <div key={module.id} className="group">
                        {/* Module Header Button */}
                        <button
                          type="button"
                          onClick={() => toggleModule(module.id)}
                          aria-expanded={isOpen}
                          className="w-full px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3 text-left hover:bg-[#f1f3f5] transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <ChevronDown
                              className={`h-4 w-4 text-[#1c1917] shrink-0 transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                            <span className="font-bold text-[#2d2f31] text-sm sm:text-[15.5px] leading-snug">
                              Module {module.number}: {module.title}
                            </span>
                          </div>

                          <div className="text-xs text-[#6a6f73] shrink-0 whitespace-nowrap ml-2">
                            <span>
                              {module.lessons.length} lectures • {module.duration}
                            </span>
                          </div>
                        </button>

                        {/* Module Expanded Lessons List */}
                        {isOpen && (
                          <div className="bg-white border-t border-[#d1d7dc] divide-y divide-zinc-100">
                            {module.description && (
                              <div className="px-4 sm:px-6 py-2.5 text-xs sm:text-[13px] text-zinc-600 bg-zinc-50/70 italic">
                                {module.description}
                              </div>
                            )}
                            {module.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs sm:text-sm text-[#2d2f31] hover:bg-zinc-50 transition-colors"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <FileText className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                                  <span className="truncate">
                                    {lesson.number} {lesson.title}
                                  </span>
                                </div>

                                <div className="flex items-center gap-3 shrink-0 ml-3">
                                  {lesson.isPreview && (
                                    <span className="text-[#5022c3] text-xs font-semibold underline">
                                      Preview
                                    </span>
                                  )}
                                  <span className="text-zinc-500 text-xs">
                                    {lesson.duration}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. "Requirements" Section */}
              <div className="mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1c1917] mb-3">
                  Requirements
                </h2>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#2d2f31]">
                  {playbook.requirements.map((req, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 5. "Description" Section (with Show more toggle) */}
              <div className="mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1c1917] mb-3">
                  Description
                </h2>

                <div
                  className={`relative text-sm sm:text-[14.5px] text-[#2d2f31] leading-relaxed space-y-3.5 overflow-hidden transition-all ${
                    isDescriptionExpanded ? "max-h-none" : "max-h-[260px]"
                  }`}
                >
                  {playbook.descriptionSections.intro.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}

                  {playbook.descriptionSections.keyPointsTitle && (
                    <h3 className="font-bold text-[#1c1917] text-base pt-2">
                      {playbook.descriptionSections.keyPointsTitle}
                    </h3>
                  )}

                  {playbook.descriptionSections.keyPoints && (
                    <ul className="list-disc pl-5 space-y-1">
                      {playbook.descriptionSections.keyPoints.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  )}

                  {playbook.descriptionSections.closing &&
                    playbook.descriptionSections.closing.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}

                  {/* Gradient Fade when collapsed */}
                  {!isDescriptionExpanded && (
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#5022c3] hover:text-[#3b198f] cursor-pointer"
                >
                  <span>{isDescriptionExpanded ? "Show less" : "Show more"}</span>
                  {isDescriptionExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* 6. "Who this course is for" Section */}
              <div className="mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1c1917] mb-3">
                  Who this course is for:
                </h2>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#2d2f31]">
                  {playbook.targetAudience.map((audience, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {audience}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 7. "Instructor" Section */}
              <div className="mb-12 border-t border-zinc-200 pt-8">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1c1917] mb-4">
                  Instructor
                </h2>

                <div>
                  <h3 className="text-lg font-bold text-[#5022c3] underline cursor-pointer">
                    {playbook.instructorName}
                  </h3>
                  <p className="text-sm text-zinc-600 mt-0.5">
                    {playbook.instructorTitle}
                  </p>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="h-24 w-24 rounded-full border border-zinc-200 overflow-hidden bg-zinc-100 shrink-0 relative">
                      <Image
                        src="/icon.png"
                        alt={playbook.instructorName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1 text-xs sm:text-sm text-[#2d2f31]">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-[#e59819] text-[#e59819]" />
                        <span>{playbook.instructorRating} Instructor Rating</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-zinc-500" />
                        <span>{playbook.instructorReviews} Reviews</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-zinc-500" />
                        <span>{playbook.instructorStudents} Students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Play className="h-4 w-4 text-zinc-500" />
                        <span>{playbook.instructorCourses} Course</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-[#2d2f31] leading-relaxed max-w-2xl">
                    {playbook.instructorBio}
                  </p>
                </div>
              </div>

              {/* 8. Student Feedback & Testimonials */}
              <div id="reviews" className="mb-12 border-t border-zinc-200 pt-8 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1c1917] mb-6">
                  Student feedback
                </h2>

                {/* Rating Aggregate Score */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                  <div className="flex flex-col items-center justify-center p-6 bg-zinc-50 rounded border border-zinc-200 sm:w-48 text-center">
                    <span className="text-5xl font-extrabold text-[#b4690e]">
                      {playbook.rating}
                    </span>
                    <div className="flex items-center gap-0.5 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-[#e59819] text-[#e59819]"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#b4690e] mt-1">
                      Course Rating
                    </span>
                  </div>

                  {/* Rating Breakdown Bars */}
                  <div className="flex-1 space-y-2 text-xs text-zinc-600">
                    {[
                      { star: 5, pct: "78%" },
                      { star: 4, pct: "16%" },
                      { star: 3, pct: "4%" },
                      { star: 2, pct: "1%" },
                      { star: 1, pct: "1%" },
                    ].map((row) => (
                      <div key={row.star} className="flex items-center gap-3">
                        <div className="w-14 shrink-0 flex items-center gap-1">
                          <span>{row.star} stars</span>
                        </div>
                        <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-zinc-600"
                            style={{ width: row.pct }}
                          />
                        </div>
                        <span className="w-10 text-right">{row.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="divide-y divide-zinc-200">
                  {playbook.testimonials.map((t, idx) => (
                    <div key={idx} className="py-6 first:pt-0">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-zinc-800 text-white font-bold text-sm flex items-center justify-center shrink-0">
                          {t.initials}
                        </div>

                        <div className="flex-1">
                          <div className="font-bold text-sm text-[#1c1917]">
                            {t.name}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex items-center">
                              {[...Array(t.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-3.5 w-3.5 fill-[#e59819] text-[#e59819]"
                                />
                              ))}
                            </div>
                            <span className="text-xs text-zinc-500">{t.date}</span>
                          </div>

                          <p className="mt-2 text-sm text-[#2d2f31] leading-relaxed">
                            {t.quote}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 9. FAQs */}
              <div id="faq" className="border-t border-zinc-200 pt-8 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1c1917] mb-6">
                  Frequently Asked Questions
                </h2>

                <div className="divide-y divide-zinc-200 border-y border-zinc-200">
                  {playbook.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="py-4">
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          aria-expanded={isOpen}
                          className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                        >
                          <span className="font-bold text-sm sm:text-base text-[#1c1917] group-hover:text-[#5022c3] transition-colors pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="mt-2.5 text-sm text-zinc-600 leading-relaxed pr-8">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: DESKTOP FLOATING PURCHASE CARD (UDEMY PATTERN) */}
            <div className="hidden lg:block relative">
              <div className="sticky top-6 -mt-[310px] z-30 w-full bg-white text-[#1c1917] border border-[#d1d7dc] shadow-2xl rounded-none overflow-hidden">
                {/* 16:9 Thumbnail with Play Overlay */}
                <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden group">
                  <Image
                    src={playbook.thumbnail}
                    alt={playbook.title}
                    fill
                    sizes="(max-width: 1280px) 340px, 370px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center">
                    <div className="h-14 w-14 rounded-full bg-white text-[#1c1917] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 fill-[#1c1917] ml-0.5" />
                    </div>
                    <span className="text-white text-xs font-bold mt-2 drop-shadow">
                      Preview this playbook
                    </span>
                  </div>
                </div>

                {/* Card Interior */}
                <div className="p-5 xl:p-6">
                  {/* Pricing row */}
                  <div className="flex items-baseline gap-2.5 mb-1">
                    <span className="text-3xl font-extrabold text-[#1c1917] tracking-tight">
                      ${formattedPrice}
                    </span>
                    <span className="text-base text-zinc-500 line-through">
                      ${formattedOriginalPrice}
                    </span>
                    <span className="text-sm font-semibold text-[#1c1917]">
                      {playbook.discountPercentage}% off
                    </span>
                  </div>

                  <p className="text-xs text-[#b32d0f] font-semibold mb-4">
                    Special launch price · Lifetime access
                  </p>

                  {/* Checkout Error Alert */}
                  {checkoutError && (
                    <div className="rounded border border-red-200 bg-red-50 p-2.5 text-xs text-red-700 mb-3">
                      {checkoutError}
                    </div>
                  )}

                  {/* CTAs */}
                  {hasAccess ? (
                    <div className="space-y-2">
                      <Link
                        href={`/learn/${playbook.slug}`}
                        className="w-full h-12 bg-[#a435f0] hover:bg-[#8710d8] text-white font-bold text-base rounded-none transition-colors flex items-center justify-center shadow-sm"
                      >
                        Go to Playbook →
                      </Link>
                      <p className="text-center text-xs text-zinc-500 pt-1">
                        ✓ You own lifetime access to this playbook
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full h-12 bg-[#a435f0] hover:bg-[#8710d8] text-white font-bold text-base rounded-none transition-colors shadow-sm cursor-pointer"
                      >
                        {isCheckingOut ? "Connecting to Checkout..." : "Add to cart"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full h-12 bg-white hover:bg-zinc-50 text-[#1c1917] font-bold text-base rounded-none border border-[#1c1917] transition-colors cursor-pointer"
                      >
                        Buy now
                      </button>
                      <p className="text-center text-[11.5px] text-zinc-500 pt-1">
                        Instant digital access · One-time payment
                      </p>
                    </div>
                  )}

                  {/* "This course includes:" Feature Inclusions */}
                  <div className="mt-6 pt-5 border-t border-zinc-200">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1c1917] mb-3">
                      This playbook includes:
                    </h3>
                    <ul className="space-y-2.5 text-xs text-[#2d2f31]">
                      {playbook.includes.map((inc, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          {inc.iconName === "video" && (
                            <Video className="h-4 w-4 text-zinc-500 shrink-0" />
                          )}
                          {inc.iconName === "layers" && (
                            <Layers className="h-4 w-4 text-zinc-500 shrink-0" />
                          )}
                          {inc.iconName === "file-text" && (
                            <FileText className="h-4 w-4 text-zinc-500 shrink-0" />
                          )}
                          {inc.iconName === "smartphone" && (
                            <Smartphone className="h-4 w-4 text-zinc-500 shrink-0" />
                          )}
                          {inc.iconName === "infinity" && (
                            <InfinityIcon className="h-4 w-4 text-zinc-500 shrink-0" />
                          )}
                          {inc.iconName === "shield-check" && (
                            <ShieldCheck className="h-4 w-4 text-zinc-500 shrink-0" />
                          )}
                          <span>{inc.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Share & Links */}
                  <div className="mt-5 pt-4 border-t border-zinc-200 flex items-center justify-between text-xs font-bold text-[#1c1917]">
                    <button
                      type="button"
                      onClick={handleShare}
                      className="inline-flex items-center gap-1.5 hover:text-[#5022c3] cursor-pointer"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      <span>{copiedLink ? "Link copied!" : "Share"}</span>
                    </button>
                    <span className="text-zinc-300">|</span>
                    <a href="#faq" className="hover:text-[#5022c3]">
                      Apply Coupon
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE FIXED BOTTOM PURCHASE BAR */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-200 p-3 shadow-2xl transition-all duration-300 ${
          showStickyBar ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-[#1c1917]">
                ${formattedPrice}
              </span>
              <span className="text-xs text-zinc-400 line-through">
                ${formattedOriginalPrice}
              </span>
            </div>
            <span className="text-[11px] text-[#b32d0f] font-semibold">
              {playbook.discountPercentage}% off
            </span>
          </div>

          {hasAccess ? (
            <Link
              href={`/learn/${playbook.slug}`}
              className="px-5 py-2.5 bg-[#a435f0] text-white font-bold text-sm rounded-xs transition-colors shrink-0"
            >
              Go to Playbook →
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="px-6 py-2.5 bg-[#a435f0] text-white font-bold text-sm rounded-xs transition-colors shrink-0 cursor-pointer"
            >
              {isCheckingOut ? "Connecting..." : "Buy now"}
            </button>
          )}
        </div>
      </div>

      {/* MINIMAL FOOTER */}
      <footer className="border-t border-[#e7e5e4] bg-[#faf8f5] py-10 text-xs text-[#78716c] pb-24 lg:pb-10">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1c1917]">Plugd</span>
            <span>·</span>
            <span>Outcome-focused Playbooks</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/terms-of-service" className="hover:text-[#1c1917] transition-colors">
              Terms
            </Link>
            <Link href="/privacy-policy" className="hover:text-[#1c1917] transition-colors">
              Privacy
            </Link>
            <a href="mailto:ravx003@gmail.com" className="hover:text-[#1c1917] transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
