/**
 * Entertainment Catalog Data Definition for Plugd
 * 
 * Exactly the 10 specified entertainment products with exact names and image URLs.
 */

import { getEntertainmentProductImage, DEFAULT_ENTERTAINMENT_IMAGE } from "./product-images";

export interface EntertainmentProduct {
  id: string;
  name: string;
  category: "Entertainment";
  imageUrl: string;
  description: string;
  tags: string[];
  featured?: boolean;
  displayOrder: number;
}

export const RAW_ENTERTAINMENT_PRODUCTS: Array<{
  id: string;
  name: string;
  imageUrl: string;
  featured?: boolean;
}> = [
  {
    id: "concert-ticket",
    name: "Concert Ticket",
    imageUrl: "https://static.vecteezy.com/system/resources/previews/029/277/631/non_2x/sample-ticket-for-a-musical-concert-modern-ticket-card-template-illustration-vector.jpg",
    featured: true,
  },
  {
    id: "movie-ticket",
    name: "Movie Ticket",
    imageUrl: "https://img.magnific.com/premium-vector/movie-theater-ticket-isolated-white-background-vector-movie-popcornfestival-ticket_1137439-318.jpg?semt=ais_hybrid&w=740&q=80",
    featured: true,
  },
  {
    id: "music-festival-pass",
    name: "Music Festival Pass",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh3dfXB-jMH5Dmw9v4J0dG4yLoVAZAXgLwPIivvagXhQ&s=10",
    featured: true,
  },
  {
    id: "comedy-show-ticket",
    name: "Comedy Show Ticket",
    imageUrl: "https://static.vecteezy.com/system/resources/previews/028/904/593/non_2x/stand-up-comedy-show-entry-ticket-modern-elegant-design-template-of-event-ticket-vector.jpg",
    featured: true,
  },
  {
    id: "ipl-match-ticket",
    name: "IPL Match Ticket",
    imageUrl: "https://d16f573ilcot6q.cloudfront.net/wp-content/uploads/2024/02/IPL-Tickets.jpg",
    featured: true,
  },
  {
    id: "cricket-series-pass",
    name: "Cricket Series Pass",
    imageUrl: "https://img.magnific.com/free-psd/cricket-match-ticket_23-2151987718.jpg?semt=ais_hybrid&w=740&q=80",
    featured: true,
  },
  {
    id: "anime-box-set",
    name: "Anime Box Set",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5LNfgpGgVijvtfUYYA5ipF7RIFDC1Efm9Ks4a2jmzdw&s=10",
    featured: true,
  },
  {
    id: "vinyl-player",
    name: "Vinyl Player",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEBygLSkQEoSrc6fLJpmhPVaKgPLwk1yNMaJrvf_we7EEEE1Pi2LGCjH7A&s=10",
    featured: true,
  },
  {
    id: "board-game-night",
    name: "Board Game Night",
    imageUrl: "https://goodcheapeats.com/wp-content/uploads/2025/02/monopoly-travel.jpg",
    featured: true,
  },
  {
    id: "theater-experience",
    name: "Theater Experience",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1qwzKefQdsBu7fM30aA8xX6K4YIWZ4tAyZH4CJp7Qwk4wb4Kj4KM2Dds&s=10",
    featured: true,
  },
];

export function getFullEntertainmentCatalog(): EntertainmentProduct[] {
  return RAW_ENTERTAINMENT_PRODUCTS.map((p, idx) => ({
    id: p.id,
    name: p.name,
    category: "Entertainment",
    imageUrl: getEntertainmentProductImage(p.id) || p.imageUrl || DEFAULT_ENTERTAINMENT_IMAGE,
    description: "",
    tags: [p.id, p.name.toLowerCase()],
    featured: Boolean(p.featured),
    displayOrder: idx + 1,
  }));
}
