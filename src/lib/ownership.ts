import prisma from "@/lib/prisma";
import crypto from "crypto";
import { generateGiftSlug } from "@/lib/gifts";
import { getTemplateById, Template } from "@/lib/templates";

export interface CustomerWithOwnerships {
  id: string;
  email: string;
  accessKey: string;
  ownerships: {
    id: string;
    templateId: string;
    createdAt: Date;
    status: string;
    template: Template;
    instanceCount: number;
  }[];
}

export function generateAccessKey(): string {
  return crypto.randomBytes(16).toString("hex");
}

export async function getOrCreateCustomer(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  let customer = await prisma.customer.findUnique({
    where: { email: normalizedEmail },
  });

  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        email: normalizedEmail,
        accessKey: generateAccessKey(),
      },
    });
  }

  return customer;
}

export async function getCustomerByAccessKey(accessKey: string) {
  if (!accessKey) return null;
  return prisma.customer.findUnique({
    where: { accessKey },
    include: {
      ownerships: true,
      gifts: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function getCustomerByEmail(email: string) {
  if (!email) return null;
  const normalizedEmail = email.trim().toLowerCase();
  return prisma.customer.findUnique({
    where: { email: normalizedEmail },
    include: {
      ownerships: true,
      gifts: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function hasCustomerPurchasedTemplate(
  customerIdOrEmail: string,
  templateId: string
): Promise<boolean> {
  if (!customerIdOrEmail || !templateId) return false;
  const normalizedTemplate = templateId.trim().toLowerCase();

  const ownership = await prisma.templateOwnership.findFirst({
    where: {
      templateId: normalizedTemplate,
      OR: [
        { customerId: customerIdOrEmail },
        { customer: { email: customerIdOrEmail.trim().toLowerCase() } },
      ],
      status: "ACTIVE",
    },
  });

  return !!ownership;
}

export async function recordTemplateOwnership(params: {
  customerId: string;
  templateId: string;
  paymentId?: string;
  amount?: number;
}) {
  const normalizedTemplate = params.templateId.trim().toLowerCase();

  // Upsert to ensure idempotency and no duplicates
  const ownership = await prisma.templateOwnership.upsert({
    where: {
      customerId_templateId: {
        customerId: params.customerId,
        templateId: normalizedTemplate,
      },
    },
    update: {
      status: "ACTIVE",
      paymentId: params.paymentId || undefined,
    },
    create: {
      customerId: params.customerId,
      templateId: normalizedTemplate,
      status: "ACTIVE",
      amount: params.amount ?? 2.99,
      paymentId: params.paymentId || null,
    },
  });

  return ownership;
}

export async function getCustomerCollection(customerId: string): Promise<CustomerWithOwnerships | null> {
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      ownerships: {
        orderBy: { createdAt: "desc" },
      },
      gifts: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!customer) return null;

  const ownershipsWithDetails = customer.ownerships.map((o) => {
    const template = getTemplateById(o.templateId);
    const instanceCount = customer.gifts.filter(
      (g) => g.mood.toLowerCase() === o.templateId.toLowerCase()
    ).length;

    return {
      id: o.id,
      templateId: o.templateId,
      createdAt: o.createdAt,
      status: o.status,
      template,
      instanceCount,
    };
  });

  return {
    id: customer.id,
    email: customer.email,
    accessKey: customer.accessKey,
    ownerships: ownershipsWithDetails,
  };
}

export async function createTemplateInstance(params: {
  customerId: string;
  templateId: string;
  target?: "her" | "him";
  recipientName?: string;
  senderName?: string;
  customNote?: string;
}) {
  const customer = await prisma.customer.findUnique({
    where: { id: params.customerId },
  });

  if (!customer) {
    throw new Error("Customer not found.");
  }

  const normalizedTemplate = params.templateId.trim().toLowerCase();

  // Verify ownership
  const owns = await hasCustomerPurchasedTemplate(params.customerId, normalizedTemplate);
  if (!owns) {
    throw new Error("Template is not owned by this customer.");
  }

  let slug = generateGiftSlug();
  let existing = await prisma.gift.findUnique({ where: { slug } });
  while (existing) {
    slug = generateGiftSlug();
    existing = await prisma.gift.findUnique({ where: { slug } });
  }

  const instance = await prisma.gift.create({
    data: {
      slug,
      target: params.target || "her",
      mood: normalizedTemplate,
      senderName: params.senderName?.trim() || customer.email.split("@")[0] || null,
      senderEmail: customer.email,
      recipientName: params.recipientName?.trim() || null,
      customNote: params.customNote?.trim() || null,
      status: "PAID", // instances of owned templates are already paid/free to create
      amount: 0,
      currency: "USD",
      customerId: customer.id,
    },
  });

  return instance;
}
