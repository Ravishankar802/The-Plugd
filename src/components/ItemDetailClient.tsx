"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Heart } from "lucide-react";
import { useState } from "react";
import SupportSoonModal from "@/components/SupportSoonModal";

interface ItemDetailClientProps {
  creator: {
    username: string;
    displayName: string;
    avatarUrl?: string | null;
    accentColor?: string | null;
  };
  item: {
    name: string;
    image?: string | null;
    shortDescription?: string | null;
    description?: string | null;
    personalNote?: string | null;
    category?: {
      name: string;
    } | null;
  };
}

export default function ItemDetailClient({ creator, item }: ItemDetailClientProps) {
  const [open, setOpen] = useState(false);
  const accentColor = creator.accentColor || "#f97316";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-4 md:px-6 flex items-center justify-between">
          <Link
            href={`/@${creator.username}`}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to {creator.displayName}&apos;s Wishlist</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            <span>Powered by Plugd</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl flex-1 px-4 py-8 md:px-6 md:py-12 w-full">
        <section className="grid gap-8 rounded-[32px] border border-white/10 bg-zinc-900/60 p-6 md:grid-cols-[1fr_1fr] md:p-10">
          {/* Image */}
          <div className="overflow-hidden rounded-[24px] bg-zinc-950 flex items-center justify-center">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="aspect-square w-full bg-zinc-900 flex items-center justify-center text-zinc-700">
                <Heart className="h-16 w-16" />
              </div>
            )}
          </div>

          {/* Details & Support CTA */}
          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-400">
                {item.category?.name || "Wishlist Item"}
              </span>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white">
                {item.name}
              </h1>

              {item.shortDescription ? (
                <p className="text-sm md:text-base text-zinc-300 font-medium leading-relaxed">
                  {item.shortDescription}
                </p>
              ) : null}

              {item.description ? (
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              ) : null}

              {item.personalNote ? (
                <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4 space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400">
                    Note from {creator.displayName}
                  </p>
                  <p className="text-xs md:text-sm text-zinc-200 leading-relaxed italic">
                    &ldquo;{item.personalNote}&rdquo;
                  </p>
                </div>
              ) : null}
            </div>

            {/* Support CTA */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="h-12 w-full rounded-2xl text-sm font-extrabold text-black transition hover:brightness-110 shadow-lg shadow-orange-500/10 active:scale-98"
                style={{ backgroundColor: accentColor }}
              >
                Support this
              </button>
              <p className="text-center text-[11px] text-zinc-500">
                Direct support for {creator.displayName}. Powered by Plugd.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SupportSoonModal
        open={open}
        onClose={() => setOpen(false)}
        creatorName={creator.displayName}
        itemName={item.name}
      />
    </div>
  );
}
