require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Strip leading @ from all xHandles that have it
  const result = await prisma.$executeRaw`UPDATE "Account" SET "xHandle" = REGEXP_REPLACE("xHandle", '^@+', '') WHERE "xHandle" LIKE '@%'`;
  console.log('Fixed handles:', result);

  const accounts = await prisma.account.findMany({
    select: { id: true, name: true, xHandle: true }
  });
  console.log('Current handles:', accounts);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
