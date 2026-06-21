const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.account.count({
    where: { referredBy: "ravi" }
  });

  console.log(`Number of Account records with referredBy 'ravi': ${count}`);

  if (count > 0) {
    const updated = await prisma.account.updateMany({
      where: { referredBy: "ravi" },
      data: { referredBy: "arjun" }
    });
    console.log(`Successfully updated ${updated.count} Account records from 'ravi' to 'arjun'`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
