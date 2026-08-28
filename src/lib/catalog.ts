import prisma from "@/lib/prisma";
import { ensureUniqueSlug, slugify } from "@/lib/slug";
import { getFullElectronicsCatalog } from "@/lib/electronics-catalog";
import { getFullMobilesCatalog } from "@/lib/mobiles-catalog";
import { getFullGamingCatalog } from "@/lib/gaming-catalog";
import { getFullFashionCatalog } from "@/lib/fashion-catalog";
import { getFullBeautyCatalog } from "@/lib/beauty-catalog";
import { getFullDrinksCatalog } from "@/lib/drinks-catalog";

type CatalogSeedDefinition = {
  name: string;
  category: string;
  emoji?: string;
  imageUrl?: string;
  shortDescription: string;
  description: string;
  featured?: boolean;
};

type CategorySeedDefinition = {
  name: string;
  slug: string;
  icon: string;
  description: string;
  items: Array<Omit<CatalogSeedDefinition, "category">>;
};

type RawItemSeed = [name: string, shortDescription: string, emoji: string, featured?: boolean];

function makeItems(list: RawItemSeed[]): Array<Omit<CatalogSeedDefinition, "category">> {
  return list.map(([name, shortDescription, emoji, featured]) => ({
    name,
    shortDescription,
    emoji,
    featured: Boolean(featured),
    description: `${name} sits in the Plugd catalog so creators can add it to their wishlist without ecommerce friction or fake prices.`,
  }));
}

function svgToDataUri(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.trim())}`;
}

function buildCatalogImage(name: string, category: string, emoji: string) {
  const safeName = name.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeCategory = category.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f0f11" />
          <stop offset="60%" stop-color="#1c1917" />
          <stop offset="100%" stop-color="#292524" />
        </linearGradient>
        <radialGradient id="accentGlow" cx="70%" cy="25%" r="60%">
          <stop offset="0%" stop-color="#ea580c" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#ea580c" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="cardLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#f97316" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#f97316" stop-opacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="800" height="800" rx="48" fill="url(#bgGrad)" />
      <rect width="800" height="800" rx="48" fill="url(#accentGlow)" />
      <rect x="24" y="24" width="752" height="752" rx="36" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
      
      <!-- Category Pill -->
      <rect x="56" y="56" width="${Math.max(160, safeCategory.length * 16 + 48)}" height="48" rx="24" fill="rgba(249,115,22,0.15)" stroke="rgba(249,115,22,0.3)" stroke-width="1.5" />
      <text x="76" y="88" fill="#fb923c" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" letter-spacing="1">${safeCategory.toUpperCase()}</text>
      
      <!-- Center Emoji Illustration -->
      <g transform="translate(400, 370)">
        <circle r="140" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="2" />
        <text text-anchor="middle" dominant-baseline="central" font-size="140">${emoji}</text>
      </g>
      
      <!-- Bottom Section -->
      <rect x="56" y="580" width="120" height="4" rx="2" fill="url(#cardLine)" />
      <text x="56" y="640" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800">${safeName}</text>
      <text x="56" y="690" fill="rgba(255,255,255,0.5)" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="500">Wishlist item</text>
      <text x="56" y="736" fill="#f97316" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700">Plugd • theplugd.com</text>
    </svg>
  `);
}

const CATEGORY_SEEDS: CategorySeedDefinition[] = [
  {
    name: "Electronics",
    slug: "electronics",
    icon: "Laptop",
    description: "Tech upgrades, creator gear, and everyday electronics worth wishing for.",
    items: getFullElectronicsCatalog().map((item) => ({
      name: item.name,
      shortDescription: item.description,
      description: `${item.name} (${item.brand} • ${item.subcategory}) — ${item.description}`,
      imageUrl: item.imageUrl,
      featured: item.featured,
    })),
  },
  {
    name: "Mobiles",
    slug: "mobiles",
    icon: "Smartphone",
    description: "Phones and mobile-first gadgets people ask for most often.",
    items: getFullMobilesCatalog().map((item) => ({
      name: item.name,
      shortDescription: item.description,
      description: `${item.name} (${item.brand} • ${item.subcategory}) — ${item.description}`,
      imageUrl: item.imageUrl,
      featured: item.featured,
    })),
  },
  {
    name: "Gaming",
    slug: "gaming",
    icon: "Gamepad2",
    description: "Console, PC, and setup upgrades for gamers and streamers.",
    items: getFullGamingCatalog().map((item) => ({
      name: item.name,
      shortDescription: item.description,
      description: `${item.name} (${item.brand} • ${item.subcategory}) — ${item.description}`,
      imageUrl: item.imageUrl,
      featured: item.featured,
    })),
  },
  {
    name: "Fashion",
    slug: "fashion",
    icon: "Shirt",
    description: "Style, staples, and statement pieces creators love sharing.",
    items: getFullFashionCatalog().map((item) => ({
      name: item.name,
      shortDescription: item.description,
      description: `${item.name} (${item.brand} • ${item.subcategory}) — ${item.description}`,
      imageUrl: item.imageUrl,
      featured: item.featured,
    })),
  },
  {
    name: "Beauty",
    slug: "beauty",
    icon: "Sparkles",
    description: "Beauty, skincare, grooming, and personal care wishlist staples.",
    items: getFullBeautyCatalog().map((item) => ({
      name: item.name,
      shortDescription: item.description,
      description: `${item.name} (${item.brand} • ${item.subcategory}) — ${item.description}`,
      imageUrl: item.imageUrl,
      featured: item.featured,
    })),
  },
  {
    name: "Food & Drinks",
    slug: "food-drinks",
    icon: "Coffee",
    description: "Everyday treats, meals, and comfort picks audiences love supporting.",
    items: getFullDrinksCatalog().map((item) => ({
      name: item.name,
      shortDescription: item.description,
      description: `${item.name} (${item.brand} • ${item.subcategory}) — ${item.description}`,
      imageUrl: item.imageUrl,
      featured: item.featured,
    })),
  },
  {
    name: "Travel",
    slug: "travel",
    icon: "Plane",
    description: "Trips, tickets, and travel dreams people want help making real.",
    items: makeItems([
      ["Goa Trip", "A quick escape with sun, food, and friends.", "🏖️"],
      ["Manali Trip", "A mountain reset for creators and couples.", "🏔️"],
      ["Kerala Trip", "Backwaters, food, and calm travel energy.", "🌴"],
      ["Dubai Trip", "A flashy city break with big-photo moments.", "🌆"],
      ["Japan Trip", "A dream destination for creators.", "🗾", true],
      ["Europe Trip", "A longer wishlist dream across cities and culture.", "🧳"],
      ["Flight Ticket", "A straightforward travel support item.", "✈️"],
      ["Hotel Stay", "A comfortable stay for a getaway or work trip.", "🏨"],
      ["Travel Backpacking Kit", "Essentials for budget travel adventures.", "🎒"],
      ["Passport Renewal Fund", "A practical travel step many people need.", "🛂"],
      ["Scuba Diving Trip", "An unforgettable underwater adventure.", "🤿"],
    ]),
  },
  {
    name: "Entertainment",
    slug: "entertainment",
    icon: "Ticket",
    description: "Events, culture, and leisure experiences worth sharing publicly.",
    items: makeItems([
      ["Movie Ticket", "A small, instantly understandable support item.", "🎬"],
      ["Concert Ticket", "A live-show wishlist favorite.", "🎟️", true],
      ["IPL Match Ticket", "A sports experience people love backing.", "🏏"],
      ["Cricket Series Pass", "For fans who never miss the big games.", "🏟️"],
      ["Music Festival Pass", "A bigger entertainment moment to look forward to.", "🎶"],
      ["Comedy Show Ticket", "A fun night out with zero fake commerce details.", "🎤"],
      ["Book Stack", "For readers building a better shelf.", "📚"],
      ["Anime Box Set", "A fandom wishlist item with personality.", "📺"],
      ["Vinyl Player", "A music-lover setup piece.", "🎵"],
      ["Board Game Night", "Shared entertainment for friends and family.", "♟️"],
      ["Theater Experience", "Live performing arts night.", "🎭"],
    ]),
  },
  {
    name: "Subscriptions",
    slug: "subscriptions",
    icon: "BadgeCheck",
    description: "Digital memberships and recurring tools creators actually use.",
    items: makeItems([
      ["Netflix", "Entertainment subscription support.", "📺"],
      ["Spotify Premium", "Music without interruptions.", "🎵"],
      ["YouTube Premium", "Cleaner viewing for daily use.", "▶️"],
      ["Amazon Prime", "Fast delivery and streaming bundled together.", "📦"],
      ["ChatGPT Plus", "A creativity and productivity upgrade.", "🤖", true],
      ["Canva Pro", "Design tools for thumbnails, decks, and content.", "🎨"],
      ["Adobe Creative Cloud", "A serious toolkit for creators.", "🖌️"],
      ["GitHub Pro", "A developer-friendly subscription pick.", "💻"],
      ["Notion Plus", "A better workspace for planning and notes.", "📝"],
      ["Figma Pro", "A design workflow upgrade.", "🧩"],
      ["Midjourney Subscription", "AI image generation for creative brainstorming.", "🎨"],
    ]),
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    icon: "Lamp",
    description: "Daily-life upgrades that make routines feel better.",
    items: makeItems([
      ["Books", "A small but meaningful lifestyle wish.", "📚"],
      ["Kindle", "A cleaner way to carry a whole reading list.", "📖"],
      ["Coffee Machine", "A home ritual upgrade.", "☕"],
      ["Work Desk", "A solid workspace foundation.", "🪵"],
      ["Ergonomic Chair", "Comfort that pays off every day.", "🪑"],
      ["Travel Backpack", "Useful for work, college, or trips.", "🎒"],
      ["Musical Instrument", "A creative hobby or serious practice tool.", "🎸"],
      ["Smart Home Starter Kit", "Little automations that make life easier.", "🏠"],
      ["Air Purifier", "A practical quality-of-life item.", "🌬️"],
      ["Reading Lamp", "A soft, focused light for late nights.", "💡"],
      ["White Noise Machine", "Better sleep and deeper focus.", "📻"],
    ]),
  },
  {
    name: "Education",
    slug: "education",
    icon: "GraduationCap",
    description: "Courses, fees, books, and growth-focused wishlist picks.",
    items: makeItems([
      ["Online Course", "A new skill without a full degree commitment.", "🎓"],
      ["Professional Certification", "A career-focused learning milestone.", "📜"],
      ["Programming Bootcamp", "A practical path into software.", "💻"],
      ["College Books", "A straightforward study expense.", "📚"],
      ["Exam Fee", "A real barrier many learners want help crossing.", "🧾"],
      ["Conference Ticket", "Exposure, networking, and learning in one.", "🎫"],
      ["Workshop Pass", "Hands-on learning with a short commitment.", "🛠️"],
      ["Language Course", "Learning for travel, work, or curiosity.", "🗣️"],
      ["Design Class", "Creative growth with practical output.", "✏️"],
      ["Mentorship Session", "One-on-one guidance that can change direction.", "🧭"],
      ["Creator Masterclass", "Level up storytelling, pacing, and production.", "🎬"],
    ]),
  },
  {
    name: "Fitness",
    slug: "fitness",
    icon: "Dumbbell",
    description: "Health, training, and sports wishlist items that feel motivating.",
    items: makeItems([
      ["Gym Membership", "A recurring fitness commitment.", "🏋️", true],
      ["Running Shoes", "A practical start for consistent movement.", "👟"],
      ["Fitness Watch", "Track workouts, sleep, and daily goals.", "⌚"],
      ["Dumbbell Set", "A home workout essential.", "🏋️"],
      ["Bicycle", "Fitness, fun, and mobility in one.", "🚲"],
      ["Cricket Bat", "For weekend games and serious practice.", "🏏"],
      ["Football", "A simple team-sport staple.", "⚽"],
      ["Tennis Racket", "A classic racket-sport upgrade.", "🎾"],
      ["Yoga Mat", "A calm, low-friction wellness item.", "🧘"],
      ["Protein Supplement", "Support for training and recovery.", "🥛"],
      ["Kettlebell Set", "Dynamic strength training at home.", "🏋️"],
    ]),
  },
  {
    name: "Vehicles",
    slug: "vehicles",
    icon: "Car",
    description: "From practical rides to ambitious aspirational vehicle goals.",
    items: makeItems([
      ["Bicycle", "A simple, practical mobility goal.", "🚲"],
      ["Electric Scooter", "An efficient city transport upgrade.", "🛴"],
      ["Motorcycle", "A bigger personal mobility dream.", "🏍️"],
      ["Royal Enfield", "A recognizable aspirational bike.", "🏍️"],
      ["BMW Motorcycle", "A premium riding goal.", "🏍️"],
      ["First Car", "A major milestone for many people.", "🚗"],
      ["Road Trip Van", "A more adventurous vehicle dream.", "🚐"],
      ["Mercedes", "An aspirational luxury car wish.", "🚘"],
      ["Porsche", "A bold dream item that people instantly get.", "🏎️", true],
      ["Driving Lessons Fund", "A practical step before the bigger goal.", "🪪"],
      ["Track Day Experience", "Feel real supercar performance on a circuit.", "🏁"],
    ]),
  },
  {
    name: "Home",
    slug: "home",
    icon: "House",
    description: "Household upgrades and comfort items that feel instantly relatable.",
    items: makeItems([
      ["Smart TV", "A bigger shared-screen experience at home.", "📺"],
      ["Sofa", "A comfort-first home upgrade.", "🛋️"],
      ["Bed Upgrade", "Better rest, better days.", "🛏️"],
      ["Refrigerator", "A major home essential.", "🧊"],
      ["Washing Machine", "A practical household milestone.", "🧺"],
      ["Air Conditioner", "A quality-of-life upgrade for hot months.", "❄️"],
      ["Coffee Machine", "Bring cafe energy home.", "☕"],
      ["Air Purifier", "A cleaner and calmer home environment.", "🌬️"],
      ["Bookshelf", "A tidy space for stories and display.", "📚"],
      ["Dining Table", "A home base for meals and gathering.", "🍽️"],
      ["Robot Vacuum", "Automated daily floor cleaning.", "🤖"],
    ]),
  },
  {
    name: "Dreams",
    slug: "dreams",
    icon: "Rocket",
    description: "Bigger, more aspirational wishes that stretch beyond simple products.",
    items: makeItems([
      ["Dream Studio", "A space built exactly for the work you want to make.", "🎛️", true],
      ["Start My Business", "A dream with real-world upside.", "🚀"],
      ["Travel the World", "A long-form life goal with huge emotional pull.", "🌍"],
      ["Make My First Film", "A creative ambition worth sharing publicly.", "🎥"],
      ["Launch My Album", "A music milestone with emotional weight.", "🎼"],
      ["Write My Book", "A deeply personal creative goal.", "📖"],
      ["Buy My First Car", "A milestone that sits between practical and aspirational.", "🚗"],
      ["Build My Gaming Setup", "A creator/gamer dream that fits the brand naturally.", "🕹️"],
      ["Open My Cafe", "A dream with story and identity baked in.", "☕"],
      ["Fund My Indie App", "A software dream framed as a wishlist item.", "📱"],
      ["Build Dream House", "An ultimate lifelong ambition.", "🏡"],
    ]),
  },
];

export const SEARCH_PLACEHOLDERS = [
  "Search for iPhone",
  "Search for headphones",
  "Search for a Japan trip",
  "Search for Red Bull",
  "Search for a gaming PC",
];

export function getSeedCategories() {
  return CATEGORY_SEEDS.map((category, categoryIndex) => ({
    name: category.name,
    slug: category.slug,
    icon: category.icon,
    description: category.description,
    active: true,
    displayOrder: categoryIndex,
  }));
}

export function getSeedCatalogItems() {
  const usedSlugs = new Set<string>();
  const flattened: CatalogSeedDefinition[] = CATEGORY_SEEDS.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      category: category.slug,
    })),
  );

  return flattened.map((item, index) => {
    const slug = ensureUniqueSlug(slugify(item.name), usedSlugs);
    const image =
      item.imageUrl ||
      (item.emoji ? buildCatalogImage(item.name, item.category.replace(/-/g, " "), item.emoji) : null);

    return {
      name: item.name,
      slug,
      categorySlug: item.category,
      image,
      shortDescription: item.shortDescription,
      description: item.description,
      featured: Boolean(item.featured),
      active: true,
      displayOrder: index,
    };
  });
}

export async function ensureCatalogSeeded() {
  const categoryCount = await prisma.category.count();
  const catalogCount = await prisma.catalogItem.count();
  const electronicsCount = await prisma.catalogItem.count({
    where: { category: { slug: "electronics" } },
  });
  const mobilesCount = await prisma.catalogItem.count({
    where: { category: { slug: "mobiles" } },
  });
  const gamingCount = await prisma.catalogItem.count({
    where: { category: { slug: "gaming" } },
  });
  const fashionCount = await prisma.catalogItem.count({
    where: { category: { slug: "fashion" } },
  });
  const beautyCount = await prisma.catalogItem.count({
    where: { category: { slug: "beauty" } },
  });
  const drinksCount = await prisma.catalogItem.count({
    where: { category: { slug: "food-drinks" } },
  });

  if (categoryCount >= 15 && catalogCount >= 500 && electronicsCount >= 100 && mobilesCount >= 75 && gamingCount >= 70 && fashionCount >= 50 && beautyCount >= 30 && drinksCount >= 200) {
    return;
  }

  for (const category of getSeedCategories()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  const categoryMap = new Map(
    (await prisma.category.findMany({
      select: { id: true, slug: true },
    })).map((category) => [category.slug, category.id]),
  );

  for (const item of getSeedCatalogItems()) {
    const categoryId = categoryMap.get(item.categorySlug);
    if (!categoryId) continue;

    await prisma.catalogItem.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        categoryId,
        image: item.image,
        shortDescription: item.shortDescription,
        description: item.description,
        featured: item.featured,
        active: item.active,
        displayOrder: item.displayOrder,
      },
      create: {
        name: item.name,
        slug: item.slug,
        categoryId,
        image: item.image,
        shortDescription: item.shortDescription,
        description: item.description,
        featured: item.featured,
        active: item.active,
        displayOrder: item.displayOrder,
      },
    });
  }
}

export function resolveWishlistItem(wishlistItem: {
  id: string;
  slug: string;
  itemType: "CATALOG" | "CUSTOM";
  name: string | null;
  image: string | null;
  shortDescription: string | null;
  description: string | null;
  externalUrl: string | null;
  personalNote: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  categoryId: string | null;
  category?: { id: string; name: string; slug: string; icon: string | null } | null;
  catalogItem?: {
    id: string;
    name: string;
    slug: string;
    image: string | null;
    shortDescription: string | null;
    description: string | null;
    categoryId: string;
    category?: { id: string; name: string; slug: string; icon: string | null } | null;
  } | null;
}) {
  const source = wishlistItem.catalogItem;

  return {
    id: wishlistItem.id,
    slug: wishlistItem.slug,
    itemType: wishlistItem.itemType,
    name: source?.name ?? wishlistItem.name ?? "Wishlist item",
    image: source?.image ?? wishlistItem.image,
    shortDescription: source?.shortDescription ?? wishlistItem.shortDescription,
    description: source?.description ?? wishlistItem.description,
    externalUrl: wishlistItem.externalUrl,
    personalNote: wishlistItem.personalNote,
    isFeatured: wishlistItem.isFeatured,
    isPublished: wishlistItem.isPublished,
    displayOrder: wishlistItem.displayOrder,
    categoryId: source?.categoryId ?? wishlistItem.categoryId,
    category: source?.category ?? wishlistItem.category ?? null,
  };
}
