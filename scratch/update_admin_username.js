const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const promoter = await prisma.promoter.findUnique({
    where: { email: "ravx003@gmail.com" }
  });

  if (!promoter) {
    console.log("No promoter found with email ravx003@gmail.com");
    return;
  }

  console.log("Found promoter:", promoter);

  const updated = await prisma.promoter.update({
    where: { email: "ravx003@gmail.com" },
    data: { username: "ravishankar" }
  });

  console.log("Successfully updated promoter username to:", updated.username);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
