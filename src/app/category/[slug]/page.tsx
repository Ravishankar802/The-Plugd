import Link from "next/link";
import { ChevronRight, ArrowLeft, Sparkles, Plus } from "lucide-react";
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
  matchesSubcategory,
} from "@/lib/subcategories";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ slug: string }> | { slug: string };
  searchParams?: Promise<{ q?: string; sub?: string }> | { q?: string; sub?: string };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  await ensureCatalogSeeded();
  const session = await getSession();
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q?.trim() || "";
  const subParam = resolvedSearchParams?.sub?.trim() || "";

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

  // Get subcategories for this category
  const subcategories = getSubcategoriesForCategory(category.slug);
  const hasSubcategories = subcategories.length > 0;
  const activeSubDef = subParam
    ? subcategories.find((s) => s.id.toLowerCase() === subParam.toLowerCase())
    : null;
  const activeSubId = activeSubDef ? activeSubDef.id : "all";

  // Special case: Mobile under Electronics
  const isElectronicsMobile = category.slug === "electronics" && activeSubId === "mobile";
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

  // Filter items by subcategory if a specific subcategory is selected (and not isElectronicsMobile)
  const items =
    activeSubDef && !isElectronicsMobile
      ? rawItems.filter((item) => matchesSubcategory(item, category.slug, activeSubDef.id))
      : rawItems;

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      {/* Header */}
      <Header
        initialQuery={query}
        isLoggedIn={Boolean(session?.userId)}
        username={session?.username}
        searchAction={`/category/${category.slug}`}
      />

      {/* Horizontal Category Navigation Bar */}
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

      {/* Main Content */}
      <main className="mx-auto max-w-7xl flex-1 px-4 py-5 md:px-6 md:py-6 w-full">
        {/* Breadcrumb & Summary */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-zinc-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-zinc-950 transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-zinc-400" />
            <Link
              href={`/category/${category.slug}`}
              className={activeSubDef ? "hover:text-zinc-950 transition-colors" : "text-zinc-900 font-bold"}
            >
              {category.name}
            </Link>
            {activeSubDef ? (
              <>
                <ChevronRight className="h-3 w-3 text-zinc-400" />
                <span className="text-orange-600 font-bold">{activeSubDef.name}</span>
              </>
            ) : null}
          </div>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-bold text-zinc-700">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        {hasSubcategories ? (
          /* Zepto Subcategory Layout: Left Sidebar + Right Product Grid */
          <div className="flex gap-4 sm:gap-6 items-start">
            {/* Left Subcategory Sidebar */}
            <aside className="w-28 sm:w-36 md:w-44 shrink-0 rounded-2xl border border-zinc-200/80 bg-white p-1.5 sm:p-2 sticky top-[125px] max-h-[calc(100vh-140px)] overflow-y-auto no-scrollbar shadow-xs">
              <div className="space-y-1">
                {/* "All" Option */}
                <Link
                  href={`/category/${category.slug}${query ? `?q=${encodeURIComponent(query)}` : ""}`}
                  className={`group flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2.5 p-2 text-center sm:text-left transition rounded-xl ${
                    activeSubId === "all"
                      ? "bg-orange-50 font-bold text-zinc-950 border-orange-500 sm:border-l-4 sm:rounded-l-none"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                  }`}
                >
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 border border-zinc-200/70 text-zinc-700 group-hover:scale-105 transition">
                    <Sparkles className={`h-4 w-4 ${activeSubId === "all" ? "text-orange-500" : "text-zinc-500"}`} />
                  </div>
                  <span className="text-[11px] sm:text-xs leading-tight">All</span>
                </Link>

                {/* Subcategory Items */}
                {subcategories.map((sub) => {
                  const isActive = activeSubId === sub.id;
                  const href = `/category/${category.slug}?sub=${sub.id}${
                    query ? `&q=${encodeURIComponent(query)}` : ""
                  }`;

                  return (
                    <Link
                      key={sub.id}
                      href={href}
                      className={`group flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2.5 p-2 text-center sm:text-left transition rounded-xl ${
                        isActive
                          ? "bg-orange-50 font-bold text-zinc-950 border-orange-500 sm:border-l-4 sm:rounded-l-none"
                          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                      }`}
                    >
                      <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-100 border border-zinc-200/70">
                        <img
                          src={sub.image}
                          alt={sub.name}
                          loading="lazy"
                          className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-200"
                        />
                      </div>
                      <span className="text-[11px] sm:text-xs leading-tight line-clamp-2">
                        {sub.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </aside>

            {/* Right Product Grid */}
            <section className="flex-1 min-w-0">
              {items.length > 0 ? (
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                  {items.map((item) => (
                    <CatalogCard
                      key={item.id}
                      href={`/catalog/${item.slug}`}
                      image={item.image}
                      name={item.name}
                      category={isElectronicsMobile ? "Mobile" : (activeSubDef?.name || category.name)}
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
        ) : (
          /* Categories with NO subcategories: Full Width Grid directly */
          <section>
            {items.length > 0 ? (
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
                {items.map((item) => (
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
            ) : (
              <div className="rounded-[24px] border border-dashed border-zinc-300 bg-white p-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-zinc-950">No items match &ldquo;{query}&rdquo;</h3>
                  <p className="mt-1 text-xs text-zinc-600 max-w-md">
                    Try searching another keyword or create a custom item for your wishlist.
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
        )}
      </main>

      <Footer />
    </div>
  );
}
