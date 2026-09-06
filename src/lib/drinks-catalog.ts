/**
 * Drinks Catalog Data Definition for Plugd
 * 
 * Exactly the 18 specified drinks products with zero descriptions and zero prices.
 */

import { getDrinksProductImage, DEFAULT_DRINKS_IMAGE } from "./product-images";

export interface DrinksProduct {
  id: string;
  name: string;
  brand: string;
  category: "Drinks";
  subcategory: string;
  sectionId: string;
  sectionTitle: string;
  imageUrl: string;
  description: string;
  tags: string[];
  badge?: "HOT" | "TRENDING" | "VIRAL" | "NEW" | "POPULAR" | "PREMIUM" | "BESTSELLER";
  featured?: boolean;
  trending?: boolean;
  displayOrder: number;
}

export interface DrinksSection {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  displayOrder: number;
  productIds: string[];
}

export const DRINKS_SECTIONS: DrinksSection[] = [
  {
    id: "all-drinks",
    title: "All Drinks",
    subtitle: "Beverages, refreshments, energy drinks, and dairy sips",
    badge: "🥤 Drinks",
    displayOrder: 1,
    productIds: [
      "diet-coke",
      "red-bull-energy-drink",
      "monster-energy-drink",
      "gatorade-energy-drink",
      "amul-masti-spiced-buttermilk",
      "bisleri-water-bottle",
      "minute-maid-pulpy-orange",
      "hell-energy-drink",
      "coca-cola-zero-sugar-pet",
      "smooth-chocolate-milk-drink",
      "coca-cola-zero-sugar-can",
      "soft-soya-milk-drink",
      "coolberg-cranberry-non-alcoholic-beer",
      "amul-protein-shake-blueberry",
      "sprite-zero",
      "thums-up",
      "pepsi",
      "pepsi-zero-sugar-soft-drink",
    ],
  },
];

export const RAW_DRINKS_PRODUCTS: Array<{
  id: string;
  name: string;
  brand: string;
  subcategory: string;
  sectionId: string;
  sectionTitle: string;
  description: string;
  tags: string[];
  badge?: "HOT" | "TRENDING" | "VIRAL" | "NEW" | "POPULAR" | "PREMIUM" | "BESTSELLER";
  featured?: boolean;
  trending?: boolean;
}> = [
  {
    id: "diet-coke",
    name: "Diet Coke",
    brand: "Coca-Cola",
    subcategory: "Soft Drinks",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["coke", "diet", "soda", "sugar-free"],
    badge: "POPULAR",
    featured: true,
  },
  {
    id: "red-bull-energy-drink",
    name: "Red Bull Energy Drink",
    brand: "Red Bull",
    subcategory: "Energy Drinks",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["red-bull", "energy-drink", "caffeine"],
    badge: "HOT",
    featured: true,
    trending: true,
  },
  {
    id: "monster-energy-drink",
    name: "Monster Energy Drink",
    brand: "Monster",
    subcategory: "Energy Drinks",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["monster", "energy-drink", "caffeine"],
    badge: "POPULAR",
    featured: true,
  },
  {
    id: "gatorade-energy-drink",
    name: "Gatorade Energy Drink",
    brand: "Gatorade",
    subcategory: "Sports Drinks",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["gatorade", "sports-drink", "electrolytes"],
    badge: "POPULAR",
  },
  {
    id: "amul-masti-spiced-buttermilk",
    name: "Amul Masti Spiced Buttermilk",
    brand: "Amul",
    subcategory: "Dairy",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["amul", "buttermilk", "chaas", "dairy"],
    badge: "BESTSELLER",
  },
  {
    id: "bisleri-water-bottle",
    name: "Bisleri Water Bottle",
    brand: "Bisleri",
    subcategory: "Water",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["bisleri", "water", "mineral-water"],
    badge: "BESTSELLER",
  },
  {
    id: "minute-maid-pulpy-orange",
    name: "Minute Maid Pulpy Orange",
    brand: "Minute Maid",
    subcategory: "Juices",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["minute-maid", "orange", "juice"],
    badge: "POPULAR",
  },
  {
    id: "hell-energy-drink",
    name: "Hell Energy Drink",
    brand: "Hell",
    subcategory: "Energy Drinks",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["hell", "energy-drink", "caffeine"],
  },
  {
    id: "coca-cola-zero-sugar-pet",
    name: "Coca Cola Zero Sugar PET",
    brand: "Coca-Cola",
    subcategory: "Soft Drinks",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["coca-cola", "zero-sugar", "soda"],
    badge: "POPULAR",
  },
  {
    id: "smooth-chocolate-milk-drink",
    name: "Smooth Chocolate Milk Drink",
    brand: "Amul",
    subcategory: "Dairy",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["chocolate-milk", "amul", "dairy"],
  },
  {
    id: "coca-cola-zero-sugar-can",
    name: "Coca Cola Zero Sugar Can",
    brand: "Coca-Cola",
    subcategory: "Soft Drinks",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["coca-cola", "zero-sugar", "can", "soda"],
  },
  {
    id: "soft-soya-milk-drink",
    name: "Soft Soya Milk Drink",
    brand: "Sofit",
    subcategory: "Dairy Alternatives",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["soya-milk", "vegan", "dairy-free"],
  },
  {
    id: "coolberg-cranberry-non-alcoholic-beer",
    name: "Coolberg Cranberry Non Alcoholic Beer",
    brand: "Coolberg",
    subcategory: "Non-Alcoholic",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["coolberg", "cranberry", "beer", "non-alcoholic"],
    badge: "TRENDING",
  },
  {
    id: "amul-protein-shake-blueberry",
    name: "Amul Protein Shake Blueberry",
    brand: "Amul",
    subcategory: "Protein Drinks",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["amul", "protein", "shake", "blueberry"],
    badge: "HOT",
  },
  {
    id: "sprite-zero",
    name: "Sprite Zero",
    brand: "Sprite",
    subcategory: "Soft Drinks",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["sprite", "zero-sugar", "lime", "soda"],
  },
  {
    id: "thums-up",
    name: "Thums Up",
    brand: "Thums Up",
    subcategory: "Soft Drinks",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["thums-up", "cola", "indian-soft-drink"],
    badge: "BESTSELLER",
  },
  {
    id: "pepsi",
    name: "Pepsi",
    brand: "Pepsi",
    subcategory: "Soft Drinks",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["pepsi", "cola", "soda"],
  },
  {
    id: "pepsi-zero-sugar-soft-drink",
    name: "Pepsi Zero Sugar Soft Drink",
    brand: "Pepsi",
    subcategory: "Soft Drinks",
    sectionId: "all-drinks",
    sectionTitle: "All Drinks",
    description: "",
    tags: ["pepsi", "zero-sugar", "soda"],
  },
];

export function getFullDrinksCatalog(): DrinksProduct[] {
  return RAW_DRINKS_PRODUCTS.map((p, idx) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: "Drinks",
    subcategory: p.subcategory,
    sectionId: p.sectionId,
    sectionTitle: p.sectionTitle,
    imageUrl: getDrinksProductImage(p.id) || DEFAULT_DRINKS_IMAGE,
    description: "",
    tags: p.tags,
    badge: p.badge,
    featured: Boolean(p.featured),
    trending: Boolean(p.trending),
    displayOrder: idx,
  }));
}
