"use client";

import Image from "next/image";

export default function WealthBanner() {
  return (
    <section className="w-full relative h-[400px] md:h-[600px] mt-20">
      <div 
        className="absolute inset-0 z-10"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)'
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=2070&auto=format&fit=crop"
          alt="Wealth Vault"
          fill
          unoptimized
          className="object-cover"
        />
        {/* Subtle overlay to match site mood */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </section>
  );
}
