/**
 * Subcategory Hierarchy & Mapping for Plugd
 * 
 * Defines the exact subcategory relationships per category:
 * - FOOD: Ice Creams, Sweet Cravings, Biscuits, Snacks
 * - DRINKS: Coffee, Cold Drinks & Juices
 * - FASHION: Jewellery
 * - MOBILE: None (Standalone)
 * - BEAUTY: Skin Care
 * - ENTERTAINMENT: None (Standalone)
 * - SUBSCRIPTIONS: None (Standalone)
 * - ELECTRONICS: Mobile, Laptops, Gaming
 * - FITNESS: None (Standalone)
 * - VEHICLES: Bikes, Cars
 * - TOYS: None (Standalone)
 */

export interface Subcategory {
  id: string; // url slug e.g. "ice-creams"
  name: string; // display name e.g. "Ice Creams"
  image: string; // square thumbnail image
  keywords: string[]; // matching keywords for filtering products
  sourceCategorySlug?: string; // e.g. "mobile" when Electronics -> Mobile
}

export const CATEGORY_SUBCATEGORIES: Record<string, Subcategory[]> = {
  food: [
    {
      id: "ice-creams",
      name: "Ice Creams",
      image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=300&q=80",
      keywords: ["ice cream", "kulfi", "gelato", "popsicle", "sundae", "cornetto", "magnum", "chocobar", "cassata"],
    },
    {
      id: "sweet-cravings",
      name: "Sweet Cravings",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=300&q=80",
      keywords: ["sweets", "sweet", "cake", "dessert", "desserts", "waffles", "pancake", "rasmalai", "gulab", "halwa", "jalebi", "laddu", "kaju", "brownie", "pastry", "donut", "doughnut", "chocolate", "mithai", "peda", "barfi", "mysore pak", "rasgulla", "pazham pori"],
    },
    {
      id: "biscuits",
      name: "Biscuits",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=300&q=80",
      keywords: ["biscuit", "biscuits", "cookie", "cookies", "rusk", "wafer", "bakery", "bread", "toast", "waffles", "pancake"],
    },
    {
      id: "snacks",
      name: "Snacks",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80",
      keywords: ["samosa", "vada pav", "vada", "chaat", "roll", "rolls", "momo", "wings", "shawarma", "sandwich", "burger", "puff", "pakoda", "poha", "upma", "maggi", "noodles", "pasta", "pav bhaji", "fries", "chilli chicken", "chicken lollipop", "popcorn", "crisps", "snack"],
    },
  ],
  drinks: [
    {
      id: "coffee",
      name: "Coffee",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80",
      keywords: ["coffee", "espresso", "latte", "cappuccino", "brew", "mocha", "cold coffee", "americano", "macchiato", "frappe"],
    },
    {
      id: "cold-drinks-juices",
      name: "Cold Drinks & Juices",
      image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b7?auto=format&fit=crop&w=300&q=80",
      keywords: ["juice", "cold drink", "soda", "coke", "pepsi", "energy drink", "shake", "smoothie", "lassi", "tea", "iced", "red bull", "monster", "prime", "thums", "sprite", "fanta", "mirinda", "maaza", "frooti", "lemonade", "kombucha", "water"],
    },
  ],
  fashion: [
    {
      id: "jewellery",
      name: "Jewellery",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80",
      keywords: ["jewellery", "jewelry", "necklace", "ring", "earring", "earrings", "bracelet", "chain", "jhumka", "gold", "silver", "pendant", "choker", "anklet", "bangle", "accessory"],
    },
  ],
  beauty: [
    {
      id: "skin-care",
      name: "Skin Care",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80",
      keywords: ["skin", "serum", "moisturizer", "sunscreen", "toner", "cleanser", "cream", "mask", "lotion", "exfoliant", "snail", "niacinamide", "hyaluronic", "retinol", "face wash", "spf", "patch", "salicylic", "glycolic", "hydrating", "cica"],
    },
  ],
  electronics: [
    {
      id: "mobile",
      name: "Mobile",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80",
      keywords: ["iphone", "galaxy", "pixel", "oneplus", "xiaomi", "mobile", "phone", "smartphone", "ipad", "tablet"],
      sourceCategorySlug: "mobile",
    },
    {
      id: "laptops",
      name: "Laptops",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=300&q=80",
      keywords: ["macbook", "laptop", "xps", "thinkpad", "surface", "zenbook", "proart", "razer blade", "swift", "spectre", "notebook", "chromebook", "dell", "lenovo", "asus"],
    },
    {
      id: "gaming",
      name: "Gaming",
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=300&q=80",
      keywords: ["playstation", "ps5", "xbox", "nintendo", "switch", "steam deck", "controller", "gaming", "headset", "razer", "alienware", "legion", "rog", "dualsense", "vr", "quest", "stream deck"],
    },
  ],
  vehicles: [
    {
      id: "bikes",
      name: "Bikes",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=300&q=80",
      keywords: ["bike", "motorcycle", "ducati", "kawasaki", "harley", "bullet", "royalenfield", "royal enfield", "bmw s1000rr", "yamaha", "hayabusa", "panigale", "ninja", "triumph", "ktm", "scooter", "vespa", "interceptor", "continental", "himalayan", "speed 400", "activa", "aprilia", "hunter", "classic 350", "meteor", "street triple", "speed triple", "z900", "zx-10r", "h2", "streetfighter", "multistrada", "diavel", "monster", "desertx", "r15", "mt-15", "r3", "duke", "rc 390", "super duke", "fat boy", "street bob", "road king", "chetak", "ola", "ather", "jupiter", "aerox"],
    },
    {
      id: "cars",
      name: "Cars",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=300&q=80",
      keywords: ["car", "porsche", "ferrari", "lamborghini", "bmw m", "mercedes", "amg", "audi", "thar", "defender", "mustang", "gt3", "supra", "corvette", "rolls royce", "land cruiser", "range rover", "m3", "m4", "m5", "911", "urus", "g-wagon", "mclaren", "aston martin", "bugatti", "koenigsegg", "pagani", "hypercar", "supercar", "chiron", "veyron", "tourbillon", "jesko", "utopia", "valkyrie", "speedtail", "senna", "revuelto", "sf90", "daytona sp3", "monza", "stradale", "roma", "huracan", "aventador", "svj", "artura", "750s", "765lt", "p1", "db12", "dbs", "vantage", "cullinan", "phantom", "spectre", "bentayga", "continental gt", "maybach", "gt-r", "viper", "shelby"],
    },
  ],
};

export function getSubcategoriesForCategory(categorySlug: string): Subcategory[] {
  return CATEGORY_SUBCATEGORIES[categorySlug.toLowerCase()] || [];
}

export function getSubcategoryDef(categorySlug: string, subId: string): Subcategory | undefined {
  const subs = getSubcategoriesForCategory(categorySlug);
  return subs.find((s) => s.id === subId.toLowerCase());
}

export function matchesSubcategory(
  item: { name: string; slug: string },
  categorySlug: string,
  subId: string
): boolean {
  const normalizedCategory = categorySlug.toLowerCase();
  const normalizedSubId = subId.toLowerCase();

  const subDef = getSubcategoryDef(normalizedCategory, normalizedSubId);
  if (!subDef) return true;

  // Special vehicle logic
  if (normalizedCategory === "vehicles") {
    const bikesDef = getSubcategoryDef("vehicles", "bikes");
    const isBike = bikesDef?.keywords.some(
      (kw) =>
        item.name.toLowerCase().includes(kw) ||
        item.slug.toLowerCase().includes(kw)
    );

    if (normalizedSubId === "bikes") {
      return Boolean(isBike);
    }
    if (normalizedSubId === "cars") {
      // Anything in Vehicles that is not a bike is considered a Car / Supercar / Hypercar
      return !isBike;
    }
  }

  const nameLower = item.name.toLowerCase();
  const slugLower = item.slug.toLowerCase();

  return subDef.keywords.some(
    (kw) => nameLower.includes(kw.toLowerCase()) || slugLower.includes(kw.toLowerCase())
  );
}
