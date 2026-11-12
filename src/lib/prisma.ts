import { PrismaClient } from "@prisma/client";
import { assertLocalTestDatabase } from "@/lib/test-db-guard";

export const prismaClientSingleton = () => {
  if (process.env.DODO_PAYMENTS_MODE === "test_mode") {
    assertLocalTestDatabase();
  }
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
