import Link from "next/link";

interface CatalogCardProps {
  href: string;
  image: string | null;
  name: string;
  category?: string;
  description?: string | null;
  action?: React.ReactNode;
}

export default function CatalogCard({
  href,
  image,
  name,
  action,
}: CatalogCardProps) {
  return (
    <article className="group flex flex-col w-full">
      {/* Compact Image Container with integrated bottom-right action */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-50 shadow-xs transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:border-orange-500/40">
        <Link href={href} className="block h-full w-full overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-100" />
          )}
        </Link>

        {/* Compact Add to Wishlist button inside bottom-right of image */}
        {action ? (
          <div className="absolute bottom-2 right-2 z-10">
            {action}
          </div>
        ) : null}
      </div>

      {/* Product Name placed OUTSIDE and BELOW image container */}
      <Link href={href} className="mt-2 block">
        <h3 className="line-clamp-2 text-xs font-semibold text-zinc-900 transition-colors group-hover:text-orange-600 leading-snug">
          {name}
        </h3>
      </Link>
    </article>
  );
}
