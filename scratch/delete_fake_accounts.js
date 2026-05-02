
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$executeRaw`DELETE FROM "Account" WHERE "xHandle" IN ('@sarahcodes', '@jdesign', '@elenarai', '@marclou', '@ravishankar802')`;
  console.log('Deleted rows:', result);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
