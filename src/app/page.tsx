import Link from "next/link";
import { ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import CatalogCard from "@/components/CatalogCard";
import CategoryIcon from "@/components/CategoryIcon";
import { getSession } from "@/lib/auth";
import { ensureCatalogSeeded } from "@/lib/catalog";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams?: Promise<{ q?: string }> | { q?: string };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  await ensureCatalogSeeded();

  const session = await getSession();
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q?.trim() || "";

  const [categories, featuredItems, searchResults] = await Promise.all([
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
      where: { active: true, featured: true },
      include: { category: true },
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
      take: 6,
    }),
    query
      ? prisma.catalogItem.findMany({
          where: {
            active: true,
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { shortDescription: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
              { category: { name: { contains: query, mode: "insensitive" } } },
            ],
          },
          include: { category: true },
          orderBy: [{ featured: "desc" }, { displayOrder: "asc" }],
          take: 24,
        })
      : Promise.resolve([]),
  ]);

  return (
    <div className="min-h-screen bg-[#f7f3ee] text-zinc-950 flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      {/* Sticky Header with Search */}
      <Header
        initialQuery={query}
        isLoggedIn={Boolean(session?.userId)}
        username={session?.username}
        searchAction="/"
      />

      {/* Sticky/Scrollable Horizontal Category Navigation Bar */}
      <div className="sticky top-[65px] md:top-[69px] z-30 border-b border-zinc-200/80 bg-[#f7f3ee]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2.5 no-scrollbar md:px-6">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-zinc-950 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-zinc-800"
          >
            <Sparkles className="h-3.5 w-3.5 text-orange-400" />
            <span>All</span>
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-200/90 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm transition hover:border-orange-500 hover:text-zinc-950 hover:bg-orange-50/50"
            >
              <CategoryIcon name={category.icon} className="h-3.5 w-3.5 text-zinc-500" />
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Body */}
      <main className="mx-auto max-w-7xl flex-1 px-4 py-5 md:px-6 md:py-7 w-full">
        {/* Compact Introductory Banner (No Giant SaaS Hero) */}
        {!query && (
          <section className="mb-8 overflow-hidden rounded-[28px] bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-6 text-white shadow-md md:p-8 relative">
            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-400">
                  <Sparkles className="h-3 w-3" />
                  India&apos;s Creator Wishlist Platform
                </div>
                <h1 className="text-2xl font-black tracking-tight md:text-3xl lg:text-4xl text-white">
                  Get what you actually want.
                </h1>
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed max-w-lg">
                  Create a public wishlist of items, upgrades, and dreams. Share it with your supporters so they can back what truly matters to you.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href={session?.userId ? "/dashboard/items" : "/login"}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 text-xs md:text-sm font-bold text-black shadow-lg shadow-orange-500/20 transition hover:bg-orange-400 active:scale-98"
                >
                  <span>{session?.userId ? "Go to My Wishlist" : "Create My Wishlist"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/category/dreams"
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900/60 px-4 text-xs md:text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white"
                >
                  Explore Dreams
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Search Results Section */}
        {query ? (
          <section className="space-y-6">
            <div className="flex items-end justify-between gap-4 border-b border-zinc-200 pb-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600">Search Results</p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-zinc-950">
                  Results for &ldquo;{query}&rdquo;
                </h2>
              </div>
              <Link
                href="/"
                className="text-xs font-bold text-zinc-500 hover:text-zinc-950 transition-colors"
              >
                Clear Search
              </Link>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {searchResults.map((item) => (
                  <CatalogCard
                    key={item.id}
                    href={`/catalog/${item.slug}`}
                    image={item.image}
                    name={item.name}
                    category={item.category.name}
                    description={item.shortDescription}
                    action={
                      <AddToWishlistButton
                        catalogItemId={item.id}
                        isLoggedIn={Boolean(session?.userId)}
                      />
                    }
                  />
                ))}
              </div>
            ) : null}

            {/* If no results or custom search prompt */}
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
          </section>
        ) : null}

        {/* Discovery Sections / Shelves (Only if not in search mode) */}
        {!query && (
          <div className="space-y-10 md:space-y-12">
            {/* 1. Trending Row */}
            <section className="space-y-4">
              <div className="flex items-end justify-between gap-4 border-b border-zinc-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-black tracking-tight text-zinc-950">Trending</h2>
                    <p className="text-[11px] text-zinc-500 hidden sm:block">Most popular items added to creator wishlists</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {featuredItems.map((item) => (
                  <CatalogCard
                    key={item.id}
                    href={`/catalog/${item.slug}`}
                    image={item.image}
                    name={item.name}
                    category={item.category.name}
                    description={item.shortDescription}
                    action={
                      <AddToWishlistButton
                        catalogItemId={item.id}
                        isLoggedIn={Boolean(session?.userId)}
                      />
                    }
                  />
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

                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {category.catalogItems.map((item) => (
                    <CatalogCard
                      key={item.id}
                      href={`/catalog/${item.slug}`}
                      image={item.image}
                      name={item.name}
                      category={category.name}
                      description={item.shortDescription}
                      action={
                        <AddToWishlistButton
                          catalogItemId={item.id}
                          isLoggedIn={Boolean(session?.userId)}
                        />
                      }
                    />
                  ))}
                </div>
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
