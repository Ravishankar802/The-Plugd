const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Starting INR to USD Database Migration...");

  // 1. Fetch current totals
  const totalEarnedBefore = await prisma.promoter.aggregate({ _sum: { totalEarned: true } });
  console.log(`Sum of totalEarned before: ${totalEarnedBefore._sum.totalEarned || 0}`);

  // 2. Perform updates
  // A. Promoter
  console.log("Updating Promoter table balances...");
  const updatePromoters = await prisma.$executeRaw`
    UPDATE "Promoter" 
    SET 
      "totalEarned" = "totalEarned" / 50.0,
      "pendingPayout" = "pendingPayout" / 50.0,
      "totalPaid" = "totalPaid" / 50.0
  `;
  console.log(`Updated ${updatePromoters} records in Promoter table.`);

  // B. Referral
  console.log("Updating Referral table rewards...");
  const updateReferrals = await prisma.$executeRaw`
    UPDATE "Referral"
    SET "amountEarned" = "amountEarned" / 50.0
    WHERE "amountEarned" IS NOT NULL
  `;
  console.log(`Updated ${updateReferrals} records in Referral table.`);

  // C. ReferralPayout
  console.log("Updating ReferralPayout table amounts...");
  const updatePayouts = await prisma.$executeRaw`
    UPDATE "ReferralPayout"
    SET "amount" = "amount" / 50.0
  `;
  console.log(`Updated ${updatePayouts} records in ReferralPayout table.`);

  // D. WithdrawalRequest
  console.log("Updating WithdrawalRequest table amounts...");
  const updateWithdrawals = await prisma.$executeRaw`
    UPDATE "WithdrawalRequest"
    SET "amount" = "amount" / 50.0
  `;
  console.log(`Updated ${updateWithdrawals} records in WithdrawalRequest table.`);

  // 3. Fetch current totals after
  const totalEarnedAfter = await prisma.promoter.aggregate({ _sum: { totalEarned: true } });
  console.log(`Sum of totalEarned after: ${totalEarnedAfter._sum.totalEarned || 0}`);
  console.log("Database migration complete successfully!");
}

main()
  .catch((e) => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
