import prisma from "@/lib/prisma";
import { ensureUniqueSlug, slugify } from "@/lib/slug";
import { getFullFoodCatalog } from "@/lib/food-catalog";
import { getFullDrinksCatalog } from "@/lib/drinks-catalog";
import { getFullFashionCatalog } from "@/lib/fashion-catalog";
import { getFullMobilesCatalog } from "@/lib/mobiles-catalog";
import { getFullBeautyCatalog } from "@/lib/beauty-catalog";
import { getFullElectronicsCatalog } from "@/lib/electronics-catalog";
import { getFullVehiclesCatalog } from "@/lib/vehicles-catalog";
import {
  getEntertainmentProductImage,
  getSubscriptionsProductImage,
  getFitnessProductImage,
  DEFAULT_ENTERTAINMENT_IMAGE,
  DEFAULT_SUBSCRIPTIONS_IMAGE,
  DEFAULT_FITNESS_IMAGE,
} from "@/lib/product-images";

type CatalogSeedDefinition = {
  name: string;
  category: string;
  imageUrl?: string;
  shortDescription?: string;
  description?: string;
  featured?: boolean;
};

type CategorySeedDefinition = {
  name: string;
  slug: string;
  icon: string;
  description: string;
  items: Array<Omit<CatalogSeedDefinition, "category">>;
};

const ENTERTAINMENT_ITEMS = [
  "Concert Ticket",
  "Movie Ticket",
  "Music Festival Pass",
  "Comedy Show Ticket",
];

const SUBSCRIPTIONS_ITEMS = [
  "ChatGPT Plus",
  "ChatGPT Pro",
  "Claude Pro",
  "Claude Max",
  "X Premium",
  "X Premium+",
  "Netflix Standard",
  "Netflix Premium",
  "Prime Video Subscription",
  "Hotstar Subscription",
  "Apple TV Subscription",
  "Google AI Plus",
  "Google AI Pro",
  "Google AI Ultra",
];

const FITNESS_ITEMS = [
  "Gym Membership",
  "Running Shoes",
  "Fitness Watch",
  "Dumbbell Set",
  "Bicycle",
  "Protein Supplement",
  "Yoga Mat",
  "Kettlebell Set",
];

function itemSlug(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/**
 * The ONLY 10 top-level categories allowed in Plugd.
 */
const CATEGORY_SEEDS: CategorySeedDefinition[] = [
  // 1. FOOD
  {
    name: "Food",
    slug: "food",
    icon: "Utensils",
    description: "Everyday meals, comfort food, and cravings from across India.",
    items: getFullFoodCatalog().map((item) => ({
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 2. DRINKS
  {
    name: "Drinks",
    slug: "drinks",
    icon: "Coffee",
    description: "Beverages, refreshments, and drink options for every mood.",
    items: getFullDrinksCatalog().map((item) => ({
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 3. FASHION
  {
    name: "Fashion",
    slug: "fashion",
    icon: "Shirt",
    description: "Style, staples, and statement pieces creators love sharing.",
    items: getFullFashionCatalog().map((item) => ({
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 4. MOBILE
  {
    name: "Mobile",
    slug: "mobile",
    icon: "Smartphone",
    description: "Next-gen flagship smartphones and pro tablets.",
    items: getFullMobilesCatalog().map((item) => ({
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 5. BEAUTY
  {
    name: "Beauty",
    slug: "beauty",
    icon: "Sparkles",
    description: "Beauty, skincare, grooming, and personal care wishlist staples.",
    items: getFullBeautyCatalog().map((item) => ({
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 6. ENTERTAINMENT
  {
    name: "Entertainment",
    slug: "entertainment",
    icon: "Ticket",
    description: "Events, culture, and leisure experiences worth sharing publicly.",
    items: ENTERTAINMENT_ITEMS.map((name, idx) => ({
      name,
      imageUrl: getEntertainmentProductImage(itemSlug(name)) || DEFAULT_ENTERTAINMENT_IMAGE,
      shortDescription: "",
      description: "",
      featured: idx < 2,
    })),
  },
  // 7. SUBSCRIPTIONS
  {
    name: "Subscriptions",
    slug: "subscriptions",
    icon: "BadgeCheck",
    description: "Digital memberships and recurring tools creators actually use.",
    items: SUBSCRIPTIONS_ITEMS.map((name, idx) => ({
      name,
      imageUrl: getSubscriptionsProductImage(itemSlug(name)) || DEFAULT_SUBSCRIPTIONS_IMAGE,
      shortDescription: "",
      description: "",
      featured: idx < 4,
    })),
  },
  // 8. ELECTRONICS
  {
    name: "Electronics",
    slug: "electronics",
    icon: "Laptop",
    description: "Tech upgrades, creator gear, and hardware essentials worth wishing for.",
    items: getFullElectronicsCatalog().map((item) => ({
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 9. FITNESS
  {
    name: "Fitness",
    slug: "fitness",
    icon: "Dumbbell",
    description: "Health, training, and sports wishlist items that feel motivating.",
    items: FITNESS_ITEMS.map((name, idx) => ({
      name,
      imageUrl: getFitnessProductImage(itemSlug(name)) || DEFAULT_FITNESS_IMAGE,
      shortDescription: "",
      description: "",
      featured: idx < 3,
    })),
  },
  // 10. VEHICLES
  {
    name: "Vehicles",
    slug: "vehicles",
    icon: "Car",
    description: "Bikes, cars, supercars, and hypercars for ambitious personal goals.",
    items: getFullVehiclesCatalog().map((item) => ({
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
];

export const ALLOWED_CATEGORY_SLUGS = [
  "food",
  "drinks",
  "fashion",
  "mobile",
  "beauty",
  "entertainment",
  "subscriptions",
  "electronics",
  "fitness",
  "vehicles",
];

export const SEARCH_PLACEHOLDERS = [
  "Search for iPhone 17 Pro Max",
  "Search for Biryani",
  "Search for Nike Air Force 1",
  "Search for Red Bull Energy Drink",
  "Search for Porsche 911 GT3 RS",
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

    return {
      name: item.name,
      slug,
      categorySlug: item.category,
      image: item.imageUrl || null,
      shortDescription: null,
      description: null,
      featured: Boolean(item.featured),
      active: true,
      displayOrder: index,
    };
  });
}

export async function ensureCatalogSeeded() {
  // 1. Identify and purge any obsolete categories not in the allowed list
  const existingCategories = await prisma.category.findMany({
    select: { id: true, slug: true },
  });

  const obsoleteCategories = existingCategories.filter(
    (c) => !ALLOWED_CATEGORY_SLUGS.includes(c.slug),
  );

  if (obsoleteCategories.length > 0) {
    const obsoleteIds = obsoleteCategories.map((c) => c.id);
    // Delete wishlist items linked to obsolete catalog items
    await prisma.wishlistItem.deleteMany({
      where: {
        catalogItem: {
          categoryId: { in: obsoleteIds },
        },
      },
    });
    // Delete obsolete catalog items
    await prisma.catalogItem.deleteMany({
      where: {
        categoryId: { in: obsoleteIds },
      },
    });
    // Delete obsolete categories
    await prisma.category.deleteMany({
      where: {
        id: { in: obsoleteIds },
      },
    });
  }

  // 2. Check if we are fully seeded with correct counts
  const categoryCount = await prisma.category.count({
    where: { slug: { in: ALLOWED_CATEGORY_SLUGS } },
  });
  const foodCount = await prisma.catalogItem.count({
    where: { category: { slug: "food" } },
  });
  const drinksCount = await prisma.catalogItem.count({
    where: { category: { slug: "drinks" } },
  });
  const mobileCount = await prisma.catalogItem.count({
    where: { category: { slug: "mobile" } },
  });
  const vehiclesCount = await prisma.catalogItem.count({
    where: { category: { slug: "vehicles" } },
  });
  const electronicsCount = await prisma.catalogItem.count({
    where: { category: { slug: "electronics" } },
  });

  if (
    categoryCount === 10 &&
    foodCount >= 90 &&
    drinksCount >= 18 &&
    mobileCount >= 21 &&
    vehiclesCount >= 130 &&
    electronicsCount >= 60
  ) {
    return;
  }

  // 3. Upsert the 10 allowed categories
  for (const category of getSeedCategories()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  const categoryMap = new Map(
    (
      await prisma.category.findMany({
        select: { id: true, slug: true },
      })
    ).map((category) => [category.slug, category.id]),
  );

  // 4. Upsert all catalog items with NO descriptions
  for (const item of getSeedCatalogItems()) {
    const categoryId = categoryMap.get(item.categorySlug);
    if (!categoryId) continue;

    await prisma.catalogItem.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        categoryId,
        image: item.image,
        shortDescription: null,
        description: null,
        featured: item.featured,
        active: item.active,
        displayOrder: item.displayOrder,
      },
      create: {
        name: item.name,
        slug: item.slug,
        categoryId,
        image: item.image,
        shortDescription: null,
        description: null,
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
    shortDescription: null,
    description: null,
    externalUrl: wishlistItem.externalUrl,
    personalNote: wishlistItem.personalNote,
    isFeatured: wishlistItem.isFeatured,
    isPublished: wishlistItem.isPublished,
    displayOrder: wishlistItem.displayOrder,
    categoryId: source?.categoryId ?? wishlistItem.categoryId,
    category: source?.category ?? wishlistItem.category ?? null,
  };
}
