/**
 * Subcategory Hierarchy & Mapping for Plugd
 * 
 * Defines the exact subcategory relationships per category:
 * - FOOD: Ice Creams, Sweet Cravings, Biscuits, Snacks
 * - DRINKS: Coffee, Cold Drinks & Juices
 * - FASHION: Jewellery
 * - MOBILE: Standalone main category
 * - BEAUTY: Skin Care
 * - ENTERTAINMENT: Standalone main category
 * - SUBSCRIPTIONS: Standalone main category
 * - ELECTRONICS: Mobile, Laptops, Audio, Gaming, Watches
 *   - Gaming nested: Console Controllers, Games, Keyboards, Mouse, Speakers
 * - FITNESS: Standalone main category
 * - VEHICLES: Bikes, Cars
 * - TOYS: Standalone main category
 */

export interface Subcategory {
  id: string; // url slug e.g. "ice-creams"
  name: string; // display name e.g. "Ice Creams"
  image: string; // square thumbnail image
  keywords: string[]; // matching keywords for filtering products
  productIds?: string[]; // exact product IDs if predefined
  sourceCategorySlug?: string; // e.g. "mobile" when Electronics -> Mobile
}

export const CATEGORY_SUBCATEGORIES: Record<string, Subcategory[]> = {
  food: [
    {
      id: "ice-creams",
      name: "Ice Creams",
      image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=300&q=80",
      keywords: [
        "ice cream", "kulfi", "kulfie", "gelato", "popsicle", "sundae", "cornetto", "magnum", "chocobar", "cassata",
        "baskin robbins", "cream pot", "havmor", "hoccol", "tiramisu", "mudslide", "kulhad", "tub", "cone", "stick"
      ],
      productIds: [
        "ice-cream",
        "amul-chocolate-brownie-ice-cream-tub",
        "amul-choco-chip-chocolate-ice-cream-tub",
        "amul-fruit-n-nut-fantasy-ice-cream-tub",
        "cream-pot-vanilla-tub",
        "baskin-robbins-mississippi-mud-ice-cream-tub",
        "magnum-chocolate-almond-ice-cream-stick",
        "baskin-robbins-almond-n-caramel-ice-cream-stick",
        "cornetto-double-chocolate-cone",
        "havmor-dark-chocolate-ice-cream-cone",
        "hoccol-hazelnut-mudslide-ice-cream-cone",
        "ob-gob-tiramisu-fudge-ice-cream-sundae",
        "ob-gob-vanilla-choco-brownie-ice-cream-sundae",
        "amul-kulhad-kulfie-ice-cream",
        "havmor-matka-kulfi",
      ],
    },
    {
      id: "sweet-cravings",
      name: "Sweet Cravings",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=300&q=80",
      keywords: [
        "sweets", "sweet", "cake", "dessert", "desserts", "waffles", "pancake", "rasmalai", "gulab", "halwa", "jalebi",
        "laddu", "kaju", "brownie", "pastry", "donut", "doughnut", "chocolate", "mithai", "peda", "barfi", "mysore pak",
        "rasgulla", "pazham pori", "soan papdi", "dairy milk", "munch", "kit-kat", "kinder", "snickers", "bournville",
        "5 star", "ferrero rocher"
      ],
      productIds: [
        "cake",
        "sweets",
        "waffles",
        "desserts",
        "pancake",
        "pazham-pori",
        "rasmalai",
        "kaju-katli",
        "mysore-pak",
        "motichoor-laddu",
        "gulab-jamun",
        "besan-laddu",
        "soan-papdi",
        "rasgulla",
        "rasmalai-2",
        "doodh-peda",
        "malai-peda",
        "dharwad-peda",
        "dairy-milk",
        "munch-max",
        "dairy-milk-shots",
        "nestle-kit-kat",
        "amul-cocoa-dark-chocolate",
        "kinder-joy-blue",
        "kinder-joy-pink",
        "snickers",
        "bournville-dark-chocolate",
        "cadbury-5-star",
        "dairy-milk-silk",
        "ferrero-rocher-premium-chocolates",
      ],
    },
    {
      id: "biscuits",
      name: "Biscuits",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=300&q=80",
      keywords: [
        "biscuit", "biscuits", "cookie", "cookies", "rusk", "wafer", "bakery", "bread", "toast", "waffles", "pancake",
        "crackers", "little hearts", "maska chaska", "parle-g", "oreo", "krackjack", "good day", "dark fantasy",
        "jim jam", "malkist", "5050"
      ],
      productIds: [
        "waffles",
        "pancake",
        "bread-omelette",
        "malkist-cheese-crunchy-layered-crackers",
        "britannia-little-hearts",
        "hide-seek-choco-chip-cookies",
        "5050-maska-chaska",
        "parle-g",
        "oreo",
        "krackjack",
        "good-day",
        "dark-fantasy",
        "jim-jam",
      ],
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
      keywords: ["macbook", "laptop", "xps", "thinkpad", "surface", "zenbook", "proart", "razer blade", "swift", "spectre", "notebook", "chromebook", "dell", "lenovo", "asus", "hp"],
      productIds: ["macbook-pro", "macbook-air", "macbook-neo", "lenovo-thinkpad", "lenovo-laptop", "hp-laptop", "dell-laptop"],
    },
    {
      id: "audio",
      name: "Audio",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300&q=80",
      keywords: ["airpods", "headphones", "earbuds", "buds", "ear", "cmf", "marshall", "sony wf", "sony wh", "headphone", "audio"],
      productIds: [
        "airpods",
        "airpods-pro",
        "airpods-max",
        "sony-wf-1000xm6",
        "sony-wf-1000xm5",
        "sony-wh-1000xm6",
        "sony-wh-1000xm5",
        "samsung-galaxy-buds4-pro",
        "galaxy-buds4",
        "galaxy-buds3-pro",
        "galaxy-buds3",
        "pixel-buds-pro-2",
        "pixel-buds-2a",
        "headphone-1",
        "ear-open",
        "cmf-headphone-pro",
        "ear",
        "ear-a",
        "cmf-buds-2-plus",
        "cmf-buds-pro-2",
        "marshall-headphones",
        "marshall-earbuds",
      ],
    },
    {
      id: "gaming",
      name: "Gaming",
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=300&q=80",
      keywords: ["playstation", "ps5", "xbox", "gamepad", "controller", "gaming", "keyboard", "mouse", "speaker", "soundbar", "echo", "sony-ps5"],
    },
    {
      id: "watches",
      name: "Watches",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80",
      keywords: ["watch", "smartwatch", "apple watch", "galaxy watch", "pixel watch", "garmin", "fenix"],
      productIds: [
        "apple-watch",
        "apple-watch-ultra",
        "samsung-galaxy-watch",
        "google-pixel-watch",
        "garmin-fenix",
      ],
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

/**
 * Nested subcategories for Gaming under Electronics
 */
export const GAMING_SUBCATEGORIES: Subcategory[] = [
  {
    id: "console-controllers",
    name: "Console Controllers",
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=300&q=80",
    keywords: ["controller", "gamepad", "dualsense", "playstation 5 console", "evofox deck"],
    productIds: [
      "dualsense-wireless-controller-white",
      "zebronics-max-fury-wired-gamepad",
      "playstation-5-console-standard",
      "playstation-5-console-digital",
      "evofox-deck-2-smartphone-wireless-gaming-controller",
      "zebronics-zeb-max-link-plus-wireless-gamepad",
    ],
  },
  {
    id: "games",
    name: "Games",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=300&q=80",
    keywords: ["ps5", "game", "ghost of yotei", "spider-man", "last of us", "astro bot", "god of war", "gran turismo", "uncharted"],
    productIds: [
      "sony-ps5-ghost-of-yotei",
      "sony-ps5-marvels-spider-man-miles-morales",
      "sony-ps5-the-last-of-us-part-ii-remastered",
      "sony-ps5-marvel-tokon-fighting-souls",
      "sony-ps5-astro-bot",
      "playstation-god-of-war-ragnarok",
      "sony-gran-turismo-2",
      "sony-ps5-spider-man-2",
      "sony-ghost-of-tsushima",
      "sony-uncharted-legacy-of-thieves-collection",
    ],
  },
  {
    id: "keyboards",
    name: "Keyboards",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80",
    keywords: ["keyboard", "keys", "pebble", "companion", "rapoo", "katana", "logitech-mk240", "portronics-wireless-keyboard"],
    productIds: [
      "logitech-pebble-keys-2-k380s-graphite",
      "zebronics-companion-201-24ghz-wireless-keyboard",
      "rapoo-e9050l-bluetooth-wireless-multi-device-keyboard",
      "evofox-katana-x2-tkl-wired-mechanical-gaming-keyboard",
      "logitech-mk240-nano-wireless-usb-keyboard",
      "portronics-wireless-keyboard",
    ],
  },
  {
    id: "mouse",
    name: "Mouse",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=300&q=80",
    keywords: ["mouse", "g502", "g402", "shark lite", "banshee", "toad 8", "war m"],
    productIds: [
      "logitech-g502-hero-high-performance-gaming-mouse",
      "logitech-g402-hyperion-fury-usb-wired-gaming-mouse",
      "zebronics-shark-lite-gaming-mouse",
      "evofox-banshee-tri-mode-wireless-gaming-mouse",
      "portronics-toad-8-transparent-wireless-bluetooth-mouse",
      "zebronics-war-m-wired-gaming-mouse",
    ],
  },
  {
    id: "speakers",
    name: "Speakers",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=300&q=80",
    keywords: ["speaker", "soundbar", "echo", "alexa", "jbl go", "partypal"],
    productIds: [
      "sony-new-sa-d40m2-speaker",
      "amazon-echo-show-8",
      "amazon-echo-4th-gen",
      "jbl-cinema-sb150-200w-soundbar",
      "sony-srs-xb100-wireless-bluetooth-speaker",
      "jbl-go-4-wireless-bluetooth-speaker",
      "philips-tax2208-party-speaker",
      "boat-partypal-65-pro",
    ],
  },
];

export const ALL_GAMING_PRODUCT_IDS = GAMING_SUBCATEGORIES.flatMap(
  (s) => s.productIds || []
);

export function getSubcategoriesForCategory(categorySlug: string): Subcategory[] {
  return CATEGORY_SUBCATEGORIES[categorySlug.toLowerCase()] || [];
}

export function getGamingSubcategories(): Subcategory[] {
  return GAMING_SUBCATEGORIES;
}

export function getSubcategoryDef(categorySlug: string, subId: string): Subcategory | undefined {
  const subs = getSubcategoriesForCategory(categorySlug);
  return subs.find((s) => s.id === subId.toLowerCase());
}

export function getGamingSubcategoryDef(childId: string): Subcategory | undefined {
  return GAMING_SUBCATEGORIES.find((s) => s.id === childId.toLowerCase());
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

  // Food subcategory exact matching when productIds defined
  if (normalizedCategory === "food" && subDef.productIds && subDef.productIds.length > 0) {
    return subDef.productIds.includes(item.slug);
  }

  // Exact product ID match if available
  if (subDef.productIds && subDef.productIds.length > 0) {
    if (subDef.productIds.includes(item.slug)) {
      return true;
    }
  }

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

  // Gaming overall under Electronics
  if (normalizedCategory === "electronics" && normalizedSubId === "gaming") {
    return ALL_GAMING_PRODUCT_IDS.includes(item.slug);
  }

  const nameLower = item.name.toLowerCase();
  const slugLower = item.slug.toLowerCase();

  return subDef.keywords.some(
    (kw) => nameLower.includes(kw.toLowerCase()) || slugLower.includes(kw.toLowerCase())
  );
}

export function matchesGamingChild(
  item: { name: string; slug: string },
  childId: string
): boolean {
  const childDef = getGamingSubcategoryDef(childId);
  if (!childDef) return ALL_GAMING_PRODUCT_IDS.includes(item.slug);

  if (childDef.productIds && childDef.productIds.includes(item.slug)) {
    return true;
  }

  const nameLower = item.name.toLowerCase();
  const slugLower = item.slug.toLowerCase();

  return childDef.keywords.some(
    (kw) => nameLower.includes(kw.toLowerCase()) || slugLower.includes(kw.toLowerCase())
  );
}
