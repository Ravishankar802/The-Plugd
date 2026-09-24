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

export const SUBSCRIPTIONS_STARTING_COUNTS: Record<string, number> = {};
