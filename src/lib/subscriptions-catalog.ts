/**
 * Subscriptions Catalog Data Definition for Plugd
 * 
 * Exactly the 22 specified digital memberships and subscriptions products.
 */

import { getSubscriptionsProductImage, DEFAULT_SUBSCRIPTIONS_IMAGE } from "./product-images";

export interface SubscriptionsProduct {
  id: string;
  name: string;
  category: "Subscriptions";
  imageUrl: string;
  description: string;
  tags: string[];
  featured?: boolean;
  displayOrder: number;
}

export const SUBSCRIPTIONS_STARTING_COUNTS: Record<string, number> = {
  "chatgpt-plus": 243,
  "chatgpt-pro": 532,
  "claude-pro": 321,
  "claude-max": 1100,
  "x-premium": 114,
  "netflix-standard": 134,
  "prime-video-subscription": 182,
  "hotstar-subscription": 34,
  "apple-tv-subscription": 72,
  "google-ai-plus": 112,
  "google-ai-pro": 182,
  "google-ai-ultra": 437,
  "spotify-premium": 98,
  "youtube-premium": 84,
  "amazon-prime": 90,
  "canva-pro": 119,
  "adobe-creative-cloud": 43,
  "github-pro": 63,
  "notion-plus": 78,
  "figma-pro": 53,
  "midjourney-subscription": 103,
  "x-premium-2": 356,
  "x-premium-plus": 356,
};
