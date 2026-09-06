import Link from "next/link";
import { ChevronRight, ArrowLeft, Sparkles, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import CatalogCard from "@/components/CatalogCard";
import CategoryIcon from "@/components/CategoryIcon";
import ElectronicsCatalogView from "@/components/electronics/ElectronicsCatalogView";
import MobilesCatalogView from "@/components/mobiles/MobilesCatalogView";
import FashionCatalogView from "@/components/fashion/FashionCatalogView";
import BeautyCatalogView from "@/components/beauty/BeautyCatalogView";
import { getSession } from "@/lib/auth";
import { ensureCatalogSeeded } from "@/lib/catalog";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ slug: string }> | { slug: string };
  searchParams?: Promise<{ q?: string }> | { q?: string };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  await ensureCatalogSeeded();
  const session = await getSession();
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q?.trim() || "";

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

  const items = await prisma.catalogItem.findMany({
    where: {
      active: true,
      categoryId: category.id,
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

  const isElectronics = category.slug === "electronics";
  const isMobiles = category.slug === "mobile" || category.slug === "mobiles";
  const isFashion = category.slug === "fashion";
  const isBeauty = category.slug === "beauty";
  const catalogDbMap: Record<string, string> = {};
  if (isElectronics || isMobiles || isFashion || isBeauty) {
    for (const it of items) {
      catalogDbMap[it.slug] = it.id;
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f3ee] text-zinc-950 flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      {/* Header */}
      <Header
        initialQuery={query}
        isLoggedIn={Boolean(session?.userId)}
        username={session?.username}
        searchAction={`/category/${category.slug}`}
      />

      {/* Horizontal Category Navigation Bar */}
      <div className="sticky top-[65px] md:top-[69px] z-30 border-b border-zinc-200/80 bg-[#f7f3ee]/95 backdrop-blur-md">
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
      <main className="mx-auto max-w-7xl flex-1 px-4 py-5 md:px-6 md:py-7 w-full">
        {/* Breadcrumb Navigation */}
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-zinc-500">
          <Link href="/" className="hover:text-zinc-950 transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-zinc-400" />
          <span className="text-zinc-900 font-bold">{category.name}</span>
        </div>

        {isElectronics ? (
          <ElectronicsCatalogView
            isLoggedIn={Boolean(session?.userId)}
            initialQuery={query}
            catalogDbMap={catalogDbMap}
          />
        ) : isMobiles ? (
          <MobilesCatalogView
            isLoggedIn={Boolean(session?.userId)}
            initialQuery={query}
            catalogDbMap={catalogDbMap}
          />
        ) : isFashion ? (
          <FashionCatalogView
            isLoggedIn={Boolean(session?.userId)}
            initialQuery={query}
            catalogDbMap={catalogDbMap}
          />
        ) : isBeauty ? (
          <BeautyCatalogView
            isLoggedIn={Boolean(session?.userId)}
            initialQuery={query}
            catalogDbMap={catalogDbMap}
          />
        ) : (
          <>
            {/* Category Banner Card */}
            <section className="mb-8 rounded-[28px] border border-zinc-200/90 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-orange-600">
                    <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-orange-500/10">
                      <CategoryIcon name={category.icon} className="h-4 w-4" />
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-wider">Wishlist Category</p>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-950">{category.name}</h1>
                  {category.description ? (
                    <p className="text-xs md:text-sm text-zinc-600 max-w-2xl leading-relaxed">{category.description}</p>
                  ) : null}
                </div>

                <div className="shrink-0">
                  <span className="inline-flex items-center rounded-2xl bg-zinc-100 px-4 py-2 text-xs font-bold text-zinc-700">
                    {items.length} {items.length === 1 ? "wishlist item" : "wishlist items"}
                  </span>
                </div>
              </div>
            </section>

            {/* Product Grid */}
            <section className="space-y-6">
              {items.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {items.map((item) => (
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
              ) : (
                <div className="rounded-[28px] border border-dashed border-zinc-300 bg-white p-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-zinc-950">No items match &ldquo;{query}&rdquo;</h3>
                    <p className="mt-1 text-xs text-zinc-600 max-w-md">
                      Try searching another keyword or create a custom item for your wishlist.
                    </p>
                  </div>
                  <Link
                    href={session?.userId ? "/dashboard/items" : "/login"}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 text-xs font-bold text-white shadow-sm transition hover:bg-orange-500 hover:text-black shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Custom Item</span>
                  </Link>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
