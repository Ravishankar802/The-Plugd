const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Running direct DB update query...");
  const query = `UPDATE "Promoter" SET username = 'ravi', "referralCode" = 'ravi' WHERE email = 'ravx003@gmail.com';`;
  console.log("Query:", query);
  
  const result = await prisma.$executeRawUnsafe(query);
  console.log("Raw query execution result (affected rows):", result);

  const updated = await prisma.promoter.findUnique({
    where: { email: "ravx003@gmail.com" }
  });
  console.log("Resulting promoter record in DB:", updated);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
