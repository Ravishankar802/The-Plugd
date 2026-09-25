"use client";

import Link from "next/link";
import { Users, CheckCircle2 } from "lucide-react";

export default function AuthMarketingHero() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 sm:p-12 lg:p-16 select-none overflow-hidden bg-gradient-to-b from-orange-50/40 via-white to-zinc-50/60 border-r border-zinc-100">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-orange-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl" />

      {/* Top Brand Logo */}
      <div className="relative z-10">
        <Link href="/" className="inline-block group focus:outline-none">
          <span className="font-logo text-4xl font-extrabold tracking-normal text-orange-500 select-none leading-none">
            Plugd
          </span>
        </Link>
      </div>

      {/* Center Hero Marketing Visual */}
      <div className="relative z-10 my-auto py-8 flex flex-col items-center text-center">
        {/* Punchy Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-zinc-900 leading-[1.15] max-w-md">
          Wish for what you want.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-500 max-w-sm font-medium">
          Create your wishlist. Share it. Get what you wish for.
        </p>

        {/* Stacked Overlapping Wishlist Cards (Instagram-inspired visual stack) */}
        <div className="relative mt-10 w-full max-w-[340px] h-[280px] flex items-center justify-center">
          {/* Card Left (Behind, angled -8deg) */}
          <div className="absolute left-2 top-4 w-[190px] rounded-2xl border border-zinc-200/90 bg-white p-2.5 shadow-lg transform -rotate-8 transition-transform duration-500 hover:-rotate-10 hover:scale-105">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmRsKZhTjZ3TAT4aF2-mI3gYs2V0yq-PT62EJRRToT9A&s=10"
                alt="Sony WH-1000XM5"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2 text-left">
              <p className="text-[11px] font-bold text-zinc-800 truncate">Sony WH-1000XM5</p>
              <p className="text-[10px] font-medium text-orange-600">👤 1,420 added</p>
            </div>
          </div>

          {/* Card Right (Behind, angled +8deg) */}
          <div className="absolute right-2 top-6 w-[190px] rounded-2xl border border-zinc-200/90 bg-white p-2.5 shadow-lg transform rotate-8 transition-transform duration-500 hover:rotate-10 hover:scale-105">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTetNev18RL42vUApoNBVTLRLHLVaBhcy7E2pqHCuauBB_YYlt61GJh2Z9H&s=10"
                alt="Galaxy Buds4 Pro"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2 text-left">
              <p className="text-[11px] font-bold text-zinc-800 truncate">Galaxy Buds4 Pro</p>
              <p className="text-[10px] font-medium text-orange-600">👤 890 added</p>
            </div>
          </div>

          {/* Card Center (Front & Center, prominent) */}
          <div className="relative z-20 w-[205px] rounded-2xl border border-zinc-200/90 bg-white p-3 shadow-2xl transition-transform duration-500 hover:scale-105">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFWSx1IUTIylE_EDVo-tI_zIwfb5dJD2zIVz5TF8KHw&s=10"
                alt="iPhone 18 Pro Max"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2.5 text-left">
              <p className="text-xs font-extrabold text-zinc-900 truncate">iPhone 18 Pro Max</p>
              <p className="text-[10px] font-medium text-orange-600">👤 2,840 added</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 pt-4 flex items-center justify-between text-xs font-semibold text-zinc-400 border-t border-zinc-100">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-orange-500" />
          1,000+ items to wish for
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-orange-500" />
          100% free to share
        </span>
      </div>
    </div>
  );
}
