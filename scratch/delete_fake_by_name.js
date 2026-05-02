require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const fakeNames = ['John Doe', 'Jane Smith', 'Alex River', 'Sarah Chen', 'James Wilson', 'Elena Rodriguez', 'Marc Lou'];
  
  const result = await prisma.account.deleteMany({
    where: { name: { in: fakeNames } }
  });
  console.log('Deleted fake accounts:', result.count);

  const remaining = await prisma.account.findMany({
    select: { id: true, name: true, xHandle: true, email: true, status: true }
  });
  console.log('Remaining accounts:', remaining);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
