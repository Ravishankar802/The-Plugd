/**
 * Curated Fitness Catalog Data Definition for Plugd
 * 
 * Exactly the 29 specified products with exact names and image URLs.
 */

import { getFitnessProductImage, DEFAULT_FITNESS_IMAGE } from "./product-images";

export interface FitnessProduct {
  id: string;
  name: string;
  category: "Fitness";
  imageUrl: string;
  description: string;
  tags: string[];
  featured?: boolean;
  displayOrder: number;
}

export const RAW_FITNESS_PRODUCTS: Array<{
  id: string;
  name: string;
  imageUrl: string;
  featured?: boolean;
}> = [
  {
    id: "gym-membership",
    name: "Gym Membership",
    imageUrl: "https://pvccardprinting.in/wp-content/uploads/2025/04/fitness-club-membership-pvc-cards.webp",
    featured: true,
  },
  {
    id: "running-shoes",
    name: "Running Shoes",
    imageUrl: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/a/d/ad22b92Nike-HM6803-404_1.jpg?rnd=20200526195200&tr=w-1536",
    featured: true,
  },
  {
    id: "fitness-watch",
    name: "Fitness Watch",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnJ8G54X9uupW9d0Hg5rsD8wo5Wnz47riADrnJcQL-IllEM3A25cqPYx1Y&s=10",
    featured: true,
  },
  {
    id: "dumbbell-set",
    name: "Dumbbell Set",
    imageUrl: "https://www.theflexnest.com/cdn/shop/products/2_c1174f6f-9b40-44bb-8a62-0184ec56b191_2048x.jpg?v=1658756981",
    featured: true,
  },
  {
    id: "bicycle",
    name: "Bicycle",
    imageUrl: "https://justbuycycles.com/cdn/shop/files/7_04dac2d6-069f-4d02-b36f-5fc94fc3c868.jpg?v=1787741516",
    featured: true,
  },
  {
    id: "protien-supplement",
    name: "Protien Supplement",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bZQNqgVkwQFD86kfXLguE1yFY3V2xP2Dw4m3xCTceQ&s=10",
    featured: true,
  },
  {
    id: "yoga-mat",
    name: "Yoga Mat",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGnWBaq37XXtrO9GT3dOusiF-6X3TapVeTESDMRvlz2EhIM2TL77M9Iyo&s=10",
    featured: true,
  },
  {
    id: "kettleball-set",
    name: "Kettleball Set",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy0PUSQxFSDorAX_zZPjYf41oKfDiIYqrVquKfuI9FDMc8ExRrrva9Pr2E&s=10",
    featured: true,
  },
  {
    id: "resistance-bands",
    name: "Resistance Bands",
    imageUrl: "https://imagely.mirafit.co.uk/wp/wp-content/uploads/2019/07/fitness-expert-uses-mirafit-resistance-band-to-stretch.jpg",
    featured: true,
  },
  {
    id: "weight-plates",
    name: "Weight Plates",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyjr6n3ZqkM2hi_6nRsbUCbrmlSKBllXiMzFjzw26mRnb72LmGSfacAXw&s=10",
    featured: true,
  },
  {
    id: "barbell-set",
    name: "Barbell Set",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZl-bVKmNuU2vdnIxSzSknsui38qzVMekXKRzZ1GEWlzizJTMBJROaixiX&s=10",
    featured: true,
  },
  {
    id: "treadmill",
    name: "Treadmill",
    imageUrl: "https://www.bodycraft.com/wp-content/uploads/2024/06/T-1050-TFT-1-scaled.png",
    featured: true,
  },
  {
    id: "exercise-bike",
    name: "Exercise Bike",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-xT98ry83JJz11xavYMGpWOpxVTDiPu077VBFDWTrEnPn34HlVKnWGoA&s=10",
    featured: true,
  },
  {
    id: "rowing-machine",
    name: "Rowing Machine",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3pUTHvER_aM4yW4DGrEcnQK80Q4tdAOSiCfIc5Fmdb5_k1RAOxrMckdu_&s=10",
    featured: true,
  },
  {
    id: "elliptical-machine",
    name: "Elliptical Machine",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtjsGL5j_84mUCJjMYFqsPQ-t4hVPtGRa976SE0MaaUUPTd3BI9RgOAHI&s=10",
    featured: true,
  },
  {
    id: "bench-press",
    name: "Bench Press",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxD0Hriy2sadmZn_Bg9LdSGdzHILgsiV-QhgKw0u8UbG5041u-O4D_ihg&s=10",
    featured: true,
  },
  {
    id: "squat-rack",
    name: "Squat Rack",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuuHP-fvbucNkWHvkfwQ8sOHVe3uKSYROSW3oE3TW65V714qPmmF0WQH7B&s=10",
    featured: true,
  },
  {
    id: "pull-up-bar",
    name: "Pull-Up Bar",
    imageUrl: "https://m.media-amazon.com/images/I/612EmDVVhzL.jpg",
    featured: true,
  },
  {
    id: "dip-station",
    name: "Dip Station",
    imageUrl: "https://www.prosourcefit.com/cdn/shop/files/Power-Dip-Station-Red-01-Shopify.jpg?v=1741295359&width=1500",
    featured: true,
  },
  {
    id: "gym-gloves",
    name: "Gym Gloves",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyrXSf1bQyH4DekpDmoryx7M-wldMTF3TwCji43I68ZI61Z8pbiPse17I&s=10",
    featured: true,
  },
  {
    id: "weightlighting-belt",
    name: "Weightlighting Belt",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuTTC3pT68uyuxFJYpNhVpUjzqOwD4qd4CPF6h2ue39UAQs9mtYvZ3NfMq&s=10",
    featured: true,
  },
  {
    id: "wrist-wraps",
    name: "Wrist Wraps",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpcvi4foKi6ir3KcjQHcI0o6x6V6VMcHJkIz_b_Qt1g6_ufS0cnid3VJVG&s=10",
    featured: true,
  },
  {
    id: "ankle-weights",
    name: "Ankle Weights",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS70F4JKCTK8TsyiBSjZ8PDkb9tv7lxuZSzb4lLct9Vb-SMY9Z-ZUodKmk&s=10",
    featured: true,
  },
  {
    id: "foam-roller",
    name: "Foam Roller",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMMG0L-2LCJ7lsKCKkMPQAH7CSRJ-dKwCaKhr4RjfDVl-_ug0yS6akt5k&s=10",
    featured: true,
  },
  {
    id: "massage-gun",
    name: "Massage Gun",
    imageUrl: "https://m.media-amazon.com/images/I/41UQbuHqPcL.jpg",
    featured: true,
  },
  {
    id: "skipping-rope",
    name: "Skipping Rope",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzuF7wmTA-NdCwYAVduZRRH909bvje_OOUXK1GYo7n82xzp9CaAeB-Ma34&s=10",
    featured: true,
  },
  {
    id: "ab-roller",
    name: "Ab Roller",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNYAg58SnPYhGYiuXEd5cq82pCu0MEe4E4yWd63-eU6kEwdqU2XhaMCw0&s=10",
    featured: true,
  },
  {
    id: "push-up-board",
    name: "Push-Up Board",
    imageUrl: "https://m.media-amazon.com/images/I/61Gkvf+llXL.jpg",
    featured: true,
  },
  {
    id: "yoga-blocks",
    name: "Yoga Blocks",
    imageUrl: "https://m.media-amazon.com/images/I/61etKCE8oPL._AC_UF350,350_QL80_.jpg",
    featured: true,
  },
];

export function getFullFitnessCatalog(): FitnessProduct[] {
  return RAW_FITNESS_PRODUCTS.map((p, idx) => ({
    id: p.id,
    name: p.name,
    category: "Fitness",
    imageUrl: getFitnessProductImage(p.id) || p.imageUrl || DEFAULT_FITNESS_IMAGE,
    description: "",
    tags: [p.id, p.name.toLowerCase()],
    featured: Boolean(p.featured),
    displayOrder: idx + 1,
  }));
}

export const FITNESS_STARTING_COUNTS: Record<string, number> = {};
