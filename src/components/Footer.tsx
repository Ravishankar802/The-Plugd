"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TRENDING_SEARCHES = [
  "iPhone Duo",
  "Claude Max",
  "BMW S1000RR",
  "Monster Ultra Energy Drink",
  "Porsche 911 GT3 RS",
  "PlayStation 5 Pro",
  "NVIDIA GeForce RTX 5090",
  "Perplexity Max",
  "Netflix Premium",
  "Soft Pinch Liquid Blush",
  "Brazilian Bum Bum Body Cream",
  "AirPods Pro",
  "Red Bull Energy Drink",
  "Airwrap Multi-Styler",
  "Chicken Biryani",
  "Ducati Panigale V4R",
  "Kawasaki Ninja H2R",
  "Diet Coke",
  "Protein Supplement",
];

const POPULAR_SEARCHES = [
  "iPhone 18 Pro Max",
  "Bugatti Chiron Super Sport",
  "MacBook Pro 14\"",
  "Koenigsegg Jesko Absolut",
  "Ducati Panigale V4S",
  "BMW M1000RR",
  "Aprilia RSV4 1100 Factory",
  "Samsung Galaxy S26 Ultra",
  "AirPods Max",
  "Royal Enfield Continental GT 650",
  "Pagani Huayra",
  "NVIDIA GeForce RTX 5080",
  "KTM 1390 Super Duke R",
  "Harley-Davidson Sportster S",
  "Sauvage Eau de Parfum",
  "Libre Eau de Parfum",
  "MacBook Air 13\"",
  "Sony WF-1000XM6",
  "Samsung Galaxy Z Fold8 Ultra",
  "220 GSM Oversized Plain Drop-Shoulder Tee",
];

const CATEGORIES = [
  { name: "Mobile", href: "/category/mobile" },
  { name: "Vehicles", href: "/category/vehicles" },
  { name: "Subscriptions", href: "/category/subscriptions" },
  { name: "Electronics", href: "/category/electronics" },
  { name: "Fitness", href: "/category/fitness" },
  { name: "Beauty", href: "/category/beauty" },
  { name: "Fashion", href: "/category/fashion" },
  { name: "Food", href: "/category/food" },
  { name: "Drinks", href: "/category/drinks" },
  { name: "Entertainment", href: "/category/entertainment" },
  { name: "Toys", href: "/category/toys" },
];

interface FooterProps {
  showBorder?: boolean;
}

export default function Footer({ showBorder = true }: FooterProps) {
  const pathname = usePathname();

  // The footer must appear ONLY on the Plugd HOMEPAGE route ("/")
  if (pathname !== "/") {
    return null;
  }

  return (
    <footer
      className={`w-full bg-white text-zinc-600 mt-12 md:mt-16 font-sans ${
        showBorder ? "border-t border-zinc-200/80" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12 space-y-8 md:space-y-10">
        {/* Three Discovery / Search Sections */}
        <div className="space-y-6 md:space-y-7">
          {/* 1. Trending Searches */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950">
              Trending Searches
            </h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500 leading-relaxed">
              {TRENDING_SEARCHES.map((term, index) => (
                <span key={term} className="inline-flex items-center">
                  <Link
                    href={`/?q=${encodeURIComponent(term)}`}
                    className="hover:text-orange-600 transition-colors"
                  >
                    {term}
                  </Link>
                  {index < TRENDING_SEARCHES.length - 1 && (
                    <span className="ml-2 text-zinc-300 select-none" aria-hidden="true">
                      |
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* 2. Popular Searches */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950">
              Popular Searches
            </h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500 leading-relaxed">
              {POPULAR_SEARCHES.map((term, index) => (
                <span key={term} className="inline-flex items-center">
                  <Link
                    href={`/?q=${encodeURIComponent(term)}`}
                    className="hover:text-orange-600 transition-colors"
                  >
                    {term}
                  </Link>
                  {index < POPULAR_SEARCHES.length - 1 && (
                    <span className="ml-2 text-zinc-300 select-none" aria-hidden="true">
                      |
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Categories */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950">
              Categories
            </h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500 leading-relaxed">
              {CATEGORIES.map((cat, index) => (
                <span key={cat.name} className="inline-flex items-center">
                  <Link
                    href={cat.href}
                    className="hover:text-orange-600 transition-colors"
                  >
                    {cat.name}
                  </Link>
                  {index < CATEGORIES.length - 1 && (
                    <span className="ml-2 text-zinc-300 select-none" aria-hidden="true">
                      |
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Area: Plugd Branding & Navigation Links */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-t border-zinc-200/80">
          {/* LEFT SIDE: Plugd logo/text directly above "© Plugd" */}
          <div className="flex flex-col items-start gap-1">
            <Link href="/" className="group inline-flex items-center">
              <span className="font-logo text-2xl sm:text-3xl font-extrabold tracking-normal text-orange-500 select-none leading-tight transition-transform duration-200 group-hover:scale-[1.02]">
                Plugd
              </span>
            </Link>
            <p className="text-xs text-zinc-500 font-medium">© Plugd</p>
          </div>

          {/* RIGHT SIDE: ONLY Home, Privacy Policy, Terms of Use */}
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold text-zinc-600">
            <Link href="/" className="hover:text-zinc-950 transition-colors">
              Home
            </Link>
            <Link href="/privacy-policy" className="hover:text-zinc-950 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-zinc-950 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
