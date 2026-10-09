"use client";

import { Check } from "lucide-react";

export default function AudienceFitSection() {
  const checklistItems = [
    "You want to feel more confident around women and understand what creates genuine attraction.",
    "You want to approach, flirt, and start conversations without feeling like you're performing a character.",
    "You want to understand texting, dates, chemistry, and how to move things forward naturally.",
    "You want practical guidance for both casual dating and building a meaningful relationship.",
    "You're willing to learn, practise, communicate honestly, and accept that not every person will be interested.",
  ];

  return (
    <section className="pt-11 sm:pt-13 pb-20 sm:pb-28 border-b border-[#e7e5e4] bg-[#f6f6f4]">
      <div className="mx-auto max-w-[720px] px-6">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1c1917]">
            Is The Dating Playbook right for you?
          </h2>
        </div>

        {/* Audience Fit Checklist Card — Warm Cream Card with Subtle Orange Border */}
        <div className="rounded-2xl border border-[#fed7aa] bg-[#fff7ed] shadow-xs overflow-hidden">
          <ul className="divide-y divide-[#f1e6da] list-none p-0 m-0">
            {checklistItems.map((text, idx) => (
              <li
                key={idx}
                className="py-4 sm:py-5 px-6 sm:px-8 flex items-start gap-4 text-[15.5px] sm:text-[16px] text-[#1c1917] leading-relaxed"
              >
                <Check
                  className="h-5 w-5 text-[#f97316] shrink-0 mt-0.5 stroke-[2.5]"
                  aria-hidden="true"
                />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
