const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const BEAUTY_STARTING_COUNTS = {
  // SKIN CARE
  'matineee-matte-liquid-lipstick': 30,
  'lipstick-set': 42,
  'face-serum': 22,
  'hydrocolloid-pimple-patches': 13,
  'acne-spot-treatment': 19,

  // HAIR CARE
  'moroccanoil-treatment-original': 33,
  'color-wow-dream-coat-supernatural-spray': 42,
  'intensive-repair-hair-mask': 48,
  'bond-repair-hair-treatment': 32,
  'scalp-scrub-detox-treatment': 53,
  'rosemary-hair-growth-oil': 29,
  'lightweight-hair-serum': 34,
  'leave-in-conditioner-spray': 30,
  'volumizing-dry-shampoo': 41,
  'curl-defining-hair-cream': 35,
  'anti-humidity-hair-spray': 49,
  'deep-conditioning-hair-oil': 32,
  'hair-gloss-treatment': 43,
  'overnight-hair-repair-serum': 31,
  'scalp-massager-brush': 38,
  'detangling-wet-hair-brush': 34,
  'ceramic-blowout-brush': 49,
  'ionic-hair-dryer': 35,
  'professional-hair-diffuser': 30,
  'automatic-hair-curler': 29,
  'mini-travel-hair-straightener': 21,
  'silicone-scalp-massager': 32,
  'electric-scalp-massager': 30,
  'shampoo-massage-brush': 25,
  'hair-growth-scalp-applicator': 37,
  'hair-steaming-cap': 21,
  'deep-conditioning-heat-cap': 19,
  'satin-hair-bonnet': 18,
  'satin-pillowcase': 20,
  'silk-hair-scrunchie-set': 27,
  'hair-claw-clip-set': 32,
  'minimalist-hair-clip-set': 34,
  'pearl-hair-clip-set': 29,
  'butterfly-hair-clip-set': 33,
  'heatless-curling-headband': 25,
  'cordless-hair-curler': 43,
  'ceramic-hair-straightener': 46,
  'mini-hair-straightener': 40,
  'hair-crimper': 35,
  'hot-air-brush': 48,
  'blowout-brush': 38,
  'hair-diffuser-attachment': 29,
  'hair-styling-wax-stick': 32,
  'hair-styling-pomade': 40,
  'texturizing-hair-spray': 25,
  'volumizing-hair-powder': 43,
  'dry-shampoo': 38,
  'leave-in-conditioner': 39,
  'hair-repair-mask': 30,
  'bond-repair-treatment': 34,
  'anti-frizz-hair-serum': 41,
  'hair-detangling-comb': 36,
  'wide-tooth-hair-comb': 38,

  // NAILS
  'gel-nail-polish-starter-kit': 22,
  'uv-led-nail-lamp': 32,
  'nail-strengthening-treatment': 21,
  'cuticle-oil-pen': 24,
  'glass-nail-file': 19,
  'nail-buffer-block-set': 20,
  'press-on-nude-nails': 31,
  'french-tip-press-on-nails': 34,
  'chrome-nail-powder-kit': 36,
  'nail-art-brush-set': 33,

  // BODY CARE
  'body-wash-coconut-vanilla': 23,
  'exfoliating-body-wash': 33,
  'hydrating-body-lotion': 28,
  'shea-butter-body-cream': 34,
  'body-scrub-brown-sugar': 29,
  'body-oil-vanilla': 28,
  'dry-body-oil-mist': 38,
  'firming-body-lotion': 31,
  'body-butter-coconut': 40,
  'hand-cream-set': 27,
  'intensive-hand-repair-cream': 30,
  'foot-cream-heel-repair-balm': 32,
  'exfoliating-foot-peel-mask': 23,
  'refreshing-foot-soak': 30,
  'body-polishing-scrub': 33,
  'shower-gel-gift-set': 34,
  'deodorant-body-spray': 29,
  'underarm-brightening-cream': 39,
  'body-mist-warm-vanilla': 30,

  // FRAGRANCE
  'cheirosa-59-delicia-drench-mist': 59,
  'signature-perfume': 52,
  'eau-de-parfum-floral': 64,
  'eau-de-parfum-vanilla': 73,
  'eau-de-parfum-oud': 53,
  'eau-de-parfum-rose': 86,
  'eau-de-parfum-fresh-citrus': 48,
  'eau-de-parfum-woody-amber': 52,
  'long-lasting-body-mist': 40,
  'hair-body-fragrance-mist': 45,
  'mini-perfume-discovery-set': 30,
  'travel-perfume-atomizer-set': 39,
  'roll-on-perfume-oil': 32,
  'solid-perfume-balm': 31,
  'unisex-eau-de-parfum': 43,
  'luxury-perfume-gift-set': 29,
  'fresh-aquatic-cologne': 33,
  'warm-spicy-cologne': 54,
  'floral-perfume-gift-set': 48,
  'vanilla-fragrance-mist': 42,
  'musk-perfume-oil': 51,
  'oud-perfume-oil': 49,
  'hair-perfume-mist': 43,

  // BEAUTY TOOLS
  'facial-ice-roller': 67,
  'stainless-steel-gua-sha': 40,
  'microcurrent-facial-device': 34,
  'facial-steamer': 54,
  'electric-blackhead-remover': 32,
  'sonic-facial-cleansing-brush': 50,
  'facial-massage-wand': 46,
  'led-light-therapy-wand': 43,
  'makeup-brush-cleaning-machine': 43,
  'professional-makeup-brush-set': 39,
  'beauty-blender-sponge-set': 32,
  'eyelash-curler': 68,
  'heated-eyelash-curler': 71,
  'electric-makeup-brush-cleaner': 40,
  'makeup-mirror-with-led-lights': 43,
  'travel-makeup-organizer': 39,
  'cosmetic-storage-organizer': 40,
  'makeup-train-case': 40,
  'vanity-beauty-storage-box': 39,
  'stainless-steel-facial-roller': 20,
  'electric-facial-cleansing-brush': 30,
  'silicone-face-cleansing-brush': 32,
  'pore-vacuum-cleaner': 37,
  'blackhead-removal-tool-kit': 23,
  'facial-exfoliating-brush': 34,
  'facial-cleansing-spatula': 54,
  'reusable-under-eye-masks': 32,
  'facial-mist-sprayer': 43,
  'facial-steamer-with-aromatherapy': 47,
  'facial-toning-device': 32,
  'high-frequency-facial-wand': 32,
  'derma-roller': 47,
  'gua-sha-body-massage-tool': 56,
  'ice-globes-for-face': 51,
  'led-light-therapy-face-mask': 76,
};

async function seedBeautyCounts() {
  try {
    const beautyCat = await prisma.category.findUnique({ where: { slug: 'beauty' } });
    if (!beautyCat) {
      console.log('[SEED_BEAUTY_COUNTS] Beauty category not found, skipping.');
      return;
    }

    let updated = 0;
    for (const [slug, targetCount] of Object.entries(BEAUTY_STARTING_COUNTS)) {
      const item = await prisma.catalogItem.findUnique({ where: { slug } });
      if (item) {
        if (item.addedCount == null || item.addedCount < targetCount || item.categoryId !== beautyCat.id) {
          await prisma.catalogItem.update({
            where: { id: item.id },
            data: {
              categoryId: beautyCat.id,
              addedCount: Math.max(item.addedCount || 0, targetCount),
            },
          });
          updated++;
        }
      }
    }

    console.log(`[SEED_BEAUTY_COUNTS] Seeded/updated ${updated} Beauty items.`);
  } catch (error) {
    console.error('[SEED_BEAUTY_COUNTS] Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedBeautyCounts();
}

module.exports = { seedBeautyCounts, BEAUTY_STARTING_COUNTS };
