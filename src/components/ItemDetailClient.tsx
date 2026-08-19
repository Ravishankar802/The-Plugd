"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Star, Heart, Calendar, Gift } from "lucide-react";
import Link from "next/link";
import PaymentModal from "@/components/PaymentModal";

interface ItemDetailClientProps {
  creator: {
    username: string;
    displayName: string;
    avatarUrl?: string | null;
    accentColor?: string | null;
  };
  item: {
    id: string;
    name: string;
    slug: string;
    shortDescription?: string | null;
    description?: string | null;
    imageUrl?: string | null;
    createdAt: string;
    category?: {
      name: string;
      icon?: string | null;
    } | null;
  };
  paymentSettings: any;
}

export default function ItemDetailClient({ creator, item, paymentSettings }: ItemDetailClientProps) {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const accentColor = creator.accentColor || "#f97316";

  const formattedDate = new Date(item.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-500">
      
      {/* Detail Page Container */}
      <div className="max-w-4xl w-full mx-auto px-4 md:px-6 py-8 md:py-16 space-y-6 flex-1">
        
        {/* Back Link */}
        <Link 
          href={`/@${creator.username}`}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to {creator.displayName}'s page</span>
        </Link>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-44 h-44 bg-orange-500/5 rounded-full blur-3xl" />

          {/* Left: Big Image */}
          <div className="w-full aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-850 shrink-0 shadow-lg relative group">
            {item.imageUrl ? (
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-700 bg-zinc-900">
                <Gift size={64} />
              </div>
            )}
          </div>

          {/* Right: Info Panel */}
          <div className="flex flex-col justify-between py-2 gap-6 relative z-10">
            {/* Header info */}
            <div className="space-y-4">
              {/* Category Tag */}
              {item.category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-950 border border-zinc-850 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  {item.category.icon && <span>{item.category.icon}</span>}
                  <span>{item.category.name}</span>
                </span>
              )}

              {/* Goal Title */}
              <div className="space-y-1.5">
                <h1 className="text-3xl font-black text-zinc-100 tracking-tight leading-tight">
                  {item.name}
                </h1>
                {item.shortDescription && (
                  <p className="text-sm font-semibold text-zinc-400">
                    {item.shortDescription}
                  </p>
                )}
              </div>

              {/* Creator details */}
              <div className="flex items-center gap-2.5 pt-2">
                <div className="w-8 h-8 rounded-full border border-zinc-800 overflow-hidden bg-zinc-950 shrink-0">
                  {creator.avatarUrl ? (
                    <img src={creator.avatarUrl} alt={creator.displayName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500 uppercase">
                      {creator.displayName[0]}
                    </div>
                  )}
                </div>
                <div className="text-xs">
                  <p className="text-zinc-500">Goal set by</p>
                  <p className="font-bold text-zinc-300">@{creator.username}</p>
                </div>
              </div>
            </div>

            {/* Story / Why I want this */}
            {item.description && (
              <div className="space-y-2 border-t border-zinc-850 pt-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-red-500/10 text-red-500" /> Why I want this
                </h3>
                <p className="text-zinc-300 text-xs md:text-sm leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            )}

            {/* Date set */}
            <div className="text-[10px] text-zinc-500 flex items-center gap-1 mt-auto font-medium">
              <Calendar className="w-3.5 h-3.5 text-zinc-600" />
              <span>Goal created in {formattedDate}</span>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => setIsPaymentOpen(true)}
              className="w-full h-14 text-black font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-all active:scale-[0.99] cursor-pointer shadow-lg mt-4"
              style={{ 
                backgroundColor: accentColor,
                boxShadow: `0 4px 20px ${accentColor}15`
              }}
            >
              <span>Support {creator.displayName.split(" ")[0]}</span>
              <ArrowRight size={14} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {/* Brand Footer */}
      <footer className="mt-auto border-t border-zinc-900 py-8 text-center text-[10px] text-zinc-600 space-y-1.5 bg-zinc-950">
        <p className="font-bold">0% Plugd platform fee on supporter payments.</p>
        <p className="font-semibold text-zinc-700">Supporters pay creators directly. Built with <Link href="/" className="hover:underline">Plugd</Link></p>
      </footer>

      {/* Shared Payment modal sheet */}
      <PaymentModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        creatorName={creator.displayName}
        paymentSettings={paymentSettings}
      />
    </div>
  );
}
export type { ItemDetailClientProps };
