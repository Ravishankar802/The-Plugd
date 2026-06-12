const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const FIRST_NAMES = ["Alex", "Sarah", "Marcus", "Elena", "David", "Jessica", "Ryan", "Emily", "James", "Sophia", "Michael", "Olivia", "William", "Emma", "Daniel", "Isabella", "John", "Mia", "Robert", "Charlotte", "Joseph", "Amelia", "David", "Harper", "Andrew", "Evelyn", "Chris", "Abigail", "Matthew", "Emily", "Joshua", "Elizabeth", "Nathan", "Sofia", "Tyler", "Avery", "Brandon", "Ella", "Kevin", "Madison", "Justin", "Scarlett", "Brian", "Victoria", "Dylan", "Grace", "Ethan", "Chloe", "Connor", "Lily"];
const LAST_NAMES = ["Rivers", "Jenkins", "Chen", "Rostova", "Kim", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts", "Gomez"];
const GRADIENTS = [
  "from-emerald-500 to-green-300",
  "from-purple-500 to-pink-300",
  "from-blue-500 to-cyan-300",
  "from-amber-500 to-yellow-300",
  "from-red-500 to-orange-300",
  "from-violet-600 to-indigo-400",
  "from-fuchsia-500 to-purple-300",
  "from-rose-500 to-red-300",
  "from-teal-500 to-emerald-300",
  "from-sky-500 to-blue-300"
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
  console.log("Seeding top 50 earners into database...");

  for (let i = 0; i < 50; i++) {
    const id = i + 1;
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
    const lastName = LAST_NAMES[(i * 3) % LAST_NAMES.length]; 
    const name = `${firstName} ${lastName}`;
    const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;
    const email = `${username}@example.com`;
    const referralCode = username;
    const totalEarned = calculateEarnings(id);
    const totalConversions = Math.round(totalEarned);
    const clickMultiplier = 15 + (id * 17) % 21; // between 15 and 35
    const totalClicks = totalConversions * clickMultiplier;

    // Select a country deterministically based on ID
    let country = "United States";
    let region = "INTERNATIONAL";
    if (id % 5 === 0) {
      country = "India";
      region = "INDIA";
    } else if (id % 5 === 1) {
      country = "United Kingdom";
    } else if (id % 5 === 2) {
      country = "Australia";
    } else if (id % 5 === 3) {
      country = "Canada";
    } else if (id % 5 === 4) {
      country = "Germany";
    }

    // Upsert promoter
    const promoter = await prisma.promoter.upsert({
      where: { email },
      update: {
        totalEarned: totalEarned,
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

    console.log(`Upserted promoter: ${promoter.name} (${promoter.username}) - $${promoter.totalEarned}`);
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
