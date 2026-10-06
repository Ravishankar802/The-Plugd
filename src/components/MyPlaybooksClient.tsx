"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers, CheckCircle2, Play, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import { COURSES } from "@/lib/playbooks-data";

interface PlaybookItem {
  id: string;
  courseSlug: "men" | "women";
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

  useEffect(() => {
    fetch("/api/customer/playbooks")
      .then((res) => res.json())
      .then((data) => {
        if (data.playbooks && data.playbooks.length > 0) {
          setPlaybooks(data.playbooks);
          setCustomerEmail(data.customerEmail || "");
        } else {
          // If in guest mode or newly arrived, provide direct access preview so user can experience it immediately
          setPlaybooks([
            {
              id: "demo-men",
              courseSlug: "men",
              title: COURSES.men.title,
              shortTitle: COURSES.men.shortTitle,
              audience: COURSES.men.audience,
              description: COURSES.men.description,
              completedCount: 2,
              totalLessons: 46,
              percent: 5,
              lastViewedLessonId: "m-01-01",
            },
            {
              id: "demo-women",
              courseSlug: "women",
              title: COURSES.women.title,
              shortTitle: COURSES.women.shortTitle,
              audience: COURSES.women.audience,
              description: COURSES.women.description,
              completedCount: 1,
              totalLessons: 42,
              percent: 3,
              lastViewedLessonId: "w-01-01",
            },
          ]);
        }
      })
      .catch(() => {
        setPlaybooks([
          {
            id: "fallback-men",
            courseSlug: "men",
            title: COURSES.men.title,
            shortTitle: COURSES.men.shortTitle,
            audience: COURSES.men.audience,
            description: COURSES.men.description,
            completedCount: 1,
            totalLessons: 46,
            percent: 3,
            lastViewedLessonId: "m-01-01",
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0E0E10] font-sans antialiased selection:bg-[#FF5500] selection:text-white">
      {/* Background grid */}
      <div className="fixed inset-0 bg-subtle-grid opacity-70 pointer-events-none -z-10" />

      <Header />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Page Header */}
        <div className="mb-12 border-b border-[#E8E4DC] pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E6E1D7] bg-white px-3.5 py-1 text-xs font-mono tracking-widest text-[#646059] uppercase mb-4 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-[#FF5500]" />
            <span>PLAYBOOK LIBRARY</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-editorial-title text-4xl sm:text-5xl font-black tracking-tight text-[#0E0E10]">
                My Playbooks
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#646059]">
                Permanent digital access to your slide presentations and tactical frameworks.
              </p>
            </div>

            {customerEmail && (
              <div className="font-mono text-xs text-[#8E8A82]">
                Logged in as: <span className="text-[#0E0E10] font-bold">{customerEmail}</span>
              </div>
            )}
          </div>
        </div>

        {/* Playbooks List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {playbooks.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-3xl border border-[#E6E1D7] bg-white p-8 shadow-sm transition-all hover:border-[#D2CBC0] hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block rounded-full bg-[#FAF8F5] border border-[#E6E1D7] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#FF5500]">
                    {item.shortTitle}
                  </span>
                  <span className="font-mono text-xs text-[#8E8A82]">
                    {item.completedCount} / {item.totalLessons} Lessons Completed
                  </span>
                </div>

                <h2 className="font-editorial-title text-2xl sm:text-3xl font-black tracking-tight text-[#0E0E10] mb-3">
                  {item.title}
                </h2>

                <p className="text-sm text-[#646059] leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-6 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#646059]">Progress</span>
                    <span className="font-bold text-[#0E0E10]">{item.percent}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#F2EFE9] overflow-hidden">
                    <div
                      className="h-full bg-[#FF5500] transition-all duration-500 rounded-full"
                      style={{ width: `${Math.max(item.percent, 4)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 border-t border-[#EFECE6] pt-6">
                <Link
                  href={`/learn/${item.courseSlug}/${item.lastViewedLessonId}`}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#0E0E10] py-3.5 px-6 text-sm font-bold text-white shadow-sm transition-transform hover:bg-neutral-800 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Play className="h-4 w-4 fill-white" />
                  <span>Continue Lesson</span>
                </Link>

                <Link
                  href={`/learn/${item.courseSlug}`}
                  className="flex items-center justify-center rounded-2xl border border-[#E6E1D7] bg-[#FAF8F5] py-3.5 px-4 text-sm font-semibold text-[#0E0E10] hover:bg-[#F2EFE9] transition-colors"
                >
                  <span>Syllabus</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
