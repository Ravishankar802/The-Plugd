import Link from "next/link";

interface CatalogCardProps {
  href: string;
  image: string | null;
  name: string;
  category: string;
  description?: string | null;
  action?: React.ReactNode;
}

export default function CatalogCard({
  href,
  image,
  name,
  category,
  description,
  action,
}: CatalogCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(15,23,42,0.09)]">
      <Link href={href} className="block overflow-hidden bg-zinc-100">
        {image ? (
          <img
            src={image}
            alt={name}
            className="aspect-[1/1.02] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="aspect-square w-full bg-gradient-to-br from-zinc-200 via-white to-orange-100" />
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-4 p-4 md:p-5">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">{category}</p>
          <Link href={href} className="block">
            <h3 className="line-clamp-2 text-sm font-bold text-zinc-950 md:text-base">{name}</h3>
          </Link>
          {description ? <p className="line-clamp-2 text-xs leading-5 text-zinc-600 md:text-sm">{description}</p> : null}
        </div>

        {action ? <div>{action}</div> : null}
      </div>
    </article>
  );
}
