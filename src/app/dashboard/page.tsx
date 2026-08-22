"use client";

import Link from "next/link";
import { ArrowRight, Copy, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        setData(await response.json());
      }
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  const username = data?.user?.username;
  const publicUrl = username ? `${window.location.origin}/@${username}` : "";

  return (
    <div className="space-y-8 py-2">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-100">Dashboard</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Build your wishlist, publish it at your public link, and keep the page feeling clear and intentional.
        </p>
      </div>

      <section className="rounded-[28px] border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Public page</p>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black text-zinc-100">theplugd.com/@{username || "username"}</h2>
            <p className="mt-2 text-sm text-zinc-400">This is the link you’ll share once your wishlist is ready.</p>
          </div>
          {username ? (
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(publicUrl);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1500);
              }}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 text-sm font-bold text-black transition hover:bg-orange-400"
            >
              <Copy className="h-4 w-4" />
              {copied ? "Copied" : "Copy URL"}
            </button>
          ) : null}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-[28px] border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Wishlist items</p>
          <p className="mt-4 text-4xl font-black text-zinc-100">{data?.wishlistCount || 0}</p>
          <p className="mt-2 text-sm text-zinc-400">Items currently published on your profile.</p>
        </div>
        <div className="rounded-[28px] border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Profile completeness</p>
          <p className="mt-4 text-4xl font-black text-zinc-100">{data?.completeness || 0}%</p>
          <p className="mt-2 text-sm text-zinc-400">Username, profile, avatar, bio, and at least one wishlist item.</p>
        </div>
        <div className="rounded-[28px] border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Next best action</p>
          <p className="mt-4 text-xl font-bold text-zinc-100">Add your core wishlist picks.</p>
          <Link href="/dashboard/items" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-400">
            Open My Wishlist
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <Link href="/dashboard/items" className="rounded-[28px] border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-700">
          <p className="text-lg font-bold text-zinc-100">My Wishlist</p>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Add from the catalog, create custom items, feature standout wishes, and reorder the list for your public page.
          </p>
        </Link>
        <Link href="/dashboard/appearance" className="rounded-[28px] border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-700">
          <p className="text-lg font-bold text-zinc-100">Appearance</p>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Set your name, bio, banner, avatar, accent color, and social links so your wishlist feels like your own.
          </p>
        </Link>
      </section>
    </div>
  );
}
