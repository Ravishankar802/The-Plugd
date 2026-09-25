const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function removeUrbanBackpack() {
  try {
    const deleted = await prisma.catalogItem.deleteMany({
      where: {
        OR: [
          { slug: { in: ['urban-roll-top-waterproof-laptop-backpack-25l', 'waterproof-urban-laptop-backpack', 'urban-commuter-backpack-28l', 'urban-commuter-backpack'] } },
          { name: { in: ['Urban Roll-Top Waterproof Laptop Backpack 25L', 'Urban Commuter Backpack 28L', 'Urban Commuter Backpack'] } },
          { name: { contains: 'Urban Commuter Backpack', mode: 'insensitive' } },
        ],
      },
    });
    if (deleted.count > 0) {
      console.log(`[CLEANUP] Removed ${deleted.count} backpack item(s) from database.`);
    }
  } catch (err) {
    console.error('[CLEANUP] Error removing backpack item:', err);
  } finally {
    await prisma.$disconnect();
  }
}

removeUrbanBackpack();
