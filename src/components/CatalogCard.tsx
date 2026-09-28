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
      <div className="relative aspect-square w-full overflow-hidden rounded-xl md:rounded-2xl border border-[#e8e8e4] bg-[#f7f7f4] shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.08)] group-hover:border-[#0a0a0a]">
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
            <div className="h-full w-full bg-gradient-to-br from-[#f7f7f4] via-[#f0f0ec] to-[#f7f7f4]" />
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
      <Link href={href} className="mt-1 md:mt-1.5 block">
        <h3 className="line-clamp-2 text-[11px] md:text-xs font-medium text-[#0a0a0a] transition-colors group-hover:text-black leading-snug tracking-normal">
          {name}
        </h3>
      </Link>

      {/* Added count indicator */}
      {addedCount != null && Number(addedCount) > 0 ? (
        <p className="mt-0.5 md:mt-1 flex items-center gap-1 text-[10px] md:text-[11px] font-normal text-zinc-500">
          <span className="text-[10px] md:text-xs leading-none text-zinc-400" aria-hidden="true">👤</span>
          <span className="text-zinc-500">{formatAddedCount(Number(addedCount))} added</span>
        </p>
      ) : null}
    </article>
  );
}
