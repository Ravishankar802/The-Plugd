const { PrismaClient } = require('@prisma/client');

async function main() {
  const backupUrl = process.argv[2];
  const mainUrl = process.argv[3] || process.env.DATABASE_URL;

  if (!backupUrl) {
    console.error("Error: Please provide the backup database URL as the first argument.");
    console.error("Usage: node scratch/restore_avatars_from_branch.js <BACKUP_DATABASE_URL> [MAIN_DATABASE_URL]");
    process.exit(1);
  }

  console.log("Connecting to backup database...");
  const backupPrisma = new PrismaClient({
    datasources: { db: { url: backupUrl } }
  });

  console.log("Connecting to main database...");
  const mainPrisma = new PrismaClient({
    datasources: { db: { url: mainUrl } }
  });

  try {
    console.log("Fetching promoters with avatars from backup database...");
    const backupPromoters = await backupPrisma.promoter.findMany({
      where: {
        NOT: [
          { avatarUrl: null },
          { avatarUrl: "" }
        ]
      },
      select: {
        email: true,
        username: true,
        avatarUrl: true
      }
    });

    console.log(`Found ${backupPromoters.length} promoters with profile pictures in the backup database.`);

    if (backupPromoters.length === 0) {
      console.log("No profile pictures to restore.");
      return;
    }

    let restoredCount = 0;
    for (const bp of backupPromoters) {
      // Find the promoter on the main database by email or username
      const mainPromoter = await mainPrisma.promoter.findFirst({
        where: {
          OR: [
            { email: bp.email },
            { username: bp.username }
          ]
        }
      });

      if (mainPromoter) {
        console.log(`Restoring avatar for: ${mainPromoter.name} (@${mainPromoter.username})...`);
        await mainPrisma.promoter.update({
          where: { id: mainPromoter.id },
          data: { avatarUrl: bp.avatarUrl }
        });
        restoredCount++;
      } else {
        console.log(`Warning: Could not find matching promoter in main database for email ${bp.email} / username ${bp.username}`);
      }
    }

    console.log(`Successfully restored ${restoredCount} profile pictures to the main database!`);
  } catch (err) {
    console.error("Error restoring avatars:", err);
  } finally {
    await backupPrisma.$disconnect();
    await mainPrisma.$disconnect();
  }
}

main().catch(console.error);
