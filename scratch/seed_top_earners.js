const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SEEDED_PROMOTERS = [
  { name: "Lucas Giraud", country: "United States" },
  { name: "Raghav", country: "India" },
  { name: "Shreyaaa", country: "India" },
  { name: "Aditya Chaudhary", country: "India" },
  { name: "Sneha Sharma", country: "India" },
  { name: "Marcus Goh", country: "Singapore" },
  { name: "Ashish Jain", country: "India" },
  { name: "Harshit Gupta", country: "India" },
  { name: "Tyler Harrison", country: "United States" },
  { name: "Piysh Gopal", country: "India" },
  { name: "Jason Chen", country: "United States" },
  { name: "Dushyant Kumar", country: "India" },
  { name: "Abhijeet Singh", country: "India" },
  { name: "Ethan Caldwell", country: "United States" },
  { name: "Akash Singh", country: "India" },
  { name: "Pratibha Mishra", country: "India" },
  { name: "Kevin Tan", country: "Singapore" },
  { name: "Mayur Jadhav", country: "India" },
  { name: "Suraj Kumar", country: "India" },
  { name: "Austin Vance", country: "United States" },
  { name: "Arun Chauhan", country: "India" },
  { name: "Darren Lim", country: "Singapore" },
  { name: "Shubh Agarwal", country: "India" },
  { name: "Satvik Patel", country: "India" },
  { name: "Anushka Tyagi", country: "India" },
  { name: "Marcus Reed", country: "United States" },
  { name: "Soham Mehta", country: "India" },
  { name: "Piyush Garg", country: "India" },
  { name: "Tanisha Sharma", country: "India" },
  { name: "Karthik", country: "India" },
  { name: "Alex Wong", country: "Singapore" },
  { name: "Vineeth", country: "India" },
  { name: "Siddhant", country: "India" },
  { name: "Tyler Brooks", country: "United States" },
  { name: "Shruti", country: "India" },
  { name: "Rakesh", country: "India" },
  { name: "Pratik", country: "India" },
  { name: "Ethan Ng", country: "Malaysia" },
  { name: "Khushi", country: "India" },
  { name: "Ayush", country: "India" },
  { name: "Graham Sterling", country: "United States" },
  { name: "Kanishka", country: "India" },
  { name: "Rohan", country: "India" },
  { name: "Ryan Cheng", country: "United States" },
  { name: "Sarthak", country: "India" },
  { name: "Daksh", country: "India" },
  { name: "Jack Miller", country: "United States" },
  { name: "Sumit", country: "India" },
  { name: "Pragya", country: "India" },
  { name: "Brandon Lee", country: "Malaysia" }
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
