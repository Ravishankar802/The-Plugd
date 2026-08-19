const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Starting DB update query...");
  const query = `UPDATE "Promoter" SET username = 'arjun', "referralCode" = 'arjun' WHERE email = 'ravx003@gmail.com';`;
  console.log("Query:", query);
  
  const result = await prisma.$executeRawUnsafe(query);
  console.log("Raw query execution result (number of affected rows):", result);

  const updated = await prisma.promoter.findUnique({
    where: { email: "ravx003@gmail.com" }
  });
  console.log("Verified promoter record in DB:", updated);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
