"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import FashionProductCard from "./FashionProductCard";
import type { FashionProduct } from "@/lib/fashion-catalog";

interface FashionCarouselSectionProps {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  products: FashionProduct[];
  isLoggedIn: boolean;
  catalogDbMap?: Record<string, string>;
  onSeeAll?: (sectionId: string) => void;
}

export default function FashionCarouselSection({
  id,
  title,
  subtitle,
  badge,
  products,
  isLoggedIn,
  catalogDbMap = {},
  onSeeAll,
}: FashionCarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [products]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth > 768 ? el.clientWidth * 0.75 : el.clientWidth * 0.85;
    const offset = direction === "left" ? -cardWidth : cardWidth;
    el.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section id={id} className="scroll-mt-32 space-y-4">
      {/* Section Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-zinc-200/90 pb-3.5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {badge ? (
              <span className="inline-flex items-center rounded-lg bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 text-[11px] font-extrabold text-orange-600">
                {badge}
              </span>
            ) : null}
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-zinc-950">
              {title}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-zinc-600 font-medium max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Action button & Navigation Chevrons */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {onSeeAll ? (
            <button
              type="button"
              onClick={() => onSeeAll(id)}
              className="inline-flex items-center gap-1 rounded-xl bg-zinc-100 hover:bg-orange-500 hover:text-black px-3.5 py-1.5 text-xs font-bold text-zinc-800 transition-all shadow-xs"
            >
              <span>See All ({products.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : null}

          {/* Carousel Arrow Controls */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-xs transition hover:border-zinc-400 hover:bg-zinc-50 disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-xs transition hover:border-zinc-400 hover:bg-zinc-50 disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Row */}
      <div className="relative -mx-4 px-4 md:-mx-6 md:px-6">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => {
            const dbId = catalogDbMap[product.id] || product.id;
            return (
              <div
                key={product.id}
                className="w-[220px] sm:w-[240px] md:w-[260px] lg:w-[270px] shrink-0 snap-start"
              >
                <FashionProductCard
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
