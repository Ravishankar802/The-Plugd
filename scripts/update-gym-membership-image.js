const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.catalogItem.updateMany({
    where: { slug: 'gym-membership' },
    data: {
      image: 'https://i.pinimg.com/736x/9b/f8/4a/9bf84ae34cfce3c79cd4ba8d290eb9c7.jpg',
    },
  });
  console.log('Updated Gym Membership image in DB:', updated);
}

main().catch(console.error).finally(() => prisma.$disconnect());
