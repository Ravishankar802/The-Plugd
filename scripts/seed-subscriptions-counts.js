const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SUBSCRIPTIONS_STARTING_COUNTS = {
  "chatgpt-plus": 243,
  "chatgpt-pro": 532,
  "claude-pro": 321,
  "claude-max": 1100,
  "x-premium": 114,
  "netflix-standard": 134,
  "prime-video-subscription": 182,
  "hotstar-subscription": 34,
  "apple-tv-subscription": 72,
  "google-ai-plus": 112,
  "google-ai-pro": 182,
  "google-ai-ultra": 437,
  "spotify-premium": 98,
  "youtube-premium": 84,
  "amazon-prime": 90,
  "canva-pro": 119,
  "adobe-creative-cloud": 43,
  "github-pro": 63,
  "notion-plus": 78,
  "figma-pro": 53,
  "midjourney-subscription": 103,
  "x-premium-2": 356,
  "x-premium-plus": 356,
};

async function seedSubscriptionsCounts() {
  try {
    const subCat = await prisma.category.findUnique({ where: { slug: 'subscriptions' } });
    if (!subCat) {
      console.log('[SEED_SUBSCRIPTIONS_COUNTS] Subscriptions category not found, skipping.');
      return;
    }

    let updated = 0;
    for (const [slug, targetCount] of Object.entries(SUBSCRIPTIONS_STARTING_COUNTS)) {
      const item = await prisma.catalogItem.findFirst({
        where: {
          categoryId: subCat.id,
          slug,
        },
      });

      if (item) {
        if (item.addedCount == null || item.addedCount < targetCount) {
          await prisma.catalogItem.update({
            where: { id: item.id },
            data: {
              addedCount: Math.max(item.addedCount || 0, targetCount),
            },
          });
          updated++;
        }
      }
    }

    console.log(`[SEED_SUBSCRIPTIONS_COUNTS] Seeded/updated ${updated} Subscriptions items.`);
  } catch (error) {
    console.error('[SEED_SUBSCRIPTIONS_COUNTS] Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedSubscriptionsCounts();
}

module.exports = { seedSubscriptionsCounts, SUBSCRIPTIONS_STARTING_COUNTS };
