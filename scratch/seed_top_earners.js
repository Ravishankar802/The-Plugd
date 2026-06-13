const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SEEDED_PROMOTERS = [
  { name: "Lucas Giraud", country: "France" },
  { name: "Niklas Jansen", country: "Germany" },
  { name: "Mateo Alvarez", country: "Spain" },
  { name: "Jonas Werner", country: "Germany" },
  { name: "Matteo Rossi", country: "Italy" },
  { name: "Lars Sorensen", country: "Denmark" },
  { name: "Arvid Lindqvist", country: "Sweden" },
  { name: "Marc Lepetit", country: "France" },
  { name: "Sven Vandermeer", country: "Netherlands" },
  { name: "Tarek Mansour", country: "Lebanon" },
  { name: "Fynn Becker", country: "Germany" },
  { name: "Antoine Dupont", country: "France" },
  { name: "Julius Meier", country: "Switzerland" },
  { name: "Carlos Mendez", country: "Spain" },
  { name: "Tyler Harrison", country: "United States" },
  { name: "Oliver Vlasov", country: "Czech Republic" },
  { name: "Kareem Farha", country: "Jordan" },
  { name: "Hugo Dubois", country: "France" },
  { name: "Bastiaan de Vos", country: "Netherlands" },
  { name: "Maximilian Weber", country: "Germany" },
  { name: "Ethan Caldwell", country: "United States" },
  { name: "Lorenzo Bianchi", country: "Italy" },
  { name: "Henrik Nilsson", country: "Sweden" },
  { name: "Arthur Lemaire", country: "France" },
  { name: "Felix Hoffmann", country: "Austria" },
  { name: "Jordi Gasol", country: "Spain" },
  { name: "Ziad Ghadban", country: "United Arab Emirates" },
  { name: "Kasper Poulsen", country: "Denmark" },
  { name: "Austin Vance", country: "United States" },
  { name: "Lukas Schmidt", country: "Germany" },
  { name: "Youssef Shalhoub", country: "Egypt" },
  { name: "Karan Sengupta", country: "India" },
  { name: "Simon de Jong", country: "Netherlands" },
  { name: "Marcus Vance", country: "United States" },
  { name: "Clément Roux", country: "France" },
  { name: "Aditya Nair", country: "India" },
  { name: "Graham Sterling", country: "United States" },
  { name: "Rayan Al-Sayed", country: "Saudi Arabia" },
  { name: "Valentin Fischer", country: "Germany" },
  { name: "Devendra Jha", country: "India" },
  { name: "Nils Lindgren", country: "Sweden" },
  { name: "Diego Santoro", country: "Italy" },
  { name: "Nathan Hill", country: "United States" },
  { name: "Sanjay Kulkarni", country: "India" },
  { name: "Elias Hämäläinen", country: "Finland" },
  { name: "Miloš Horvat", country: "Croatia" },
  { name: "Thibaut Mercier", country: "Belgium" },
  { name: "Adrian Kowalski", country: "Poland" },
  { name: "Gerrit de Clercq", country: "Belgium" },
  { name: "Dominik Novak", country: "Czech Republic" }
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
