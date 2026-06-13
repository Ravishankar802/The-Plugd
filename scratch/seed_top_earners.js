const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SEEDED_PROMOTERS = [
  { name: "Lucas Giraud", country: "France" },
  { name: "Aarav", country: "India" },
  { name: "Sujith", country: "India" },
  { name: "Niklas Jansen", country: "Germany" },
  { name: "Rohan Verma", country: "India" },
  { name: "Mateo Alvarez", country: "Spain" },
  { name: "Akshath", country: "India" },
  { name: "Matteo Rossi", country: "Italy" },
  { name: "Vivaan", country: "India" },
  { name: "Tarek Mansour", country: "Lebanon" },
  { name: "Vihaan Reddy", country: "India" },
  { name: "Antoine Dupont", country: "France" },
  { name: "Sharath", country: "India" },
  { name: "Sven Vandermeer", country: "Netherlands" },
  { name: "Rahul", country: "India" },
  { name: "Tyler Harrison", country: "United States" },
  { name: "Harsha", country: "India" },
  { name: "Kareem Farha", country: "Jordan" },
  { name: "Dev", country: "India" },
  { name: "Bastiaan de Vos", country: "Netherlands" },
  { name: "Yash Vardhan", country: "India" },
  { name: "Arvid Lindqvist", country: "Sweden" },
  { name: "Saurav", country: "India" },
  { name: "Arthur Lemaire", country: "France" },
  { name: "Neil Aggarwal", country: "India" },
  { name: "Ziad Ghadban", country: "United Arab Emirates" },
  { name: "Pranav", country: "India" },
  { name: "Kasper Poulsen", country: "Denmark" },
  { name: "Shreyas", country: "India" },
  { name: "Austin Vance", country: "United States" },
  { name: "Manish", country: "India" },
  { name: "Fynn Becker", country: "Germany" },
  { name: "Aniruddh", country: "India" },
  { name: "Marcus Vance", country: "United States" },
  { name: "Varun Nair", country: "India" },
  { name: "Clément Roux", country: "France" },
  { name: "Akshay", country: "India" },
  { name: "Rayan Al-Sayed", country: "Saudi Arabia" },
  { name: "Parth Rao", country: "India" },
  { name: "Julius Meier", country: "Switzerland" },
  { name: "Nikhil", country: "India" },
  { name: "Diego Santoro", country: "Italy" },
  { name: "Nathan Hill", country: "United States" },
  { name: "Raghav", country: "India" },
  { name: "Elias Hämäläinen", country: "Finland" },
  { name: "Abhishek", country: "India" },
  { name: "Thibaut Mercier", country: "Belgium" },
  { name: "Vivek", country: "India" },
  { name: "Karan Sharma", country: "India" },
  { name: "Sanjay", country: "India" }
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
