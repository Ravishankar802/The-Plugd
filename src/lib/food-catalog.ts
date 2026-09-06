/**
 * Food Catalog Data Definition for Plugd
 * 
 * Exactly the 90 specified food items for the Food category.
 * Zero descriptions, zero prices.
 */

import { getFoodProductImage, DEFAULT_FOOD_IMAGE } from "./product-images";

export interface FoodProduct {
  id: string;
  name: string;
  brand?: string;
  category: "Food";
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

export interface FoodSection {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  displayOrder: number;
  productIds: string[];
}

export const FOOD_NAMES = [
  "Biryani",
  "Idli",
  "Dosa",
  "Tandoori Chicken",
  "Egg",
  "South Indian Meals",
  "Chicken Fried Rice",
  "Mandi",
  "Masala Dosa",
  "Chicken Curry",
  "Chicken",
  "Grilled Chicken",
  "Vada",
  "Cake",
  "Chilli Chicken",
  "Chicken Biryani",
  "Fish",
  "Mutton",
  "Coffee",
  "Tea",
  "Pizza",
  "Poha",
  "Chicken Lollipop",
  "Aloo Paratha",
  "Burger",
  "Tiffin",
  "Pongal",
  "Egg Curries",
  "Set Dosa",
  "Shawarma",
  "Chole Bhature",
  "Chicken Rolls",
  "Sandwich",
  "Pasta",
  "Sweets",
  "Pulao",
  "Fruit Bowl",
  "Sambar",
  "Maggi",
  "Poori Sabzi",
  "North Indian Meals",
  "Paratha",
  "Chicken Soup",
  "Thali",
  "Chicken Shawarma",
  "Curd Rice",
  "Omelette",
  "Khichdi",
  "Momo",
  "Appam",
  "Puttu",
  "Wings",
  "Upma",
  "Puliyogare",
  "Parotta",
  "Chicken Salad",
  "Samosa",
  "Paddu",
  "Waffles",
  "Noodles",
  "Bengali",
  "Soup",
  "Egg Roast",
  "Rolls",
  "Kara Bhaath",
  "Desserts",
  "Pancake",
  "Non Veg Meal",
  "Vada Pav",
  "Juice",
  "Shawaya",
  "Mutton Curries",
  "Fried Rice",
  "Cold Coffee",
  "Veg Meal",
  "Pazham Pori",
  "Rasmalai",
  "Boiled Egg",
  "Chaat",
  "Salad",
  "Mushroom Biryani",
  "Kebabs",
  "Idiyappam",
  "Ice Cream",
  "Pav Bhaji",
  "Neer Dosa",
  "Dal Khichdi",
  "Bread Omelette",
  "Bowl",
  "Paneer",
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const RAW_FOOD_PRODUCTS: Array<{
  id: string;
  name: string;
  subcategory: string;
  sectionId: string;
  sectionTitle: string;
  description: string;
  tags: string[];
  badge?: "HOT" | "TRENDING" | "VIRAL" | "NEW" | "POPULAR" | "PREMIUM" | "BESTSELLER";
  featured?: boolean;
  trending?: boolean;
}> = FOOD_NAMES.map((name, idx) => {
  const id = slugify(name);
  return {
    id,
    name,
    subcategory: "Food",
    sectionId: "all-food",
    sectionTitle: "All Food",
    description: "",
    tags: [id, "food", "wishlist"],
    featured: idx < 8,
    trending: idx % 7 === 0,
    badge: idx === 0 ? "BESTSELLER" : idx % 10 === 0 ? "HOT" : undefined,
  };
});

export const FOOD_SECTIONS: FoodSection[] = [
  {
    id: "all-food",
    title: "All Food",
    subtitle: "Everyday meals, comfort food, and cravings from across India",
    badge: "🍛 Food",
    displayOrder: 1,
    productIds: RAW_FOOD_PRODUCTS.map((p) => p.id),
  },
];

export function getFullFoodCatalog(): FoodProduct[] {
  return RAW_FOOD_PRODUCTS.map((p, idx) => ({
    id: p.id,
    name: p.name,
    category: "Food",
    subcategory: p.subcategory,
    sectionId: p.sectionId,
    sectionTitle: p.sectionTitle,
    imageUrl: getFoodProductImage(p.id) || DEFAULT_FOOD_IMAGE,
    description: "",
    tags: p.tags,
    badge: p.badge,
    featured: Boolean(p.featured),
    trending: Boolean(p.trending),
    displayOrder: idx,
  }));
}
