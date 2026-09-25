"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TRENDING_SEARCHES = [
  "iPhone Duo",
  "iPhone 18 Pro Max (Black)",
  "iPhone 18 Pro Max (Burgundy)",
  "Claude Max",
  "MacBook Pro 14\"",
  "PlayStation 5 Pro",
  "NVIDIA GeForce RTX 5090",
  "Porsche 911 GT3 RS",
  "BMW S1000RR",
  "Koenigsegg Jesko Absolut",
  "Red Bull Energy Drink",
  "Bugatti Chiron Super Sport",
  "Biryani",
  "Monster Ultra Energy Drink",
  "Pizza",
  "Ducati Panigale V4R",
  "Porsche 911",
  "Kawasaki Ninja H2R",
  "Diet Coke",
  "AirPods Pro",
  "Protein Supplement",
];

const POPULAR_SEARCHES = [
  "iPhone Duo",
  "iPhone 18 Pro Max (Black)",
  "iPhone 18 Pro Max (Burgundy)",
  "Samsung Galaxy Z Fold8 Ultra",
  "Claude Max",
  "MacBook Pro 14\"",
  "PlayStation 5 Pro",
  "NVIDIA GeForce RTX 5090",
  "Samsung Galaxy S26 Ultra",
  "iPhone Air",
  "Porsche 911 GT3 RS",
  "BMW S1000RR",
  "Koenigsegg Jesko Absolut",
  "Red Bull Energy Drink",
  "Bugatti Chiron Super Sport",
  "McLaren F1",
  "Pagani Huayra",
  "Biryani",
  "Monster Ultra Energy Drink",
  "Pizza",
  "Aston Martin Valkyrie",
  "Tesla Cybertruck",
  "Ducati Panigale V4R",
  "Porsche 911",
  "Kawasaki Ninja H2R",
  "Netflix Premium",
  "YouTube Premium",
  "Diet Coke",
  "AirPods Pro",
  "Mac Mini",
  "DSLR Camera",
  "Protein Supplement",
  "Gym Membership",
  "Dumbell Set",
  "Lipstick Set",
  "Classic Denim Mini Skirt",
  "FC Barcelona Home Jersey",
  "Shawarma",
  "Momos",
  "Vada Pav",
  "Hell Energy Drink",
  "Mountain Dew",
  "Concert Ticket",
  "Anime Box Set",
  "Pokémon Trading Card Box",
  "Water Gun",
];

const CATEGORIES: { name: string; href: string }[] = [
  // Main Categories
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
  // Subcategories (only listed once, non-duplicate)
  { name: "Bikes", href: "/category/vehicles?sub=bikes" },
  { name: "Cars", href: "/category/vehicles?sub=cars" },
  { name: "Laptops", href: "/category/electronics?sub=laptops" },
  { name: "Audio", href: "/category/electronics?sub=audio" },
  { name: "Gaming", href: "/category/electronics?sub=gaming" },
  { name: "Keyboards & Mouse", href: "/category/electronics?sub=keyboards-mice" },
  { name: "Cameras & Streaming", href: "/category/electronics?sub=cameras-streaming" },
  { name: "Storage & Computing", href: "/category/electronics?sub=storage-computing" },
  { name: "Displays & Projectors", href: "/category/electronics?sub=displays-projectors" },
  { name: "Smart Home", href: "/category/electronics?sub=smart-home" },
  { name: "Watches", href: "/category/electronics?sub=watches" },
  { name: "Skin Care", href: "/category/beauty?sub=skin-care" },
  { name: "Hair Care", href: "/category/beauty?sub=hair-care" },
  { name: "Nails", href: "/category/beauty?sub=nails" },
  { name: "Body Care", href: "/category/beauty?sub=body-care" },
  { name: "Fragrance", href: "/category/beauty?sub=fragrance" },
  { name: "Beauty Tools", href: "/category/beauty?sub=beauty-tools" },
  { name: "Jewellery", href: "/category/fashion?sub=jewellery" },
  { name: "Ice Creams", href: "/category/food?sub=ice-creams" },
  { name: "Sweet Cravings", href: "/category/food?sub=sweet-cravings" },
  { name: "Biscuits", href: "/category/food?sub=biscuits" },
  { name: "Snacks", href: "/category/food?sub=snacks" },
  { name: "Coffee", href: "/category/drinks?sub=coffee" },
  { name: "Cold Drinks & Juices", href: "/category/drinks?sub=cold-drinks-juices" },
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
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12 space-y-9 md:space-y-11">
        {/* Three Discovery / Search Sections with Spacious Zepto-Style Layout */}
        <div className="space-y-8 md:space-y-9">
          {/* 1. Trending Searches */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-zinc-950">
              Trending Searches
            </h3>
            <div className="flex flex-wrap items-center gap-y-2.5 sm:gap-y-3 text-xs sm:text-[13px] text-zinc-500 leading-relaxed">
              {TRENDING_SEARCHES.map((term, index) => (
                <span key={term} className="inline-flex items-center">
                  <Link
                    href={`/?q=${encodeURIComponent(term)}`}
                    className="hover:text-zinc-950 transition-colors"
                  >
                    {term}
                  </Link>
                  {index < TRENDING_SEARCHES.length - 1 && (
                    <span className="mx-2.5 sm:mx-3 text-zinc-300 font-light select-none" aria-hidden="true">
                      |
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* 2. Popular Searches */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-zinc-950">
              Popular Searches
            </h3>
            <div className="flex flex-wrap items-center gap-y-2.5 sm:gap-y-3 text-xs sm:text-[13px] text-zinc-500 leading-relaxed">
              {POPULAR_SEARCHES.map((term, index) => (
                <span key={term} className="inline-flex items-center">
                  <Link
                    href={`/?q=${encodeURIComponent(term)}`}
                    className="hover:text-zinc-950 transition-colors"
                  >
                    {term}
                  </Link>
                  {index < POPULAR_SEARCHES.length - 1 && (
                    <span className="mx-2.5 sm:mx-3 text-zinc-300 font-light select-none" aria-hidden="true">
                      |
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Categories */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-zinc-950">
              Categories
            </h3>
            <div className="flex flex-wrap items-center gap-y-2.5 sm:gap-y-3 text-xs sm:text-[13px] text-zinc-500 leading-relaxed">
              {CATEGORIES.map((cat, index) => (
                <span key={cat.name} className="inline-flex items-center">
                  <Link
                    href={cat.href}
                    className="hover:text-zinc-950 transition-colors"
                  >
                    {cat.name}
                  </Link>
                  {index < CATEGORIES.length - 1 && (
                    <span className="mx-2.5 sm:mx-3 text-zinc-300 font-light select-none" aria-hidden="true">
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
