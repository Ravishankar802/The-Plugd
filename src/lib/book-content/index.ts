import { WebBookPage, SELL_PDFS_WITH_AI_BOOK_PAGES } from "./sell-pdfs-with-ai-book";

export type { WebBookPage };

export async function getBookPages(courseSlug: string): Promise<WebBookPage[]> {
  switch (courseSlug) {
    case "i-sell-pdfs-with-ai-and-it-changed-my-life-revealing-everything":
      return (await import("./sell-pdfs-with-ai-book")).SELL_PDFS_WITH_AI_BOOK_PAGES;
    case "7-side-hustles-students-can-start-in-2027":
    case "ai-businesses-57":
      return (await import("./seven-side-hustles-students-2027-book")).SEVEN_SIDE_HUSTLES_2027_BOOK_PAGES;
    case "3-best-ai-businesses-to-start-before-2027-and-the-one-id-start-today":
    case "ai-businesses-59":
      return (await import("./three-best-ai-businesses-2027-book")).THREE_BEST_AI_BUSINESSES_2027_BOOK_PAGES;
    case "5-simple-apps-making-10-000-month-that-you-can-build-with-ai":
    case "ai-businesses-60":
      return (await import("./five-simple-apps-10k-month-book")).FIVE_SIMPLE_APPS_10K_BOOK_PAGES;
    case "if-youre-in-your-20s-heres-how-to-win-at-anything":
    case "ai-businesses-55":
      return (await import("./win-in-your-20s-book")).WIN_IN_YOUR_20S_BOOK_PAGES;
    case "the-smartest-way-to-capitalize-on-the-ai-gold-rush":
    case "ai-businesses-56":
      return (await import("./smartest-way-ai-gold-rush-book")).SMARTEST_WAY_AI_GOLD_RUSH_BOOK_PAGES;
    case "if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m":
    case "ai-businesses-53":
      return (await import("./started-over-zero-plan-1m-book")).STARTED_OVER_ZERO_PLAN_1M_BOOK_PAGES;
    case "if-i-wanted-to-become-a-millionaire-in-2026-this-is-what-id-do-full-blueprint":
    case "ai-businesses-54":
      return (await import("./become-millionaire-2027-book")).BECOME_MILLIONAIRE_2027_BOOK_PAGES;
    case "7-ai-automations":
      return (await import("./three-ai-businesses-book")).THREE_AI_BUSINESSES_BOOK_PAGES;
    case "side-hustles":
      return (await import("./zero-ad-customers-book")).ZERO_AD_CUSTOMERS_BOOK_PAGES;
    case "give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge":
      return (await import("./claude-knowledge-book")).CLAUDE_KNOWLEDGE_BOOK_PAGES;
    case "give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge":
      return (await import("./chatgpt-knowledge-book")).CHATGPT_KNOWLEDGE_BOOK_PAGES;
    case "5-proven-ways-to-make-money-with-ai-no-experience":
      return (await import("./five-proven-ways-book")).FIVE_PROVEN_WAYS_BOOK_PAGES;
    case "the-best-ai-side-hustles-to-start-in-2026-no-skills":
      return (await import("./ai-side-hustles-2026-book")).AI_SIDE_HUSTLES_2026_BOOK_PAGES;
    case "copy-paste-this-strategy-to-make-13k-month-with-ai-in-2026":
      return (await import("./copy-paste-13k-book")).COPY_PASTE_13K_BOOK_PAGES;
    case "build-a-one-person-business-as-a-beginner-from-0-to-10k":
      return (await import("./one-person-business-book")).ONE_PERSON_BUSINESS_BOOK_PAGES;
    case "laziest-way-to-make-money-online-in-2026-500-day":
      return (await import("./laziest-way-500-day-book")).LAZIEST_WAY_500_DAY_BOOK_PAGES;
    case "the-blueprint-to-go-from-0-to-1000000":
      return (await import("./blueprint-zero-to-million-book")).BLUEPRINT_ZERO_TO_MILLION_BOOK_PAGES;
    case "your-first-1m-is-simple-heres-how":
      return (await import("./first-million-simple-book")).FIRST_MILLION_SIMPLE_BOOK_PAGES;
    case "the-5-money-principles-that-will-make-anyone-rich-in-their-20s":
      return (await import("./five-money-principles-20s-book")).FIVE_MONEY_PRINCIPLES_20S_BOOK_PAGES;
    case "its-boring-but-will-make-even-beginners-millionaires-in-2026":
      return (await import("./boring-millionaires-2026-book")).BORING_MILLIONAIRES_2026_BOOK_PAGES;
    case "i-locked-myself-in-a-room-until-i-built-a-350-000-mo-business":
      return (await import("./locked-in-room-350k-book")).LOCKED_IN_ROOM_350K_BOOK_PAGES;
    case "the-4-levels-to-getting-rich-in-2026":
      return (await import("./four-levels-rich-2026-book")).FOUR_LEVELS_RICH_2026_BOOK_PAGES;
    case "the-a-i-revolution-8-ways-to-get-rich":
      return (await import("./ai-revolution-8-ways-book")).AI_REVOLUTION_8_WAYS_BOOK_PAGES;
    case "how-i-turned-300-to-100-000-at-19-my-side-hustles":
      return (await import("./turn-300-to-100k-19-book")).TURN_300_TO_100K_19_BOOK_PAGES;
    case "how-to-become-rich-with-social-media-my-exact-playbook":
      return (await import("./rich-social-media-playbook-book")).RICH_SOCIAL_MEDIA_PLAYBOOK_BOOK_PAGES;
    case "how-to-get-rich-for-service-based-businesses-thank-me-later":
      return (await import("./rich-service-businesses-book")).RICH_SERVICE_BUSINESSES_BOOK_PAGES;
    case "the-new-way-of-making-content-in-the-age-of-ai":
      return (await import("./new-way-making-content-book")).NEW_WAY_MAKING_CONTENT_BOOK_PAGES;
    case "how-to-catch-up-in-life-using-logic":
      return (await import("./catch-up-life-logic-book")).CATCH_UP_LIFE_LOGIC_BOOK_PAGES;
    case "what-makes-the-perfect-business-5-things":
      return (await import("./perfect-business-5-things-book")).PERFECT_BUSINESS_5_THINGS_BOOK_PAGES;
    case "how-to-use-ai-in-your-business-in-2026":
      return (await import("./use-ai-in-business-2026-book")).USE_AI_IN_BUSINESS_2026_BOOK_PAGES;
    case "if-you-have-multiple-interests-please-start-a-one-person-business":
      return (await import("./multiple-interests-one-person-business-book")).MULTIPLE_INTERESTS_ONE_PERSON_BUSINESS_BOOK_PAGES;
    case "learn-this-skill-if-you-want-to-win-in-the-next-2-3-years":
      return (await import("./learn-this-skill-win-book")).LEARN_THIS_SKILL_WIN_BOOK_PAGES;
    case "how-to-build-a-1m-one-person-business-faster-with-ai":
      return (await import("./build-1m-one-person-faster-ai-book")).BUILD_1M_ONE_PERSON_FASTER_AI_BOOK_PAGES;
    case "how-to-think-like-a-strategic-genius-5-dimensional-thinking":
      return (await import("./think-strategic-genius-5d-book")).THINK_STRATEGIC_GENIUS_5D_BOOK_PAGES;
    case "how-to-use-ai-better-than-99-of-people-this-changed-my-life":
      return (await import("./use-ai-better-than-99-percent-book")).USE_AI_BETTER_THAN_99_PERCENT_BOOK_PAGES;
    case "youre-stuck-in-the-matrix-heres-how-you-escape":
      return (await import("./stuck-in-matrix-escape-book")).STUCK_IN_MATRIX_ESCAPE_BOOK_PAGES;
    case "you-have-5-years-to-get-rich-before-ai-takes-over":
      return (await import("./five-years-get-rich-before-ai-book")).FIVE_YEARS_GET_RICH_BEFORE_AI_BOOK_PAGES;
    case "investing-for-beginners-in-25-minutes":
      return (await import("./investing-for-beginners-25-min-book")).INVESTING_FOR_BEGINNERS_25_MIN_BOOK_PAGES;
    case "laziest-ways-to-make-money-with-ai-for-beginners":
      return (await import("./laziest-ways-money-ai-beginners-book")).LAZIEST_WAYS_MONEY_AI_BEGINNERS_BOOK_PAGES;
    case "how-to-use-trading-212-in-2026-full-investing-guide":
      return (await import("./trading-212-full-guide-book")).TRADING_212_FULL_GUIDE_BOOK_PAGES;
    case "7-side-hustles-students-can-start-in-2026":
      return (await import("./seven-side-hustles-students-2026-book")).SEVEN_SIDE_HUSTLES_STUDENTS_2026_BOOK_PAGES;
    case "making-money-online-is-easy-actually-just-copy-me":
      return (await import("./making-money-online-easy-copy-me-book")).MAKING_MONEY_ONLINE_EASY_COPY_ME_BOOK_PAGES;
    case "how-to-make-your-first-10-000-as-a-teen-stupid-simple":
      return (await import("./make-first-10k-teen-book")).MAKE_FIRST_10K_TEEN_BOOK_PAGES;
    case "the-only-investing-video-youll-ever-need-start-with-100":
      return (await import("./only-investing-start-100-book")).ONLY_INVESTING_START_100_BOOK_PAGES;
    case "7-proven-ways-to-make-money-with-ai-no-experience":
      return (await import("./seven-proven-ways-money-ai-book")).SEVEN_PROVEN_WAYS_MONEY_AI_BOOK_PAGES;
    case "how-to-actually-lock-in-no-bullsh-t-guide":
      return (await import("./actually-lock-in-guide-book")).ACTUALLY_LOCK_IN_GUIDE_BOOK_PAGES;
    case "18-years-of-ugly-business-advice-in-19-minutes":
      return (await import("./ugly-business-advice-18-years-book")).UGLY_BUSINESS_ADVICE_18_YEARS_BOOK_PAGES;
    case "want-to-made-god-tier-money-use-this-sales-tactic-made-me-10m":
      return (await import("./god-tier-sales-tactic-10m-book")).GOD_TIER_SALES_TACTIC_10M_BOOK_PAGES;
    case "there-are-only-3-types-of-profitable-businesses-pick-one":
      return (await import("./three-types-profitable-businesses-book")).THREE_TYPES_PROFITABLE_BUSINESSES_BOOK_PAGES;
    case "if-you-dont-understand-leadership-youll-never-win":
      return (await import("./leadership-never-win-book")).LEADERSHIP_NEVER_WIN_BOOK_PAGES;
    case "i-built-a-business-with-ai-in-24-hours":
      return (await import("./business-with-ai-24-hours-book")).BUSINESS_WITH_AI_24_HOURS_BOOK_PAGES;
    case "copy-paste-this-strategy-to-make-your-first-5-000-online":
      return (await import("./copy-paste-first-5k-book")).COPY_PASTE_FIRST_5K_BOOK_PAGES;
    case "7-remote-jobs-you-can-do-from-home":
      return (await import("./seven-remote-jobs-from-home-book")).SEVEN_REMOTE_JOBS_FROM_HOME_BOOK_PAGES;
    case "i-asked-ai-to-make-me-as-much-money-as-possible":
      return (await import("./asked-ai-make-money-book")).ASKED_AI_MAKE_MONEY_BOOK_PAGES;
    case "these-are-the-best-business-books-to-read-7-billionaire-books":
      return (await import("./seven-billionaire-books-read-book")).SEVEN_BILLIONAIRE_BOOKS_READ_BOOK_PAGES;
    case "my-honest-advice-to-someone-who-wants-to-get-rich":
      return (await import("./honest-advice-get-rich-book")).HONEST_ADVICE_GET_RICH_BOOK_PAGES;
    case "the-30k-month-al-faceless-shorts-method-nobodys-talking-about":
      return (await import("./faceless-shorts-30k-month-book")).FACELESS_SHORTS_30K_MONTH_BOOK_PAGES;
    case "how-to-build-10k-websites-in-minutes-claude-ai":
      return (await import("./build-10k-websites-claude-book")).BUILD_10K_WEBSITES_CLAUDE_BOOK_PAGES;
    case "master-higgsfield-ai-in-20-minutes-beginner-tutorial":
      return (await import("./master-higgsfield-ai-tutorial-book")).MASTER_HIGGSFIELD_AI_TUTORIAL_BOOK_PAGES;
    default:
      return SELL_PDFS_WITH_AI_BOOK_PAGES;
  }
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
