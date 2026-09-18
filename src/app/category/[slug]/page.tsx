import Link from "next/link";
import { ChevronRight, ArrowLeft, Star, Sparkles, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import CatalogCard from "@/components/CatalogCard";
import CategoryIcon from "@/components/CategoryIcon";
import { getSession } from "@/lib/auth";
import { getCachedCategories, getCachedCategoryItems } from "@/lib/catalog";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  getSubcategoriesForCategory,
  getGamingSubcategories,
  getGamingSubcategoryDef,
  matchesSubcategory,
  matchesGamingChild,
  ALL_GAMING_PRODUCT_IDS,
} from "@/lib/subcategories";
import { getFullDrinksCatalog } from "@/lib/drinks-catalog";
import { getFullMobilesCatalog } from "@/lib/mobiles-catalog";
import { getFullBeautyCatalog, BEAUTY_TOP_PICKS_SLUGS } from "@/lib/beauty-catalog";
import { getFullEntertainmentCatalog } from "@/lib/entertainment-catalog";
import { getFullElectronicsCatalog, ELECTRONICS_TOP_PICKS_SLUGS } from "@/lib/electronics-catalog";
import { getFullFitnessCatalog } from "@/lib/fitness-catalog";
import { getFullToysCatalog } from "@/lib/toys-catalog";
import { getFullVehiclesCatalog, VEHICLES_TOP_PICKS_SLUGS } from "@/lib/vehicles-catalog";
import { getBeautyProductImage, getDrinksProductImage, getFashionProductImage, getMobilesProductImage, getEntertainmentProductImage, getSubscriptionsProductImage, getElectronicsProductImage, getFitnessProductImage, getToysProductImage, getVehiclesProductImage, getProductDisplayImage } from "@/lib/product-images";
import { FASHION_TOP_PICKS, getFashionItemGender } from "@/lib/fashion-catalog";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ slug: string }> | { slug: string };
  searchParams?: Promise<{ q?: string; sub?: string; child?: string; gender?: string }> | { q?: string; sub?: string; child?: string; gender?: string };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const [session, resolvedParams, resolvedSearchParams, allCategories] = await Promise.all([
    getSession(),
    params,
    searchParams,
    getCachedCategories(),
  ]);

  const category = allCategories.find((c) => c.slug === resolvedParams.slug);
  if (!category) {
    notFound();
  }

  const query = resolvedSearchParams?.q?.trim() || "";
  const subParam = resolvedSearchParams?.sub?.trim() || "";
  const childParam = resolvedSearchParams?.child?.trim() || "";
  const genderParam = resolvedSearchParams?.gender?.trim().toLowerCase() || "all";

  // Hierarchy context
  const isGamingSubcategory = false;
  const isElectronicsMobile = false;

  // Subcategories list for sidebar
  const mainSubcategories = getSubcategoriesForCategory(category.slug);
  const gamingSubcategories = getGamingSubcategories();

  // Active subcategory definition
  const activeSubDef = subParam
    ? mainSubcategories.find((s) => s.id.toLowerCase() === subParam.toLowerCase())
    : null;

  // Active gaming child definition if in Electronics -> Gaming
  const activeGamingChild = isGamingSubcategory && childParam
    ? getGamingSubcategoryDef(childParam)
    : null;

  // Sidebar items to render
  const sidebarItems = isGamingSubcategory ? gamingSubcategories : mainSubcategories;

  // Top Picks active status
  // In Gaming subcategory: Top Picks is active when no child is selected
  // Otherwise: Top Picks is active when no subcategory is selected
  const isTopPicksActive = isGamingSubcategory
    ? (!childParam || childParam === "all")
    : (!subParam || subParam === "all");

  const activeItemId = isTopPicksActive
    ? null
    : (isGamingSubcategory ? activeGamingChild?.id : activeSubDef?.id);

  // Special case: Electronics -> Mobile loads from the "mobile" category
  let targetCategoryId = category.id;
  if (isElectronicsMobile) {
    const mobileCategory = allCategories.find((c) => c.slug === "mobile");
    if (mobileCategory) {
      targetCategoryId = mobileCategory.id;
    }
  }

  const initialRawItems = query
    ? await prisma.catalogItem.findMany({
        where: {
          active: true,
          categoryId: targetCategoryId,
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { shortDescription: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
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
      })
    : await getCachedCategoryItems(targetCategoryId);

  let rawItems = initialRawItems;
  if (category.slug === "drinks") {
    const fullDrinks = getFullDrinksCatalog();
    const existingSlugs = new Set(initialRawItems.map((i) => i.slug));
    const missingItems = fullDrinks
      .filter((d) => !existingSlugs.has(d.id))
      .map((d) => ({
        id: `drinks-${d.id}`,
        name: d.name,
        slug: d.id,
        image: d.imageUrl,
        categoryId: targetCategoryId,
        featured: Boolean(d.featured),
        displayOrder: d.displayOrder,
      }));
    if (missingItems.length > 0) {
      rawItems = [...initialRawItems, ...missingItems];
    }
  } else if (category.slug === "mobile" || isElectronicsMobile) {
    const fullMobiles = getFullMobilesCatalog();
    const existingSlugs = new Set(initialRawItems.map((i) => i.slug));
    const missingItems = fullMobiles
      .filter((d) => !existingSlugs.has(d.id))
      .map((d, idx) => ({
        id: `mobile-${d.id}`,
        name: d.name,
        slug: d.id,
        image: d.imageUrl,
        categoryId: targetCategoryId,
        featured: Boolean(d.featured),
        displayOrder: idx + 1,
      }));
    if (missingItems.length > 0) {
      rawItems = [...initialRawItems, ...missingItems];
    }
  } else if (category.slug === "beauty") {
    const fullBeauty = getFullBeautyCatalog();
    const existingSlugs = new Set(initialRawItems.map((i) => i.slug));
    const missingItems = fullBeauty
      .filter((b) => !existingSlugs.has(b.id))
      .map((b, idx) => ({
        id: `beauty-${b.id}`,
        name: b.name,
        slug: b.id,
        image: b.imageUrl,
        categoryId: targetCategoryId,
        featured: Boolean(b.featured),
        displayOrder: b.displayOrder ?? idx,
      }));
    if (missingItems.length > 0) {
      rawItems = [...initialRawItems, ...missingItems];
    }
  } else if (category.slug === "entertainment") {
    const fullEntertainment = getFullEntertainmentCatalog();
    const allowedSlugs = new Set(fullEntertainment.map((e) => e.id));
    const validRaw = initialRawItems.filter((i) => allowedSlugs.has(i.slug));
    const existingSlugs = new Set(validRaw.map((i) => i.slug));
    const missingItems = fullEntertainment
      .filter((e) => !existingSlugs.has(e.id))
      .map((e, idx) => ({
        id: `entertainment-${e.id}`,
        name: e.name,
        slug: e.id,
        image: e.imageUrl,
        categoryId: targetCategoryId,
        featured: Boolean(e.featured),
        displayOrder: e.displayOrder ?? idx,
      }));
    rawItems = [...validRaw, ...missingItems];
    const slugOrder = fullEntertainment.map((e) => e.id);
    rawItems.sort((a, b) => slugOrder.indexOf(a.slug) - slugOrder.indexOf(b.slug));
  } else if (category.slug === "subscriptions") {
    const subNames = [
      "ChatGPT Plus", "ChatGPT Pro", "Claude Pro", "Claude Max",
      "X Premium", "X Premium+", "Netflix Standard",
      "Prime Video Subscription", "Hotstar Subscription", "Apple TV Subscription",
      "Google AI Plus", "Google AI Pro", "Google AI Ultra",
      "Spotify Premium", "YouTube Premium", "Amazon Prime",
      "Canva Pro", "Adobe Creative Cloud", "GitHub Pro",
      "Notion Plus", "Figma Pro", "Midjourney Subscription"
    ];
    const itemSlug = (name: string) => name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const subSlugs = subNames.map(itemSlug);
    const allowedSlugs = new Set([...subSlugs, "x-premium-2"]);
    const validRaw = initialRawItems.filter((i) => allowedSlugs.has(i.slug));
    const existingSlugs = new Set(validRaw.map((i) => i.slug));
    const missingItems = subNames
      .map((name, idx) => ({ name, slug: itemSlug(name), idx }))
      .filter((s) => !existingSlugs.has(s.slug) && !existingSlugs.has(s.slug === "x-premium-plus" ? "x-premium-2" : s.slug))
      .map((s) => ({
        id: `subscriptions-${s.slug}`,
        name: s.name,
        slug: s.slug,
        image: getSubscriptionsProductImage(s.slug),
        categoryId: targetCategoryId,
        featured: s.idx < 4,
        displayOrder: 548 + s.idx,
      }));
    rawItems = [...validRaw, ...missingItems];
    rawItems.sort((a, b) => {
      const idxA = subSlugs.indexOf(a.slug) !== -1 ? subSlugs.indexOf(a.slug) : subSlugs.indexOf(a.slug.replace("-2", "-plus"));
      const idxB = subSlugs.indexOf(b.slug) !== -1 ? subSlugs.indexOf(b.slug) : subSlugs.indexOf(b.slug.replace("-2", "-plus"));
      return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
    });
  } else if (category.slug === "electronics") {
    const fullElectronics = getFullElectronicsCatalog();
    const allowedSlugs = new Set(fullElectronics.map((e) => e.id));
    const fullElectronicsMap = new Map(fullElectronics.map((e) => [e.id, e]));
    const validRaw = initialRawItems
      .filter((i) => allowedSlugs.has(i.slug))
      .map((i) => {
        const canonical = fullElectronicsMap.get(i.slug);
        return canonical
          ? {
              ...i,
              name: canonical.name,
              image: canonical.imageUrl,
              featured: Boolean(canonical.featured),
            }
          : i;
      });
    const existingSlugs = new Set(validRaw.map((i) => i.slug));
    const missingItems = fullElectronics
      .filter((e) => !existingSlugs.has(e.id))
      .map((e, idx) => ({
        id: `electronics-${e.id}`,
        name: e.name,
        slug: e.id,
        image: e.imageUrl,
        categoryId: targetCategoryId,
        featured: Boolean(e.featured),
        displayOrder: e.displayOrder ?? idx,
      }));
    rawItems = [...validRaw, ...missingItems];
    const slugOrder = fullElectronics.map((e) => e.id);
    rawItems.sort((a, b) => slugOrder.indexOf(a.slug) - slugOrder.indexOf(b.slug));
  } else if (category.slug === "fitness") {
    const fullFitness = getFullFitnessCatalog();
    const allowedSlugs = new Set(fullFitness.map((e) => e.id));
    const fullFitnessMap = new Map(fullFitness.map((e) => [e.id, e]));
    const validRaw = initialRawItems
      .filter((i) => allowedSlugs.has(i.slug))
      .map((i) => {
        const canonical = fullFitnessMap.get(i.slug);
        return canonical
          ? {
              ...i,
              name: canonical.name,
              image: canonical.imageUrl,
              featured: Boolean(canonical.featured),
            }
          : i;
      });
    const existingSlugs = new Set(validRaw.map((i) => i.slug));
    const missingItems = fullFitness
      .filter((e) => !existingSlugs.has(e.id))
      .map((e, idx) => ({
        id: `fitness-${e.id}`,
        name: e.name,
        slug: e.id,
        image: e.imageUrl,
        categoryId: targetCategoryId,
        featured: Boolean(e.featured),
        displayOrder: e.displayOrder ?? idx,
      }));
    rawItems = [...validRaw, ...missingItems];
    const slugOrder = fullFitness.map((e) => e.id);
    rawItems.sort((a, b) => slugOrder.indexOf(a.slug) - slugOrder.indexOf(b.slug));
  } else if (category.slug === "toys") {
    const fullToys = getFullToysCatalog();
    const allowedSlugs = new Set(fullToys.map((e) => e.id));
    const fullToysMap = new Map(fullToys.map((e) => [e.id, e]));
    const validRaw = initialRawItems
      .filter((i) => allowedSlugs.has(i.slug))
      .map((i) => {
        const canonical = fullToysMap.get(i.slug);
        return canonical
          ? {
              ...i,
              name: canonical.name,
              image: canonical.imageUrl,
              featured: Boolean(canonical.featured),
            }
          : i;
      });
    const existingSlugs = new Set(validRaw.map((i) => i.slug));
    const missingItems = fullToys
      .filter((e) => !existingSlugs.has(e.id))
      .map((e, idx) => ({
        id: `toys-${e.id}`,
        name: e.name,
        slug: e.id,
        image: e.imageUrl,
        categoryId: targetCategoryId,
        featured: Boolean(e.featured),
        displayOrder: e.displayOrder ?? idx,
      }));
    rawItems = [...validRaw, ...missingItems];
    const slugOrder = fullToys.map((e) => e.id);
    rawItems.sort((a, b) => slugOrder.indexOf(a.slug) - slugOrder.indexOf(b.slug));
  } else if (category.slug === "vehicles") {
    const fullVehicles = getFullVehiclesCatalog();
    const allowedSlugs = new Set(fullVehicles.map((v) => v.id));
    const fullVehiclesMap = new Map(fullVehicles.map((v) => [v.id, v]));
    const validRaw = initialRawItems
      .filter((i) => allowedSlugs.has(i.slug))
      .map((i) => {
        const canonical = fullVehiclesMap.get(i.slug);
        return canonical
          ? {
              ...i,
              name: canonical.name,
              image: canonical.imageUrl,
              featured: Boolean(canonical.featured),
            }
          : i;
      });
    const existingSlugs = new Set(validRaw.map((i) => i.slug));
    const missingItems = fullVehicles
      .filter((v) => !existingSlugs.has(v.id))
      .map((v, idx) => ({
        id: `vehicles-${v.id}`,
        name: v.name,
        slug: v.id,
        image: v.imageUrl,
        categoryId: targetCategoryId,
        featured: Boolean(v.featured),
        displayOrder: v.displayOrder ?? idx,
      }));
    rawItems = [...validRaw, ...missingItems];
    const slugOrder = fullVehicles.map((v) => v.id);
    rawItems.sort((a, b) => slugOrder.indexOf(a.slug) - slugOrder.indexOf(b.slug));
  }

  // Filter items according to hierarchy
  let items = rawItems;
  if (isGamingSubcategory) {
    if (activeGamingChild) {
      items = rawItems.filter((item) => matchesGamingChild(item, activeGamingChild.id));
    } else {
      // Top Picks in Gaming: show all Gaming items
      items = rawItems.filter((item) => ALL_GAMING_PRODUCT_IDS.includes(item.slug));
    }
  } else if (isElectronicsMobile) {
    items = rawItems;
  } else if (activeSubDef) {
    const duplicateFallbackSlugs = [
      "lay-s-classic-salted",
      "lay-s-magic-masala",
      "haldiram-s-aloo-bhujia",
      "haldiram-s-bhujia-sev",
      "haldiram-s-mixture",
    ];
    const filtered = rawItems.filter(
      (item) =>
        !duplicateFallbackSlugs.includes(item.slug) &&
        matchesSubcategory(item, category.slug, activeSubDef.id)
    );
    // Deduplicate items by normalized name (keeps the curated snack item)
    const seenNames = new Set<string>();
    items = filtered.filter((item) => {
      const normalized = item.name.toLowerCase().trim();
      if (seenNames.has(normalized)) return false;
      seenNames.add(normalized);
      return true;
    });
    if (activeSubDef.productIds && activeSubDef.productIds.length > 0) {
      const idOrder = activeSubDef.productIds;
      items.sort((a, b) => {
        const idxA = idOrder.indexOf(a.slug);
        const idxB = idOrder.indexOf(b.slug);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return 0;
      });
    }
  } else if (category.slug === "food" && isTopPicksActive) {
    // Food Top Picks: include only Food items not part of the 4 dedicated subcategories,
    // while explicitly ensuring moved items (Cake, Waffles, Dessert, Pancake, Pazham Pori, Bread Omelette) remain in Top Picks.
    const movedToTopPicks = ["cake", "waffles", "dessert", "pancake", "pazham-pori", "bread-omelette"];
    const isExcludedFromTopPicks = (item: { name: string; slug: string }) => {
      const slug = item.slug.toLowerCase();
      const name = item.name.toLowerCase();
      const excludedSlugs = [
        "lays-classic-salted",
        "lay-s-classic-salted",
        "lays-magic-masala",
        "lay-s-magic-masala",
        "haldirams-aloo-bhujia",
        "haldiram-s-aloo-bhujia",
        "haldirams-bhujia-sev",
        "haldiram-s-bhujia-sev",
        "haldirams-mixture",
        "haldiram-s-mixture",
      ];
      if (excludedSlugs.includes(slug)) return true;
      if (
        name.includes("classic salted") ||
        name.includes("magic masala") ||
        name.includes("aloo bhujia") ||
        name.includes("bhujia sev") ||
        (name.includes("haldiram") && name.includes("mixture"))
      ) {
        return true;
      }
      return false;
    };
    const dedicatedFoodSubcategories = ["ice-creams", "sweet-cravings", "biscuits", "snacks"];
    items = rawItems.filter(
      (item) =>
        !isExcludedFromTopPicks(item) &&
        (movedToTopPicks.includes(item.slug) ||
          !dedicatedFoodSubcategories.some((subId) => matchesSubcategory(item, "food", subId)))
    );
  } else if (category.slug === "drinks" && isTopPicksActive) {
    // Drinks Top Picks: keep the exact existing 18 items in their exact order
    const existingTopPicksSlugs = [
      "diet-coke",
      "red-bull-energy-drink",
      "monster-energy-drink",
      "gatorade-energy-drink",
      "amul-masti-spiced-buttermilk",
      "bisleri-water-bottle",
      "minute-maid-pulpy-orange",
      "hell-energy-drink",
      "coca-cola-zero-sugar-pet",
      "smooth-chocolate-milk-drink",
      "coca-cola-zero-sugar-can",
      "soft-soya-milk-drink",
      "coolberg-cranberry-non-alcoholic-beer",
      "amul-protein-shake-blueberry",
      "sprite-zero",
      "thums-up",
      "pepsi",
      "pepsi-zero-sugar-soft-drink",
    ];
    items = rawItems.filter((item) => existingTopPicksSlugs.includes(item.slug));
    items.sort(
      (a, b) => existingTopPicksSlugs.indexOf(a.slug) - existingTopPicksSlugs.indexOf(b.slug)
    );
  } else if (category.slug === "fashion" && isTopPicksActive) {
    const topPickSlugs = FASHION_TOP_PICKS.map((p) => p.slug);
    const topPickRawIds = FASHION_TOP_PICKS.map((p) => p.rawId);

    // Keep the 15 Top Picks first in their exact specified order
    const topItems = rawItems.filter(
      (item) => topPickSlugs.includes(item.slug) || topPickRawIds.includes(item.slug)
    );
    topItems.sort((a, b) => {
      const idxA = FASHION_TOP_PICKS.findIndex((p) => p.slug === a.slug || p.rawId === a.slug);
      const idxB = FASHION_TOP_PICKS.findIndex((p) => p.slug === b.slug || p.rawId === b.slug);
      return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
    });

    const topItemIds = new Set(topItems.map((i) => i.id));
    const remainingItems = rawItems
      .filter((item) => !topItemIds.has(item.id))
      .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));

    let fashionCatalog = [...topItems, ...remainingItems];

    if (genderParam === "men") {
      fashionCatalog = fashionCatalog.filter((item) => {
        const g = getFashionItemGender(item);
        return g === "men" || g === "unisex";
      });
    } else if (genderParam === "women") {
      fashionCatalog = fashionCatalog.filter((item) => {
        const g = getFashionItemGender(item);
        return g === "women" || g === "unisex";
      });
    }

    items = fashionCatalog;
  } else if ((category.slug === "mobile" || isElectronicsMobile) && isTopPicksActive) {
    const fullMobiles = getFullMobilesCatalog();
    const topPickSlugs = fullMobiles.map((p) => p.id);
    items = [...rawItems].sort((a, b) => {
      const idxA = topPickSlugs.indexOf(a.slug);
      const idxB = topPickSlugs.indexOf(b.slug);
      return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
    });
  } else if (category.slug === "beauty" && isTopPicksActive) {
    const topPickSlugs = BEAUTY_TOP_PICKS_SLUGS;
    items = rawItems.filter((item) => topPickSlugs.includes(item.slug));
    items.sort(
      (a, b) => topPickSlugs.indexOf(a.slug) - topPickSlugs.indexOf(b.slug)
    );
  } else if (category.slug === "electronics" && isTopPicksActive) {
    const topPickSlugs = ELECTRONICS_TOP_PICKS_SLUGS;
    if (!query) {
      items = rawItems.filter((item) => topPickSlugs.includes(item.slug));
      items.sort(
        (a, b) => topPickSlugs.indexOf(a.slug) - topPickSlugs.indexOf(b.slug)
      );
    } else {
      items = rawItems;
    }
  } else if (category.slug === "vehicles" && isTopPicksActive) {
    const topPickSlugs = VEHICLES_TOP_PICKS_SLUGS;
    if (!query) {
      items = rawItems.filter((item) => topPickSlugs.includes(item.slug));
      items.sort(
        (a, b) => topPickSlugs.indexOf(a.slug) - topPickSlugs.indexOf(b.slug)
      );
    } else {
      items = rawItems;
    }
  } else {
    items = rawItems;
  }

  // Ensure authentic product images matching detail pages perfectly
  items = items.map((item) => ({
    ...item,
    image: getProductDisplayImage(isElectronicsMobile ? "mobile" : category.slug, item.slug, item.image),
  }));

  // Requirement 7: Hide main category horizontal navigation on subcategory pages
  const isMainCategoryPage = !subParam || subParam === "all";

  // Href helpers
  const topPicksHref = isGamingSubcategory
    ? `/category/electronics?sub=gaming${query ? `&q=${encodeURIComponent(query)}` : ""}`
    : `/category/${category.slug}${query ? `&q=${encodeURIComponent(query)}` : ""}`;

  const getSubcategoryHref = (subId: string) => {
    if (isGamingSubcategory) {
      return `/category/electronics?sub=gaming&child=${subId}${query ? `&q=${encodeURIComponent(query)}` : ""}`;
    }
    return `/category/${category.slug}?sub=${subId}${query ? `&q=${encodeURIComponent(query)}` : ""}`;
  };

  const itemCategoryLabel = isElectronicsMobile
    ? "Mobile"
    : isGamingSubcategory
    ? (activeGamingChild?.name || "Gaming")
    : (activeSubDef?.name || category.name);

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      {/* Header */}
      <Header
        initialQuery={query}
        isLoggedIn={Boolean(session?.userId)}
        username={session?.username}
        searchAction={`/category/${category.slug}`}
      />

      {/* Horizontal Category Navigation Bar - Shown ONLY on Main Category Pages */}
      {isMainCategoryPage && (
        <div className="sticky top-[65px] md:top-[69px] z-30 border-b border-zinc-200/80 bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2.5 no-scrollbar md:px-6">
            <Link
              href="/"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-200/90 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm transition hover:border-orange-500 hover:text-zinc-950 hover:bg-orange-50/50"
            >
              <Sparkles className="h-3.5 w-3.5 text-zinc-500" />
              <span>All</span>
            </Link>
            {allCategories.map((c) => {
              const isActive = c.slug === category.slug;
              return (
                <Link
                  key={c.id}
                  href={`/category/${c.slug}`}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold shadow-sm transition ${
                    isActive
                      ? "bg-zinc-950 text-white"
                      : "border border-zinc-200/90 bg-white text-zinc-700 hover:border-orange-500 hover:text-zinc-950 hover:bg-orange-50/50"
                  }`}
                >
                  <CategoryIcon
                    name={c.icon}
                    className={`h-3.5 w-3.5 ${isActive ? "text-orange-400" : "text-zinc-500"}`}
                  />
                  <span>{c.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="mx-auto max-w-7xl flex-1 px-4 py-5 md:px-6 md:py-6 w-full">
        {/* Breadcrumb Navigation */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-zinc-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-zinc-950 transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-zinc-400" />
            <Link
              href={`/category/${category.slug}`}
              className={
                subParam
                  ? "hover:text-zinc-950 transition-colors"
                  : "text-zinc-900 font-bold"
              }
            >
              {category.name}
            </Link>
            {activeSubDef ? (
              <>
                <ChevronRight className="h-3 w-3 text-zinc-400" />
                {isGamingSubcategory && activeGamingChild ? (
                  <Link
                    href={`/category/${category.slug}?sub=gaming`}
                    className="hover:text-zinc-950 transition-colors"
                  >
                    {activeSubDef.name}
                  </Link>
                ) : (
                  <span className="text-orange-600 font-bold">{activeSubDef.name}</span>
                )}
              </>
            ) : null}
            {isGamingSubcategory && activeGamingChild ? (
              <>
                <ChevronRight className="h-3 w-3 text-zinc-400" />
                <span className="text-orange-600 font-bold">{activeGamingChild.name}</span>
              </>
            ) : null}
          </div>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-bold text-zinc-700">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Zepto Category Architecture: Dedicated Left Sidebar Column + Right Product Grid */}
        <div className="flex items-start">
          {/* True Left Navigation Sidebar (Not a card, sits directly on page background) */}
          <aside
            className={`w-44 sm:w-56 md:w-64 lg:w-72 shrink-0 self-start sticky ${
              isMainCategoryPage
                ? "top-[125px] max-h-[calc(100vh-140px)]"
                : "top-[75px] md:top-[80px] max-h-[calc(100vh-95px)]"
            } overflow-y-auto no-scrollbar border-r border-zinc-200/80 py-1 space-y-1`}
          >
            {/* 1. TOP PICKS (Prominent Zepto Star Option) */}
            <Link
              href={topPicksHref}
              className={`group flex items-center gap-3 w-full px-3.5 sm:px-4 py-3 sm:py-3.5 transition ${
                isTopPicksActive
                  ? "bg-purple-50 text-purple-950 font-bold border-l-4 border-purple-600 rounded-none"
                  : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
              }`}
            >
              <div
                className={`flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl transition ${
                  isTopPicksActive
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-purple-100 text-purple-700 group-hover:scale-105"
                }`}
              >
                <Star className="h-5 w-5 fill-current" />
              </div>
              <div className="flex flex-col min-w-0 text-left">
                <span className="text-xs sm:text-sm font-bold tracking-tight">Top Picks</span>
                {category.slug !== "food" && category.slug !== "drinks" && category.slug !== "fashion" && category.slug !== "beauty" && category.slug !== "electronics" && category.slug !== "vehicles" && (
                  <span className="text-[10px] sm:text-[11px] text-zinc-400 font-medium">
                    All {isGamingSubcategory ? "Gaming" : category.name}
                  </span>
                )}
              </div>
            </Link>

            {/* 2. SUBCATEGORY ITEMS */}
            {sidebarItems.map((sub) => {
              const isActive = activeItemId === sub.id;
              const href = getSubcategoryHref(sub.id);

              return (
                <Link
                  key={sub.id}
                  href={href}
                  className={`group flex items-center gap-3 w-full px-3.5 sm:px-4 py-3 sm:py-3.5 transition ${
                    isActive
                      ? "bg-orange-50/90 text-orange-950 font-bold border-l-4 border-orange-500 rounded-none"
                      : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
                  }`}
                >
                  <div className="relative h-11 w-11 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200/70">
                    <img
                      src={sub.image}
                      alt={sub.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-200"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2 text-left">
                    {sub.name}
                  </span>
                </Link>
              );
            })}
          </aside>

          {/* Independent Right Product Grid */}
          <section className="flex-1 min-w-0 pl-4 sm:pl-6 md:pl-8">
            {category.slug === "fashion" && isTopPicksActive && (
              <div className="mb-4 sm:mb-5 flex items-center gap-2">
                <Link
                  href={`/category/fashion${query ? `?q=${encodeURIComponent(query)}` : ""}`}
                  scroll={false}
                  className={`inline-flex shrink-0 items-center rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    !genderParam || genderParam === "all"
                      ? "bg-zinc-950 text-white shadow-xs"
                      : "border border-zinc-200/90 bg-white text-zinc-700 hover:border-orange-500 hover:text-zinc-950 hover:bg-orange-50/50"
                  }`}
                >
                  All
                </Link>
                <Link
                  href={`/category/fashion?gender=men${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                  scroll={false}
                  className={`inline-flex shrink-0 items-center rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    genderParam === "men"
                      ? "bg-zinc-950 text-white shadow-xs"
                      : "border border-zinc-200/90 bg-white text-zinc-700 hover:border-orange-500 hover:text-zinc-950 hover:bg-orange-50/50"
                  }`}
                >
                  Men
                </Link>
                <Link
                  href={`/category/fashion?gender=women${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                  scroll={false}
                  className={`inline-flex shrink-0 items-center rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    genderParam === "women"
                      ? "bg-zinc-950 text-white shadow-xs"
                      : "border border-zinc-200/90 bg-white text-zinc-700 hover:border-orange-500 hover:text-zinc-950 hover:bg-orange-50/50"
                  }`}
                >
                  Women
                </Link>
              </div>
            )}

            {items.length > 0 ? (
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {items.map((item, idx) => (
                  <CatalogCard
                    key={item.id}
                    href={`/catalog/${item.slug}`}
                    image={item.image}
                    name={item.name}
                    category={itemCategoryLabel}
                    priority={idx < 8}
                    action={
                      <AddToWishlistButton
                        catalogItemId={item.id}
                        isLoggedIn={Boolean(session?.userId)}
                        floating
                      />
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[24px] border border-dashed border-zinc-300 bg-white p-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-zinc-950">No items found</h3>
                  <p className="mt-1 text-xs text-zinc-600 max-w-md">
                    No products matched this subcategory or search keyword.
                  </p>
                </div>
                <Link
                  href={session?.userId ? "/dashboard/items" : "/login"}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 text-xs font-bold text-white shadow-sm transition hover:bg-orange-500 hover:text-black shrink-0"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Custom Item</span>
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
