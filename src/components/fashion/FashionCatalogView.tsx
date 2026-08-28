"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Sparkles,
  Shirt,
  Footprints,
  Watch,
  ShoppingBag,
  Gem,
  Glasses,
  Zap,
  Crown,
  Flame,
  User,
  Users,
  Plus,
} from "lucide-react";
import FashionCarouselSection from "./FashionCarouselSection";
import FashionProductCard from "./FashionProductCard";
import {
  FASHION_SECTIONS,
  getFullFashionCatalog,
  type FashionProduct,
} from "@/lib/fashion-catalog";

interface FashionCatalogViewProps {
  isLoggedIn: boolean;
  initialQuery?: string;
  catalogDbMap?: Record<string, string>;
}

const FASHION_SUBCATEGORY_NAV_ITEMS = [
  { id: "all", label: "All Fashion", icon: Sparkles },
  { id: "trending", label: "Trending", icon: Flame, sectionId: "trending-fashion" },
  { id: "sneakers", label: "Sneakers", icon: Footprints, sectionId: "sneaker-culture" },
  { id: "streetwear", label: "Streetwear", icon: Flame, sectionId: "streetwear-creator-fits" },
  { id: "men", label: "Men", icon: User, sectionId: "mens-style-essentials" },
  { id: "women", label: "Women", icon: Sparkles, sectionId: "womens-contemporary-edit" },
  { id: "unisex", label: "Unisex", icon: Users, sectionId: "streetwear-creator-fits" },
  { id: "ethnic", label: "Ethnic Wear", icon: Crown, sectionId: "indian-ethnic-festive" },
  { id: "watches", label: "Watches", icon: Watch, sectionId: "timepieces-watches" },
  { id: "bags", label: "Bags", icon: ShoppingBag, sectionId: "bags-backpacks-carry" },
  { id: "sportswear", label: "Sportswear", icon: Zap, sectionId: "activewear-sportswear" },
  { id: "luxury", label: "Luxury", icon: Crown, sectionId: "premium-luxury-statements" },
  { id: "footwear", label: "Footwear", icon: Footprints, sectionId: "footwear-beyond-sneakers" },
  { id: "jewellery", label: "Jewellery", icon: Gem, sectionId: "jewellery-accessories" },
  { id: "accessories", label: "Accessories", icon: Glasses, sectionId: "jewellery-accessories" },
  { id: "tshirts", label: "T-Shirts", icon: Shirt, sectionId: "tops-hoodies-layers" },
  { id: "shirts", label: "Shirts", icon: Shirt, sectionId: "mens-style-essentials" },
  { id: "dresses", label: "Dresses", icon: Sparkles, sectionId: "womens-contemporary-edit" },
  { id: "jeans", label: "Jeans", icon: Shirt, sectionId: "bottoms-cargos-denims" },
  { id: "trousers", label: "Trousers", icon: Shirt, sectionId: "bottoms-cargos-denims" },
];

export default function FashionCatalogView({
  isLoggedIn,
  initialQuery = "",
  catalogDbMap = {},
}: FashionCatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeSectionModal, setActiveSectionModal] = useState<string | null>(null);
  const [modalSearch, setModalSearch] = useState("");

  const allProducts = useMemo(() => getFullFashionCatalog(), []);

  // Map products by section
  const sectionProductsMap = useMemo(() => {
    const map = new Map<string, FashionProduct[]>();
    const productLookup = new Map<string, FashionProduct>(allProducts.map((p) => [p.id, p]));

    for (const section of FASHION_SECTIONS) {
      const prods: FashionProduct[] = [];
      for (const pid of section.productIds) {
        const found = productLookup.get(pid);
        if (found) prods.push(found);
      }
      map.set(section.id, prods);
    }
    return map;
  }, [allProducts]);

  // Global search filtering across name, brand, subcategory, tags, and description
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    return allProducts.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchSub = p.subcategory.toLowerCase().includes(q);
      const matchSection = p.sectionTitle.toLowerCase().includes(q);
      const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
      const matchDesc = p.description.toLowerCase().includes(q);
      return matchName || matchBrand || matchSub || matchSection || matchTags || matchDesc;
    });
  }, [allProducts, searchQuery]);

  const scrollToSection = (sectionId?: string) => {
    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeModalSection = useMemo(() => {
    if (!activeSectionModal) return null;
    return FASHION_SECTIONS.find((s) => s.id === activeSectionModal) || null;
  }, [activeSectionModal]);

  const activeModalProducts = useMemo(() => {
    if (!activeSectionModal) return [];
    const prods = sectionProductsMap.get(activeSectionModal) || [];
    const q = modalSearch.trim().toLowerCase();
    if (!q) return prods;
    return prods.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [activeSectionModal, sectionProductsMap, modalSearch]);

  return (
    <div className="space-y-8">
      {/* 1. Category Hero Banner */}
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-6 md:p-10 text-white shadow-xl">
        <div className="absolute right-0 top-0 -mr-20 -mt-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -mb-20 h-48 w-48 rounded-full bg-orange-600/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/15 border border-orange-500/30 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-orange-400">
              <Shirt className="h-3.5 w-3.5" />
              Creator Catalog • Fashion & Wardrobe
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              FASHION<span className="text-orange-500">.</span>
            </h1>

            <p className="text-sm md:text-base text-zinc-300 font-normal leading-relaxed max-w-xl">
              Streetwear staples, iconic sneakers, handcrafted Indian ethnic wear, Swiss & digital timepieces, everyday bags, and creator signature fits. Add pieces directly to your public wishlist.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-zinc-400">
              <span className="inline-flex items-center rounded-full bg-zinc-900/80 px-3 py-1 border border-zinc-800">
                ✨ 16 Discovery Shelves
              </span>
              <span className="inline-flex items-center rounded-full bg-zinc-900/80 px-3 py-1 border border-zinc-800">
                👟 140+ Fashion & Footwear
              </span>
              <span className="inline-flex items-center rounded-full bg-zinc-900/80 px-3 py-1 border border-zinc-800 text-orange-400">
                ⚡ 0% Commerce Markup
              </span>
            </div>
          </div>

          {/* Search Box on Header */}
          <div className="w-full md:w-80 lg:w-96 space-y-2 shrink-0">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Search Fashion Catalog
            </label>
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-4 h-4 w-4 text-zinc-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sneakers, hoodie, watch, saree, Levi's..."
                className="h-12 w-full rounded-2xl border border-zinc-700 bg-zinc-900/90 pl-11 pr-10 text-xs md:text-sm font-medium text-white placeholder-zinc-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 p-1 text-zinc-400 hover:text-white"
                  title="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Subcategory Quick Navigation Bar */}
      <section className="sticky top-[110px] md:top-[118px] z-20 -mx-4 px-4 md:-mx-6 md:px-6 py-2 bg-[#f7f3ee]/95 backdrop-blur-md border-y border-zinc-200/80">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {FASHION_SUBCATEGORY_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  scrollToSection(item.sectionId);
                }}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-zinc-200/90 bg-white px-3.5 py-1.5 text-xs font-bold text-zinc-800 shadow-xs transition hover:border-orange-500 hover:bg-orange-50/50 hover:text-zinc-950 active:scale-95"
              >
                <Icon className="h-3.5 w-3.5 text-orange-500" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Search Results Mode (When User is Searching) */}
      {searchQuery.trim() ? (
        <section className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                Fashion Search
              </p>
              <h2 className="text-xl md:text-2xl font-black text-zinc-950">
                Results for &ldquo;{searchQuery}&rdquo; ({filteredProducts.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-zinc-600 hover:text-orange-600 transition-colors"
            >
              Clear Search
            </button>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredProducts.map((product) => {
                const dbId = catalogDbMap[product.id] || product.id;
                return (
                  <FashionProductCard
                    key={product.id}
                    id={product.id}
                    slug={product.id}
                    name={product.name}
                    brand={product.brand}
                    subcategory={product.subcategory}
                    imageUrl={product.imageUrl}
                    description={product.description}
                    tags={product.tags}
                    badge={product.badge}
                    trending={product.trending}
                    catalogDbId={dbId}
                    isLoggedIn={isLoggedIn}
                  />
                );
              })}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-zinc-300 bg-white p-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-zinc-950">
                  No fashion items found matching &ldquo;{searchQuery}&rdquo;
                </h3>
                <p className="mt-1 text-xs text-zinc-600 max-w-md">
                  Try searching for brand names like Nike, Jordan, Adidas, Casio, Levi&apos;s, FabIndia, Zara, or create a custom item.
                </p>
              </div>
              <Link
                href={isLoggedIn ? "/dashboard/items" : "/login"}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 text-xs font-bold text-white shadow-sm transition hover:bg-orange-500 hover:text-black shrink-0"
              >
                <Plus className="h-4 w-4" />
                <span>Create Custom Item</span>
              </Link>
            </div>
          )}
        </section>
      ) : (
        /* 4. Full 16-Section Horizontal Carousels Catalog */
        <div className="space-y-12 md:space-y-16">
          {FASHION_SECTIONS.map((section) => {
            const products = sectionProductsMap.get(section.id) || [];
            if (products.length === 0) return null;

            return (
              <FashionCarouselSection
                key={section.id}
                id={section.id}
                title={section.title}
                subtitle={section.subtitle}
                badge={section.badge}
                products={products}
                isLoggedIn={isLoggedIn}
                catalogDbMap={catalogDbMap}
                onSeeAll={(secId) => {
                  setActiveSectionModal(secId);
                  setModalSearch("");
                }}
              />
            );
          })}
        </div>
      )}

      {/* 5. "See All" Section Modal / Full Grid Drawer */}
      {activeModalSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative flex flex-col max-h-[90vh] w-full max-w-6xl rounded-[32px] border border-zinc-200/90 bg-[#f7f3ee] shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 bg-white p-5 md:p-6 shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  {activeModalSection.badge ? (
                    <span className="inline-flex items-center rounded-lg bg-orange-500/10 px-2 py-0.5 text-[11px] font-extrabold text-orange-600">
                      {activeModalSection.badge}
                    </span>
                  ) : null}
                  <h2 className="text-xl md:text-2xl font-black text-zinc-950">
                    {activeModalSection.title}
                  </h2>
                </div>
                <p className="text-xs md:text-sm text-zinc-600 font-medium mt-1">
                  {activeModalSection.subtitle} ({activeModalProducts.length} items)
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Modal Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="search"
                    value={modalSearch}
                    onChange={(e) => setModalSearch(e.target.value)}
                    placeholder="Filter this section..."
                    className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 text-xs font-medium text-zinc-900 outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSectionModal(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-black transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Grid Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar">
              {activeModalProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {activeModalProducts.map((product) => {
                    const dbId = catalogDbMap[product.id] || product.id;
                    return (
                      <FashionProductCard
                        key={product.id}
                        id={product.id}
                        slug={product.id}
                        name={product.name}
                        brand={product.brand}
                        subcategory={product.subcategory}
                        imageUrl={product.imageUrl}
                        description={product.description}
                        tags={product.tags}
                        badge={product.badge}
                        trending={product.trending}
                        catalogDbId={dbId}
                        isLoggedIn={isLoggedIn}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center">
                  <p className="text-xs font-bold text-zinc-700">
                    No fashion items match &ldquo;{modalSearch}&rdquo; in this section.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
