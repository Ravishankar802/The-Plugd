const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ALLOWED_SLUGS = [
  'mobile',
  'electronics',
  'subscriptions',
  'fashion',
  'beauty',
  'cars',
  'bikes',
  'concerts',
  'vacation',
  'watches',
  'jewellery',
];

const REMOVED_SLUGS = [
  'food',
  'drinks',
  'coffee',
  'entertainment',
  'toys',
  'fitness',
  'vehicles',
];

async function main() {
  console.log('[PURGE] Starting database cleanup of obsolete categories...');

  // 1. Delete all wishlist items linked to removed categories or removed catalog items
  const removedCats = await prisma.category.findMany({
    where: {
      OR: [
        { slug: { in: REMOVED_SLUGS } },
        { slug: { notIn: ALLOWED_SLUGS } },
      ],
    },
  });

  const removedCatIds = removedCats.map((c) => c.id);
  console.log(`[PURGE] Found ${removedCats.length} obsolete categories:`, removedCats.map((c) => c.slug));

  if (removedCatIds.length > 0) {
    const deletedWishlist = await prisma.wishlistItem.deleteMany({
      where: {
        OR: [
          { categoryId: { in: removedCatIds } },
          { catalogItem: { categoryId: { in: removedCatIds } } },
        ],
      },
    });
    console.log(`[PURGE] Deleted ${deletedWishlist.count} wishlist items linked to obsolete categories.`);

    const deletedCatalog = await prisma.catalogItem.deleteMany({
      where: { categoryId: { in: removedCatIds } },
    });
    console.log(`[PURGE] Deleted ${deletedCatalog.count} catalog items from obsolete categories.`);

    const deletedCats = await prisma.category.deleteMany({
      where: { id: { in: removedCatIds } },
    });
    console.log(`[PURGE] Deleted ${deletedCats.count} obsolete categories.`);
  }

  // Also delete by item slugs matching food, drinks, entertainment, toys, fitness if any remain
  const orphanedItems = await prisma.catalogItem.deleteMany({
    where: {
      OR: [
        { category: { slug: { in: REMOVED_SLUGS } } },
        { category: { slug: { notIn: ALLOWED_SLUGS } } },
      ],
    },
  });
  console.log(`[PURGE] Deleted ${orphanedItems.count} orphaned catalog items.`);

  // 2. Ensure Cars and Bikes are independent main categories
  await prisma.category.upsert({
    where: { slug: 'cars' },
    update: { name: 'Cars', active: true, displayOrder: 6 },
    create: {
      name: 'Cars',
      slug: 'cars',
      icon: 'Car',
      description: 'Luxury flagships, supercars, hypercars, performance SUVs, and off-road powerhouses.',
      active: true,
      displayOrder: 6,
    },
  });

  await prisma.category.upsert({
    where: { slug: 'bikes' },
    update: { name: 'Bikes', active: true, displayOrder: 7 },
    create: {
      name: 'Bikes',
      slug: 'bikes',
      icon: 'Bike',
      description: 'Superbikes, naked streetfighters, adventure tourers, and cruisers.',
      active: true,
      displayOrder: 7,
    },
  });

  // 3. Ensure 4 new empty categories exist with 0 items
  const newEmptyCats = [
    {
      name: 'Concerts',
      slug: 'concerts',
      icon: 'Ticket',
      description: 'Live concerts, music festivals, world tours, and premium live performances.',
      displayOrder: 8,
    },
    {
      name: 'Vacation',
      slug: 'vacation',
      icon: 'Plane',
      description: 'Luxury destinations, travel escapes, boutique retreats, and bucket-list vacations.',
      displayOrder: 9,
    },
    {
      name: 'Watches',
      slug: 'watches',
      icon: 'Watch',
      description: 'Luxury horology, iconic timepieces, precision chronographs, and haute horlogerie.',
      displayOrder: 10,
    },
    {
      name: 'Jewellery',
      slug: 'jewellery',
      icon: 'Sparkles',
      description: 'Fine jewellery, precious metals, diamond collections, and luxury statement pieces.',
      displayOrder: 11,
    },
  ];

  for (const cat of newEmptyCats) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        icon: cat.icon,
        description: cat.description,
        active: true,
        displayOrder: cat.displayOrder,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        description: cat.description,
        active: true,
        displayOrder: cat.displayOrder,
      },
    });
  }

  // Ensure new categories have exactly 0 items
  const emptyCatRecords = await prisma.category.findMany({
    where: { slug: { in: ['concerts', 'vacation', 'watches', 'jewellery'] } },
    select: { id: true },
  });
  if (emptyCatRecords.length > 0) {
    await prisma.catalogItem.deleteMany({
      where: { categoryId: { in: emptyCatRecords.map((c) => c.id) } },
    });
  }

  console.log('[PURGE] Completed successfully.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
