import Link from "next/link";
import Image from "next/image";
import type { PlaybookSummary } from "@/lib/categories";

/**
 * YouTube-style Playbook Card Component
 * Refined layout:
 * 1. Price badge enlarged in bottom-right corner of thumbnail (YouTube duration style)
 * 2. Modules & lessons badge removed from thumbnail
 * 3. Category & relative date on same line without separator dot (e.g. "Dating  3 days ago")
 * 4. Subtle, rounded card-level hover highlight extending behind thumbnail and info row
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

  return (
    <Link
      href={playbook.href}
      className="group flex flex-col p-2.5 -m-2.5 rounded-2xl transition-colors duration-150 hover:bg-black/[0.04] focus-visible:bg-black/[0.04] focus:outline-none cursor-pointer"
      aria-label={`${playbook.title} — ${playbook.categoryName} Playbook`}
    >
      {/* 16:9 Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#e7e5e4] border border-[#e7e5e4] shadow-xs">
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

        {/* Noticeably Larger High-Contrast Price Badge (Bottom Right — YouTube Duration Position) */}
        <div className="absolute bottom-2.5 right-2.5 rounded-md bg-white text-[#1c1917] px-2.5 py-1 text-xs sm:text-[13px] font-bold font-mono tracking-tight shadow-sm border border-black/15 pointer-events-none leading-none">
          ${playbook.price} USD
        </div>
      </div>

      {/* YouTube-Style Info Row Below Thumbnail */}
      <div className="mt-3 flex items-start gap-3">
        {/* Playbook Icon on the Left */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white border border-[#e7e5e4] shadow-xs overflow-hidden mt-0.5">
          <Image
            src="/icon.png"
            alt="Plugd"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>

        {/* Title and Metadata on the Right (Horizontally Aligned Column) */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] sm:text-[15.5px] font-semibold text-[#1c1917] leading-snug line-clamp-2 group-hover:text-[#f97316] transition-colors">
            {playbook.title}
          </h3>

          {/* Category & Relative Publication Time (No Separator Dot) */}
          <div className="mt-1 flex items-center gap-2 text-[13px] text-[#57534e]">
            <span className="font-medium text-[#44403c]">{playbook.categoryName}</span>
            <span>{relativeTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
