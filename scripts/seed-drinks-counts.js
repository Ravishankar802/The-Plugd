const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DRINKS_SEEDS = [
  // TOP PICKS — 18 ITEMS
  { name: 'Diet Coke', slug: 'diet-coke', count: 2500 },
  { name: 'Red Bull Energy Drink', slug: 'red-bull-energy-drink', count: 1200 },
  { name: 'Monster Energy Drink', slug: 'monster-energy-drink', count: 1800 },
  { name: 'Gatorade Energy Drink', slug: 'gatorade-energy-drink', count: 302 },
  { name: 'Amul Masti Spiced Buttermilk', slug: 'amul-masti-spiced-buttermilk', count: 285 },
  { name: 'Bisleri Water Bottle', slug: 'bisleri-water-bottle', count: 143 },
  { name: 'Minute Maid Pulpy Orange', slug: 'minute-maid-pulpy-orange', count: 259 },
  { name: 'Hell Energy Drink', slug: 'hell-energy-drink', count: 439 },
  { name: 'Coca Cola Zero Sugar PET', slug: 'coca-cola-zero-sugar-pet', count: 683 },
  { name: 'Smooth Chocolate Milk Drink', slug: 'smooth-chocolate-milk-drink', count: 208 },
  { name: 'Coca Cola Zero Sugar Can', slug: 'coca-cola-zero-sugar-can', count: 516 },
  { name: 'Soft Soya Milk Drink', slug: 'soft-soya-milk-drink', count: 139 },
  { name: 'Coolberg Cranberry Non Alcoholic Beer', slug: 'coolberg-cranberry-non-alcoholic-beer', count: 158 },
  { name: 'Amul Protein Shake Blueberry', slug: 'amul-protein-shake-blueberry', count: 153 },
  { name: 'Sprite Zero', slug: 'sprite-zero', count: 249 },
  { name: 'Thums Up', slug: 'thums-up', count: 348 },
  { name: 'Pepsi', slug: 'pepsi', count: 425 },
  { name: 'Pepsi Zero Sugar Soft Drink', slug: 'pepsi-zero-sugar-soft-drink', count: 532 },

  // COFFEE — 15 ITEMS
  { name: 'Nescafé Classic Instant Coffee', slug: 'nescafe-classic-instant-coffee', count: 129 },
  { name: 'Nescafé Sunrise Instant Coffee', slug: 'nescafe-sunrise-instant-coffee', count: 98 },
  { name: 'Bru Instant Coffee', slug: 'bru-instant-coffee', count: 124 },
  { name: 'Bru Gold Instant Coffee', slug: 'bru-gold-instant-coffee', count: 87 },
  { name: 'Continental Xtra Coffee', slug: 'continental-xtra-coffee', count: 75 },
  { name: 'Tata Coffee Grand', slug: 'tata-coffee-grand', count: 77 },
  { name: 'Starbucks Premium Instant Coffee', slug: 'starbucks-premium-instant-coffee', count: 134 },
  { name: 'Starbucks Frappuccino Coffee', slug: 'starbucks-frappuccino-coffee', count: 127 },
  { name: 'Rage Coffee', slug: 'rage-coffee', count: 56 },
  { name: 'Sleepy Owl Cold Coffee', slug: 'sleepy-owl-cold-coffee', count: 42 },
  { name: 'Bevzilla Instant Coffee', slug: 'bevzilla-instant-coffee', count: 39 },
  { name: 'Country Bean Vanilla Coffee', slug: 'country-bean-vanilla-coffee', count: 12 },
  { name: 'Blue Tokai Coffee', slug: 'blue-tokai-coffee', count: 9 },
  { name: 'Third Wave Coffee', slug: 'third-wave-coffee', count: 32 },
  { name: 'Nescafé Gold', slug: 'nescafe-gold', count: 86 },

  // COLD DRINKS & JUICES — 25 ITEMS
  { name: 'Frooti', slug: 'frooti', count: 203 },
  { name: 'Maaza', slug: 'maaza', count: 285 },
  { name: 'Appy Fizz', slug: 'appy-fizz', count: 107 },
  { name: 'Slice', slug: 'slice', count: 132 },
  { name: 'Paper Boat Aamras', slug: 'paper-boat-aamras', count: 94 },
  { name: 'Paper Boat Coconut Water', slug: 'paper-boat-coconut-water', count: 75 },
  { name: 'Real Fruit Power Orange', slug: 'real-fruit-power-orange', count: 59 },
  { name: 'Real Fruit Power Mixed Fruit', slug: 'real-fruit-power-mixed-fruit', count: 42 },
  { name: 'Tropicana Orange Juice', slug: 'tropicana-orange-juice', count: 43 },
  { name: 'Tropicana Apple Juice', slug: 'tropicana-apple-juice', count: 32 },
  { name: 'B Natural Mixed Fruit', slug: 'b-natural-mixed-fruit', count: 84 },
  { name: 'B Natural Orange Juice', slug: 'b-natural-orange-juice', count: 29 },
  { name: 'Paper Boat Aam Panna', slug: 'paper-boat-aam-panna', count: 40 },
  { name: 'Paper Boat Jaljeera', slug: 'paper-boat-jaljeera', count: 29 },
  { name: 'Coconut Water', slug: 'coconut-water', count: 38 },
  { name: 'Limca', slug: 'limca', count: 47 },
  { name: '7UP', slug: '7up', count: 73 },
  { name: 'Mirinda', slug: 'mirinda', count: 26 },
  { name: 'Mountain Dew', slug: 'mountain-dew', count: 163 },
  { name: 'Sting Energy Drink', slug: 'sting-energy-drink', count: 72 },
  { name: 'Kinley Soda', slug: 'kinley-soda', count: 39 },
  { name: 'Schweppes Tonic Water', slug: 'schweppes-tonic-water', count: 28 },
  { name: 'Nestea Lemon Iced Tea', slug: 'nestea-lemon-iced-tea', count: 30 },
  { name: 'Paper Boat Neer More', slug: 'paper-boat-neer-more', count: 25 },
  { name: 'Raw Pressery Cold-Pressed Orange Juice', slug: 'raw-pressery-cold-pressed-orange-juice', count: 19 },
];

async function seedDrinksCounts() {
  try {
    const drinksCat = await prisma.category.findUnique({ where: { slug: 'drinks' } });
    if (!drinksCat) {
      console.log('[SEED_DRINKS_COUNTS] Drinks category not found, skipping.');
      return;
    }

    const items = await prisma.catalogItem.findMany({
      where: { categoryId: drinksCat.id },
    });

    console.log(`[SEED_DRINKS_COUNTS] Checking ${items.length} Drinks items...`);
    let updated = 0;

    for (const seed of DRINKS_SEEDS) {
      const matchedItems = items.filter(i =>
        i.slug.toLowerCase() === seed.slug.toLowerCase() ||
        i.name.toLowerCase() === seed.name.toLowerCase()
      );

      for (const item of matchedItems) {
        if (item.addedCount == null || item.addedCount < seed.count) {
          await prisma.catalogItem.update({
            where: { id: item.id },
            data: { addedCount: seed.count },
          });
          item.addedCount = seed.count;
          updated++;
        }
      }
    }

    console.log(`[SEED_DRINKS_COUNTS] Seeded/updated ${updated} Drinks counts.`);
  } catch (error) {
    console.error('[SEED_DRINKS_COUNTS] Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedDrinksCounts();
}

module.exports = { seedDrinksCounts, DRINKS_SEEDS };
