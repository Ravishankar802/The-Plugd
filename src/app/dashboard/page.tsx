"use client";

import Link from "next/link";
import { ArrowRight, Copy, Loader2, Lock, Globe, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import UnlockSharingModal from "@/components/UnlockSharingModal";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);

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
  const isSubscribed = Boolean(data?.isSubscribed);
  const isPublic = Boolean(data?.isPublic);
  const publicUrl = username ? `${window.location.origin}/${username}` : "";

  return (
    <div className="space-y-8 py-2">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Profile</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Build your wishlist, publish it at your public link, and keep the page feeling clear and intentional.
        </p>
      </div>

      <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Wishlist Page &amp; Sharing</p>
          {isSubscribed ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
              <Globe className="h-3.5 w-3.5 text-emerald-600" />
              <span>Public ({data?.subscription?.plan === "YEARLY" ? "Yearly" : "Monthly"})</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 border border-zinc-200 px-3 py-1 text-xs font-bold text-zinc-700">
              <Lock className="h-3.5 w-3.5 text-orange-500" />
              <span>Private • Free Plan</span>
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black text-zinc-900">theplugd.com/{username || "username"}</h2>
            <p className="mt-1.5 text-sm text-zinc-500">
              {isSubscribed
                ? "Your wishlist is public and ready to share with friends and followers."
                : "Your wishlist is currently private. Only you can view it until you unlock public sharing."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isSubscribed ? (
              <button
                type="button"
                onClick={() => setUnlockModalOpen(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 text-sm font-extrabold text-black transition hover:bg-orange-400 cursor-pointer shadow-xs"
              >
                <Sparkles className="h-4 w-4" />
                <span>Unlock Sharing (₹39/mo)</span>
              </button>
            ) : username ? (
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(publicUrl);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1500);
                }}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 text-sm font-extrabold text-black transition hover:bg-orange-400 cursor-pointer shadow-xs"
              >
                <Copy className="h-4 w-4" />
                {copied ? "Copied" : "Copy URL"}
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Wishlist items</p>
          <p className="mt-3 text-4xl font-black text-zinc-900">{data?.wishlistCount || 0}</p>
          <p className="mt-2 text-xs text-zinc-500">Items currently on your profile.</p>
        </div>
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Profile completeness</p>
          <p className="mt-3 text-4xl font-black text-zinc-900">{data?.completeness || 0}%</p>
          <p className="mt-2 text-xs text-zinc-500">Username, avatar, about, and at least one wishlist item.</p>
        </div>
        <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Next best action</p>
          <p className="mt-3 text-base font-bold text-zinc-900">Add your core wishlist picks.</p>
          <Link href="/dashboard/items" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700">
            Open My Wishlist
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <Link href="/dashboard/items" className="group rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xs transition hover:border-zinc-300 hover:shadow-sm">
          <p className="text-base font-bold text-zinc-900 group-hover:text-orange-600 transition">My Wishlist</p>
          <p className="mt-1.5 text-xs leading-5 text-zinc-500">
            Add from the catalog, create custom items, feature standout wishes, and organize your wishlist for your public page.
          </p>
        </Link>
        <Link href="/profile" className="group rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xs transition hover:border-zinc-300 hover:shadow-sm">
          <p className="text-base font-bold text-zinc-900 group-hover:text-orange-600 transition">Edit Profile</p>
          <p className="mt-1.5 text-xs leading-5 text-zinc-500">
            Set your display name, about info, avatar, and payment/support links so friends know how to surprise you.
          </p>
        </Link>
      </section>

      <UnlockSharingModal
        open={unlockModalOpen}
        onClose={() => setUnlockModalOpen(false)}
        username={username}
        onSuccess={() => window.location.reload()}
      />
    </div>
  );
}
