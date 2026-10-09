"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Play, Sparkles, BookOpen, Layers } from "lucide-react";
import Header from "@/components/Header";
import CheckoutModal from "@/components/CheckoutModal";

interface PlaybookItem {
  id: string;
  courseSlug: string;
  title: string;
  shortTitle: string;
  audience: string;
  description: string;
  completedCount: number;
  totalLessons: number;
  percent: number;
  lastViewedLessonId: string;
}

export default function MyPlaybooksClient() {
  const [playbooks, setPlaybooks] = useState<PlaybookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [customerEmail, setCustomerEmail] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    fetch("/api/customer/playbooks")
      .then((res) => res.json())
      .then((data) => {
        if (data.playbooks && data.playbooks.length > 0) {
          setPlaybooks(data.playbooks);
          setCustomerEmail(data.customerEmail || "");
        } else {
          // Default The Dating Playbook library item
          setPlaybooks([
            {
              id: "the-dating-playbook",
              courseSlug: "men",
              title: "The Dating Playbook",
              shortTitle: "The Dating Playbook",
              audience: "Men",
              description:
                "A practical, 10-module guide to understanding attraction, building confidence, meeting women, dating, and developing meaningful relationships.",
              completedCount: 0,
              totalLessons: 69,
              percent: 0,
              lastViewedLessonId: "01-1",
            },
          ]);
        }
      })
      .catch(() => {
        setPlaybooks([
          {
            id: "the-dating-playbook-fallback",
            courseSlug: "men",
            title: "The Dating Playbook",
            shortTitle: "The Dating Playbook",
            audience: "Men",
            description:
              "A practical, 10-module guide to understanding attraction, building confidence, meeting women, dating, and developing meaningful relationships.",
            completedCount: 0,
            totalLessons: 69,
            percent: 0,
            lastViewedLessonId: "01-1",
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] font-sans antialiased selection:bg-[#f97316] selection:text-white">
      {/* Background grid */}
      <div className="fixed inset-0 bg-subtle-grid opacity-70 pointer-events-none -z-10" />

      <Header onOpenCheckout={() => setCheckoutOpen(true)} />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Page Header */}
        <div className="mb-10 border-b border-[#e7e5e4] pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#fed7aa] bg-[#fff7ed] px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-[#f97316] uppercase mb-4 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-[#f97316]" />
            <span>PLAYBOOK LIBRARY</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1c1917]">
                My Playbooks
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#57534e]">
                Permanent digital access to your 10-module Dating Playbook curriculum and slide presentations.
              </p>
            </div>

            {customerEmail ? (
              <div className="font-mono text-xs text-[#78716c] bg-white border border-[#e7e5e4] px-3.5 py-2 rounded-xl shadow-xs">
                Account: <span className="text-[#1c1917] font-bold">{customerEmail}</span>
              </div>
            ) : (
              <button
                onClick={() => setCheckoutOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#f97316] hover:text-[#ea580c] transition-colors"
              >
                <span>Access with email →</span>
              </button>
            )}
          </div>
        </div>

        {/* Playbooks List */}
        <div className="grid grid-cols-1 gap-8">
          {playbooks.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-3xl border border-[#e7e5e4] bg-white p-6 sm:p-10 shadow-sm transition-all hover:border-[#d6d3d1] hover:shadow-md"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#fbf5ef] border border-[#fed7aa] px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#f97316]">
                    <Sparkles className="h-3 w-3" />
                    <span>10 MODULES · 69 LESSONS</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#78716c]">
                    {item.completedCount} / {item.totalLessons || 69} Lessons Completed
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1c1917] mb-3">
                  {item.title}
                </h2>

                <p className="text-sm sm:text-base text-[#57534e] leading-relaxed mb-8 max-w-2xl">
                  {item.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-8 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#78716c]">Curriculum Progress</span>
                    <span className="font-bold text-[#1c1917]">{item.percent}%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-[#f0eee9] overflow-hidden">
                    <div
                      className="h-full bg-[#f97316] transition-all duration-500 rounded-full"
                      style={{ width: `${Math.max(item.percent, 3)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 border-t border-[#f0eee9] pt-6">
                <Link
                  href={`/learn/${item.courseSlug}/${item.lastViewedLessonId || "01-1"}`}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#1c1917] py-3.5 px-6 text-sm font-bold text-white shadow-xs transition-transform hover:bg-neutral-800 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Play className="h-4 w-4 fill-white" />
                  <span>
                    {item.completedCount > 0 ? "Continue Lesson" : "Start Lesson 1.1"}
                  </span>
                </Link>

                <Link
                  href={`/learn/${item.courseSlug}`}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-2xl border border-[#e7e5e4] bg-[#faf8f5] py-3.5 px-6 text-sm font-semibold text-[#1c1917] hover:bg-[#f0eee9] transition-colors"
                >
                  <Layers className="h-4 w-4 text-[#78716c]" />
                  <span>View Syllabus</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}
