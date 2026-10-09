"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  BookOpen,
  Layers,
  ChevronDown,
  Lock,
  Flame,
} from "lucide-react";
import Header from "@/components/Header";
import StickyPurchaseBar from "@/components/StickyPurchaseBar";
import CheckoutModal from "@/components/CheckoutModal";
import ProductSlidePreview from "@/components/ProductSlidePreview";
import CurriculumAccordion from "@/components/CurriculumAccordion";
import { COURSES } from "@/lib/playbooks-data";

const DRAFT_TESTIMONIALS = [
  {
    name: "Alex Morgan",
    quote:
      "I used to overthink every conversation with a girl I liked. Learning to relax, start conversations naturally, and stop treating every interaction like a test made a real difference.",
  },
  {
    name: "Daniel Brooks",
    quote:
      "The biggest shift was realizing I didn't need a perfect line. Being more comfortable with myself and actually listening made conversations feel much more natural.",
  },
  {
    name: "Ryan Mitchell",
    quote:
      "I always made texting more complicated than it needed to be. Keeping things simple, showing genuine interest, and not overthinking every reply changed how I approached it.",
  },
];

export default function HomePageClient() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<"men" | "women">("men");
  const [activeCurriculumTab, setActiveCurriculumTab] = useState<"men" | "women">("women");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleOpenCheckout = (slug?: "men" | "women") => {
    if (slug) setSelectedCourseSlug(slug);
    setCheckoutOpen(true);
  };

  const currentCurriculumCourse = COURSES[activeCurriculumTab];

  const faqs = [
    {
      question: "What exactly do I get when I purchase a playbook?",
      answer:
        "You get instant lifetime access to the complete digital course: 10 structured modules, 40+ cinema-grade interactive slide decks, verbatim text breakdowns, real-world field exercises, and downloadable cheat sheets. No boring PDFs or rambling audio files.",
    },
    {
      question: "Is this a subscription or recurring monthly fee?",
      answer:
        "No. Plugd is strictly a one-time purchase. Pay once ($49), own it for life. All future updates to that course's slides are included for free.",
    },
    {
      question: "Can I view the slide decks on my smartphone?",
      answer:
        "Yes! The presentation viewer is natively optimized for mobile with touch swipe navigation, tap advances, fullscreen mode, and crisp typographic hierarchy.",
    },
    {
      question: "How are these playbooks different from other dating advice?",
      answer:
        "Most dating content is either vague platitudes ('just be yourself') or manipulative pickup tactics that destroy your self-respect. Plugd is a behavioral framework designed like a top-tier strategy deck: precise, psychologically grounded, calibrated, and brutally practical.",
    },
    {
      question: "Will my purchase be discreet?",
      answer:
        "Yes. Billing statements show a discreet, neutral charge with no explicit dating terms, and access is private to your registered email.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-[#1c1917] font-sans antialiased selection:bg-[#f97316] selection:text-white relative">
      {/* Subtle Background Grid Texture */}
      <div className="texture" aria-hidden="true" />

      {/* Clean Sticky Header matching Attention Playbook */}
      <Header isLanding={true} onOpenCheckout={handleOpenCheckout} />

      {/* HERO SECTION — EXACT ATTENTION PLAYBOOK REPLICATION */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Subtle Square Grid Texture with Radial Mask */}
        <div className="texture texture-hero" aria-hidden="true" />
        {/* Subtle Ambient Aurora */}
        <div className="hero-aurora" aria-hidden="true" />

        <div className="mx-auto max-w-[1200px] px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,500px)_minmax(0,1fr)] gap-12 xl:gap-14 items-center">
            {/* Left Hero Column */}
            <div className="max-w-[640px]">
              {/* Primary Visual Focus: Hero Headline */}
              <h1 className="text-[36px] sm:text-[42px] lg:text-[46px] font-bold tracking-[-0.025em] text-[#1c1917] leading-[1.08] mb-0">
                Everything you need to get a girl.
              </h1>

              {/* Supporting Copy */}
              <p className="mt-[22px] text-[18px] lg:text-[19px] leading-[1.6] text-[#44403c]">
                <strong className="font-semibold text-[#1c1917]">
                  Learn how to attract women, build confidence, and get the girl you want.
                </strong>
                <br />
                Everything you need to understand attraction, approach women, flirt naturally, text with confidence, plan better dates, and turn mutual interest into something real.
              </p>

              {/* Feature List */}
              <ul className="checks">
                <li>Practical lessons on attraction, confidence, flirting, texting, and dating.</li>
                <li>Real-world examples, conversations, and actionable advice.</li>
                <li>Instant digital access. One-time payment. Lifetime access.</li>
              </ul>

              {/* Hero Purchase CTA */}
              <div className="mt-[34px] flex flex-col items-start gap-4">
                <button
                  onClick={() => handleOpenCheckout("men")}
                  className="btn btn-primary w-full sm:w-auto"
                  data-cta="hero"
                >
                  <span className="btn-dot" aria-hidden="true" />
                  <span>Get the playbook for $3</span>
                </button>
              </div>
            </div>

            {/* Right Hero Column — LEAVE EMPTY (Clean Negative Space, No images, No placeholders) */}
            <div className="hidden lg:block min-h-[340px] xl:min-h-[400px]" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* SECTION: EDITORIAL INTRODUCTION CARD — THE DATING PLAYBOOK */}
      <section className="letter-wrap py-8 sm:py-12" data-depth="letter">
        <article className="letter card">
          {/* Headline */}
          <h2 className="letter-opener">
            Getting a girl shouldn't feel like guesswork.
          </h2>

          {/* Introduction */}
          <p>
            You see a girl you like. You want to approach her, but you don't know what to say. You overthink the conversation, second-guess your texts, and wonder whether she's interested.
          </p>

          <p>
            It doesn't have to be that complicated.
          </p>

          <p>
            That's why we're building The Dating Playbook.
          </p>

          {/* Following Paragraph */}
          <p>
            Being attractive isn't just about your looks, money, or having the perfect line. It's about how you carry yourself, how you communicate, how you make her feel, and what you do when the moment actually arrives.
          </p>

          <p>
            The goal isn't to memorize scripts or pretend to be someone you're not. It's to understand attraction, develop real confidence, and know how to handle situations that used to leave you clueless.
          </p>

          {/* Short Bulleted Breakdown */}
          <p className="font-semibold text-[#1c1917] mt-8 mb-3">
            What you'll learn:
          </p>

          <ul className="dots">
            <li>
              Becoming more attractive through confidence, presentation, and the way you carry yourself.
            </li>
            <li>
              Approaching women and starting conversations without making things unnecessarily awkward.
            </li>
            <li>
              Flirting naturally, building tension, and recognizing signs of mutual interest.
            </li>
            <li>
              Texting without overthinking every message or playing pointless games.
            </li>
            <li>
              Planning dates, handling rejection, and navigating awkward moments.
            </li>
            <li>
              Building genuine connections while staying true to yourself.
            </li>
          </ul>

          {/* Closing Paragraph */}
          <p>
            No magic lines. No fake alpha-male persona. No promises that every woman will like you.
          </p>

          <p>
            Just practical guidance to help you become more confident, understand attraction, and handle real-life situations better.
          </p>

          {/* Signoff */}
          <p className="signoff">
            The Dating Playbook
          </p>
        </article>
      </section>

      {/* SECTION: PRODUCT PREVIEW (CINEMATIC PRESENTATION ENGINE) */}
      <ProductSlidePreview />

      {/* SECTION: WHY THIS IS DIFFERENT */}
      <section id="how-it-works" className="py-20 sm:py-28 border-y border-[#E8E4DC] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="text-[11px] font-mono tracking-widest text-[#FF5500] uppercase font-bold mb-3">
              THE PLUGD ADVANTAGE
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E0E10] leading-tight">
              This isn't dating advice content. <br />
              It's a system.
            </h2>
            <p className="mt-4 text-lg text-[#646059]">
              Most relationship content is built for algorithmic clicks and endless podcasts. Plugd is designed for execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Card: The Typical Content */}
            <div className="rounded-3xl border border-neutral-200 bg-[#FAF8F5] p-8 sm:p-10">
              <div className="text-xs font-mono uppercase text-red-500 font-bold tracking-wider mb-4">
                ✕ Generic Dating Content
              </div>
              <ul className="space-y-4 text-sm text-[#646059]">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span><strong>10 dating tips</strong> that contradict each other every week.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Endless rambling 3-hour podcast interviews with zero actionable takeaways.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>"Manifest your soulmate" or "Alpha male secrets" cringe gurus.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Cluttered 100-page generic PDF eBooks nobody ever finishes reading.</span>
                </li>
              </ul>
            </div>

            {/* Right Card: The Plugd System */}
            <div className="rounded-3xl border border-[#0E0E10] bg-[#0E0E10] p-8 sm:p-10 text-white shadow-xl">
              <div className="text-xs font-mono uppercase text-[#FF5500] font-bold tracking-wider mb-4 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>The Plugd Playbook Engine</span>
              </div>
              <ul className="space-y-4 text-sm text-neutral-300">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5500] font-bold shrink-0">✓</span>
                  <span><strong>A systematic framework</strong> for understanding attraction, tension, and standards.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5500] font-bold shrink-0">✓</span>
                  <span><strong>Cinema-grade presentation decks</strong> that present one crystal-clear principle per slide.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5500] font-bold shrink-0">✓</span>
                  <span><strong>Verbatim text breakdowns</strong> comparing weak messages vs calibrated responses.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF5500] font-bold shrink-0">✓</span>
                  <span><strong>Weekly field drills</strong> you can put into practice in the real world immediately.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: WHAT'S INSIDE (CURRICULUM ACCORDION) */}
      <section id="curriculum" className="py-20 sm:py-28 border-b border-[#e7e5e4] bg-[#fbf5ef]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-[11px] font-mono tracking-widest text-[#f97316] uppercase font-bold mb-2">
                CURRICULUM & MODULES
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1c1917]">
                What's inside
              </h2>
            </div>

            {/* Course Curriculum Tabs */}
            <div className="flex items-center rounded-full border border-[#e7e5e4] bg-white p-1 self-start sm:self-auto">
              <button
                onClick={() => setActiveCurriculumTab("women")}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                  activeCurriculumTab === "women"
                    ? "bg-[#1c1917] text-white shadow-xs"
                    : "text-[#78716c] hover:text-[#1c1917]"
                }`}
              >
                Women's Playbook
              </button>
              <button
                onClick={() => setActiveCurriculumTab("men")}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                  activeCurriculumTab === "men"
                    ? "bg-[#1c1917] text-white shadow-xs"
                    : "text-[#78716c] hover:text-[#1c1917]"
                }`}
              >
                Men's Playbook
              </button>
            </div>
          </div>

          {/* Curriculum Accordion Component */}
          <div className="rounded-2xl border border-[#e7e5e4] bg-white p-6 sm:p-10 shadow-sm">
            <div className="mb-6">
              <div className="text-xl sm:text-2xl font-bold text-[#1c1917]">
                {currentCurriculumCourse.title}
              </div>
              <p className="text-sm text-[#78716c] mt-1">
                {currentCurriculumCourse.description}
              </p>
            </div>

            <CurriculumAccordion
              modules={currentCurriculumCourse.modules}
              courseTitle={currentCurriculumCourse.title}
            />

            <div className="mt-10 border-t border-[#e7e5e4] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#78716c]">
                Includes all 10 modules · Instant slide viewer unlock
              </div>
              <button
                onClick={() => handleOpenCheckout(activeCurriculumTab)}
                className="btn btn-primary"
              >
                <span className="btn-dot" aria-hidden="true" />
                <span>Unlock this playbook → $3</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: THE PLAYBOOK BREAKDOWN ("THE PLAYBOOK INCLUDES") */}
      <section className="py-20 sm:py-28 border-b border-[#E8E4DC] bg-white/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-[11px] font-mono tracking-widest text-[#FF5500] uppercase font-bold mb-2">
              EVERYTHING YOU RECEIVE
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E0E10]">
              The Playbook Includes
            </h2>
            <p className="mt-3 text-base text-[#646059]">
              Built for immediate clarity and real behavioral changes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-[#E6E1D7] bg-white p-6 shadow-xs">
              <div className="rounded-xl bg-[#FAF8F5] p-3 w-fit text-[#FF5500] mb-4">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#0E0E10] mb-1">
                10 Deep Modules
              </h3>
              <p className="text-xs text-[#646059] leading-relaxed">
                Step-by-step sequential progression from primal attraction theory to long-term relationship calibration.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E6E1D7] bg-white p-6 shadow-xs">
              <div className="rounded-xl bg-[#FAF8F5] p-3 w-fit text-[#FF5500] mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#0E0E10] mb-1">
                Keynote Slide Decks
              </h3>
              <p className="text-xs text-[#646059] leading-relaxed">
                Every single lesson is built inside an interactive presentation viewer with smooth transitions.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E6E1D7] bg-white p-6 shadow-xs">
              <div className="rounded-xl bg-[#FAF8F5] p-3 w-fit text-[#FF5500] mb-4">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#0E0E10] mb-1">
                Text & Scenario Breakdowns
              </h3>
              <p className="text-xs text-[#646059] leading-relaxed">
                Verbatim message threads and real scenarios showing exact mistakes vs calibrated executions.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E6E1D7] bg-white p-6 shadow-xs">
              <div className="rounded-xl bg-[#FAF8F5] p-3 w-fit text-[#FF5500] mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#0E0E10] mb-1">
                Lifetime Access
              </h3>
              <p className="text-xs text-[#646059] leading-relaxed">
                No recurring fees. Permanent access to all slides and upcoming curriculum additions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: SOCIAL PROOF ("IN THEIR WORDS") */}
      <section id="testimonials" className="py-20 sm:py-28 border-b border-[#e7e5e4] bg-[#f6f6f4]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center mb-12 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1c1917]">
              In their words
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DRAFT_TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-[#e7e5e4] bg-white p-6 sm:p-8 shadow-xs hover:border-[#d6d3d1] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-[16px] font-semibold text-[#1c1917] tracking-tight">
                    {t.name}
                  </div>
                  <p className="mt-3.5 text-[15px] sm:text-[15.5px] text-[#44403c] leading-[1.65]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: FAQ */}
      <section id="faq" className="py-20 sm:py-28 border-b border-[#e7e5e4] bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-[11px] font-mono tracking-widest text-[#f97316] uppercase font-bold mb-2">
              QUESTIONS & ANSWERS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1c1917]">
              FAQ
            </h2>
          </div>

          <div className="divide-y divide-[#e7e5e4] border-y border-[#e7e5e4]">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="py-6">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left group focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#1c1917] group-hover:text-[#f97316] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#e7e5e4] bg-[#f6f6f4] transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-[#1c1917] text-white border-[#1c1917]" : ""
                      }`}
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-4 text-sm text-[#44403c] leading-relaxed pr-8 border-l-2 border-[#f97316] pl-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION: FINAL PURCHASE BANNER — ATTENTION PLAYBOOK STYLE */}
      <section className="py-24 sm:py-28 border-b border-[#e7e5e4] bg-[#f6f6f4] relative overflow-hidden">
        <div className="mx-auto max-w-3xl px-6 text-center flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="180 180 664 664"
            width="56"
            height="56"
            aria-hidden="true"
            className="mb-4"
          >
            <rect x="180" y="180" width="664" height="664" rx="120" fill="#1C1917" />
            <path
              d="M232 512 C 352 318, 672 318, 792 512 C 672 706, 352 706, 232 512 Z"
              fill="#F6F6F4"
            />
            <circle cx="512" cy="512" r="108" fill="#F97316" />
            <circle cx="512" cy="512" r="42" fill="#1C1917" />
          </svg>
          <h2 className="text-[28px] sm:text-[34px] font-bold tracking-[-0.02em] text-[#1c1917]">
            The Dating Playbook
          </h2>
          <p className="mt-2 text-[16px] text-[#78716c]">
            Everything you need to get a girl.
          </p>
          <div className="mt-8 flex flex-col items-center">
            <button
              onClick={() => handleOpenCheckout("men")}
              className="btn btn-primary"
              data-cta="final"
            >
              <span className="btn-dot" aria-hidden="true" />
              <span>Get the playbook for $3</span>
            </button>
            <div className="mt-3.5 flex flex-col items-center gap-1 text-[13.5px] sm:text-[14px] text-[#78716c] leading-normal">
              <p className="m-0">One-time payment · Instant access</p>
              <p className="m-0">Pay once. Keep it forever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER — ATTENTION PLAYBOOK STYLE */}
      <footer className="border-t border-[#e7e5e4] bg-[#f6f6f4] py-10 text-[14.5px] text-[#78716c]">
        <div className="mx-auto max-w-[1200px] px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-[#1c1917] hover:text-[#78716c] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="180 180 664 664"
                width="22"
                height="22"
                aria-hidden="true"
              >
                <rect x="180" y="180" width="664" height="664" rx="120" fill="#1C1917" />
                <path
                  d="M232 512 C 352 318, 672 318, 792 512 C 672 706, 352 706, 232 512 Z"
                  fill="#F6F6F4"
                />
                <circle cx="512" cy="512" r="108" fill="#F97316" />
                <circle cx="512" cy="512" r="42" fill="#1C1917" />
              </svg>
              <span className="font-semibold text-[15px] text-[#1c1917]">The Dating Playbook</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[14px]">
            <a href="#curriculum" className="text-[#1c1917] hover:text-[#78716c] transition-colors">
              What's inside
            </a>
            <a href="#testimonials" className="text-[#1c1917] hover:text-[#78716c] transition-colors">
              In their words
            </a>
            <a href="#faq" className="text-[#1c1917] hover:text-[#78716c] transition-colors">
              FAQ
            </a>
            <Link href="/privacy-policy" className="text-[#1c1917] hover:text-[#78716c] transition-colors">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="text-[#1c1917] hover:text-[#78716c] transition-colors">
              Terms
            </Link>
          </div>
        </div>
        <div className="mx-auto max-w-[1200px] px-6 mt-6 pt-6 border-t border-[#e7e5e4] flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#78716c]">
          <p>The Dating Playbook. Everything you need to get a girl.</p>
          <p>© 2026 The Dating Playbook. All rights reserved.</p>
        </div>
      </footer>

      {/* PERSISTENT STICKY PURCHASE BAR */}
      <StickyPurchaseBar
        isLanding={true}
        price={3}
        onOpenCheckout={handleOpenCheckout}
      />

      {/* CHECKOUT MODAL */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        defaultCourseSlug={selectedCourseSlug}
      />
    </div>
  );
}
