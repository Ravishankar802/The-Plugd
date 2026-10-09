"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { DATING_PLAYBOOK_MODULES } from "@/lib/dating-playbook-curriculum";

export default function DatingPlaybookCurriculum() {
  const [openModuleIds, setOpenModuleIds] = useState<string[]>(["module-01"]);

  const toggleModule = (id: string) => {
    setOpenModuleIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="curriculum"
      className="py-20 sm:py-28 border-b border-[#e7e5e4] bg-[#fbf5ef] relative overflow-hidden scroll-mt-20"
    >
      {/* Subtle Grid Texture */}
      <div className="texture" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-[11px] font-mono tracking-widest text-[#f97316] uppercase font-bold mb-2">
            WHAT&apos;S INSIDE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1c1917]">
            The Dating Playbook
          </h2>
          <p className="mt-3 text-base text-[#78716c] max-w-2xl mx-auto leading-relaxed">
            Everything you need to understand attraction, build confidence, navigate modern dating, and create the kind of relationships you actually want.
          </p>
        </div>

        {/* 8-Module Accordion Cards */}
        <div className="max-w-[760px] mx-auto space-y-3.5">
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
                  className="w-full text-left p-5 sm:p-6 group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1c1917] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-mono font-bold text-[#f97316] uppercase tracking-wider mb-1">
                        Module {module.number}
                      </div>
                      <h3 className="text-lg sm:text-[19px] font-bold text-[#1c1917] tracking-tight group-hover:text-[#f97316] transition-colors">
                        {module.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-[14.5px] text-[#57534e] leading-relaxed">
                        {module.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-0.5">
                      <span className="text-xs font-mono text-[#78716c] hidden sm:inline">
                        {module.lessons.length} lessons
                      </span>
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full border border-[#e7e5e4] bg-[#fbfbfa] text-[#1c1917] transition-transform duration-200 ${
                          isOpen ? "rotate-180 bg-[#1c1917] text-white border-[#1c1917]" : "group-hover:border-[#d6d3d1]"
                        }`}
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-[#f0eee9] bg-[#fcfbfa]">
                    <ol className="divide-y divide-[#f0eee9]">
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
      </div>
    </section>
  );
}
