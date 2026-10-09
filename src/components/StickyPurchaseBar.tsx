"use client";

import { ArrowRight } from "lucide-react";

interface StickyPurchaseBarProps {
  courseTitle?: string;
  price?: number;
  onOpenCheckout: (courseSlug?: "men" | "women") => void;
  courseSlug?: "men" | "women";
  isLanding?: boolean;
}

export default function StickyPurchaseBar({
  courseTitle,
  price = 49,
  onOpenCheckout,
  courseSlug,
  isLanding = false,
}: StickyPurchaseBarProps) {
  if (isLanding) {
    return (
      <aside className="sticky-cta" data-sticky aria-label="Purchase playbook">
        <div className="sticky-text">
          <p className="sticky-title">The Dating Playbook</p>
          <p className="sticky-sub">
            <span>Instant digital access. Lifetime access.</span>
          </p>
        </div>
        <button
          onClick={() => onOpenCheckout(courseSlug || "men")}
          className="btn btn-invert sticky-btn"
          data-cta="sticky"
        >
          <span className="btn-dot" aria-hidden="true" />
          <span>Get the playbook for $3</span>
        </button>
      </aside>
    );
  }
  return (
    <div className="fixed bottom-5 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div className="mx-auto max-w-4xl pointer-events-auto">
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#0E0E10] px-5 py-3.5 text-white shadow-2xl shadow-black/30 border border-neutral-800 backdrop-blur-lg">
          {/* Left Info */}
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#FF5500] animate-pulse" />
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black tracking-wider text-neutral-300">
                  PLUGD
                </span>
                <span className="text-neutral-500 text-xs hidden sm:inline">•</span>
                <span className="text-xs font-medium text-neutral-300 truncate hidden sm:inline">
                  {courseTitle ? courseTitle : "Choose your playbook."}
                </span>
              </div>
              {courseTitle && (
                <div className="text-[11px] text-neutral-400 sm:hidden truncate">
                  {courseTitle}
                </div>
              )}
            </div>
          </div>

          {/* Right Action */}
          <div className="shrink-0 flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono">
                One-time payment
              </span>
              <span className="text-xs font-bold text-white">Lifetime Access</span>
            </div>

            <button
              onClick={() => onOpenCheckout(courseSlug)}
              className="group flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-[#0E0E10] shadow-sm transition-all hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>
                {courseTitle
                  ? `Get the playbook → $${price}`
                  : `Get the playbook →`}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
