const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  const promoters = await prisma.promoter.findMany({
    take: 5
  });
  console.log("Promoters count:", await prisma.promoter.count());
  console.log("Sample Promoters:", promoters);

  const referrals = await prisma.referral.findMany({
    take: 5
  });
  console.log("Referrals count:", await prisma.referral.count());
  console.log("Sample Referrals:", referrals);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
});
