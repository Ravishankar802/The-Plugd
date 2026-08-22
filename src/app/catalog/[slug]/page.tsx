import Link from "next/link";
import { ArrowLeft, ChevronRight, Sparkles, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import CategoryIcon from "@/components/CategoryIcon";
import { getSession } from "@/lib/auth";
import { ensureCatalogSeeded } from "@/lib/catalog";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface CatalogItemPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: CatalogItemPageProps) {
  const resolvedParams = await params;
  const item = await prisma.catalogItem.findUnique({
    where: { slug: resolvedParams.slug },
    include: { category: true },
  });

  if (!item) return { title: "Plugd Catalog" };

  return {
    title: `${item.name} — Wishlist Catalog | Plugd`,
    description: item.shortDescription || `${item.name} on Plugd Creator Wishlist Catalog`,
  };
}

export default async function CatalogItemPage({ params }: CatalogItemPageProps) {
  await ensureCatalogSeeded();
  const session = await getSession();
  const resolvedParams = await params;

  const item = await prisma.catalogItem.findUnique({
    where: { slug: resolvedParams.slug },
    include: { category: true },
  });

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f7f3ee] text-zinc-950 flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      <Header
        isLoggedIn={Boolean(session?.userId)}
        username={session?.username}
        searchAction="/"
      />

      <main className="mx-auto max-w-5xl flex-1 px-4 py-6 md:px-6 md:py-10 w-full">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-zinc-500">
          <Link href="/" className="hover:text-zinc-950 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-zinc-400" />
          <Link href={`/category/${item.category.slug}`} className="hover:text-zinc-950 transition-colors">
            {item.category.name}
          </Link>
          <ChevronRight className="h-3 w-3 text-zinc-400" />
          <span className="text-zinc-900 font-bold">{item.name}</span>
        </div>

        <section className="grid gap-8 rounded-[32px] border border-zinc-200/90 bg-white p-6 shadow-sm md:grid-cols-[1fr_1fr] md:p-10">
          {/* Left: Product Image */}
          <div className="overflow-hidden rounded-[24px] bg-zinc-950 flex items-center justify-center">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="aspect-square w-full object-cover shadow-inner"
              />
            ) : (
              <div className="aspect-square w-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center text-zinc-600">
                <Heart className="h-16 w-16" />
              </div>
            )}
          </div>

          {/* Right: Info & Wishlist CTA */}
          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <Link
                href={`/category/${item.category.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-600 hover:bg-orange-500/20 transition-colors"
              >
                <CategoryIcon name={item.category.icon} className="h-3.5 w-3.5" />
                <span>{item.category.name}</span>
              </Link>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950">
                {item.name}
              </h1>

              {item.shortDescription ? (
                <p className="text-sm md:text-base text-zinc-700 font-medium leading-relaxed">
                  {item.shortDescription}
                </p>
              ) : null}

              {item.description ? (
                <div className="rounded-2xl bg-zinc-50 border border-zinc-100 p-4 text-xs text-zinc-600 leading-relaxed">
                  <p>{item.description}</p>
                </div>
              ) : null}
            </div>

            {/* Wishlist Action Box */}
            <div className="space-y-3.5 rounded-[24px] bg-orange-500/5 border border-orange-500/15 p-5">
              <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                <Sparkles className="h-4 w-4 text-orange-500" />
                <span>Standard Wishlist Item</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Add this to your public wishlist. Your supporters will see it with zero ecommerce pricing confusion and can support you directly.
              </p>
              <div className="pt-1">
                <AddToWishlistButton
                  catalogItemId={item.id}
                  isLoggedIn={Boolean(session?.userId)}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
