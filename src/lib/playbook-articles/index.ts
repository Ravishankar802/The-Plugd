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
};

export function getPlaybookArticle(slug: string): PlaybookArticle | null {
  if (!slug) return null;
  return PLAYBOOK_ARTICLES[slug] || null;
}
