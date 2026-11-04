import { PlaybookArticle } from "./types";
import { HOW_TO_BUILD_10K_WEBSITES_ARTICLE } from "./how-to-build-10k-websites";
import { FACELESS_SHORTS_30K_ARTICLE } from "./faceless-shorts-30k";
import { HONEST_ADVICE_GET_RICH_ARTICLE } from "./honest-advice-get-rich";
import { MASTER_HIGGSFIELD_TUTORIAL_ARTICLE } from "./master-higgsfield-tutorial";
import { BEST_BUSINESS_BOOKS_ARTICLE } from "./best-business-books-7-billionaires";
import { ASKED_AI_MAKE_MONEY_ARTICLE } from "./asked-ai-make-money";
import { SEVEN_REMOTE_JOBS_ARTICLE } from "./seven-remote-jobs";
import { COPY_PASTE_FIRST_5K_ARTICLE } from "./copy-paste-strategy-first-5k";
import { BUILT_BUSINESS_AI_24H_ARTICLE } from "./built-business-ai-24-hours";
import { UNDERSTAND_LEADERSHIP_ARTICLE } from "./understand-leadership";
import { THREE_TYPES_BUSINESSES_ARTICLE } from "./three-types-profitable-businesses";
import { SALES_TACTIC_10M_ARTICLE } from "./sales-tactic-god-tier-money";
import { EIGHTEEN_YEARS_UGLY_ADVICE_ARTICLE } from "./eighteen-years-ugly-advice";
import { HOW_TO_ACTUALLY_LOCK_IN_ARTICLE } from "./how-to-actually-lock-in";
import { SEVEN_PROVEN_WAYS_AI_ARTICLE } from "./seven-proven-ways-ai";
import { THE_ONLY_INVESTING_GUIDE_ARTICLE } from "./the-only-investing-guide";
import { FIRST_10K_TEEN_SIMPLE_ARTICLE } from "./first-10k-teen-simple";
import { MAKING_MONEY_ONLINE_EASY_ARTICLE } from "./making-money-online-easy";
import { SEVEN_SIDE_HUSTLES_STUDENTS_ARTICLE } from "./seven-side-hustles-students";

export * from "./types";

export const PLAYBOOK_ARTICLES: Record<string, PlaybookArticle> = {
  "how-to-build-10k-websites-in-minutes-claude-ai": HOW_TO_BUILD_10K_WEBSITES_ARTICLE,
  "ai-businesses-51": HOW_TO_BUILD_10K_WEBSITES_ARTICLE,
  "the-30k-month-al-faceless-shorts-method-nobodys-talking-about": FACELESS_SHORTS_30K_ARTICLE,
  "ai-businesses-50": FACELESS_SHORTS_30K_ARTICLE,
  "my-honest-advice-to-someone-who-wants-to-get-rich": HONEST_ADVICE_GET_RICH_ARTICLE,
  "ai-businesses-49": HONEST_ADVICE_GET_RICH_ARTICLE,
  "master-higgsfield-ai-in-20-minutes-beginner-tutorial": MASTER_HIGGSFIELD_TUTORIAL_ARTICLE,
  "ai-businesses-52": MASTER_HIGGSFIELD_TUTORIAL_ARTICLE,
  "these-are-the-best-business-books-to-read-7-billionaire-books": BEST_BUSINESS_BOOKS_ARTICLE,
  "ai-businesses-48": BEST_BUSINESS_BOOKS_ARTICLE,
  "i-asked-ai-to-make-me-as-much-money-as-possible": ASKED_AI_MAKE_MONEY_ARTICLE,
  "ai-businesses-47": ASKED_AI_MAKE_MONEY_ARTICLE,
  "7-remote-jobs-you-can-do-from-home": SEVEN_REMOTE_JOBS_ARTICLE,
  "ai-businesses-46": SEVEN_REMOTE_JOBS_ARTICLE,
  "copy-paste-this-strategy-to-make-your-first-5-000-online": COPY_PASTE_FIRST_5K_ARTICLE,
  "ai-businesses-45": COPY_PASTE_FIRST_5K_ARTICLE,
  "i-built-a-business-with-ai-in-24-hours": BUILT_BUSINESS_AI_24H_ARTICLE,
  "ai-businesses-44": BUILT_BUSINESS_AI_24H_ARTICLE,
  "if-you-dont-understand-leadership-youll-never-win": UNDERSTAND_LEADERSHIP_ARTICLE,
  "ai-businesses-43": UNDERSTAND_LEADERSHIP_ARTICLE,
  "there-are-only-3-types-of-profitable-businesses-pick-one": THREE_TYPES_BUSINESSES_ARTICLE,
  "ai-businesses-42": THREE_TYPES_BUSINESSES_ARTICLE,
  "want-to-made-god-tier-money-use-this-sales-tactic-made-me-10m": SALES_TACTIC_10M_ARTICLE,
  "ai-businesses-41": SALES_TACTIC_10M_ARTICLE,
  "18-years-of-ugly-business-advice-in-19-minutes": EIGHTEEN_YEARS_UGLY_ADVICE_ARTICLE,
  "ai-businesses-40": EIGHTEEN_YEARS_UGLY_ADVICE_ARTICLE,
  "how-to-actually-lock-in-no-bullsh-t-guide": HOW_TO_ACTUALLY_LOCK_IN_ARTICLE,
  "ai-businesses-39": HOW_TO_ACTUALLY_LOCK_IN_ARTICLE,
  "7-proven-ways-to-make-money-with-ai-no-experience": SEVEN_PROVEN_WAYS_AI_ARTICLE,
  "ai-businesses-38": SEVEN_PROVEN_WAYS_AI_ARTICLE,
  "the-only-investing-video-youll-ever-need-start-with-100": THE_ONLY_INVESTING_GUIDE_ARTICLE,
  "ai-businesses-37": THE_ONLY_INVESTING_GUIDE_ARTICLE,
  "how-to-make-your-first-10-000-as-a-teen-stupid-simple": FIRST_10K_TEEN_SIMPLE_ARTICLE,
  "ai-businesses-36": FIRST_10K_TEEN_SIMPLE_ARTICLE,
  "making-money-online-is-easy-actually-just-copy-me": MAKING_MONEY_ONLINE_EASY_ARTICLE,
  "ai-businesses-35": MAKING_MONEY_ONLINE_EASY_ARTICLE,
  "7-side-hustles-students-can-start-in-2026": SEVEN_SIDE_HUSTLES_STUDENTS_ARTICLE,
  "ai-businesses-34": SEVEN_SIDE_HUSTLES_STUDENTS_ARTICLE,
};

export function getPlaybookArticle(slug: string): PlaybookArticle | null {
  if (!slug) return null;
  return PLAYBOOK_ARTICLES[slug] || null;
}
