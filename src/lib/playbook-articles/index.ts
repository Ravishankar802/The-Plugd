import { PlaybookArticle } from "./types";
import { HOW_TO_BUILD_10K_WEBSITES_ARTICLE } from "./how-to-build-10k-websites";

export * from "./types";

export const PLAYBOOK_ARTICLES: Record<string, PlaybookArticle> = {
  "how-to-build-10k-websites-in-minutes-claude-ai": HOW_TO_BUILD_10K_WEBSITES_ARTICLE,
  "ai-businesses-51": HOW_TO_BUILD_10K_WEBSITES_ARTICLE,
};

export function getPlaybookArticle(slug: string): PlaybookArticle | null {
  if (!slug) return null;
  return PLAYBOOK_ARTICLES[slug] || null;
}
