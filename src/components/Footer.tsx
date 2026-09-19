"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface FooterProps {
  showBorder?: boolean;
}

export default function Footer({ showBorder = true }: FooterProps) {
  const pathname = usePathname();

  // Public creator pages have their own minimal badge
  if (pathname?.startsWith("/@")) {
    return null;
  }

  return (
    <footer className={`w-full bg-white text-zinc-600 py-10 md:py-12 font-sans ${showBorder ? "border-t border-zinc-200/80" : ""}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-black shadow-sm">
              <Image src="/logo.png" alt="Plugd" width={28} height={28} className="h-6 w-6 object-contain" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-zinc-950">
                Plugd<span className="text-orange-500">.</span>
              </span>
              <p className="text-xs text-zinc-500">India-first creator wishlist and discovery platform.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
            <Link href="/" className="text-zinc-600 hover:text-zinc-950 transition-colors">
              Catalog
            </Link>
            <Link href="/category/electronics" className="text-zinc-600 hover:text-zinc-950 transition-colors">
              Electronics
            </Link>
            <Link href="/category/fashion" className="text-zinc-600 hover:text-zinc-950 transition-colors">
              Fashion
            </Link>
            <Link href="/category/vehicles" className="text-zinc-600 hover:text-zinc-950 transition-colors">
              Vehicles
            </Link>
            <Link href="/login" className="text-zinc-600 hover:text-zinc-950 transition-colors">
              Creator Login
            </Link>
            <Link href="/terms-of-service" className="text-zinc-600 hover:text-zinc-950 transition-colors">
              Terms
            </Link>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>© {new Date().getFullYear()} Plugd Inc. Browse things people want.</p>
          <p>Powered by Plugd • theplugd.com</p>
        </div>
      </div>
    </footer>
  );
}
