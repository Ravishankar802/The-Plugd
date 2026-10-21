import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import type { PlaybookSummary } from "@/lib/categories";

/**
 * Reusable Playbook Card Component (Matches Reference Product Card Layout)
 * Structure:
 * 1. Thumbnail without price overlay
 * 2. Title aligned to the thumbnail's left edge, without a separate Playbook icon
 * 3. Category & publication date beneath title (no separator dot: "Dating     3 days ago")
 * 4. Optional Bestseller/rating metadata row (Bestseller badge, 4.7 star rating, 1,201 ratings)
 * 5. Price & Add to cart row: Prominent $3 current price, struck-through $9 comparison price, and Add to cart button to the right
 */
interface PlaybookFeedCardProps {
  playbook: PlaybookSummary;
}

function formatRelativeTime(dateString?: string): string {
  if (!dateString) return "Recently added";
  try {
    const published = new Date(dateString).getTime();
    const now = Date.now();
    const diffSeconds = Math.max(0, Math.floor((now - published) / 1000));

    if (diffSeconds < 60) return "just now";
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 5) return `${diffWeeks} week${diffWeeks === 1 ? "" : "s"} ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears} year${diffYears === 1 ? "" : "s"} ago`;
  } catch {
    return "Recently added";
  }
}

export default function PlaybookFeedCard({ playbook }: PlaybookFeedCardProps) {
  const relativeTime = formatRelativeTime(playbook.publishedAt);
  const formattedPrice = playbook.price ? Number(playbook.price).toFixed(2) : "3.00";

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white border border-[#e7e5e4] p-3 sm:p-3.5 shadow-2xs hover:border-[#d6d3d1] hover:shadow-xs transition-all duration-200">
      {/* Clickable Card Body linking to Playbook */}
      <Link
        href={playbook.href}
        className="flex flex-col flex-1 focus:outline-none cursor-pointer"
        aria-label={`${playbook.title} — ${playbook.categoryName} Playbook`}
      >
        {/* 16:9 Thumbnail Container (Without price badge overlay) */}
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
            <div className="h-full w-full bg-linear-to-br from-[#1c1917] to-[#292524] p-5 flex flex-col justify-between text-white">
              <span className="text-xs font-mono text-[#f97316] font-semibold uppercase tracking-wider">
                {playbook.categoryName}
              </span>
              <div className="text-lg font-bold leading-tight">
                {playbook.title}
              </div>
              <span className="text-[11px] font-mono text-[#a8a29e]">
                Playbook Edition
              </span>
            </div>
          )}
        </div>

        {/* Title and Metadata (Left-aligned with thumbnail, no circular icon) */}
        <div className="mt-3">
          <h3 className="text-[15px] sm:text-[15.5px] font-semibold text-[#1c1917] leading-snug line-clamp-2 group-hover:text-[#f97316] transition-colors">
            {playbook.title}
          </h3>

          {/* Category and Publication Date (No separator dot) */}
          <div className="mt-1 flex items-center gap-2 text-[13px] text-[#57534e]">
            <span className="font-medium text-[#44403c]">{playbook.categoryName}</span>
            <span>{relativeTime}</span>
          </div>

          {/* Optional Bestseller & Ratings Row */}
          {(playbook.badge || playbook.rating) && (
            <div className="mt-2.5 flex items-center gap-1.5 flex-wrap text-xs">
              {playbook.badge && (
                <span className="inline-flex items-center rounded-md bg-[#ccfbf1] px-2 py-0.5 text-[11px] font-bold text-[#0f766e] tracking-tight">
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

      {/* Price and Add to Cart Row (Reduced vertical gap, balanced spacing) */}
      <div className="mt-2.5 sm:mt-3 flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          {/* Prominent Current Price ($3.00) */}
          <span className="text-[17px] sm:text-[18px] font-bold text-[#1c1917] tracking-tight">
            ${formattedPrice}
          </span>
          {/* Original Muted Price with Strikethrough ($9.00) */}
          <span className="text-[13px] sm:text-[13.5px] text-[#a8a29e] line-through font-medium">
            $9.00
          </span>
        </div>

        {/* Add to Cart Action Button */}
        <Link
          href={playbook.href}
          className="inline-flex items-center justify-center rounded-lg border border-[#f97316] bg-white px-3 sm:px-3.5 py-1.5 text-xs sm:text-[13px] font-semibold text-[#f97316] hover:bg-[#f97316] hover:text-white transition-colors duration-150 shrink-0 shadow-2xs"
        >
          Add to cart
        </Link>
      </div>
    </div>
  );
}
