"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  DATING_PLAYBOOK_MODULES,
  TOTAL_LESSONS_COUNT,
  TOTAL_MODULES_COUNT,
} from "@/lib/dating-playbook-curriculum";

interface DatingPlaybookCurriculumProps {
  onOpenCheckout?: (slug?: "men" | "women") => void;
}

export default function DatingPlaybookCurriculum({
  onOpenCheckout,
}: DatingPlaybookCurriculumProps) {
  const [openModuleIds, setOpenModuleIds] = useState<string[]>([]);

  const toggleModule = (id: string) => {
    setOpenModuleIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="curriculum"
      className="pt-20 sm:pt-28 pb-11 sm:pb-14 border-b border-[#e7e5e4] bg-[#fbf5ef] relative overflow-hidden scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1c1917]">
            What&apos;s inside
          </h2>
          <p className="mt-2.5 sm:mt-3 text-[16.5px] sm:text-[18px] text-[#57534e] leading-relaxed max-w-2xl mx-auto">
            {TOTAL_LESSONS_COUNT} lessons, {TOTAL_MODULES_COUNT} modules, a written version of every lesson.
          </p>
        </div>

        {/* 10-Module Accordion Cards */}
        <div className="max-w-[760px] mx-auto space-y-3">
          {DATING_PLAYBOOK_MODULES.map((module) => {
            const isOpen = openModuleIds.includes(module.id);
            return (
              <div
                key={module.id}
                className="rounded-2xl border border-[#e7e5e4] bg-white shadow-xs overflow-hidden transition-all duration-200 hover:border-[#d6d3d1]"
              >
                <button
                  type="button"
                  onClick={() => toggleModule(module.id)}
                  aria-expanded={isOpen}
                  className={`w-full text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1c1917] transition-all duration-200 ${
                    isOpen ? "p-5 sm:p-6" : "px-5 py-4 sm:px-6 sm:py-4.5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-mono font-bold text-[#f97316] uppercase tracking-wider mb-1">
                        Module {module.number}
                      </div>
                      <h3 className="text-base sm:text-[18px] font-bold text-[#1c1917] tracking-tight group-hover:text-[#f97316] transition-colors leading-snug">
                        {module.title}
                      </h3>
                      {isOpen && (
                        <p className="mt-2.5 text-sm sm:text-[14.5px] text-[#57534e] leading-relaxed max-w-2xl">
                          {module.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 pt-0.5">
                      {isOpen && (
                        <span className="text-xs font-mono text-[#78716c] hidden sm:inline">
                          {module.lessons.length} lessons
                        </span>
                      )}
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full border border-[#e7e5e4] bg-[#fbfbfa] text-[#1c1917] transition-transform duration-200 ${
                          isOpen
                            ? "rotate-180 bg-[#1c1917] text-white border-[#1c1917]"
                            : "group-hover:border-[#d6d3d1]"
                        }`}
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-[#f0eee9] bg-[#fcfbfa]">
                    <ol className="divide-y divide-[#f0eee9] list-none p-0 m-0">
                      {module.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="py-3 px-5 sm:px-6 flex items-center justify-between text-sm text-[#44403c]"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="font-mono text-xs text-[#a8a29e] shrink-0">
                              {lesson.number}
                            </span>
                            <span className="font-medium text-[#1c1917]">
                              {lesson.title}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Post-Curriculum Purchase Section */}
        <div className="mt-14 sm:mt-16 text-center max-w-xl mx-auto flex flex-col items-center">
          <div className="w-fit max-w-md mx-auto mb-11 sm:mb-12 text-left">
            <ul className="space-y-2.5 text-[15px] sm:text-[16px] text-[#1c1917] list-none p-0 m-0">
              <li className="flex items-start gap-2.5 leading-snug">
                <Check className="h-4 w-4 text-[#1c1917] shrink-0 mt-0.5 stroke-[2.5]" aria-hidden="true" />
                <span>Written version of every lesson (markdown).</span>
              </li>
              <li className="flex items-start gap-2.5 leading-snug">
                <Check className="h-4 w-4 text-[#1c1917] shrink-0 mt-0.5 stroke-[2.5]" aria-hidden="true" />
                <span>Lifetime access and every future update. I&apos;ll keep tweaking it as X changes.</span>
              </li>
            </ul>
          </div>
          <button
            type="button"
            onClick={() => onOpenCheckout?.("men")}
            className="btn btn-primary"
            data-cta="curriculum-final"
          >
            <span className="btn-dot" aria-hidden="true" />
            <span>Get the playbook for $3 →</span>
          </button>
          <div className="mt-3.5 flex flex-col items-center gap-1 text-[13.5px] sm:text-[14px] text-[#78716c] leading-normal">
            <p className="m-0">One-time payment · Instant access</p>
            <p className="m-0">Pay once. Keep it forever.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
