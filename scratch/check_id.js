const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const p = await prisma.promoter.findFirst({
    where: { username: 'dhruvgoel' }
  });
  console.log('Dhruv Goel:', p);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
