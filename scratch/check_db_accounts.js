const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const allAccounts = await prisma.account.count();
  const paidAccounts = await prisma.account.count({ where: { status: 'paid' } });
  const pendingAccounts = await prisma.account.count({ where: { status: 'pending_payment' } });
  
  console.log('Total accounts:', allAccounts);
  console.log('Paid accounts:', paidAccounts);
  console.log('Pending accounts:', pendingAccounts);
  
  const sample = await prisma.account.findMany({ take: 5 });
  console.log('Sample accounts:', JSON.stringify(sample, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
