const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const subscriptionsCat = await prisma.category.findUnique({
    where: { slug: "subscriptions" },
  });

  if (!subscriptionsCat) {
    console.error("Subscriptions category not found!");
    return;
  }

  // 1. Upsert Netflix Premium
  const netflixPremium = await prisma.catalogItem.upsert({
    where: { slug: "netflix-premium" },
    update: {
      name: "Netflix Premium",
      image: "https://i.pinimg.com/736x/f0/31/26/f031261224c21f684a0abe77b7e57179.jpg",
      active: true,
      categoryId: subscriptionsCat.id,
    },
    create: {
      name: "Netflix Premium",
      slug: "netflix-premium",
      image: "https://i.pinimg.com/736x/f0/31/26/f031261224c21f684a0abe77b7e57179.jpg",
      active: true,
      featured: true,
      displayOrder: 555,
      categoryId: subscriptionsCat.id,
    },
  });
  console.log("Upserted Netflix Premium:", netflixPremium.id);

  // 2. Upsert Perplexity Pro
  const perplexityPro = await prisma.catalogItem.upsert({
    where: { slug: "perplexity-pro" },
    update: {
      name: "Perplexity Pro",
      image: "https://i.pinimg.com/1200x/8c/57/53/8c5753870725f8b5bc06619e6a86bf73.jpg",
      active: true,
      categoryId: subscriptionsCat.id,
    },
    create: {
      name: "Perplexity Pro",
      slug: "perplexity-pro",
      image: "https://i.pinimg.com/1200x/8c/57/53/8c5753870725f8b5bc06619e6a86bf73.jpg",
      active: true,
      featured: false,
      displayOrder: 553,
      categoryId: subscriptionsCat.id,
    },
  });
  console.log("Upserted Perplexity Pro:", perplexityPro.id);

  // 3. Upsert Perplexity Max
  const perplexityMax = await prisma.catalogItem.upsert({
    where: { slug: "perplexity-max" },
    update: {
      name: "Perplexity Max",
      image: "https://i.pinimg.com/1200x/8c/57/53/8c5753870725f8b5bc06619e6a86bf73.jpg",
      active: true,
      categoryId: subscriptionsCat.id,
    },
    create: {
      name: "Perplexity Max",
      slug: "perplexity-max",
      image: "https://i.pinimg.com/1200x/8c/57/53/8c5753870725f8b5bc06619e6a86bf73.jpg",
      active: true,
      featured: false,
      displayOrder: 553,
      categoryId: subscriptionsCat.id,
    },
  });
  console.log("Upserted Perplexity Max:", perplexityMax.id);

  // 4. Update Netflix Standard image
  await prisma.catalogItem.updateMany({
    where: { slug: "netflix-standard" },
    data: {
      image: "https://i.pinimg.com/736x/f0/31/26/f031261224c21f684a0abe77b7e57179.jpg",
    },
  });

  // 5. Update Prime Video name and image
  await prisma.catalogItem.updateMany({
    where: {
      OR: [
        { slug: "prime-video" },
        { slug: "prime-video-subscription" },
      ],
    },
    data: {
      name: "Prime Video",
      image: "https://i.pinimg.com/1200x/fd/42/5f/fd425f57ad5cbe31afa9c3ca5a3e1067.jpg",
    },
  });

  // 6. Update Spotify Premium image
  await prisma.catalogItem.updateMany({
    where: { slug: "spotify-premium" },
    data: {
      image: "https://i.pinimg.com/1200x/28/8a/3a/288a3a5cf0e736992d3d9af0d94536f5.jpg",
    },
  });

  // 7. Update Google AI Plus, Google AI Pro, Google AI Ultra images
  await prisma.catalogItem.updateMany({
    where: {
      slug: { in: ["google-ai-plus", "google-ai-pro", "google-ai-ultra"] },
    },
    data: {
      image: "https://i.pinimg.com/1200x/5e/09/fd/5e09fd110b1db2f7630d4948e6a6ff9d.jpg",
    },
  });

  // 8. Update ChatGPT Pro image
  await prisma.catalogItem.updateMany({
    where: { slug: "chatgpt-pro" },
    data: {
      image: "https://i.pinimg.com/736x/3b/fc/92/3bfc92138f34cab4bef4d5c5c521acd9.jpg",
    },
  });

  // 9. Update Claude Pro image
  await prisma.catalogItem.updateMany({
    where: { slug: "claude-pro" },
    data: {
      image: "https://i.pinimg.com/736x/0a/d7/f3/0ad7f36deaeefb40eb6012aba30f29c9.jpg",
    },
  });

  // 10. Update X Premium and X Premium+ images
  await prisma.catalogItem.updateMany({
    where: {
      slug: { in: ["x-premium", "x-premium-2", "x-premium-plus"] },
    },
    data: {
      image: "https://i.pinimg.com/1200x/f7/b8/82/f7b88227115c0f076c245d7450d5f976.jpg",
    },
  });

  console.log("All subscription item updates and new items synced successfully.");
}

main()
  .catch((err) => {
    console.error("Error updating subscriptions items:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
