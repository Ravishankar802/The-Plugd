const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.catalogItem.updateMany({
    where: { slug: 'apple-vision-pro' },
    data: {
      image: 'https://i.pinimg.com/736x/0e/c1/95/0ec1950ee0ab7be962fcd9a3eeb33e46.jpg',
    },
  });
  console.log('Updated Apple Vision Pro image in DB:', updated);
}

main().catch(console.error).finally(() => prisma.$disconnect());
