const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const FITNESS_STARTING_COUNTS = {
  "gym-membership": 242,
  "running-shoes": 143,
  "fitness-watch": 320,
  "dumbbell-set": 457,
  "bicycle": 102,
  "protien-supplement": 1400,
  "protein-supplement": 1400,
  "yoga-mat": 254,
  "kettleball-set": 345,
  "kettlebell-set": 345,
  "resistance-bands": 74,
  "weight-plates": 312,
  "barbell-set": 229,
  "treadmill": 152,
  "exercise-bike": 263,
  "rowing-machine": 180,
  "elliptical-machine": 118,
  "bench-press": 320,
  "squat-rack": 204,
  "pull-up-bar": 497,
  "dip-station": 110,
  "gym-gloves": 32,
  "weightlighting-belt": 384,
  "weightlifting-belt": 384,
  "wrist-wraps": 82,
  "ankle-weights": 173,
  "foam-roller": 79,
  "massage-gun": 98,
  "skipping-rope": 63,
  "ab-roller": 151,
  "push-up-board": 8,
  "yoga-blocks": 29,
};

async function seedFitnessCounts() {
  try {
    const fitCat = await prisma.category.findUnique({ where: { slug: 'fitness' } });
    if (!fitCat) {
      console.log('[SEED_FITNESS_COUNTS] Fitness category not found, skipping.');
      return;
    }

    let updated = 0;
    for (const [slug, targetCount] of Object.entries(FITNESS_STARTING_COUNTS)) {
      const item = await prisma.catalogItem.findFirst({
        where: {
          categoryId: fitCat.id,
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

    console.log(`[SEED_FITNESS_COUNTS] Seeded/updated ${updated} Fitness items.`);
  } catch (error) {
    console.error('[SEED_FITNESS_COUNTS] Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedFitnessCounts();
}

module.exports = { seedFitnessCounts, FITNESS_STARTING_COUNTS };
