import Link from "next/link";
import { ChevronRight, ArrowRight, Sparkles, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import CatalogCard from "@/components/CatalogCard";
import CategoryIcon from "@/components/CategoryIcon";
import { getSession } from "@/lib/auth";
import { HOMEPAGE_CATEGORIES_GRID, getProductDisplayImage } from "@/lib/product-images";
import prisma from "@/lib/prisma";
import { searchCatalog } from "@/lib/search";

export const dynamic = "force-dynamic";

const HOMEPAGE_TOP_PICKS_SLUGS = [
  "iphone-duo",
  "iphone-18-pro-max-black",
  "iphone-18-pro-max-burgundy",
  "claude-max",
  "macbook-pro-14",
  "playstation-5-pro",
  "nvidia-geforce-rtx-5090",
  "porsche-911-gt3-rs",
  "bmw-s1000rr",
  "koenigsegg-jesko-absolut",
  "red-bull-energy-drink",
  "bugatti-chiron-super-sport",
  "biryani",
  "monster-ultra-energy-drink",
  "pizza",
  "ducati-panigale-v4r",
  "porsche-911",
  "kawasaki-ninja-h2r",
  "diet-coke",
  "airpods-pro",
  "gym-membership",
] as const;

const HOMEPAGE_FOOD_ITEMS_DEF = [
  { name: "Biryani", slug: "biryani" },
  { name: "Pizza", slug: "pizza" },
  { name: "Shawarma", slug: "shawarma" },
  { name: "Burger", slug: "burger" },
  { name: "Pasta", slug: "pasta" },
  { name: "Sandwich", slug: "sandwich" },
  { name: "Momos", slug: "momo", fallbackSlug: "momos" },
  { name: "Vada Pav", slug: "vada-pav" },
  { name: "Tandoori Chicken", slug: "tandoori-chicken" },
  { name: "Mutton", slug: "mutton" },
  { name: "Waffles", slug: "waffles" },
  { name: "Thali", slug: "thali" },
  { name: "Chole Bhature", slug: "chole-bhature" },
  { name: "Paneer", slug: "paneer" },
  { name: "Grilled Chicken", slug: "grilled-chicken" },
] as const;

const HOMEPAGE_DRINKS_ITEMS_DEF = [
  { name: "Red Bull Energy Drink", slug: "red-bull-energy-drink" },
  { name: "Monster Energy Drink", slug: "monster-energy-drink" },
  { name: "Monster Ultra Energy Drink", slug: "monster-ultra-energy-drink" },
  { name: "Diet Coke", slug: "diet-coke" },
  { name: "Hell Energy Drink", slug: "hell-energy-drink" },
  { name: "Coca Cola Zero Sugar Can", slug: "coca-cola-zero-sugar-can" },
  { name: "Pepsi", slug: "pepsi" },
  { name: "Sprite Zero", slug: "sprite-zero" },
  { name: "Gatorade Energy Drink", slug: "gatorade-energy-drink" },
  { name: "Smooth Chocolate Milk Drink", slug: "smooth-chocolate-milk-drink" },
  { name: "Thums Up", slug: "thums-up" },
  { name: "Mountain Dew", slug: "mountain-dew" },
] as const;

const HOMEPAGE_FASHION_ITEMS_DEF = [
  { name: "Classic MA-1 Bomber Jacket", slug: "classic-ma-1-bomber-jacket" },
  { name: "220 GSM Oversized Plain Drop-Shoulder Tee", slug: "220-gsm-oversized-plain-drop-shoulder-tee" },
  { name: "Bias-Cut Silk-Satin Slip Midi Dress", slug: "bias-cut-silk-satin-slip-midi-dress" },
  { name: "Classic Denim Mini Skirt", slug: "classic-denim-mini-skirt" },
  { name: "Faux Leather Moto Jacket", slug: "faux-leather-moto-jacket" },
  { name: "Off-Shoulder Ruched Top", slug: "off-shoulder-ruched-top" },
  { name: "Pleated Mini Skirt", slug: "pleated-mini-skirt" },
  { name: "Fitted Ribbed Baby Tee", slug: "fitted-ribbed-baby-tee" },
  { name: "Cotton Dad Cap (Women's)", slug: "cotton-dad-cap-women-s" },
  { name: "Bespoke Royal Bandhgala Jodhpuri Suit", slug: "bespoke-royal-bandhgala-jodhpuri-suit" },
  { name: "Oversized Hoodie", slug: "oversized-hoodie" },
  { name: "Crisp Cotton Poplin Oversized Boyfriend Shirt", slug: "crisp-cotton-poplin-oversized-boyfriend-shirt" },
  { name: "Converse Chuck 70 Vintage Canvas", slug: "converse-chuck-70-vintage-canvas" },
  { name: "Fossil Grant Chronograph Leather Watch", slug: "fossil-grant-chronograph-leather-watch" },
  { name: "Brushed Silver Geometric Signet Ring", slug: "brushed-silver-geometric-signet-ring" },
  { name: "FC Barcelona Home Jersey", slug: "fc-barcelona-home-jersey" },
  { name: "Coach Tabby 26 Polished Leather Shoulder Bag", slug: "coach-tabby-26-polished-leather-shoulder-bag" },
  { name: "Structured Boned Corset Top", slug: "structured-boned-corset-top" },
  { name: "Cat-Eye Acetate Sunglasses", slug: "cat-eye-acetate-sunglasses" },
  { name: "Pointed-Toe Stiletto Heels", slug: "pointed-toe-stiletto-heels" },
] as const;

interface HomePageProps {
  searchParams?: Promise<{ q?: string }> | { q?: string };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const session = await getSession();
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q?.trim() || "";

  const [categories, topPicksDbItems, foodDbItems, drinksDbItems, fashionDbItems, searchResults] = await Promise.all([
    prisma.category.findMany({
      where: { active: true },
      include: {
        catalogItems: {
          where: { active: true },
          orderBy: [{ featured: "desc" }, { displayOrder: "asc" }],
          take: 6,
        },
      },
      orderBy: { displayOrder: "asc" },
    }),
    prisma.catalogItem.findMany({
      where: {
        active: true,
        slug: { in: [...HOMEPAGE_TOP_PICKS_SLUGS] },
      },
      include: { category: true },
    }),
    prisma.catalogItem.findMany({
      where: {
        active: true,
        category: { slug: "food" },
        slug: { in: HOMEPAGE_FOOD_ITEMS_DEF.flatMap((f) => [f.slug, ("fallbackSlug" in f ? f.fallbackSlug : f.slug)]) },
      },
      include: { category: true },
    }),
    prisma.catalogItem.findMany({
      where: {
        active: true,
        category: { slug: "drinks" },
        slug: { in: HOMEPAGE_DRINKS_ITEMS_DEF.map((d) => d.slug) },
      },
      include: { category: true },
    }),
    prisma.catalogItem.findMany({
      where: {
        active: true,
        category: { slug: "fashion" },
        slug: { in: HOMEPAGE_FASHION_ITEMS_DEF.map((f) => f.slug) },
      },
      include: { category: true },
    }),
    query
      ? searchCatalog(query, { limitItems: 48 })
      : Promise.resolve({ categories: [], subcategories: [], items: [], totalMatches: 0 }),
  ]);

  const topPicksMap = new Map(topPicksDbItems.map((item) => [item.slug, item]));
  const topPicksItems = HOMEPAGE_TOP_PICKS_SLUGS
    .map((slug) => topPicksMap.get(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const foodMap = new Map(foodDbItems.map((item) => [item.slug, item]));
  const foodSectionItems = HOMEPAGE_FOOD_ITEMS_DEF.map((def) => {
    const item = foodMap.get(def.slug) || ("fallbackSlug" in def ? foodMap.get(def.fallbackSlug) : undefined);
    if (!item) return null;
    return {
      ...item,
      displayName: def.name,
    };
  }).filter((item): item is NonNullable<typeof item> => Boolean(item));

  const drinksMap = new Map(drinksDbItems.map((item) => [item.slug, item]));
  const drinksSectionItems = HOMEPAGE_DRINKS_ITEMS_DEF.map((def) => {
    const item = drinksMap.get(def.slug);
    if (!item) return null;
    return {
      ...item,
      displayName: def.name,
    };
  }).filter((item): item is NonNullable<typeof item> => Boolean(item));

  const fashionMap = new Map(fashionDbItems.map((item) => [item.slug, item]));
  const fashionSectionItems = HOMEPAGE_FASHION_ITEMS_DEF.map((def) => {
    const item = fashionMap.get(def.slug);
    if (!item) return null;
    return {
      ...item,
      displayName: def.name,
    };
  }).filter((item): item is NonNullable<typeof item> => Boolean(item));

  // Swap Subscriptions and Vehicles positions ONLY for the homepage category navigation row
  const navCategories = [...categories];
  const subIdx = navCategories.findIndex((c) => c.slug === "subscriptions");
  const vehIdx = navCategories.findIndex((c) => c.slug === "vehicles");
  if (subIdx !== -1 && vehIdx !== -1) {
    const temp = navCategories[subIdx];
    navCategories[subIdx] = navCategories[vehIdx];
    navCategories[vehIdx] = temp;
  }

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      {/* Sticky Header & Category Navigation Bar */}
      <div className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl">
        <Header
          initialQuery={query}
          isLoggedIn={Boolean(session?.userId)}
          username={session?.username}
          searchAction="/"
        />

        {/* Scrollable Horizontal Category Navigation Bar */}
        <div className="border-b border-zinc-200/80 bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center gap-2.5 md:gap-3 overflow-x-auto px-4 py-3 no-scrollbar md:px-6">
            <Link
              href="/"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-[13px] md:text-sm font-bold text-white shadow-sm transition hover:bg-zinc-800"
            >
              <Sparkles className="h-4 w-4 md:h-[18px] md:w-[18px] text-orange-400" />
              <span>All</span>
            </Link>
            {navCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-zinc-200/90 bg-white px-4 py-2 text-[13px] md:text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-orange-500 hover:text-zinc-950 hover:bg-orange-50/50"
              >
                <CategoryIcon name={category.icon} className="h-4 w-4 md:h-[18px] md:w-[18px] text-zinc-500" />
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Body */}
      <main className="mx-auto max-w-7xl flex-1 px-4 py-5 md:px-6 md:py-7 w-full">
        {/* Two-board Hero Section */}
        {!query && (
          <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-stretch">
            {/* Board 1: Create My Wishlist */}
            <div className="relative overflow-hidden rounded-[26px] md:rounded-[28px] bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-6 md:p-8 text-white shadow-md border border-zinc-800/60 flex flex-col justify-between h-full">
              <div className="absolute right-0 top-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-400">
                  <Sparkles className="h-3 w-3" />
                  India&apos;s Creator Wishlist Platform
                </div>
                <h1 className="text-2xl font-black tracking-tight md:text-3xl text-white">
                  Get what you actually want.
                </h1>
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed max-w-lg">
                  Create a public wishlist of items, upgrades, and dreams. Share it with your supporters so they can back what truly matters to you.
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-1 flex items-center">
                <Link
                  href={session?.userId ? "/dashboard/items" : "/login"}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 text-xs md:text-sm font-bold text-black shadow-lg shadow-orange-500/20 transition hover:bg-orange-400 active:scale-98"
                >
                  <span>{session?.userId ? "Go to My Wishlist" : "Create My Wishlist"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Board 2: Create Custom Item */}
            <div className="relative overflow-hidden rounded-[26px] md:rounded-[28px] bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 p-6 md:p-8 text-white shadow-md border border-zinc-800/80 flex flex-col justify-between h-full">
              <div className="absolute right-0 bottom-0 -mr-12 -mb-12 h-40 w-40 rounded-full bg-orange-500/15 blur-2xl pointer-events-none" />
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-400">
                  <Plus className="h-3 w-3" />
                  Personalized Items
                </div>
                <h2 className="text-2xl font-black tracking-tight md:text-3xl text-white">
                  Can&apos;t find it? Add your own.
                </h2>
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed max-w-md">
                  Have a specific upgrade, course, or dream gear in mind? Create a custom wishlist item with your own name, image, and link.
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-1 flex items-center">
                <Link
                  href={session?.userId ? "/dashboard/items" : "/login?redirect=%2Fdashboard%2Fitems"}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-zinc-700/90 bg-black px-5 text-xs md:text-sm font-bold text-white shadow-md shadow-black/40 transition hover:border-orange-500 hover:bg-zinc-950 hover:text-orange-400 active:scale-98"
                >
                  <Plus className="h-4 w-4 text-orange-400" />
                  <span>Create Custom Item</span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Search Results Section */}
        {query ? (
          <section className="space-y-8">
            <div className="flex items-end justify-between gap-4 border-b border-zinc-200 pb-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600">Search Results</p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-zinc-950">
                  Results for &ldquo;{query}&rdquo;
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Found {searchResults.totalMatches} result{searchResults.totalMatches === 1 ? "" : "s"} across categories, subcategories, and items
                </p>
              </div>
              <Link
                href="/"
                className="text-xs font-bold text-zinc-500 hover:text-zinc-950 transition-colors"
              >
                Clear Search
              </Link>
            </div>

            {/* Zero results state */}
            {searchResults.totalMatches === 0 ? (
              <div className="rounded-[28px] border border-zinc-200 bg-zinc-50/50 p-8 md:p-12 text-center max-w-xl mx-auto my-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600 mb-4">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h3 className="text-lg md:text-xl font-black text-zinc-950">
                  No results found for &ldquo;{query}&rdquo;
                </h3>
                <p className="mt-2 text-xs md:text-sm text-zinc-600 leading-relaxed">
                  We couldn&apos;t find any categories, subcategories, or items matching your search.
                  Try searching for a different keyword or create your own custom wishlist item.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/"
                    className="inline-flex h-10 items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 text-xs font-bold text-zinc-700 transition hover:bg-zinc-100"
                  >
                    Clear Search
                  </Link>
                  <Link
                    href={session?.userId ? "/dashboard/items" : "/login"}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-xs font-bold text-black shadow-md shadow-orange-500/20 transition hover:bg-orange-400"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Custom Item</span>
                  </Link>
                </div>
              </div>
            ) : null}

            {/* Matching Categories */}
            {searchResults.categories.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  <h3 className="text-sm md:text-base font-extrabold text-zinc-900 tracking-tight">
                    Categories ({searchResults.categories.length})
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {searchResults.categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={cat.href}
                      className="group relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-xs transition-all hover:border-orange-500 hover:shadow-md hover:bg-orange-50/30 flex flex-col items-center text-center gap-2.5"
                    >
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="h-16 w-16 rounded-xl object-cover border border-zinc-200 bg-zinc-100 group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                          <CategoryIcon name={cat.icon} className="h-8 w-8" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs md:text-sm font-bold text-zinc-900 group-hover:text-orange-600 transition">
                          {cat.name}
                        </h4>
                        <span className="text-[10px] font-semibold text-zinc-400 group-hover:text-orange-500 transition">
                          View Category &rarr;
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Matching Subcategories */}
            {searchResults.subcategories.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  <h3 className="text-sm md:text-base font-extrabold text-zinc-900 tracking-tight">
                    Subcategories ({searchResults.subcategories.length})
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {searchResults.subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      href={sub.href}
                      className="group relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-3.5 shadow-xs transition-all hover:border-orange-500 hover:shadow-md hover:bg-orange-50/30 flex flex-col items-center text-center gap-2"
                    >
                      {sub.image ? (
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="h-16 w-16 rounded-xl object-cover border border-zinc-200 bg-zinc-100 group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                          <Sparkles className="h-7 w-7" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs md:text-sm font-bold text-zinc-900 group-hover:text-orange-600 transition line-clamp-1">
                          {sub.name}
                        </h4>
                        <span className="text-[11px] font-medium text-zinc-500">
                          in {sub.parentCategoryName}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Matching Items */}
            {searchResults.items.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  <h3 className="text-sm md:text-base font-extrabold text-zinc-900 tracking-tight">
                    Wishlist Items ({searchResults.items.length})
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
                  {searchResults.items.map((item) => (
                    <CatalogCard
                      key={item.id}
                      href={item.href}
                      image={item.image}
                      name={item.name}
                      category={item.categoryName}
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
              </div>
            ) : null}

            {/* If results exist, prompt custom item creation below */}
            {searchResults.totalMatches > 0 ? (
              <div className="rounded-[28px] border border-dashed border-zinc-300 bg-white p-6 md:p-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-zinc-950">Can&apos;t find what you&apos;re looking for?</h3>
                  <p className="mt-1 text-xs text-zinc-600 max-w-md">
                    Create a completely custom wishlist item with your own name, image, description, and link.
                  </p>
                </div>
                <Link
                  href={session?.userId ? "/dashboard/items" : "/login"}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 text-xs font-bold text-white shadow-sm transition hover:bg-orange-500 hover:text-black shrink-0"
                >
                  <span>+ Create Custom Item</span>
                </Link>
              </div>
            ) : null}
          </section>
        ) : null}

        {/* Discovery Sections / Shelves (Only if not in search mode) */}
        {!query && (
          <div className="space-y-10 md:space-y-12">
            {/* Dedicated Categories Grid (Zepto-style visual discovery: exactly 20 tiles in 10 cols x 2 rows, no heading) */}
            <section id="categories">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3 sm:gap-4">
                {HOMEPAGE_CATEGORIES_GRID.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200/80 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-hover:border-orange-500/50">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span className="mt-2 text-xs font-semibold text-zinc-800 transition-colors group-hover:text-orange-600 line-clamp-2 leading-tight">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* 1. Top Picks Row */}
            <section className="space-y-4">
              <div className="flex items-end justify-between gap-4 border-b border-zinc-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-black tracking-tight text-zinc-950">Top Picks</h2>
                    <p className="text-[11px] text-zinc-500 hidden sm:block">A handpicked selection of things worth wanting.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 sm:gap-3.5 overflow-x-auto pb-2 pt-1 no-scrollbar">
                {topPicksItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="w-[145px] sm:w-[160px] md:w-[170px] shrink-0"
                  >
                    <CatalogCard
                      href={`/catalog/${item.slug}`}
                      image={getProductDisplayImage(item.category.slug, item.slug, item.image) || item.image}
                      name={item.name}
                      category={item.category.name}
                      priority={idx < 6}
                      action={
                        <AddToWishlistButton
                          catalogItemId={item.id}
                          isLoggedIn={Boolean(session?.userId)}
                          floating
                        />
                      }
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Category Shelves */}
            {categories.map((category) => (
              <section key={category.id} className="space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-zinc-200/80 text-zinc-800">
                      <CategoryIcon name={category.icon} className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-black tracking-tight text-zinc-950">
                        {category.name}
                      </h2>
                      {category.description ? (
                        <p className="text-[11px] text-zinc-500 hidden sm:block">
                          {category.description}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <Link
                    href={`/category/${category.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-zinc-600 hover:text-orange-600 transition-colors"
                  >
                    <span>View all</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {category.slug === "food" ? (
                  <div className="flex gap-2.5 sm:gap-3.5 overflow-x-auto pb-2 pt-1 no-scrollbar">
                    {foodSectionItems.map((item, idx) => (
                      <div
                        key={item.id}
                        className="w-[145px] sm:w-[160px] md:w-[170px] shrink-0"
                      >
                        <CatalogCard
                          href={`/catalog/${item.slug}`}
                          image={getProductDisplayImage("food", item.slug, item.image) || item.image}
                          name={item.displayName || item.name}
                          category={category.name}
                          priority={idx < 6}
                          action={
                            <AddToWishlistButton
                              catalogItemId={item.id}
                              isLoggedIn={Boolean(session?.userId)}
                              floating
                            />
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : category.slug === "drinks" ? (
                  <div className="flex gap-2.5 sm:gap-3.5 overflow-x-auto pb-2 pt-1 no-scrollbar">
                    {drinksSectionItems.map((item, idx) => (
                      <div
                        key={item.id}
                        className="w-[145px] sm:w-[160px] md:w-[170px] shrink-0"
                      >
                        <CatalogCard
                          href={`/catalog/${item.slug}`}
                          image={getProductDisplayImage("drinks", item.slug, item.image) || item.image}
                          name={item.displayName || item.name}
                          category={category.name}
                          priority={idx < 6}
                          action={
                            <AddToWishlistButton
                              catalogItemId={item.id}
                              isLoggedIn={Boolean(session?.userId)}
                              floating
                            />
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : category.slug === "fashion" ? (
                  <div className="flex gap-2.5 sm:gap-3.5 overflow-x-auto pb-2 pt-1 no-scrollbar">
                    {fashionSectionItems.map((item, idx) => (
                      <div
                        key={item.id}
                        className="w-[145px] sm:w-[160px] md:w-[170px] shrink-0"
                      >
                        <CatalogCard
                          href={`/catalog/${item.slug}`}
                          image={getProductDisplayImage("fashion", item.slug, item.image) || item.image}
                          name={item.displayName || item.name}
                          category={category.name}
                          priority={idx < 6}
                          action={
                            <AddToWishlistButton
                              catalogItemId={item.id}
                              isLoggedIn={Boolean(session?.userId)}
                              floating
                            />
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
                    {category.catalogItems.map((item) => (
                      <CatalogCard
                        key={item.id}
                        href={`/catalog/${item.slug}`}
                        image={item.image}
                        name={item.name}
                        category={category.name}
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
                )}
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Modern Footer */}
      <Footer />
    </div>
  );
}
