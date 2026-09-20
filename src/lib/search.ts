import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getProductDisplayImage, HOMEPAGE_CATEGORIES_GRID } from "@/lib/product-images";
import { CATEGORY_SUBCATEGORIES, GAMING_SUBCATEGORIES } from "@/lib/subcategories";

export interface SearchCategory {
  id: string;
  name: string;
  slug: string;
  href: string;
  icon?: string;
  image?: string;
  itemCount?: number;
}

export interface SearchSubcategory {
  id: string;
  name: string;
  slug: string;
  parentCategorySlug: string;
  parentCategoryName: string;
  href: string;
  image?: string;
}

export interface SearchItem {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  href: string;
  categoryName: string;
  categorySlug: string;
  addedCount?: number | null;
}

export interface SearchResults {
  categories: SearchCategory[];
  subcategories: SearchSubcategory[];
  items: SearchItem[];
  totalMatches: number;
}

/**
 * Standard main categories with canonical links and imagery
 */
export const SEARCH_CATEGORIES: SearchCategory[] = [
  {
    id: "food",
    name: "Food",
    slug: "food",
    href: "/category/food",
    icon: "Utensils",
    image: "https://i.pinimg.com/1200x/27/04/2b/27042b22fecb5612fd64e15eea285e69.jpg",
  },
  {
    id: "drinks",
    name: "Drinks",
    slug: "drinks",
    href: "/category/drinks",
    icon: "Coffee",
    image: "https://i.pinimg.com/1200x/29/6d/c1/296dc15130a76781017f119203e396d3.jpg",
  },
  {
    id: "fashion",
    name: "Fashion",
    slug: "fashion",
    href: "/category/fashion",
    icon: "Shirt",
    image: "https://i.pinimg.com/1200x/b5/62/91/b562919ee0fa1993cce4f043342fcd9c.jpg",
  },
  {
    id: "mobile",
    name: "Mobile",
    slug: "mobile",
    href: "/category/mobile",
    icon: "Smartphone",
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-duo-finish-select-202609-nightsky_GEO_EMEA_FMT_WHH?wid=1280&hei=492&fmt=p-jpg&qlt=80&.v=L2FnUkNTRm43ZDRCREFsdzlaeThka1k5MDdKKy9LWVNaMytjbFNMOXdSUmFrOHlZZFNsN2Z2SDlnV2QySDNwVm4wZU5pVHVHdUU0SU0vdlcrc3NTQ1NzRVdVYUZMK2pnb0pYa1BITFFSbEwxcjBVRyswWG14bEI4WVZBcUIybEZCczNpeEs0Y3pqL3FIZXNMK2RzNTlR&traceId=1",
  },
  {
    id: "beauty",
    name: "Beauty",
    slug: "beauty",
    href: "/category/beauty",
    icon: "Sparkles",
    image: "https://i.pinimg.com/1200x/65/c3/f7/65c3f712255d6c59224ba70f3461f799.jpg",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    slug: "entertainment",
    href: "/category/entertainment",
    icon: "Ticket",
    image: "https://i.pinimg.com/1200x/ae/ad/1c/aead1c5a93fc66235ef5440d2c1fcce6.jpg",
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    slug: "subscriptions",
    href: "/category/subscriptions",
    icon: "BadgeCheck",
    image: "https://i.pinimg.com/736x/f9/d1/43/f9d143e7063e913378925d3ffa0de5b4.jpg",
  },
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    href: "/category/electronics",
    icon: "Laptop",
    image: "https://i.pinimg.com/1200x/f0/25/a8/f025a8720a0be78b8038aeb15fd3cc29.jpg",
  },
  {
    id: "fitness",
    name: "Fitness",
    slug: "fitness",
    href: "/category/fitness",
    icon: "Dumbbell",
    image: "https://i.pinimg.com/736x/73/38/85/733885d96e5f21ba103ca8fb378f4a4c.jpg",
  },
  {
    id: "vehicles",
    name: "Vehicles",
    slug: "vehicles",
    href: "/category/vehicles",
    icon: "Car",
    image: "https://i.pinimg.com/736x/0d/37/3a/0d373af47cb9c6c8607d7ac09af14ed9.jpg",
  },
  {
    id: "toys",
    name: "Toys",
    slug: "toys",
    href: "/category/toys",
    icon: "Rocket",
    image: "https://i.pinimg.com/1200x/63/a8/a2/63a8a2c1ad77c37fb59b951e1fd7ff6d.jpg",
  },
];

/**
 * Compile all available subcategories across the platform
 */
function buildAllSubcategories(): Array<SearchSubcategory & { keywords: string[] }> {
  const list: Array<SearchSubcategory & { keywords: string[] }> = [];

  const categoryNameMap: Record<string, string> = {
    food: "Food",
    drinks: "Drinks",
    fashion: "Fashion",
    mobile: "Mobile",
    beauty: "Beauty",
    entertainment: "Entertainment",
    subscriptions: "Subscriptions",
    electronics: "Electronics",
    fitness: "Fitness",
    vehicles: "Vehicles",
    toys: "Toys",
  };

  // 1. From CATEGORY_SUBCATEGORIES
  for (const [catSlug, subs] of Object.entries(CATEGORY_SUBCATEGORIES)) {
    const parentName = categoryNameMap[catSlug] || catSlug;
    for (const sub of subs) {
      const gridTile = HOMEPAGE_CATEGORIES_GRID.find(
        (t) => t.name.toLowerCase() === sub.name.toLowerCase() || t.href.includes(`sub=${sub.id}`)
      );

      list.push({
        id: `${catSlug}-${sub.id}`,
        name: sub.name,
        slug: sub.id,
        parentCategorySlug: catSlug,
        parentCategoryName: parentName,
        href: `/category/${catSlug}?sub=${sub.id}`,
        image: gridTile?.image || sub.image,
        keywords: sub.keywords || [],
      });
    }
  }

  // 2. Gaming child subcategories
  for (const child of GAMING_SUBCATEGORIES) {
    list.push({
      id: `electronics-gaming-${child.id}`,
      name: child.name,
      slug: child.id,
      parentCategorySlug: "electronics",
      parentCategoryName: "Electronics",
      href: `/category/electronics?sub=gaming&child=${child.id}`,
      image: "https://i.pinimg.com/1200x/a6/6c/36/a66c367c6cd24d35746c8a162e382a12.jpg",
      keywords: ["gaming", "console", child.name.toLowerCase()],
    });
  }

  return list;
}

const ALL_SEARCH_SUBCATEGORIES = buildAllSubcategories();

/**
 * Normalize a search string for tolerant matching:
 * lowercase, stripped of non-alphanumeric characters.
 */
function clean(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Score a match between a query and a target name/slug/keyword
 */
function matchScore(
  query: string,
  name: string,
  slug: string,
  keywords: string[] = []
): number {
  const q = query.trim().toLowerCase();
  const cleanQ = clean(q);
  if (!cleanQ) return 0;

  const n = name.toLowerCase();
  const cleanN = clean(name);
  const cleanS = clean(slug);

  // Exact match
  if (cleanQ === cleanN || cleanQ === cleanS) return 100;

  // Plural/singular direct match (e.g. "car" vs "cars", "biscuit" vs "biscuits", "skin care" vs "skincare")
  if (
    cleanQ + "s" === cleanN ||
    cleanN + "s" === cleanQ ||
    cleanQ === cleanN.replace(/s$/, "") ||
    cleanN === cleanQ.replace(/s$/, "") ||
    cleanQ + "es" === cleanN ||
    cleanN + "es" === cleanQ
  ) {
    return 95;
  }

  // Word boundary match in target name or slug
  const words = n.split(/[\s\-_&/]+/);
  if (words.some((w) => {
    const cw = clean(w);
    if (cleanQ === "car" && cw.startsWith("care")) return false;
    if (cleanQ === "care" && cw === "cars") return false;
    return cw === cleanQ || cw + "s" === cleanQ || cleanQ + "s" === cw;
  })) {
    return 85;
  }

  // Prefix match (if query is at least 3 characters)
  if (cleanQ.length >= 3) {
    if (cleanQ === "car" && (cleanN.startsWith("care") || cleanS.startsWith("care"))) {
      // ignore
    } else {
      if (cleanN.startsWith(cleanQ) || cleanS.startsWith(cleanQ)) return 80;
    }

    if (words.some((w) => {
      const cw = clean(w);
      if (cleanQ === "car" && cw.startsWith("care")) return false;
      return cw.startsWith(cleanQ);
    })) {
      return 75;
    }
  }

  // Substring match only if cleanQ is longer than 4 characters (prevents "car" matching "skincare" or "haircare")
  if (cleanQ.length > 4) {
    if (cleanN.includes(cleanQ) || cleanS.includes(cleanQ)) return 60;
  }

  // Keywords match
  for (const kw of keywords) {
    const cleanKw = clean(kw);
    if (cleanQ === "car" && cleanKw.startsWith("care")) continue;
    if (cleanKw === cleanQ || cleanKw + "s" === cleanQ || cleanQ + "s" === cleanKw) return 55;
    const kwWords = kw.toLowerCase().split(/[\s\-_&/]+/);
    if (kwWords.some((w) => {
      const ckw = clean(w);
      if (cleanQ === "car" && ckw.startsWith("care")) return false;
      return ckw === cleanQ;
    })) return 50;
    if (cleanQ.length > 3 && (cleanKw.startsWith(cleanQ) || cleanQ.startsWith(cleanKw))) return 45;
  }

  return 0;
}

/**
 * Execute search across categories, subcategories, and database catalog items
 */
export async function searchCatalog(
  rawQuery: string,
  options?: { limitItems?: number }
): Promise<SearchResults> {
  const query = rawQuery.trim();
  if (!query) {
    return {
      categories: [],
      subcategories: [],
      items: [],
      totalMatches: 0,
    };
  }

  const limitItems = options?.limitItems ?? 24;

  // 1. Search Main Categories
  const categoryMatches: Array<{ category: SearchCategory; score: number }> = [];
  for (const cat of SEARCH_CATEGORIES) {
    const score = matchScore(query, cat.name, cat.slug);
    if (score > 0) {
      categoryMatches.push({ category: cat, score });
    }
  }
  categoryMatches.sort((a, b) => b.score - a.score);
  const matchedCategories = categoryMatches.map((m) => m.category);

  // 2. Search Subcategories
  const subcategoryMatches: Array<{ subcategory: SearchSubcategory; score: number }> = [];
  for (const sub of ALL_SEARCH_SUBCATEGORIES) {
    const score = matchScore(query, sub.name, sub.slug, sub.keywords);
    if (score > 0) {
      subcategoryMatches.push({
        subcategory: {
          id: sub.id,
          name: sub.name,
          slug: sub.slug,
          parentCategorySlug: sub.parentCategorySlug,
          parentCategoryName: sub.parentCategoryName,
          href: sub.href,
          image: sub.image,
        },
        score,
      });
    }
  }
  // Deduplicate subcategories if any overlap
  const seenSubHrefs = new Set<string>();
  const uniqueSubMatches = subcategoryMatches
    .sort((a, b) => b.score - a.score)
    .filter((m) => {
      if (seenSubHrefs.has(m.subcategory.href)) return false;
      seenSubHrefs.add(m.subcategory.href);
      return true;
    });
  const matchedSubcategories = uniqueSubMatches.map((m) => m.subcategory);

  // 3. Search Items in Database
  // Split query into significant tokens for robust multi-word matching
  const tokens = query
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const duplicateFallbackSlugs = [
    "lay-s-classic-salted",
    "lay-s-magic-masala",
    "haldiram-s-aloo-bhujia",
    "haldiram-s-bhujia-sev",
    "haldiram-s-mixture",
  ];

  // Try comprehensive search condition
  const dbItems = await prisma.catalogItem.findMany({
    where: {
      active: true,
      slug: { notIn: duplicateFallbackSlugs },
      OR: [
        // Exact substring in name
        { name: { contains: query, mode: "insensitive" as const } },
        // Exact substring in slug
        { slug: { contains: query.toLowerCase().replace(/\s+/g, "-"), mode: "insensitive" as const } },
        // Exact substring in description
        { description: { contains: query, mode: "insensitive" as const } },
        { shortDescription: { contains: query, mode: "insensitive" as const } },
        // Multi-word matching: all tokens match name or slug
        ...(tokens.length > 1
          ? [
              {
                AND: tokens.map((token): Prisma.CatalogItemWhereInput => ({
                  OR: [
                    { name: { contains: token, mode: "insensitive" as const } },
                    { slug: { contains: token, mode: "insensitive" as const } },
                    { description: { contains: token, mode: "insensitive" as const } },
                  ],
                })),
              },
            ]
          : []),
      ],
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
    orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { name: "asc" }],
    take: limitItems,
  });

  const matchedItems: SearchItem[] = dbItems.map((item) => {
    const authenticImage = getProductDisplayImage(
      item.category.slug,
      item.slug,
      item.image
    );

    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      image: authenticImage,
      href: `/catalog/${item.slug}`,
      categoryName: item.category.name,
      categorySlug: item.category.slug,
      addedCount: item.addedCount,
    };
  });

  const totalMatches =
    matchedCategories.length + matchedSubcategories.length + matchedItems.length;

  return {
    categories: matchedCategories,
    subcategories: matchedSubcategories,
    items: matchedItems,
    totalMatches,
  };
}
