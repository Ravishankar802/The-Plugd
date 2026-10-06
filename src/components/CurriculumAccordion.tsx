"use client";

import { useState } from "react";
import { ChevronDown, Play, Clock, BookOpen, Layers } from "lucide-react";
import { Module } from "@/lib/playbooks-data";

interface CurriculumAccordionProps {
  modules: Module[];
  initialActiveModuleId?: string;
  courseTitle?: string;
  onSelectLesson?: (lessonId: string) => void;
}

export default function CurriculumAccordion({
  modules,
  initialActiveModuleId,
  courseTitle,
  onSelectLesson,
}: CurriculumAccordionProps) {
  const [openModuleId, setOpenModuleId] = useState<string | null>(
    initialActiveModuleId || modules[0]?.id || null
  );

  const toggleModule = (id: string) => {
    setOpenModuleId((prev) => (prev === id ? null : id));
  };

  const totalLessons = modules.reduce((acc, m) => acc + (m.lessons?.length || m.lessonsCount), 0);

  return (
    <div className="w-full">
      {/* Top Meta Stats Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E6E1D7] pb-6 mb-8 text-xs font-mono text-[#646059]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#FF5500]" />
            <span className="font-bold text-[#0E0E10]">{modules.length} MODULES</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-[#FF5500]" />
            <span className="font-bold text-[#0E0E10]">{totalLessons} LESSONS</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#FF5500]" />
            <span className="font-bold text-[#0E0E10]">6+ HOURS OF SLIDES</span>
          </div>
        </div>

        <div className="text-[11px] uppercase tracking-wider text-[#8E8A82]">
          Full Course Breakdown
        </div>
      </div>

      {/* Accordion List */}
      <div className="divide-y divide-[#E6E1D7] border-y border-[#E6E1D7]">
        {modules.map((mod) => {
          const isOpen = openModuleId === mod.id;
          return (
            <div key={mod.id} className="transition-colors hover:bg-black/[0.01]">
              {/* Module Row Header */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full text-left py-6 px-2 sm:px-4 flex items-start justify-between gap-4 group focus:outline-none"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Big Module Number */}
                  <span className="font-mono text-sm sm:text-base font-bold text-[#FF5500] pt-0.5">
                    {mod.number}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono tracking-widest text-[#8E8A82] uppercase">
                        MODULE {mod.number}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-[#0E0E10] group-hover:text-[#FF5500] transition-colors">
                      {mod.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#646059] max-w-2xl line-clamp-2">
                      {mod.description}
                    </p>
                  </div>
                </div>

                {/* Right Metadata & Chevron */}
                <div className="flex items-center gap-4 shrink-0 pt-1">
                  <div className="hidden sm:flex flex-col text-right text-xs">
                    <span className="font-semibold text-[#0E0E10]">
                      {mod.lessons?.length || mod.lessonsCount} lessons
                    </span>
                    <span className="text-neutral-500 font-mono text-[11px]">
                      {mod.duration}
                    </span>
                  </div>

                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#E6E1D7] bg-white transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#0E0E10] text-white border-[#0E0E10]" : "text-[#0E0E10]"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </button>

              {/* Expanded Lesson Drawer */}
              {isOpen && (
                <div className="px-4 sm:px-14 pb-6 pt-2 animate-vertical-reveal">
                  <div className="rounded-2xl border border-[#E6E1D7] bg-white p-4 sm:p-6 shadow-sm">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#8E8A82] mb-4">
                      Lessons inside Module {mod.number}
                    </div>

                    <div className="space-y-3">
                      {mod.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          onClick={() => onSelectLesson && onSelectLesson(lesson.id)}
                          className={`flex items-center justify-between gap-4 p-3 rounded-xl border border-transparent hover:border-[#E6E1D7] hover:bg-[#FAF8F5] transition-all ${
                            onSelectLesson ? "cursor-pointer" : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-semibold text-[#646059] w-12">
                              {lesson.number}
                            </span>
                            <span className="text-sm font-medium text-[#0E0E10]">
                              {lesson.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[11px] text-[#8E8A82]">
                              {lesson.duration}
                            </span>
                            <div className="h-6 w-6 rounded-full bg-[#F2EFE9] flex items-center justify-center text-[#0E0E10]">
                              <Play className="h-2.5 w-2.5 ml-0.5" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
