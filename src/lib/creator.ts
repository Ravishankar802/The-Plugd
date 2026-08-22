import prisma from "@/lib/prisma";

export async function ensureCreatorProfile(userId: string) {
  return prisma.creatorProfile.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
}

export function getCreatorDisplayName(profile: { displayName: string | null } | null, fallback: string) {
  return profile?.displayName?.trim() || fallback;
}
