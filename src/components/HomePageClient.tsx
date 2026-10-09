"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import StickyPurchaseBar from "@/components/StickyPurchaseBar";
import CheckoutModal from "@/components/CheckoutModal";
import DatingPlaybookCurriculum from "@/components/DatingPlaybookCurriculum";
import AudienceFitSection from "@/components/AudienceFitSection";

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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(false);
  const stickyTriggerRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const el = stickyTriggerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setIsStickyBarVisible(true);
        } else {
          setIsStickyBarVisible(false);
        }
      },
      {
        threshold: 0,
        rootMargin: "0px",
      }
    );

    observer.observe(el);

    // Initial check on load/reload
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight) {
      setIsStickyBarVisible(true);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleOpenCheckout = (slug?: "men" | "women") => {
    if (slug) setSelectedCourseSlug(slug);
    setCheckoutOpen(true);
  };

  const faqs = [
    {
      question: "What's included in The Dating Playbook?",
      answer:
        "The Dating Playbook covers attraction, confidence, approaching women, flirting, texting, planning dates, handling rejection, and building better relationships. Everything is organised into practical modules with examples and actionable advice.",
    },
    {
      question: "Is this suitable for beginners?",
      answer:
        "Yes. Whether you're new to dating or have some experience but want to improve, the playbook helps you understand the fundamentals and put them into practice.",
    },
    {
      question: "How do I access the playbook?",
      answer:
        "You'll get instant digital access after your purchase. You can revisit the material whenever you want.",
    },
    {
      question: "Is this a one-time payment?",
      answer:
        "Yes. Pay $3 once and keep access to the playbook. There is no recurring subscription.",
    },
    {
      question: "Will this help me become more confident around women?",
      answer:
        "The playbook is designed to help you develop confidence, improve your communication, understand attraction, and approach dating more naturally. Your results will depend on how you apply what you learn.",
    },
    {
      question: "What about the free course?",
      answer:
        "The free course is a great place to start if you want to explore the basics of dating and attraction. The Dating Playbook goes further with more structured, practical guidance across the entire dating process.",
    },
    {
      question: "Will I get lifetime access?",
      answer:
        "Yes. Your $3 purchase gives you lifetime access to The Dating Playbook. You can revisit the material whenever you want without paying a recurring subscription.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-[#1c1917] font-sans antialiased selection:bg-[#f97316] selection:text-white relative">
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

          {/* Following Paragraph — Trigger point for sticky purchase banner */}
          <p ref={stickyTriggerRef}>
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

      {/* SECTION: PURCHASE CTA */}
      <section className="pt-10 sm:pt-14 pb-8 sm:pb-10 relative bg-[#f6f6f4]">
        <div className="mx-auto max-w-3xl px-6 text-center flex flex-col items-center">
          <button
            onClick={() => handleOpenCheckout("men")}
            className="btn btn-primary"
            data-cta="inline"
          >
            <span className="btn-dot" aria-hidden="true" />
            <span>Get the playbook for $3</span>
          </button>
          <div className="mt-3.5 flex flex-col items-center gap-1 text-[13.5px] sm:text-[14px] text-[#78716c] leading-normal">
            <p className="m-0">One-time payment · Instant access</p>
            <p className="m-0">Pay once. Keep it forever.</p>
          </div>
        </div>
      </section>

      {/* SECTION: SOCIAL PROOF ("IN THEIR WORDS") */}
      <section id="testimonials" className="pt-8 sm:pt-10 pb-16 sm:pb-24 border-b border-[#e7e5e4] bg-[#f6f6f4] scroll-mt-20">
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

      {/* SECTION: 10-MODULE DATING PLAYBOOK CURRICULUM */}
      <DatingPlaybookCurriculum onOpenCheckout={handleOpenCheckout} />

      {/* SECTION: AUDIENCE FIT ("IS THE DATING PLAYBOOK RIGHT FOR YOU?") */}
      <AudienceFitSection />

      {/* SECTION: FAQ */}
      <section id="faq" className="py-20 sm:py-28 border-b border-[#e7e5e4] bg-white scroll-mt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
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
                    className="w-full flex items-center justify-between text-left group focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-[#1c1917] group-hover:text-[#f97316] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                        isOpen
                          ? "rotate-180 bg-[#f97316] text-white border-[#f97316]"
                          : "border-[#e7e5e4] bg-[#f6f6f4] text-[#1c1917] group-hover:border-[#d6d3d1]"
                      }`}
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-4 text-[15px] sm:text-[15.5px] text-[#44403c] leading-relaxed pr-8 border-l-2 border-[#f97316] pl-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION: FINAL PURCHASE CTA */}
      <section className="py-20 sm:py-24 border-b border-[#e7e5e4] bg-[#f6f6f4]">
        <div className="mx-auto max-w-xl px-6 text-center flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1c1917] mb-6">
            The Dating Playbook
          </h2>
          <button
            onClick={() => handleOpenCheckout("men")}
            className="btn btn-primary"
            data-cta="final-bottom"
          >
            <span className="btn-dot" aria-hidden="true" />
            <span>Get the playbook for $3 →</span>
          </button>
          <div className="mt-3.5 flex flex-col items-center gap-1 text-[13.5px] sm:text-[14px] text-[#78716c] leading-normal">
            <p className="m-0">One-time payment · Instant access</p>
            <p className="m-0">Pay once. Keep it forever.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#f6f6f4] py-10 pb-28 sm:pb-32 text-[14.5px] text-[#78716c]">
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
            <Link href="/terms-of-service" className="text-[#1c1917] hover:text-[#78716c] transition-colors">
              Terms
            </Link>
            <Link href="/privacy-policy" className="text-[#1c1917] hover:text-[#78716c] transition-colors">
              Privacy
            </Link>
            <a
              href="mailto:ravx003@gmail.com"
              className="text-[#1c1917] hover:text-[#78716c] transition-colors"
            >
              ravx003@gmail.com
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-[1200px] px-6 mt-6 pt-6 border-t border-[#e7e5e4] text-[13px] text-[#78716c]">
          <p className="m-0">The Dating Playbook. Everything you need to get a girl.</p>
        </div>
      </footer>

      {/* PERSISTENT STICKY PURCHASE BAR */}
      <StickyPurchaseBar
        isLanding={true}
        price={3}
        isVisible={isStickyBarVisible}
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
