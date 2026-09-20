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
};

export const FOOD_STARTING_COUNTS: Record<string, number> = {
  biryani: 1200,
  idli: 180,
  dosa: 456,
  "tandoori-chicken": 342,
  egg: 428,
  "south-indian-meals": 135,
  "chicken-fried-rice": 234,
  mandi: 140,
  "masala-dosa": 367,
  "chicken-curry": 180,
  chicken: 249,
  "grilled-chicken": 190,
  vada: 56,
  cake: 294,
  "chilli-chicken": 89,
  "chicken-biryani": 1800,
  fish: 189,
  mutton: 343,
  coffee: 2300,
  tea: 345,
  pizza: 1100,
  poha: 93,
  "chicken-lollipop": 254,
  "aloo-paratha": 124,
  burger: 1200,
  tiffin: 78,
  pongal: 63,
  "egg-curries": 92,
  "egg-curry": 92,
  "set-dosa": 58,
  shawarma: 1100,
  "chole-bhature": 345,
  "chicken-rolls": 452,
  sandwich: 346,
  pasta: 965,
  pulao: 45,
  "fruit-bowl": 112,
  sambar: 22,
  maggi: 548,
  "poori-sabzi": 139,
  "north-indian-meals": 346,
  paratha: 198,
  "chicken-soup": 149,
  thali: 340,
  "chicken-shawarma": 784,
  "curd-rice": 95,
  omelette: 185,
  khichdi: 78,
  momo: 1300,
  momos: 1300,
  appam: 143,
  puttu: 30,
  wings: 281,
  upma: 22,
  puliyogare: 18,
  parotta: 132,
  "chicken-salad": 253,
  samosa: 583,
  paddu: 201,
  waffles: 213,
  noodles: 194,
  soup: 149,
  "egg-roast": 83,
  rolls: 253,
  "kara-bhaath": 12,
  desserts: 438,
  dessert: 438,
  pancake: 302,
  "non-veg-meal": 467,
  "vada-pav": 643,
  juice: 132,
  shawaya: 165,
  "mutton-curries": 236,
  "mutton-curry": 236,
  "fried-rice": 198,
  "cold-coffee": 485,
  "veg-meal": 124,
  "pazham-pori": 183,
  "boiled-egg": 302,
  chaat: 345,
  salad: 421,
  "mushroom-biryani": 221,
  kebabs: 548,
  kebab: 548,
  idiyappam: 132,
  "ice-cream": 1300,
  "pav-bhaji": 932,
  "neer-dosa": 129,
  "dal-khichdi": 184,
  "bread-omelette": 134,
  bowl: 346,
  paneer: 478,
  // 14 Ice Creams items
  "amul-chocolate-brownie-ice-cream-tub": 321,
  "amul-choco-chip-chocolate-ice-cream-tub": 289,
  "amul-fruit-n-nut-fantasy-ice-cream-tub": 198,
  "cream-pot-vanilla-tub": 125,
  "baskin-robbins-mississippi-mud-ice-cream-tub": 431,
  "magnum-chocolate-almond-ice-cream-stick": 243,
  "baskin-robbins-almond-n-caramel-ice-cream-stick": 129,
  "cornetto-double-chocolate-cone": 143,
  "havmor-dark-chocolate-ice-cream-cone": 365,
  "hoccol-hazelnut-mudslide-ice-cream-cone": 432,
  "hocol-hazelnut-mudslide-ice-cream-cone": 432,
  "ob-gob-tiramisu-fudge-ice-cream-sundae": 365,
  "ob-gob-vanilla-choco-brownie-ice-cream-sundae": 332,
  "amul-kulhad-kulfie-ice-cream": 354,
  "amul-kulhad-kulfi-ice-cream": 354,
  "havmor-matka-kulfi": 329,
  // 23 Sweet Cravings items
  rasmalai: 281,
  "rasmalai-2": 281,
  "kaju-katli": 489,
  "mysore-pak": 174,
  "motichoor-laddu": 237,
  "gulab-jamun": 342,
  "besan-laddu": 228,
  "soan-papdi": 129,
  rasgulla: 174,
  "doodh-peda": 236,
  "malai-peda": 175,
  "dharwad-peda": 142,
  "dairy-milk": 231,
  "munch-max": 112,
  "dairy-milk-shots": 89,
  "nestle-kit-kat": 246,
  "amul-cocoa-dark-chocolate": 120,
  "kinder-joy-blue": 239,
  "kinder-joy-pink": 274,
  snickers: 158,
  "bournville-dark-chocolate": 68,
  "cadbury-5-star": 93,
  "dairy-milk-silk": 284,
  "ferrero-rocher-premium-chocolate": 154,
  "ferrero-rocher-premium-chocolates": 154,
  // 10 Biscuits items
  "malkist-cheese-crunchy-layered-crackers": 87,
  "britannia-little-hearts": 31,
  "hide-seek-choco-chip-cookies": 45,
  "50-50-maska-chaska": 23,
  "5050-maska-chaska": 23,
  "parle-g": 33,
  oreo: 41,
  krackjack: 12,
  "good-day": 18,
  "dark-fantasy": 37,
  "jim-jam": 34,
};

