"use client";

import Link from "next/link";
import { useState } from "react";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import { Shirt } from "lucide-react";

export interface FashionProductCardProps {
  id: string;
  slug: string;
  name: string;
  brand: string;
  subcategory: string;
  imageUrl: string;
  description: string;
  tags?: string[];
  badge?: "HOT" | "TRENDING" | "NEW" | "POPULAR" | "PREMIUM" | "BESTSELLER";
  trending?: boolean;
  catalogDbId?: string;
  isLoggedIn: boolean;
}

export default function FashionProductCard({
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
}: FashionProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const displayBadge = badge || (trending ? "HOT" : undefined);

  return (
    <article className="group flex flex-col w-full">
      {/* Compact Image Container with bottom-right action */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[#e8e8e4] bg-[#f7f7f4] shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.08)] group-hover:border-[#0a0a0a]">
        <Link
          href={`/catalog/${slug}`}
          className="block h-full w-full overflow-hidden"
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
              className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#f7f7f4] p-2 text-center">
              <Shirt className="h-6 w-6 text-zinc-400" />
            </div>
          )}
        </Link>

        {/* Compact Add to Wishlist control inside bottom-right of image */}
        <div className="absolute bottom-2 right-2 z-10">
          <AddToWishlistButton
            catalogItemId={catalogDbId || slug}
            isLoggedIn={isLoggedIn}
            floating
          />
        </div>
      </div>

      {/* Product Name placed OUTSIDE and BELOW image container */}
      <Link href={`/catalog/${slug}`} className="mt-1.5 block">
        <h3 className="line-clamp-2 text-xs font-medium text-[#0a0a0a] transition-colors group-hover:text-black leading-snug tracking-normal">
          {name}
        </h3>
      </Link>
    </article>
  );
}
