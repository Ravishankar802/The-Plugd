const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetAddedCounts() {
  try {
    console.log('[RESET] Starting addedCount reset across all catalog items...');

    // Find any genuine wishlist additions in DB
    const wishlistCounts = await prisma.wishlistItem.groupBy({
      by: ['catalogItemId'],
      where: {
        catalogItemId: { not: null },
      },
      _count: {
        id: true,
      },
    });

    const countMap = new Map();
    for (const entry of wishlistCounts) {
      if (entry.catalogItemId) {
        countMap.set(entry.catalogItemId, entry._count.id);
      }
    }

    // Reset all catalog items to 0
    const resetResult = await prisma.catalogItem.updateMany({
      data: { addedCount: 0 },
    });
    console.log(`[RESET] Reset ${resetResult.count} items to 0.`);

    // If there are genuine user additions, restore their exact real count
    for (const [catalogItemId, realCount] of countMap.entries()) {
      await prisma.catalogItem.update({
        where: { id: catalogItemId },
        data: { addedCount: realCount },
      }).catch(() => {});
    }

    console.log(`[RESET] Complete. Genuine wishlist count entries: ${countMap.size}`);
  } catch (error) {
    console.error('[RESET] Error during reset:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

resetAddedCounts();
