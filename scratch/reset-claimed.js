const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Reset all to false
  const reset = await prisma.account.updateMany({
    data: { isClaimed: false }
  });
  console.log(`Reset ${reset.count} accounts to isClaimed: false`);
  
  // 2. Set ravx003 to true
  const setRav = await prisma.account.updateMany({
    where: { 
      xHandle: {
        equals: 'ravx003',
        mode: 'insensitive'
      }
    },
    data: { isClaimed: true }
  });
  console.log(`Set ${setRav.count} accounts with handle 'ravx003' to isClaimed: true`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
