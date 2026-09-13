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
    await prisma.wishlistItem.deleteMany({
      where: { catalogItem: { slug: "bengali" } },
    });
    await prisma.catalogItem.deleteMany({
      where: { slug: "bengali" },
    });
    await prisma.catalogItem.updateMany({
      where: { slug: "egg-curries" },
      data: { name: "Egg Curry", slug: "egg-curry" },
    });
    await prisma.catalogItem.updateMany({
      where: { slug: "momo" },
      data: { name: "Momos", slug: "momos" },
    });
    await prisma.catalogItem.updateMany({
      where: { slug: "desserts" },
      data: { name: "Dessert", slug: "dessert" },
    });
    await prisma.catalogItem.updateMany({
      where: { slug: "mutton-curries" },
      data: { name: "Mutton Curry", slug: "mutton-curry" },
    });
    await prisma.catalogItem.updateMany({
      where: { slug: "kebabs" },
      data: { name: "Kebab", slug: "kebab" },
    });
    await prisma.wishlistItem.deleteMany({
      where: { catalogItem: { slug: "rasmalai-2" } },
    });
    await prisma.catalogItem.deleteMany({
      where: { slug: "rasmalai-2" },
    });
    await prisma.catalogItem.updateMany({
      where: { slug: "ferrero-rocher-premium-chocolates" },
      data: { name: "Ferrero Rocher Premium Chocolate", slug: "ferrero-rocher-premium-chocolate" },
    });
    await prisma.catalogItem.updateMany({
      where: { slug: "5050-maska-chaska" },
      data: { name: "50-50 Maska Chaska", slug: "50-50-maska-chaska" },
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
      { slug: "puttu", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_nCNvqGNHjGElBOPpPuv0lIytG53vzjL3x_KbTpw5MQ&s=10" },
      { slug: "wings", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7jVOvIhWO0VD4tQ8S338n8Ute1CwX0kvwwqL-CBiufEGwyZh71wVrgWk&s=10" },
      { slug: "upma", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdIcgjdLDX-PYS1t_6oi-JVmlg_Ot9tDe_P229FoF_K5iwDOZyDRz1T_s&s=10" },
      { slug: "puliyogare", image: "https://www.tatasimplybetter.com/cdn/shop/articles/Puliyogare_Tamarind_Rice.png?v=1721387987" },
      { slug: "parotta", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZsmJihgChNn33uicZGpXfn-TGpKCpHsYKTRtFCEwmTkC9_S1TJFWmmbM&s=10" },
      { slug: "chicken-salad", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFXKNpdpVo6rGwMc5TwGi44fTf-fJAkaYxTf8uphSTQQ&s=10" },
      { slug: "samosa", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYqaDr1EyBDbq6VhISSsgzBCiFjrD4-x-UMZOA84IlkVTpxyGIEO6KNyU&s=10" },
      { slug: "paddu", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFI3XXakZjnPJH8xa-zmUQehT_29bovkBYKXF6f4u6Tgkbnc-v7rhzzGH2&s=10" },
      { slug: "waffles", image: "https://cravinghomecooked.com/wp-content/uploads/2019/02/easy-waffle-recipe-1-16.jpg" },
      { slug: "noodles", image: "https://images.getrecipekit.com/20241008094433-blog-20templates-20-3.webp?aspect_ratio=16:9&quality=90&" },
      { slug: "soup", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlwKeH2ZJmlwbQ6UyTqcudtwYySH9JqJATOOx8iyl4tihBmxQ3EVry9yhc&s=10" },
      { slug: "egg-roast", image: "https://cookingfromheart.com/wp-content/uploads/2016/09/Egg-Masala-Fry-2.jpg" },
      { slug: "rolls", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv1hU_VyaeVN8j8s2Pb0lW2RiU6JgBglBmcVcH-mEcJXmYZi7qGizhDTg&s=10" },
      { slug: "kara-bhaath", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3frBRxv_FC9f5f9Lg_X4gfzYckdOQVFYy3AkVU0amIF9L9_lkgeROpsY&s=10" },
      { slug: "dessert", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4bGFcadEXSKsgSxS7sNMPTJ5zs-tHpS6WOR2UPy6GL8HRyKoW59jPK61_&s=10" },
      { slug: "pancake", image: "https://cdn.loveandlemons.com/wp-content/uploads/2025/09/protein-pancakes.jpg" },
      { slug: "non-veg-meal", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgTWZrbairQ-WEuF_gs9te7L6ZE54EjJDd5GCaI1G1o6Pza7GVIbpWUisJ&s=10" },
      { slug: "vada-pav", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc8xwK1REAIzAUsntztuPtJxRvhZhuE1DPkExTY28DPo-Smg2jUgNPYDJK&s=10" },
      { slug: "juice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKrOJE3sDN28OmYdlXYDvcodKnRKfA77IP8b-yCmwRWdJL8eyiwTgpWSwD&s=10" },
      { slug: "shawaya", image: "https://calicutcafeteria.vercel.app/img/img1.png" },
      { slug: "mutton-curry", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_1fnqxNbv5tM936tHbmdNQczV3tu2yulHYlQNvFOKJA&s=10" },
      { slug: "fried-rice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHPFObgfjcm4X7KQJIpJkCGm1402QCfJ9_m2TYzp7_WEK2nbRnoFhR2Dbc&s=10" },
      { slug: "cold-coffee", image: "https://i0.wp.com/www.teacoffeecup.com/wp-content/uploads/2019/09/regular-cold-coffee.jpg?fit=367%2C550&ssl=1" },
      { slug: "veg-meal", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDps70vkJzaEoXw-b3NdoNZB8N4cxprqdWcMewEpuZHg&s=10" },
      { slug: "pazham-pori", image: "https://t4.ftcdn.net/jpg/09/97/82/31/360_F_997823124_MH2XFXDaAN3UNEdg67wyFPWxNuFEl0Ct.jpg" },
      { slug: "rasmalai", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwxG2_CFkOwgwiZPVM-Itx25SnB2YnRe3bA8eZTI--DA&s=10" },
      { slug: "boiled-egg", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhNUbfvNUsk785LW8m-KlzL1xjbnHJXfM7DWf7OzGAVp2FMOyC308iH6-C&s=10" },
      { slug: "chaat", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5eOvOIFMlVfPC3o_Ud2rzDpvr5QkCRJxARR2fcR8Gcfg7p_IJJbonGz_L&s=10" },
      { slug: "salad", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4bpvISGJtoxhZnGiyTsZg5tPERal2FKm8dJtjFDN15EXGU2Kf0g7pQoc&s=10" },
      { slug: "mushroom-biryani", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0KDT1qTTqPUNceTCez9_sh17RAd4IMl-bDHh1T_NdC_Lr9DmhSo4u5RvZ&s=10" },
      { slug: "kebab", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8407vLycQEb4NKUO5VhkiBYGLkeacY71UF2FBYePDtQVwo8BHnYc2AUk&s=10" },
      { slug: "idiyappam", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpzE6nqKmMEHJuagi7J4ZR36IGzb4CnrQrTLiKYFdN4Qil3Numh3-fqEeO&s=10" },
      { slug: "ice-cream", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqDSEBXWP47SCrHrC4-QZgJ-8IeQnP9_3VpFmIeFtAWjUCDldhVjaNJWul&s=10" },
      { slug: "pav-bhaji", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzROQ8xvzC7lIj6hZaR2d6hKOHzQeeU4R97ioghyWvE1XvfrXSuVjESkIP&s=10" },
      { slug: "neer-dosa", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAEE5v7qiEs3PbiG-fh8z_a8MnXPkVhg1JZRJQSOuN9g&s=10" },
      { slug: "dal-khichdi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX94rYGfT_rUQkC0m8f-Ris6RPYluXJDaDfRURlFTF9A&s=10" },
      { slug: "bread-omelette", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaboXk4WI4zWD24hMw0YUq0Ua0TMlrk25e6jQvLKrcjFRaymSCmO13sQ4&s=10" },
      { slug: "bowl", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUUI1FJYznlKeP1oLBSf2I6O3-oOgL8ViEDrvTddm9eA&s=10" },
      { slug: "paneer", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4vSF5e23QasDyggUerShikvvA_Qg-ptmgIJfVnq75IA&s=10" },
      { slug: "amul-chocolate-brownie-ice-cream-tub", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDthO93XC1qSKLP588pT4gmn94ucQRKvHts24xMZoKHQ&s=10" },
      { slug: "amul-choco-chip-chocolate-ice-cream-tub", image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/ciw/2026/2/11/0227a58b-1168-4b72-b731-12b2eb3c0209_YSCH7L1DZA_MN_11022026.png" },
      { slug: "amul-fruit-n-nut-fantasy-ice-cream-tub", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4fgsAFMD1qsaRXtUSYJkXgrFAne1SNsIUXjrZXQWQF5KOVCtrPYeQnlPQ&s=10" },
      { slug: "cream-pot-vanilla-tub", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKhZdrHsXAszZyEakUFrCwjqRyMrN2EWD6BQry3fh1dw&s=10" },
      { slug: "baskin-robbins-mississippi-mud-ice-cream-tub", image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2025/5/30/c09a724a-7597-4673-b65b-433d4fd802a1_1409.png" },
      { slug: "magnum-chocolate-almond-ice-cream-stick", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/fdb7628c-dfad-4c8e-af86-6740de5daea4.png?bg_token=color.background.quaternary" },
      { slug: "baskin-robbins-almond-n-caramel-ice-cream-stick", image: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/8884a61c-66d6-4a80-9e46-29739f060963.png" },
      { slug: "cornetto-double-chocolate-cone", image: "https://www.metro-online.pk/_next/image?url=https%3A%2F%2Fprodimages.metro-online.pk%2FProducts%2F1726812170895.jpg&w=3840&q=75" },
      { slug: "havmor-dark-chocolate-ice-cream-cone", image: "https://cdn.zeptonow.com/production/ik-seo/cms/product_variant/f9339726-0832-4a7a-b4e0-0a44ef941dae/Havmor-Dark-Chocolate-Ice-Cream-Cone.jpeg" },
      { slug: "hoccol-hazelnut-mudslide-ice-cream-cone", image: "https://cdn.zeptonow.com/production/ik-seo/cms/product_variant/2963d5ef-3e8c-400c-9d13-4b05c26fc856/Hocco-Hazelnut-Mudslide-Ice-Cream-Cone.jpeg" },
      { slug: "ob-gob-tiramisu-fudge-ice-cream-sundae", image: "https://cdn.zeptonow.com/production/ik-seo/cms/product_variant/d355e273-27f9-48bb-b92a-bb57a532dd97/OB-GOB-Tiramisu-Fudge-Ice-Cream-Sundae.jpeg" },
      { slug: "ob-gob-vanilla-choco-brownie-ice-cream-sundae", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgTurTj9Z2i6xBktzo47kW8PLm4Jp_ZGxuEN3xKQyDjw&s=10" },
      { slug: "amul-kulhad-kulfie-ice-cream", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe6Z5mq_IAVu5tP-Et4MbKhe8pEFHFzh9_bhc8LomAbg&s=10" },
      { slug: "havmor-matka-kulfi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVZtazs19CPH6gDLoxoXlVRWzFUlPM7Mx3u869immn1jO4_fuXFxuvAeQ&s=10" },
      { slug: "kaju-katli", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIbgCA282DUJLBMBfIxxBKHlbE7iL163w5jwyA9xHWX5aoblpy2pmK5J0j&s=10" },
      { slug: "mysore-pak", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUbZrxjJe4l8V4tCsP89_-ynlqXpnwxJdJe2gCnejdzQ&s=10" },
      { slug: "motichoor-laddu", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6M2RtqlsBN2oc1sny8iB5SqW2JK9POm7B2ucvCsSoUXQEfKr0nf_H4pRK&s=10" },
      { slug: "gulab-jamun", image: "https://theartisticcook.com/wp-content/uploads/2024/10/Gulab-Jamun-with-Milk-Powder.jpg" },
      { slug: "besan-laddu", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0kZfhPnty5jKeTqYj7DzHkgDL2UmGlKfeenbHcE353PnZnpMD8GZOK8bw&s=10" },
      { slug: "soan-papdi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_N3JGnEO0VJiHXtFVU0bktw1Y6YrPeudvhDhjVbaTzQ&s=10" },
      { slug: "rasgulla", image: "https://i1.zopping.com/zopsmart-media/30255/images/originals/20260422/76a77c2b-af86-4680-9c74-8f66cbf19873-ChatGPTImageApr222026010445PM.webp" },
      { slug: "doodh-peda", image: "https://www.cookclickndevour.com/wp-content/uploads/2018/05/peda-recipe.jpg" },
      { slug: "malai-peda", image: "https://www.sugarfree-india.com/wp-content/uploads/2025/12/sugar-free-malai-peda-1.webp" },
      { slug: "dharwad-peda", image: "https://i0.wp.com/dharwadpedha.com/wp-content/uploads/2026/03/ChatGPT-Image-Mar-12-2026-09_35_45-AM-1.png?fit=1024%2C683&ssl=1" },
      { slug: "dairy-milk", image: "https://images.apollo247.in/pub/media/catalog/product/C/A/CAD0378_1.jpg" },
      { slug: "munch-max", image: "https://www.bbassets.com/media/uploads/p/l/40341100_10-nestle-munch-nuts-max-chocolate-coated-wafer-bar.jpg" },
      { slug: "dairy-milk-shots", image: "https://quickcartapp.in/media/image?path=uploads%2Fmedia%2F2026%2F40024667_16-cadbury-dairy-milk-shots.png&width=800&quality=80" },
      { slug: "nestle-kit-kat", image: "https://www.quickpantry.in/cdn/shop/files/KitKat_Finger_Wafer_Chocolate_Bar_38.5_g_Quick_Pantry.webp?v=1739697146" },
      { slug: "amul-cocoa-dark-chocolate", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh-3sb1Q60P813dcnZniFtcccSUTDbgmGKfDwzLDoLBcPMhHbU9pkmfzY&s=10" },
      { slug: "kinder-joy-blue", image: "https://m.media-amazon.com/images/I/71YvlBAfxbL.jpg" },
      { slug: "kinder-joy-pink", image: "https://www.bbassets.com/media/uploads/p/l/30005022_14-kinder-joy-for-girls-with-surprise.jpg" },
      { slug: "snickers", image: "https://www.snickers.com/sites/g/files/fnmzdf616/files/migrate-product-files/dryeqrv2efldaaoyceat.png" },
      { slug: "bournville-dark-chocolate", image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/ciw/2026/2/18/f472c5a7-11ad-4548-b09c-7b103a458d72_5HU1UY71SL_MN_18022026.png" },
      { slug: "cadbury-5-star", image: "https://rukmini1.flixcart.com/image/1500/1500/xif0q/chocolate/4/e/c/-original-imahpaztxqc6n7j7.jpeg?q=70" },
      { slug: "dairy-milk-silk", image: "https://cococart.in/cdn/shop/files/1CH2570.png?v=1773822268&width=1946" },
      { slug: "ferrero-rocher-premium-chocolate", image: "https://deq64r0ss2hgl.cloudfront.net/images/product/ferrero-rocher-premium-24pcs-300g-61945920939606.jpg" },
      { slug: "malkist-cheese-crunchy-layered-crackers", image: "https://www.bbassets.com/media/uploads/p/l/40191072_8-malkist-cheese-crunchy-layered-crackers.jpg" },
      { slug: "britannia-little-hearts", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqyEKp_pGLddIkVmBTgTCwO54hU471egE_SogkKLCM39GvOkRBs3H23nI&s=10" },
      { slug: "hide-seek-choco-chip-cookies", image: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/ciw/2025/12/18/5605574c-4661-45cd-8de2-6d963c1259cd_G1PPRO3TK0_MN_17122025.png" },
      { slug: "50-50-maska-chaska", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSATzUbrdBHkNZ1bK_8eo0jnYLshq_X77Z3tmksNOl_hZj6ao2YpogiYz8&s=10" },
      { slug: "5050-maska-chaska", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSATzUbrdBHkNZ1bK_8eo0jnYLshq_X77Z3tmksNOl_hZj6ao2YpogiYz8&s=10" },
      { slug: "parle-g", image: "https://www.quickpantry.in/cdn/shop/products/parle-gluco-biscuits-parle-g-quick-pantry-4.jpg?v=1710538233" },
      { slug: "oreo", image: "https://www.quickpantry.in/cdn/shop/products/cadbury-oreo-creame-biscuit-vanilla-46-3-g-quick-pantry.jpg?v=1710538227" },
      { slug: "krackjack", image: "https://budgetbazaar.online/wp-content/uploads/2024/07/PARLE-KRACKJACK-75GM.jpg" },
      { slug: "good-day", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShwrefpgRMYv4glEdE_H_7vaYt7_N3t3en_LbqNaYfgQ&s=10" },
      { slug: "dark-fantasy", image: "https://m.media-amazon.com/images/I/71U6Dn3aeQL.jpg" },
      { slug: "jim-jam", image: "https://www.bbassets.com/media/uploads/p/l/218646_9-britannia-treat-jim-jam-cream-biscuits.jpg" },
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
