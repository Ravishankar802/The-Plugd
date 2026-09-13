import prisma from "@/lib/prisma";
import { ensureUniqueSlug, slugify } from "@/lib/slug";
import { getFullFoodCatalog, FOOD_NAMES } from "@/lib/food-catalog";
import { getFullDrinksCatalog } from "@/lib/drinks-catalog";
import { getFullFashionCatalog } from "@/lib/fashion-catalog";
import { getFullMobilesCatalog } from "@/lib/mobiles-catalog";
import { getFullBeautyCatalog } from "@/lib/beauty-catalog";
import { getFullElectronicsCatalog } from "@/lib/electronics-catalog";
import { getFullVehiclesCatalog } from "@/lib/vehicles-catalog";
import {
  getEntertainmentProductImage,
  getSubscriptionsProductImage,
  getFitnessProductImage,
  DEFAULT_ENTERTAINMENT_IMAGE,
  DEFAULT_SUBSCRIPTIONS_IMAGE,
  DEFAULT_FITNESS_IMAGE,
} from "@/lib/product-images";

type CatalogSeedDefinition = {
  name: string;
  category: string;
  imageUrl?: string;
  shortDescription?: string;
  description?: string;
  featured?: boolean;
};

type CategorySeedDefinition = {
  name: string;
  slug: string;
  icon: string;
  description: string;
  items: Array<Omit<CatalogSeedDefinition, "category">>;
};

const ENTERTAINMENT_ITEMS = [
  "Concert Ticket",
  "Movie Ticket",
  "Music Festival Pass",
  "Comedy Show Ticket",
];

const SUBSCRIPTIONS_ITEMS = [
  "ChatGPT Plus",
  "ChatGPT Pro",
  "Claude Pro",
  "Claude Max",
  "X Premium",
  "X Premium+",
  "Netflix Standard",
  "Netflix Premium",
  "Prime Video Subscription",
  "Hotstar Subscription",
  "Apple TV Subscription",
  "Google AI Plus",
  "Google AI Pro",
  "Google AI Ultra",
];

const FITNESS_ITEMS = [
  "Gym Membership",
  "Running Shoes",
  "Fitness Watch",
  "Dumbbell Set",
  "Bicycle",
  "Protein Supplement",
  "Yoga Mat",
  "Kettlebell Set",
];

function itemSlug(name: string): string {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/**
 * The ONLY 10 top-level categories allowed in Plugd.
 */
const CATEGORY_SEEDS: CategorySeedDefinition[] = [
  // 1. FOOD
  {
    name: "Food",
    slug: "food",
    icon: "Utensils",
    description: "Everyday meals, comfort food, and cravings from across India.",
    items: getFullFoodCatalog().map((item) => ({
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 2. DRINKS
  {
    name: "Drinks",
    slug: "drinks",
    icon: "Coffee",
    description: "Beverages, refreshments, and drink options for every mood.",
    items: getFullDrinksCatalog().map((item) => ({
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 3. FASHION
  {
    name: "Fashion",
    slug: "fashion",
    icon: "Shirt",
    description: "Style, staples, and statement pieces creators love sharing.",
    items: getFullFashionCatalog().map((item) => ({
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 4. MOBILE
  {
    name: "Mobile",
    slug: "mobile",
    icon: "Smartphone",
    description: "Next-gen flagship smartphones and pro tablets.",
    items: getFullMobilesCatalog().map((item) => ({
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 5. BEAUTY
  {
    name: "Beauty",
    slug: "beauty",
    icon: "Sparkles",
    description: "Beauty, skincare, grooming, and personal care wishlist staples.",
    items: getFullBeautyCatalog().map((item) => ({
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 6. ENTERTAINMENT
  {
    name: "Entertainment",
    slug: "entertainment",
    icon: "Ticket",
    description: "Events, culture, and leisure experiences worth sharing publicly.",
    items: ENTERTAINMENT_ITEMS.map((name, idx) => ({
      name,
      imageUrl: getEntertainmentProductImage(itemSlug(name)) || DEFAULT_ENTERTAINMENT_IMAGE,
      shortDescription: "",
      description: "",
      featured: idx < 2,
    })),
  },
  // 7. SUBSCRIPTIONS
  {
    name: "Subscriptions",
    slug: "subscriptions",
    icon: "BadgeCheck",
    description: "Digital memberships and recurring tools creators actually use.",
    items: SUBSCRIPTIONS_ITEMS.map((name, idx) => ({
      name,
      imageUrl: getSubscriptionsProductImage(itemSlug(name)) || DEFAULT_SUBSCRIPTIONS_IMAGE,
      shortDescription: "",
      description: "",
      featured: idx < 4,
    })),
  },
  // 8. ELECTRONICS
  {
    name: "Electronics",
    slug: "electronics",
    icon: "Laptop",
    description: "Tech upgrades, creator gear, and hardware essentials worth wishing for.",
    items: getFullElectronicsCatalog().map((item) => ({
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 9. FITNESS
  {
    name: "Fitness",
    slug: "fitness",
    icon: "Dumbbell",
    description: "Health, training, and sports wishlist items that feel motivating.",
    items: FITNESS_ITEMS.map((name, idx) => ({
      name,
      imageUrl: getFitnessProductImage(itemSlug(name)) || DEFAULT_FITNESS_IMAGE,
      shortDescription: "",
      description: "",
      featured: idx < 3,
    })),
  },
  // 10. VEHICLES
  {
    name: "Vehicles",
    slug: "vehicles",
    icon: "Car",
    description: "Bikes, cars, supercars, and hypercars for ambitious personal goals.",
    items: getFullVehiclesCatalog().map((item) => ({
      name: item.name,
      imageUrl: item.imageUrl,
      shortDescription: "",
      description: "",
      featured: item.featured,
    })),
  },
  // 11. TOYS
  {
    name: "Toys",
    slug: "toys",
    icon: "Gamepad2",
    description: "Retro collectibles, gaming gear, figures, and creative toys.",
    items: [
      {
        name: "Retro Arcade Machine",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
        shortDescription: "",
        description: "",
        featured: true,
      },
      {
        name: "Lego Collector Edition",
        imageUrl: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=600&q=80",
        shortDescription: "",
        description: "",
        featured: true,
      },
      {
        name: "Gundam Model Kit",
        imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
        shortDescription: "",
        description: "",
        featured: true,
      },
      {
        name: "RC High-Speed Drone",
        imageUrl: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80",
        shortDescription: "",
        description: "",
        featured: false,
      },
      {
        name: "Anime Action Figure",
        imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
        shortDescription: "",
        description: "",
        featured: false,
      },
      {
        name: "Custom Mechanical Keyboard",
        imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
        shortDescription: "",
        description: "",
        featured: false,
      },
      {
        name: "Rubik's Speed Cube",
        imageUrl: "https://images.unsplash.com/photo-1591994843349-f415893b3a6b?auto=format&fit=crop&w=600&q=80",
        shortDescription: "",
        description: "",
        featured: false,
      },
      {
        name: "Diecast Supercar Model",
        imageUrl: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80",
        shortDescription: "",
        description: "",
        featured: false,
      },
    ],
  },
];

export const ALLOWED_CATEGORY_SLUGS = [
  "food",
  "drinks",
  "fashion",
  "mobile",
  "beauty",
  "entertainment",
  "subscriptions",
  "electronics",
  "fitness",
  "vehicles",
  "toys",
];

export const SEARCH_PLACEHOLDERS = [
  "Search for iPhone 17 Pro Max",
  "Search for Biryani",
  "Search for Nike Air Force 1",
  "Search for Red Bull Energy Drink",
  "Search for Porsche 911 GT3 RS",
];

export function getSeedCategories() {
  return CATEGORY_SEEDS.map((category, categoryIndex) => ({
    name: category.name,
    slug: category.slug,
    icon: category.icon,
    description: category.description,
    active: true,
    displayOrder: categoryIndex,
  }));
}

export function getSeedCatalogItems() {
  const usedSlugs = new Set<string>();
  const flattened: CatalogSeedDefinition[] = CATEGORY_SEEDS.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      category: category.slug,
    })),
  );

  return flattened.map((item, index) => {
    const slug = ensureUniqueSlug(slugify(item.name), usedSlugs);

    return {
      name: item.name,
      slug,
      categorySlug: item.category,
      image: item.imageUrl || null,
      shortDescription: null,
      description: null,
      featured: Boolean(item.featured),
      active: true,
      displayOrder: index,
    };
  });
}

export async function ensureCatalogSeeded() {
  // 1. Identify and purge any obsolete categories not in the allowed list
  const existingCategories = await prisma.category.findMany({
    select: { id: true, slug: true },
  });

  const obsoleteCategories = existingCategories.filter(
    (c) => !ALLOWED_CATEGORY_SLUGS.includes(c.slug),
  );

  if (obsoleteCategories.length > 0) {
    const obsoleteIds = obsoleteCategories.map((c) => c.id);
    // Delete wishlist items linked to obsolete catalog items
    await prisma.wishlistItem.deleteMany({
      where: {
        catalogItem: {
          categoryId: { in: obsoleteIds },
        },
      },
    });
    // Delete obsolete catalog items
    await prisma.catalogItem.deleteMany({
      where: {
        categoryId: { in: obsoleteIds },
      },
    });
    // Delete obsolete categories
    await prisma.category.deleteMany({
      where: {
        id: { in: obsoleteIds },
      },
    });
  }

  // 2. Check if we are fully seeded with correct counts
  const categoryCount = await prisma.category.count({
    where: { slug: { in: ALLOWED_CATEGORY_SLUGS } },
  });
  const foodCount = await prisma.catalogItem.count({
    where: { category: { slug: "food" } },
  });
  const drinksCount = await prisma.catalogItem.count({
    where: { category: { slug: "drinks" } },
  });
  const mobileCount = await prisma.catalogItem.count({
    where: { category: { slug: "mobile" } },
  });
  const vehiclesCount = await prisma.catalogItem.count({
    where: { category: { slug: "vehicles" } },
  });
  const electronicsCount = await prisma.catalogItem.count({
    where: { category: { slug: "electronics" } },
  });
  const toysCount = await prisma.catalogItem.count({
    where: { category: { slug: "toys" } },
  });

  if (
    categoryCount === 11 &&
    foodCount >= FOOD_NAMES.length &&
    drinksCount >= 18 &&
    mobileCount >= 21 &&
    vehiclesCount >= 130 &&
    electronicsCount >= 70 &&
    toysCount >= 8
  ) {
    await prisma.wishlistItem.deleteMany({
      where: { catalogItem: { slug: "sweets" } },
    });
    await prisma.catalogItem.deleteMany({
      where: { slug: "sweets" },
    });
    await prisma.catalogItem.updateMany({
      where: { slug: "egg-curries" },
      data: { name: "Egg Curry", slug: "egg-curry" },
    });
    await prisma.catalogItem.updateMany({
      where: { slug: "momo" },
      data: { name: "Momos", slug: "momos" },
    });

    const foodImageUpdates = [
      { slug: "biryani", image: "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg" },
      { slug: "idli", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFIhXiqaaKx0splUZoe7MIWqlYTQVTEF3T9v2SiW9VlU6EPhYwb8tUEY&s=10" },
      { slug: "dosa", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHwVr20YROlapYcSBDDyUX7t2bjtmIkvPUbtjRZPzFgQ&s=10" },
      { slug: "tandoori-chicken", image: "https://bitesofindiaevan.com/wp-content/uploads/2024/11/tandoori-chicken.png" },
      { slug: "egg", image: "https://cookieandkate.com/images/2025/04/scrambled-eggs-recipe.jpg" },
      { slug: "south-indian-meals", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZGhc-3_-VL2slS056knU64LJu4DPYtuP73EJ-NUOArxMqb-j2HCfIatq9&s=10" },
      { slug: "chicken-fried-rice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRabpV0x1Q0EfRDu2Hb0a7QBUWHvZpewq9aVMxmtSs03A&s=10" },
      { slug: "mandi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYzshMgPsE4U8Zlh6diBfhHaUUiRN6TGhFhIEO8DOIlT9DAyHtQKbtVAlT&s=10" },
      { slug: "masala-dosa", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJw66TKqMp7h45JfShKq7TWBkC96fYU2VbxnYSnPjKd6X1VEqX0NoOVow&s=10" },
      { slug: "chicken-curry", image: "https://www.tamingtwins.com/wp-content/uploads/2026/07/EasyChickenCurry3.jpg" },
      { slug: "chicken", image: "https://www.simplyorganic.com/media/recipe/resized/520x520/wysiwyg/tmp/original-rotisserie-oven-whole-chicken-mobile.jpg" },
      { slug: "grilled-chicken", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQohbBz8XMTVY9lT7BgobHXwdDbSndQvNi4LoFGj5abRNvjJfGWrv_nV_Wb&s=10" },
      { slug: "vada", image: "https://c.ndtvimg.com/2023-09/u113o4r_medu-vada_625x300_06_September_23.jpg" },
      { slug: "cake", image: "https://api.floraindia.com/upload/x8i2a54tpp1754035623750.webp" },
      { slug: "chilli-chicken", image: "https://images.slurrp.com/prod/recipe_images/transcribe/side%20dish/Chilli_Chicken.webp" },
      { slug: "chicken-biryani", image: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg" },
      { slug: "fish", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxL-aspCqvYYm2dZOYxlD2M4qXOu4rC5Sqd1_x4_I2DQ&s=10" },
      { slug: "mutton", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_1fnqxNbv5tM936tHbmdNQczV3tu2yulHYlQNvFOKJA&s=10" },
      { slug: "coffee", image: "https://www.nestleprofessional.co.uk/sites/default/files/styles/np_article_small/public/2025-08/cup-of-coffee.jpg?h=943238f6&itok=zph-mbOb" },
      { slug: "tea", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Ct4pzkLR53H2CNWDGPCSfr6Uq4lGIL-bTQ7MOBIadF9RoydbZgO-VRU&s=10" },
      { slug: "pizza", image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/1280px-Pizza-3007395.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail" },
      { slug: "poha", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU_x1OJxNZtEE1d4hEPq3shljeJEsHLiKIiH8sp_gbaGYlSESECfIlDm4N&s=10" },
      { slug: "chicken-lollipop", image: "https://ranveerbrar.com/wp-content/uploads/2021/02/chicken-lollypops.jpg" },
      { slug: "aloo-paratha", image: "https://cookingfromheart.com/wp-content/uploads/2020/09/Aloo-Paratha-4.jpg" },
      { slug: "burger", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC6SYudG3mvTFKx2qtbCr-iRm6BafxjgtC4cUaHw3Gwz9SihQjTbfAWx0u&s=10" },
      { slug: "tiffin", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQBtgRWOKki4ZclW__PGz3BTGZtFK4sLi-Nw2381jQbpqu9pdWAMlCucIb&s=10" },
      { slug: "pongal", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSoPBfZs4oYbz_mt-j1I3CHk25stWbDJ2g1iUYttSjbsfdzk802LBsxlU&s=10" },
      { slug: "egg-curry", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtIZYMmAxH0-IMmIQ4HjwTdF9reOGY0V3V10t9TrJSoM36iXaSarUSvWc&s=10" },
      { slug: "set-dosa", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu90TK4Tm6ZnCrYEQ9HyYk4qiIma7ymT1-ZheT65_JLgT8nR-cNXq64Qg&s=10" },
      { slug: "shawarma", image: "https://moribyan.com/wp-content/uploads/2026/03/IMG_3893.jpg" },
      { slug: "chole-bhature", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXCwkW1dCExzQ3HNnfExnx_YyZmgTS6kVRUlRGOM6Kmp-46R5YfUoanI-J&s=10" },
      { slug: "chicken-rolls", image: "https://madscookhouse.com/wp-content/uploads/2021/02/Chicken-Kathi-Roll.jpg" },
      { slug: "sandwich", image: "https://images.boldsky.com/img/2026/04/veg-sandwich-main_1200x675_1776389458714.jpg" },
      { slug: "pasta", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfZAhcvNnX_AHSuDg_f_yXCFT7M2abRcatNDxpHQnHL6xTuZ5Z4Dnl6-iD&s=10" },
      { slug: "pulao", image: "https://tiffinandteaofficial.com/wp-content/uploads/2020/12/281122_1-500x500.jpg" },
      { slug: "fruit-bowl", image: "https://tropicalexotics.in/cdn/shop/files/gut-reset-fruit-bowl-fibre-rich-digestion-bowl_2048x.png?v=1779364274" },
      { slug: "sambar", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj-w_V8DizqdArTLnNaKkmmxq0OdU1UvmTbdx0DzJLsNg7v4rMfsMm2Mo&s=10" },
      { slug: "maggi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX4f0frS0Dl6Ms9nWa2CJRJViPD3a3faz5rF0ynRCx8vPl2ojAEfMUwo1V&s=10" },
      { slug: "poori-sabzi", image: "https://www.myindianproducts.com/images/travel/food/poori-sabzi-madhya-pradesh.webp" },
      { slug: "north-indian-meals", image: "https://img.onmanorama.com/content/dam/mm/en/food/features/images/2022/1/11/north-indian-cuisine.jpg?crop=fc&w=100&h=100" },
      { slug: "paratha", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvgHZEREfw42BVj83jbEdMvDYMIs9WACcVR6vyIuMS7itgwxMTDdmAxRPM&s=10" },
      { slug: "chicken-soup", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTFhlWoVzwjTz9bIjDEnD6zyiOYXzWetkmGV16R8WaaRqwbhOLg9QZ56hA&s=10" },
      { slug: "thali", image: "https://www.bharatmasala.com/wp-content/uploads/2025/05/gujarati-thali.png" },
      { slug: "chicken-shawarma", image: "https://theflavoursofkitchen.com/wp-content/uploads/2022/02/chicken-shawarma-recipe-3.jpg" },
      { slug: "curd-rice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7wwm_OagNX30d9F041F85Mzhvo7ElxCVo6ZFsErH3hMbUT5BOV2rGceI&s=10" },
      { slug: "omelette", image: "https://www.recipetineats.com/tachyon/2023/06/Ham-and-cheese-omelette_1.jpg" },
      { slug: "khichdi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZvHANZ7xlFqNdqWSgfbkARRQzITs4yLapx2ZnsxKIAJkE3Jb7VjJCYRJo&s=10" },
      { slug: "momos", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjhR7Pk10dvhcUiL2tHH1xQJPKu64EaCpVIFVRfx58QMrB1NAJTPilUJYM&s=10" },
      { slug: "appam", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLwoFkfYHw6EfBrRqDOdAgClwMXUMwj0JiqkHmI1rS9z1iosUJq2Lfhdw&s=10" },
    ];
    for (const { slug, image } of foodImageUpdates) {
      await prisma.catalogItem.updateMany({
        where: { slug, NOT: { image } },
        data: { image },
      });
    }
    return;
  }

  // 3. Upsert the 11 allowed categories
  for (const category of getSeedCategories()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  const categoryMap = new Map(
    (
      await prisma.category.findMany({
        select: { id: true, slug: true },
      })
    ).map((category) => [category.slug, category.id]),
  );

  // 4. Upsert all catalog items with NO descriptions
  for (const item of getSeedCatalogItems()) {
    const categoryId = categoryMap.get(item.categorySlug);
    if (!categoryId) continue;

    await prisma.catalogItem.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        categoryId,
        image: item.image,
        shortDescription: null,
        description: null,
        featured: item.featured,
        active: item.active,
        displayOrder: item.displayOrder,
      },
      create: {
        name: item.name,
        slug: item.slug,
        categoryId,
        image: item.image,
        shortDescription: null,
        description: null,
        featured: item.featured,
        active: item.active,
        displayOrder: item.displayOrder,
      },
    });
  }
}

export function resolveWishlistItem(wishlistItem: {
  id: string;
  slug: string;
  itemType: "CATALOG" | "CUSTOM";
  name: string | null;
  image: string | null;
  shortDescription: string | null;
  description: string | null;
  externalUrl: string | null;
  personalNote: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  categoryId: string | null;
  category?: { id: string; name: string; slug: string; icon: string | null } | null;
  catalogItem?: {
    id: string;
    name: string;
    slug: string;
    image: string | null;
    shortDescription: string | null;
    description: string | null;
    categoryId: string;
    category?: { id: string; name: string; slug: string; icon: string | null } | null;
  } | null;
}) {
  const source = wishlistItem.catalogItem;

  return {
    id: wishlistItem.id,
    slug: wishlistItem.slug,
    itemType: wishlistItem.itemType,
    name: source?.name ?? wishlistItem.name ?? "Wishlist item",
    image: source?.image ?? wishlistItem.image,
    shortDescription: null,
    description: null,
    externalUrl: wishlistItem.externalUrl,
    personalNote: wishlistItem.personalNote,
    isFeatured: wishlistItem.isFeatured,
    isPublished: wishlistItem.isPublished,
    displayOrder: wishlistItem.displayOrder,
    categoryId: source?.categoryId ?? wishlistItem.categoryId,
    category: source?.category ?? wishlistItem.category ?? null,
  };
}
