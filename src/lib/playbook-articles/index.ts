import { PlaybookArticle } from "./types";
import { HOW_TO_BUILD_10K_WEBSITES_ARTICLE } from "./how-to-build-10k-websites";
import { FACELESS_SHORTS_30K_ARTICLE } from "./faceless-shorts-30k";
import { HONEST_ADVICE_GET_RICH_ARTICLE } from "./honest-advice-get-rich";
import { MASTER_HIGGSFIELD_TUTORIAL_ARTICLE } from "./master-higgsfield-tutorial";

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
};

export function getPlaybookArticle(slug: string): PlaybookArticle | null {
  if (!slug) return null;
  return PLAYBOOK_ARTICLES[slug] || null;
}
