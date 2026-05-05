const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.account.count({
    where: { paid: true },
  });
  console.log('Count of paid accounts:', count);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
