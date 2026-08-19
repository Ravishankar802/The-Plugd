const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const accounts = await prisma.account.findMany({
    where: {
      email: {
        equals: 'ravx003@gmail.com',
        mode: 'insensitive'
      },
      isClaimed: true
    }
  });
  console.log("Claimed accounts:", JSON.stringify(accounts, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
