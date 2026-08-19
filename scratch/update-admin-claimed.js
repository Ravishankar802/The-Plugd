const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'ravx003@gmail.com';
  const result = await prisma.account.updateMany({
    where: { email: adminEmail },
    data: { isClaimed: true }
  });
  console.log(`Updated ${result.count} accounts for admin ${adminEmail}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
