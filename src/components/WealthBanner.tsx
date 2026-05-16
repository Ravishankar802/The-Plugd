"use client";

import Image from "next/image";

export default function WealthBanner({ children }: { children?: React.ReactNode }) {
  return (
    <section className="w-full relative h-[450px] md:h-[650px] overflow-hidden">
      <div 
        className="absolute inset-0 z-10"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)'
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=2070&auto=format&fit=crop"
          alt="Wealth Vault"
          fill
          unoptimized
          className="object-cover"
        />
        {/* Darker overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Footer Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 z-20 w-full pb-10">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {children}
        </div>
      </div>
    </section>
  );
}
