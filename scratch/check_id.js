const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const p = await prisma.promoter.findFirst({
    where: { username: 'aryankhanna' }
  });
  console.log('Aryan Khanna:', p);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
