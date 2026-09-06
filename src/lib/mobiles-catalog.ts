/**
 * Mobile Catalog Data Definition for Plugd
 * 
 * Exactly the 21 specified phones/tablets for the Mobile category & Electronics -> Mobile subcategory.
 * No descriptions, no prices.
 */

import { getMobilesProductImage } from "./product-images";

export interface MobileProduct {
  id: string;
  name: string;
  brand: string;
  category: "Mobile";
  subcategory: string;
  sectionId: string;
  sectionTitle: string;
  imageUrl: string;
  description: string;
  tags: string[];
  badge?: "HOT" | "TRENDING" | "NEW" | "POPULAR";
  featured?: boolean;
  trending?: boolean;
  displayOrder: number;
}

export interface MobileSection {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  displayOrder: number;
  productIds: string[];
}

export const MOBILE_SECTIONS: MobileSection[] = [
  {
    id: "all-mobiles",
    title: "Mobiles & Tablets",
    subtitle: "Flagship smartphones, pro tablets, and next-generation devices",
    badge: "📱 Mobile",
    displayOrder: 1,
    productIds: [
      "iphone-17-pro-max",
      "samsung-galaxy-s26-ultra",
      "samsung-galaxy-z-fold8-ultra",
      "google-pixel-11-pro-xl",
      "ipad-pro",
      "iphone-17-pro",
      "iphone-17",
      "iphone-air",
      "ipad-air",
      "ipad",
      "samsung-galaxy-s26",
      "samsung-galaxy-z-fold8",
      "google-pixel-11-pro",
      "google-pixel-11-pro-fold",
      "google-pixel-11",
      "nothing-phone-4a",
      "nothing-phone-4a-pro",
      "nothing-phone-4b",
      "nothing-phone-3",
      "nothing-phone-3a-pro",
      "nothing-phone-3a",
    ],
  },
];

export const RAW_MOBILE_PRODUCTS: Array<{
  id: string;
  name: string;
  brand: string;
  subcategory: string;
  sectionId: string;
  sectionTitle: string;
  description: string;
  tags: string[];
  badge?: "HOT" | "TRENDING" | "NEW" | "POPULAR";
  featured?: boolean;
  trending?: boolean;
}> = [
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    brand: "Apple",
    subcategory: "Smartphones",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["apple", "iphone", "flagship", "ios"],
    badge: "HOT",
    featured: true,
    trending: true,
  },
  {
    id: "samsung-galaxy-s26-ultra",
    name: "Samsung Galaxy S26 Ultra",
    brand: "Samsung",
    subcategory: "Smartphones",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["samsung", "galaxy", "ultra", "android"],
    badge: "HOT",
    featured: true,
    trending: true,
  },
  {
    id: "samsung-galaxy-z-fold8-ultra",
    name: "Samsung Galaxy Z Fold8 Ultra",
    brand: "Samsung",
    subcategory: "Foldables",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["samsung", "galaxy", "fold", "foldable"],
    badge: "NEW",
    featured: true,
  },
  {
    id: "google-pixel-11-pro-xl",
    name: "Google Pixel 11 Pro XL",
    brand: "Google",
    subcategory: "Smartphones",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["google", "pixel", "pro-xl", "android"],
    badge: "HOT",
    featured: true,
  },
  {
    id: "ipad-pro",
    name: "iPad Pro",
    brand: "Apple",
    subcategory: "Tablets",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["apple", "ipad", "tablet", "pro"],
    badge: "POPULAR",
    featured: true,
  },
  {
    id: "iphone-17-pro",
    name: "iPhone 17 Pro",
    brand: "Apple",
    subcategory: "Smartphones",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["apple", "iphone", "pro", "ios"],
    badge: "TRENDING",
    featured: true,
  },
  {
    id: "iphone-17",
    name: "iPhone 17",
    brand: "Apple",
    subcategory: "Smartphones",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["apple", "iphone", "ios"],
    badge: "POPULAR",
  },
  {
    id: "iphone-air",
    name: "iPhone Air",
    brand: "Apple",
    subcategory: "Smartphones",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["apple", "iphone", "air", "slim"],
    badge: "NEW",
  },
  {
    id: "ipad-air",
    name: "iPad Air",
    brand: "Apple",
    subcategory: "Tablets",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["apple", "ipad", "air", "tablet"],
  },
  {
    id: "ipad",
    name: "iPad",
    brand: "Apple",
    subcategory: "Tablets",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["apple", "ipad", "tablet"],
  },
  {
    id: "samsung-galaxy-s26",
    name: "Samsung Galaxy S26",
    brand: "Samsung",
    subcategory: "Smartphones",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["samsung", "galaxy", "android"],
  },
  {
    id: "samsung-galaxy-z-fold8",
    name: "Samsung Galaxy Z Fold8",
    brand: "Samsung",
    subcategory: "Foldables",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["samsung", "galaxy", "fold"],
  },
  {
    id: "google-pixel-11-pro",
    name: "Google Pixel 11 Pro",
    brand: "Google",
    subcategory: "Smartphones",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["google", "pixel", "android"],
  },
  {
    id: "google-pixel-11-pro-fold",
    name: "Google Pixel 11 Pro Fold",
    brand: "Google",
    subcategory: "Foldables",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["google", "pixel", "fold", "android"],
    badge: "NEW",
  },
  {
    id: "google-pixel-11",
    name: "Google Pixel 11",
    brand: "Google",
    subcategory: "Smartphones",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["google", "pixel", "android"],
  },
  {
    id: "nothing-phone-4a",
    name: "Nothing Phone (4a)",
    brand: "Nothing",
    subcategory: "Smartphones",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["nothing", "phone", "android"],
  },
  {
    id: "nothing-phone-4a-pro",
    name: "Nothing Phone (4a) Pro",
    brand: "Nothing",
    subcategory: "Smartphones",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["nothing", "phone", "pro", "android"],
  },
  {
    id: "nothing-phone-4b",
    name: "Nothing Phone (4b)",
    brand: "Nothing",
    subcategory: "Smartphones",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["nothing", "phone", "android"],
  },
  {
    id: "nothing-phone-3",
    name: "Nothing Phone (3)",
    brand: "Nothing",
    subcategory: "Smartphones",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["nothing", "phone", "flagship", "android"],
    badge: "TRENDING",
  },
  {
    id: "nothing-phone-3a-pro",
    name: "Nothing Phone (3a) Pro",
    brand: "Nothing",
    subcategory: "Smartphones",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["nothing", "phone", "android"],
  },
  {
    id: "nothing-phone-3a",
    name: "Nothing Phone (3a)",
    brand: "Nothing",
    subcategory: "Smartphones",
    sectionId: "all-mobiles",
    sectionTitle: "Mobiles & Tablets",
    description: "",
    tags: ["nothing", "phone", "android"],
  },
];

export function getFullMobilesCatalog(): MobileProduct[] {
  return RAW_MOBILE_PRODUCTS.map((p, idx) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: "Mobile",
    subcategory: p.subcategory,
    sectionId: p.sectionId,
    sectionTitle: p.sectionTitle,
    imageUrl: getMobilesProductImage(p.id),
    description: "",
    tags: p.tags,
    badge: p.badge,
    featured: Boolean(p.featured),
    trending: Boolean(p.trending),
    displayOrder: idx,
  }));
}

export function getMobileSubcategories(): Array<{ name: string; count: number }> {
  const map = new Map<string, number>();
  for (const item of RAW_MOBILE_PRODUCTS) {
    map.set(item.subcategory, (map.get(item.subcategory) || 0) + 1);
  }
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
}
