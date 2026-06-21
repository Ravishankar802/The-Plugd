const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const targetEmail = "ravx003@gmail.com";
  const newUsername = "arjun";

  // Check if any other promoter has this username/referralCode
  const conflict = await prisma.promoter.findFirst({
    where: {
      OR: [
        { username: newUsername },
        { referralCode: newUsername }
      ],
      NOT: { email: targetEmail }
    }
  });

  if (conflict) {
    console.error(`Conflict found! Promoter with email ${conflict.email} already has username/referralCode as '${newUsername}'`);
    return;
  }

  const promoter = await prisma.promoter.findUnique({
    where: { email: targetEmail }
  });

  if (!promoter) {
    console.log(`No promoter found with email ${targetEmail}`);
    return;
  }

  console.log("Current promoter record:", promoter);

  const updated = await prisma.promoter.update({
    where: { email: targetEmail },
    data: { 
      username: newUsername,
      referralCode: newUsername
    }
  });

  console.log("Successfully updated promoter!");
  console.log("Updated record:", updated);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
