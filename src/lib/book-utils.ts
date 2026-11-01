// Utility helpers for Digital Playbook / Book Architecture

export interface BookReview {
  id: string;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  badge?: string;
  headline: string;
  content: string;
  likes: number;
}

export interface AuthorProfile {
  name: string;
  avatar: string;
  booksCount: number;
  followersCount: string;
  bio: string;
}

/**
 * Returns total page count based on price tier according to user rules:
 * - $3: 100 - 150 pages
 * - $4: ~135 - 165 pages
 * - $5: 150 - 200 pages
 * - $6: ~185 - 215 pages
 * - $7: 200 - 250 pages
 * - $9: 250 - 300 pages
 * - $12: 300 - 400 pages
 * - $15: 500 - 700 pages
 * - $19: 700 - 1000 pages
 */
export function getPlaybookPageCount(price: number, slug = ""): number {
  const hash = slug.split("").reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0);
  const offset = Math.abs(hash % 25);

  if (price <= 3) return 118 + (offset % 24); // 118 - 141 (Range: 100-150)
  if (price <= 4) return 138 + (offset % 20); // 138 - 157
  if (price <= 5) return 164 + (offset % 28); // 164 - 191 (Range: 150-200)
  if (price <= 6) return 188 + (offset % 20); // 188 - 207
  if (price <= 7) return 214 + (offset % 28); // 214 - 241 (Range: 200-250)
  if (price <= 9) return 262 + (offset % 30); // 262 - 291 (Range: 250-300)
  if (price <= 12) return 332 + (offset % 50); // 332 - 381 (Range: 300-400)
  if (price <= 15) return 540 + (offset * 5); // 540 - 660 (Range: 500-700)
  return 760 + (offset * 8); // 760 - 952 (Range: 700-1000)
}

/**
 * Returns page range for an individual chapter within the total book pages
 */
export function getChapterPageRange(
  chapterIndex: number,
  totalChapters: number,
  totalPages: number
): { startPage: number; endPage: number } {
  const frontMatterPages = 8;
  const contentPages = Math.max(totalPages - frontMatterPages, totalChapters * 2);
  const avgPagesPerChapter = contentPages / Math.max(totalChapters, 1);

  const startPage = Math.floor(frontMatterPages + chapterIndex * avgPagesPerChapter) + 1;
  const endPage = Math.min(
    totalPages,
    Math.floor(frontMatterPages + (chapterIndex + 1) * avgPagesPerChapter)
  );

  return {
    startPage: Math.max(1, startPage),
    endPage: Math.max(startPage, endPage),
  };
}

/**
 * Social reading stats (Goodreads-style)
 */
export function getReadingStats(slug = ""): {
  currentlyReading: string;
  wantToRead: string;
} {
  const hash = Math.abs(slug.split("").reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0));
  const reading = 3400 + (hash % 5800);
  const want = 12400 + ((hash * 7) % 18200);

  return {
    currentlyReading: reading.toLocaleString(),
    wantToRead: want.toLocaleString(),
  };
}

/**
 * Author profile for About the Author section
 */
export function getAuthorProfile(categoryName = "AI Businesses", slug = ""): AuthorProfile {
  if (slug === "how-to-build-10k-websites-in-minutes-claude-ai") {
    return {
      name: "Caleb Sterling",
      avatar: "",
      booksCount: 6,
      followersCount: "18.4k",
      bio: "Your go-to source for in-depth playbooks on the best website builders and online platforms. Whether you're creating your first website, launching an online store, expanding your business, or simply exploring the latest digital tools, I’ve got you covered. My mission is to make it easier for you to find the right tool for your business and learn how to use it effectively. Read my playbooks for unbiased insights, expert guidance, and practical tips to help you succeed online.",
    };
  }

  return {
    name: "Plugd Research & Editorial",
    avatar: "",
    booksCount: 60,
    followersCount: "34.2k",
    bio: "Plugd Research & Editorial publishes authoritative, zero-fluff digital playbooks for modern entrepreneurs, digital builders, and independent operators. Grounded in first-principles thinking, operational unit economics, and production systems.",
  };
}

/**
 * High quality, realistic community reviews
 */
export function getCuratedCommunityReviews(
  title: string,
  rating: number,
  slug = ""
): BookReview[] {
  if (slug === "how-to-build-10k-websites-in-minutes-claude-ai") {
    return [
      {
        id: "rev-1",
        name: "Jose Vidal",
        avatar: "",
        date: "October 14, 2026",
        rating: 5,
        headline: "The rare business playbook with zero filler — pure tactical signal.",
        content: "The rare business playbook with zero filler — pure tactical signal. I absolutely love this playbook, you cannot find this anywhere else but on Plugd Playbooks bc the instagram scammers are everywhere trying to sell you fake tips",
        likes: 84,
      },
      {
        id: "rev-2",
        name: "Raissa Asman",
        avatar: "",
        date: "September 28, 2026",
        rating: 5,
        headline: "Worth 50x the price. Structured like an elite executive briefing. Thanks a lot. keep it up 👍",
        content: "Worth 50x the price. Structured like an elite executive briefing. Thanks a lot. keep it up 👍",
        likes: 67,
      },
      {
        id: "rev-3",
        name: "David Chen",
        avatar: "",
        date: "October 02, 2026",
        rating: 5,
        headline: "Extremely deep and practical. Dense with actionable insights.",
        content: "Extremely deep and practical. Dense with actionable insights. You answered all of the questions I didn't know I had until watching this.  This is a FANTASTIC RESOURCE!! ",
        likes: 42,
      },
      {
        id: "rev-4",
        name: "Sarah Jenkins",
        avatar: "",
        date: "August 19, 2026",
        rating: 5,
        headline: "Thanks to you, I've built and deployed on my VPS the best-looking website I've ever made!",
        content: "Thanks to you, I've built and deployed on my VPS the best-looking website I've ever made!\nThanks a lot!",
        likes: 31,
      },
    ];
  }

  return [
    {
      id: "rev-1",
      name: "Marcus Vance",
      avatar: "",
      date: "October 14, 2026",
      rating: 5,
      headline: "The rare business playbook with zero filler — pure tactical signal.",
      content: `I've read dozens of business and tech guides, and 95% could have been a blog post. "${title}" is the complete opposite. It reads like Peter Thiel's Zero to One applied directly to this vertical. The mental models, concrete unit economics, and step-by-step systems gave me a complete operational playbook. Finished the whole book in two sittings and immediately restructured our team's workflow.`,
      likes: 84,
    },
    {
      id: "rev-2",
      name: "Elena Rostova",
      avatar: "",
      date: "September 28, 2026",
      rating: 5,
      headline: "Worth 50x the price. Structured like an elite executive briefing.",
      content: `What sets this playbook apart is its rigor. It doesn't promise overnight riches or give vague advice. Instead, it systematically breaks down the architectural foundations, failure points, and competitive moats. The breakdown in Chapter 3 alone saved us months of trial and error. Easily one of my top 3 business reads this year.`,
      likes: 67,
    },
    {
      id: "rev-3",
      name: "David Chen",
      avatar: "",
      date: "October 02, 2026",
      rating: 4,
      headline: "Extremely deep and practical. Dense with actionable insights.",
      content: `Dense, highly technical yet completely accessible. The decision frameworks and worked examples make execution feel inevitable if you put in the hours. Highly recommend printing or keeping the reference charts close by.`,
      likes: 42,
    },
    {
      id: "rev-4",
      name: "Sarah Jenkins",
      avatar: "",
      date: "August 19, 2026",
      rating: 5,
      headline: "Masterpiece in concise, high-leverage instruction.",
      content: `This is what business publishing should look like in 2026. Every chapter is disciplined, packed with empirical data and battle-tested directives. You leave with an unfair clarity that other books never deliver.`,
      likes: 31,
    },
  ];
}

/**
 * Deterministic vibrant background color for initials avatars
 */
export function getAvatarBgColor(name: string, index = 0): string {
  if (!name) return "#1c1917";
  const PALETTE = [
    "#059669", // emerald
    "#2563eb", // blue
    "#7c3aed", // violet
    "#d97706", // amber
    "#e11d48", // rose
    "#4f46e5", // indigo
    "#0d9488", // teal
    "#ea580c", // orange
    "#0891b2", // cyan
    "#9333ea", // purple
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
  }
  return PALETTE[Math.abs(hash + index) % PALETTE.length];
}
