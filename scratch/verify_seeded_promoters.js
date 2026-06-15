const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const promoters = await prisma.promoter.findMany({
    orderBy: { totalEarned: 'desc' }
  });

  console.log(`Total promoters found: ${promoters.length}`);
  
  promoters.forEach((p, idx) => {
    const rank = idx + 1;
    console.log(`Rank ${rank}: ${p.name} (@${p.username}) - $${p.totalEarned} - ${p.intlBankCountry || 'India'}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
