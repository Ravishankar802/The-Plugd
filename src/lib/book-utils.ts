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
export function getAuthorProfile(categoryName = "AI", slug = ""): AuthorProfile {
  if (
    slug === "its-boring-but-will-make-even-beginners-millionaires-in-2026" ||
    slug === "ai-businesses-13"
  ) {
    return {
      name: "Diego Valera",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "the-5-money-principles-that-will-make-anyone-rich-in-their-20s" ||
    slug === "ai-businesses-12" ||
    slug === "i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business" ||
    slug === "ai-businesses-14"
  ) {
    return {
      name: "Brady Lawson",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "the-4-levels-to-getting-rich-in-2026" ||
    slug === "ai-businesses-15"
  ) {
    return {
      name: "Austin Mercer",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "copy-paste-this-strategy-to-make-13k-month-with-ai-in-2026" ||
    slug === "ai-businesses-07"
  ) {
    return {
      name: "Jordan Hayes",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "7-side-hustles-students-can-start-in-2027" ||
    slug === "ai-businesses-57"
  ) {
    return {
      name: "Terence Chew",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "i-sell-pdfs-with-ai-and-it-changed-my-life-revealing-everything" ||
    slug === "ai-businesses-58"
  ) {
    return {
      name: "Shawn Lim",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "3-best-ai-businesses-to-start-before-2027-and-the-one-id-start-today" ||
    slug === "ai-businesses-59"
  ) {
    return {
      name: "Bryce Holloway",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "bro-im-begging-you-to-build-this-4-8m-product-idea" ||
    slug === "ai-businesses-72"
  ) {
    return {
      name: "Dylan Scott",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "if-i-had-to-start-a-business-from-scratch-id-do-this" ||
    slug === "ai-businesses-71"
  ) {
    return {
      name: "Dylan Scott",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "how-i-build-a-10cr-agency-without-any-knowledge" ||
    slug === "ai-businesses-70"
  ) {
    return {
      name: "Naveen Shetty",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "zero-to-1000-profit-with-dropshipping-using-ai-24hours" ||
    slug === "zero-to-1-000-profit-with-dropshipping-using-ai-24hours" ||
    slug === "ai-businesses-69"
  ) {
    return {
      name: "Jiho Kim",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "marketing-agents-are-too-good-now" ||
    slug === "ai-businesses-68"
  ) {
    return {
      name: "Jack Robertson",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }


  if (
    slug === "claude-chatgpt-57152-in-90-days" ||
    slug === "ai-businesses-67"
  ) {
    return {
      name: "Rishabh Jain",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }


  if (
    slug === "its-boring-but-i-make-51-day-in-1-hour-at-22" ||
    slug === "ai-businesses-66"
  ) {
    return {
      name: "Kunal Raj",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "this-ai-business-will-make-you-10k-month-with-zero-employees" ||
    slug === "ai-businesses-65"
  ) {
    return {
      name: "Liam Foster",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "if-youre-ambitious-and-in-your-20s-or-30s-please-watch-this" ||
    slug === "ai-businesses-64"
  ) {
    return {
      name: "Seiji Kai-Lun",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "give-me-27-minutes-and-ill-make-you-disgustingly-good-at-digital-marketing" ||
    slug === "ai-businesses-63"
  ) {
    return {
      name: "Caleb String",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "i-built-an-85m-ai-startup-in-5-months-heres-my-playbook" ||
    slug === "ai-businesses-62"
  ) {
    return {
      name: "Nathan Cole",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "i-tried-a-100-free-ai-side-hustle-for-indians-real-results" ||
    slug === "ai-businesses-61"
  ) {
    return {
      name: "Sneha Mishra",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "5-simple-apps-making-10-000-month-that-you-can-build-with-ai" ||
    slug === "ai-businesses-60"
  ) {
    return {
      name: "Kelvin Ng",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "if-youre-in-your-20s-heres-how-to-win-at-anything" ||
    slug === "ai-businesses-55"
  ) {
    return {
      name: "Niall Brennan",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "the-smartest-way-to-capitalize-on-the-ai-gold-rush" ||
    slug === "ai-businesses-56"
  ) {
    return {
      name: "Preston McCoy",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m" ||
    slug === "ai-businesses-53"
  ) {
    return {
      name: "Martim Neves",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "if-i-wanted-to-become-a-millionaire-in-2026-this-is-what-id-do-full-blueprint" ||
    slug === "ai-businesses-54" ||
    slug === "if-i-wanted-to-become-a-millionaire-in-2027-this-is-what-id-do"
  ) {
    return {
      name: "Alistair Boyd",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "7-ai-automations" ||
    slug === "ai-businesses-01" ||
    slug === "these-3-ai-businesses-will-make-you-10k-month-with-zero-employees" ||
    slug === "these-3-ai-will-make-you-10k-month-with-zero-employees"
  ) {
    return {
      name: "Byron Matthews",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "side-hustles" ||
    slug === "side-hustles-08" ||
    slug === "5-ways-to-find-paying-customers-without-spending-on-ads" ||
    slug === "10-ways-to-find-paying-customers-without-spending-on-ads"
  ) {
    return {
      name: "Kyle Donovan",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge" ||
    slug === "ai-businesses-03" ||
    slug === "give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge" ||
    slug === "ai-businesses-04"
  ) {
    return {
      name: "Sean Mitchell",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "5-proven-ways-to-make-money-with-ai-no-experience" ||
    slug === "ai-businesses-05"
  ) {
    return {
      name: "Andre Simmons",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "the-best-ai-side-hustles-to-start-in-2026-no-skills" ||
    slug === "ai-businesses-06"
  ) {
    return {
      name: "Eduardo Martins",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "build-a-one-person-business-as-a-beginner-from-0-to-10k" ||
    slug === "ai-businesses-08"
  ) {
    return {
      name: "Darshan Hegde",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "laziest-way-to-make-money-online-in-2026-500-day" ||
    slug === "ai-businesses-09"
  ) {
    return {
      name: "Akhil Varma",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "the-blueprint-to-go-from-0-to-1000000" ||
    slug === "ai-businesses-10"
  ) {
    return {
      name: "Franco Medina",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "your-first-1m-is-simple-heres-how" ||
    slug === "ai-businesses-11"
  ) {
    return {
      name: "Myles Grant",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "the-a-i-revolution-8-ways-to-get-rich" ||
    slug === "ai-businesses-16"
  ) {
    return {
      name: "Adrian Teoh",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "how-i-turned-300-to-100-000-at-19-my-side-hustles" ||
    slug === "ai-businesses-17"
  ) {
    return {
      name: "Moritz Klein",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "how-to-become-rich-with-social-media-my-exact-playbook" ||
    slug === "ai-businesses-18"
  ) {
    return {
      name: "Owen Bradley",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "how-to-get-rich-for-service-based-businesses-thank-me-later" ||
    slug === "ai-businesses-19"
  ) {
    return {
      name: "Tejas Patil",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "the-new-way-of-making-content-in-the-age-of-ai" ||
    slug === "ai-businesses-20"
  ) {
    return {
      name: "Rafael Mendes",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "how-to-catch-up-in-life-using-logic" ||
    slug === "ai-businesses-21"
  ) {
    return {
      name: "Manish Yadav",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "what-makes-the-perfect-business-5-things" ||
    slug === "ai-businesses-22"
  ) {
    return {
      name: "Marco Romano",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "how-to-use-ai-in-your-business-in-2026" ||
    slug === "ai-businesses-23"
  ) {
    return {
      name: "Jason Teo",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "if-you-have-multiple-interests-please-start-a-one-person-business" ||
    slug === "ai-businesses-24"
  ) {
    return {
      name: "Sergio Torres",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "how-to-build-a-1m-one-person-business-faster-with-ai" ||
    slug === "ai-businesses-26"
  ) {
    return {
      name: "Thomas Visser",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (
    slug === "learn-this-skill-if-you-want-to-win-in-the-next-2-3-years" ||
    slug === "ai-businesses-25" ||
    slug === "how-to-think-like-a-strategic-genius-5-dimensional-thinking" ||
    slug === "ai-businesses-27" ||
    slug === "how-to-use-ai-better-than-99-of-people-this-changed-my-life" ||
    slug === "ai-businesses-28"
  ) {
    return {
      name: "Ryan Walsh",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "youre-stuck-in-the-matrix-heres-how-you-escape" || slug === "ai-businesses-29") {
    return {
      name: "Sean O'Brien",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "you-have-5-years-to-get-rich-before-ai-takes-over" || slug === "ai-businesses-30") {
    return {
      name: "Luka Horvat",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "investing-for-beginners-in-25-minutes" || slug === "ai-businesses-31") {
    return {
      name: "Pranav Joshi",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "laziest-ways-to-make-money-with-ai-for-beginners" || slug === "ai-businesses-32") {
    return {
      name: "Felix Weber",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "how-to-use-trading-212-in-2026-full-investing-guide" || slug === "ai-businesses-33") {
    return {
      name: "Dylan Scott",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "7-side-hustles-students-can-start-in-2026" || slug === "ai-businesses-34") {
    return {
      name: "Austin Bailey",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "making-money-online-is-easy-actually-just-copy-me") {
    return {
      name: "Naveen Shetty",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "how-to-make-your-first-10-000-as-a-teen-stupid-simple") {
    return {
      name: "Yash Thakur",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "the-only-investing-video-youll-ever-need-start-with-100") {
    return {
      name: "Jiho Kim",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "7-proven-ways-to-make-money-with-ai-no-experience") {
    return {
      name: "Jack Robertson",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "how-to-actually-lock-in-no-bullsh-t-guide") {
    return {
      name: "Jacob Wilson",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "18-years-of-ugly-business-advice-in-19-minutes") {
    return {
      name: "Alex Turner",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "want-to-made-god-tier-money-use-this-sales-tactic-made-me-10m") {
    return {
      name: "Alex Turner",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "there-are-only-3-types-of-profitable-businesses-pick-one") {
    return {
      name: "Elias Andersen",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "if-you-dont-understand-leadership-youll-never-win") {
    return {
      name: "Stefan Müller",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "i-built-a-business-with-ai-in-24-hours") {
    return {
      name: "Rishabh Jain",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "copy-paste-this-strategy-to-make-your-first-5-000-online") {
    return {
      name: "Liam Foster",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "7-remote-jobs-you-can-do-from-home") {
    return {
      name: "Ronit Meitei",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "i-asked-ai-to-make-me-as-much-money-as-possible") {
    return {
      name: "Sneha Mishra",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "these-are-the-best-business-books-to-read-7-billionaire-books") {
    return {
      name: "Sneha Mishra",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "master-higgsfield-ai-in-20-minutes-beginner-tutorial") {
    return {
      name: "Nathan Cole",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "my-honest-advice-to-someone-who-wants-to-get-rich") {
    return {
      name: "Kunal Raj",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

  if (slug === "the-30k-month-al-faceless-shorts-method-nobodys-talking-about") {
    return {
      name: "Seiji Kai-Lun",
      avatar: "",
      booksCount: 1,
      followersCount: "",
      bio: "",
    };
  }

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
  if (
    slug === "bro-im-begging-you-to-build-this-4-8m-product-idea" ||
    slug === "ai-businesses-72"
  ) {
    return [
      {
        id: "rev-1",
        name: "Ethan Caldwell",
        avatar: "",
        date: "August 04 2026",
        rating: 5,
        headline: "",
        content: "One of the better resources I've come across on physical product ideas. The two-pillar framework made me reconsider how I evaluate products. I especially liked the focus on manufacturing complexity and profit density, not just whether an idea sounds exciting.",
        likes: 121,
      },
      {
        id: "rev-2",
        name: "Mariana",
        avatar: "",
        date: "August 08 2026",
        rating: 5,
        headline: "",
        content: "I always thought product development started with designing something and then figuring out who would buy it. This playbook flips that approach completely. The customer observation exercises and interview questions are genuinely useful.",
        likes: 109,
      },
      {
        id: "rev-3",
        name: "Dev Patel",
        avatar: "",
        date: "August 14 2026",
        rating: 5,
        headline: "",
        content: "The section about validating before manufacturing probably saved me from wasting money on an idea I was getting too attached to. The scorecards, competitor analysis, and concept-testing process make the whole thing feel much more systematic.",
        likes: 90,
      },
      {
        id: "rev-4",
        name: "Rebecca",
        avatar: "",
        date: "August 21 2026",
        rating: 5,
        headline: "",
        content: "Packed with interesting ways to think about everyday problems. I particularly enjoyed the SCAMPER techniques and the examples of finding opportunities in traditional industries. It makes you look at ordinary products and wonder what could be improved.",
        likes: 84,
      },
    ];
  }

  if (
    slug === "if-i-had-to-start-a-business-from-scratch-id-do-this" ||
    slug === "ai-businesses-71"
  ) {
    return [
      {
        id: "rev-1",
        name: "Natalie",
        avatar: "",
        date: "August 04 2026",
        rating: 5,
        headline: "",
        content: "Really liked how this breaks down the early stages of starting a business. The advice about getting results before worrying about scaling is something more beginners need to hear. The 30-day sprint makes it much easier to actually begin.",
        likes: 121,
      },
      {
        id: "rev-2",
        name: "Arjun",
        avatar: "",
        date: "August 08 2026",
        rating: 5,
        headline: "",
        content: "I used to think I needed a proper website, branding, and a fully developed offer before approaching anyone. This completely changed how I look at starting. The warm outreach and pilot approach feels much more realistic.",
        likes: 109,
      },
      {
        id: "rev-3",
        name: "Gabriel Santos",
        avatar: "",
        date: "August 14 2026",
        rating: 5,
        headline: "",
        content: "The section on turning a service into a repeatable system was my favourite. It's not just about getting customers; it explains how to deliver consistently, improve your process, and build something sustainable. Very actionable.",
        likes: 90,
      },
      {
        id: "rev-4",
        name: "Chloe",
        avatar: "",
        date: "August 21 2026",
        rating: 5,
        headline: "",
        content: "Straightforward, practical, and refreshingly honest. I especially appreciated the mistakes section and the emphasis on building recurring relationships instead of constantly chasing new clients. Lots of ideas worth putting into practice.",
        likes: 84,
      },
    ];
  }

  if (
    slug === "how-i-build-a-10cr-agency-without-any-knowledge" ||
    slug === "ai-businesses-70"
  ) {
    return [
      {
        id: "rev-1",
        name: "Andre Whitmore",
        avatar: "",
        date: "August 04 2026",
        rating: 5,
        headline: "",
        content: "What stood out to me was the progression. It doesn't jump straight into hiring people and chasing big retainers. It explains how to earn your way there through actual skills, client work, and trust.",
        likes: 121,
      },
      {
        id: "rev-2",
        name: "Saanvi Kulkarni",
        avatar: "",
        date: "August 08 2026",
        rating: 5,
        headline: "",
        content: "I've been thinking about starting an agency, but always assumed I needed to know everything first. The specialised-to-generalised model changed how I look at it. Build one strong capability, then bring in the missing pieces.",
        likes: 109,
      },
      {
        id: "rev-3",
        name: "Rafael Dominguez",
        avatar: "",
        date: "August 14 2026",
        rating: 5,
        headline: "",
        content: "The sections on retainers, team structure, and agency economics are excellent. I especially appreciated the distinction between revenue and actual profit. There's a lot of practical thinking here.",
        likes: 90,
      },
      {
        id: "rev-4",
        name: "Brooke Anderson",
        avatar: "",
        date: "August 21 2026",
        rating: 5,
        headline: "",
        content: "My favourite part is the founder mindset chapter. Learning to solve problems, understand the work, and recognise your own weaknesses is more useful than another generic guide about getting rich with an agency.",
        likes: 84,
      },
    ];
  }

  if (
    slug === "zero-to-1000-profit-with-dropshipping-using-ai-24hours" ||
    slug === "zero-to-1-000-profit-with-dropshipping-using-ai-24hours" ||
    slug === "ai-businesses-69"
  ) {
    return [
      {
        id: "rev-1",
        name: "Marcus",
        avatar: "",
        date: "August 04 2026",
        rating: 5,
        headline: "",
        content: "The unit economics section alone makes this worth reading. It's easy to get excited about sales screenshots, but this actually explains how to calculate what you're keeping after product costs, shipping, fees, and ads.",
        likes: 121,
      },
      {
        id: "rev-2",
        name: "Priyanka",
        avatar: "",
        date: "August 08 2026",
        rating: 5,
        headline: "",
        content: "I liked how the whole process is connected. Product research flows into store creation, then creative testing and campaign analysis. The prompts are useful too, especially for evaluating products without blindly trusting AI.",
        likes: 109,
      },
      {
        id: "rev-3",
        name: "Julianne Costa",
        avatar: "",
        date: "August 14 2026",
        rating: 5,
        headline: "",
        content: "I appreciate that this doesn't just focus on making money. It covers client relationships, tracking, reporting, and the operational side too. The first-client pilot is a particularly useful starting point.",
        likes: 90,
      },
      {
        id: "rev-4",
        name: "Devonte Harris",
        avatar: "",
        date: "August 21 2026",
        rating: 5,
        headline: "",
        content: "The competitor ad research and creative testing chapters gave me a better way to think about marketing. Instead of copying whatever is trending, you learn to understand the angle behind an ad and develop your own variations.",
        likes: 84,
      },
    ];
  }
  if (
    slug === "marketing-agents-are-too-good-now" ||
    slug === "ai-businesses-68"
  ) {
    return [
      {
        id: "rev-1",
        name: "Harshil Deshmukh",
        avatar: "",
        date: "August 04 2026",
        rating: 5,
        headline: "",
        content: "I finally understand the difference between an AI automation and an actual agent. The architecture section made the whole concept click, especially how advertising data, CRM activity, and revenue can work together.",
        likes: 121,
      },
      {
        id: "rev-2",
        name: "Elena Brooks",
        avatar: "",
        date: "August 08 2026",
        rating: 5,
        headline: "",
        content: "Loved that this goes beyond prompting ChatGPT to write ads. The creative pipeline, feedback loops, and campaign decision systems gave me a much clearer picture of what building a real marketing agent involves.",
        likes: 109,
      },
      {
        id: "rev-3",
        name: "Karthik Reddy",
        avatar: "",
        date: "August 14 2026",
        rating: 5,
        headline: "",
        content: "The implementation roadmap is probably my favourite part. It breaks a pretty intimidating project into manageable stages, starting with read-only analysis before moving towards automated actions. Very practical.",
        likes: 90,
      },
      {
        id: "rev-4",
        name: "Amara Okafor",
        avatar: "",
        date: "August 21 2026",
        rating: 5,
        headline: "",
        content: "There's a lot more here than just Meta Ads. The WordPress product ideas and other agent opportunities got me thinking about entirely different ways to build AI-powered software. A genuinely useful read.",
        likes: 84,
      },
    ];
  }
  if (
    slug === "claude-chatgpt-57152-in-90-days" ||
    slug === "ai-businesses-67"
  ) {
    return [
      {
        id: "rev-1",
        name: "Daniel",
        avatar: "",
        date: "August 04 2026",
        rating: 5,
        headline: "",
        content: "The best part is how the entire process connects. I went from thinking about AI videos as random clips to understanding how research, scripting, storyboarding, and editing fit into one production system.",
        likes: 121,
      },
      {
        id: "rev-2",
        name: "Felix Morgan",
        avatar: "",
        date: "August 08 2026",
        rating: 5,
        headline: "",
        content: "Those Claude prompts are incredibly useful. The competitor research and scene breakdown sections gave me a much clearer way to plan videos instead of staring at a blank screen wondering what to make.",
        likes: 109,
      },
      {
        id: "rev-3",
        name: "Anika Patel",
        avatar: "",
        date: "August 14 2026",
        rating: 5,
        headline: "",
        content: "I expected another guide promising effortless YouTube money. Instead, it actually explains retention, copyright, monetisation, and production costs. That honest approach made the material much more valuable.",
        likes: 90,
      },
      {
        id: "rev-4",
        name: "Nandini Shah",
        avatar: "",
        date: "August 21 2026",
        rating: 5,
        headline: "",
        content: "The branding section was a nice surprise. Having the prompts for channel names, logos, banners, and descriptions alongside the video workflow makes this feel like a complete launch guide.",
        likes: 84,
      },
    ];
  }
  if (
    slug === "its-boring-but-will-make-even-beginners-millionaires-in-2026" ||
    slug === "ai-businesses-13"
  ) {
    return [
      {
        id: "rev-1",
        name: "Emiliano",
        avatar: "",
        date: "August 04 2026",
        rating: 5,
        headline: "",
        content: "This is exactly what beginners need. Instead of pushing complicated startup ideas, it explains how to find a real problem, start small, and get your first customers. Very practical.",
        likes: 121,
      },
      {
        id: "rev-2",
        name: "Manuel",
        avatar: "",
        date: "August 08 2026",
        rating: 5,
        headline: "",
        content: "The market timing and career timing concepts were eye-opening. I finally understand why copying someone else's business model doesn't necessarily make sense for where I am right now.",
        likes: 109,
      },
      {
        id: "rev-3",
        name: "Luciano Godoy",
        avatar: "",
        date: "August 14 2026",
        rating: 5,
        headline: "",
        content: "Loved the emphasis on implementation over endless learning. The minimum viable business chapter and 90-day roadmap make this feel like something you can actually follow, not just read and forget.",
        likes: 90,
      },
      {
        id: "rev-4",
        name: "Martín",
        avatar: "",
        date: "August 21 2026",
        rating: 5,
        headline: "",
        content: "A refreshing take on entrepreneurship. It makes starting a business feel less intimidating and shows how much you can accomplish by solving one small problem really well. Great read.",
        likes: 84,
      },
    ];
  }

  if (
    slug === "the-5-money-principles-that-will-make-anyone-rich-in-their-20s" ||
    slug === "ai-businesses-12"
  ) {
    return [
      {
        id: "rev-1",
        name: "Devin",
        avatar: "",
        date: "August 01 2026",
        rating: 5,
        headline: "",
        content: "Really liked how this breaks wealth-building down into principles you can actually apply. The 90-day plan makes it much easier to stop overthinking and start taking action.",
        likes: 127,
      },
      {
        id: "rev-2",
        name: "Chase Morgan",
        avatar: "",
        date: "August 09 2026",
        rating: 5,
        headline: "",
        content: "More than another motivational guide. I loved the practical exercises, weekly reviews, and the way it connects personal discipline with financial progress. Definitely worth reading.",
        likes: 105,
      },
      {
        id: "rev-3",
        name: "Riley",
        avatar: "",
        date: "August 15 2026",
        rating: 5,
        headline: "",
        content: "The section about investing in your earning power completely changed how I look at money. Building valuable skills first makes so much sense, especially when you're starting with limited capital.",
        likes: 93,
      },
      {
        id: "rev-4",
        name: "Evan Foster",
        avatar: "",
        date: "August 20 2026",
        rating: 5,
        headline: "",
        content: "The biggest takeaway for me was learning to experiment with different income paths instead of blindly following what works for someone else. Straightforward, practical, and genuinely useful.",
        likes: 88,
      },
    ];
  }

  if (
    slug === "i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business" ||
    slug === "ai-businesses-14"
  ) {
    return [
      {
        id: "rev-1",
        name: "Elliot Warren",
        avatar: "",
        date: "August 03 2026",
        rating: 5,
        headline: "",
        content: "This is probably one of the most useful SaaS-building guides I've read. It goes beyond the usual startup advice and explains the actual decisions involved in turning a basic tool into a real software business.",
        likes: 119,
      },
      {
        id: "rev-2",
        name: "Grant",
        avatar: "",
        date: "August 11 2026",
        rating: 5,
        headline: "",
        content: "The sections on MVPs, pricing, subscriptions, and customer retention are incredibly valuable. I especially liked the emphasis on building something people genuinely need instead of endlessly adding features.",
        likes: 101,
      },
      {
        id: "rev-3",
        name: "Joel Whitaker",
        avatar: "",
        date: "August 17 2026",
        rating: 5,
        headline: "",
        content: "A fantastic resource for aspiring SaaS founders. The founder-independence framework and practical operating templates really stood out. It makes the process of building a proper software company much easier to understand.",
        likes: 89,
      },
      {
        id: "rev-4",
        name: "Adrian",
        avatar: "",
        date: "August 25 2026",
        rating: 5,
        headline: "",
        content: "What makes this playbook different is how much attention it gives to the difficult parts of entrepreneurship: declining revenue, co-founder conflicts, product improvements, and building a capable team. Very insightful.",
        likes: 83,
      },
    ];
  }

  if (
    slug === "the-4-levels-to-getting-rich-in-2026" ||
    slug === "ai-businesses-15"
  ) {
    return [
      {
        id: "rev-1",
        name: "Blake",
        avatar: "",
        date: "August 05 2026",
        rating: 5,
        headline: "",
        content: "I love how this breaks wealth-building into actual stages. Instead of throwing random money-making ideas at you, it explains what to focus on depending on where you are financially. Really useful perspective.",
        likes: 113,
      },
      {
        id: "rev-2",
        name: "Garrett",
        avatar: "",
        date: "August 13 2026",
        rating: 5,
        headline: "",
        content: "The transition from freelancing to building an agency to eventually investing capital is explained brilliantly. It helped me understand why building earning power should come before chasing big investments.",
        likes: 97,
      },
      {
        id: "rev-3",
        name: "Spencer Wallace",
        avatar: "",
        date: "August 18 2026",
        rating: 5,
        headline: "",
        content: "This is the kind of financial playbook I wish I had read earlier. The different wealth levels, practical checklists, financial worksheets, and 90-day plan make everything feel much more actionable.",
        likes: 79,
      },
      {
        id: "rev-4",
        name: "Gavin",
        avatar: "",
        date: "August 22 2026",
        rating: 5,
        headline: "",
        content: "A great reminder that getting rich isn't just about earning more. It's about keeping money, building assets, managing risk, creating systems, and surrounding yourself with capable people. Packed with useful ideas.",
        likes: 80,
      },
    ];
  }

  if (
    slug === "copy-paste-this-strategy-to-make-13k-month-with-ai-in-2026" ||
    slug === "ai-businesses-07"
  ) {
    return [
      {
        id: "rev-1",
        name: "Corey Bryant",
        avatar: "",
        date: "October 04 2026",
        rating: 5,
        headline: "",
        content: "One of the more interesting AI business models I've come across. The shadow operator concept is explained clearly, and the step-by-step process makes it feel much easier to approach.",
        likes: 75,
      },
      {
        id: "rev-2",
        name: "Denzel Parker",
        avatar: "",
        date: "October 15 2026",
        rating: 5,
        headline: "",
        content: "Loved how practical this is. The creator research framework, outreach scripts, and partnership templates give you an actual starting point instead of just another motivational guide.",
        likes: 60,
      },
      {
        id: "rev-3",
        name: "Kaden",
        avatar: "",
        date: "October 16 2026",
        rating: 5,
        headline: "",
        content: "The best part is understanding how to combine AI skills with someone else's audience and expertise. It completely changed how I think about building an online business.",
        likes: 44,
      },
      {
        id: "rev-4",
        name: "Jaylen",
        avatar: "",
        date: "October 20 2026",
        rating: 5,
        headline: "",
        content: "Super detailed and actionable. I especially liked the revenue-sharing breakdown, AI prompts, and 30-day plan. It covers the business side, not just product creation.",
        likes: 31,
      },
    ];
  }

  if (
    slug === "7-side-hustles-students-can-start-in-2027" ||
    slug === "ai-businesses-57"
  ) {
    return [
      {
        id: "rev-1",
        name: "Dongwoo Jang",
        avatar: "",
        date: "October 03 2026",
        rating: 5,
        headline: "",
        content: "Really helpful for anyone trying to earn while studying. I liked that it covers different types of side hustles instead of pretending there's one perfect opportunity for everyone.",
        likes: 70,
      },
      {
        id: "rev-2",
        name: "Kofi Gyamfi",
        avatar: "",
        date: "October 13 2026",
        rating: 5,
        headline: "",
        content: "The AI app and UGC sections were my favourites. The step-by-step plans make it much easier to understand how to go from an idea to actually testing it.",
        likes: 59,
      },
      {
        id: "rev-3",
        name: "Nicolas Valenzuela",
        avatar: "",
        date: "October 17 2026",
        rating: 5,
        headline: "",
        content: "One of the more realistic student business guides I've read. It explains the risks, costs, and time commitment instead of just throwing impressive income numbers around.",
        likes: 40,
      },
      {
        id: "rev-4",
        name: "Cristian",
        avatar: "",
        date: "October 22 2026",
        rating: 5,
        headline: "",
        content: "Loved the comparison tables and 90-day roadmap. It helped me narrow down which side hustle makes sense for my skills, budget, and college schedule.",
        likes: 35,
      },
    ];
  }

  if (
    slug === "i-sell-pdfs-with-ai-and-it-changed-my-life-revealing-everything" ||
    slug === "ai-businesses-58"
  ) {
    return [
      {
        id: "rev-1",
        name: "Danish Faiz",
        avatar: "",
        date: "September 05 2026",
        rating: 5,
        headline: "",
        content: "This completely changed how I think about digital products. Instead of creating something and hoping people buy it, you learn how to find demand first. The research framework is gold.",
        likes: 86,
      },
      {
        id: "rev-2",
        name: "Dwi Anggara",
        avatar: "",
        date: "September 11 2026",
        rating: 5,
        headline: "",
        content: "The AI prompts and step-by-step PDF creation process are incredibly useful. I especially liked the validation section because it helps avoid wasting time building products nobody wants.",
        likes: 73,
      },
      {
        id: "rev-3",
        name: "Aldi Kurnia",
        avatar: "",
        date: "September 14 2026",
        rating: 5,
        headline: "",
        content: "A genuinely practical guide. It covers everything from finding a niche to creating the product, pricing it, and getting traffic. No unnecessary fluff.",
        likes: 61,
      },
      {
        id: "rev-4",
        name: "Firas Hamdan",
        avatar: "",
        date: "September 20 2026",
        rating: 5,
        headline: "",
        content: "Loved how actionable this playbook is. The worksheets, content strategies, and 30-day roadmap make the whole process feel much more manageable. Definitely worth going through.",
        likes: 50,
      },
    ];
  }

  if (
    slug === "3-best-ai-businesses-to-start-before-2027-and-the-one-id-start-today" ||
    slug === "ai-businesses-59"
  ) {
    return [
      {
        id: "rev-1",
        name: "Ziyang Ma",
        avatar: "",
        date: "October 05 2026",
        rating: 5,
        headline: "",
        content: "Really useful breakdown of three business models. I especially liked how it explains the actual trade-offs instead of making everything sound easy.",
        likes: 66,
      },
      {
        id: "rev-2",
        name: "Naoki",
        avatar: "",
        date: "October 11 2026",
        rating: 5,
        headline: "",
        content: "The digital products section alone makes this worth reading. The prompts, validation steps, and launch roadmap give you a clear place to start.",
        likes: 53,
      },
      {
        id: "rev-3",
        name: "Tatsuya",
        avatar: "",
        date: "October 14 2026",
        rating: 5,
        headline: "",
        content: "Finally, an AI business guide that focuses on customers, distribution, and profitability instead of just throwing tools at you. Very practical.",
        likes: 50,
      },
      {
        id: "rev-4",
        name: "Kenta",
        avatar: "",
        date: "October 20 2026",
        rating: 5,
        headline: "",
        content: "Loved the comparison between all three models. It helped me understand which business fits my resources and why validating an idea matters before building.",
        likes: 30,
      },
    ];
  }

  if (
    slug === "its-boring-but-i-make-51-day-in-1-hour-at-22" ||
    slug === "ai-businesses-66"
  ) {
    return [
      {
        id: "rev-1",
        name: "Liam Fletcher",
        avatar: "",
        date: "August 04 2026",
        rating: 5,
        headline: "",
        content: "Finally, a side hustle guide that actually shows you what to look for. The trick of checking how many people have an item in their bag instead of just counting likes was such a useful insight.",
        likes: 121,
      },
      {
        id: "rev-2",
        name: "Aisha Rahman",
        avatar: "",
        date: "August 08 2026",
        rating: 5,
        headline: "",
        content: "I went in thinking this would be another generic dropshipping tutorial, but the product photography section completely changed my perspective. The AI image prompts and listing examples alone make this worth reading.",
        likes: 109,
      },
      {
        id: "rev-3",
        name: "Benjamin Clarke",
        avatar: "",
        date: "August 14 2026",
        rating: 5,
        headline: "",
        content: "Simple concept, solid execution. I particularly appreciated the profit calculations because it's easy to see a $30 price difference and forget about shipping, fees, and refunds. This explains the numbers properly.",
        likes: 90,
      },
      {
        id: "rev-4",
        name: "Tara Desai",
        avatar: "",
        date: "August 21 2026",
        rating: 5,
        headline: "",
        content: "The seven-day challenge is my favourite part! Everything is broken into manageable tasks, from researching your first products to setting up a shop and reviewing the results. No unnecessary complexity, just a clear process to test.",
        likes: 84,
      },
    ];
  }

  if (
    slug === "this-ai-business-will-make-you-10k-month-with-zero-employees" ||
    slug === "ai-businesses-65"
  ) {
    return [
      {
        id: "rev-1",
        name: "Noah Williams",
        avatar: "",
        date: "August 04 2026",
        rating: 5,
        headline: "",
        content: "The traffic-partner model was something I hadn't considered before. I especially liked the breakdown of attribution and performance-based pricing. It explains how to build a service around measurable value rather than vague promises.",
        likes: 121,
      },
      {
        id: "rev-2",
        name: "Rhea Kapoor",
        avatar: "",
        date: "August 08 2026",
        rating: 5,
        headline: "",
        content: "Very detailed and surprisingly practical. The nine Traffic OS systems give you a clear picture of how the business operates, while the templates make the whole process feel much more manageable.",
        likes: 109,
      },
      {
        id: "rev-3",
        name: "Thomas Mitchell",
        avatar: "",
        date: "August 14 2026",
        rating: 5,
        headline: "",
        content: "I appreciate that this doesn't just focus on making money. It covers client relationships, tracking, reporting, and the operational side too. The first-client pilot is a particularly useful starting point.",
        likes: 90,
      },
      {
        id: "rev-4",
        name: "Zara Fernandes",
        avatar: "",
        date: "August 21 2026",
        rating: 5,
        headline: "",
        content: "The AI workflows and 90-day roadmap are the highlights for me. It takes an unusual business model and breaks it into actual systems you can understand, test, and improve.",
        likes: 84,
      },
    ];
  }

  if (
    slug === "if-youre-ambitious-and-in-your-20s-or-30s-please-watch-this" ||
    slug === "ai-businesses-64"
  ) {
    return [
      {
        id: "rev-1",
        name: "Arjun",
        avatar: "",
        date: "August 04 2026",
        rating: 5,
        headline: "",
        content: "The biggest takeaway for me was learning to focus on one primary goal instead of constantly jumping between ideas. The 90-day plan makes it much easier to put that into practice.",
        likes: 121,
      },
      {
        id: "rev-2",
        name: "Emily Parker",
        avatar: "",
        date: "August 08 2026",
        rating: 5,
        headline: "",
        content: "I liked how practical this was. The sections on calculated risks, decision-making, and building competence really made me rethink how I've been approaching my career.",
        likes: 109,
      },
      {
        id: "rev-3",
        name: "Kabir",
        avatar: "",
        date: "August 14 2026",
        rating: 5,
        headline: "",
        content: "A much-needed reminder that ambition means nothing without execution. The weekly review system and worksheets are particularly useful for staying accountable.",
        likes: 90,
      },
      {
        id: "rev-4",
        name: "Sophie",
        avatar: "",
        date: "August 21 2026",
        rating: 5,
        headline: "",
        content: "What stood out was the emphasis on sustainable ambition. It doesn't just tell you to work harder; it explains how to prioritise, improve your skills, and avoid burning yourself out.",
        likes: 84,
      },
    ];
  }

  if (
    slug === "give-me-27-minutes-and-ill-make-you-disgustingly-good-at-digital-marketing" ||
    slug === "ai-businesses-63"
  ) {
    return [
      {
        id: "rev-1",
        name: "Oliver Hayes",
        avatar: "",
        date: "August 04 2026",
        rating: 5,
        headline: "",
        content: "The HALO strategy alone makes this worth reading. I never realised how much better marketing becomes when you actually study what customers say instead of guessing what they want.",
        likes: 121,
      },
      {
        id: "rev-2",
        name: "Kavya Menon",
        avatar: "",
        date: "August 08 2026",
        rating: 5,
        headline: "",
        content: "Finally, a marketing guide that goes beyond random ad tips. The examples, swipe-file exercises, and copywriting framework make it something I can genuinely use while working on campaigns.",
        likes: 109,
      },
      {
        id: "rev-3",
        name: "Ryan Cooper",
        avatar: "",
        date: "August 14 2026",
        rating: 5,
        headline: "",
        content: "I particularly enjoyed the sections on demand generation and customer awareness. They helped me understand why some ads need to educate people first instead of immediately pushing a product.",
        likes: 90,
      },
      {
        id: "rev-4",
        name: "Diya Sharma",
        avatar: "",
        date: "August 21 2026",
        rating: 5,
        headline: "",
        content: "A surprisingly comprehensive resource. The 17-step sales page system and funnel optimisation chapters gave me a much clearer process for writing, testing, and improving marketing campaigns.",
        likes: 84,
      },
    ];
  }

  if (
    slug === "i-built-an-85m-ai-startup-in-5-months-heres-my-playbook" ||
    slug === "ai-businesses-62"
  ) {
    return [
      {
        id: "rev-1",
        name: "Corey",
        avatar: "",
        date: "August 04 2026",
        rating: 5,
        headline: "",
        content: "One of the most practical startup guides I've read. The CODE framework completely changed how I evaluate business ideas. I especially liked the focus on validating demand before spending months building.",
        likes: 121,
      },
      {
        id: "rev-2",
        name: "Jared",
        avatar: "",
        date: "August 08 2026",
        rating: 5,
        headline: "",
        content: "This connects all the important pieces of building a startup—from finding the opportunity to getting your first customers. The 90-day execution plan makes everything feel much more actionable.",
        likes: 109,
      },
      {
        id: "rev-3",
        name: "Shane",
        avatar: "",
        date: "August 14 2026",
        rating: 5,
        headline: "",
        content: "Loved the emphasis on building an audience before launching. The MVP and customer-feedback chapters are especially valuable. It feels like an actual operating manual rather than another motivational startup ebook.",
        likes: 90,
      },
      {
        id: "rev-4",
        name: "Eric",
        avatar: "",
        date: "August 21 2026",
        rating: 5,
        headline: "",
        content: "Packed with useful frameworks, checklists, and practical exercises. The sections on distribution, lead magnets, and outbound sales gave me a much clearer picture of how to turn a product into a real business.",
        likes: 84,
      },
    ];
  }

  if (
    slug === "i-tried-a-100-free-ai-side-hustle-for-indians-real-results" ||
    slug === "ai-businesses-61"
  ) {
    return [
      {
        id: "rev-1",
        name: "Vedant",
        avatar: "",
        date: "August 04 2026",
        rating: 5,
        headline: "",
        content: "One of the most practical side-hustle guides I've come across. I especially liked how it explains the entire process, from finding product ideas to creating PDFs and getting traffic through Pinterest. Easy to follow.",
        likes: 121,
      },
      {
        id: "rev-2",
        name: "Aakash Bhat",
        avatar: "",
        date: "August 08 2026",
        rating: 5,
        headline: "",
        content: "The India-focused payment and storefront section makes this particularly useful. I always found international digital-product selling confusing, but this breaks the process into manageable steps.",
        likes: 109,
      },
      {
        id: "rev-3",
        name: "Ronav",
        avatar: "",
        date: "August 14 2026",
        rating: 5,
        headline: "",
        content: "Really appreciated the actual experiment and the transparent breakdown of downloads, sales, and revenue. No unrealistic promises about getting rich overnight. Just a clear workflow you can test yourself.",
        likes: 90,
      },
      {
        id: "rev-4",
        name: "Abhinandan",
        avatar: "",
        date: "August 21 2026",
        rating: 5,
        headline: "",
        content: "The AI prompts, Canva workflow, and Pinterest Pin strategies are incredibly helpful. I like that everything is explained step by step, especially the free-to-paid product funnel. Great resource for beginners.",
        likes: 84,
      },
    ];
  }

  if (
    slug === "5-simple-apps-making-10-000-month-that-you-can-build-with-ai" ||
    slug === "ai-businesses-60"
  ) {
    return [
      {
        id: "rev-1",
        name: "Darren Low",
        avatar: "",
        date: "October 09 2026",
        rating: 5,
        headline: "",
        content: "Absolutely love how practical this is. Instead of throwing out random startup ideas, it shows you how to find existing demand and build something people already understand. The app concepts and AI prompts are incredibly useful.",
        likes: 63,
      },
      {
        id: "rev-2",
        name: "Ethan Ho",
        avatar: "",
        date: "October 13 2026",
        rating: 5,
        headline: "",
        content: "A fantastic resource for anyone interested in micro-SaaS. The breakdown of each app, its core features, and monetisation strategy makes the whole process feel much more approachable. Definitely gave me ideas worth exploring.",
        likes: 56,
      },
      {
        id: "rev-3",
        name: "Faizal Ismail",
        avatar: "",
        date: "October 19 2026",
        rating: 5,
        headline: "",
        content: "The competitor research and subscription sections are gold. I especially liked how the playbook explains that you don't need to build a massive platform to create something valuable. Simple, focused, and genuinely actionable.",
        likes: 41,
      },
      {
        id: "rev-4",
        name: "Qais Rahal",
        avatar: "",
        date: "October 25 2026",
        rating: 5,
        headline: "",
        content: "One of the most actionable AI business guides I've come across. The ready-to-use build prompts, MVP breakdowns, and 30-day roadmap make it easy to go from an idea to a working prototype. Great value!",
        likes: 34,
      },
    ];
  }

  if (
    slug === "if-youre-in-your-20s-heres-how-to-win-at-anything" ||
    slug === "ai-businesses-55"
  ) {
    return [
      {
        id: "rev-1",
        name: "Pascal Schmitt",
        avatar: "",
        date: "October 07 2026",
        rating: 5,
        headline: "",
        content: "This genuinely changed how I approach my goals. The idea of doing more of what already works sounds simple, but the frameworks make it incredibly actionable. A much-needed reminder to stop overthinking and start executing.",
        likes: 60,
      },
      {
        id: "rev-2",
        name: "Florian",
        avatar: "",
        date: "October 12 2026",
        rating: 5,
        headline: "",
        content: "The best part is the focus on consistency over constant reinvention. I've spent so much time switching strategies instead of giving one approach enough time to work. This playbook puts everything into perspective.",
        likes: 55,
      },
      {
        id: "rev-3",
        name: "Koen Willems",
        avatar: "",
        date: "October 16 2026",
        rating: 5,
        headline: "",
        content: "Packed with practical frameworks that apply to almost everything—business, learning, career, and personal development. The 90-day plan and weekly review templates make it especially useful.",
        likes: 50,
      },
      {
        id: "rev-4",
        name: "Elias",
        avatar: "",
        date: "October 23 2026",
        rating: 5,
        headline: "",
        content: "A powerful mindset shift for anyone in their twenties. It teaches you to think bigger, stop getting distracted by shiny new strategies, and build the discipline to follow through. Definitely worth reading.",
        likes: 36,
      },
    ];
  }

  if (
    slug === "the-smartest-way-to-capitalize-on-the-ai-gold-rush" ||
    slug === "ai-businesses-56"
  ) {
    return [
      {
        id: "rev-1",
        name: "Landon Briggs",
        avatar: "",
        date: "October 04 2026",
        rating: 5,
        headline: "",
        content: "Finally, an AI playbook that focuses on building actual businesses instead of just throwing random tools at you. The frameworks are practical, and the productisation section is especially valuable.",
        likes: 61,
      },
      {
        id: "rev-2",
        name: "Franklin",
        avatar: "",
        date: "October 06 2026",
        rating: 5,
        headline: "",
        content: "I loved the way this breaks down the AI opportunity. It completely changed how I think about using AI—not as the product itself, but as leverage to solve real customer problems.",
        likes: 52,
      },
      {
        id: "rev-3",
        name: "Curtis",
        avatar: "",
        date: "October 12 2026",
        rating: 5,
        headline: "",
        content: "Packed with actionable ideas without making things unnecessarily complicated. The 14-day sprint and 30-day roadmap make it much easier to stop researching endlessly and actually start building.",
        likes: 43,
      },
      {
        id: "rev-4",
        name: "Nolan",
        avatar: "",
        date: "October 21 2026",
        rating: 5,
        headline: "",
        content: "One of the most useful guides I've read about AI entrepreneurship. The focus on specialised tools, validating demand, and turning services into digital products makes this genuinely worth studying.",
        likes: 28,
      },
    ];
  }

  if (
    slug === "if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m" ||
    slug === "ai-businesses-53"
  ) {
    return [
      {
        id: "rev-1",
        name: "Łukasz",
        avatar: "",
        date: "October 01 2026",
        rating: 5,
        headline: "",
        content: "Exactly what a beginner needs. Instead of telling you to chase random business ideas, it walks you through finding a real problem, creating an offer, getting customers, and making your first sale. The 30-day sprint is brilliant.",
        likes: 59,
      },
      {
        id: "rev-2",
        name: "Patrik",
        avatar: "",
        date: "October 07 2026",
        rating: 5,
        headline: "",
        content: "The sales and prospecting sections are incredibly practical. I especially liked the nine-stage selling framework and the AI prompts. It gives you an actual process to follow instead of leaving you with vague advice.",
        likes: 48,
      },
      {
        id: "rev-3",
        name: "Petar",
        avatar: "",
        date: "October 13 2026",
        rating: 5,
        headline: "",
        content: "One of the best structured business guides I've read. The focus on solving painful problems, pricing properly, and delivering value quickly completely changes how you approach starting a business. Very actionable.",
        likes: 37,
      },
      {
        id: "rev-4",
        name: "Hrithik",
        avatar: "",
        date: "October 23 2026",
        rating: 5,
        headline: "",
        content: "I loved the combination of business strategy and practical AI workflows. The worksheets make it easy to turn the lessons into actual work, and the weekly scorecard helps you stay focused on what matters. Definitely worth going through.",
        likes: 32,
      },
    ];
  }

  if (
    slug === "if-i-wanted-to-become-a-millionaire-in-2026-this-is-what-id-do-full-blueprint" ||
    slug === "ai-businesses-54" ||
    slug === "if-i-wanted-to-become-a-millionaire-in-2027-this-is-what-id-do"
  ) {
    return [
      {
        id: "rev-1",
        name: "Rhys",
        avatar: "",
        date: "October 03 2026",
        rating: 5,
        headline: "",
        content: "This is much more than another millionaire motivation guide. It actually explains how to build the business, acquire customers, improve sales, and create the systems needed for long-term growth. The frameworks are incredibly useful.",
        likes: 51,
      },
      {
        id: "rev-2",
        name: "Cillian",
        avatar: "",
        date: "October 09 2026",
        rating: 5,
        headline: "",
        content: "The biggest takeaway for me was understanding that revenue and actual wealth are two completely different things. The customer economics, offer design, and acquisition chapters made everything feel much more practical and achievable.",
        likes: 47,
      },
      {
        id: "rev-3",
        name: "Conor",
        avatar: "",
        date: "October 15 2026",
        rating: 5,
        headline: "",
        content: "I loved how everything connects. It takes you from choosing a market to building an offer, getting customers, improving retention, and eventually creating leverage. The 2027 roadmap makes it especially actionable.",
        likes: 33,
      },
      {
        id: "rev-4",
        name: "Benedikt Maier",
        avatar: "",
        date: "October 25 2026",
        rating: 5,
        headline: "",
        content: "One of the most comprehensive business playbooks I've gone through. The CLOSER framework, management systems, and practical worksheets are worth revisiting. It makes you think like a business owner instead of someone just chasing money.",
        likes: 30,
      },
    ];
  }

  if (
    slug === "7-ai-automations" ||
    slug === "ai-businesses-01" ||
    slug === "these-3-ai-businesses-will-make-you-10k-month-with-zero-employees" ||
    slug === "these-3-ai-will-make-you-10k-month-with-zero-employees"
  ) {
    return [
      {
        id: "rev-1",
        name: "Quincy",
        avatar: "",
        date: "October 11 2026",
        rating: 5,
        headline: "",
        content: "One of the clearest breakdowns of AI business opportunities I've read. The comparison between automation, content agencies, and shadow operating makes it much easier to decide which direction to pursue.",
        likes: 58,
      },
      {
        id: "rev-2",
        name: "Spencer",
        avatar: "",
        date: "October 14 2026",
        rating: 5,
        headline: "",
        content: "The shadow-operating model was the standout for me. I never really considered partnering with creators and handling the business side of their digital products. The outreach scripts and partnership frameworks are incredibly useful.",
        likes: 49,
      },
      {
        id: "rev-3",
        name: "Wesley",
        avatar: "",
        date: "October 16 2026",
        rating: 5,
        headline: "",
        content: "This goes beyond throwing AI tools at random business ideas. It explains how to find real problems, build valuable services, price them, deliver consistently, and create systems that can scale.",
        likes: 42,
      },
      {
        id: "rev-4",
        name: "Geoffrey",
        avatar: "",
        date: "October 22 2026",
        rating: 5,
        headline: "",
        content: "A fantastic resource for anyone interested in starting a one-person AI business. The practical prompts, 90-day roadmap, and detailed workflows make the entire process feel much more approachable.",
        likes: 36,
      },
    ];
  }

  if (
    slug === "side-hustles" ||
    slug === "side-hustles-08" ||
    slug === "5-ways-to-find-paying-customers-without-spending-on-ads" ||
    slug === "10-ways-to-find-paying-customers-without-spending-on-ads"
  ) {
    return [
      {
        id: "rev-1",
        name: "Niklas",
        avatar: "",
        date: "September 10 2026",
        rating: 5,
        headline: "",
        content: "A genuinely useful guide to getting customers without burning money on ads. I especially liked how it explains the role of each platform and how to turn attention into actual enquiries.",
        likes: 90,
      },
      {
        id: "rev-2",
        name: "Thijs Smit",
        avatar: "",
        date: "September 19 2026",
        rating: 5,
        headline: "",
        content: "The five-channel breakdown makes organic marketing much easier to understand. The content prompts, email templates, and 30-day plan make this something you can actually put into practice.",
        likes: 71,
      },
      {
        id: "rev-3",
        name: "Romain",
        avatar: "",
        date: "October 08 2026",
        rating: 5,
        headline: "",
        content: "My biggest takeaway was learning to focus on qualified leads instead of chasing views and followers. The conversion funnel and channel selection frameworks are excellent.",
        likes: 63,
      },
      {
        id: "rev-4",
        name: "Jelle Bos",
        avatar: "",
        date: "October 14 2026",
        rating: 5,
        headline: "",
        content: "Perfect for small businesses and beginners who want to grow organically. It covers everything from content creation and Pinterest SEO to email marketing and customer follow-ups in a very practical way.",
        likes: 49,
      },
    ];
  }

  if (slug === "give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge" || slug === "ai-businesses-03") {
    return [
      {
        id: "rev-1",
        name: "Dominic",
        avatar: "",
        date: "September 08 2026",
        rating: 5,
        headline: "",
        content: "This is the kind of Claude guide I was looking for. It goes beyond basic prompting and shows how to build an actual working system around AI. The Skills and Projects sections are especially useful.",
        likes: 89,
      },
      {
        id: "rev-2",
        name: "Ewan McKenzie",
        avatar: "",
        date: "September 25 2026",
        rating: 5,
        headline: "",
        content: "The progression from beginner to advanced makes everything easy to follow. I particularly liked the practical prompts for automating repetitive tasks and delegating work.",
        likes: 75,
      },
      {
        id: "rev-3",
        name: "Aidan",
        avatar: "",
        date: "October 11 2026",
        rating: 5,
        headline: "",
        content: "A genuinely practical playbook. The sections on Claude Code, browser assistance, and building reusable Skills helped me see how much more I can accomplish beyond ordinary conversations.",
        likes: 60,
      },
      {
        id: "rev-4",
        name: "Lewis Barrett",
        avatar: "",
        date: "October 13 2026",
        rating: 5,
        headline: "",
        content: "Well structured, detailed, and packed with useful examples. I appreciate that it also covers permissions, human approval, and quality checks instead of making automation sound effortless.",
        likes: 46,
      },
    ];
  }

  if (slug === "give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge" || slug === "ai-businesses-04") {
    return [
      {
        id: "rev-1",
        name: "Derek",
        avatar: "",
        date: "September 15 2026",
        rating: 5,
        headline: "",
        content: "This completely changed how I think about using ChatGPT. Instead of just asking random questions, I now understand how to build workflows around my everyday tasks.",
        likes: 87,
      },
      {
        id: "rev-2",
        name: "Grant Douglas",
        avatar: "",
        date: "September 21 2026",
        rating: 5,
        headline: "",
        content: "Packed with practical prompts and genuinely useful examples. The sections on research, study workflows, and agent-style execution are especially valuable.",
        likes: 71,
      },
      {
        id: "rev-3",
        name: "Owen",
        avatar: "",
        date: "October 10 2026",
        rating: 5,
        headline: "",
        content: "One of the most useful ChatGPT guides I've read. It explains not just what the features do, but when and how to use them effectively.",
        likes: 63,
      },
      {
        id: "rev-4",
        name: "Declan Byrne",
        avatar: "",
        date: "October 14 2026",
        rating: 5,
        headline: "",
        content: "The 7-day upgrade plan makes everything feel achievable. I especially appreciate the focus on accuracy, privacy, and using AI responsibly instead of blindly trusting it.",
        likes: 44,
      },
    ];
  }

  if (slug === "5-proven-ways-to-make-money-with-ai-no-experience" || slug === "ai-businesses-05") {
    return [
      {
        id: "rev-1",
        name: "Sterling Carter",
        avatar: "",
        date: "September 15 2026",
        rating: 5,
        headline: "",
        content: "Finally, an AI side-hustle guide that explains the actual business behind the tools. The comparison of all five models made choosing a starting point much easier.",
        likes: 87,
      },
      {
        id: "rev-2",
        name: "Javari",
        avatar: "",
        date: "September 21 2026",
        rating: 5,
        headline: "",
        content: "I liked how practical everything is. The workflows, outreach examples, and 30-day plan make it much easier to stop researching and actually start.",
        likes: 71,
      },
      {
        id: "rev-3",
        name: "Maurice",
        avatar: "",
        date: "October 10 2026",
        rating: 5,
        headline: "",
        content: "The CLEAR framework is a great addition. It helped me understand the trade-offs between services and digital products instead of blindly following hype.",
        likes: 63,
      },
      {
        id: "rev-4",
        name: "Cameron",
        avatar: "",
        date: "October 14 2026",
        rating: 5,
        headline: "",
        content: "A genuinely useful beginner's playbook. It covers how to find customers, create offers, price services, and deliver quality work—not just which AI tools to use.",
        likes: 44,
      },
    ];
  }

  if (slug === "the-best-ai-side-hustles-to-start-in-2026-no-skills" || slug === "ai-businesses-06") {
    return [
      {
        id: "rev-1",
        name: "Lwazi",
        avatar: "",
        date: "September 15 2026",
        rating: 5,
        headline: "",
        content: "Finally, an AI side-hustle guide that goes beyond listing random business ideas. The tier rankings make it easy to compare opportunities, and the practical breakdowns show what it actually takes to get started.",
        likes: 87,
      },
      {
        id: "rev-2",
        name: "Joseph Kiptoo",
        avatar: "",
        date: "September 21 2026",
        rating: 5,
        headline: "",
        content: "The best part is how honestly this playbook explains the downsides of each model. It helped me understand the difference between something that's easy to start and something that can actually become a business.",
        likes: 71,
      },
      {
        id: "rev-3",
        name: "Themba",
        avatar: "",
        date: "October 10 2026",
        rating: 5,
        headline: "",
        content: "Packed with useful ideas and actionable workflows. I particularly liked the sections on digital products, AI automation, and lead generation. The 30-day plan makes it much easier to take action.",
        likes: 63,
      },
      {
        id: "rev-4",
        name: "Junseok",
        avatar: "",
        date: "October 14 2026",
        rating: 5,
        headline: "",
        content: "Perfect for beginners who want to explore AI business opportunities without getting lost in technical details. The prompts, worksheets, and decision matrix make this a genuinely practical resource.",
        likes: 44,
      },
    ];
  }

  if (slug === "build-a-one-person-business-as-a-beginner-from-0-to-10k" || slug === "ai-businesses-08") {
    return [
      {
        id: "rev-1",
        name: "Naveen",
        avatar: "",
        date: "August 09 2026",
        rating: 5,
        headline: "",
        content: "Exactly what I needed to stop overthinking and start building. The business model selection and customer research sections made everything feel much more practical.",
        likes: 95,
      },
      {
        id: "rev-2",
        name: "Sandeep",
        avatar: "",
        date: "September 03 2026",
        rating: 5,
        headline: "",
        content: "I love how this breaks down the entire process without making it unnecessarily complicated. The worksheets and 30-day roadmap are especially useful for beginners.",
        likes: 77,
      },
      {
        id: "rev-3",
        name: "Abhinav",
        avatar: "",
        date: "September 14 2026",
        rating: 5,
        headline: "",
        content: "The biggest takeaway for me was learning to validate an offer before wasting months building something nobody wants. Very practical advice and actionable frameworks.",
        likes: 71,
      },
      {
        id: "rev-4",
        name: "Chirag",
        avatar: "",
        date: "September 23 2026",
        rating: 5,
        headline: "",
        content: "A great resource for anyone who wants to start an online business with limited resources. The AI workflows, product ideas, and distribution strategies make it particularly valuable.",
        likes: 55,
      },
    ];
  }

  if (slug === "laziest-way-to-make-money-online-in-2026-500-day" || slug === "ai-businesses-09") {
    return [
      {
        id: "rev-1",
        name: "Nitin",
        avatar: "",
        date: "August 09 2026",
        rating: 5,
        headline: "",
        content: "One of the clearest guides I've read on building a digital-product business. The third-layer theory helped me understand why targeting a specific problem is so much better than creating another generic ebook. The influencer strategy is a great addition.",
        likes: 95,
      },
      {
        id: "rev-2",
        name: "Lakshya Sethi",
        avatar: "",
        date: "September 03 2026",
        rating: 5,
        headline: "",
        content: "I really liked how practical this is. It covers everything from finding an idea and using AI to create the product to getting it in front of actual buyers. The 30-day launch plan makes the whole process feel manageable.",
        likes: 77,
      },
      {
        id: "rev-3",
        name: "Shanaya",
        avatar: "",
        date: "September 14 2026",
        rating: 5,
        headline: "",
        content: "The micro-influencer partnership model was the biggest takeaway for me. Instead of relying entirely on ads, this shows how to find relevant creators and build performance-based partnerships. Very actionable.",
        likes: 71,
      },
      {
        id: "rev-4",
        name: "Ishita",
        avatar: "",
        date: "September 23 2026",
        rating: 5,
        headline: "",
        content: "This is much more than a collection of AI prompts. It actually explains the business behind digital products, including research, validation, product quality, distribution, and profit calculations. Definitely worth studying.",
        likes: 55,
      },
    ];
  }

  if (slug === "the-blueprint-to-go-from-0-to-1000000" || slug === "ai-businesses-10") {
    return [
      {
        id: "rev-1",
        name: "Andrés",
        avatar: "",
        date: "August 15 2026",
        rating: 5,
        headline: "",
        content: "Exactly the wake-up call I needed. The chapters on business inertia and radical focus completely changed how I approach my goals. Practical, direct, and genuinely useful.",
        likes: 92,
      },
      {
        id: "rev-2",
        name: "Femi",
        avatar: "",
        date: "September 08 2026",
        rating: 5,
        headline: "",
        content: "I loved how this playbook turns the million-dollar ambition into smaller, actionable steps. The 30-day and 90-day plans make it much easier to stop overthinking and actually execute.",
        likes: 79,
      },
      {
        id: "rev-3",
        name: "Danish",
        avatar: "",
        date: "September 15 2026",
        rating: 5,
        headline: "",
        content: "The focus and monk mode sections are gold. It isn't just about working harder; it's about directing your energy toward the right things while keeping your health and routine in check.",
        likes: 74,
      },
      {
        id: "rev-4",
        name: "Muneeb",
        avatar: "",
        date: "September 20 2026",
        rating: 5,
        headline: "",
        content: "One of the most practical entrepreneurship guides I've read. The financial milestone tracker, weekly reviews, and business focus plan make this something I'll actually keep coming back to.",
        likes: 57,
      },
    ];
  }

  if (slug === "your-first-1m-is-simple-heres-how" || slug === "ai-businesses-11") {
    return [
      {
        id: "rev-1",
        name: "Derek",
        avatar: "",
        date: "August 21 2026",
        rating: 5,
        headline: "",
        content: "Exactly the wake-up call I needed. The chapters on business inertia and radical focus completely changed how I approach my goals. Practical, direct, and genuinely useful.",
        likes: 85,
      },
      {
        id: "rev-2",
        name: "Archie",
        avatar: "",
        date: "September 05 2026",
        rating: 5,
        headline: "",
        content: "I loved how this playbook turns the million-dollar ambition into smaller, actionable steps. The 30-day and 90-day plans make it much easier to stop overthinking and actually execute.",
        likes: 80,
      },
      {
        id: "rev-3",
        name: "Freddie",
        avatar: "",
        date: "September 13 2026",
        rating: 5,
        headline: "",
        content: "The focus and monk mode sections are gold. It isn't just about working harder; it's about directing your energy toward the right things while keeping your health and routine in check.",
        likes: 71,
      },
      {
        id: "rev-4",
        name: "Toby",
        avatar: "",
        date: "September 21 2026",
        rating: 5,
        headline: "",
        content: "One of the most practical entrepreneurship guides I've read. The financial milestone tracker, weekly reviews, and business focus plan make this something I'll actually keep coming back to.",
        likes: 62,
      },
    ];
  }

  if (slug === "the-a-i-revolution-8-ways-to-get-rich" || slug === "ai-businesses-16") {
    return [
      {
        id: "rev-1",
        name: "Bilal Jaber",
        avatar: "",
        date: "August 22 2026",
        rating: 5,
        headline: "",
        content: "This is exactly the kind of AI guide I was looking for. Instead of just listing tools, it explains how to actually use AI to become more productive and create economic value.",
        likes: 85,
      },
      {
        id: "rev-2",
        name: "Asif Hasan",
        avatar: "",
        date: "September 10 2026",
        rating: 5,
        headline: "",
        content: "The eight applications are incredibly useful. I especially liked the sections on AI workflows and becoming the expert who directs and validates AI. That completely changed my perspective.",
        likes: 80,
      },
      {
        id: "rev-3",
        name: "Laith Hamdan",
        avatar: "",
        date: "September 17 2026",
        rating: 5,
        headline: "",
        content: "A genuinely practical playbook. The prompts, examples, and 30-day plan make it easy to start applying everything instead of getting lost in AI hype.",
        likes: 71,
      },
      {
        id: "rev-4",
        name: "Bagas Prakoso",
        avatar: "",
        date: "September 26 2026",
        rating: 5,
        headline: "",
        content: "My favourite takeaway is that AI doesn't replace the need for expertise. It makes expertise more powerful. A must-read for anyone serious about staying ahead.",
        likes: 69,
      },
    ];
  }

  if (slug === "how-i-turned-300-to-100-000-at-19-my-side-hustles" || slug === "ai-businesses-17") {
    return [
      {
        id: "rev-1",
        name: "Theo Lambert",
        avatar: "",
        date: "August 23 2026",
        rating: 5,
        headline: "",
        content: "I love how this breaks down the entire journey instead of pretending there's one magic side hustle. The lessons on starting small, selling, and reinvesting are genuinely valuable.",
        likes: 88,
      },
      {
        id: "rev-2",
        name: "Thijs Smit",
        avatar: "",
        date: "September 12 2026",
        rating: 5,
        headline: "",
        content: "One of the most practical guides I've come across. The opportunity filters, profit calculations, and 90-day plan make it easy to turn ideas into actual experiments.",
        likes: 76,
      },
      {
        id: "rev-3",
        name: "Jelle Bos",
        avatar: "",
        date: "September 14 2026",
        rating: 5,
        headline: "",
        content: "The biggest takeaway is that every experiment should teach you something. I especially liked the progression from reselling to e-commerce, content, and digital products.",
        likes: 74,
      },
      {
        id: "rev-4",
        name: "Emil Andersen",
        avatar: "",
        date: "September 23 2026",
        rating: 5,
        headline: "",
        content: "A fantastic resource for anyone starting with limited money. It doesn't just talk about making money; it explains margins, risks, customer acquisition, and protecting your capital.",
        likes: 65,
      },
    ];
  }

  if (slug === "how-to-become-rich-with-social-media-my-exact-playbook" || slug === "ai-businesses-18") {
    return [
      {
        id: "rev-1",
        name: "Declan Byrne",
        avatar: "",
        date: "August 27 2026",
        rating: 5,
        headline: "",
        content: "A refreshing take on social media. It completely changes how you think about followers, views, and what actually makes content valuable to a business.",
        likes: 85,
      },
      {
        id: "rev-2",
        name: "Rory Fitzgerald",
        avatar: "",
        date: "September 14 2026",
        rating: 5,
        headline: "",
        content: "The customer research and buyer-focused content frameworks are incredibly useful. I finally have a clear strategy instead of randomly posting and hoping something works.",
        likes: 72,
      },
      {
        id: "rev-3",
        name: "Dominic Walsh",
        avatar: "",
        date: "September 19 2026",
        rating: 5,
        headline: "",
        content: "One of the most practical social media playbooks I've read. The tracking, conversion, and content measurement sections make it especially valuable.",
        likes: 74,
      },
      {
        id: "rev-4",
        name: "Elliot Graham",
        avatar: "",
        date: "September 28 2026",
        rating: 5,
        headline: "",
        content: "The biggest lesson for me was that 5,000 relevant views can be worth more than 500,000 random ones. Simple, actionable, and genuinely insightful.",
        likes: 50,
      },
    ];
  }

  if (slug === "how-to-get-rich-for-service-based-businesses-thank-me-later" || slug === "ai-businesses-19") {
    return [
      {
        id: "rev-1",
        name: "Mayank Jain",
        avatar: "",
        date: "August 25 2026",
        rating: 5,
        headline: "",
        content: "A fantastic breakdown of how to build a genuinely profitable service business. The costing and pricing frameworks make it clear why revenue alone doesn't tell the whole story.",
        likes: 83,
      },
      {
        id: "rev-2",
        name: "Rishabh",
        avatar: "",
        date: "September 01 2026",
        rating: 5,
        headline: "",
        content: "The pricing calculator, ideal customer framework, and sales process improvements are incredibly practical. This is the kind of playbook you can actually implement with your team.",
        likes: 77,
      },
      {
        id: "rev-3",
        name: "Irfan Ansari",
        avatar: "",
        date: "September 09 2026",
        rating: 5,
        headline: "",
        content: "Loved the emphasis on fixing margins before scaling demand. The 90-day roadmap gives the entire process a clear structure, from understanding costs to building repeatable acquisition.",
        likes: 72,
      },
      {
        id: "rev-4",
        name: "Shubham Tiwari",
        avatar: "",
        date: "September 18 2026",
        rating: 5,
        headline: "",
        content: "Packed with actionable business frameworks. Especially useful for founders who are too involved in sales and delivery and want to build a company that operates more systematically and profitably.",
        likes: 61,
      },
    ];
  }

  if (slug === "the-new-way-of-making-content-in-the-age-of-ai" || slug === "ai-businesses-20") {
    return [
      {
        id: "rev-1",
        name: "Blake Harrison",
        avatar: "",
        date: "August 23 2026",
        rating: 5,
        headline: "",
        content: "The proof-engine concept is brilliant. I especially liked how it connects customer delivery, demonstrations, and content creation into one repeatable system instead of treating content as a separate job.",
        likes: 87,
      },
      {
        id: "rev-2",
        name: "Vincent Howard",
        avatar: "",
        date: "September 05 2026",
        rating: 5,
        headline: "",
        content: "One of the most relevant content strategies for the AI era. The shift from simply creating content to demonstrating actual expertise is something every creator and founder should understand.",
        likes: 73,
      },
      {
        id: "rev-3",
        name: "Wesley Grant",
        avatar: "",
        date: "September 10 2026",
        rating: 5,
        headline: "",
        content: "Packed with practical ideas and genuinely useful AI prompts. The meeting-to-content workflow alone makes this playbook worth going through.",
        likes: 70,
      },
      {
        id: "rev-4",
        name: "Cameron Ellis",
        avatar: "",
        date: "September 25 2026",
        rating: 5,
        headline: "",
        content: "Finally, a content playbook that focuses on substance over vanity metrics. The frameworks for building credibility, showing real work, and capturing content naturally are excellent.",
        likes: 58,
      },
    ];
  }

  if (slug === "how-to-catch-up-in-life-using-logic" || slug === "ai-businesses-21") {
    return [
      {
        id: "rev-1",
        name: "Imran",
        avatar: "",
        date: "August 29 2026",
        rating: 5,
        headline: "",
        content: "A genuinely practical perspective on feeling behind in life. The idea of building capacity instead of waiting for the perfect opportunity completely changed how I think about progress.",
        likes: 93,
      },
      {
        id: "rev-2",
        name: "Deepak",
        avatar: "",
        date: "September 03 2026",
        rating: 5,
        headline: "",
        content: "Loved how everything connects—from financial discipline and skill-building to networking and building an audience. The 90-day plan makes it much easier to take action.",
        likes: 81,
      },
      {
        id: "rev-3",
        name: "Vivek",
        avatar: "",
        date: "September 11 2026",
        rating: 5,
        headline: "",
        content: "This is the kind of advice I wish I had followed earlier. Instead of chasing random opportunities, it teaches you to become someone who is actually prepared for them.",
        likes: 75,
      },
      {
        id: "rev-4",
        name: "Nikhil Reddy",
        avatar: "",
        date: "September 28 2026",
        rating: 5,
        headline: "",
        content: "The skill-stack framework, waitlist strategy, and capacity audit are especially useful. It's not just motivation—there are actual systems and exercises you can implement immediately.",
        likes: 62,
      },
    ];
  }

  if (slug === "what-makes-the-perfect-business-5-things" || slug === "ai-businesses-22") {
    return [
      {
        id: "rev-1",
        name: "Davide",
        avatar: "",
        date: "August 20 2026",
        rating: 5,
        headline: "",
        content: "This is such a powerful framework for evaluating business ideas. The five characteristics make it much easier to understand what separates a genuinely strong business from one that simply generates revenue.",
        likes: 110,
      },
      {
        id: "rev-2",
        name: "Miguel",
        avatar: "",
        date: "August 31 2026",
        rating: 5,
        headline: "",
        content: "I loved how practical this is. The sections on retention, gross margins, and competitive moats completely changed the way I think about choosing a business model.",
        likes: 97,
      },
      {
        id: "rev-3",
        name: "Akash Verma",
        avatar: "",
        date: "September 15 2026",
        rating: 5,
        headline: "",
        content: "More than just business theory. The scoring framework, financial formulas, and worksheets make it something you can actually use to evaluate real opportunities.",
        likes: 74,
      },
      {
        id: "rev-4",
        name: "Tanvir Hasan",
        avatar: "",
        date: "September 28 2026",
        rating: 5,
        headline: "",
        content: "The concept of building a business that becomes stronger over time really stood out to me. A great resource for founders who want sustainable economics instead of chasing revenue numbers.",
        likes: 56,
      },
    ];
  }

  if (slug === "how-to-use-ai-in-your-business-in-2026" || slug === "ai-businesses-23") {
    return [
      {
        id: "rev-1",
        name: "Daniel Tan",
        avatar: "",
        date: "May 17 2026",
        rating: 5,
        headline: "",
        content: "Finally, an AI business guide that focuses on actual business problems instead of hyping up random tools. The workflow-first approach makes so much sense.",
        likes: 140,
      },
      {
        id: "rev-2",
        name: "Ziad Faris",
        avatar: "",
        date: "June 20 2026",
        rating: 5,
        headline: "",
        content: "The section about training AI like a real employee was a game changer. I never thought about giving AI proper SOPs, examples, and quality standards before.",
        likes: 129,
      },
      {
        id: "rev-3",
        name: "Sai Charan",
        avatar: "",
        date: "July 14 2026",
        rating: 5,
        headline: "",
        content: "Very actionable and well structured. I especially liked the marketing, sales, and customer support workflows. The 30-day plan gives you a clear starting point.",
        likes: 97,
      },
      {
        id: "rev-4",
        name: "Deepak Kumar",
        avatar: "",
        date: "September 02 2026",
        rating: 5,
        headline: "",
        content: "What I liked most is the focus on measuring actual results. It explains how to use AI responsibly without blindly automating everything. Definitely worth reading.",
        likes: 60,
      },
    ];
  }

  if (slug === "if-you-have-multiple-interests-please-start-a-one-person-business" || slug === "ai-businesses-24") {
    return [
      {
        id: "rev-1",
        name: "Andrea",
        avatar: "",
        date: "August 14 2026",
        rating: 5,
        headline: "",
        content: "This completely changed how I look at having multiple interests. Instead of seeing them as distractions, I finally understand how to connect them into one clear business direction.",
        likes: 93,
      },
      {
        id: "rev-2",
        name: "João Silva",
        avatar: "",
        date: "September 25 2026",
        rating: 5,
        headline: "",
        content: "One of the most practical guides I've read about personal branding and building a business with AI. The prompts and 30-day plan make it easy to actually get started.",
        likes: 71,
      },
      {
        id: "rev-3",
        name: "Mateusz",
        avatar: "",
        date: "October 07 2026",
        rating: 5,
        headline: "",
        content: "I especially liked the sections on content systems and the six AI roles. It gives you a proper workflow instead of just telling you to post consistently and hope for the best.",
        likes: 67,
      },
      {
        id: "rev-4",
        name: "Marko",
        avatar: "",
        date: "October 22 2026",
        rating: 5,
        headline: "",
        content: "A great playbook for anyone who wants to build something independently. It connects branding, content, product creation, and distribution into one understandable system.",
        likes: 54,
      },
    ];
  }

  if (slug === "how-to-build-a-1m-one-person-business-faster-with-ai" || slug === "ai-businesses-26") {
    return [
      {
        id: "rev-1",
        name: "Pablo Sánchez",
        avatar: "",
        date: "August 18 2026",
        rating: 5,
        headline: "",
        content: "This is exactly the kind of practical guide I was looking for. It connects branding, content, offers, and AI into one clear business-building system instead of treating them as separate skills.",
        likes: 97,
      },
      {
        id: "rev-2",
        name: "Luca",
        avatar: "",
        date: "September 23 2026",
        rating: 5,
        headline: "",
        content: "The AI prompts alone are incredibly useful. I especially liked the sections on customer research and offer creation. It makes starting a business feel much more structured and less overwhelming.",
        likes: 75,
      },
      {
        id: "rev-3",
        name: "Jakub",
        avatar: "",
        date: "October 09 2026",
        rating: 5,
        headline: "",
        content: "What makes this playbook stand out is that it doesn't pretend AI will magically run your business. It teaches you how to use AI properly while keeping customer value and execution at the centre.",
        likes: 53,
      },
      {
        id: "rev-4",
        name: "Ivan",
        avatar: "",
        date: "October 21 2026",
        rating: 5,
        headline: "",
        content: "A genuinely solid resource for aspiring solo founders. The 30-day roadmap, landing-page frameworks, outreach templates, and weekly review checklists make it something you can actually put into action.",
        likes: 50,
      },
    ];
  }

  if (slug === "learn-this-skill-if-you-want-to-win-in-the-next-2-3-years" || slug === "ai-businesses-25") {
    return [
      {
        id: "rev-1",
        name: "Pablo Sánchez",
        avatar: "",
        date: "August 18 2026",
        rating: 5,
        headline: "",
        content: "One of the most practical guides I've read on understanding human behaviour. The three tensions and five levers made psychology much easier to apply to real situations.",
        likes: 97,
      },
      {
        id: "rev-2",
        name: "Luca",
        avatar: "",
        date: "September 23 2026",
        rating: 5,
        headline: "",
        content: "Really useful, especially for anyone interested in business, marketing, or entrepreneurship. It completely changed how I think about communicating value to people.",
        likes: 75,
      },
      {
        id: "rev-3",
        name: "Jakub",
        avatar: "",
        date: "October 09 2026",
        rating: 5,
        headline: "",
        content: "I loved how actionable this is. Instead of just explaining psychological concepts, it gives you exercises, examples, and a 30-day plan to actually develop the skill.",
        likes: 53,
      },
      {
        id: "rev-4",
        name: "Ivan",
        avatar: "",
        date: "October 21 2026",
        rating: 5,
        headline: "",
        content: "The ethical persuasion angle is what stood out to me. It teaches you to understand what people genuinely need instead of relying on cheap manipulation tactics. Definitely worth reading.",
        likes: 50,
      },
    ];
  }

  if (slug === "how-to-think-like-a-strategic-genius-5-dimensional-thinking" || slug === "ai-businesses-27") {
    return [
      {
        id: "rev-1",
        name: "Bram Jansen",
        avatar: "",
        date: "August 20 2026",
        rating: 5,
        headline: "",
        content: "One of the most interesting frameworks I've come across. The five dimensions gave me a completely different way to approach problems instead of jumping to the first explanation.",
        likes: 89,
      },
      {
        id: "rev-2",
        name: "Hugo",
        avatar: "",
        date: "September 25 2026",
        rating: 5,
        headline: "",
        content: "The four perspectives chapter alone is worth reading. I started applying it to business decisions and realised how many factors I was completely overlooking.",
        likes: 66,
      },
      {
        id: "rev-3",
        name: "Daan de Vries",
        avatar: "",
        date: "October 03 2026",
        rating: 5,
        headline: "",
        content: "I loved the distinction between knowing more and actually understanding more. It's a great reminder that collecting information doesn't automatically make you a better thinker.",
        likes: 59,
      },
      {
        id: "rev-4",
        name: "Javier Martínez",
        avatar: "",
        date: "October 18 2026",
        rating: 5,
        headline: "",
        content: "Not your typical motivational ebook. The historical thinking, identity, and systems perspectives make you question your own assumptions. The exercises make it practical too.",
        likes: 47,
      },
    ];
  }

  if (slug === "how-to-use-ai-better-than-99-of-people-this-changed-my-life" || slug === "ai-businesses-28") {
    return [
      {
        id: "rev-1",
        name: "Matthew",
        avatar: "",
        date: "August 31 2026",
        rating: 5,
        headline: "",
        content: "This completely changed how I approach AI. Instead of constantly rewriting prompts and hoping for good results, I now understand how to build a proper system around each task.",
        likes: 89,
      },
      {
        id: "rev-2",
        name: "Nathan",
        avatar: "",
        date: "September 26 2026",
        rating: 5,
        headline: "",
        content: "The four methods for teaching AI a task are incredibly useful. I especially liked the idea of extracting a process from expert material and turning it into a reusable prompt.",
        likes: 66,
      },
      {
        id: "rev-3",
        name: "Elliot",
        avatar: "",
        date: "October 17 2026",
        rating: 5,
        headline: "",
        content: "The thought partner and intellectual sparring partner sections are gold. I've started using AI to challenge my ideas instead of just agreeing with everything I say.",
        likes: 59,
      },
      {
        id: "rev-4",
        name: "Felix",
        avatar: "",
        date: "October 25 2026",
        rating: 5,
        headline: "",
        content: "Practical, detailed, and immediately useful. The YouTube workflow and business prompt library gave me a much clearer way to organise my AI workflows. Worth the read.",
        likes: 40,
      },
    ];
  }

  if (slug === "youre-stuck-in-the-matrix-heres-how-you-escape" || slug === "ai-businesses-29") {
    return [
      {
        id: "rev-1",
        name: "Connor",
        avatar: "",
        date: "August 19 2026",
        rating: 5,
        headline: "",
        content: "This made me question so many things I had accepted without thinking. The chapters on social conditioning and independent thinking really hit differently.",
        likes: 80,
      },
      {
        id: "rev-2",
        name: "Kyle",
        avatar: "",
        date: "September 30 2026",
        rating: 5,
        headline: "",
        content: "More than just motivation. I loved how it turns big ideas into actual exercises and a 90-day plan. Definitely made me rethink how I spend my time.",
        likes: 64,
      },
      {
        id: "rev-3",
        name: "Harry Clarke",
        avatar: "",
        date: "October 14 2026",
        rating: 5,
        headline: "",
        content: "The section about becoming high agency was my favourite. Instead of waiting for opportunities or permission, it pushes you to start solving problems yourself.",
        likes: 62,
      },
      {
        id: "rev-4",
        name: "Callum",
        avatar: "",
        date: "October 21 2026",
        rating: 5,
        headline: "",
        content: "A genuinely useful read. The ideas about self-directed learning, building your own vision, and creating value are things I wish I had started practising years ago.",
        likes: 45,
      },
    ];
  }

  if (slug === "you-have-5-years-to-get-rich-before-ai-takes-over" || slug === "ai-businesses-30") {
    return [
      {
        id: "rev-1",
        name: "Andrew Cooper",
        avatar: "",
        date: "August 30 2026",
        rating: 5,
        headline: "",
        content: "This genuinely changed how I think about AI and money. The focus on ownership instead of just earning a salary is something I hadn't considered deeply before.",
        likes: 80,
      },
      {
        id: "rev-2",
        name: "Nicholas",
        avatar: "",
        date: "September 28 2026",
        rating: 5,
        headline: "",
        content: "Loved the practical approach. The 90-day plan gives you something concrete to work on instead of just worrying about what AI might do to the future.",
        likes: 64,
      },
      {
        id: "rev-3",
        name: "Daniel Foster",
        avatar: "",
        date: "October 04 2026",
        rating: 5,
        headline: "",
        content: "A refreshing perspective. It explains why learning AI alone isn't enough and why understanding customers, building systems, and owning assets actually matter.",
        likes: 67,
      },
      {
        id: "rev-4",
        name: "Christopher",
        avatar: "",
        date: "October 01 2026",
        rating: 5,
        headline: "",
        content: "Very actionable and well organised. It helped me think beyond my current job and start planning for the long term.",
        likes: 58,
      },
    ];
  }

  if (slug === "investing-for-beginners-in-25-minutes" || slug === "ai-businesses-31") {
    return [
      {
        id: "rev-1",
        name: "Arjun Nair",
        avatar: "",
        date: "August 23 2026",
        rating: 5,
        headline: "",
        content: "Finally, an investing guide that explains things in a way beginners can actually understand. The portfolio and diversification sections were especially helpful.",
        likes: 75,
      },
      {
        id: "rev-2",
        name: "Rahul",
        avatar: "",
        date: "September 02 2026",
        rating: 5,
        headline: "",
        content: "Really well structured. I went from barely understanding ETFs and bonds to having a much clearer idea of how to approach long-term investing.",
        likes: 51,
      },
      {
        id: "rev-3",
        name: "Aditya",
        avatar: "",
        date: "October 09 2026",
        rating: 5,
        headline: "",
        content: "The best part is that it doesn't just tell you what to buy. It teaches you how to think about risk, research companies, and build a proper investment strategy.",
        likes: 58,
      },
      {
        id: "rev-4",
        name: "Karthik",
        avatar: "",
        date: "October 15 2026",
        rating: 5,
        headline: "",
        content: "A genuinely useful beginner's resource. The practical checklists and 30-day plan make it much easier to turn the knowledge into an actual routine.",
        likes: 42,
      },
    ];
  }

  if (slug === "laziest-ways-to-make-money-with-ai-for-beginners" || slug === "ai-businesses-32") {
    return [
      {
        id: "rev-1",
        name: "Maxime Leroy",
        avatar: "",
        date: "August 31 2026",
        rating: 5,
        headline: "",
        content: "Exactly what I was looking for. Instead of throwing random AI tools at me, it explains actual business models and how to get started with each one.",
        likes: 90,
      },
      {
        id: "rev-2",
        name: "Julien Dubois",
        avatar: "",
        date: "September 18 2026",
        rating: 5,
        headline: "",
        content: "Really useful breakdown. I especially liked the sections on finding clients, understanding costs, and turning an AI skill into something people will actually pay for.",
        likes: 51,
      },
      {
        id: "rev-3",
        name: "Tim Becker",
        avatar: "",
        date: "October 11 2026",
        rating: 5,
        headline: "",
        content: "The 30-day plan is my favourite part. It makes everything feel much more actionable instead of just reading about another online business idea.",
        likes: 58,
      },
      {
        id: "rev-4",
        name: "Lars Bakker",
        avatar: "",
        date: "October 19 2026",
        rating: 5,
        headline: "",
        content: "A solid beginner-friendly guide. It covers seven different opportunities without pretending they're effortless or guaranteed money. Very practical and well organised.",
        likes: 42,
      },
    ];
  }

  if (slug === "how-to-use-trading-212-in-2026-full-investing-guide" || slug === "ai-businesses-33") {
    return [
      {
        id: "rev-1",
        name: "Matthew Collins",
        avatar: "",
        date: "August 20 2026",
        rating: 5,
        headline: "",
        content: "I've always found investing confusing, especially when it comes to choosing funds and building a portfolio. This explained everything in a really simple and structured way.",
        likes: 73,
      },
      {
        id: "rev-2",
        name: "Nathan",
        avatar: "",
        date: "September 06 2026",
        rating: 5,
        headline: "",
        content: "The three-fund portfolio section was my favourite. I finally understand how diversification works and why you don't need dozens of different stocks to get started.",
        likes: 59,
      },
      {
        id: "rev-3",
        name: "Jordan",
        avatar: "",
        date: "October 10 2026",
        rating: 5,
        headline: "",
        content: "Really appreciate that this goes beyond explaining what investing is. It walks through account setup, order types, recurring contributions, and portfolio management. Very useful.",
        likes: 61,
      },
      {
        id: "rev-4",
        name: "Justin Parker",
        avatar: "",
        date: "October 22 2026",
        rating: 5,
        headline: "",
        content: "Loved the emphasis on consistency, patience, and avoiding emotional decisions. It helped me understand that building wealth is a long-term process, not about chasing quick profits.",
        likes: 50,
      },
    ];
  }

  if (slug === "7-side-hustles-students-can-start-in-2026" || slug === "ai-businesses-34") {
    return [
      {
        id: "rev-1",
        name: "Ethan Miller",
        avatar: "",
        date: "August 17 2026",
        rating: 5,
        headline: "",
        content: "I've gone through so many side hustle videos, but this actually puts everything together. Loved the breakdown of each business model and how to get started.",
        likes: 88,
      },
      {
        id: "rev-2",
        name: "Ryan",
        avatar: "",
        date: "September 04 2026",
        rating: 5,
        headline: "",
        content: "The 30-day plan is my favourite part. Instead of just reading about opportunities, you actually get a clear direction on what to do next.",
        likes: 68,
      },
      {
        id: "rev-3",
        name: "Brandon Wilson",
        avatar: "",
        date: "October 01 2026",
        rating: 5,
        headline: "",
        content: "I never really considered brand-deal brokerage or short-form content strategy before. The explanations made these business models surprisingly easy to understand.",
        likes: 76,
      },
      {
        id: "rev-4",
        name: "Tyler",
        avatar: "",
        date: "October 12 2026",
        rating: 5,
        headline: "",
        content: "Straightforward, well-organised, and genuinely useful. I especially appreciate the focus on understanding costs, finding customers, and testing ideas before spending money.",
        likes: 45,
      },
    ];
  }

  if (slug === "making-money-online-is-easy-actually-just-copy-me") {
    return [
      {
        id: "rev-1",
        name: "Praveen Gowda",
        avatar: "",
        date: "August 19 2026",
        rating: 5,
        headline: "",
        content: "This playbook breaks down the entire online business journey in a way that's easy to understand and actually follow. I especially loved the four-stage framework because it helped me identify where I was going wrong and what I needed to focus on next. Definitely worth reading!",
        likes: 82,
      },
      {
        id: "rev-2",
        name: "Abhinav Bhat",
        avatar: "",
        date: "September 14 2026",
        rating: 5,
        headline: "",
        content: "I've consumed so much online business content, but this playbook brings everything together in one place. From choosing a business model to understanding customers, creating content, and reinvesting profits, it covers the bigger picture. Practical, straightforward, and genuinely valuable.",
        likes: 78,
      },
      {
        id: "rev-3",
        name: "Harish Murthy",
        avatar: "",
        date: "October 15 2026",
        rating: 5,
        headline: "",
        content: "What I liked most is that it doesn't make starting an online business sound effortless or promise overnight success. It explains the process, highlights common mistakes, and gives you actionable checklists and templates. A great resource for anyone serious about building an online income stream.",
        likes: 67,
      },
      {
        id: "rev-4",
        name: "Shubham Jaiswal",
        avatar: "",
        date: "October 14 2026",
        rating: 5,
        headline: "",
        content: "The section on Shiny Object Syndrome really hit home! I used to jump between different business ideas without giving any of them enough attention. This playbook helped me understand the importance of consistency, customer research, and making decisions based on evidence. It's a fantastic guide for anyone ready to stop overthinking and start executing.",
        likes: 49,
      },
    ];
  }

  if (slug === "how-to-make-your-first-10-000-as-a-teen-stupid-simple") {
    return [
      {
        id: "rev-1",
        name: "Varun Choudhary",
        avatar: "",
        date: "October 10 2026",
        rating: 5,
        headline: "",
        content: "This playbook breaks down the entire process of making money from your skills into simple, actionable steps. I especially loved the four income engines and the skill pyramid. Instead of just talking about success, it shows you exactly what to focus on and how to get started. A must-read for anyone serious about building an income stream!",
        likes: 99,
      },
      {
        id: "rev-2",
        name: "Saurabh Tripathi",
        avatar: "",
        date: "October 14 2026",
        rating: 5,
        headline: "",
        content: "What makes this playbook stand out is that it doesn't stop at earning money. It teaches you how to find clients, position your services, build systems, manage cash flow, and eventually turn your income into wealth. The practical templates and 90-day roadmap make it incredibly useful. Definitely worth reading!",
        likes: 63,
      },
      {
        id: "rev-3",
        name: "Karthik Subramanian",
        avatar: "",
        date: "October 05 2026",
        rating: 5,
        headline: "",
        content: "I used to feel overwhelmed by all the different ways to make money online. This playbook helped me understand the options and choose a direction instead of jumping between random business ideas. The explanations are straightforward, the examples are relatable, and the action steps make everything feel achievable. A genuinely valuable resource!",
        likes: 59,
      },
      {
        id: "rev-4",
        name: "Arvind Krishnan",
        avatar: "",
        date: "October 22 2026",
        rating: 5,
        headline: "",
        content: "My biggest takeaway was learning that earning money is only the beginning. Building a valuable skill, creating a repeatable business, managing what you earn, and investing for the future are all connected. This playbook brings those ideas together beautifully. It's the kind of guide you'll want to revisit as you grow.",
        likes: 42,
      },
    ];
  }

  if (slug === "the-only-investing-video-youll-ever-need-start-with-100") {
    return [
      {
        id: "rev-1",
        name: "Brandon Walker",
        avatar: "",
        date: "September 05 2026",
        rating: 5,
        headline: "I've always wanted to start investing but never knew where to begin.",
        content: "I've always wanted to start investing but never knew where to begin. This playbook breaks everything down in such a simple and practical way. I finally understand the difference between stocks, REITs, crypto, gold, and index funds. A fantastic starting point!",
        likes: 90,
      },
      {
        id: "rev-2",
        name: "Connor Walsh",
        avatar: "",
        date: "September 13 2026",
        rating: 5,
        headline: "What I loved most is how this guide explains both the opportunities and risks of investing.",
        content: "What I loved most is how this guide explains both the opportunities and risks of investing. The $100 comparisons made everything easier to understand, and the worksheets are incredibly useful. Definitely worth reading!",
        likes: 78,
      },
      {
        id: "rev-3",
        name: "Nathaniel Price",
        avatar: "",
        date: "October 09, 2026",
        rating: 5,
        headline: "This is exactly the kind of investing guide I was looking for.",
        content: "This is exactly the kind of investing guide I was looking for. It's well-organised, beginner-friendly, and packed with valuable information. I especially enjoyed learning about diversification, compounding, and how to evaluate different investment options.",
        likes: 66,
      },
      {
        id: "rev-4",
        name: "Cameron Stewart",
        avatar: "",
        date: "October 16 2026",
        rating: 5,
        headline: "A brilliant resource for anyone looking to become more financially confident.",
        content: "A brilliant resource for anyone looking to become more financially confident. It doesn't just tell you what investments are; it teaches you how to think about risk, make informed decisions, and avoid common beginner mistakes. Practical, informative, and motivating!",
        likes: 43,
      },
    ];
  }

  if (slug === "7-proven-ways-to-make-money-with-ai-no-experience") {
    return [
      {
        id: "rev-1",
        name: "Jonathan Morris",
        avatar: "",
        date: "September 02 2026",
        rating: 5,
        headline: "I've been interested in making money with AI but never really knew where to start.",
        content: "I've been interested in making money with AI but never really knew where to start. This playbook breaks everything down into practical business opportunities that actually make sense. I especially love the client acquisition strategies and step-by-step launch plan. Definitely worth reading!",
        likes: 77,
      },
      {
        id: "rev-2",
        name: "Patrick Murphy",
        avatar: "",
        date: "September 01 2026",
        rating: 5,
        headline: "What I love most about this guide is that it focuses on selling real business solutions rather than just playing around with AI tools.",
        content: "What I love most about this guide is that it focuses on selling real business solutions rather than just playing around with AI tools. The six business models gave me several ideas I could realistically start exploring right away. Clear, actionable, and packed with value.",
        likes: 65,
      },
      {
        id: "rev-3",
        name: "Scott Reynolds",
        avatar: "",
        date: "October 12, 2026",
        rating: 5,
        headline: "So many AI guides talk about building the next big app or becoming a tech expert.",
        content: "So many AI guides talk about building the next big app or becoming a tech expert. This playbook takes a much more practical approach. It shows how to use tools that already exist to solve problems businesses are willing to pay for. The pricing, outreach examples, and recurring revenue strategies make it especially useful.",
        likes: 59,
      },
      {
        id: "rev-4",
        name: "Tyler Richardson",
        avatar: "",
        date: "October 17 2026",
        rating: 5,
        headline: "This guide connects all the dots, from choosing a profitable service and finding potential clients to delivering quality work and building monthly retainers.",
        content: "This guide connects all the dots, from choosing a profitable service and finding potential clients to delivering quality work and building monthly retainers. The templates and 30-day action plan are excellent additions. If you're serious about turning AI skills into a service business, this is a great place to start.",
        likes: 43,
      },
    ];
  }

  if (slug === "how-to-actually-lock-in-no-bullsh-t-guide") {
    return [
      {
        id: "rev-1",
        name: "Matthew Parker",
        avatar: "",
        date: "September 06 2026",
        rating: 5,
        headline: "I've read countless productivity guides, but this one actually breaks everything down into actionable steps.",
        content: "I've read countless productivity guides, but this one actually breaks everything down into actionable steps. The three-cut principle and daily scorecard made it so much easier to identify where my time was going. Simple, direct, and genuinely useful.",
        likes: 87,
      },
      {
        id: "rev-2",
        name: "Christopher Reed",
        avatar: "",
        date: "September 13 2026",
        rating: 5,
        headline: "This playbook completely changed how I look at discipline and focus.",
        content: "This playbook completely changed how I look at discipline and focus. I especially loved the idea of a 90-day season because it gives you a clear direction without feeling overwhelming. It's not about doing everything; it's about doing what matters. Highly recommend!",
        likes: 52,
      },
      {
        id: "rev-3",
        name: "Benjamin Cooper",
        avatar: "",
        date: "October 10, 2026",
        rating: 5,
        headline: "What I appreciate most is how practical this is.",
        content: "What I appreciate most is how practical this is. Instead of throwing random motivational quotes at you, it gives you an actual system to follow. The worksheets, habit tracking, and weekly reviews make it easy to stay accountable. A great resource for anyone serious about personal growth.",
        likes: 49,
      },
      {
        id: "rev-4",
        name: "Andrew Phillips",
        avatar: "",
        date: "September 27 2026",
        rating: 5,
        headline: "This made me realise how much of my day was being wasted on things that weren't moving me forward.",
        content: "This made me realise how much of my day was being wasted on things that weren't moving me forward. The sections on distractions, delayed gratification, and building self-trust really stood out. If you're ready to stop making excuses and start taking your goals seriously, this is worth reading.",
        likes: 53,
      },
    ];
  }

  if (slug === "18-years-of-ugly-business-advice-in-19-minutes") {
    return [
      {
        id: "rev-1",
        name: "Thomas Fischer",
        avatar: "",
        date: "September 01 2026",
        rating: 5,
        headline: "An incredibly insightful playbook that goes beyond the usual business advice. I especially appreciated the focus on personal growth, strategic thinking, and building a business that lasts. The practical exercises make it easy to put the lessons into action.",
        content: "An incredibly insightful playbook that goes beyond the usual business advice. I especially appreciated the focus on personal growth, strategic thinking, and building a business that lasts. The practical exercises make it easy to put the lessons into action.",
        likes: 93,
      },
      {
        id: "rev-2",
        name: "Jakob Hoffmann",
        avatar: "",
        date: "September 07 2026",
        rating: 5,
        headline: "What I loved most about this playbook is how it breaks down complex entrepreneurial decisions into simple, manageable steps. The sections on cash flow, equity, and customer validation are particularly valuable. A great resource for anyone serious about building a sustainable business.",
        content: "What I loved most about this playbook is how it breaks down complex entrepreneurial decisions into simple, manageable steps. The sections on cash flow, equity, and customer validation are particularly valuable. A great resource for anyone serious about building a sustainable business.",
        likes: 81,
      },
      {
        id: "rev-3",
        name: "Lukas Hartmann",
        avatar: "",
        date: "October 04, 2026",
        rating: 5,
        headline: "This playbook completely changed how I think about business growth. It highlights the importance of evolving as a founder while making thoughtful decisions about the business itself. The 90-day action plan is an excellent way to turn insights into meaningful progress.",
        content: "This playbook completely changed how I think about business growth. It highlights the importance of evolving as a founder while making thoughtful decisions about the business itself. The 90-day action plan is an excellent way to turn insights into meaningful progress.",
        likes: 66,
      },
      {
        id: "rev-4",
        name: "Matthias Braun",
        avatar: "",
        date: "September 21 2026",
        rating: 5,
        headline: "A well-structured and refreshing guide that addresses the realities of entrepreneurship, not just the success stories. I found the emphasis on sustainable growth, ownership, and finding meaningful work especially powerful. Definitely a resource worth revisiting at every stage of the entrepreneurial journey.",
        content: "A well-structured and refreshing guide that addresses the realities of entrepreneurship, not just the success stories. I found the emphasis on sustainable growth, ownership, and finding meaningful work especially powerful. Definitely a resource worth revisiting at every stage of the entrepreneurial journey.",
        likes: 53,
      },
    ];
  }

  if (slug === "want-to-made-god-tier-money-use-this-sales-tactic-made-me-10m") {
    return [
      {
        id: "rev-1",
        name: "Theo Martin",
        avatar: "",
        date: "September 10 2026",
        rating: 5,
        headline: "This playbook completely changed how I approach sales conversations. Instead of jumping straight into pitching, I now focus on understanding the customer's actual challenges. The discovery questions and call structure are especially useful. A great resource for anyone looking to improve their sales process.",
        content: "This playbook completely changed how I approach sales conversations. Instead of jumping straight into pitching, I now focus on understanding the customer's actual challenges. The discovery questions and call structure are especially useful. A great resource for anyone looking to improve their sales process.",
        likes: 79,
      },
      {
        id: "rev-2",
        name: "Dylan Hayes",
        avatar: "",
        date: "September 05 2026",
        rating: 5,
        headline: "I really appreciate how this playbook breaks down the entire sales journey into manageable steps. The sections on qualifying leads, demonstrating value, and handling objections are particularly helpful. It provides a clear framework that makes sales conversations more natural, focused, and productive.",
        content: "I really appreciate how this playbook breaks down the entire sales journey into manageable steps. The sections on qualifying leads, demonstrating value, and handling objections are particularly helpful. It provides a clear framework that makes sales conversations more natural, focused, and productive.",
        likes: 61,
      },
      {
        id: "rev-3",
        name: "Matteo Rossi",
        avatar: "",
        date: "October 09, 2026",
        rating: 5,
        headline: "What makes this playbook stand out is its emphasis on solving real customer problems rather than pushing products. The value calculation examples, discovery worksheets, and practical scripts make it easy to put the concepts into action. It's an excellent guide for building a more thoughtful and effective sales strategy.",
        content: "What makes this playbook stand out is its emphasis on solving real customer problems rather than pushing products. The value calculation examples, discovery worksheets, and practical scripts make it easy to put the concepts into action. It's an excellent guide for building a more thoughtful and effective sales strategy.",
        likes: 56,
      },
      {
        id: "rev-4",
        name: "Leo Andersson",
        avatar: "",
        date: "August 31 2026",
        rating: 5,
        headline: "A well-organised resource that covers everything from the first sales conversation to customer onboarding. I especially liked the focus on demonstrating relevant solutions, setting realistic expectations, and building trust. It offers practical advice that both new and experienced sales professionals can apply to their daily work.",
        content: "A well-organised resource that covers everything from the first sales conversation to customer onboarding. I especially liked the focus on demonstrating relevant solutions, setting realistic expectations, and building trust. It offers practical advice that both new and experienced sales professionals can apply to their daily work.",
        likes: 73,
      },
    ];
  }

  if (slug === "there-are-only-3-types-of-profitable-businesses-pick-one") {
    return [
      {
        id: "rev-1",
        name: "Oliver Bennett",
        avatar: "",
        date: "September 01 2026",
        rating: 5,
        headline: "An incredibly useful guide for anyone trying to figure out what they actually want from their business. I especially liked how it breaks down the differences between scaling, lifestyle, and exit strategies. The practical checklists make it much easier to put the ideas into action.",
        content: "An incredibly useful guide for anyone trying to figure out what they actually want from their business. I especially liked how it breaks down the differences between scaling, lifestyle, and exit strategies. The practical checklists make it much easier to put the ideas into action.",
        likes: 84,
      },
      {
        id: "rev-2",
        name: "Adrian Costa",
        avatar: "",
        date: "September 09 2026",
        rating: 5,
        headline: "What I appreciated most was the focus on building a business around the life you want. The lifestyle business section gave me a fresh perspective on profitability, delegation, and managing my time. A very practical and insightful read.",
        content: "What I appreciated most was the focus on building a business around the life you want. The lifestyle business section gave me a fresh perspective on profitability, delegation, and managing my time. A very practical and insightful read.",
        likes: 71,
      },
      {
        id: "rev-3",
        name: "Nathaniel Brooks",
        avatar: "",
        date: "October 04, 2026",
        rating: 5,
        headline: "This playbook connects business strategy with real-world execution exceptionally well. The sections on product-market fit, recurring revenue, and exit readiness are particularly valuable. It offers a clear framework for making better long-term decisions.",
        content: "This playbook connects business strategy with real-world execution exceptionally well. The sections on product-market fit, recurring revenue, and exit readiness are particularly valuable. It offers a clear framework for making better long-term decisions.",
        likes: 50,
      },
      {
        id: "rev-4",
        name: "Luca Moretti",
        avatar: "",
        date: "September 25 2026",
        rating: 5,
        headline: "A well-structured and actionable resource for entrepreneurs. I loved the templates, financial reviews, and 30-day implementation plan. Instead of simply talking about wealth creation, it explains the decisions and systems needed to build a business with a clear purpose.",
        content: "A well-structured and actionable resource for entrepreneurs. I loved the templates, financial reviews, and 30-day implementation plan. Instead of simply talking about wealth creation, it explains the decisions and systems needed to build a business with a clear purpose.",
        likes: 63,
      },
    ];
  }

  if (slug === "if-you-dont-understand-leadership-youll-never-win") {
    return [
      {
        id: "rev-1",
        name: "Mike Fishbein",
        avatar: "",
        date: "September 03 2026",
        rating: 5,
        headline: "A very practical guide to leadership. I particularly liked the sections on delegation and communication. The frameworks make it easier to understand where leadership often goes wrong and how to improve.",
        content: "A very practical guide to leadership. I particularly liked the sections on delegation and communication. The frameworks make it easier to understand where leadership often goes wrong and how to improve.",
        likes: 69,
      },
      {
        id: "rev-2",
        name: "Sidd Chauhan",
        avatar: "",
        date: "September 14 2026",
        rating: 5,
        headline: "This playbook offers a refreshing approach to managing people and building teams. The hiring and performance management chapters were especially useful. A valuable resource for anyone managing a growing business.",
        content: "This playbook offers a refreshing approach to managing people and building teams. The hiring and performance management chapters were especially useful. A valuable resource for anyone managing a growing business.",
        likes: 55,
      },
      {
        id: "rev-3",
        name: "Richelle Delia",
        avatar: "",
        date: "October 11, 2026",
        rating: 5,
        headline: "What I enjoyed most was how actionable everything is. The templates, checklists, and practical examples make it much more than just another leadership book. It genuinely helps you rethink how to run a team.",
        content: "What I enjoyed most was how actionable everything is. The templates, checklists, and practical examples make it much more than just another leadership book. It genuinely helps you rethink how to run a team.",
        likes: 41,
      },
      {
        id: "rev-4",
        name: "Mark Hinkle",
        avatar: "",
        date: "September 29 2026",
        rating: 5,
        headline: "An insightful and well-structured playbook for business owners who want to move beyond managing daily tasks. The focus on accountability, employee development, and building independent systems makes it particularly worthwhile.",
        content: "An insightful and well-structured playbook for business owners who want to move beyond managing daily tasks. The focus on accountability, employee development, and building independent systems makes it particularly worthwhile.",
        likes: 38,
      },
    ];
  }

  if (slug === "i-built-a-business-with-ai-in-24-hours") {
    return [
      {
        id: "rev-1",
        name: "Nikhil",
        avatar: "",
        date: "September 09 2026",
        rating: 5,
        headline: "A really helpful playbook for anyone starting from zero. The step-by-step approach makes business building feel much less overwhelming. I particularly liked the practical AI prompts and branding strategies.",
        content: "A really helpful playbook for anyone starting from zero. The step-by-step approach makes business building feel much less overwhelming. I particularly liked the practical AI prompts and branding strategies.",
        likes: 88,
      },
      {
        id: "rev-2",
        name: "Vihaan",
        avatar: "",
        date: "September 19 2026",
        rating: 5,
        headline: "I always wanted to start something of my own but never knew where to begin. This playbook breaks everything down into manageable steps. The AI tool recommendations and customer research sections were especially helpful.",
        content: "I always wanted to start something of my own but never knew where to begin. This playbook breaks everything down into manageable steps. The AI tool recommendations and customer research sections were especially helpful.",
        likes: 65,
      },
      {
        id: "rev-3",
        name: "Sana Chatterjee",
        avatar: "",
        date: "October 08, 2026",
        rating: 5,
        headline: "Dense, highly technical yet completely accessible. The decision frameworks and worked examples make execution feel inevitable if you put in the hours. Highly recommend printing or keeping the reference charts close by.",
        content: "Dense, highly technical yet completely accessible. The decision frameworks and worked examples make execution feel inevitable if you put in the hours. Highly recommend printing or keeping the reference charts close by.",
        likes: 33,
      },
      {
        id: "rev-4",
        name: "Tara Srinivasan",
        avatar: "",
        date: "September 21 2026",
        rating: 5,
        headline: "A great resource for aspiring entrepreneurs. Everything is explained in a structured way, and the implementation checklist makes it easy to turn the concepts into action. Very useful and practical.",
        content: "A great resource for aspiring entrepreneurs. Everything is explained in a structured way, and the implementation checklist makes it easy to turn the concepts into action. Very useful and practical.",
        likes: 46,
      },
    ];
  }

  if (slug === "copy-paste-this-strategy-to-make-your-first-5-000-online") {
    return [
      {
        id: "rev-1",
        name: "Nico",
        avatar: "",
        date: "September 19 2026",
        rating: 5,
        headline: "A genuinely useful guide for anyone looking to start a newsletter business. I particularly liked how it breaks down audience building, product creation, and monetisation into manageable steps. The 30-day plan makes it much easier to take action instead of getting stuck planning.",
        content: "A genuinely useful guide for anyone looking to start a newsletter business. I particularly liked how it breaks down audience building, product creation, and monetisation into manageable steps. The 30-day plan makes it much easier to take action instead of getting stuck planning.",
        likes: 78,
      },
      {
        id: "rev-2",
        name: "Kathy Reagan Young",
        avatar: "",
        date: "September 30 2026",
        rating: 5,
        headline: "What I appreciated most about this playbook is its practical approach. It doesn't just focus on getting subscribers but explains how to turn an audience into actual customers. The product development and pricing chapters were especially helpful. Definitely worth reading.",
        content: "What I appreciated most about this playbook is its practical approach. It doesn't just focus on getting subscribers but explains how to turn an audience into actual customers. The product development and pricing chapters were especially helpful. Definitely worth reading.",
        likes: 63,
      },
      {
        id: "rev-3",
        name: "Chris Daughtrey",
        avatar: "",
        date: "September 21, 2026",
        rating: 5,
        headline: "This playbook gave me a much clearer understanding of how a newsletter can become a real business. The frameworks are straightforward, the examples are easy to follow, and the checklists make implementation simple. A great resource for creators and independent professionals.",
        content: "This playbook gave me a much clearer understanding of how a newsletter can become a real business. The frameworks are straightforward, the examples are easy to follow, and the checklists make implementation simple. A great resource for creators and independent professionals.",
        likes: 41,
      },
      {
        id: "rev-4",
        name: "Adam Gower",
        avatar: "",
        date: "October 01 2026",
        rating: 5,
        headline: "An excellent resource for anyone who wants to monetise their knowledge without building a complicated business from day one. I found the audience research, email strategy, and product launch sections particularly valuable. It provides a clear direction and a realistic starting point.",
        content: "An excellent resource for anyone who wants to monetise their knowledge without building a complicated business from day one. I found the audience research, email strategy, and product launch sections particularly valuable. It provides a clear direction and a realistic starting point.",
        likes: 31,
      },
    ];
  }

  if (slug === "7-remote-jobs-you-can-do-from-home") {
    return [
      {
        id: "rev-1",
        name: "Varun Chawla",
        avatar: "",
        date: "September 15 2026",
        rating: 5,
        headline: "A genuinely helpful guide for anyone looking to earn from home. I loved how it breaks down different opportunities and explains exactly where to begin. The practical checklists make everything feel achievable.",
        content: "A genuinely helpful guide for anyone looking to earn from home. I loved how it breaks down different opportunities and explains exactly where to begin. The practical checklists make everything feel achievable.",
        likes: 83,
      },
      {
        id: "rev-2",
        name: "Sakshi Pillai",
        avatar: "",
        date: "September 07 2026",
        rating: 5,
        headline: "What I enjoyed most is the variety of side hustles covered. It helped me understand which options match my skills and available time. The step-by-step approach makes getting started much less overwhelming.",
        content: "What I enjoyed most is the variety of side hustles covered. It helped me understand which options match my skills and available time. The step-by-step approach makes getting started much less overwhelming.",
        likes: 60,
      },
      {
        id: "rev-3",
        name: "Ishita Menon",
        avatar: "",
        date: "September 23, 2026",
        rating: 5,
        headline: "An excellent resource for beginners! The explanations are straightforward, practical, and easy to follow. I especially liked the 30-day plan because it gives you a clear direction instead of leaving you wondering what to do next.",
        content: "An excellent resource for beginners! The explanations are straightforward, practical, and easy to follow. I especially liked the 30-day plan because it gives you a clear direction instead of leaving you wondering what to do next.",
        likes: 44,
      },
      {
        id: "rev-4",
        name: "Nikhil Sethi",
        avatar: "",
        date: "October 04 2026",
        rating: 5,
        headline: "This playbook offers a refreshing look at making money online without unrealistic promises. The different business models, practical tips, and launch checklists make it a valuable guide for anyone wanting to build an additional income stream.",
        content: "This playbook offers a refreshing look at making money online without unrealistic promises. The different business models, practical tips, and launch checklists make it a valuable guide for anyone wanting to build an additional income stream.",
        likes: 39,
      },
    ];
  }

  if (slug === "i-asked-ai-to-make-me-as-much-money-as-possible") {
    return [
      {
        id: "rev-1",
        name: "Siddharth Rao",
        avatar: "",
        date: "September 17 2026",
        rating: 5,
        headline: "I really liked how this playbook breaks down the entire resale process. The AI prompts and sourcing strategies make it much easier to understand how to get started without feeling overwhelmed. A very useful business guide.",
        content: "I really liked how this playbook breaks down the entire resale process. The AI prompts and sourcing strategies make it much easier to understand how to get started without feeling overwhelmed. A very useful business guide.",
        likes: 73,
      },
      {
        id: "rev-2",
        name: "Devika Nair",
        avatar: "",
        date: "September 11 2026",
        rating: 5,
        headline: "This is a refreshing take on starting a small business with AI. I especially liked the sections on product research, pricing, and automating repetitive tasks. It provides practical ideas that can actually be implemented.",
        content: "This is a refreshing take on starting a small business with AI. I especially liked the sections on product research, pricing, and automating repetitive tasks. It provides practical ideas that can actually be implemented.",
        likes: 59,
      },
      {
        id: "rev-3",
        name: "Nisha Bhatia",
        avatar: "",
        date: "September 28, 2026",
        rating: 5,
        headline: "The playbook covers everything from finding products to completing a sale. The profit calculations, checklists, and seven-day launch plan make it particularly valuable. I appreciate the realistic approach to risks and business growth.",
        content: "The playbook covers everything from finding products to completing a sale. The profit calculations, checklists, and seven-day launch plan make it particularly valuable. I appreciate the realistic approach to risks and business growth.",
        likes: 47,
      },
      {
        id: "rev-4",
        name: "Arjun Deshmukh",
        avatar: "",
        date: "September 22 2026",
        rating: 5,
        headline: "A well-organised guide with plenty of actionable information. The idea of using separate AI assistants for sourcing, valuation, logistics, and listings is especially interesting. It has given me a much clearer picture of how to build a repeatable resale operation.",
        content: "A well-organised guide with plenty of actionable information. The idea of using separate AI assistants for sourcing, valuation, logistics, and listings is especially interesting. It has given me a much clearer picture of how to build a repeatable resale operation.",
        likes: 40,
      },
    ];
  }

  if (slug === "these-are-the-best-business-books-to-read-7-billionaire-books") {
    return [
      {
        id: "rev-1",
        name: "Ananya Kulkarni",
        avatar: "",
        date: "August 14 2026",
        rating: 5,
        headline: "A very practical and insightful playbook. I liked how it brings together lessons from different business leaders and turns them into actionable principles. The 30-day implementation plan makes it especially useful.",
        content: "A very practical and insightful playbook. I liked how it brings together lessons from different business leaders and turns them into actionable principles. The 30-day implementation plan makes it especially useful.",
        likes: 81,
      },
      {
        id: "rev-2",
        name: "Rohan Malhotra",
        avatar: "",
        date: "September 02 2026",
        rating: 5,
        headline: "An excellent resource for anyone interested in entrepreneurship and building a successful business. The chapters offer valuable perspectives on leadership, customer relationships, decision-making, and investing. Easy to follow and full of useful takeaways.",
        content: "An excellent resource for anyone interested in entrepreneurship and building a successful business. The chapters offer valuable perspectives on leadership, customer relationships, decision-making, and investing. Easy to follow and full of useful takeaways.",
        likes: 68,
      },
      {
        id: "rev-3",
        name: "Kunal Deshmukh",
        avatar: "",
        date: "October 07, 2026",
        rating: 5,
        headline: "A well-structured collection of business insights. The emphasis on customer obsession, disciplined thinking, operational excellence, and managing risk makes this a valuable read. I especially appreciated the final checklist for putting the lessons into practice.",
        content: "A well-structured collection of business insights. The emphasis on customer obsession, disciplined thinking, operational excellence, and managing risk makes this a valuable read. I especially appreciated the final checklist for putting the lessons into practice.",
        likes: 42,
      },
      {
        id: "rev-4",
        name: "Meera Iyer",
        avatar: "",
        date: "September 20 2026",
        rating: 5,
        headline: "What I enjoyed most was the practical approach. Instead of simply discussing the achievements of successful entrepreneurs, the playbook explains the thinking behind their decisions and how we can apply those lessons in our own professional journeys.",
        content: "What I enjoyed most was the practical approach. Instead of simply discussing the achievements of successful entrepreneurs, the playbook explains the thinking behind their decisions and how we can apply those lessons in our own professional journeys.",
        likes: 30,
      },
    ];
  }

  if (slug === "master-higgsfield-ai-in-20-minutes-beginner-tutorial") {
    return [
      {
        id: "rev-1",
        name: "Matteo Ricci",
        avatar: "",
        date: "August 14, 2026",
        rating: 5,
        headline: "An excellent and well-organised playbook! It breaks down Higgsfield AI's features in a way that's easy to understand, even for beginners. I especially loved the practical prompt templates and Cinema Studio workflows. Definitely worth reading!",
        content: "An excellent and well-organised playbook! It breaks down Higgsfield AI's features in a way that's easy to understand, even for beginners. I especially loved the practical prompt templates and Cinema Studio workflows. Definitely worth reading!",
        likes: 59,
      },
      {
        id: "rev-2",
        name: "Freya Collins",
        avatar: "",
        date: "September 18, 2026",
        rating: 5,
        headline: "Absolutely fantastic guide! I learned so much about AI image generation, cinematic videos, and voiceovers. The step-by-step explanations make it much easier to turn creative ideas into complete projects. Highly recommended!",
        content: "Absolutely fantastic guide! I learned so much about AI image generation, cinematic videos, and voiceovers. The step-by-step explanations make it much easier to turn creative ideas into complete projects. Highly recommended!",
        likes: 36,
      },
      {
        id: "rev-3",
        name: "Daniel Weber",
        avatar: "",
        date: "September 02, 2026",
        rating: 5,
        headline: "What I appreciate most is the practical approach. Rather than just explaining the tools, the playbook shows how to bring them together into a complete production workflow. The credit management advice and final checklist are valuable additions.",
        content: "What I appreciate most is the practical approach. Rather than just explaining the tools, the playbook shows how to bring them together into a complete production workflow. The credit management advice and final checklist are valuable additions.",
        likes: 45,
      },
      {
        id: "rev-4",
        name: "Amara Williams",
        avatar: "",
        date: "August 15, 2026",
        rating: 5,
        headline: "Really impressed with this playbook! Everything is explained clearly, and the practical workflows make Higgsfield feel much less overwhelming. It's a fantastic resource for creators who want to take their visual content to the next level.",
        content: "Really impressed with this playbook! Everything is explained clearly, and the practical workflows make Higgsfield feel much less overwhelming. It's a fantastic resource for creators who want to take their visual content to the next level.",
        likes: 75,
      },
    ];
  }

  if (slug === "my-honest-advice-to-someone-who-wants-to-get-rich") {
    return [
      {
        id: "rev-1",
        name: "Rohan Mehta",
        avatar: "",
        date: "October 18, 2026",
        rating: 5,
        headline: "A genuinely inspiring and practical playbook! I loved how it explains the importance of starting early, developing valuable skills, and making smart financial decisions. The 90-day plan makes everything feel achievable. Highly recommended!",
        content: "A genuinely inspiring and practical playbook! I loved how it explains the importance of starting early, developing valuable skills, and making smart financial decisions. The 90-day plan makes everything feel achievable. Highly recommended!",
        likes: 28,
      },
      {
        id: "rev-2",
        name: "Clara Bennett",
        avatar: "",
        date: "September 18, 2026",
        rating: 5,
        headline: "Excellent guide for anyone serious about building long-term wealth! The chapters are well organised, easy to understand, and full of valuable lessons. A great reminder that small steps taken today can create amazing opportunities in the future.",
        content: "Excellent guide for anyone serious about building long-term wealth! The chapters are well organised, easy to understand, and full of valuable lessons. A great reminder that small steps taken today can create amazing opportunities in the future.",
        likes: 61,
      },
      {
        id: "rev-3",
        name: "Arjun Nair",
        avatar: "",
        date: "October 01, 2026",
        rating: 5,
        headline: "This playbook completely changed how I think about personal growth and financial success. The focus on skill development, consistency, and calculated risks is especially valuable. Definitely a resource worth revisiting!",
        content: "This playbook completely changed how I think about personal growth and financial success. The focus on skill development, consistency, and calculated risks is especially valuable. Definitely a resource worth revisiting!",
        likes: 43,
      },
      {
        id: "rev-4",
        name: "Elise Laurent",
        avatar: "",
        date: "August 11, 2026",
        rating: 5,
        headline: "Such a motivating and insightful read! I particularly enjoyed the practical advice on turning small achievements into bigger opportunities. It offers a clear direction for young people who want to build a better financial future.",
        content: "Such a motivating and insightful read! I particularly enjoyed the practical advice on turning small achievements into bigger opportunities. It offers a clear direction for young people who want to build a better financial future.",
        likes: 89,
      },
    ];
  }

  if (slug === "the-30k-month-al-faceless-shorts-method-nobodys-talking-about") {
    return [
      {
        id: "rev-1",
        name: "Zayden Okafor",
        avatar: "",
        date: "October 21, 2026",
        rating: 5,
        headline: "An incredible playbook! Everything is explained perfectly, and the workflow makes starting a faceless YouTube Shorts channel feel achievable. Definitely worth reading!",
        content: "An incredible playbook! Everything is explained perfectly, and the workflow makes starting a faceless YouTube Shorts channel feel achievable. Definitely worth reading!",
        likes: 35,
      },
      {
        id: "rev-2",
        name: "Adrian",
        avatar: "",
        date: "September 30, 2026",
        rating: 5,
        headline: "Absolutely loved this guide! The Claude, VidIQ, and RankReel combination is brilliant, and the step-by-step instructions make the entire process so much easier. Highly recommended!",
        content: "Absolutely loved this guide! The Claude, VidIQ, and RankReel combination is brilliant, and the step-by-step instructions make the entire process so much easier. Highly recommended!",
        likes: 60,
      },
      {
        id: "rev-3",
        name: "Emilia",
        avatar: "",
        date: "October 08, 2026",
        rating: 5,
        headline: "One of the most practical guides I've come across! Packed with useful strategies, amazing tools, and actionable ideas. A fantastic resource for anyone starting their YouTube journey!",
        content: "One of the most practical guides I've come across! Packed with useful strategies, amazing tools, and actionable ideas. A fantastic resource for anyone starting their YouTube journey!",
        likes: 43,
      },
      {
        id: "rev-4",
        name: "Thiago Moretti",
        avatar: "",
        date: "October 1, 2026",
        rating: 5,
        headline: "Outstanding playbook! I love how everything is organised into simple steps, making content research and video creation much less overwhelming. This is genuinely inspiring!",
        content: "Outstanding playbook! I love how everything is organised into simple steps, making content research and video creation much less overwhelming. This is genuinely inspiring!",
        likes: 20,
      },
    ];
  }

  if (slug === "how-to-build-10k-websites-in-minutes-claude-ai") {
    return [
      {
        id: "rev-1",
        name: "Jose Vidal",
        avatar: "",
        date: "October 14, 2026",
        rating: 5,
        headline: "The rare AI playbook with zero filler — pure tactical signal.",
        content: "The rare AI playbook with zero filler — pure tactical signal. I absolutely love this playbook, you cannot find this anywhere else but on Plugd Playbooks bc the instagram scammers are everywhere trying to sell you fake tips",
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
        content: "Extremely deep and practical. Dense with actionable insights. You answered all of the questions I didn't know I had until reading this. This is a FANTASTIC RESOURCE!!",
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
      headline: "The rare AI playbook with zero filler — pure tactical signal.",
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
