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
  Star,
  Flame,
} from "lucide-react";
import Header from "@/components/Header";
import StickyPurchaseBar from "@/components/StickyPurchaseBar";
import CheckoutModal from "@/components/CheckoutModal";
import ProductSlidePreview from "@/components/ProductSlidePreview";
import CurriculumAccordion from "@/components/CurriculumAccordion";
import { COURSES } from "@/lib/playbooks-data";

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
    <div className="min-h-screen bg-[#FAF8F5] text-[#0E0E10] font-sans antialiased selection:bg-[#FF5500] selection:text-white">
      {/* Subtle Editorial Background Grid */}
      <div className="fixed inset-0 bg-subtle-grid opacity-70 pointer-events-none -z-10" />

      {/* Clean Sticky Header */}
      <Header onOpenCheckout={handleOpenCheckout} />

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden border-b border-[#E8E4DC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E6E1D7] bg-white px-4 py-1.5 text-xs font-mono tracking-widest text-[#646059] uppercase mb-8 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#FF5500] animate-pulse" />
              <span>THE DIGITAL PLAYBOOKS FOR MODERN DATING</span>
            </div>

            {/* Huge Confident Headline */}
            <h1 className="font-editorial-title text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#0E0E10] mb-8 leading-[0.98]">
              Dating is a skill.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-2xl text-[#646059] max-w-2xl mx-auto font-light leading-relaxed mb-10">
              Two complete playbooks for becoming significantly better at attraction, dating, and relationships.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#playbooks"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0E0E10] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-black/10 transition-all hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore The Two Playbooks</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={() => handleOpenCheckout("men")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#E6E1D7] bg-white px-8 py-4 text-sm font-semibold text-[#0E0E10] shadow-xs transition-all hover:bg-[#F2EFE9]"
              >
                <span>Instant Access · $49</span>
              </button>
            </div>

            {/* Social Trust Metrics */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-[#8E8A82]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5500]" />
                <span>100% SLIDE-BASED FORMAT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5500]" />
                <span>ZERO CANNED PICKUP LINES</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5500]" />
                <span>LIFETIME DIGITAL ACCESS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: THE TWO PLAYBOOKS (VISUALLY DOMINANT) */}
      <section id="playbooks" className="py-20 sm:py-28 border-b border-[#E8E4DC] bg-white/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-[11px] font-mono tracking-widest text-[#FF5500] uppercase font-bold mb-2">
              THE CORE PRODUCTS
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E0E10]">
              Two playbooks. One goal.
            </h2>
            <p className="mt-3 text-lg text-[#646059]">
              Become significantly better at attraction, communication, and high-standard dating.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* COURSE 01: FOR WOMEN */}
            <div className="relative flex flex-col justify-between rounded-3xl border border-[#E6E1D7] bg-white p-8 sm:p-12 shadow-sm transition-all hover:border-[#D2CBC0] hover:shadow-xl">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-[#FAF8F5] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#0E0E10]">
                    <span className="h-2 w-2 rounded-full bg-[#FF5500]" />
                    COURSE 01 · FOR WOMEN
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#0E0E10] font-mono">$49</span>
                    <span className="text-xs text-neutral-400 line-through ml-2 font-mono">$129</span>
                  </div>
                </div>

                <h3 className="font-editorial-title text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0E0E10] mb-4">
                  HOW TO GET THE MAN OF YOUR DREAMS
                </h3>

                <p className="text-base text-[#646059] leading-relaxed mb-8">
                  A practical playbook for attraction, standards, confidence, communication, and building relationships with the kind of man you actually respect.
                </p>

                {/* Course Metadata Highlights */}
                <div className="space-y-3 border-t border-[#EFECE6] pt-6 mb-8 text-sm">
                  <div className="flex items-center gap-3 text-[#0E0E10]">
                    <CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" />
                    <span>The Attraction Gap: Why low-effort men ghost agreeable women</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#0E0E10]">
                    <CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" />
                    <span>Stop Writing Paragraphs: The text calibration rule</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#0E0E10]">
                    <CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" />
                    <span>Boundaries Without Bitterness: High standards with poise</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#0E0E10]">
                    <CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" />
                    <span>10 Modules · 42 Interactive Presentation Slide Decks</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                <button
                  onClick={() => handleOpenCheckout("women")}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0E0E10] py-4 px-6 text-sm font-bold text-white shadow-md transition-all hover:bg-neutral-800"
                >
                  <span>GET THE PLAYBOOK → $49</span>
                </button>
                <Link
                  href="/women"
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-2xl border border-[#E6E1D7] bg-[#FAF8F5] py-4 px-6 text-sm font-semibold text-[#0E0E10] transition-colors hover:bg-[#F2EFE9]"
                >
                  <span>Syllabus</span>
                </Link>
              </div>
            </div>

            {/* COURSE 02: FOR MEN */}
            <div className="relative flex flex-col justify-between rounded-3xl border border-[#E6E1D7] bg-white p-8 sm:p-12 shadow-sm transition-all hover:border-[#D2CBC0] hover:shadow-xl">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-[#FAF8F5] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#0E0E10]">
                    <span className="h-2 w-2 rounded-full bg-[#FF5500]" />
                    COURSE 02 · FOR MEN
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#0E0E10] font-mono">$49</span>
                    <span className="text-xs text-neutral-400 line-through ml-2 font-mono">$129</span>
                  </div>
                </div>

                <h3 className="font-editorial-title text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0E0E10] mb-4">
                  HOW TO DATE THE HOTTEST WOMEN
                </h3>

                <p className="text-base text-[#646059] leading-relaxed mb-8">
                  A practical playbook for becoming more attractive, confident, socially capable, emotionally calibrated, and genuinely better at dating.
                </p>

                {/* Course Metadata Highlights */}
                <div className="space-y-3 border-t border-[#EFECE6] pt-6 mb-8 text-sm">
                  <div className="flex items-center gap-3 text-[#0E0E10]">
                    <CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" />
                    <span>The Attraction Gap: Why 'nice' is not the same as attractive</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#0E0E10]">
                    <CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" />
                    <span>Presence & Vocal Weight: High status without speaking louder</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#0E0E10]">
                    <CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" />
                    <span>Locking Logistics: Convert casual chats into real dates in 4 texts</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#0E0E10]">
                    <CheckCircle2 className="h-4 w-4 text-[#FF5500] shrink-0" />
                    <span>10 Modules · 46 Interactive Presentation Slide Decks</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                <button
                  onClick={() => handleOpenCheckout("men")}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0E0E10] py-4 px-6 text-sm font-bold text-white shadow-md transition-all hover:bg-neutral-800"
                >
                  <span>GET THE PLAYBOOK → $49</span>
                </button>
                <Link
                  href="/men"
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-2xl border border-[#E6E1D7] bg-[#FAF8F5] py-4 px-6 text-sm font-semibold text-[#0E0E10] transition-colors hover:bg-[#F2EFE9]"
                >
                  <span>Syllabus</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
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
      <section id="curriculum" className="py-20 sm:py-28 border-b border-[#E8E4DC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-[11px] font-mono tracking-widest text-[#FF5500] uppercase font-bold mb-2">
                CURRICULUM & MODULES
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E0E10]">
                What's inside the playbooks.
              </h2>
            </div>

            {/* Course Curriculum Tabs */}
            <div className="flex items-center rounded-full border border-[#E6E1D7] bg-white p-1 self-start sm:self-auto">
              <button
                onClick={() => setActiveCurriculumTab("women")}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                  activeCurriculumTab === "women"
                    ? "bg-[#0E0E10] text-white shadow-xs"
                    : "text-[#646059] hover:text-[#0E0E10]"
                }`}
              >
                Women's Playbook
              </button>
              <button
                onClick={() => setActiveCurriculumTab("men")}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                  activeCurriculumTab === "men"
                    ? "bg-[#0E0E10] text-white shadow-xs"
                    : "text-[#646059] hover:text-[#0E0E10]"
                }`}
              >
                Men's Playbook
              </button>
            </div>
          </div>

          {/* Curriculum Accordion Component */}
          <div className="rounded-3xl border border-[#E6E1D7] bg-white p-6 sm:p-10 shadow-sm">
            <div className="mb-6">
              <div className="text-xl sm:text-2xl font-bold text-[#0E0E10]">
                {currentCurriculumCourse.title}
              </div>
              <p className="text-sm text-[#646059] mt-1">
                {currentCurriculumCourse.description}
              </p>
            </div>

            <CurriculumAccordion
              modules={currentCurriculumCourse.modules}
              courseTitle={currentCurriculumCourse.title}
            />

            <div className="mt-10 border-t border-[#E6E1D7] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#8E8A82]">
                Includes all 10 modules · Instant slide viewer unlock
              </div>
              <button
                onClick={() => handleOpenCheckout(activeCurriculumTab)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#0E0E10] px-6 py-3 text-xs font-bold text-white transition-all hover:bg-neutral-800"
              >
                <span>Unlock this playbook → $49</span>
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
      <section className="py-20 sm:py-28 border-b border-[#E8E4DC] bg-[#FAF8F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-[11px] font-mono tracking-widest text-[#FF5500] uppercase font-bold mb-2">
              IN THEIR WORDS
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E0E10]">
              Proven by real people in the real world.
            </h2>
            <p className="mt-3 text-base text-[#646059]">
              How the playbooks are reshaping standards, confidence, and dating dynamics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...COURSES.women.testimonials, ...COURSES.men.testimonials].slice(0, 6).map((t, i) => (
              <div
                key={i}
                className="rounded-3xl border border-[#E6E1D7] bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#FF5500] mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="h-3.5 w-3.5 fill-[#FF5500]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#0E0E10] leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="border-t border-[#EFECE6] pt-4">
                  <div className="text-sm font-bold text-[#0E0E10]">{t.name}</div>
                  <div className="text-xs font-mono text-[#8E8A82]">
                    {t.handle} · {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: FAQ */}
      <section id="faq" className="py-20 sm:py-28 border-b border-[#E8E4DC] bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-[11px] font-mono tracking-widest text-[#FF5500] uppercase font-bold mb-2">
              QUESTIONS & ANSWERS
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E0E10]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-[#E6E1D7] border-y border-[#E6E1D7]">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="py-6">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left group focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#0E0E10] group-hover:text-[#FF5500] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#E6E1D7] bg-[#FAF8F5] transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-[#0E0E10] text-white border-[#0E0E10]" : ""
                      }`}
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-4 text-sm text-[#646059] leading-relaxed animate-vertical-reveal pr-8">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION: FINAL PURCHASE BANNER */}
      <section className="py-20 sm:py-28 bg-[#FAF8F5] text-center border-b border-[#E8E4DC]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#0E0E10] bg-[#0E0E10] p-8 sm:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="inline-block rounded-full bg-[#FF5500] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-white mb-6">
                GET STARTED TODAY
              </span>
              <h2 className="font-editorial-title text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
                Become significantly better at dating.
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto mb-10">
                Stop guessing. Start executing. Get your playbook now and start exploring the slides in 60 seconds.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => handleOpenCheckout("women")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#0E0E10] shadow-md transition-all hover:bg-neutral-200"
                >
                  <span>Women's Playbook · $49</span>
                </button>
                <button
                  onClick={() => handleOpenCheckout("men")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5500] px-8 py-4 text-sm font-bold text-white shadow-md transition-all hover:bg-[#E04B00]"
                >
                  <span>Men's Playbook · $49</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-white text-xs text-[#8E8A82]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-base font-black tracking-tight text-[#0E0E10]">
              PLUGD
            </span>
            <span>•</span>
            <span>The Premium Dating & Attraction Playbooks</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/women" className="hover:text-[#0E0E10] transition-colors">
              Women's Playbook
            </Link>
            <Link href="/men" className="hover:text-[#0E0E10] transition-colors">
              Men's Playbook
            </Link>
            <Link href="/my-playbooks" className="hover:text-[#0E0E10] transition-colors">
              My Playbooks
            </Link>
            <Link href="/privacy-policy" className="hover:text-[#0E0E10] transition-colors">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#0E0E10] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>

      {/* PERSISTENT STICKY PURCHASE BAR */}
      <StickyPurchaseBar
        price={49}
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
