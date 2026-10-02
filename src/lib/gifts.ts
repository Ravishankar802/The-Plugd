import prisma from "@/lib/prisma";
import crypto from "crypto";

export function generateGiftSlug(): string {
  // Generates clean, friendly, url-safe slug e.g. "a8f2k9m4"
  return crypto.randomBytes(4).toString("hex");
}

export interface CreateGiftInput {
  target: "her" | "him";
  mood?: string;
  senderName?: string;
  senderEmail?: string;
  recipientName?: string;
  customNote?: string;
  status?: "PENDING" | "PAID";
  paymentId?: string;
  amount?: number;
}

export async function createGift(input: CreateGiftInput) {
  let slug = generateGiftSlug();
  // Ensure uniqueness
  let existing = await prisma.gift.findUnique({ where: { slug } });
  while (existing) {
    slug = generateGiftSlug();
    existing = await prisma.gift.findUnique({ where: { slug } });
  }

  const gift = await prisma.gift.create({
    data: {
      slug,
      target: input.target,
      mood: input.mood || "romantic",
      senderName: input.senderName?.trim() || null,
      senderEmail: input.senderEmail?.trim() || null,
      recipientName: input.recipientName?.trim() || null,
      customNote: input.customNote?.trim() || null,
      status: input.status || "PAID",
      amount: input.amount ?? 2.99,
      currency: "USD",
      paymentId: input.paymentId || null,
    },
  });

  return gift;
}

export async function getGiftBySlug(slug: string) {
  return prisma.gift.findUnique({
    where: { slug },
  });
}

export async function markGiftOpened(slug: string) {
  try {
    const gift = await prisma.gift.findUnique({ where: { slug } });
    if (gift && !gift.openedAt) {
      await prisma.gift.update({
        where: { slug },
        data: { openedAt: new Date() },
      });
    }
  } catch (error) {
    console.error("Error marking gift opened:", error);
  }
}

export async function saveGiftResponse(slug: string, choice: string) {
  return prisma.gift.update({
    where: { slug },
    data: { responseChoice: choice },
  });
}
