const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SEEDED_PROMOTERS = [
  { name: "Dhruv Goel", country: "India" },
  { name: "Raghav Arora", country: "India" },
  { name: "Shreya Nanda", country: "India" },
  { name: "Aditya Chaudhary", country: "India" },
  { name: "Karthik Gowda", country: "India" },
  { name: "Vineeth Shetty", country: "India" },
  { name: "Siddhant Mehra", country: "India" },
  { name: "Ashish Jain", country: "India" },
  { name: "Shruti Verma", country: "India" },
  { name: "Rakesh Yadav", country: "India" },
  { name: "Pratik Sinha", country: "India" },
  { name: "Harshit Sen", country: "India" },
  { name: "Piysh Gopal", country: "India" },
  { name: "Khushi Batra", country: "India" },
  { name: "Dushyant Kumar", country: "India" },
  { name: "Ayush Mishra", country: "India" },
  { name: "Kanishka Kapoor", country: "India" },
  { name: "Rohan Das", country: "India" },
  { name: "Sarthak Joshi", country: "India" },
  { name: "Daksh Rana", country: "India" },
  { name: "Abhijeet Singh", country: "India" },
  { name: "Sumit Rawat", country: "India" },
  { name: "Pragya Pandey", country: "India" },
  { name: "Sneha Sharma", country: "India" },
  { name: "Bilal Khan", country: "India" },
  { name: "Akash Shukla", country: "India" },
  { name: "Pratibha Dixit", country: "India" },
  { name: "Tushar Bhatia", country: "India" },
  { name: "Mayur Jadhav", country: "India" },
  { name: "Suraj Maurya", country: "India" },
  { name: "Rohit Bansal", country: "India" },
  { name: "Ankita Roy", country: "India" },
  { name: "Arun Chauhan", country: "India" },
  { name: "Praveen Hegde", country: "India" },
  { name: "Nikhil Somanna", country: "India" },
  { name: "Anuj Tripathi", country: "India" },
  { name: "Shubh Agarwal", country: "India" },
  { name: "Satvik Patel", country: "India" },
  { name: "Anushka Tyagi", country: "India" },
  { name: "Shalini Prabhu", country: "India" },
  { name: "Tejas Nayak", country: "India" },
  { name: "Prashant Bhat", country: "India" },
  { name: "Piyush Garg", country: "India" },
  { name: "Sourabh Gupta", country: "India" },
  { name: "Muskan Soni", country: "India" },
  { name: "Sanjay Prasad", country: "India" },
  { name: "Vishal Rajput", country: "India" },
  { name: "Tanisha Koushik", country: "India" },
  { name: "Sagar Khatri", country: "India" },
  { name: "Chirag Shenoy", country: "India" }
];

function calculateEarnings(id) {
  const baseEpoch = 1780272000000;
  const initialElapsedSeconds = Math.max(0, (Date.now() - baseEpoch) / 1000);
  
  const factor = (50 - id) / 48; // from 1.0 down to 0.0
  
  let dailyRate = 0;
  if (id === 1) {
    dailyRate = 120000;
  } else {
    dailyRate = 30000 + 60000 * Math.pow(factor, 2.0);
  }
  const earningRatePerSec = dailyRate / 86400;
  
  const currentRefElapsed = 845000;
  const prevRefElapsed = 777600;
  
  let prevRatePerSec = 0;
  if (id === 1) {
    prevRatePerSec = 86000 / 86400;
  } else {
    prevRatePerSec = (25000 + 35000 * Math.pow(factor, 2.0)) / 86400;
  }
  
  let prevBaseEarnings = 0;
  if (id === 1) {
    const oldRate = 4.05 / 10;
    const oldBase = 7100000 + prevRefElapsed * 4.05 * 0.9;
    const oldEarnings = oldBase + prevRefElapsed * oldRate;
    prevBaseEarnings = oldEarnings - prevRefElapsed * prevRatePerSec;
  } else {
    const oldRate = (0.115 + 1.62 * Math.pow(factor, 2.0)) / 10;
    const oldBase = (320000 + 2180000 * Math.pow(factor, 2.0)) + prevRefElapsed * (0.115 + 1.62 * Math.pow(factor, 2.0)) * 0.9;
    const oldEarnings = oldBase + prevRefElapsed * oldRate;
    prevBaseEarnings = oldEarnings - prevRefElapsed * prevRatePerSec;
  }
  
  const prevExpectedEarnings = prevBaseEarnings + currentRefElapsed * prevRatePerSec;
  const baseEarnings = prevExpectedEarnings - currentRefElapsed * earningRatePerSec;
  
  const expectedEarnings = baseEarnings + initialElapsedSeconds * earningRatePerSec;
  return Math.round(expectedEarnings / 100) * 100;
}

async function main() {
  console.log("Seeding top 50 earners into database...");

  for (let i = 0; i < SEEDED_PROMOTERS.length; i++) {
    const id = i + 1;
    const item = SEEDED_PROMOTERS[i];
    const name = item.name;
    const username = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
    const email = `${username}@example.com`;
    const referralCode = username;
    const totalEarned = calculateEarnings(id);
    const totalConversions = Math.round(totalEarned / 100);
    const conversionRate = 0.50 + ((id * 7) % 31) / 100; // 50% to 80%
    const totalClicks = Math.round(totalConversions / conversionRate);

    const country = item.country;
    const region = country === "India" ? "INDIA" : "INTERNATIONAL";

    // Create or update promoter non-destructively to preserve fields like avatarUrl
    const promoter = await prisma.promoter.upsert({
      where: { email },
      update: {
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
      },
      create: {
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

    console.log(`Seeded promoter Rank ${id}: ${promoter.name} (${promoter.username}) - $${promoter.totalEarned}`);
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
