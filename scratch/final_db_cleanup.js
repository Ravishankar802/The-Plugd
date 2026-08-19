require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Strip leading @ from handles in DB
  const updateResult = await prisma.$executeRaw`UPDATE "Account" SET "xHandle" = REGEXP_REPLACE("xHandle", '^@+', '') WHERE "xHandle" LIKE '@%'`;
  console.log('Fixed handles in DB:', updateResult);

  // 2. Delete fake accounts by name
  const fakeNames = ['John Doe', 'Jane Smith', 'Alex River', 'Sarah Chen', 'James Wilson', 'Elena Rodriguez', 'Marc Lou'];
  const deleteResult = await prisma.account.deleteMany({
    where: { 
      name: { in: fakeNames }
    }
  });
  console.log('Deleted fake accounts:', deleteResult.count);

  // 3. Delete accounts with unknown email (placeholder)
  const deleteEmailResult = await prisma.account.deleteMany({
    where: { email: 'unknown@example.com' }
  });
  console.log('Deleted unknown email accounts:', deleteEmailResult.count);

  const remaining = await prisma.account.findMany({
    select: { id: true, name: true, xHandle: true, email: true, status: true }
  });
  console.log('Remaining accounts:', remaining);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
