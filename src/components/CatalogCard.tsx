import Link from "next/link";
import { formatAddedCount } from "@/lib/format-count";

interface CatalogCardProps {
  href: string;
  image: string | null;
  name: string;
  category?: string;
  description?: string | null;
  addedCount?: number | null;
  action?: React.ReactNode;
  priority?: boolean;
}

export default function CatalogCard({
  href,
  image,
  name,
  addedCount,
  action,
  priority = false,
}: CatalogCardProps) {
  return (
    <article className="group flex flex-col w-full">
      {/* Compact Image Container with integrated bottom-right action */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl md:rounded-2xl border border-zinc-200/90 bg-zinc-50 shadow-xs transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:border-orange-500/40">
        <Link href={href} className="block h-full w-full overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding={priority ? "sync" : "async"}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-100" />
          )}
        </Link>

        {/* Compact Add to Wishlist button inside bottom-right of image */}
        {action ? (
          <div className="absolute bottom-1.5 right-1.5 md:bottom-2 md:right-2 z-10">
            {action}
          </div>
        ) : null}
      </div>

      {/* Product Name placed OUTSIDE and BELOW image container */}
      <Link href={href} className="mt-1 md:mt-2 block">
        <h3 className="line-clamp-2 text-[11px] md:text-xs font-semibold text-zinc-900 transition-colors group-hover:text-orange-600 leading-snug">
          {name}
        </h3>
      </Link>

      {/* Added count indicator */}
      {addedCount != null && Number(addedCount) > 0 ? (
        <p className="mt-0.5 md:mt-1 flex items-center gap-1 text-[10px] md:text-[11px] font-medium text-orange-600">
          <span className="text-[10px] md:text-xs leading-none text-orange-600" aria-hidden="true">👤</span>
          <span className="text-orange-600">{formatAddedCount(Number(addedCount))} added</span>
        </p>
      ) : null}
    </article>
  );
}
