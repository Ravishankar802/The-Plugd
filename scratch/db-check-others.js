const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const others = await prisma.account.findMany({
    where: { xHandle: { not: 'ravx003' } },
    take: 5
  });
  console.log('Other accounts (isClaimed check):', others.map(o => ({ handle: o.xHandle, isClaimed: o.isClaimed })));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
