const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const p = await prisma.promoter.findFirst({
    where: { username: 'mohitvats' }
  });
  console.log('Mohit Vats:', p);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
