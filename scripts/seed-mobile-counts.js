const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MOBILE_STARTING_COUNTS = {
  'iphone-duo': 3000,
  'iphone-18-pro-max-black': 2800,
  'iphone-18-pro-max-burgundy': 3000,
  'iphone-18-pro': 2000,
  'iphone-17-pro-max': 2000,
  'samsung-galaxy-s26-ultra': 2000,
  'samsung-galaxy-z-fold8-ultra': 2500,
  'google-pixel-11-pro-xl': 1000,
  'ipad-pro': 430,
  'iphone-17-pro': 931,
  'iphone-17': 830,
  'iphone-air': 860,
  'ipad-air': 290,
  'ipad': 482,
  'samsung-galaxy-s26': 563,
  'samsung-galaxy-z-fold8': 678,
  'google-pixel-11-pro': 421,
  'google-pixel-11-pro-fold': 348,
  'google-pixel-11': 232,
  'nothing-phone-4a': 326,
  'nothing-phone-4a-pro': 590,
  'nothing-phone-4b': 229,
  'nothing-phone-3': 285,
  'nothing-phone-3a-pro': 467,
  'nothing-phone-3a': 246,
};

async function seedMobileCounts() {
  try {
    const mobileCat = await prisma.category.findUnique({ where: { slug: 'mobile' } });
    if (!mobileCat) {
      console.log('[SEED_MOBILE_COUNTS] Mobile category not found, skipping.');
      return;
    }

    // 1. Purge any misspelled or duplicate "burgandy" entries
    const purgedMisspelled = await prisma.catalogItem.deleteMany({
      where: {
        OR: [
          { slug: 'iphone-18-pro-max-burgandy' },
          { slug: { contains: 'burgand', mode: 'insensitive' } },
          { name: { contains: 'burgand', mode: 'insensitive' } },
        ]
      }
    });
    if (purgedMisspelled.count > 0) {
      console.log(`[SEED_MOBILE_COUNTS] Purged ${purgedMisspelled.count} misspelled burgandy item(s).`);
    }

    // Also remove any extra duplicate iPhone 18 Pro Max (Burgundy) entries beyond the single canonical product
    const burgundyItems = await prisma.catalogItem.findMany({
      where: {
        OR: [
          { slug: 'iphone-18-pro-max-burgundy' },
          { name: { equals: 'iPhone 18 Pro Max (Burgundy)', mode: 'insensitive' } }
        ]
      },
      orderBy: { createdAt: 'asc' }
    });

    if (burgundyItems.length > 1) {
      const toDelete = burgundyItems.slice(1);
      for (const d of toDelete) {
        console.log(`[SEED_MOBILE_COUNTS] Deleting duplicate Burgundy item: ${d.id} (${d.slug})`);
        await prisma.catalogItem.delete({ where: { id: d.id } });
      }
    }

    // 2. Ensure all 25 mobile items are assigned to mobile category and have starting counts
    let updated = 0;
    for (const [slug, targetCount] of Object.entries(MOBILE_STARTING_COUNTS)) {
      const item = await prisma.catalogItem.findUnique({ where: { slug } });
      if (item) {
        const needsCatUpdate = item.categoryId !== mobileCat.id;
        const needsCountUpdate = item.addedCount == null || item.addedCount < targetCount;
        if (needsCatUpdate || needsCountUpdate) {
          await prisma.catalogItem.update({
            where: { id: item.id },
            data: {
              categoryId: mobileCat.id,
              addedCount: Math.max(item.addedCount || 0, targetCount),
            }
          });
          updated++;
        }
      }
    }

    console.log(`[SEED_MOBILE_COUNTS] Seeded/updated ${updated} Mobile items.`);
  } catch (error) {
    console.error('[SEED_MOBILE_COUNTS] Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedMobileCounts();
}

module.exports = { seedMobileCounts, MOBILE_STARTING_COUNTS };
