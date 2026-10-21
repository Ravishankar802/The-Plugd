"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Layers,
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import PlaybookCard from "@/components/PlaybookCard";
import type { Category, PlaybookSummary } from "@/lib/categories";

interface PlugdHomePageClientProps {
  categories: Category[];
  playbooks: PlaybookSummary[];
  hasAccess?: boolean;
}

const PLATFORM_FAQS = [
  {
    question: "What is a Plugd Playbook?",
    answer:
      "A Plugd Playbook is a practical, step-by-step implementation guide focused on a specific way to build income or master a high-value skill. Each Playbook pairs presentation-grade slide decks for clear mental models with comprehensive written lessons for execution.",
  },
  {
    question: "How do I access my Playbooks after purchase?",
    answer:
      "You receive instant digital access immediately after checkout. You can also sign in at any time with your email address using a secure 6-digit verification code to view your library under My Playbooks.",
  },
  {
    question: "Are Playbooks one-time purchases or subscriptions?",
    answer:
      "Every Playbook on Plugd is a one-time purchase with lifetime access. There are no recurring monthly fees, hidden renewals, or locked paywalls.",
  },
  {
    question: "When are new Playbooks being released?",
    answer:
      "We are actively developing Playbooks across all nine categories, focusing on AI & automation, e-commerce, side hustles, digital products, freelancing, and online business. Check each category page for updates as new Playbooks launch.",
  },
];

export default function PlugdHomePageClient({
  categories,
  playbooks,
  hasAccess = false,
}: PlugdHomePageClientProps) {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const filteredPlaybooks =
    selectedCategorySlug === "all"
      ? playbooks
      : playbooks.filter((p) => p.categorySlug === selectedCategorySlug);

  const selectedCategory =
    selectedCategorySlug !== "all"
      ? categories.find((c) => c.slug === selectedCategorySlug)
      : null;

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-[#1c1917] font-sans antialiased selection:bg-[#f97316] selection:text-white relative">
      {/* Platform Header */}
      <Header variant="platform" hasAccess={hasAccess} />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
        {/* Subtle Square Grid Texture with Radial Mask */}
        <div className="texture texture-hero" aria-hidden="true" />
        {/* Ambient Warm Glow */}
        <div className="hero-aurora" aria-hidden="true" />

        <div className="mx-auto max-w-[1200px] px-6 relative z-10">
          <div className="max-w-3xl">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#fed7aa] bg-[#fff7ed] px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#f97316] mb-6 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#f97316]" />
              <span>THE PLAYBOOK PLATFORM</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1c1917] leading-[1.08] mb-6">
              Your next move starts here.
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-[#44403c] leading-relaxed mb-8 max-w-2xl">
              Explore practical Playbooks for AI, online businesses, freelancing, digital products, and more. Step-by-step guides built for real-world execution.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a href="#playbooks" className="btn btn-primary">
                <span className="btn-dot" aria-hidden="true" />
                <span>Explore Playbooks</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a href="#categories" className="btn btn-surface">
                <span>Browse Categories</span>
              </a>
            </div>

            {/* Highlights Row */}
            <div className="mt-12 flex flex-wrap items-center gap-6 text-xs font-mono text-[#78716c] pt-8 border-t border-[#e7e5e4]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#15803d]" />
                <span>Outcome-Focused</span>
              </div>
              <span className="text-[#d6d3d1]">·</span>
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#f97316]" />
                <span>Slide & Written Formats</span>
              </div>
              <span className="text-[#d6d3d1]">·</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#15803d]" />
                <span>One-Time Payment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: EXPLORE CATEGORIES */}
      <section id="categories" className="py-20 border-t border-[#e7e5e4] bg-[#faf8f5] scroll-mt-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#f97316] mb-2">
                DISCOVERY BY TOPIC
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1c1917]">
                Explore Categories
              </h2>
              <p className="mt-2 text-base text-[#57534e] max-w-2xl">
                Nine practical categories covering modern income streams, skill monetization, and business building.
              </p>
            </div>

            <div className="text-xs font-mono text-[#78716c] bg-white border border-[#e7e5e4] px-3.5 py-1.5 rounded-full shrink-0 shadow-xs">
              9 Categories
            </div>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const count = playbooks.filter((p) => p.categorySlug === cat.slug).length;
              return (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  playbookCount={count}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION: EXPLORE PLAYBOOKS */}
      <section id="playbooks" className="py-20 border-t border-[#e7e5e4] bg-white scroll-mt-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-10">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#f97316] mb-2">
              CURATED CATALOG
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1c1917]">
              Explore Playbooks
            </h2>
            <p className="mt-2 text-base text-[#57534e] max-w-2xl">
              Practical, outcome-driven Playbooks designed for direct real-world implementation.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar" role="tablist">
            <button
              onClick={() => setSelectedCategorySlug("all")}
              className={`rounded-full px-4 py-2 text-xs font-mono font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategorySlug === "all"
                  ? "bg-[#1c1917] text-white"
                  : "bg-[#f6f6f4] text-[#57534e] hover:bg-[#e7e5e4] hover:text-[#1c1917]"
              }`}
            >
              All Categories ({playbooks.length})
            </button>
            {categories.map((cat) => {
              const count = playbooks.filter((p) => p.categorySlug === cat.slug).length;
              const isSelected = selectedCategorySlug === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategorySlug(cat.slug)}
                  className={`rounded-full px-4 py-2 text-xs font-mono font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#1c1917] text-white"
                      : "bg-[#f6f6f4] text-[#57534e] hover:bg-[#e7e5e4] hover:text-[#1c1917]"
                  }`}
                >
                  {cat.name} {count > 0 ? `(${count})` : ""}
                </button>
              );
            })}
          </div>

          {/* Playbooks Grid or Empty State */}
          {filteredPlaybooks.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredPlaybooks.map((playbook) => (
                <PlaybookCard key={playbook.id} playbook={playbook} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#d6d3d1] bg-[#faf8f5] p-12 text-center max-w-xl mx-auto">
              <Sparkles className="h-8 w-8 text-[#f97316] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1c1917]">
                New Playbooks are on the way.
              </h3>
              <p className="mt-2 text-sm text-[#57534e]">
                We are curating high-impact Playbooks for{" "}
                <strong className="text-[#1c1917]">{selectedCategory?.name || "this category"}</strong>.
                Check back soon as new Playbooks are released.
              </p>
              <button
                onClick={() => setSelectedCategorySlug("all")}
                className="btn btn-surface btn-small mt-6 cursor-pointer"
              >
                <span>View all Playbooks</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION: WHY PLUGD PLAYBOOKS */}
      <section id="why-plugd" className="py-20 border-t border-[#e7e5e4] bg-[#faf8f5] scroll-mt-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#f97316] mb-2">
              THE PLAYBOOK STANDARD
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1c1917]">
              Built for Action, Not Distraction
            </h2>
            <p className="mt-3 text-base text-[#57534e]">
              Every Playbook on Plugd adheres to strict standards for clarity, structure, and direct execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-[#e7e5e4] bg-white p-7 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff7ed] border border-[#fed7aa] text-[#f97316] mb-5">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1c1917] mb-2">
                Outcome-Focused Curricula
              </h3>
              <p className="text-sm text-[#57534e] leading-relaxed">
                No filler or academic abstraction. Each lesson is structured around actionable principles and clear real-world steps.
              </p>
            </div>

            <div className="rounded-2xl border border-[#e7e5e4] bg-white p-7 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff7ed] border border-[#fed7aa] text-[#f97316] mb-5">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1c1917] mb-2">
                Slide & Written Lessons
              </h3>
              <p className="text-sm text-[#57534e] leading-relaxed">
                Visual slide presentations for high-retention mental frameworks, coupled with in-depth written guidance for implementation.
              </p>
            </div>

            <div className="rounded-2xl border border-[#e7e5e4] bg-white p-7 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff7ed] border border-[#fed7aa] text-[#f97316] mb-5">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1c1917] mb-2">
                One-Time Payment
              </h3>
              <p className="text-sm text-[#57534e] leading-relaxed">
                Pay once and keep permanent access. No recurring subscriptions, unexpected charges, or hidden paywalls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PLATFORM FAQ */}
      <section className="py-20 border-t border-[#e7e5e4] bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[#1c1917]">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-[#57534e]">
              Everything you need to know about Plugd and the Playbook format.
            </p>
          </div>

          <div className="divide-y divide-[#e7e5e4] border-y border-[#e7e5e4]">
            {PLATFORM_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="py-5">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left group focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-[#1c1917] group-hover:text-[#f97316] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                        isOpen
                          ? "rotate-180 bg-[#f97316] text-white border-[#f97316]"
                          : "border-[#e7e5e4] bg-[#f6f6f4] text-[#1c1917]"
                      }`}
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-3 text-sm text-[#44403c] leading-relaxed border-l-2 border-[#f97316] pl-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLATFORM FOOTER */}
      <footer className="border-t border-[#e7e5e4] bg-[#faf8f5] py-12 text-sm text-[#78716c]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#e7e5e4]">
            {/* Col 1: Brand */}
            <div className="md:col-span-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 text-[#1c1917] hover:text-[#78716c] transition-colors mb-3"
              >
                <Image
                  src="/icon.png"
                  alt="Plugd"
                  width={24}
                  height={24}
                  className="rounded-md shrink-0"
                />
                <span className="font-bold text-lg text-[#1c1917]">Plugd</span>
              </Link>
              <p className="text-xs text-[#57534e] max-w-sm leading-relaxed">
                Practical, outcome-focused Playbooks across modern income streams, online businesses, and skill monetization.
              </p>
            </div>

            {/* Col 2: Categories */}
            <div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1c1917] mb-3">
                Categories
              </div>
              <ul className="space-y-2 text-xs">
                {categories.slice(0, 5).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="text-[#57534e] hover:text-[#1c1917] transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Categories Continued & Links */}
            <div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1c1917] mb-3">
                Platform
              </div>
              <ul className="space-y-2 text-xs">
                {categories.slice(5).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="text-[#57534e] hover:text-[#1c1917] transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
                <li className="pt-2 border-t border-[#e7e5e4]">
                  <Link href="/login" className="text-[#57534e] hover:text-[#1c1917] transition-colors">
                    Customer Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716c]">
            <p className="m-0">© {new Date().getFullYear()} Plugd. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/terms-of-service" className="hover:text-[#1c1917] transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className="hover:text-[#1c1917] transition-colors">
                Privacy Policy
              </Link>
              <a href="mailto:ravx003@gmail.com" className="hover:text-[#1c1917] transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
