const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.account.updateMany({
    where: { 
      xHandle: {
        equals: 'ravx003',
        mode: 'insensitive'
      }
    },
    data: { isClaimed: true }
  });
  console.log(`Updated ${result.count} accounts with xHandle 'ravx003'`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
