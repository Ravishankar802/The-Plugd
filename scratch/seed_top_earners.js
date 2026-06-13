const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SEEDED_PROMOTERS = [
  { name: "Nathan Hill", country: "United States" },
  { name: "Lucas Martin", country: "France" },
  { name: "Lachlan Jones", country: "Australia" },
  { name: "Jack Miller", country: "United States" },
  { name: "Ethan Davis", country: "United States" },
  { name: "Ryan Clark", country: "United States" },
  { name: "Thomas Bernard", country: "France" },
  { name: "Tariq Khan", country: "Saudi Arabia" },
  { name: "Connor Smith", country: "Australia" },
  { name: "Tyler Brooks", country: "United States" },
  { name: "Justin Hall", country: "United States" },
  { name: "Cody Evans", country: "United States" },
  { name: "Nicolas Petit", country: "France" },
  { name: "Youssef Ali", country: "Saudi Arabia" },
  { name: "Riley Taylor", country: "Australia" },
  { name: "Matthew Baker", country: "United States" },
  { name: "Caleb Cooper", country: "United States" },
  { name: "Pierre Dubois", country: "France" },
  { name: "Zayn Ahmed", country: "Saudi Arabia" },
  { name: "Liam Wilson", country: "Australia" },
  { name: "Brandon Ward", country: "United States" },
  { name: "Dylan Carter", country: "United States" },
  { name: "Alexandre Michel", country: "France" },
  { name: "Omar Hassan", country: "Saudi Arabia" },
  { name: "Sienna Brown", country: "Australia" },
  { name: "Austin Wright", country: "United States" },
  { name: "Logan Green", country: "United States" },
  { name: "Jordan Adams", country: "United States" },
  { name: "Dylan Mitchell", country: "United States" },
  { name: "Cameron Roberts", country: "United States" },
  // Ranks 31 to 50 can have Indian names:
  { name: "Aarav Patel", country: "India" },
  { name: "Rohan Sharma", country: "India" },
  { name: "Vikram Singh", country: "India" },
  { name: "Amit Das", country: "India" },
  { name: "Hunter Watson", country: "United States" },
  { name: "Wyatt Perez", country: "United States" },
  { name: "Christian Turner", country: "United States" },
  { name: "Aaron Phillips", country: "United States" },
  { name: "Blake Campbell", country: "United States" },
  { name: "Chase Parker", country: "United States" },
  { name: "Devin Jenkins", country: "United States" },
  { name: "Brody Myers", country: "United States" },
  { name: "Garrett Ross", country: "United States" },
  { name: "Spencer Perry", country: "United States" },
  { name: "Travis Powell", country: "United States" },
  { name: "Colby Bryant", country: "United States" },
  { name: "Paige Miller", country: "United States" },
  { name: "Kenzie Watson", country: "United States" },
  { name: "Savannah Kim", country: "United States" },
  { name: "Cole Evans", country: "United States" }
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
    const username = name.toLowerCase().replace(/\s+/g, '');
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
