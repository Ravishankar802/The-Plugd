const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ELECTRONICS_STARTING_COUNTS = {
  // LAPTOPS (25)
  "macbook-pro-14": 2100, // 2.1K
  "macbook-pro-16": 1800, // 1.8K
  "macbook-air-13": 1500, // 1.5K
  "macbook-air-15": 1300, // 1.3K
  "macbook-neo": 1000, // 1K
  "mac-mini": 880,
  "mac-studio": 1100, // 1.1K
  "imac": 1300, // 1.3K
  "dell-xps-13": 282,
  "dell-xps-16": 321,
  "microsoft-surface-laptop": 210,
  "microsoft-surface-pro": 541,
  "lenovo-thinkpad-x1-carbon": 1400, // 1.4K
  "lenovo-yoga-pro": 402,
  "hp-spectre-x360": 391,
  "asus-zenbook": 211,
  "asus-proart": 101,
  "acer-swift": 132,
  "razer-blade-16": 320,
  "asus-rog-strix": 356,
  "asus-rog-zephyrus-g14": 432,
  "lenovo-legion-pro": 561,
  "alienware-gaming-laptop": 693,
  "msi-raider": 485,
  "acer-predator-helios": 347,

  // AUDIO (23)
  "airpods": 1100, // 1.1K
  "airpods-pro": 2800, // 2.8K
  "airpods-max": 2400, // 2.4K
  "sony-wf-1000xm6": 1400, // 1.4K
  "sony-wf-1000xm5": 742,
  "sony-wh-1000xm6": 1200, // 1.2K
  "sony-wh-1000xm5": 480,
  "samsung-galaxy-buds4-pro": 245,
  "galaxy-buds4": 609,
  "galaxy-buds3-pro": 428,
  "galaxy-buds3": 321,
  "pixel-buds-pro-2": 210,
  "pixel-buds-2a": 143,
  "cmf-headphone-pro": 430,
  "cmf-buds-2-plus": 382,
  "cmf-buds-pro-2": 212,
  "marshall-headphones": 589,
  "marshall-earbuds": 921,
  "bose-quietcomfort-ultra": 354,
  "bose-quietcomfort-headphones": 430,
  "sennheiser-momentum-4": 139,
  "sennheiser-hd-600": 123,
  "audio-technica-ath-m50x": 459,

  // GAMING (17)
  "playstation-5": 1200, // 1.2K
  "playstation-5-pro": 1600, // 1.6K
  "playstation-5-console-standard": 1100, // 1.1K
  "playstation-5-console-digital": 1200, // 1.2K
  "xbox-series-x": 1100, // 1.1K
  "nintendo-switch-2": 648,
  "asus-rog-ally-x": 532,
  "steam-deck-oled": 498,
  "meta-quest-3": 610,
  "apple-vision-pro": 732,
  "dualsense-wireless-controller-white": 523,
  "logitech-g502-hero-high-performance-gaming-mouse": 372,
  "logitech-g402-hyperion-fury-usb-wired-gaming-mouse": 290,
  "nvidia-geforce-rtx-5090": 3500, // 3.5K
  "nvidia-geforce-rtx-5080": 2300, // 2.3K
  "nvidia-geforce-rtx-5070-ti": 1500, // 1.5K
  "samsung-odyssey-oled-g9": 834,

  // KEYBOARDS & MOUSE (12)
  "logitech-pebble-keys-2-k380s": 349,
  "logitech-mk240-nano-wireless-usb-keyboard": 432,
  "logitech-g502-hero": 483,
  "logitech-g402-hyperion-fury": 367,
  "zebronics-companion-201": 301,
  "zebronics-shark-lite": 392,
  "zebronics-war-m": 340,
  "rapoo-e9050l": 298,
  "evofox-katana-x2-tkl": 540,
  "evofox-banshee-tri-mode": 501,
  "potronics-wireless-keyboard": 219,
  "potronics-toad-8": 184,

  // CAMERAS & STREAMING (11)
  "mirrorless-camera": 234,
  "dslr-camera": 569,
  "action-camera": 354,
  "gopro": 809,
  "4k-stream-webcam": 476,
  "streaming-microphone": 381,
  "audio-interface": 298,
  "ring-light": 903,
  "capture-card": 310,
  "tripod": 693,
  "camera-gimbal": 311,

  // STORAGE & COMPUTING (10)
  "external-ssd": 113,
  "external-hdd": 87,
  "usb-flash-drive": 145,
  "portable-ssd": 56,
  "nas-storage": 45,
  "power-bank": 153,
  "usb-c-hub": 50,
  "thunderbolt-dock": 32,
  "wireless-charger": 98,
  "magsafe-charger": 71,

  // DISPLAYS & PROJECTORS (7)
  "gaming-monitor": 345,
  "4k-monitor": 201,
  "ultrawide-monitor": 198,
  "smart-projector": 143,
  "4k-projector": 183,
  "portable-projector": 222,
  "4k-smart-tv": 310,

  // SMART HOME (10)
  "amazon-echo-show-8": 92,
  "amazon-echo-4th-gen": 83,
  "google-nest-hub": 73,
  "apple-homepod": 81,
  "smart-light": 22,
  "smart-led-strip": 54,
  "smart-plug": 31,
  "smart-doorbell": 12,
  "security-camera": 9,
  "robot-vacuum": 56,

  // WATCHES (8)
  "apple-watch": 732,
  "apple-watch-ultra": 1200, // 1.2K
  "samsung-galaxy-watch": 325,
  "google-pixel-watch": 210,
  "garmin-forerunner": 185,
  "garmin-fenix": 57,
  "fitbit-charge": 118,
  "xiaomi-smart-band": 34,

  // OTHER (10)
  "standing-desk": 301,
  "mechanical-keyboard": 126,
  "gaming-chair": 1200, // 1.2K
  "desk-lamp": 333,
  "electric-toothbrush": 120,
  "electric-shaver": 209,
  "hair-dryer": 154,
  "air-purifier": 91,
  "portable-fan": 561,
  "digital-alarm-clock": 241,
};

async function seedElectronicsCounts() {
  try {
    const electronicsCat = await prisma.category.findUnique({ where: { slug: 'electronics' } });
    if (!electronicsCat) {
      console.log('[SEED_ELECTRONICS_COUNTS] Electronics category not found, skipping.');
      return;
    }

    let updated = 0;
    for (const [slug, targetCount] of Object.entries(ELECTRONICS_STARTING_COUNTS)) {
      const item = await prisma.catalogItem.findFirst({
        where: {
          categoryId: electronicsCat.id,
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
      } else {
        console.warn(`[SEED_ELECTRONICS_COUNTS] Item with slug "${slug}" not found in Electronics category.`);
      }
    }

    console.log(`[SEED_ELECTRONICS_COUNTS] Seeded/updated ${updated} Electronics items.`);
  } catch (error) {
    console.error('[SEED_ELECTRONICS_COUNTS] Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedElectronicsCounts();
}

module.exports = { seedElectronicsCounts, ELECTRONICS_STARTING_COUNTS };
