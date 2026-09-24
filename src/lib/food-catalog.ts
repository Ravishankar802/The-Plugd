/**
 * Food Catalog Data Definition for Plugd
 * 
 * Food items for the Food category.
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
  "Egg Curry",
  "Set Dosa",
  "Shawarma",
  "Chole Bhature",
  "Chicken Rolls",
  "Sandwich",
  "Pasta",
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
  "Momos",
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
  "Soup",
  "Egg Roast",
  "Rolls",
  "Kara Bhaath",
  "Dessert",
  "Pancake",
  "Non Veg Meal",
  "Vada Pav",
  "Juice",
  "Shawaya",
  "Mutton Curry",
  "Fried Rice",
  "Cold Coffee",
  "Veg Meal",
  "Pazham Pori",
  "Rasmalai",
  "Boiled Egg",
  "Chaat",
  "Salad",
  "Mushroom Biryani",
  "Kebab",
  "Idiyappam",
  "Ice Cream",
  "Pav Bhaji",
  "Neer Dosa",
  "Dal Khichdi",
  "Bread Omelette",
  "Bowl",
  "Paneer",
  // ICE CREAMS (14 items)
  "Amul Chocolate Brownie Ice Cream Tub",
  "Amul Choco Chip Chocolate Ice Cream Tub",
  "Amul Fruit N Nut Fantasy Ice Cream Tub",
  "Cream Pot Vanilla Tub",
  "Baskin Robbins Mississippi Mud Ice Cream Tub",
  "Magnum Chocolate Almond Ice Cream Stick",
  "Baskin Robbins Almond 'N' Caramel Ice Cream Stick",
  "Cornetto Double Chocolate Cone",
  "Havmor Dark Chocolate Ice Cream Cone",
  "Hoccol Hazelnut Mudslide Ice Cream Cone",
  "OB & GOB Tiramisu & Fudge Ice Cream Sundae",
  "OB & GOB Vanilla & Choco Brownie Ice Cream Sundae",
  "Amul Kulhad Kulfie Ice Cream",
  "Havmor Matka Kulfi",
  // SWEET CRAVINGS (22 items)
  "Kaju Katli",
  "Mysore Pak",
  "Motichoor Laddu",
  "Gulab Jamun",
  "Besan Laddu",
  "Soan Papdi",
  "Rasgulla",
  "Doodh Peda",
  "Malai Peda",
  "Dharwad Peda",
  "Dairy Milk",
  "Munch Max",
  "Dairy Milk Shots",
  "Nestle Kit-Kat",
  "Amul Cocoa Dark Chocolate",
  "Kinder Joy Blue",
  "Kinder Joy Pink",
  "Snickers",
  "Bournville Dark Chocolate",
  "Cadbury 5 Star",
  "Dairy Milk SIlk",
  "Ferrero Rocher Premium Chocolate",
  // BISCUITS (10 items)
  "Malkist Cheese Crunchy Layered Crackers",
  "Britannia Little Hearts",
  "Hide & Seek Choco Chip Cookies",
  "50-50 Maska Chaska",
  "Parle-G",
  "Oreo",
  "KrackJacK",
  "Good Day",
  "Dark Fantasy",
  "Jim Jam",
  // SNACKS (20 items)
  "Lay's Classic Salted",
  "Lay's Magic Masala",
  "Kurkure Masala Munch",
  "Bingo! Mad Angles",
  "Uncle Chipps",
  "Too Yumm! Multigrain Chips",
  "Haldiram's Aloo Bhujia",
  "Haldiram's Bhujia Sev",
  "Haldiram's Mixture",
  "Masala Peanuts",
  "Roasted Peanuts",
  "Makhana",
  "Banana Chips",
  "Murukku",
  "Chakli",
  "Nippattu",
  "Khakhra",
  "Popcorn",
  "Nachos",
  "Cheese Balls",
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/'s\b/g, "s")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const usedFoodIds = new Set<string>();

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
  let id = slugify(name);
  if (usedFoodIds.has(id)) {
    let suffix = 2;
    while (usedFoodIds.has(`${id}-${suffix}`)) {
      suffix += 1;
    }
    id = `${id}-${suffix}`;
  }
  usedFoodIds.add(id);

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

export const FOOD_ALIASES: Record<string, string> = {
  kebab: "kebabs",
  momos: "momo",
  dessert: "desserts",
  "egg-curry": "egg-curries",
  "mutton-curry": "mutton-curries",
  "hocol-hazelnut-mudslide-ice-cream-cone": "hoccol-hazelnut-mudslide-ice-cream-cone",
  "amul-kulhad-kulfi-ice-cream": "amul-kulhad-kulfie-ice-cream",
  "rasmalai-2": "rasmalai",
  "ferrero-rocher-premium-chocolates": "ferrero-rocher-premium-chocolate",
  "5050-maska-chaska": "50-50-maska-chaska",
  "uncle-chips": "uncle-chipps",
  "lay-s-classic-salted": "lays-classic-salted",
  "lay-s-magic-masala": "lays-magic-masala",
  "haldiram-s-aloo-bhujia": "haldirams-aloo-bhujia",
  "haldiram-s-bhujia-sev": "haldirams-bhujia-sev",
  "haldiram-s-mixture": "haldirams-mixture",
};

export const FOOD_STARTING_COUNTS: Record<string, number> = {};

