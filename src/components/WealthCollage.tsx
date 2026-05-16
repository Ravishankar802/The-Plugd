"use client";

import Image from "next/image";

const images = [
  {
    url: "https://images.unsplash.com/photo-1540962351504-03099e0a75c3?auto=format&fit=crop&q=80&w=1200",
    alt: "Private jet interior",
    className: "col-span-2 row-span-2"
  },
  {
    url: "https://images.unsplash.com/photo-1567891299233-da3ac1a48e95?auto=format&fit=crop&q=80&w=800",
    alt: "Luxury yacht on ocean",
    className: "col-span-1 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&q=80&w=800",
    alt: "Sports car",
    className: "col-span-1 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1200",
    alt: "City skyline at night",
    className: "col-span-1 row-span-2"
  },
  {
    url: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=800",
    alt: "Stacks of cash",
    className: "col-span-1 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    alt: "Luxury watch closeup",
    className: "col-span-1 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
    alt: "Penthouse interior",
    className: "col-span-2 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    alt: "Man in expensive suit",
    className: "col-span-1 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800",
    alt: "Infinity pool overlooking city",
    className: "col-span-1 row-span-1"
  }
];

export default function WealthCollage() {
  return (
    <section className="w-full mt-20">
      {/* Thin Divider Line */}
      <div className="w-full h-[1px] bg-border/40" />
      
      {/* Collage Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 md:gap-1 w-full bg-background overflow-hidden">
        {images.map((img, i) => (
          <div 
            key={i} 
            className={`relative overflow-hidden group ${img.className} min-h-[200px] md:min-h-[300px]`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle dark overlay */}
            <div className="absolute inset-0 bg-black/15 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
          </div>
        ))}
      </div>
    </section>
  );
}
