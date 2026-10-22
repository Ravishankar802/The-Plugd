"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import type { PlaybookSummary } from "@/lib/categories";

/**
 * Reusable Playbook Card Component
 * Structure:
 * 1. 16:9 Thumbnail container
 * 2. Playbook title and category label
 * 3. Optional Bestseller badge, rating, and rating count
 * 4. Card footer: Price ($3.00 / $9.00) on left, Add to cart + Buy buttons on right
 * 5. Full-card outline with rounded corners and subtle hover lift
 */
interface PlaybookFeedCardProps {
  playbook: PlaybookSummary;
}

export default function PlaybookFeedCard({ playbook }: PlaybookFeedCardProps) {
  const [isBuying, setIsBuying] = useState(false);
  const formattedPrice = playbook.price ? Number(playbook.price).toFixed(2) : "3.00";

  const handleBuy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isBuying) return;

    try {
      setIsBuying(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug: playbook.slug }),
      });

      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      // Fallback to playbook page with checkout query param
      window.location.href = `${playbook.href}?checkout=true`;
    } catch (err) {
      console.error("[BUY_NOW_ERROR]", err);
      window.location.href = `${playbook.href}?checkout=true`;
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white border border-[#e7e5e4] p-3 sm:p-3.5 shadow-2xs hover:border-[#d6d3d1] hover:shadow-md motion-safe:hover:-translate-y-1 motion-reduce:hover:transform-none transition-all duration-200 ease-out">
      {/* Clickable Card Body linking to Playbook */}
      <Link
        href={playbook.href}
        className="flex flex-col flex-1 focus:outline-none cursor-pointer"
        aria-label={`${playbook.title} — ${playbook.categoryName} Playbook`}
      >
        {/* 16:9 Thumbnail Container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#e7e5e4] border border-[#e7e5e4]/80">
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
            <div className="h-full w-full bg-[#ebe8e4]" />
          )}
        </div>

        {/* Title and Category */}
        <div className="mt-3">
          <h3 className="text-[15px] sm:text-[15.5px] font-semibold text-[#1c1917] leading-snug line-clamp-2 group-hover:text-[#2563eb] transition-colors">
            {playbook.title}
          </h3>

          {/* Category beneath Title */}
          <div className="mt-1 text-[13px] text-[#57534e]">
            <span className="font-medium text-[#44403c]">{playbook.categoryName}</span>
          </div>

          {/* Optional Bestseller & Ratings Row */}
          {(playbook.badge || playbook.rating) && (
            <div className="mt-2.5 flex items-center gap-1.5 flex-wrap text-xs">
              {playbook.badge && (
                <span className="inline-flex items-center rounded-md bg-[#eff6ff] px-2 py-0.5 text-[11px] font-bold text-[#1d4ed8] tracking-tight">
                  {playbook.badge}
                </span>
              )}
              {playbook.rating && (
                <div className="inline-flex items-center gap-1 rounded-md border border-[#e7e5e4] bg-white px-1.5 py-0.5 text-[11px] font-semibold text-[#1c1917] shadow-2xs">
                  <Star className="h-3 w-3 fill-[#d97706] text-[#d97706]" />
                  <span className="font-bold">{playbook.rating}</span>
                </div>
              )}
              {playbook.ratingCount && (
                <div className="inline-flex items-center rounded-md border border-[#e7e5e4] bg-white px-1.5 py-0.5 text-[11px] text-[#78716c] shadow-2xs">
                  <span>
                    {typeof playbook.ratingCount === "number"
                      ? playbook.ratingCount.toLocaleString()
                      : playbook.ratingCount}{" "}
                    ratings
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Price and Card Action Buttons: Add to cart & Buy side-by-side */}
      <div className="mt-4 sm:mt-5 flex items-center justify-between gap-2 pt-2 border-t border-[#f5f4f0]">
        <div className="flex items-baseline gap-1.5 shrink-0">
          {/* Prominent Current Price ($3.00) */}
          <span className="text-[16px] sm:text-[17px] font-bold text-[#1c1917] tracking-tight">
            ${formattedPrice}
          </span>
          {/* Original Muted Price with Strikethrough ($9.00) */}
          <span className="text-[12px] sm:text-[12.5px] text-[#a8a29e] line-through font-medium">
            $9.00
          </span>
        </div>

        {/* Action Buttons: Add to cart & Buy */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Link
            href={playbook.href}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center rounded-lg border border-[#2563eb] bg-white px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-[#2563eb] hover:bg-[#eff6ff] transition-colors duration-150 shadow-2xs whitespace-nowrap cursor-pointer"
          >
            Add to cart
          </Link>
          <button
            type="button"
            onClick={handleBuy}
            disabled={isBuying}
            className="inline-flex items-center justify-center rounded-lg bg-[#2563eb] px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#1d4ed8] active:bg-[#1e40af] disabled:opacity-60 transition-colors duration-150 shadow-2xs whitespace-nowrap cursor-pointer"
          >
            {isBuying ? "..." : "Buy"}
          </button>
        </div>
      </div>
    </div>
  );
}
