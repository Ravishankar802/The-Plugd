const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  const updatedPromoters = await prisma.promoter.updateMany({
    where: {
      email: {
        endsWith: '@example.com',
        mode: 'insensitive'
      }
    },
    data: {
      avatarUrl: null
    }
  });
  console.log(`Successfully updated ${updatedPromoters.count} promoters: set avatarUrl to null.`);

  const updatedAccounts = await prisma.account.updateMany({
    where: {
      email: {
        endsWith: '@example.com',
        mode: 'insensitive'
      }
    },
    data: {
      avatarUrl: null
    }
  });
  console.log(`Successfully updated ${updatedAccounts.count} accounts: set avatarUrl to null.`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
});
