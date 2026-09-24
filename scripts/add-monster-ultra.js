const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const drinksCat = await prisma.category.findUnique({
    where: { slug: 'drinks' }
  });

  if (!drinksCat) {
    throw new Error('Drinks category not found');
  }

  const monsterItem = await prisma.catalogItem.findUnique({
    where: { slug: 'monster-energy-drink' }
  });

  const displayOrder = monsterItem ? monsterItem.displayOrder + 1 : 140;

  const item = await prisma.catalogItem.upsert({
    where: { slug: 'monster-ultra-energy-drink' },
    update: {
      name: 'Monster Ultra Energy Drink',
      image: 'https://cdn.zeptonow.com/production/ik-seo/cms/product_variant/6f850844-121e-4680-9b1d-a55ed7cab666/Monster-Energy-Ultra-Zero-Sugar-Carbonated-High-Caffeinated-Drink.jpeg',
      active: true,
      featured: true,
      categoryId: drinksCat.id,
    },
    create: {
      categoryId: drinksCat.id,
      name: 'Monster Ultra Energy Drink',
      slug: 'monster-ultra-energy-drink',
      image: 'https://cdn.zeptonow.com/production/ik-seo/cms/product_variant/6f850844-121e-4680-9b1d-a55ed7cab666/Monster-Energy-Ultra-Zero-Sugar-Carbonated-High-Caffeinated-Drink.jpeg',
      active: true,
      featured: true,
      displayOrder,
      addedCount: 0,
    }
  });

  console.log('Upserted Monster Ultra Energy Drink successfully:', item);
}

main().catch(console.error).finally(() => prisma.$disconnect());
