/**
 * Vehicles Catalog Data Definition for Plugd
 * 
 * EXACTLY 4 subcategories:
 * 1. Bikes (28)
 * 2. Cars (14)
 * 3. Supercars (35)
 * 4. Hypercars (54)
 * 
 * Zero descriptions, zero prices.
 */

import { getVehiclesProductImage, DEFAULT_VEHICLES_IMAGE } from "./product-images";

export interface VehicleProduct {
  id: string;
  name: string;
  brand: string;
  category: "Vehicles";
  subcategory: "Bikes" | "Cars" | "Supercars" | "Hypercars";
  sectionId: string;
  sectionTitle: string;
  imageUrl: string;
  description: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  displayOrder: number;
}

export interface VehicleSection {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  displayOrder: number;
  productIds: string[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const BIKES_NAMES = [
  "Activa 6G",
  "Royal Enfield Continental GT 650",
  "Royal Enfield Interceptor 650",
  "Aprilia 457",
  "Triumph Street Triple 765 RS",
  "Triumph Speed Triple 1200 RS",
  "Kawasaki Z900",
  "Kawasaki Z1100",
  "Kawasaki Ninja ZX-6R",
  "Kawasaki Ninja ZX-10R",
  "Kawasaki Ninja H2",
  "Kawasaki Ninja H2R",
  "BMW S1000RR",
  "BMW M1000RR",
  "Ducati Monster",
  "Ducati XDiavel V4",
  "Ducati Streetfighter V4S",
  "Ducati Panigale V4S",
  "Ducati Panigale V4R",
  "KTM 1390 Super Duke R",
  "Harley-Davidson X440T",
  "Harley-Davidson Nightster",
  "Harley-Davidson Sportster S",
  "Harley-Davidson Fat Boy",
  "Yamaha R9",
  "Yamaha R7",
  "Honda CBR1000RR-R Fireblade",
  "Aprilia RSV4 1100 Factory",
];

export const CARS_NAMES = [
  "Rolls-Royce Cullinan",
  "Rolls-Royce Phantom",
  "Rolls-Royce Spectre",
  "Mercedes-AMG G63",
  "Mercedes-Maybach S-Class",
  "Mercedes-Maybach GLS 600",
  "Range Rover SV",
  "Range Rover Sport",
  "Land Rover Defender",
  "Jeep Wrangler",
  "Ford Raptor R",
  "Ram TRX",
  "Tesla Cybertruck",
  "Tesla Model S Plaid",
];

export const SUPERCARS_NAMES = [
  "BMW M4",
  "BMW M5",
  "BMW M8",
  "Ferrari 296 GTB",
  "Ferrari 296 GTS",
  "Ferrari 812 Superfast",
  "Ferrari 812 Competizione",
  "Ferrari SF90 Stradale",
  "Ferrari SF90 Spider",
  "Ferrari 12 Cilindri",
  "Ferrari 12 Cilindri Spider",
  "Ferrari 849 Testarossa",
  "Ferrari 849 Testarossa Spider",
  "Lamborghini Huracán Evo",
  "Lamborghini Huracán STO",
  "Lamborghini Huracán Tecnica",
  "Lamborghini Aventador SVJ",
  "Lamborghini Murciélago",
  "Lamborghini Revuelto",
  "Lamborghini Temerario",
  "Porsche 911 Turbo S",
  "Porsche 911 GT3",
  "Porsche 911 GT3 RS",
  "Aston Martin Vantage",
  "Aston Martin Vanquish",
  "Aston Martin DB12",
  "Aston Martin DBS Superleggera",
  "Aston Martin DBS 770 Ultimate",
  "McLaren 720S",
  "McLaren 750S",
  "McLaren 765LT",
  "Ferrari Purosangue",
  "Lamborghini Urus",
  "Porsche Cayenne",
  "Aston Martin DBX",
];

export const HYPERCARS_NAMES = [
  "Porsche 918 Spyder",
  "McLaren P1",
  "McLaren P1 GTR",
  "McLaren Senna",
  "McLaren Senna GTR",
  "McLaren Speedtail",
  "McLaren Solus GT",
  "McLaren Elva",
  "McLaren W1",
  "McLaren F1",
  "Ferrari LaFerrari",
  "Ferrari LaFerrari Aperta",
  "Ferrari Daytona SP3",
  "Ferrari Monza SP1",
  "Ferrari Monza SP2",
  "Lamborghini Sián",
  "Lamborghini Veneno Roadster",
  "Aston Martin Vulcan",
  "Aston Martin Valhalla",
  "Aston Martin Valour",
  "Aston Martin Valiant",
  "Aston Martin Valen",
  "Aston Martin Valkyrie",
  "Mercedes-AMG Project One",
  "Rimac Nevera",
  "Rimac Nevera R",
  "Bugatti Veyron",
  "Bugatti Chiron Super Sport 300+",
  "Bugatti Chiron Pur Sport",
  "Bugatti Mistral",
  "Bugatti Divo",
  "Bugatti Centodieci",
  "Bugatti Bolide",
  "Bugatti Tourbillon",
  "Koenigsegg Jesko Absolut",
  "Koenigsegg Jesko Attack",
  "Koenigsegg Gemera",
  "Koenigsegg Agera",
  "Koenigsegg Agera R",
  "Koenigsegg Agera S",
  "Koenigsegg Agera RS",
  "Koenigsegg Regera",
  "Koenigsegg CCX",
  "Koenigsegg CCR",
  "Koenigsegg CCXR",
  "Koenigsegg CCGT",
  "Koenigsegg CC8S",
  "Koenigsegg CC850",
  "Pagani Zonda",
  "Pagani Huayra",
  "Pagani Utopia",
  "Pagani Grandi Complicazioni",
  "Hennessey Venom F5",
  "Hennessey Venom F5 Roadster",
];

function getBrandFromName(name: string): string {
  const parts = name.split(/[\s-]/);
  return parts[0];
}

export const RAW_VEHICLE_PRODUCTS: Array<{
  id: string;
  name: string;
  brand: string;
  subcategory: "Bikes" | "Cars" | "Supercars" | "Hypercars";
  sectionId: string;
  sectionTitle: string;
  description: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
}> = [
  ...BIKES_NAMES.map((name, idx) => ({
    id: slugify(name),
    name,
    brand: getBrandFromName(name),
    subcategory: "Bikes" as const,
    sectionId: "bikes-section",
    sectionTitle: "Bikes",
    description: "",
    tags: [slugify(name), "bike", "motorcycle"],
    featured: idx < 5,
    trending: idx % 6 === 0,
  })),
  ...CARS_NAMES.map((name, idx) => ({
    id: slugify(name),
    name,
    brand: getBrandFromName(name),
    subcategory: "Cars" as const,
    sectionId: "cars-section",
    sectionTitle: "Cars",
    description: "",
    tags: [slugify(name), "car", "luxury-car"],
    featured: idx < 4,
    trending: idx % 4 === 0,
  })),
  ...SUPERCARS_NAMES.map((name, idx) => ({
    id: slugify(name),
    name,
    brand: getBrandFromName(name),
    subcategory: "Supercars" as const,
    sectionId: "supercars-section",
    sectionTitle: "Supercars",
    description: "",
    tags: [slugify(name), "supercar", "exotic"],
    featured: idx < 6,
    trending: idx % 5 === 0,
  })),
  ...HYPERCARS_NAMES.map((name, idx) => ({
    id: slugify(name),
    name,
    brand: getBrandFromName(name),
    subcategory: "Hypercars" as const,
    sectionId: "hypercars-section",
    sectionTitle: "Hypercars",
    description: "",
    tags: [slugify(name), "hypercar", "pinnacle"],
    featured: idx < 8,
    trending: idx % 6 === 0,
  })),
];

export const VEHICLE_SECTIONS: VehicleSection[] = [
  {
    id: "bikes-section",
    title: "Bikes",
    subtitle: "Superbikes, naked streetfighters, adventure tourers, and cruisers",
    badge: "🏍️ Bikes",
    displayOrder: 1,
    productIds: BIKES_NAMES.map(slugify),
  },
  {
    id: "cars-section",
    title: "Cars",
    subtitle: "Luxury flagships, performance SUVs, and off-road powerhouses",
    badge: "🚙 Cars",
    displayOrder: 2,
    productIds: CARS_NAMES.map(slugify),
  },
  {
    id: "supercars-section",
    title: "Supercars",
    subtitle: "Mid-engine thoroughbreds, V12 icons, and track weapons",
    badge: "🏎️ Supercars",
    displayOrder: 3,
    productIds: SUPERCARS_NAMES.map(slugify),
  },
  {
    id: "hypercars-section",
    title: "Hypercars",
    subtitle: "Pinnacle engineering, multi-million dollar masterpieces, and speed records",
    badge: "⚡ Hypercars",
    displayOrder: 4,
    productIds: HYPERCARS_NAMES.map(slugify),
  },
];

export function getFullVehiclesCatalog(): VehicleProduct[] {
  return RAW_VEHICLE_PRODUCTS.map((p, idx) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: "Vehicles",
    subcategory: p.subcategory,
    sectionId: p.sectionId,
    sectionTitle: p.sectionTitle,
    imageUrl: getVehiclesProductImage(p.id) || DEFAULT_VEHICLES_IMAGE,
    description: "",
    tags: p.tags,
    featured: Boolean(p.featured),
    trending: Boolean(p.trending),
    displayOrder: idx,
  }));
}
