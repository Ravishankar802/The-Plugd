require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const accounts = await prisma.account.findMany();
  console.log("Total accounts:", accounts.length);
  console.log("Statuses:", [...new Set(accounts.map(a => a.status))]);
  console.log(JSON.stringify(accounts.slice(0, 5), null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
