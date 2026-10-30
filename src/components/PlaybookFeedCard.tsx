"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { IS_REVIEW_PHASE_FREE_ACCESS } from "@/lib/config";
import type { PlaybookSummary } from "@/lib/categories";

/**
 * Reusable Playbook Card Component
 * Structure:
 * 1. 16:9 Thumbnail container
 * 2. Playbook title and category label
 * 3. Optional Bestseller badge, rating, and rating count
 * 4. Card footer: Price ($3.00 / $9.00) on left, Add to cart button on right
 * 5. Full-card outline with rounded corners and subtle hover lift
 */
interface PlaybookFeedCardProps {
  playbook: PlaybookSummary;
  darkMode?: boolean;
}

export default function PlaybookFeedCard({ playbook, darkMode = false }: PlaybookFeedCardProps) {
  const formattedPrice = playbook.price ? Number(playbook.price).toFixed(2) : "3.00";
  const formattedOriginalPrice = (playbook.originalPrice ? Number(playbook.originalPrice) : 9).toFixed(2);

  return (
    <div
      className={`group relative flex flex-col justify-between h-full w-full rounded-2xl p-3 sm:p-3.5 motion-safe:hover:-translate-y-1 motion-reduce:hover:transform-none transition-all duration-200 ease-out ${
        darkMode
          ? "bg-[#181818] hover:bg-[#222222] border border-[#272727] hover:border-[#3e3e3e] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-2xl"
          : "bg-white hover:bg-[#f7f8fa] border border-[#dcd8d0] hover:border-[#c7c4c0] shadow-[0_1px_3px_rgba(28,25,23,0.06),0_1px_2px_rgba(28,25,23,0.04)] hover:shadow-lg"
      }`}
    >
      {/* Clickable Card Body linking to Playbook */}
      <Link
        href={playbook.href}
        className="flex flex-col flex-1 w-full focus:outline-none cursor-pointer"
        aria-label={`${playbook.title} — ${playbook.categoryName} Playbook`}
      >
        {/* 16:9 Thumbnail Container */}
        <div
          className={`relative aspect-video w-full overflow-hidden rounded-xl shrink-0 ${
            darkMode
              ? "bg-[#212121] border border-[#272727]"
              : "bg-[#eeebe5] border border-[#e5e1d8]"
          }`}
        >
          {playbook.thumbnail ? (
            <Image
              src={playbook.thumbnail}
              alt={playbook.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover object-center"
              priority
            />
          ) : (
            <div
              className={`h-full w-full ${
                darkMode ? "bg-[#212121]" : "bg-[#eeebe5]"
              }`}
            />
          )}
        </div>

        {/* Title and Category */}
        <div className="mt-3 flex flex-col flex-1 w-full">
          <h3
            className={`text-[14.5px] sm:text-[15px] font-semibold leading-[1.35] line-clamp-2 h-[40px] sm:h-[42px] transition-colors ${
              darkMode
                ? "text-[#f1f1f1] group-hover:text-[#3ea6ff]"
                : "text-[#1c1917] group-hover:text-[#2563eb]"
            }`}
          >
            {playbook.title}
          </h3>

          {/* Category beneath Title */}
          <div className="mt-1.5 sm:mt-2 text-[13px] truncate w-full">
            <span
              className={`font-medium ${
                darkMode ? "text-[#aaaaaa]" : "text-[#44403c]"
              }`}
            >
              {playbook.categoryName}
            </span>
          </div>

          {/* Metadata Row — Fixed height container so cards are always identical in size */}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs h-[24px] overflow-hidden w-full">
            {playbook.badge && (
              <span
                className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold tracking-tight shrink-0 ${
                  darkMode
                    ? "bg-[#2563eb]/20 text-[#60a5fa] border border-[#2563eb]/30"
                    : "bg-[#eff6ff] text-[#1d4ed8]"
                }`}
              >
                {playbook.badge}
              </span>
            )}
            {playbook.rating && (
              <div
                className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold shadow-2xs shrink-0 ${
                  darkMode
                    ? "border border-[#333333] bg-[#212121] text-white"
                    : "border border-[#e7e5e4] bg-white text-[#1c1917]"
                }`}
              >
                <Star className="h-3 w-3 fill-[#d97706] text-[#d97706]" />
                <span className="font-bold">{playbook.rating}</span>
              </div>
            )}
            {playbook.ratingCount && (
              <div
                className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] shadow-2xs shrink-0 ${
                  darkMode
                    ? "border border-[#333333] bg-[#212121] text-[#aaaaaa]"
                    : "border border-[#e7e5e4] bg-white text-[#78716c]"
                }`}
              >
                <span>
                  {typeof playbook.ratingCount === "number"
                    ? playbook.ratingCount.toLocaleString()
                    : playbook.ratingCount}{" "}
                  ratings
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Price and CTA Action */}
      <div className="w-full mt-4 sm:mt-5 flex items-center justify-between gap-2 shrink-0">
        {playbook.badge === "Coming Soon" ? (
          <>
            <div className="flex items-center gap-1.5 shrink-0">
              <span
                className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold border ${
                  darkMode
                    ? "bg-[#272727] text-[#aaaaaa] border-[#383838]"
                    : "bg-stone-100 text-stone-600 border-stone-200"
                }`}
              >
                Coming Soon
              </span>
              <span
                className={`text-[11px] font-medium hidden xs:inline ${
                  darkMode ? "text-[#888888]" : "text-[#78716c]"
                }`}
              >
                In Production
              </span>
            </div>

            <Link
              href={playbook.href}
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex items-center justify-center rounded-lg px-3 sm:px-3.5 py-1.5 text-xs sm:text-[13px] font-semibold transition-colors duration-150 shadow-2xs whitespace-nowrap cursor-pointer shrink-0 ${
                darkMode
                  ? "bg-[#272727] hover:bg-[#333333] border border-[#383838] text-[#aaaaaa]"
                  : "bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-700"
              }`}
            >
              Coming Soon
            </Link>
          </>
        ) : IS_REVIEW_PHASE_FREE_ACCESS ? (
          <>
            <div className="flex items-center gap-1.5 shrink-0">
              <span
                className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold border ${
                  darkMode
                    ? "bg-emerald-950/60 text-emerald-400 border-emerald-800"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}
              >
                Free
              </span>
              <span
                className={`text-[11px] font-medium hidden xs:inline ${
                  darkMode ? "text-[#888888]" : "text-[#78716c]"
                }`}
              >
                Review Access
              </span>
            </div>

            <Link
              href={playbook.href}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] px-3 sm:px-3.5 py-1.5 text-xs sm:text-[13px] font-semibold text-white transition-colors duration-150 shadow-2xs whitespace-nowrap cursor-pointer shrink-0"
            >
              Start Reading
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-baseline gap-1.5 shrink-0">
              {/* Prominent Current Price ($3.00) */}
              <span
                className={`text-[16px] sm:text-[17px] font-bold tracking-tight ${
                  darkMode ? "text-white" : "text-[#1c1917]"
                }`}
              >
                ${formattedPrice}
              </span>
              {/* Original Muted Price with Strikethrough */}
              <span
                className={`text-[12px] sm:text-[12.5px] line-through font-medium ${
                  darkMode ? "text-[#717171]" : "text-[#a8a29e]"
                }`}
              >
                ${formattedOriginalPrice}
              </span>
            </div>

            {/* Add to cart Action Button */}
            <Link
              href={playbook.href}
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex items-center justify-center rounded-lg px-3 sm:px-3.5 py-1.5 text-xs sm:text-[13px] font-semibold transition-colors duration-150 shadow-2xs whitespace-nowrap cursor-pointer shrink-0 ${
                darkMode
                  ? "border border-[#3ea6ff] text-[#3ea6ff] hover:bg-[#3ea6ff]/15 bg-transparent"
                  : "border border-[#2563eb] bg-white text-[#2563eb] hover:bg-[#eff6ff]"
              }`}
            >
              Add to cart
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
