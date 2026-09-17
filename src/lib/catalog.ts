import prisma from "@/lib/prisma";
import { ensureUniqueSlug, slugify } from "@/lib/slug";
import { getFullFoodCatalog, FOOD_NAMES } from "@/lib/food-catalog";
import { getFullDrinksCatalog } from "@/lib/drinks-catalog";
import { getFullFashionCatalog, FASHION_TOP_PICKS } from "@/lib/fashion-catalog";
import { getFullMobilesCatalog } from "@/lib/mobiles-catalog";
import { getFullBeautyCatalog } from "@/lib/beauty-catalog";
import { getFullEntertainmentCatalog } from "@/lib/entertainment-catalog";
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
  // 11. TOYS
  {
    name: "Toys",
    slug: "toys",
    icon: "Gamepad2",
    description: "Retro collectibles, gaming gear, figures, and creative toys.",
    items: [
      {
        name: "Retro Arcade Machine",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
        shortDescription: "",
        description: "",
        featured: true,
      },
      {
        name: "Lego Collector Edition",
        imageUrl: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=600&q=80",
        shortDescription: "",
        description: "",
        featured: true,
      },
      {
        name: "Gundam Model Kit",
        imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
        shortDescription: "",
        description: "",
        featured: true,
      },
      {
        name: "RC High-Speed Drone",
        imageUrl: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80",
        shortDescription: "",
        description: "",
        featured: false,
      },
      {
        name: "Anime Action Figure",
        imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
        shortDescription: "",
        description: "",
        featured: false,
      },
      {
        name: "Custom Mechanical Keyboard",
        imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
        shortDescription: "",
        description: "",
        featured: false,
      },
      {
        name: "Rubik's Speed Cube",
        imageUrl: "https://images.unsplash.com/photo-1591994843349-f415893b3a6b?auto=format&fit=crop&w=600&q=80",
        shortDescription: "",
        description: "",
        featured: false,
      },
      {
        name: "Diecast Supercar Model",
        imageUrl: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80",
        shortDescription: "",
        description: "",
        featured: false,
      },
    ],
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
        vehiclesCount >= 130 &&
        electronicsCount >= 70 &&
        toysCount >= 8
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

  cachedItemsByCategory.set(categoryId, { data: items, expiresAt: now + CACHE_TTL_MS });
  return items;
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
