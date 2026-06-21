const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const promoter = await prisma.promoter.findUnique({
    where: { email: "ravx003@gmail.com" }
  });
  console.log("Current promoter record in DB:", promoter);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
