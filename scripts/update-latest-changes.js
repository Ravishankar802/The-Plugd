const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ITEM_COUNTS = [
  { slug: "perplexity-pro", name: "Perplexity Pro", count: 42 },
  { slug: "perplexity-max", name: "Perplexity Max", count: 56 },
  { slug: "netflix-premium", name: "Netflix Premium", count: 178 },
  { slug: "soft-pinch-liquid-blush", name: "Soft Pinch Liquid Blush", count: 45 },
  { slug: "advanced-snail-96-mucin-power-essence", name: "Advanced Snail 96 Mucin Power Essence", count: 38 },
  { slug: "lip-sleeping-mask-berry", name: "Lip Sleeping Mask (Berry)", count: 49 },
  { slug: "relief-sun-rice-probiotics-spf-50-pa", name: "Relief Sun: Rice + Probiotics SPF 50+ PA++++", count: 34 },
  { slug: "airwrap-multi-styler-complete-long", name: "Airwrap Multi-Styler Complete Long", count: 41 },
  { slug: "no-3-hair-perfector-repair-treatment", name: "No. 3 Hair Perfector Repair Treatment", count: 32 },
  { slug: "elixir-ultime-l-huile-originale-hair-oil", name: "Elixir Ultime L'Huile Originale Hair Oil", count: 36 },
  { slug: "supersonic-nural-hair-dryer", name: "Supersonic Nural Hair Dryer", count: 31 },
  { slug: "brazilian-bum-bum-body-cream", name: "Brazilian Bum Bum Body Cream", count: 48 },
  { slug: "coffee-body-scrub", name: "Coffee Body Scrub", count: 38 },
  { slug: "sauvage-eau-de-parfum", name: "Sauvage Eau de Parfum", count: 35 },
  { slug: "libre-eau-de-parfum", name: "Libre Eau de Parfum", count: 41 },
  { slug: "coco-mademoiselle-eau-de-parfum", name: "Coco Mademoiselle Eau de Parfum", count: 43 },
  { slug: "cheirosa-68-beija-flor-perfume-mist", name: "Cheirosa 68 Beija Flor Perfume Mist", count: 39 },
  { slug: "age-r-booster-pro-6-in-1-smart-glow-device", name: "Age-R Booster Pro 6-in-1 Smart Glow Device", count: 40 },
  { slug: "220-gsm-oversized-plain-drop-shoulder-tee", name: "220 GSM Oversized Plain Drop-Shoulder Tee", count: 91 },
  { slug: "monster-ultra-energy-drink", name: "Monster Ultra Energy Drink", count: 2200 },
];

async function main() {
  console.log("[UPDATE_LATEST_CHANGES] Starting updates...");

  // 1. Update 20 item counts
  for (const item of ITEM_COUNTS) {
    const res = await prisma.catalogItem.updateMany({
      where: {
        OR: [
          { slug: item.slug },
          { name: { equals: item.name, mode: "insensitive" } },
        ],
      },
      data: {
        addedCount: item.count,
      },
    });
    console.log(`Updated count for ${item.name} (${item.slug}) -> ${item.count} [affected: ${res.count}]`);
  }

  // 2. Update Smart Plug image
  const plugRes = await prisma.catalogItem.updateMany({
    where: {
      OR: [
        { slug: "smart-plug" },
        { name: { equals: "Smart Plug", mode: "insensitive" } },
      ],
    },
    data: {
      image: "https://i.pinimg.com/1200x/0c/de/af/0cdeafe1b7db210c99212e35902cc23f.jpg",
    },
  });
  console.log(`Updated Smart Plug image [affected: ${plugRes.count}]`);

  // 3. Update Protein Supplement legacy slug and name if needed
  await prisma.catalogItem.updateMany({
    where: {
      slug: "protien-supplement",
    },
    data: {
      name: "Protein Supplement",
      slug: "protein-supplement",
    },
  });

  // 4. Remove the 4 items completely from database if they exist
  const deleteRes = await prisma.catalogItem.deleteMany({
    where: {
      OR: [
        { slug: { in: ["designer-watch", "travel-backpack", "cordura-gym-weekend-duffle-bag", "sling-bag-womens"] } },
        { name: { in: ["Designer Watch", "Travel Backpack", "Water-Resistant Cordura Gym & Weekend Duffle", "Nylon Sporty Sling Bag"] } },
      ],
    },
  });
  console.log(`Deleted removed items from DB [affected: ${deleteRes.count}]`);

  // 5. Remove all product descriptions globally across all catalog items
  const descRes = await prisma.catalogItem.updateMany({
    data: {
      shortDescription: null,
      description: null,
    },
  });
  console.log(`Nullified all product descriptions in DB [affected: ${descRes.count}]`);

  console.log("[UPDATE_LATEST_CHANGES] Completed successfully.");
}

main()
  .catch((err) => {
    console.error("[UPDATE_LATEST_CHANGES] Error:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
