import Link from "next/link";
import { BookOpen, Layers, Clock, ArrowRight, Sparkles } from "lucide-react";
import type { PlaybookSummary } from "@/lib/categories";

interface PlaybookCardProps {
  playbook: PlaybookSummary;
}

export default function PlaybookCard({ playbook }: PlaybookCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-3xl border border-[#e7e5e4] bg-white p-7 sm:p-9 shadow-xs hover:border-[#d6d3d1] hover:shadow-lg transition-all duration-200">
      <div>
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <Link
            href={`/categories/${playbook.categorySlug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#fed7aa] bg-[#fff7ed] px-3 py-1 text-xs font-mono font-semibold tracking-wide text-[#f97316] hover:bg-[#ffedd5] transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
            <span>{playbook.categoryName}</span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#15803d] bg-green-50 border border-green-200 rounded-full px-2.5 py-0.5">
            <Sparkles className="h-3 w-3 text-[#15803d]" />
            <span>{playbook.badge || "Available Now"}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1c1917] group-hover:text-[#1c1917] transition-colors">
          <Link href={playbook.href} className="focus:outline-none">
            {playbook.title}
          </Link>
        </h3>

        {/* Headline */}
        <p className="mt-2.5 text-[16px] font-medium text-[#1c1917] leading-snug">
          {playbook.headline}
        </p>

        {/* Description */}
        <p className="mt-3 text-[14.5px] text-[#57534e] leading-relaxed">
          {playbook.description}
        </p>

        {/* Content Metrics Row */}
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[#f1e6da] pt-5 text-xs font-mono text-[#44403c]">
          <div className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-[#f97316]" />
            <span>{playbook.modulesCount} Modules</span>
          </div>
          <span className="text-[#d6d3d1]">·</span>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-[#f97316]" />
            <span>{playbook.lessonsCount} Slide Lessons</span>
          </div>
          <span className="text-[#d6d3d1]">·</span>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[#f97316]" />
            <span>{playbook.hoursOfMaterial}</span>
          </div>
        </div>
      </div>

      {/* Pricing & Action Footer */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#e7e5e4] pt-6">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-[#1c1917]">
              ${playbook.price}
            </span>
            {playbook.originalPrice && (
              <span className="text-sm font-medium text-[#a8a29e] line-through">
                ${playbook.originalPrice}
              </span>
            )}
            <span className="text-xs font-mono font-medium text-[#78716c] uppercase">
              {playbook.currency} · one-time
            </span>
          </div>
          <p className="mt-1 text-xs text-[#78716c]">
            Lifetime access · No recurring fees
          </p>
        </div>

        <Link
          href={playbook.href}
          className="btn btn-primary sm:w-auto w-full text-center"
        >
          <span className="btn-dot" aria-hidden="true" />
          <span>View Playbook</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
