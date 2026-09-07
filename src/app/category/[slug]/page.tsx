import Link from "next/link";
import { ChevronRight, ArrowLeft, Star, Sparkles, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import CatalogCard from "@/components/CatalogCard";
import CategoryIcon from "@/components/CategoryIcon";
import { getSession } from "@/lib/auth";
import { ensureCatalogSeeded } from "@/lib/catalog";
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

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ slug: string }> | { slug: string };
  searchParams?: Promise<{ q?: string; sub?: string; child?: string }> | { q?: string; sub?: string; child?: string };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  await ensureCatalogSeeded();
  const session = await getSession();
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q?.trim() || "";
  const subParam = resolvedSearchParams?.sub?.trim() || "";
  const childParam = resolvedSearchParams?.child?.trim() || "";

  const [category, allCategories] = await Promise.all([
    prisma.category.findUnique({
      where: { slug: resolvedParams.slug },
    }),
    prisma.category.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
    }),
  ]);

  if (!category) {
    notFound();
  }

  // Hierarchy context
  const isGamingSubcategory = category.slug === "electronics" && subParam.toLowerCase() === "gaming";
  const isElectronicsMobile = category.slug === "electronics" && subParam.toLowerCase() === "mobile";

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
    const mobileCategory = await prisma.category.findUnique({ where: { slug: "mobile" } });
    if (mobileCategory) {
      targetCategoryId = mobileCategory.id;
    }
  }

  const rawItems = await prisma.catalogItem.findMany({
    where: {
      active: true,
      categoryId: targetCategoryId,
      ...(query
        ? {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { shortDescription: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { name: "asc" }],
  });

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
    items = rawItems.filter((item) => matchesSubcategory(item, category.slug, activeSubDef.id));
  } else {
    items = rawItems;
  }

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

        {/* Zepto Category Architecture: Permanent Dedicated Left Sidebar + Right Product Grid */}
        <div className="flex gap-4 sm:gap-6 items-start">
          {/* Dedicated Left Navigation Sidebar */}
          <aside
            className={`w-32 sm:w-56 md:w-64 lg:w-72 shrink-0 self-start sticky ${
              isMainCategoryPage
                ? "top-[125px] max-h-[calc(100vh-140px)]"
                : "top-[75px] md:top-[80px] max-h-[calc(100vh-95px)]"
            } overflow-y-auto no-scrollbar rounded-2xl border border-zinc-200/90 bg-white shadow-xs p-1.5 sm:p-2 space-y-1`}
          >
            {/* 1. TOP PICKS (Prominent Zepto Star Option) */}
            <Link
              href={topPicksHref}
              className={`group flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3 p-2 sm:px-3 sm:py-3 rounded-xl transition ${
                isTopPicksActive
                  ? "bg-purple-50 text-purple-950 font-bold border-l-2 sm:border-l-4 border-purple-600 rounded-l-none shadow-xs"
                  : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
              }`}
            >
              <div
                className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl transition ${
                  isTopPicksActive
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-purple-100 text-purple-700 group-hover:scale-105"
                }`}
              >
                <Star className="h-5 w-5 fill-current" />
              </div>
              <div className="flex flex-col min-w-0 text-center sm:text-left">
                <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-tight">Top Picks</span>
                <span className="hidden sm:inline text-[10px] text-zinc-400 font-medium">
                  All {isGamingSubcategory ? "Gaming" : category.name}
                </span>
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
                  className={`group flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3 p-2 sm:px-3 sm:py-3 rounded-xl transition ${
                    isActive
                      ? "bg-orange-50/90 text-orange-950 font-bold border-l-2 sm:border-l-4 border-orange-500 rounded-l-none shadow-xs"
                      : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
                  }`}
                >
                  <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200/70">
                    <img
                      src={sub.image}
                      alt={sub.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-200"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs md:text-sm font-semibold leading-snug line-clamp-2 text-center sm:text-left">
                    {sub.name}
                  </span>
                </Link>
              );
            })}
          </aside>

          {/* Independent Right Product Grid */}
          <section className="flex-1 min-w-0">
            {items.length > 0 ? (
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {items.map((item) => (
                  <CatalogCard
                    key={item.id}
                    href={`/catalog/${item.slug}`}
                    image={item.image}
                    name={item.name}
                    category={itemCategoryLabel}
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
