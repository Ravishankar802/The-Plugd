import prisma from "@/lib/prisma";
import { ensureUniqueSlug, slugify } from "@/lib/slug";
import { getFullFashionCatalog, FASHION_TOP_PICKS } from "@/lib/fashion-catalog";
import { getFullMobilesCatalog } from "@/lib/mobiles-catalog";
import { getFullBeautyCatalog } from "@/lib/beauty-catalog";
import { getFullElectronicsCatalog } from "@/lib/electronics-catalog";
import {
  getFullCarsCatalog,
  getFullBikesCatalog,
  CARS_SLUGS,
  BIKES_SLUGS,
} from "@/lib/vehicles-catalog";
import {
  getSubscriptionsProductImage,
  DEFAULT_SUBSCRIPTIONS_IMAGE,
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

const SUBSCRIPTIONS_ITEMS = [
  "ChatGPT Plus",
  "ChatGPT Pro",
  "Claude Pro",
  "Claude Max",
  "X Premium",
  "X Premium+",
  "Perplexity Pro",
  "Perplexity Max",
  "Netflix Standard",
  "Netflix Premium",
  "Prime Video",
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

function itemSlug(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/**
 * The ONLY 11 top-level categories allowed in Plugd.
 */
const CATEGORY_SEEDS: CategorySeedDefinition[] = [
  // 1. Mobile
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
  // 2. Electronics
  {
    name: "Electronics",
    slug: "electronics",
    icon: "Laptop",
    description: "Tech upgrades, pro gear, and hardware essentials worth wishing for.",
    items: getFullElectronicsCatalog().map((item) => ({
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 3. Subscriptions
  {
    name: "Subscriptions",
    slug: "subscriptions",
    icon: "BadgeCheck",
    description: "Digital memberships and recurring tools people actually use.",
    items: SUBSCRIPTIONS_ITEMS.map((name, idx) => ({
      name,
      imageUrl: getSubscriptionsProductImage(itemSlug(name)) || DEFAULT_SUBSCRIPTIONS_IMAGE,
      shortDescription: "",
      description: "",
      featured: idx < 4,
    })),
  },
  // 4. Fashion
  {
    name: "Fashion",
    slug: "fashion",
    icon: "Shirt",
    description: "Style, staples, and statement pieces people love sharing.",
    items: getFullFashionCatalog().map((item) => ({
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 5. Beauty
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
  // 6. Cars
  {
    name: "Cars",
    slug: "cars",
    icon: "Car",
    description: "Luxury flagships, supercars, hypercars, performance SUVs, and off-road powerhouses.",
    items: getFullCarsCatalog().map((item) => ({
      slug: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 7. Bikes
  {
    name: "Bikes",
    slug: "bikes",
    icon: "Bike",
    description: "Superbikes, naked streetfighters, adventure tourers, and cruisers.",
    items: getFullBikesCatalog().map((item) => ({
      slug: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 8. Concerts
  {
    name: "Concerts",
    slug: "concerts",
    icon: "Ticket",
    description: "Live concerts, music festivals, world tours, and premium live performances.",
    items: [],
  },
  // 9. Vacation
  {
    name: "Vacation",
    slug: "vacation",
    icon: "Plane",
    description: "Luxury getaways, dream destinations, and bespoke travel experiences.",
    items: [],
  },
  // 10. Watches
  {
    name: "Watches",
    slug: "watches",
    icon: "Watch",
    description: "Haute horlogerie, iconic timepieces, and luxury Swiss watches.",
    items: [],
  },
  // 11. Jewellery
  {
    name: "Jewellery",
    slug: "jewellery",
    icon: "Sparkles",
    description: "High jewellery, timeless diamonds, bespoke gold, and luxury pieces.",
    items: [],
  },
];

export const ALLOWED_CATEGORY_SLUGS = [
  "mobile",
  "electronics",
  "subscriptions",
  "fashion",
  "beauty",
  "cars",
  "bikes",
  "concerts",
  "vacation",
  "watches",
  "jewellery",
];

export const SEARCH_PLACEHOLDERS = [
  "Search for iPhone 18 Pro Max",
  "Search for Porsche 911 GT3 RS",
  "Search for BMW S1000RR",
  "Search for Nike Air Force 1",
  "Search for Claude Max",
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
      // 1. Ensure cars and bikes categories exist for migration
      const carsCatSeed = CATEGORY_SEEDS.find((c) => c.slug === "cars")!;
      const bikesCatSeed = CATEGORY_SEEDS.find((c) => c.slug === "bikes")!;
      const carsCat = await prisma.category.upsert({
        where: { slug: "cars" },
        update: { name: carsCatSeed.name, icon: carsCatSeed.icon, description: carsCatSeed.description },
        create: {
          name: carsCatSeed.name,
          slug: carsCatSeed.slug,
          icon: carsCatSeed.icon,
          description: carsCatSeed.description,
          active: true,
          displayOrder: 5,
        },
      });
      const bikesCat = await prisma.category.upsert({
        where: { slug: "bikes" },
        update: { name: bikesCatSeed.name, icon: bikesCatSeed.icon, description: bikesCatSeed.description },
        create: {
          name: bikesCatSeed.name,
          slug: bikesCatSeed.slug,
          icon: bikesCatSeed.icon,
          description: bikesCatSeed.description,
          active: true,
          displayOrder: 6,
        },
      });

      // Migrate existing vehicles catalog items to cars or bikes
      const vehiclesCat = await prisma.category.findUnique({ where: { slug: "vehicles" } });
      if (vehiclesCat) {
        const fullCarsSlugs = new Set(getFullCarsCatalog().map((c) => c.id));
        const fullBikesSlugs = new Set(getFullBikesCatalog().map((b) => b.id));

        const vehicleItems = await prisma.catalogItem.findMany({
          where: { categoryId: vehiclesCat.id },
          select: { id: true, slug: true },
        });

        const carItemIds = vehicleItems.filter((v) => fullCarsSlugs.has(v.slug)).map((v) => v.id);
        const bikeItemIds = vehicleItems.filter((v) => fullBikesSlugs.has(v.slug)).map((v) => v.id);

        if (carItemIds.length > 0) {
          await prisma.catalogItem.updateMany({
            where: { id: { in: carItemIds } },
            data: { categoryId: carsCat.id },
          });
        }
        if (bikeItemIds.length > 0) {
          await prisma.catalogItem.updateMany({
            where: { id: { in: bikeItemIds } },
            data: { categoryId: bikesCat.id },
          });
        }
      }

      // 2. Identify and purge any obsolete categories not in the allowed list
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
            OR: [
              { catalogItem: { categoryId: { in: obsoleteIds } } },
              { categoryId: { in: obsoleteIds } },
            ],
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

      // 3. Check if we are fully seeded with correct counts in parallel
      const [
        categoryCount,
        mobileCount,
        electronicsCount,
        subscriptionsCount,
        fashionCount,
        beautyCount,
        carsCount,
        bikesCount,
      ] = await Promise.all([
        prisma.category.count({ where: { slug: { in: ALLOWED_CATEGORY_SLUGS } } }),
        prisma.catalogItem.count({ where: { category: { slug: "mobile" } } }),
        prisma.catalogItem.count({ where: { category: { slug: "electronics" } } }),
        prisma.catalogItem.count({ where: { category: { slug: "subscriptions" } } }),
        prisma.catalogItem.count({ where: { category: { slug: "fashion" } } }),
        prisma.catalogItem.count({ where: { category: { slug: "beauty" } } }),
        prisma.catalogItem.count({ where: { category: { slug: "cars" } } }),
        prisma.catalogItem.count({ where: { category: { slug: "bikes" } } }),
      ]);

      if (
        categoryCount === 11 &&
        mobileCount >= 21 &&
        electronicsCount >= 70 &&
        subscriptionsCount >= 25 &&
        fashionCount >= 40 &&
        beautyCount >= 30 &&
        carsCount >= 104 &&
        bikesCount >= 27
      ) {
        isCatalogSeededInMemory = true;
        return;
      }

      // 4. Upsert the 11 allowed categories
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

      // 5. Upsert all catalog items with NO descriptions
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
  addedCount?: number | null;
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
    where: { active: true, slug: { in: [...PLUGD_CATEGORY_ORDER] } },
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

export function invalidateCategoryCache(categoryId?: string) {
  if (categoryId) {
    cachedItemsByCategory.delete(categoryId);
  } else {
    cachedItemsByCategory.clear();
  }
}

export async function getCachedCategoryItems(categoryId: string): Promise<CachedCatalogItem[]> {
  const now = Date.now();
  const cached = cachedItemsByCategory.get(categoryId);
  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  let items: CachedCatalogItem[] = await prisma.catalogItem.findMany({
    where: {
      active: true,
      categoryId,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
      categoryId: true,
      featured: true,
      displayOrder: true,
      addedCount: true,
    },
    orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { name: "asc" }],
  });

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
        },
        select: {
          id: true,
          name: true,
          slug: true,
          image: true,
          categoryId: true,
          featured: true,
          displayOrder: true,
          addedCount: true,
        },
        orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { name: "asc" }],
      });
    }
  }

  // If fashion category, ensure items have authentic images
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

  // If mobile category, ensure items have authentic product images
  const mobileCat = await prisma.category.findUnique({ where: { slug: "mobile" }, select: { id: true } });
  if (mobileCat && categoryId === mobileCat.id) {
    const fullMobiles = getFullMobilesCatalog();
    const canonicalSlugs = new Set(fullMobiles.map((d) => d.id));
    items = items.filter((item) => canonicalSlugs.has(item.slug));

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
        },
        select: {
          id: true,
          name: true,
          slug: true,
          image: true,
          categoryId: true,
          featured: true,
          displayOrder: true,
          addedCount: true,
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

  // If subscriptions category, ensure images are synced to authentic URLs and missing items are seeded
  const subscriptionsCat = await prisma.category.findUnique({ where: { slug: "subscriptions" }, select: { id: true } });
  if (subscriptionsCat && categoryId === subscriptionsCat.id) {
    const subSlugs = SUBSCRIPTIONS_ITEMS.map((name) => itemSlug(name));
    const allowedSlugs = new Set([...subSlugs, "x-premium-2", "prime-video-subscription"]);

    // Remove any unauthorized/removed items
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
      .filter((s) => {
        if (existingSlugs.has(s.slug)) return false;
        if (s.slug === "x-premium-plus" && existingSlugs.has("x-premium-2")) return false;
        if (s.slug === "prime-video" && existingSlugs.has("prime-video-subscription")) return false;
        return true;
      });

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
        addedCount: true,
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

    // Ensure Prime Video name is updated
    items = items.map((item) => {
      if (item.slug === "prime-video-subscription" || item.slug === "prime-video") {
        return { ...item, name: "Prime Video" };
      }
      return item;
    });

    // Sort in order of SUBSCRIPTIONS_ITEMS
    const getSubIndex = (slug: string) => {
      if (slug === "prime-video-subscription") return subSlugs.indexOf("prime-video");
      const idx = subSlugs.indexOf(slug);
      if (idx !== -1) return idx;
      return subSlugs.indexOf(slug.replace("-2", "-plus"));
    };

    items.sort((a, b) => {
      const idxA = getSubIndex(a.slug);
      const idxB = getSubIndex(b.slug);
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
        addedCount: true,
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

    // Sort strictly by the items order
    const slugOrder = fullElectronics.map((e) => e.id);
    items.sort((a, b) => slugOrder.indexOf(a.slug) - slugOrder.indexOf(b.slug));
  }

  // If cars category, ensure items are seeded
  const carsCat = await prisma.category.findUnique({ where: { slug: "cars" }, select: { id: true } });
  if (carsCat && categoryId === carsCat.id) {
    const fullCars = getFullCarsCatalog();
    const existingSlugs = new Set(items.map((i) => i.slug));
    const missing = fullCars.filter((c) => !existingSlugs.has(c.id));

    if (missing.length > 0) {
      await prisma.catalogItem.createMany({
        data: missing.map((c, idx) => ({
          name: c.name,
          slug: c.id,
          categoryId: carsCat.id,
          image: c.imageUrl,
          active: true,
          featured: Boolean(c.featured),
          displayOrder: c.displayOrder ?? idx,
        })),
        skipDuplicates: true,
      });

      items = await prisma.catalogItem.findMany({
        where: {
          active: true,
          categoryId,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          image: true,
          categoryId: true,
          featured: true,
          displayOrder: true,
          addedCount: true,
        },
        orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { name: "asc" }],
      });
    }

    const carsImageBySlug = new Map(fullCars.map((c) => [c.id, c.imageUrl]));
    const itemsToUpdate = items.filter((item) => {
      const targetUrl = carsImageBySlug.get(item.slug);
      return targetUrl && item.image !== targetUrl;
    });

    if (itemsToUpdate.length > 0) {
      Promise.all(
        itemsToUpdate.map((item) =>
          prisma.catalogItem.update({
            where: { id: item.id },
            data: { image: carsImageBySlug.get(item.slug)! },
          }).catch(() => {})
        )
      ).catch(() => {});

      items = items.map((item) => {
        const targetUrl = carsImageBySlug.get(item.slug);
        return targetUrl ? { ...item, image: targetUrl } : item;
      });
    }
  }

  // If bikes category, ensure items are seeded
  const bikesCat = await prisma.category.findUnique({ where: { slug: "bikes" }, select: { id: true } });
  if (bikesCat && categoryId === bikesCat.id) {
    const fullBikes = getFullBikesCatalog();
    const existingSlugs = new Set(items.map((i) => i.slug));
    const missing = fullBikes.filter((b) => !existingSlugs.has(b.id));

    if (missing.length > 0) {
      await prisma.catalogItem.createMany({
        data: missing.map((b, idx) => ({
          name: b.name,
          slug: b.id,
          categoryId: bikesCat.id,
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
        },
        select: {
          id: true,
          name: true,
          slug: true,
          image: true,
          categoryId: true,
          featured: true,
          displayOrder: true,
          addedCount: true,
        },
        orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { name: "asc" }],
      });
    }

    const bikesImageBySlug = new Map(fullBikes.map((b) => [b.id, b.imageUrl]));
    const itemsToUpdate = items.filter((item) => {
      const targetUrl = bikesImageBySlug.get(item.slug);
      return targetUrl && item.image !== targetUrl;
    });

    if (itemsToUpdate.length > 0) {
      Promise.all(
        itemsToUpdate.map((item) =>
          prisma.catalogItem.update({
            where: { id: item.id },
            data: { image: bikesImageBySlug.get(item.slug)! },
          }).catch(() => {})
        )
      ).catch(() => {});

      items = items.map((item) => {
        const targetUrl = bikesImageBySlug.get(item.slug);
        return targetUrl ? { ...item, image: targetUrl } : item;
      });
    }
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
  addedCount?: number | null;
  category: {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
  };
};

/**
 * Universal catalog product resolver for product detail pages and metadata.
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
      shortDescription: null,
      description: null,
      addedCount: item.addedCount,
      category: item.category,
    };
  }

  // 2. Slug normalization and common aliases
  const aliases = [
    slug === "iphone-18-pro-max" ? "iphone-18-pro-max-black" : null,
  ].filter((a): a is string => Boolean(a) && a !== slug);

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
        shortDescription: null,
        description: null,
        addedCount: aliasItem.addedCount,
        category: aliasItem.category,
      };
    }
  }

  // 3. Fallback catalog matching and self-healing DB upsert
  // Check Cars
  const fullCars = getFullCarsCatalog();
  const car = fullCars.find((c) => c.id === slug || aliases.includes(c.id));
  if (car) {
    const category = await prisma.category.findUnique({ where: { slug: "cars" } });
    if (category) {
      const dbItem = await prisma.catalogItem.upsert({
        where: { slug: car.id },
        update: {
          name: car.name,
          image: car.imageUrl,
          active: true,
          featured: Boolean(car.featured),
        },
        create: {
          name: car.name,
          slug: car.id,
          categoryId: category.id,
          image: car.imageUrl,
          active: true,
          featured: Boolean(car.featured),
          displayOrder: car.displayOrder,
          addedCount: 0,
        },
        include: { category: true },
      }).catch(() => null);

      if (dbItem) return dbItem;

      return {
        id: `cars-${car.id}`,
        name: car.name,
        slug: car.id,
        image: car.imageUrl,
        category,
        addedCount: 0,
      };
    }
  }

  // Check Bikes
  const fullBikes = getFullBikesCatalog();
  const bike = fullBikes.find((b) => b.id === slug || aliases.includes(b.id));
  if (bike) {
    const category = await prisma.category.findUnique({ where: { slug: "bikes" } });
    if (category) {
      const dbItem = await prisma.catalogItem.upsert({
        where: { slug: bike.id },
        update: {
          name: bike.name,
          image: bike.imageUrl,
          active: true,
          featured: Boolean(bike.featured),
        },
        create: {
          name: bike.name,
          slug: bike.id,
          categoryId: category.id,
          image: bike.imageUrl,
          active: true,
          featured: Boolean(bike.featured),
          displayOrder: bike.displayOrder,
          addedCount: 0,
        },
        include: { category: true },
      }).catch(() => null);

      if (dbItem) return dbItem;

      return {
        id: `bikes-${bike.id}`,
        name: bike.name,
        slug: bike.id,
        image: bike.imageUrl,
        category,
        addedCount: 0,
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

/**
 * Standard Plugd category order (11 categories):
 * 1) Mobile
 * 2) Electronics
 * 3) Subscriptions
 * 4) Fashion
 * 5) Beauty
 * 6) Cars
 * 7) Bikes
 * 8) Concerts
 * 9) Vacation
 * 10) Watches
 * 11) Jewellery
 */
export const PLUGD_CATEGORY_ORDER = [
  "mobile",
  "electronics",
  "subscriptions",
  "fashion",
  "beauty",
  "cars",
  "bikes",
  "concerts",
  "vacation",
  "watches",
  "jewellery",
] as const;

export function organizeCategories<T extends { slug: string }>(cats: T[]): T[] {
  const orderMap = new Map<string, number>(
    PLUGD_CATEGORY_ORDER.map((slug, idx) => [slug, idx])
  );
  return cats
    .filter((c) => orderMap.has(c.slug.toLowerCase().trim()))
    .sort((a, b) => {
      const idxA = orderMap.get(a.slug.toLowerCase().trim())!;
      const idxB = orderMap.get(b.slug.toLowerCase().trim())!;
      return idxA - idxB;
    });
}

