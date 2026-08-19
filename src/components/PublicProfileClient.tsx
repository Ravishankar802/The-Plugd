"use client";

import { useState } from "react";
import { 
  Share2, 
  Check, 
  Star, 
  ArrowRight,
  Sparkles,
  Link as LinkIcon,
  Copy
} from "lucide-react";
import Link from "next/link";
import PaymentModal from "@/components/PaymentModal";

// Bulletproof inline SVG social icons
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" fill="currentColor" />
  </svg>
);


interface PublicProfileClientProps {
  creator: {
    id: string;
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
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    icon?: string | null;
    displayOrder: number;
  }>;
  items: Array<{
    id: string;
    name: string;
    slug: string;
    shortDescription?: string | null;
    description?: string | null;
    imageUrl?: string | null;
    isFeatured: boolean;
    isPublished: boolean;
    categoryId?: string | null;
  }>;
  paymentSettings: any;
}

export default function PublicProfileClient({ creator, categories, items, paymentSettings }: PublicProfileClientProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const accentColor = creator.accentColor || "#f97316";

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `${creator.displayName} (@${creator.username}) — Plugd`,
        text: creator.bio || `Support ${creator.displayName}'s goals directly on Plugd!`,
        url: url
      }).catch(err => console.error("Share failed:", err));
    } else {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Filter items based on category
  const filteredItems = selectedCategoryId === "all" 
    ? items 
    : items.filter(item => item.categoryId === selectedCategoryId);

  // Find featured item
  const featuredItem = items.find(item => item.isFeatured);

  // Check if we have items grouped by category
  const categoryShelves = categories.map(cat => {
    const catItems = items.filter(item => item.categoryId === cat.id);
    return {
      category: cat,
      items: catItems
    };
  }).filter(shelf => shelf.items.length > 0);

  // Check if we have uncategorized items
  const uncategorizedItems = items.filter(item => !item.categoryId || !categories.some(c => c.id === item.categoryId));

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-500">
      
      {/* Banner / Cover Header */}
      <div className="relative h-44 md:h-64 w-full bg-zinc-900 overflow-hidden border-b border-zinc-900">
        {creator.bannerUrl ? (
          <img 
            src={creator.bannerUrl} 
            alt={`${creator.displayName} Cover`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 relative">
            {/* Subtle premium patterns */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          </div>
        )}
      </div>

      {/* Profile Info Container */}
      <div className="max-w-5xl w-full mx-auto px-4 md:px-6 pb-20 -mt-16 md:-mt-24 relative z-10 space-y-8">
        
        {/* Creator Hero */}
        <div className="flex flex-col items-center sm:items-start sm:flex-row justify-between gap-6">
          {/* Left: Avatar & Bio Details */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
            {/* Avatar */}
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-zinc-950 overflow-hidden bg-zinc-950 shrink-0 shadow-2xl">
              {creator.avatarUrl ? (
                <img 
                  src={creator.avatarUrl} 
                  alt={creator.displayName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-4xl text-zinc-500 uppercase font-black font-sans">
                  {creator.displayName[0]}
                </div>
              )}
            </div>

            {/* Title / Username */}
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-100 tracking-tight leading-none">
                  {creator.displayName}
                </h1>
                
                {/* Verified indicator architecture */}
                <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center" title="Verified Creator Account">
                  <Check size={11} className="text-orange-500" strokeWidth={3} />
                </div>
              </div>
              <p className="text-sm font-semibold text-zinc-500 font-sans tracking-wide">
                @{creator.username}
              </p>
            </div>

            {/* Bio */}
            {creator.bio && (
              <p className="text-zinc-400 text-sm max-w-lg leading-relaxed font-medium">
                {creator.bio}
              </p>
            )}

            {/* Social Links Row */}
            <div className="flex items-center gap-3 mt-1">
              {creator.instagramUrl && (
                <a 
                  href={creator.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 text-zinc-400 hover:text-zinc-100 flex items-center justify-center transition-colors"
                >
                  <InstagramIcon className="w-4.5 h-4.5 text-zinc-450" />
                </a>
              )}
              {creator.xUrl && (
                <a 
                  href={creator.xUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 text-zinc-400 hover:text-zinc-100 flex items-center justify-center transition-colors"
                >
                  <TwitterIcon className="w-4.5 h-4.5 text-zinc-450" />
                </a>
              )}
              {creator.youtubeUrl && (
                <a 
                  href={creator.youtubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 text-zinc-400 hover:text-zinc-100 flex items-center justify-center transition-colors"
                >
                  <YoutubeIcon className="w-4.5 h-4.5 text-zinc-450" />
                </a>
              )}
              {creator.tiktokUrl && (
                <a 
                  href={creator.tiktokUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 text-zinc-400 hover:text-zinc-100 flex items-center justify-center transition-colors font-semibold"
                >
                  🎵
                </a>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={handleShare}
              className="h-11 px-5 bg-zinc-900 border border-zinc-850 hover:bg-zinc-850 text-zinc-300 hover:text-zinc-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <><Check size={14} className="text-emerald-500" /> Copied</>
              ) : (
                <><Share2 size={14} /> Share</>
              )}
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        {categories.length > 0 && (
          <div className="border-t border-zinc-900/60 pt-6">
            {/* Horizontal scroll container */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
              {/* All Option */}
              <button
                onClick={() => setSelectedCategoryId("all")}
                className="h-10 px-5 rounded-full text-xs font-bold border transition-all shrink-0 cursor-pointer snap-start"
                style={{
                  backgroundColor: selectedCategoryId === "all" ? accentColor : "transparent",
                  borderColor: selectedCategoryId === "all" ? accentColor : "#27272a",
                  color: selectedCategoryId === "all" ? "#000" : "#a1a1aa"
                }}
              >
                All
              </button>

              {/* Individual User Categories */}
              {categories.map((cat) => {
                const isActive = selectedCategoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className="h-10 px-5 rounded-full text-xs font-bold border transition-all shrink-0 cursor-pointer snap-start flex items-center gap-1.5"
                    style={{
                      backgroundColor: isActive ? accentColor : "transparent",
                      borderColor: isActive ? accentColor : "#27272a",
                      color: isActive ? "#000" : "#a1a1aa"
                    }}
                  >
                    {cat.icon && <span>{cat.icon}</span>}
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Featured Goal (Only visible on "All" or if filtered category matches) */}
        {featuredItem && (selectedCategoryId === "all" || selectedCategoryId === featuredItem.categoryId) && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl animate-in fade-in duration-300 relative group flex flex-col md:flex-row items-stretch">
            {/* Featured Image */}
            <div className="w-full md:w-1/2 aspect-[16/10] md:aspect-auto relative shrink-0 overflow-hidden bg-zinc-950">
              <img 
                src={featuredItem.imageUrl || ""} 
                alt={featuredItem.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-orange-500 text-black text-[9px] uppercase tracking-widest font-black rounded-md flex items-center gap-1 shadow-md">
                <Star size={10} className="fill-black" /> Current Goal
              </div>
            </div>

            {/* Featured Content */}
            <div className="p-6 md:p-10 flex flex-col justify-center gap-4 flex-1">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-zinc-100 tracking-tight leading-tight">
                  {featuredItem.name}
                </h3>
                {featuredItem.shortDescription && (
                  <p className="text-orange-500 text-sm font-bold tracking-tight">
                    {featuredItem.shortDescription}
                  </p>
                )}
                {featuredItem.description && (
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed truncate-2-lines mt-1">
                    {featuredItem.description}
                  </p>
                )}
              </div>

              <div className="flex flex-row items-center gap-3 pt-2">
                <Link
                  href={`/@${creator.username}/${featuredItem.slug}`}
                  className="h-12 px-6 border border-zinc-800 hover:border-zinc-700 bg-zinc-950 hover:bg-zinc-900 text-zinc-200 hover:text-zinc-100 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                >
                  View Story
                </Link>
                
                <button
                  onClick={() => setIsPaymentOpen(true)}
                  className="h-12 px-6 text-black font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-lg"
                  style={{ backgroundColor: accentColor }}
                >
                  Support {creator.displayName.split(" ")[0]}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Shelves Layout (All categories) */}
        {selectedCategoryId === "all" && (
          <div className="space-y-12">
            {/* 1. Shelves by categories */}
            {categoryShelves.map((shelf) => (
              <div key={shelf.category.id} className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                  <h3 className="text-base font-bold text-zinc-200 flex items-center gap-1.5 font-sans tracking-tight">
                    {shelf.category.icon && <span className="text-lg">{shelf.category.icon}</span>}
                    <span>{shelf.category.name}</span>
                  </h3>
                </div>

                {/* 2-column Grid on Mobile, multi-column on desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {shelf.items.map((item) => (
                    <ItemCard key={item.id} item={item} creator={creator} accentColor={accentColor} onSupportClick={() => setIsPaymentOpen(true)} />
                  ))}
                </div>
              </div>
            ))}

            {/* 2. Uncategorized Shelf */}
            {uncategorizedItems.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
                  <h3 className="text-base font-bold text-zinc-300 font-sans tracking-tight">
                    📁 Uncategorized Goals
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {uncategorizedItems.map((item) => (
                    <ItemCard key={item.id} item={item} creator={creator} accentColor={accentColor} onSupportClick={() => setIsPaymentOpen(true)} />
                  ))}
                </div>
              </div>
            )}

            {/* Empty state if creator has no items at all */}
            {items.length === 0 && (
              <div className="border border-zinc-900 bg-zinc-950/20 rounded-3xl p-16 text-center flex flex-col items-center justify-center space-y-3">
                <span className="text-4xl">🌱</span>
                <p className="font-bold text-zinc-400">Nothing here yet</p>
                <p className="text-xs text-zinc-600 leading-normal max-w-xs mx-auto">
                  {creator.displayName} hasn't added any goals to support yet.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Grid Layout (Specific Category selected) */}
        {selectedCategoryId !== "all" && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-zinc-300 border-b border-zinc-900/60 pb-2 flex items-center gap-1.5 font-sans tracking-tight">
              {categories.find(c => c.id === selectedCategoryId)?.icon && (
                <span>{categories.find(c => c.id === selectedCategoryId)?.icon}</span>
              )}
              <span>{categories.find(c => c.id === selectedCategoryId)?.name}</span>
            </h3>

            {filteredItems.length === 0 ? (
              <div className="border border-zinc-900 bg-zinc-950/20 rounded-3xl p-16 text-center flex flex-col items-center justify-center space-y-3">
                <span className="text-3xl">📁</span>
                <p className="font-bold text-zinc-400">No items found</p>
                <p className="text-xs text-zinc-600 leading-normal">
                  No published goals exist under this category yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredItems.map((item) => (
                  <ItemCard key={item.id} item={item} creator={creator} accentColor={accentColor} onSupportClick={() => setIsPaymentOpen(true)} />
                ))}
              </div>
            )}
          </div>
        )}
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

// Single Item Card component
function ItemCard({ item, creator, accentColor, onSupportClick }: { 
  item: any; 
  creator: any; 
  accentColor: string; 
  onSupportClick: () => void 
}) {
  return (
    <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl overflow-hidden hover:border-zinc-800 hover:bg-zinc-900/60 transition-all flex flex-col h-full group font-sans">
      
      {/* Item Image Link */}
      <Link href={`/@${creator.username}/${item.slug}`} className="block relative aspect-square w-full overflow-hidden bg-zinc-950 shrink-0">
        <img 
          src={item.imageUrl || ""} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {item.isFeatured && (
          <div className="absolute top-2 left-2 p-1 bg-orange-500 text-black rounded-md flex items-center justify-center">
            <Star size={10} className="fill-black" />
          </div>
        )}
      </Link>

      {/* Card Info */}
      <div className="p-3 md:p-4 flex flex-col flex-grow justify-between gap-3">
        <Link href={`/@${creator.username}/${item.slug}`} className="block group-hover:opacity-90 transition-opacity space-y-0.5 min-w-0">
          <h4 className="font-extrabold text-zinc-100 text-xs md:text-sm tracking-tight truncate leading-tight">
            {item.name}
          </h4>
          {item.shortDescription && (
            <p className="text-[10px] md:text-xs text-zinc-500 truncate leading-normal">
              {item.shortDescription}
            </p>
          )}
        </Link>

        {/* CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSupportClick();
          }}
          className="w-full h-9 rounded-xl font-extrabold text-[10px] md:text-xs flex items-center justify-center gap-1 transition-all active:scale-98 cursor-pointer text-black"
          style={{ backgroundColor: accentColor }}
        >
          <span>Support</span>
          <ArrowRight size={10} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
