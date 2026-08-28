"use client";

import Link from "next/link";
import { useState } from "react";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import { Smartphone } from "lucide-react";

export interface MobilesProductCardProps {
  id: string;
  slug: string;
  name: string;
  brand: string;
  subcategory: string;
  imageUrl: string;
  description: string;
  tags?: string[];
  badge?: "HOT" | "TRENDING" | "NEW" | "POPULAR";
  trending?: boolean;
  catalogDbId?: string;
  isLoggedIn: boolean;
}

export default function MobilesProductCard({
  slug,
  name,
  brand,
  subcategory,
  imageUrl,
  description,
  badge,
  trending,
  catalogDbId,
  isLoggedIn,
}: MobilesProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const displayBadge = badge || (trending ? "HOT" : undefined);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-zinc-200/90 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-[0_20px_50px_rgba(249,115,22,0.12)]">
      {/* Top Image Container */}
      <Link
        href={`/catalog/${slug}`}
        className="relative block aspect-[1/1.08] w-full overflow-hidden bg-zinc-100/80"
      >
        {/* Skeleton shimmer while image loads */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-tr from-zinc-200 via-zinc-100 to-zinc-200" />
        )}

        {/* Real Product Image */}
        {!imageError ? (
          <img
            src={imageUrl}
            alt={`${brand} ${name}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-4 text-center">
            <div className="space-y-1">
              <Smartphone className="mx-auto h-6 w-6 text-orange-400" />
              <p className="text-[11px] font-bold text-zinc-300">{brand}</p>
              <p className="text-[10px] text-zinc-500 line-clamp-1">{name}</p>
            </div>
          </div>
        )}

        {/* Brand & Badge Tags */}
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5 z-10 pointer-events-none">
          <span className="inline-flex items-center rounded-full bg-black/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white border border-white/10 shadow-sm">
            {brand}
          </span>
          {displayBadge ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-black shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-black animate-ping" />
              {displayBadge}
            </span>
          ) : null}
        </div>

        <div className="absolute bottom-2.5 right-3 z-10 pointer-events-none">
          <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-zinc-700 border border-zinc-200/80 shadow-xs">
            {subcategory}
          </span>
        </div>
      </Link>

      {/* Content Body */}
      <div className="flex flex-1 flex-col justify-between gap-3.5 p-4">
        <div className="space-y-1.5">
          <Link href={`/catalog/${slug}`} className="group/title block">
            <h3 className="line-clamp-2 text-sm font-black text-zinc-950 transition-colors group-hover/title:text-orange-600 leading-snug">
              {name}
            </h3>
          </Link>
          {description ? (
            <p className="line-clamp-2 text-xs leading-relaxed text-zinc-600 font-normal">
              {description}
            </p>
          ) : null}
        </div>

        {/* Wishlist CTA */}
        <div className="pt-1">
          <AddToWishlistButton
            catalogItemId={catalogDbId || slug}
            isLoggedIn={isLoggedIn}
            compact
          />
        </div>
      </div>
    </article>
  );
}
