require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Fix @@ double handles — strip all leading @ chars
  const fixResult = await prisma.$executeRaw`UPDATE "Account" SET "xHandle" = LTRIM("xHandle", '@') WHERE "xHandle" LIKE '@%'`;
  console.log('Fixed @@ handles:', fixResult);

  // 2. Delete junk accounts with placeholder emails
  const deleteResult = await prisma.$executeRaw`DELETE FROM "Account" WHERE email = 'unknown@example.com' OR email NOT LIKE '%@%.%'`;
  console.log('Deleted junk accounts:', deleteResult);

  // 3. Show remaining accounts
  const remaining = await prisma.account.findMany({ select: { id: true, xHandle: true, email: true, status: true } });
  console.log('Remaining accounts:', remaining);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
