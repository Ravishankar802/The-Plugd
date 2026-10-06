"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  BookOpen,
  Layers,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Star,
  Lock,
} from "lucide-react";
import Header from "@/components/Header";
import StickyPurchaseBar from "@/components/StickyPurchaseBar";
import CheckoutModal from "@/components/CheckoutModal";
import ProductSlidePreview from "@/components/ProductSlidePreview";
import CurriculumAccordion from "@/components/CurriculumAccordion";
import { Course } from "@/lib/playbooks-data";

interface CourseSalesPageClientProps {
  course: Course;
}

export default function CourseSalesPageClient({ course }: CourseSalesPageClientProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const totalLessons = course.modules.reduce((sum, m) => sum + (m.lessons?.length || m.lessonsCount), 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0E0E10] font-sans antialiased selection:bg-[#FF5500] selection:text-white">
      {/* Background grid */}
      <div className="fixed inset-0 bg-subtle-grid opacity-70 pointer-events-none -z-10" />

      {/* Header */}
      <Header
        activeCourse={course.slug}
        onOpenCheckout={() => setCheckoutOpen(true)}
      />

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden border-b border-[#E8E4DC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E6E1D7] bg-white px-4 py-1.5 text-xs font-mono tracking-widest text-[#646059] uppercase mb-8 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#FF5500] animate-pulse" />
              <span>THE OFFICIAL PLAYBOOK {course.audience === "Men" ? "FOR MEN" : "FOR WOMEN"}</span>
            </div>

            {/* Monumental Title */}
            <h1 className="font-editorial-title text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0E0E10] mb-8 leading-[1.02]">
              {course.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-2xl text-[#646059] max-w-3xl mx-auto font-light leading-relaxed mb-10">
              {course.subheadline}
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 mb-10 text-xs font-mono text-[#0E0E10]">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#FF5500]" />
                <span className="font-bold">{course.modulesCount} MODULES</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#FF5500]" />
                <span className="font-bold">{totalLessons} SLIDE LESSONS</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#FF5500]" />
                <span className="font-bold">{course.hoursOfMaterial} OF CONTENT</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setCheckoutOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0E0E10] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-black/10 transition-all hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>GET THE PLAYBOOK → ${course.price}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#curriculum"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#E6E1D7] bg-white px-8 py-4 text-sm font-semibold text-[#0E0E10] shadow-xs transition-all hover:bg-[#F2EFE9]"
              >
                <span>Inspect Syllabus</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: WHAT YOU'LL LEARN (THE 10 PILLARS) */}
      <section className="py-20 sm:py-28 border-b border-[#E8E4DC] bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="text-[11px] font-mono tracking-widest text-[#FF5500] uppercase font-bold mb-3">
              WHAT YOU WILL LEARN
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E0E10]">
              The 10 Core Pillars of Mastery
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#646059]">
              Every module targets a specific psychological bottleneck, from first impression to long-term devotion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {course.modules.map((m) => (
              <div
                key={m.id}
                className="rounded-3xl border border-[#E6E1D7] bg-white p-6 sm:p-8 shadow-xs hover:border-[#D2CBC0] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-sm font-bold text-[#FF5500]">
                    {m.number}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#8E8A82]">
                    MODULE {m.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0E0E10] mb-2">
                  {m.title}
                </h3>
                <p className="text-sm text-[#646059] leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: PRODUCT PREVIEW (CINEMATIC SLIDESHOW) */}
      <ProductSlidePreview />

      {/* SECTION: WHAT'S INSIDE (CURRICULUM ACCORDION) */}
      <section id="curriculum" className="py-20 sm:py-28 border-y border-[#E8E4DC] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-[11px] font-mono tracking-widest text-[#FF5500] uppercase font-bold mb-2">
              CURRICULUM BREAKDOWN
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E0E10]">
              What's inside the course.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#646059]">
              {course.modulesCount} modules · {totalLessons} lessons · {course.hoursOfMaterial} of interactive slide material.
            </p>
          </div>

          <div className="rounded-3xl border border-[#E6E1D7] bg-white p-6 sm:p-10 shadow-sm">
            <CurriculumAccordion
              modules={course.modules}
              courseTitle={course.title}
            />

            <div className="mt-10 border-t border-[#E6E1D7] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#8E8A82]">
                Instant unlock of all 10 modules upon purchase
              </div>
              <button
                onClick={() => setCheckoutOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#0E0E10] px-8 py-3.5 text-xs font-bold text-white transition-all hover:bg-neutral-800"
              >
                <span>Unlock Full Access → ${course.price}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: SOCIAL PROOF */}
      <section className="py-20 sm:py-28 border-b border-[#E8E4DC] bg-[#FAF8F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-[11px] font-mono tracking-widest text-[#FF5500] uppercase font-bold mb-2">
              IN THEIR WORDS
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E0E10]">
              What readers are saying.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {course.testimonials.map((t, i) => (
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
              FAQ
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E0E10]">
              Common Questions
            </h2>
          </div>

          <div className="divide-y divide-[#E6E1D7] border-y border-[#E6E1D7]">
            {course.faqs.map((faq, index) => {
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

      {/* FINAL PURCHASE BANNER */}
      <section className="py-20 sm:py-28 bg-[#FAF8F5] text-center border-b border-[#E8E4DC]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#0E0E10] bg-[#0E0E10] p-8 sm:p-16 text-white shadow-2xl relative overflow-hidden">
            <span className="inline-block rounded-full bg-[#FF5500] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-white mb-6">
              INSTANT ACCESS
            </span>
            <h2 className="font-editorial-title text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              {course.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto mb-10">
              One-time payment of ${course.price}. Instant lifetime access.
            </p>
            <button
              onClick={() => setCheckoutOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5500] px-10 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#E04B00] hover:scale-105"
            >
              <span>GET THE PLAYBOOK → ${course.price}</span>
            </button>
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
            <span>{course.title}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#0E0E10] transition-colors">
              Home
            </Link>
            <Link
              href={course.slug === "men" ? "/women" : "/men"}
              className="hover:text-[#0E0E10] transition-colors"
            >
              {course.slug === "men" ? "Women's Playbook" : "Men's Playbook"}
            </Link>
            <Link href="/my-playbooks" className="hover:text-[#0E0E10] transition-colors">
              My Playbooks
            </Link>
          </div>
        </div>
      </footer>

      {/* PERSISTENT STICKY PURCHASE BAR */}
      <StickyPurchaseBar
        courseTitle={course.title}
        price={course.price}
        courseSlug={course.slug}
        onOpenCheckout={() => setCheckoutOpen(true)}
      />

      {/* CHECKOUT MODAL */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        defaultCourseSlug={course.slug}
      />
    </div>
  );
}
