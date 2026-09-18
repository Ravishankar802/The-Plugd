import prisma from "@/lib/prisma";
import { ensureUniqueSlug, slugify } from "@/lib/slug";
import { getFullFoodCatalog, FOOD_NAMES } from "@/lib/food-catalog";
import { getFullDrinksCatalog } from "@/lib/drinks-catalog";
import { getFullFashionCatalog, FASHION_TOP_PICKS } from "@/lib/fashion-catalog";
import { getFullMobilesCatalog } from "@/lib/mobiles-catalog";
import { getFullBeautyCatalog } from "@/lib/beauty-catalog";
import { getFullEntertainmentCatalog } from "@/lib/entertainment-catalog";
import { getFullElectronicsCatalog } from "@/lib/electronics-catalog";
import { getFullFitnessCatalog } from "@/lib/fitness-catalog";
import { getFullToysCatalog } from "@/lib/toys-catalog";
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
  slug?: string;
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
  "IPL Match Ticket",
  "Cricket Series Pass",
  "Anime Box Set",
  "Vinyl Player",
  "Board Game Night",
  "Theater Experience",
];

const SUBSCRIPTIONS_ITEMS = [
  "ChatGPT Plus",
  "ChatGPT Pro",
  "Claude Pro",
  "Claude Max",
  "X Premium",
  "X Premium+",
  "Netflix Standard",
  "Prime Video Subscription",
  "Hotstar Subscription",
  "Apple TV Subscription",
  "Google AI Plus",
  "Google AI Pro",
  "Google AI Ultra",
  "Spotify Premium",
  "YouTube Premium",
  "Amazon Prime",
  "Canva Pro",
  "Adobe Creative Cloud",
  "GitHub Pro",
  "Notion Plus",
  "Figma Pro",
  "Midjourney Subscription",
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
      slug: item.id,
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
      slug: item.id,
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
      slug: item.id,
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
    items: getFullEntertainmentCatalog().map((item) => ({
      slug: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
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
    items: getFullFitnessCatalog().map((item) => ({
      slug: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
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
  // 11. TOYS
  {
    name: "Toys",
    slug: "toys",
    icon: "Gamepad2",
    description: "Retro collectibles, gaming gear, figures, and creative toys.",
    items: getFullToysCatalog().map((item) => ({
      slug: item.id,
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
  "toys",
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
    const slug = item.slug ? ensureUniqueSlug(item.slug, usedSlugs) : ensureUniqueSlug(slugify(item.name), usedSlugs);

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

let isCatalogSeededInMemory = false;
let catalogSeedPromise: Promise<void> | null = null;

export async function ensureCatalogSeeded(): Promise<void> {
  if (isCatalogSeededInMemory) return;
  if (catalogSeedPromise) return catalogSeedPromise;

  catalogSeedPromise = (async () => {
    try {
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

      // 2. Check if we are fully seeded with correct counts in parallel
      const [
        categoryCount,
        foodCount,
        drinksCount,
        mobileCount,
        vehiclesCount,
        electronicsCount,
        toysCount,
      ] = await Promise.all([
        prisma.category.count({ where: { slug: { in: ALLOWED_CATEGORY_SLUGS } } }),
        prisma.catalogItem.count({ where: { category: { slug: "food" } } }),
        prisma.catalogItem.count({ where: { category: { slug: "drinks" } } }),
        prisma.catalogItem.count({ where: { category: { slug: "mobile" } } }),
        prisma.catalogItem.count({ where: { category: { slug: "vehicles" } } }),
        prisma.catalogItem.count({ where: { category: { slug: "electronics" } } }),
        prisma.catalogItem.count({ where: { category: { slug: "toys" } } }),
      ]);

      if (
        categoryCount === 11 &&
        foodCount >= FOOD_NAMES.length &&
        drinksCount >= 58 &&
        mobileCount >= 21 &&
        vehiclesCount >= 131 &&
        electronicsCount >= 70 &&
        toysCount >= 50
      ) {
        isCatalogSeededInMemory = true;
        return;
      }

      // 3. Upsert the 11 allowed categories
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
      isCatalogSeededInMemory = true;
    } catch (error) {
      console.error("[SEED_CATALOG_ERROR]", error);
    } finally {
      catalogSeedPromise = null;
    }
  })();

  return catalogSeedPromise;
}

// In-memory caching for near-instant category and items rendering (5-min TTL)
export type CachedCategory = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  displayOrder: number;
};

export type CachedCatalogItem = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  categoryId: string;
  featured: boolean;
  displayOrder: number;
};

let cachedCategories: { data: CachedCategory[]; expiresAt: number } | null = null;
const cachedItemsByCategory = new Map<string, { data: CachedCatalogItem[]; expiresAt: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

export async function getCachedCategories(): Promise<CachedCategory[]> {
  const now = Date.now();
  if (cachedCategories && cachedCategories.expiresAt > now) {
    return cachedCategories.data;
  }
  const categories = await prisma.category.findMany({
    where: { active: true },
    select: {
      id: true,
      name: true,
      slug: true,
      icon: true,
      description: true,
      displayOrder: true,
    },
    orderBy: { displayOrder: "asc" },
  });
  cachedCategories = { data: categories, expiresAt: now + CACHE_TTL_MS };
  return categories;
}

const DUPLICATE_FALLBACK_SNACK_SLUGS = [
  "lay-s-classic-salted",
  "lay-s-magic-masala",
  "haldiram-s-aloo-bhujia",
  "haldiram-s-bhujia-sev",
  "haldiram-s-mixture",
];

export async function getCachedCategoryItems(categoryId: string): Promise<CachedCatalogItem[]> {
  const now = Date.now();
  const cached = cachedItemsByCategory.get(categoryId);
  if (cached && cached.expiresAt > now) {
    return cached.data;
  }
  // Asynchronously purge duplicate fallback snack records from DB
  prisma.catalogItem
    .deleteMany({
      where: { slug: { in: DUPLICATE_FALLBACK_SNACK_SLUGS } },
    })
    .catch(() => {});

  let items = await prisma.catalogItem.findMany({
    where: {
      active: true,
      categoryId,
      slug: { notIn: DUPLICATE_FALLBACK_SNACK_SLUGS },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
      categoryId: true,
      featured: true,
      displayOrder: true,
    },
    orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { name: "asc" }],
  });

  // Ensure Drinks items are fully seeded in DB (e.g. on production serverless environments)
  const drinksCat = await prisma.category.findUnique({ where: { slug: "drinks" }, select: { id: true } });
  if (drinksCat && categoryId === drinksCat.id && items.length < 58) {
    const fullDrinks = getFullDrinksCatalog();
    const existingSlugs = new Set(items.map((i) => i.slug));
    const missing = fullDrinks.filter((d) => !existingSlugs.has(d.id));

    if (missing.length > 0) {
      await prisma.catalogItem.createMany({
        data: missing.map((d) => ({
          name: d.name,
          slug: d.id,
          categoryId: drinksCat.id,
          image: d.imageUrl,
          active: true,
          featured: Boolean(d.featured),
          displayOrder: d.displayOrder,
        })),
        skipDuplicates: true,
      });

      items = await prisma.catalogItem.findMany({
        where: {
          active: true,
          categoryId,
          slug: { notIn: DUPLICATE_FALLBACK_SNACK_SLUGS },
        },
        select: {
          id: true,
          name: true,
          slug: true,
          image: true,
          categoryId: true,
          featured: true,
          displayOrder: true,
        },
        orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { name: "asc" }],
      });
    }
  }

  // Ensure Mobile items are fully seeded in DB (e.g. on production serverless environments)
  const mobileCatSeed = await prisma.category.findUnique({ where: { slug: "mobile" }, select: { id: true } });
  if (mobileCatSeed && categoryId === mobileCatSeed.id && items.length < 25) {
    const fullMobiles = getFullMobilesCatalog();
    const existingSlugs = new Set(items.map((i) => i.slug));
    const missing = fullMobiles.filter((d) => !existingSlugs.has(d.id));

    if (missing.length > 0) {
      await prisma.catalogItem.createMany({
        data: missing.map((d, idx) => ({
          name: d.name,
          slug: d.id,
          categoryId: mobileCatSeed.id,
          image: d.imageUrl,
          active: true,
          featured: true,
          displayOrder: idx + 1,
        })),
        skipDuplicates: true,
      });

      items = await prisma.catalogItem.findMany({
        where: {
          active: true,
          categoryId,
          slug: { notIn: DUPLICATE_FALLBACK_SNACK_SLUGS },
        },
        select: {
          id: true,
          name: true,
          slug: true,
          image: true,
          categoryId: true,
          featured: true,
          displayOrder: true,
        },
        orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { name: "asc" }],
      });
    }
  }

  // If drinks category, ensure items with outdated fallback images are updated to authentic product images
  if (drinksCat && categoryId === drinksCat.id) {
    const fullDrinks = getFullDrinksCatalog();
    const imageBySlug = new Map(fullDrinks.map((d) => [d.id, d.imageUrl]));
    
    // Check if any drinks items have mismatched/outdated images
    const itemsToUpdate = items.filter((item) => {
      const targetUrl = imageBySlug.get(item.slug);
      return targetUrl && item.image !== targetUrl;
    });

    if (itemsToUpdate.length > 0) {
      // Asynchronously update in DB so it doesn't block the request
      Promise.all(
        itemsToUpdate.map((item) =>
          prisma.catalogItem.update({
            where: { id: item.id },
            data: { image: imageBySlug.get(item.slug)! },
          }).catch(() => {})
        )
      ).catch(() => {});

      // In-memory update for instant correctness
      items = items.map((item) => {
        const targetUrl = imageBySlug.get(item.slug);
        return targetUrl ? { ...item, image: targetUrl } : item;
      });
    }
  }

  // If fashion category, ensure items with outdated fallback images are updated to authentic product images
  const fashionCat = await prisma.category.findUnique({ where: { slug: "fashion" }, select: { id: true } });
  if (fashionCat && categoryId === fashionCat.id) {
    const fashionImageBySlug = new Map(FASHION_TOP_PICKS.map((d) => [d.slug, d.imageUrl]));
    const itemsToUpdate = items.filter((item) => {
      const targetUrl = fashionImageBySlug.get(item.slug);
      return targetUrl && item.image !== targetUrl;
    });

    if (itemsToUpdate.length > 0) {
      Promise.all(
        itemsToUpdate.map((item) =>
          prisma.catalogItem.update({
            where: { id: item.id },
            data: { image: fashionImageBySlug.get(item.slug)! },
          }).catch(() => {})
        )
      ).catch(() => {});

      items = items.map((item) => {
        const targetUrl = fashionImageBySlug.get(item.slug);
        return targetUrl ? { ...item, image: targetUrl } : item;
      });
    }
  }

  // If mobile category, ensure items with outdated fallback images are updated to authentic product images
  const mobileCat = await prisma.category.findUnique({ where: { slug: "mobile" }, select: { id: true } });
  if (mobileCat && categoryId === mobileCat.id) {
    const mobileImageBySlug = new Map(getFullMobilesCatalog().map((d) => [d.id, d.imageUrl]));
    const itemsToUpdate = items.filter((item) => {
      const targetUrl = mobileImageBySlug.get(item.slug);
      return targetUrl && item.image !== targetUrl;
    });

    if (itemsToUpdate.length > 0) {
      Promise.all(
        itemsToUpdate.map((item) =>
          prisma.catalogItem.update({
            where: { id: item.id },
            data: { image: mobileImageBySlug.get(item.slug)! },
          }).catch(() => {})
        )
      ).catch(() => {});

      items = items.map((item) => {
        const targetUrl = mobileImageBySlug.get(item.slug);
        return targetUrl ? { ...item, image: targetUrl } : item;
      });
    }
  }

  // If beauty category, ensure items with outdated fallback images are updated to authentic product images and missing items are seeded
  const beautyCat = await prisma.category.findUnique({ where: { slug: "beauty" }, select: { id: true } });
  if (beautyCat && categoryId === beautyCat.id) {
    const fullBeauty = getFullBeautyCatalog();
    const existingSlugs = new Set(items.map((i) => i.slug));
    const missing = fullBeauty.filter((b) => !existingSlugs.has(b.id));

    if (missing.length > 0) {
      await prisma.catalogItem.createMany({
        data: missing.map((b, idx) => ({
          name: b.name,
          slug: b.id,
          categoryId: beautyCat.id,
          image: b.imageUrl,
          active: true,
          featured: Boolean(b.featured),
          displayOrder: b.displayOrder ?? idx,
        })),
        skipDuplicates: true,
      });

      items = await prisma.catalogItem.findMany({
        where: {
          active: true,
          categoryId,
          slug: { notIn: DUPLICATE_FALLBACK_SNACK_SLUGS },
        },
        select: {
          id: true,
          name: true,
          slug: true,
          image: true,
          categoryId: true,
          featured: true,
          displayOrder: true,
        },
        orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { name: "asc" }],
      });
    }

    const beautyImageBySlug = new Map(fullBeauty.map((b) => [b.id, b.imageUrl]));
    const itemsToUpdate = items.filter((item) => {
      const targetUrl = beautyImageBySlug.get(item.slug);
      return targetUrl && item.image !== targetUrl;
    });

    if (itemsToUpdate.length > 0) {
      Promise.all(
        itemsToUpdate.map((item) =>
          prisma.catalogItem.update({
            where: { id: item.id },
            data: { image: beautyImageBySlug.get(item.slug)! },
          }).catch(() => {})
        )
      ).catch(() => {});

      items = items.map((item) => {
        const targetUrl = beautyImageBySlug.get(item.slug);
        return targetUrl ? { ...item, image: targetUrl } : item;
      });
    }
  }

  // If entertainment category, ensure items are exactly the 10 specified items with authentic images and correct order
  const entertainmentCat = await prisma.category.findUnique({ where: { slug: "entertainment" }, select: { id: true } });
  if (entertainmentCat && categoryId === entertainmentCat.id) {
    const fullEntertainment = getFullEntertainmentCatalog();
    const allowedSlugs = new Set(fullEntertainment.map((e) => e.id));

    // Remove any unauthorized/legacy items (e.g. book-stack or anything not in the 10 items)
    const unauthorizedItems = items.filter((i) => !allowedSlugs.has(i.slug));
    if (unauthorizedItems.length > 0) {
      await prisma.catalogItem.deleteMany({
        where: {
          categoryId: entertainmentCat.id,
          slug: { in: unauthorizedItems.map((i) => i.slug) },
        },
      }).catch(() => {});
    }

    // Seed any missing items from the 10
    const existingSlugs = new Set(items.map((i) => i.slug));
    const missing = fullEntertainment.filter((e) => !existingSlugs.has(e.id));
    if (missing.length > 0) {
      await prisma.catalogItem.createMany({
        data: missing.map((e) => ({
          name: e.name,
          slug: e.id,
          categoryId: entertainmentCat.id,
          image: e.imageUrl,
          active: true,
          featured: Boolean(e.featured),
          displayOrder: e.displayOrder,
        })),
        skipDuplicates: true,
      }).catch(() => {});
    }

    // Refresh items
    items = await prisma.catalogItem.findMany({
      where: {
        active: true,
        categoryId: entertainmentCat.id,
        slug: { in: Array.from(allowedSlugs) },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        categoryId: true,
        featured: true,
        displayOrder: true,
      },
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });

    // Update images if any differ
    const entertainmentImageBySlug = new Map(fullEntertainment.map((e) => [e.id, e.imageUrl]));
    const itemsToUpdate = items.filter((item) => {
      const targetUrl = entertainmentImageBySlug.get(item.slug);
      return targetUrl && item.image !== targetUrl;
    });

    if (itemsToUpdate.length > 0) {
      Promise.all(
        itemsToUpdate.map((item) =>
          prisma.catalogItem.update({
            where: { id: item.id },
            data: { image: entertainmentImageBySlug.get(item.slug)! },
          }).catch(() => {})
        )
      ).catch(() => {});

      items = items.map((item) => {
        const targetUrl = entertainmentImageBySlug.get(item.slug);
        return targetUrl ? { ...item, image: targetUrl } : item;
      });
    }

    // Sort strictly by the 10 items order
    const slugOrder = fullEntertainment.map((e) => e.id);
    items.sort((a, b) => slugOrder.indexOf(a.slug) - slugOrder.indexOf(b.slug));
  }

  // If subscriptions category, ensure images are synced to authentic URLs and missing items are seeded
  const subscriptionsCat = await prisma.category.findUnique({ where: { slug: "subscriptions" }, select: { id: true } });
  if (subscriptionsCat && categoryId === subscriptionsCat.id) {
    const subSlugs = SUBSCRIPTIONS_ITEMS.map((name) => itemSlug(name));
    const allowedSlugs = new Set([...subSlugs, "x-premium-2"]);

    // Remove any unauthorized/removed items (e.g. netflix-premium)
    const unauthorizedItems = items.filter((i) => !allowedSlugs.has(i.slug));
    if (unauthorizedItems.length > 0) {
      await prisma.catalogItem.deleteMany({
        where: {
          categoryId: subscriptionsCat.id,
          slug: { in: unauthorizedItems.map((i) => i.slug) },
        },
      }).catch(() => {});
    }

    const existingSlugs = new Set(items.map((i) => i.slug));
    const missing = SUBSCRIPTIONS_ITEMS
      .map((name, idx) => ({ name, slug: itemSlug(name), idx }))
      .filter((s) => !existingSlugs.has(s.slug) && !existingSlugs.has(s.slug === "x-premium-plus" ? "x-premium-2" : s.slug));

    if (missing.length > 0) {
      await prisma.catalogItem.createMany({
        data: missing.map((m) => ({
          name: m.name,
          slug: m.slug,
          categoryId: subscriptionsCat.id,
          image: getSubscriptionsProductImage(m.slug),
          active: true,
          featured: m.idx < 4,
          displayOrder: 548 + m.idx,
        })),
        skipDuplicates: true,
      }).catch(() => {});
    }

    // Refresh items
    items = await prisma.catalogItem.findMany({
      where: {
        active: true,
        categoryId: subscriptionsCat.id,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        categoryId: true,
        featured: true,
        displayOrder: true,
      },
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });

    // Update images if any differ
    const itemsToUpdate = items.filter((item) => {
      const targetUrl = getSubscriptionsProductImage(item.slug);
      return targetUrl && item.image !== targetUrl;
    });

    if (itemsToUpdate.length > 0) {
      Promise.all(
        itemsToUpdate.map((item) =>
          prisma.catalogItem.update({
            where: { id: item.id },
            data: { image: getSubscriptionsProductImage(item.slug) },
          }).catch(() => {})
        )
      ).catch(() => {});

      items = items.map((item) => {
        const targetUrl = getSubscriptionsProductImage(item.slug);
        return targetUrl ? { ...item, image: targetUrl } : item;
      });
    }

    // Sort in order of SUBSCRIPTIONS_ITEMS
    items.sort((a, b) => {
      const idxA = subSlugs.indexOf(a.slug) !== -1 ? subSlugs.indexOf(a.slug) : subSlugs.indexOf(a.slug.replace("-2", "-plus"));
      const idxB = subSlugs.indexOf(b.slug) !== -1 ? subSlugs.indexOf(b.slug) : subSlugs.indexOf(b.slug.replace("-2", "-plus"));
      return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
    });
  }

  // If electronics category, ensure images are synced to authentic URLs and missing items are seeded
  const electronicsCat = await prisma.category.findUnique({ where: { slug: "electronics" }, select: { id: true } });
  if (electronicsCat && categoryId === electronicsCat.id) {
    const fullElectronics = getFullElectronicsCatalog();
    const allowedSlugs = new Set(fullElectronics.map((e) => e.id));

    // Remove any unauthorized/removed items
    const unauthorizedItems = items.filter((i) => !allowedSlugs.has(i.slug));
    if (unauthorizedItems.length > 0) {
      await prisma.catalogItem.deleteMany({
        where: {
          categoryId: electronicsCat.id,
          slug: { in: unauthorizedItems.map((i) => i.slug) },
        },
      }).catch(() => {});
    }

    const existingSlugs = new Set(items.map((i) => i.slug));
    const missing = fullElectronics.filter((e) => !existingSlugs.has(e.id));

    if (missing.length > 0) {
      await prisma.catalogItem.createMany({
        data: missing.map((m, idx) => ({
          name: m.name,
          slug: m.id,
          categoryId: electronicsCat.id,
          image: m.imageUrl,
          active: true,
          featured: Boolean(m.featured),
          displayOrder: m.displayOrder ?? idx,
        })),
        skipDuplicates: true,
      }).catch(() => {});
    }

    // Refresh items
    items = await prisma.catalogItem.findMany({
      where: {
        active: true,
        categoryId: electronicsCat.id,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        categoryId: true,
        featured: true,
        displayOrder: true,
      },
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });

    // Update images if any differ
    const electronicsImageBySlug = new Map(fullElectronics.map((e) => [e.id, e.imageUrl]));
    const itemsToUpdate = items.filter((item) => {
      const targetUrl = electronicsImageBySlug.get(item.slug);
      return targetUrl && item.image !== targetUrl;
    });

    if (itemsToUpdate.length > 0) {
      Promise.all(
        itemsToUpdate.map((item) =>
          prisma.catalogItem.update({
            where: { id: item.id },
            data: { image: electronicsImageBySlug.get(item.slug)! },
          }).catch(() => {})
        )
      ).catch(() => {});

      items = items.map((item) => {
        const targetUrl = electronicsImageBySlug.get(item.slug);
        return targetUrl ? { ...item, image: targetUrl } : item;
      });
    }

    // Sort strictly by the 157 items order
    const slugOrder = fullElectronics.map((e) => e.id);
    items.sort((a, b) => slugOrder.indexOf(a.slug) - slugOrder.indexOf(b.slug));
  }

  // If fitness category, ensure images are synced to authentic URLs and missing items are seeded
  const fitnessCat = await prisma.category.findUnique({ where: { slug: "fitness" }, select: { id: true } });
  if (fitnessCat && categoryId === fitnessCat.id) {
    const fullFitness = getFullFitnessCatalog();
    const allowedSlugs = new Set(fullFitness.map((f) => f.id));

    const unauthorizedItems = items.filter((i) => !allowedSlugs.has(i.slug));
    if (unauthorizedItems.length > 0) {
      await prisma.catalogItem.deleteMany({
        where: {
          categoryId: fitnessCat.id,
          slug: { in: unauthorizedItems.map((i) => i.slug) },
        },
      }).catch(() => {});
    }

    const existingSlugs = new Set(items.map((i) => i.slug));
    const missing = fullFitness.filter((f) => !existingSlugs.has(f.id));

    if (missing.length > 0) {
      await prisma.catalogItem.createMany({
        data: missing.map((m, idx) => ({
          name: m.name,
          slug: m.id,
          categoryId: fitnessCat.id,
          image: m.imageUrl,
          active: true,
          featured: Boolean(m.featured),
          displayOrder: m.displayOrder ?? idx,
        })),
        skipDuplicates: true,
      }).catch(() => {});
    }

    items = await prisma.catalogItem.findMany({
      where: {
        active: true,
        categoryId: fitnessCat.id,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        categoryId: true,
        featured: true,
        displayOrder: true,
      },
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });

    const fitnessImageBySlug = new Map(fullFitness.map((f) => [f.id, f.imageUrl]));
    const itemsToUpdate = items.filter((item) => {
      const targetUrl = fitnessImageBySlug.get(item.slug);
      return targetUrl && item.image !== targetUrl;
    });

    if (itemsToUpdate.length > 0) {
      Promise.all(
        itemsToUpdate.map((item) =>
          prisma.catalogItem.update({
            where: { id: item.id },
            data: { image: fitnessImageBySlug.get(item.slug)! },
          }).catch(() => {})
        )
      ).catch(() => {});

      items = items.map((item) => {
        const targetUrl = fitnessImageBySlug.get(item.slug);
        return targetUrl ? { ...item, image: targetUrl } : item;
      });
    }

    const slugOrder = fullFitness.map((f) => f.id);
    items.sort((a, b) => slugOrder.indexOf(a.slug) - slugOrder.indexOf(b.slug));
  }

  // If toys category, ensure images are synced to authentic URLs and missing items are seeded
  const toysCat = await prisma.category.findUnique({ where: { slug: "toys" }, select: { id: true } });
  if (toysCat && categoryId === toysCat.id) {
    const fullToys = getFullToysCatalog();
    const allowedSlugs = new Set(fullToys.map((t) => t.id));

    const unauthorizedItems = items.filter((i) => !allowedSlugs.has(i.slug));
    if (unauthorizedItems.length > 0) {
      await prisma.catalogItem.deleteMany({
        where: {
          categoryId: toysCat.id,
          slug: { in: unauthorizedItems.map((i) => i.slug) },
        },
      }).catch(() => {});
    }

    const existingSlugs = new Set(items.map((i) => i.slug));
    const missing = fullToys.filter((t) => !existingSlugs.has(t.id));

    if (missing.length > 0) {
      await prisma.catalogItem.createMany({
        data: missing.map((m, idx) => ({
          name: m.name,
          slug: m.id,
          categoryId: toysCat.id,
          image: m.imageUrl,
          active: true,
          featured: Boolean(m.featured),
          displayOrder: m.displayOrder ?? idx,
        })),
        skipDuplicates: true,
      }).catch(() => {});
    }

    items = await prisma.catalogItem.findMany({
      where: {
        active: true,
        categoryId: toysCat.id,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        categoryId: true,
        featured: true,
        displayOrder: true,
      },
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });

    const toysImageBySlug = new Map(fullToys.map((t) => [t.id, t.imageUrl]));
    const itemsToUpdate = items.filter((item) => {
      const targetUrl = toysImageBySlug.get(item.slug);
      return targetUrl && item.image !== targetUrl;
    });

    if (itemsToUpdate.length > 0) {
      Promise.all(
        itemsToUpdate.map((item) =>
          prisma.catalogItem.update({
            where: { id: item.id },
            data: { image: toysImageBySlug.get(item.slug)! },
          }).catch(() => {})
        )
      ).catch(() => {});

      items = items.map((item) => {
        const targetUrl = toysImageBySlug.get(item.slug);
        return targetUrl ? { ...item, image: targetUrl } : item;
      });
    }

    const slugOrder = fullToys.map((t) => t.id);
    items.sort((a, b) => slugOrder.indexOf(a.slug) - slugOrder.indexOf(b.slug));
  }

  // If vehicles category, ensure images are synced to authentic URLs and missing items are seeded
  const vehiclesCat = await prisma.category.findUnique({ where: { slug: "vehicles" }, select: { id: true } });
  if (vehiclesCat && categoryId === vehiclesCat.id) {
    const fullVehicles = getFullVehiclesCatalog();
    const allowedSlugs = new Set(fullVehicles.map((v) => v.id));

    const unauthorizedItems = items.filter((i) => !allowedSlugs.has(i.slug));
    if (unauthorizedItems.length > 0) {
      await prisma.catalogItem.deleteMany({
        where: {
          categoryId: vehiclesCat.id,
          slug: { in: unauthorizedItems.map((i) => i.slug) },
        },
      }).catch(() => {});
    }

    const existingSlugs = new Set(items.map((i) => i.slug));
    const missing = fullVehicles.filter((v) => !existingSlugs.has(v.id));

    if (missing.length > 0) {
      await prisma.catalogItem.createMany({
        data: missing.map((m, idx) => ({
          name: m.name,
          slug: m.id,
          categoryId: vehiclesCat.id,
          image: m.imageUrl,
          active: true,
          featured: Boolean(m.featured),
          displayOrder: m.displayOrder ?? idx,
        })),
        skipDuplicates: true,
      }).catch(() => {});
    }

    items = await prisma.catalogItem.findMany({
      where: {
        active: true,
        categoryId: vehiclesCat.id,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        categoryId: true,
        featured: true,
        displayOrder: true,
      },
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    });

    const vehiclesImageBySlug = new Map(fullVehicles.map((v) => [v.id, v.imageUrl]));
    const itemsToUpdate = items.filter((item) => {
      const targetUrl = vehiclesImageBySlug.get(item.slug);
      return targetUrl && item.image !== targetUrl;
    });

    if (itemsToUpdate.length > 0) {
      Promise.all(
        itemsToUpdate.map((item) =>
          prisma.catalogItem.update({
            where: { id: item.id },
            data: { image: vehiclesImageBySlug.get(item.slug)! },
          }).catch(() => {})
        )
      ).catch(() => {});

      items = items.map((item) => {
        const targetUrl = vehiclesImageBySlug.get(item.slug);
        return targetUrl ? { ...item, image: targetUrl } : item;
      });
    }

    const slugOrder = fullVehicles.map((v) => v.id);
    items.sort((a, b) => slugOrder.indexOf(a.slug) - slugOrder.indexOf(b.slug));
  }

  cachedItemsByCategory.set(categoryId, { data: items, expiresAt: now + CACHE_TTL_MS });
  return items;
}

export type ResolvedCatalogProduct = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  shortDescription?: string | null;
  description?: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
  };
};

/**
 * Universal catalog product resolver for product detail pages and metadata.
 * Ensures that products from any category (including Toys, Vehicles, and Fitness)
 * resolve to their authentic product records, canonical image URLs, and database records.
 */
export async function resolveCatalogProduct(rawSlug: string): Promise<ResolvedCatalogProduct | null> {
  if (!rawSlug) return null;
  const slug = decodeURIComponent(rawSlug).trim().toLowerCase();

  // 1. Direct Prisma lookup
  let item = await prisma.catalogItem.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (item) {
    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      image: item.image,
      shortDescription: item.shortDescription,
      description: item.description,
      category: item.category,
    };
  }

  // 2. Slug normalization and common aliases
  const aliases = [
    slug.replace("pokemon-", "pok-mon-"),
    slug.replace("pok-mon-", "pokemon-"),
    slug.replace("rubik-s-", "rubiks-"),
    slug.replace("rubiks-", "rubik-s-"),
    slug.replace("-3x3-", "-3-3-"),
    slug.replace("-3-3-", "-3x3-"),
    slug.replace("weightlifting-", "weightlighting-"),
    slug.replace("weightlighting-", "weightlifting-"),
    slug.replace("protein-", "protien-"),
    slug.replace("protien-", "protein-"),
    slug.replace("kettlebell-", "kettleball-"),
    slug.replace("kettleball-", "kettlebell-"),
  ].filter((a) => a !== slug);

  for (const alias of aliases) {
    const aliasItem = await prisma.catalogItem.findUnique({
      where: { slug: alias },
      include: { category: true },
    });
    if (aliasItem) {
      return {
        id: aliasItem.id,
        name: aliasItem.name,
        slug: aliasItem.slug,
        image: aliasItem.image,
        shortDescription: aliasItem.shortDescription,
        description: aliasItem.description,
        category: aliasItem.category,
      };
    }
  }

  // 3. Fallback catalog matching and self-healing DB upsert
  // Check Toys
  const fullToys = getFullToysCatalog();
  const toy = fullToys.find((t) => t.id === slug || aliases.includes(t.id));
  if (toy) {
    const category = await prisma.category.findUnique({ where: { slug: "toys" } });
    if (category) {
      const dbItem = await prisma.catalogItem.upsert({
        where: { slug: toy.id },
        update: {
          name: toy.name,
          image: toy.imageUrl,
          active: true,
          featured: Boolean(toy.featured),
        },
        create: {
          name: toy.name,
          slug: toy.id,
          categoryId: category.id,
          image: toy.imageUrl,
          active: true,
          featured: Boolean(toy.featured),
          displayOrder: toy.displayOrder,
        },
        include: { category: true },
      }).catch(() => null);

      if (dbItem) return dbItem;

      return {
        id: `toys-${toy.id}`,
        name: toy.name,
        slug: toy.id,
        image: toy.imageUrl,
        category,
      };
    }
  }

  // Check Vehicles
  const fullVehicles = getFullVehiclesCatalog();
  const veh = fullVehicles.find((v) => v.id === slug || aliases.includes(v.id));
  if (veh) {
    const category = await prisma.category.findUnique({ where: { slug: "vehicles" } });
    if (category) {
      const dbItem = await prisma.catalogItem.upsert({
        where: { slug: veh.id },
        update: {
          name: veh.name,
          image: veh.imageUrl,
          active: true,
          featured: Boolean(veh.featured),
        },
        create: {
          name: veh.name,
          slug: veh.id,
          categoryId: category.id,
          image: veh.imageUrl,
          active: true,
          featured: Boolean(veh.featured),
          displayOrder: veh.displayOrder,
        },
        include: { category: true },
      }).catch(() => null);

      if (dbItem) return dbItem;

      return {
        id: `vehicles-${veh.id}`,
        name: veh.name,
        slug: veh.id,
        image: veh.imageUrl,
        category,
      };
    }
  }

  // Check Fitness
  const fullFitness = getFullFitnessCatalog();
  const fit = fullFitness.find((f) => f.id === slug || aliases.includes(f.id));
  if (fit) {
    const category = await prisma.category.findUnique({ where: { slug: "fitness" } });
    if (category) {
      const dbItem = await prisma.catalogItem.upsert({
        where: { slug: fit.id },
        update: {
          name: fit.name,
          image: fit.imageUrl,
          active: true,
          featured: Boolean(fit.featured),
        },
        create: {
          name: fit.name,
          slug: fit.id,
          categoryId: category.id,
          image: fit.imageUrl,
          active: true,
          featured: Boolean(fit.featured),
          displayOrder: fit.displayOrder,
        },
        include: { category: true },
      }).catch(() => null);

      if (dbItem) return dbItem;

      return {
        id: `fitness-${fit.id}`,
        name: fit.name,
        slug: fit.id,
        image: fit.imageUrl,
        category,
      };
    }
  }

  // Check Electronics
  const fullElectronics = getFullElectronicsCatalog();
  const elec = fullElectronics.find((e) => e.id === slug || aliases.includes(e.id));
  if (elec) {
    const category = await prisma.category.findUnique({ where: { slug: "electronics" } });
    if (category) {
      const dbItem = await prisma.catalogItem.upsert({
        where: { slug: elec.id },
        update: { name: elec.name, image: elec.imageUrl, active: true },
        create: {
          name: elec.name,
          slug: elec.id,
          categoryId: category.id,
          image: elec.imageUrl,
          active: true,
          featured: Boolean(elec.featured),
          displayOrder: elec.displayOrder ?? 0,
        },
        include: { category: true },
      }).catch(() => null);
      if (dbItem) return dbItem;
      return { id: `electronics-${elec.id}`, name: elec.name, slug: elec.id, image: elec.imageUrl, category };
    }
  }

  // Check Drinks
  const fullDrinks = getFullDrinksCatalog();
  const drink = fullDrinks.find((d) => d.id === slug);
  if (drink) {
    const category = await prisma.category.findUnique({ where: { slug: "drinks" } });
    if (category) {
      const dbItem = await prisma.catalogItem.upsert({
        where: { slug: drink.id },
        update: { name: drink.name, image: drink.imageUrl, active: true },
        create: {
          name: drink.name,
          slug: drink.id,
          categoryId: category.id,
          image: drink.imageUrl,
          active: true,
          featured: Boolean(drink.featured),
          displayOrder: drink.displayOrder ?? 0,
        },
        include: { category: true },
      }).catch(() => null);
      if (dbItem) return dbItem;
      return { id: `drinks-${drink.id}`, name: drink.name, slug: drink.id, image: drink.imageUrl, category };
    }
  }

  // Check Mobiles
  const fullMobiles = getFullMobilesCatalog();
  const mobile = fullMobiles.find((m) => m.id === slug);
  if (mobile) {
    const category = await prisma.category.findUnique({ where: { slug: "mobile" } });
    if (category) {
      const dbItem = await prisma.catalogItem.upsert({
        where: { slug: mobile.id },
        update: { name: mobile.name, image: mobile.imageUrl, active: true },
        create: {
          name: mobile.name,
          slug: mobile.id,
          categoryId: category.id,
          image: mobile.imageUrl,
          active: true,
          featured: Boolean(mobile.featured),
          displayOrder: 0,
        },
        include: { category: true },
      }).catch(() => null);
      if (dbItem) return dbItem;
      return { id: `mobile-${mobile.id}`, name: mobile.name, slug: mobile.id, image: mobile.imageUrl, category };
    }
  }

  // Check Beauty
  const fullBeauty = getFullBeautyCatalog();
  const beauty = fullBeauty.find((b) => b.id === slug);
  if (beauty) {
    const category = await prisma.category.findUnique({ where: { slug: "beauty" } });
    if (category) {
      const dbItem = await prisma.catalogItem.upsert({
        where: { slug: beauty.id },
        update: { name: beauty.name, image: beauty.imageUrl, active: true },
        create: {
          name: beauty.name,
          slug: beauty.id,
          categoryId: category.id,
          image: beauty.imageUrl,
          active: true,
          featured: Boolean(beauty.featured),
          displayOrder: beauty.displayOrder ?? 0,
        },
        include: { category: true },
      }).catch(() => null);
      if (dbItem) return dbItem;
      return { id: `beauty-${beauty.id}`, name: beauty.name, slug: beauty.id, image: beauty.imageUrl, category };
    }
  }

  // Check Entertainment
  const fullEntertainment = getFullEntertainmentCatalog();
  const ent = fullEntertainment.find((e) => e.id === slug);
  if (ent) {
    const category = await prisma.category.findUnique({ where: { slug: "entertainment" } });
    if (category) {
      const dbItem = await prisma.catalogItem.upsert({
        where: { slug: ent.id },
        update: { name: ent.name, image: ent.imageUrl, active: true },
        create: {
          name: ent.name,
          slug: ent.id,
          categoryId: category.id,
          image: ent.imageUrl,
          active: true,
          featured: Boolean(ent.featured),
          displayOrder: ent.displayOrder ?? 0,
        },
        include: { category: true },
      }).catch(() => null);
      if (dbItem) return dbItem;
      return { id: `entertainment-${ent.id}`, name: ent.name, slug: ent.id, image: ent.imageUrl, category };
    }
  }

  // Check Food
  const fullFood = getFullFoodCatalog();
  const food = fullFood.find((f) => f.id === slug);
  if (food) {
    const category = await prisma.category.findUnique({ where: { slug: "food" } });
    if (category) {
      const dbItem = await prisma.catalogItem.upsert({
        where: { slug: food.id },
        update: { name: food.name, image: food.imageUrl, active: true },
        create: {
          name: food.name,
          slug: food.id,
          categoryId: category.id,
          image: food.imageUrl,
          active: true,
          featured: Boolean(food.featured),
          displayOrder: food.displayOrder ?? 0,
        },
        include: { category: true },
      }).catch(() => null);
      if (dbItem) return dbItem;
      return { id: `food-${food.id}`, name: food.name, slug: food.id, image: food.imageUrl, category };
    }
  }

  return null;
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
