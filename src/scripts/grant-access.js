const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = 'ravishankar4284@gmail.com';
  
  const account = await prisma.account.findFirst({
    where: { email }
  });

  if (account) {
    console.log('Account found. Updating to paid: true');
    await prisma.account.update({
      where: { id: account.id },
      data: { paid: true }
    });
  } else {
    console.log('Account not found. Creating a test account...');
    await prisma.account.create({
      data: {
        email,
        name: 'Ravi Shankar',
        xHandle: 'ravishankar802',
        bio: 'Building The Plugd. Growth hacker & founder.',
        niche: ['Founder'],
        followersRange: '1K - 5K',
        paid: true,
        avatarUrl: 'https://pbs.twimg.com/profile_images/1683325305276710912/m_9n7_2v_400x400.jpg' // Example URL
      }
    });
  }
  console.log('Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
