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

  // 2. Update Netflix Standard image
  const netflixStandard = await prisma.catalogItem.updateMany({
    where: { slug: "netflix-standard" },
    data: {
      image: "https://i.pinimg.com/736x/f0/31/26/f031261224c21f684a0abe77b7e57179.jpg",
    },
  });
  console.log("Updated Netflix Standard image:", netflixStandard.count);

  // 3. Update Prime Video name and image
  const primeVideo = await prisma.catalogItem.updateMany({
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
  console.log("Updated Prime Video name and image:", primeVideo.count);

  // 4. Update Spotify Premium image
  const spotifyPremium = await prisma.catalogItem.updateMany({
    where: { slug: "spotify-premium" },
    data: {
      image: "https://i.pinimg.com/1200x/28/8a/3a/288a3a5cf0e736992d3d9af0d94536f5.jpg",
    },
  });
  console.log("Updated Spotify Premium image:", spotifyPremium.count);
}

main()
  .catch((err) => {
    console.error("Error updating subscriptions items:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
