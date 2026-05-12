const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`;
  console.log('Tables:', result);
  
  for (const table of result) {
    const count = await prisma.$queryRawUnsafe(`SELECT count(*) FROM "${table.tablename}"`);
    console.log(`Table ${table.tablename} count:`, count);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
