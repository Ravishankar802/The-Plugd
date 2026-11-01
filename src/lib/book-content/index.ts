export interface WebBookPage {
  pageNumber: number;
  type: "cover" | "half-title" | "title" | "copyright" | "toc" | "chapter-start" | "content";
  chapterTitle?: string;
  partTitle?: string;
  header?: string;
  imageUrl?: string;
  isCover?: boolean;
  isFrontMatter?: boolean;
  content: string[];
}

export async function getBookPages(_courseSlug: string): Promise<WebBookPage[]> {
  return [];
}

export const ALL_BOOK_SLUGS = new Set([
  "i-sell-pdfs-with-ai-and-it-changed-my-life-revealing-everything",
  "7-side-hustles-students-can-start-in-2027",
  "ai-businesses-57",
  "3-best-ai-businesses-to-start-before-2027-and-the-one-id-start-today",
  "ai-businesses-59",
  "5-simple-apps-making-10-000-month-that-you-can-build-with-ai",
  "ai-businesses-60",
  "if-youre-in-your-20s-heres-how-to-win-at-anything",
  "ai-businesses-55",
  "the-smartest-way-to-capitalize-on-the-ai-gold-rush",
  "ai-businesses-56",
  "if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m",
  "ai-businesses-53",
  "if-i-wanted-to-become-a-millionaire-in-2026-this-is-what-id-do-full-blueprint",
  "ai-businesses-54",
  "7-ai-automations",
  "side-hustles",
  "give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge",
  "give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge",
  "5-proven-ways-to-make-money-with-ai-no-experience",
  "the-best-ai-side-hustles-to-start-in-2026-no-skills",
  "copy-paste-this-strategy-to-make-13k-month-with-ai-in-2026",
  "build-a-one-person-business-as-a-beginner-from-0-to-10k",
  "laziest-way-to-make-money-online-in-2026-500-day",
  "the-blueprint-to-go-from-0-to-1000000",
  "your-first-1m-is-simple-heres-how",
  "the-5-money-principles-that-will-make-anyone-rich-in-their-20s",
  "its-boring-but-will-make-even-beginners-millionaires-in-2026",
  "i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business",
  "the-4-levels-to-getting-rich-in-2026",
  "the-a-i-revolution-8-ways-to-get-rich",
  "how-i-turned-300-to-100-000-at-19-my-side-hustles",
  "how-to-become-rich-with-social-media-my-exact-playbook",
  "how-to-get-rich-for-service-based-businesses-thank-me-later",
  "the-new-way-of-making-content-in-the-age-of-ai",
  "how-to-catch-up-in-life-using-logic",
  "what-makes-the-perfect-business-5-things",
  "how-to-use-ai-in-your-business-in-2026",
  "if-you-have-multiple-interests-please-start-a-one-person-business",
  "learn-this-skill-if-you-want-to-win-in-the-next-2-3-years",
  "how-to-build-a-1m-one-person-business-faster-with-ai",
  "how-to-think-like-a-strategic-genius-5-dimensional-thinking",
  "how-to-use-ai-better-than-99-of-people-this-changed-my-life",
  "youre-stuck-in-the-matrix-heres-how-you-escape",
  "you-have-5-years-to-get-rich-before-ai-takes-over",
  "investing-for-beginners-in-25-minutes",
  "laziest-ways-to-make-money-with-ai-for-beginners",
  "how-to-use-trading-212-in-2026-full-investing-guide",
  "7-side-hustles-students-can-start-in-2026",
  "making-money-online-is-easy-actually-just-copy-me",
  "how-to-make-your-first-10-000-as-a-teen-stupid-simple",
  "the-only-investing-video-youll-ever-need-start-with-100",
  "7-proven-ways-to-make-money-with-ai-no-experience",
  "how-to-actually-lock-in-no-bullsh-t-guide",
  "18-years-of-ugly-business-advice-in-19-minutes",
  "want-to-made-god-tier-money-use-this-sales-tactic-made-me-10m",
  "there-are-only-3-types-of-profitable-businesses-pick-one",
  "if-you-dont-understand-leadership-youll-never-win",
  "i-built-a-business-with-ai-in-24-hours",
  "copy-paste-this-strategy-to-make-your-first-5-000-online",
  "7-remote-jobs-you-can-do-from-home",
  "i-asked-ai-to-make-me-as-much-money-as-possible",
  "these-are-the-best-business-books-to-read-7-billionaire-books",
  "my-honest-advice-to-someone-who-wants-to-get-rich",
  "the-30k-month-al-faceless-shorts-method-nobodys-talking-about",
  "how-to-build-10k-websites-in-minutes-claude-ai",
  "master-higgsfield-ai-in-20-minutes-beginner-tutorial"
]);
