const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const VEHICLES_STARTING_COUNTS = {
  "rolls-royce-cullinan": 345,
  "rolls-royce-phantom": 239,
  "rolls-royce-spectre": 156,
  "mercedes-amg-g63": 890,
  "bmw-m4": 242,
  "bmw-m5": 356,
  "bmw-m8": 214,
  "ferrari-296-gtb": 47,
  "ferrari-296-gts": 56,
  "ferrari-812-superfast": 78,
  "porsche-918-spyder": 324,
  "mclaren-p1": 478,
  "mclaren-p1-gtr": 210,
  "mclaren-senna": 243,
  "mclaren-senna-gtr": 135,
  "mclaren-speedtail": 172,
  "mclaren-solus-gt": 191,
  "mclaren-elva": 43,
  "porsche-911": 2200,
  "mercedes-maybach-s-class": 241,
  "mercedes-maybach-gls-600": 190,
  "range-rover-sv": 535,
  "range-rover-sport": 285,
  "land-rover-defender": 450,
  "jeep-wrangler": 304,
  "ford-raptor-r": 181,
  "ram-trx": 120,
  "tesla-cybertruck": 548,
  "tesla-model-s-plaid": 103,
  "ferrari-812-competizione": 329,
  "ferrari-sf90-stradale": 318,
  "ferrari-sf90-spider": 421,
  "ferrari-12-cilindri": 136,
  "ferrari-12-cilindri-spider": 120,
  "ferrari-849-testarossa": 111,
  "ferrari-849-testarossa-spider": 98,
  "lamborghini-huracan-evo": 509,
  "lamborghini-huracan-sto": 284,
  "lamborghini-huracan-tecnica": 221,
  "lamborghini-aventador-svj": 643,
  "lamborghini-murcielago": 320,
  "lamborghini-revuelto": 590,
  "lamborghini-temerario": 291,
  "porsche-911-turbo-s": 678,
  "porsche-911-gt3": 343,
  "porsche-911-gt3-rs": 3400,
  "aston-martin-vantage": 231,
  "aston-martin-vanquish": 354,
  "aston-martin-db12": 192,
  "aston-martin-dbs-superleggera": 115,
  "aston-martin-dbs-770-ultimate": 92,
  "mclaren-720s": 190,
  "mclaren-750s": 243,
  "mclaren-765lt": 982,
  "ferrari-purosangue": 209,
  "lamborghini-urus": 730,
  "porsche-cayenne": 210,
  "aston-martin-dbx": 301,
  "mclaren-w1": 481,
  "mclaren-f1": 532,
  "ferrari-laferrari": 643,
  "ferrari-laferrari-aperta": 472,
  "ferrari-daytona-sp3": 281,
  "ferrari-monza-sp1": 74,
  "ferrari-monza-sp2": 132,
  "lamborghini-sian": 321,
  "lamborghini-veneno-roadster": 492,
  "aston-martin-vulcan": 184,
  "aston-martin-valhalla": 203,
  "aston-martin-valour": 146,
  "aston-martin-valiant": 115,
  "aston-martin-valen": 97,
  "aston-martin-valkyrie": 1100,
  "mercedes-amg-project-one": 439,
  "rimac-nevera": 702,
  "rimac-nevera-r": 445,
  "bugatti-veyron": 521,
  "bugatti-chiron-super-sport": 4800,
  "bugatti-chiron-pur-sport": 2400,
  "bugatti-mistral": 1100,
  "bugatti-divo": 888,
  "bugatti-centodieci": 654,
  "bugatti-bolide": 1300,
  "bugatti-tourbillon": 932,
  "koenigsegg-jesko-absolut": 4300,
  "koenigsegg-jesko-attack": 3900,
  "koenigsegg-gemera": 2500,
  "koenigsegg-agera": 832,
  "koenigsegg-agera-r": 320,
  "koenigsegg-agera-s": 456,
  "koenigsegg-agera-rs": 1500,
  "koenigsegg-regera": 249,
  "koenigsegg-ccx": 190,
  "koenigsegg-ccr": 320,
  "koenigsegg-ccxr": 542,
  "koenigsegg-ccgt": 291,
  "koenigsegg-cc8s": 301,
  "koenigsegg-cc850": 1400,
  "pagani-zonda": 2500,
  "pagani-huayra": 3200,
  "pagani-utopia": 2200,
  "pagani-grandi-complicazioni": 1900,
  "hennessey-venom-f5": 1600,
  "hennessey-venom-f5-roadster": 1100,
  "royal-enfield-continental-gt-650": 3200,
  "royal-enfield-interceptor-650": 1700,
  "aprilia-457": 1100,
  "triumph-street-triple-765-rs": 2600,
  "triumph-speed-triple-1200-rs": 1100,
  "kawasaki-z900": 1200,
  "kawasaki-z1100": 990,
  "kawasaki-ninja-zx-6r": 1200,
  "kawasaki-ninja-zx-10r": 1700,
  "kawasaki-ninja-h2": 3200,
  "kawasaki-ninja-h2r": 4500,
  "bmw-s1000rr": 5000,
  "bmw-m1000rr": 4800,
  "ducati-monster": 1100,
  "ducati-xdiavel-v4": 1400,
  "ducati-streetfighter-v4s": 1800,
  "ducati-panigale-v4s": 5000,
  "ducati-panigale-v4r": 4900,
  "ktm-1390-super-duke-r": 3200,
  "harley-davidson-x440t": 1100,
  "harley-davidson-nightster": 2100,
  "harley-davidson-sportster-s": 2500,
  "harley-davidson-fat-boy": 2200,
  "yamaha-r9": 1300,
  "yamaha-r7": 832,
  "honda-cbr1000rr-r-fireblade": 3200,
  "aprilia-rsv4-1100-factory": 3900,
  "bugatti-chiron-super-sport-300": 4800,
  "bugatti-chiron-super-sport-300-plus": 4800,
};

async function seedVehiclesCounts() {
  try {
    const vehCat = await prisma.category.findUnique({ where: { slug: 'vehicles' } });
    if (!vehCat) {
      console.log('[SEED_VEHICLES_COUNTS] Vehicles category not found, skipping.');
      return;
    }

    let updated = 0;
    for (const [slug, targetCount] of Object.entries(VEHICLES_STARTING_COUNTS)) {
      const item = await prisma.catalogItem.findFirst({
        where: {
          categoryId: vehCat.id,
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

    console.log(`[SEED_VEHICLES_COUNTS] Seeded/updated ${updated} Vehicles items.`);
  } catch (error) {
    console.error('[SEED_VEHICLES_COUNTS] Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedVehiclesCounts();
}

module.exports = { seedVehiclesCounts, VEHICLES_STARTING_COUNTS };
