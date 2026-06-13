const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SEEDED_PROMOTERS = [
  { name: "Lucas Giraud", country: "United States" },
  { name: "Marcus Goh", country: "Singapore" },
  { name: "Tyler Harrison", country: "United States" },
  { name: "Jason Chen", country: "United States" },
  { name: "Ethan Caldwell", country: "United States" },
  { name: "Kevin Tan", country: "Singapore" },
  { name: "Austin Vance", country: "United States" },
  { name: "Darren Lim", country: "Singapore" },
  { name: "Marcus Vance", country: "United States" },
  { name: "Alex Wong", country: "Singapore" },
  { name: "Tyler Brooks", country: "United States" },
  { name: "Ethan Ng", country: "Malaysia" },
  { name: "Graham Sterling", country: "United States" },
  { name: "Ryan Cheng", country: "United States" },
  { name: "Jack Miller", country: "United States" },
  { name: "Brandon Lee", country: "Malaysia" },
  { name: "Cody Evans", country: "United States" },
  { name: "Eric Cheung", country: "Singapore" },
  { name: "Justin Hall", country: "United States" },
  { name: "Jonathan Chan", country: "United States" },
  { name: "Matthew Baker", country: "United States" },
  { name: "Justin Low", country: "Malaysia" },
  { name: "Caleb Cooper", country: "United States" },
  { name: "Winston Yeoh", country: "Malaysia" },
  { name: "Brandon Ward", country: "United States" },
  { name: "Bryan Lau", country: "Singapore" },
  { name: "Dylan Carter", country: "United States" },
  { name: "Derek Koh", country: "Singapore" },
  { name: "Austin Wright", country: "United States" },
  { name: "Adrian Teo", country: "Singapore" },
  { name: "Logan Green", country: "United States" },
  { name: "Sujith", country: "India" },
  { name: "Shawn Liew", country: "Malaysia" },
  { name: "Jordan Adams", country: "United States" },
  { name: "Daniel Ooi", country: "Malaysia" },
  { name: "Dylan Mitchell", country: "United States" },
  { name: "Parth Rao", country: "India" },
  { name: "Nicholas Chia", country: "Singapore" },
  { name: "Cameron Roberts", country: "United States" },
  { name: "Kelvin Wee", country: "Singapore" },
  { name: "Hunter Watson", country: "United States" },
  { name: "Rohan Verma", country: "India" },
  { name: "Nathan Hill", country: "United States" },
  { name: "Ivan Ho", country: "United States" },
  { name: "Wyatt Perez", country: "United States" },
  { name: "Clement Sim", country: "Singapore" },
  { name: "Karan Sharma", country: "India" },
  { name: "Dominic Phua", country: "Singapore" },
  { name: "Christian Turner", country: "United States" },
  { name: "Jeffrey Kwok", country: "United States" }
];

function calculateEarnings(id) {
  const baseEpoch = 1780272000000;
  const initialElapsedSeconds = Math.max(0, (Date.now() - baseEpoch) / 1000);
  
  const factor = (50 - id) / 48; // from 1.0 down to 0.0
  
  let dailyRate = 0;
  if (id === 1) {
    dailyRate = 1200;
  } else {
    dailyRate = 300 + 600 * Math.pow(factor, 2.0);
  }
  const earningRatePerSec = dailyRate / 86400;
  
  const currentRefElapsed = 845000;
  const prevRefElapsed = 777600;
  
  let prevRatePerSec = 0;
  if (id === 1) {
    prevRatePerSec = 860 / 86400;
  } else {
    prevRatePerSec = (250 + 350 * Math.pow(factor, 2.0)) / 86400;
  }
  
  let prevBaseEarnings = 0;
  if (id === 1) {
    const oldRate = 0.0405 / 10;
    const oldBase = 71000 + prevRefElapsed * 0.0405 * 0.9;
    const oldEarnings = oldBase + prevRefElapsed * oldRate;
    prevBaseEarnings = oldEarnings - prevRefElapsed * prevRatePerSec;
  } else {
    const oldRate = (0.00115 + 0.0162 * Math.pow(factor, 2.0)) / 10;
    const oldBase = (3200 + 21800 * Math.pow(factor, 2.0)) + prevRefElapsed * (0.00115 + 0.0162 * Math.pow(factor, 2.0)) * 0.9;
    const oldEarnings = oldBase + prevRefElapsed * oldRate;
    prevBaseEarnings = oldEarnings - prevRefElapsed * prevRatePerSec;
  }
  
  const prevExpectedEarnings = prevBaseEarnings + currentRefElapsed * prevRatePerSec;
  const baseEarnings = prevExpectedEarnings - currentRefElapsed * earningRatePerSec;
  
  const expectedEarnings = baseEarnings + initialElapsedSeconds * earningRatePerSec;
  return Math.round(expectedEarnings);
}

async function main() {
  console.log("Cleaning old seeded promoters...");
  await prisma.promoter.deleteMany({
    where: {
      email: {
        endsWith: "@example.com"
      }
    }
  });

  console.log("Seeding top 50 earners into database...");

  for (let i = 0; i < SEEDED_PROMOTERS.length; i++) {
    const id = i + 1;
    const item = SEEDED_PROMOTERS[i];
    const name = item.name;
    const username = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
    const email = `${username}@example.com`;
    const referralCode = username;
    const totalEarned = calculateEarnings(id);
    const totalConversions = Math.round(totalEarned);
    const conversionRate = 0.50 + ((id * 7) % 31) / 100; // 50% to 80%
    const totalClicks = Math.round(totalConversions / conversionRate);

    const country = item.country;
    const region = country === "India" ? "INDIA" : "INTERNATIONAL";

    // Create promoter
    const promoter = await prisma.promoter.create({
      data: {
        email,
        name,
        username,
        referralCode,
        totalEarned,
        totalClicks: totalClicks,
        totalConversions: totalConversions,
        payoutRegion: region,
        paypalEmail: region === "INTERNATIONAL" ? email : null,
        upiId: region === "INDIA" ? `${username}@okaxis` : null,
        intlBankCountry: region === "INTERNATIONAL" ? country : null
      }
    });

    console.log(`Created promoter Rank ${id}: ${promoter.name} (${promoter.username}) - $${promoter.totalEarned}`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
