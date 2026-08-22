"use client";

import Link from "next/link";
import Image from "next/image";
import { Copy, Share2, Check, Sparkles, ExternalLink, Star } from "lucide-react";
import { useMemo, useState } from "react";
import CategoryIcon from "@/components/CategoryIcon";
import SupportSoonModal from "@/components/SupportSoonModal";

interface CategoryShape {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

interface WishlistShape {
  id: string;
  slug: string;
  name: string;
  image: string | null;
  shortDescription?: string | null;
  description?: string | null;
  personalNote?: string | null;
  isFeatured: boolean;
  categoryId?: string | null;
  category?: CategoryShape | null;
  externalUrl?: string | null;
}

interface PublicProfileClientProps {
  creator: {
    username: string;
    displayName: string;
    bio?: string | null;
    avatarUrl?: string | null;
    bannerUrl?: string | null;
    accentColor?: string | null;
    instagramUrl?: string | null;
    xUrl?: string | null;
    youtubeUrl?: string | null;
    tiktokUrl?: string | null;
  };
  categories: CategoryShape[];
  items: WishlistShape[];
}

export default function PublicProfileClient({ creator, categories, items }: PublicProfileClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [supportItem, setSupportItem] = useState<WishlistShape | null>(null);
  const [copied, setCopied] = useState(false);

  const visibleItems = useMemo(() => {
    if (selectedCategory === "all") return items;
    return items.filter(
      (item) => item.category?.id === selectedCategory || item.categoryId === selectedCategory,
    );
  }, [items, selectedCategory]);

  const accentColor = creator.accentColor || "#f97316";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${creator.displayName}'s Wishlist`,
          text: creator.bio || `${creator.displayName}'s Wishlist on Plugd`,
          url: window.location.href,
        });
        return;
      } catch {}
    }

    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      {/* Creator Header Banner */}
      <div className="relative border-b border-white/10 bg-zinc-950 overflow-hidden">
        {/* Background Banner */}
        <div className="absolute inset-0">
          {creator.bannerUrl ? (
            <img
              src={creator.bannerUrl}
              alt={creator.displayName}
              className="h-full w-full object-cover opacity-35"
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.06),_transparent_30%),linear-gradient(180deg,_#18181b,_#09090b)]" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-6 md:px-6 md:pb-12 md:pt-10">
          {/* Top Brand Bar */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-zinc-300 backdrop-blur transition hover:bg-white/10 hover:text-white"
            >
              <div className="flex h-4 w-4 items-center justify-center rounded-md bg-orange-500 text-black font-black text-[9px]">
                P
              </div>
              <span>Powered by Plugd</span>
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 text-xs font-bold text-white backdrop-blur transition hover:bg-white/10"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Share"}</span>
            </button>
          </div>

          {/* Profile Bio & Avatar */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-end gap-5">
            <div className="h-20 w-20 md:h-24 md:w-24 shrink-0 overflow-hidden rounded-3xl border-2 border-white/15 bg-zinc-900 shadow-2xl">
              {creator.avatarUrl ? (
                <img
                  src={creator.avatarUrl}
                  alt={creator.displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-black uppercase text-white bg-zinc-850">
                  {creator.displayName.slice(0, 1)}
                </div>
              )}
            </div>

            <div className="space-y-1.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                  {creator.displayName}
                </h1>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-zinc-300">
                  @{creator.username}
                </span>
              </div>

              {creator.bio ? (
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed max-w-xl">
                  {creator.bio}
                </p>
              ) : null}

              {/* Social Links */}
              {(creator.instagramUrl || creator.xUrl || creator.youtubeUrl || creator.tiktokUrl) && (
                <div className="flex items-center gap-3 pt-2">
                  {creator.instagramUrl && (
                    <a
                      href={creator.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-zinc-400 hover:text-orange-400 transition"
                      title="Instagram"
                    >
                      Instagram
                    </a>
                  )}
                  {creator.xUrl && (
                    <a
                      href={creator.xUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-zinc-400 hover:text-orange-400 transition"
                      title="X / Twitter"
                    >
                      X (Twitter)
                    </a>
                  )}
                  {creator.youtubeUrl && (
                    <a
                      href={creator.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-zinc-400 hover:text-orange-400 transition"
                      title="YouTube"
                    >
                      YouTube
                    </a>
                  )}
                  {creator.tiktokUrl && (
                    <a
                      href={creator.tiktokUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-zinc-400 hover:text-orange-400 transition"
                      title="TikTok"
                    >
                      TikTok
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Wishlist Body */}
      <main className="mx-auto max-w-6xl flex-1 px-4 py-6 md:px-6 md:py-10 w-full space-y-6">
        {/* Category Pills Filter */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition ${
                selectedCategory === "all"
                  ? "text-black"
                  : "border border-white/10 bg-zinc-900/90 text-zinc-300 hover:text-white hover:bg-zinc-800"
              }`}
              style={selectedCategory === "all" ? { backgroundColor: accentColor } : undefined}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>All ({items.length})</span>
            </button>

            {categories.map((category) => {
              const active = selectedCategory === category.id;
              const count = items.filter(
                (i) => i.category?.id === category.id || i.categoryId === category.id,
              ).length;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition ${
                    active
                      ? "text-black"
                      : "border border-white/10 bg-zinc-900/90 text-zinc-300 hover:text-white hover:bg-zinc-800"
                  }`}
                  style={active ? { backgroundColor: accentColor } : undefined}
                >
                  <CategoryIcon name={category.icon} className="h-3.5 w-3.5" />
                  <span>
                    {category.name} ({count})
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Wishlist Heading */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h2 className="text-lg md:text-xl font-black text-white">
              {creator.displayName}&apos;s Wishlist
            </h2>
            <p className="text-xs text-zinc-400">Things this creator would love audience help getting.</p>
          </div>
          <span className="text-xs text-zinc-500 font-bold">
            {visibleItems.length} {visibleItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Wishlist Items Grid */}
        {visibleItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleItems.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-zinc-900/70 p-3 sm:p-3.5 transition hover:border-white/20 hover:bg-zinc-900"
              >
                <div>
                  <Link
                    href={`/@${creator.username}/${item.slug}`}
                    className="block overflow-hidden rounded-2xl bg-zinc-950 relative"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="aspect-square w-full bg-zinc-850 flex items-center justify-center text-zinc-600">
                        <Sparkles className="h-8 w-8" />
                      </div>
                    )}

                    {item.isFeatured ? (
                      <span className="absolute top-2.5 right-2.5 rounded-full bg-black/70 backdrop-blur border border-orange-500/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1">
                        <Star className="h-2.5 w-2.5 fill-orange-400" />
                        Featured
                      </span>
                    ) : null}
                  </Link>

                  <div className="mt-3 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      {item.category?.name || "Wishlist"}
                    </span>
                    <Link href={`/@${creator.username}/${item.slug}`} className="block">
                      <h3 className="line-clamp-2 text-xs md:text-sm font-bold text-white transition hover:text-orange-400">
                        {item.name}
                      </h3>
                    </Link>

                    {item.personalNote ? (
                      <p className="line-clamp-2 text-[11px] text-zinc-400 italic pt-1 leading-relaxed">
                        &ldquo;{item.personalNote}&rdquo;
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setSupportItem(item)}
                    className="h-10 w-full rounded-xl text-xs font-extrabold text-black transition hover:brightness-110 active:scale-98 shadow-md"
                    style={{ backgroundColor: accentColor }}
                  >
                    Support this
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 bg-zinc-900/40 p-10 text-center space-y-2">
            <p className="text-sm font-bold text-zinc-300">No wishlist items in this category yet.</p>
            <p className="text-xs text-zinc-500">Check back soon to see new items added by {creator.displayName}.</p>
          </div>
        )}
      </main>

      {/* Public Page Minimal Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-zinc-500 mt-auto">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {creator.displayName}&apos;s Wishlist</p>
          <Link href="/" className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-orange-400 transition font-bold">
            <span>Create your own wishlist on Plugd</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </footer>

      {/* Temporary Support Coming Soon Modal */}
      <SupportSoonModal
        open={Boolean(supportItem)}
        onClose={() => setSupportItem(null)}
        creatorName={creator.displayName}
        itemName={supportItem?.name || "this item"}
      />
    </div>
  );
}
