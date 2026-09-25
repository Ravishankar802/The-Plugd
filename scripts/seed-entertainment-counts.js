const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ENTERTAINMENT_STARTING_COUNTS = {
  'concert-ticket': 32,
  'movie-ticket': 58,
  'music-festival-pass': 41,
  'comedy-show-ticket': 23,
  'ipl-match-ticket': 4,
  'cricket-series-pass': 9,
  'anime-box-set': 35,
  'vinyl-player': 26,
  'board-game-night': 11,
  'theater-experience': 7,
};

async function seedEntertainmentCounts() {
  try {
    const entCat = await prisma.category.findUnique({ where: { slug: 'entertainment' } });
    if (!entCat) {
      console.log('[SEED_ENTERTAINMENT_COUNTS] Entertainment category not found, skipping.');
      return;
    }

    let updated = 0;
    for (const [slug, targetCount] of Object.entries(ENTERTAINMENT_STARTING_COUNTS)) {
      const item = await prisma.catalogItem.findUnique({ where: { slug } });
      if (item) {
        if (item.addedCount == null || item.addedCount < targetCount || item.categoryId !== entCat.id) {
          await prisma.catalogItem.update({
            where: { id: item.id },
            data: {
              categoryId: entCat.id,
              addedCount: Math.max(item.addedCount || 0, targetCount),
            }
          });
          updated++;
        }
      }
    }

    console.log(`[SEED_ENTERTAINMENT_COUNTS] Seeded/updated ${updated} Entertainment items.`);
  } catch (error) {
    console.error('[SEED_ENTERTAINMENT_COUNTS] Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedEntertainmentCounts();
}

module.exports = { seedEntertainmentCounts, ENTERTAINMENT_STARTING_COUNTS };
