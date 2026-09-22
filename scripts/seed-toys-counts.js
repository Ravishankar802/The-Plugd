const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const TOYS_STARTING_COUNTS = {
  "lego-collector-edition": 27,
  "lego-technic-car": 19,
  "lego-star-wars-set": 13,
  "lego-architecture-set": 28,
  "remote-control-car": 45,
  "rc-high-speed-drone": 49,
  "rc-helicopter": 32,
  "remote-control-boat": 39,
  "anime-action-figure": 51,
  "marvel-action-figure": 24,
  "dc-action-figure": 23,
  "gundam-model-kit": 12,
  "hot-wheels-car": 30,
  "diecast-supercar-model": 21,
  "barbie-doll": 4,
  "baby-doll": 2,
  "nerf-blaster": 15,
  "water-gun": 20,
  "beyblade": 42,
  "rubik-s-speed-cube": 47,
  "rubiks-speed-cube": 47,
  "rubik-s-3-3-cube": 25,
  "rubiks-3-3-cube": 25,
  "rubiks-3x3-cube": 25,
  "rubik-s-3x3-cube": 25,
  "chess-set": 48,
  "monopoly": 18,
  "jenga": 11,
  "uno": 62,
  "magnetic-building-blocks": 11,
  "building-blocks-set": 15,
  "play-doh-set": 12,
  "remote-control-robot": 30,
  "robot-building-kit": 19,
  "toy-train-set": 14,
  "toy-kitchen-set": 5,
  "doctor-play-set": 9,
  "dinosaur-figure-set": 8,
  "dinosaur-excavation-kit": 11,
  "magic-kit": 19,
  "science-experiment-kit": 10,
  "telescope": 23,
  "microscope-kit": 30,
  "kids-musical-keyboard": 7,
  "kids'-musical-keyboard": 7,
  "toy-guitar": 4,
  "toy-piano": 2,
  "toy-drum-set": 4,
  "plush-teddy-bear": 12,
  "pokemon-plush": 9,
  "pokémon-plush": 9,
  "pokemon-trading-card-box": 32,
  "pokémon-trading-card-box": 32,
  "pokemon-figure-set": 11,
  "pokémon-figure-set": 11,
  "minecraft-lego-set": 10,
  "minecraft-figure-set": 18,
  "superhero-costume-set": 20,
};

async function seedToysCounts() {
  try {
    const toysCat = await prisma.category.findUnique({ where: { slug: 'toys' } });
    if (!toysCat) {
      console.log('[SEED_TOYS_COUNTS] Toys category not found, skipping.');
      return;
    }

    let updated = 0;
    for (const [slug, targetCount] of Object.entries(TOYS_STARTING_COUNTS)) {
      const item = await prisma.catalogItem.findFirst({
        where: {
          categoryId: toysCat.id,
          slug,
        },
      });

      if (item) {
        if (item.addedCount !== targetCount) {
          await prisma.catalogItem.update({
            where: { id: item.id },
            data: {
              addedCount: targetCount,
            },
          });
          updated++;
        }
      }
    }

    console.log(`[SEED_TOYS_COUNTS] Seeded/updated ${updated} Toys items.`);
  } catch (error) {
    console.error('[SEED_TOYS_COUNTS] Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedToysCounts();
}

module.exports = { seedToysCounts, TOYS_STARTING_COUNTS };
