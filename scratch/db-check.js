const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`SELECT column_name FROM information_schema.columns WHERE table_name = 'Account'`;
  console.log('Columns in Account table:', result);
  
  const rav = await prisma.account.findFirst({
    where: { xHandle: { equals: 'ravx003', mode: 'insensitive' } }
  });
  console.log('Account ravx003:', rav);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
