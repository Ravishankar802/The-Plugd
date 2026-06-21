const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.referral.count({
    where: { referralCode: "ravi" }
  });

  console.log(`Number of Referral records with referralCode 'ravi': ${count}`);

  if (count > 0) {
    const updated = await prisma.referral.updateMany({
      where: { referralCode: "ravi" },
      data: { referralCode: "arjun" }
    });
    console.log(`Successfully updated ${updated.count} Referral records from 'ravi' to 'arjun'`);
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
