const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const EXPECTED_SEEDS = [
  { name: 'Biryani', count: 1200 },
  { name: 'Idli', count: 180 },
  { name: 'Dosa', count: 456 },
  { name: 'Tandoori Chicken', count: 342 },
  { name: 'Egg', count: 428 },
  { name: 'South Indian Meals', count: 135 },
  { name: 'Chicken Fried Rice', count: 234 },
  { name: 'Mandi', count: 140 },
  { name: 'Masala Dosa', count: 367 },
  { name: 'Chicken Curry', count: 180 },
  { name: 'Chicken', count: 249 },
  { name: 'Grilled Chicken', count: 190 },
  { name: 'Vada', count: 56 },
  { name: 'Cake', count: 294 },
  { name: 'Chilli Chicken', count: 89 },
  { name: 'Chicken Biryani', count: 1800 },
  { name: 'Fish', count: 189 },
  { name: 'Mutton', count: 343 },
  { name: 'Coffee', count: 2300 },
  { name: 'Tea', count: 345 },
  { name: 'Pizza', count: 1100 },
  { name: 'Poha', count: 93 },
  { name: 'Chicken Lollipop', count: 254 },
  { name: 'Aloo Paratha', count: 124 },
  { name: 'Burger', count: 1200 },
  { name: 'Tiffin', count: 78 },
  { name: 'Pongal', count: 63 },
  { name: 'Egg Curry', count: 92 },
  { name: 'Set Dosa', count: 58 },
  { name: 'Shawarma', count: 1100 },
  { name: 'Chole Bhature', count: 345 },
  { name: 'Chicken Rolls', count: 452 },
  { name: 'Sandwich', count: 346 },
  { name: 'Pasta', count: 965 },
  { name: 'Pulao', count: 45 },
  { name: 'Fruit Bowl', count: 112 },
  { name: 'Sambar', count: 22 },
  { name: 'Maggi', count: 548 },
  { name: 'Poori Sabzi', count: 139 },
  { name: 'North Indian Meals', count: 346 },
  { name: 'Paratha', count: 198 },
  { name: 'Chicken Soup', count: 149 },
  { name: 'Thali', count: 340 },
  { name: 'Chicken Shawarma', count: 784 },
  { name: 'Curd Rice', count: 95 },
  { name: 'Omelette', count: 185 },
  { name: 'Khichdi', count: 78 },
  { name: 'Momos', count: 1300 },
  { name: 'Appam', count: 143 },
  { name: 'Puttu', count: 30 },
  { name: 'Wings', count: 281 },
  { name: 'Upma', count: 22 },
  { name: 'Puliyogare', count: 18 },
  { name: 'Parotta', count: 132 },
  { name: 'Chicken Salad', count: 253 },
  { name: 'Samosa', count: 583 },
  { name: 'Paddu', count: 201 },
  { name: 'Waffles', count: 213 },
  { name: 'Noodles', count: 194 },
  { name: 'Soup', count: 149 },
  { name: 'Egg Roast', count: 83 },
  { name: 'Rolls', count: 253 },
  { name: 'Kara Bhaath', count: 12 },
  { name: 'Dessert', count: 438 },
  { name: 'Pancake', count: 302 },
  { name: 'Non Veg Meal', count: 467 },
  { name: 'Vada Pav', count: 643 },
  { name: 'Juice', count: 132 },
  { name: 'Shawaya', count: 165 },
  { name: 'Mutton Curry', count: 236 },
  { name: 'Fried Rice', count: 198 },
  { name: 'Cold Coffee', count: 485 },
  { name: 'Veg Meal', count: 124 },
  { name: 'Pazham Pori', count: 183 },
  { name: 'Boiled Egg', count: 302 },
  { name: 'Chaat', count: 345 },
  { name: 'Salad', count: 421 },
  { name: 'Mushroom Biryani', count: 221 },
  { name: 'Kebab', count: 548 },
  { name: 'Idiyappam', count: 132 },
  { name: 'Ice Cream', count: 1300 },
  { name: 'Pav Bhaji', count: 932 },
  { name: 'Neer Dosa', count: 129 },
  { name: 'Dal Khichdi', count: 184 },
  { name: 'Bread Omelette', count: 134 },
  { name: 'Bowl', count: 346 },
  { name: 'Paneer', count: 478 },
  // 14 Ice Creams items
  { name: 'Amul Chocolate Brownie Ice Cream Tub', count: 321 },
  { name: 'Amul Choco Chip Chocolate Ice Cream Tub', count: 289 },
  { name: 'Amul Fruit N Nut Fantasy Ice Cream Tub', count: 198 },
  { name: 'Cream Pot Vanilla Tub', count: 125 },
  { name: 'Baskin Robbins Mississippi Mud Ice Cream Tub', count: 431 },
  { name: 'Magnum Chocolate Almond Ice Cream Stick', count: 243 },
  { name: "Baskin Robbins Almond 'N' Caramel Ice Cream Stick", count: 129 },
  { name: 'Cornetto Double Chocolate Cone', count: 143 },
  { name: 'Havmor Dark Chocolate Ice Cream Cone', count: 365 },
  { name: 'Hocol Hazelnut Mudslide Ice Cream Cone', count: 432 },
  { name: 'Hoccol Hazelnut Mudslide Ice Cream Cone', count: 432 },
  { name: 'OB & GOB Tiramisu & Fudge Ice Cream Sundae', count: 365 },
  { name: 'OB & GOB Vanilla & Choco Brownie Ice Cream Sundae', count: 332 },
  { name: 'Amul Kulhad Kulfi Ice Cream', count: 354 },
  { name: 'Amul Kulhad Kulfie Ice Cream', count: 354 },
  { name: 'Havmor Matka Kulfi', count: 329 }
];

const ALIASES = {
  'kebab': 'kebabs',
  'momos': 'momo',
  'dessert': 'desserts',
  'egg curry': 'egg-curries',
  'mutton curry': 'mutton-curries',
  'hocol hazelnut mudslide ice cream cone': 'hoccol-hazelnut-mudslide-ice-cream-cone',
  'amul kulhad kulfi ice cream': 'amul-kulhad-kulfie-ice-cream',
};

async function seedFoodCounts() {
  try {
    const foodCat = await prisma.category.findUnique({ where: { slug: 'food' } });
    if (!foodCat) {
      console.log('[SEED_FOOD_COUNTS] Food category not found, skipping.');
      return;
    }

    const items = await prisma.catalogItem.findMany({
      where: { categoryId: foodCat.id },
    });

    console.log(`[SEED_FOOD_COUNTS] Checking ${items.length} Food items...`);
    let updated = 0;

    for (const seed of EXPECTED_SEEDS) {
      const directSlug = seed.name.toLowerCase().replace(/\s+/g, '-');
      const aliasSlug = ALIASES[seed.name.toLowerCase()];

      const item = items.find(i =>
        i.name.toLowerCase() === seed.name.toLowerCase() ||
        i.slug.toLowerCase() === directSlug ||
        (aliasSlug && (i.slug.toLowerCase() === aliasSlug || i.name.toLowerCase() === aliasSlug.replace('-', ' ')))
      );

      if (item) {
        // Only seed if item has no count or count is less than seed (idempotent, never resets higher counts)
        if (item.addedCount == null || item.addedCount < seed.count) {
          await prisma.catalogItem.update({
            where: { id: item.id },
            data: { addedCount: seed.count },
          });
          updated++;
        }
      }
    }

    console.log(`[SEED_FOOD_COUNTS] Seeded/updated ${updated} Food counts.`);
  } catch (error) {
    console.error('[SEED_FOOD_COUNTS] Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedFoodCounts();
