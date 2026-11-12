import { randomBytes } from "crypto";
import prisma from "@/lib/prisma";
import type { Customer, Prisma, PrismaClient } from "@prisma/client";
import { IS_REVIEW_PHASE_FREE_ACCESS } from "@/lib/config";

type DbClient = PrismaClient | Prisma.TransactionClient;

export function generateSecureAccessKey(): string {
  return randomBytes(24).toString("hex");
}

export async function getOrCreateCustomer(email: string, client: DbClient = prisma): Promise<Customer> {
  const cleanEmail = email.trim().toLowerCase();
  let customer = await client.customer.findUnique({
    where: { email: cleanEmail },
  });

  if (!customer) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const accessKey = generateSecureAccessKey();
        customer = await client.customer.create({
          data: {
            email: cleanEmail,
            accessKey,
          },
        });
        break;
      } catch (err: unknown) {
        const error = err as { code?: string; meta?: { target?: string[] | string } };
        const isAccessKeyTarget =
          error?.code === "P2002" &&
          ((Array.isArray(error?.meta?.target) &&
            error.meta.target.some(
              (t: string) => typeof t === "string" && (t === "accessKey" || t.includes("accessKey"))
            )) ||
            (typeof error?.meta?.target === "string" && error.meta.target.includes("accessKey")) ||
            (typeof (err as Error)?.message === "string" &&
              ((err as Error).message.includes("Customer_accessKey_key") ||
                (err as Error).message.includes("accessKey"))));

        if (isAccessKeyTarget && attempt < 2) {
          continue;
        }

        const isEmailTarget =
          error?.code === "P2002" &&
          ((Array.isArray(error?.meta?.target) &&
            error.meta.target.some(
              (t: string) => typeof t === "string" && (t === "email" || t.includes("email"))
            )) ||
            (typeof error?.meta?.target === "string" && error.meta.target.includes("email")) ||
            (typeof (err as Error)?.message === "string" &&
              ((err as Error).message.includes("Customer_email_key") ||
                (err as Error).message.includes("email"))));

        if (isEmailTarget) {
          customer = await client.customer.findUnique({
            where: { email: cleanEmail },
          });
          if (customer) break;
          if (attempt < 2) {
            await new Promise((r) => setTimeout(r, 20 * (attempt + 1)));
            customer = await client.customer.findUnique({
              where: { email: cleanEmail },
            });
            if (customer) break;
            continue;
          }
        }
        throw err;
      }
    }
  }

  if (!customer) {
    throw new Error(`Failed to retrieve or create customer account for ${cleanEmail}`);
  }

  return customer;
}

export async function getCustomerByAccessKey(accessKey: string) {
  if (!accessKey) return null;
  return await prisma.customer.findUnique({
    where: { accessKey },
    include: {
      purchases: true,
    },
  });
}

const COMPLIMENTARY_ACCESS_EMAILS = new Set([
  "ravx003@gmail.com",
]);

export async function hasComplimentaryAccess(
  email?: string | null,
  courseSlug: string = "men"
): Promise<boolean> {
  // During review phase, grant free access across all playbooks (current and future)
  if (IS_REVIEW_PHASE_FREE_ACCESS) {
    return true;
  }
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  const cleanSlug = courseSlug.toLowerCase();

  // Admin and authoring preview capability preservation
  const adminEmails = [
    process.env.ADMIN_EMAIL,
    process.env.NEXT_PUBLIC_ADMIN_EMAIL,
  ]
    .filter(Boolean)
    .map((e) => (e as string).trim().toLowerCase());

  if (adminEmails.includes(cleanEmail) || COMPLIMENTARY_ACCESS_EMAILS.has(cleanEmail)) {
    return true;
  }

  // Query database entitlement
  let grant = await prisma.complimentaryAccess.findUnique({
    where: { email: cleanEmail },
  });

  // Persistent auto-provisioning for designated complimentary emails
  if (!grant && COMPLIMENTARY_ACCESS_EMAILS.has(cleanEmail)) {
    try {
      grant = await prisma.complimentaryAccess.create({
        data: {
          email: cleanEmail,
          courseSlug: "men",
          reason: "LIFETIME_FREE_ACCESS",
        },
      });
    } catch {
      grant = await prisma.complimentaryAccess.findUnique({
        where: { email: cleanEmail },
      });
    }
  }

  if (grant) {
    if (grant.courseSlug === "*" || grant.courseSlug === cleanSlug) return true;
    if (
      (cleanSlug === "build-a-10000-month-ai-service-business-with-just-3-core-tools" && grant.courseSlug === "ai-businesses-02") ||
      (cleanSlug === "ai-businesses-02" && grant.courseSlug === "build-a-10000-month-ai-service-business-with-just-3-core-tools")
    ) {
      return true;
    }
  }

  return false;
}

export async function hasUserAccessToCourse(
  customerId?: string | null,
  courseSlug: string = "men",
  email?: string | null
): Promise<boolean> {
  // During review phase, grant free access across all playbooks (current and future)
  if (IS_REVIEW_PHASE_FREE_ACCESS) {
    return true;
  }
  const cleanSlug = courseSlug.toLowerCase();

  // 1. Check complimentary entitlement
  if (email) {
    const comp = await hasComplimentaryAccess(email, cleanSlug);
    if (comp) return true;
  } else if (customerId) {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      select: { email: true },
    });
    if (customer?.email) {
      const comp = await hasComplimentaryAccess(customer.email, cleanSlug);
      if (comp) return true;
    }
  }

  // 2. Check purchased course
  if (customerId) {
    const purchased = await hasUserPurchasedCourse(customerId, cleanSlug);
    if (purchased) return true;
    if (cleanSlug === "build-a-10000-month-ai-service-business-with-just-3-core-tools") {
      return await hasUserPurchasedCourse(customerId, "ai-businesses-02");
    }
    if (cleanSlug === "ai-businesses-02") {
      return await hasUserPurchasedCourse(customerId, "build-a-10000-month-ai-service-business-with-just-3-core-tools");
    }
  }

  return false;
}

/**
 * Server-side authorization check to verify if a user with a given accessKey
 * has legitimate access to a specific playbook (via purchase or complimentary admin grant).
 * Fails closed if accessKey is absent or invalid.
 */
export async function checkPlaybookAccess(
  accessKey?: string,
  targetSlug: string = "men"
): Promise<boolean> {
  if (IS_REVIEW_PHASE_FREE_ACCESS) return true;
  if (!accessKey) return false;
  try {
    const customer = await getCustomerByAccessKey(accessKey);
    if (customer) {
      return await hasUserAccessToCourse(customer.id, targetSlug, customer.email);
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }
  return false;
}

export interface ManualRefundReviewRecord {
  refund_id: string;
  payment_id: string;
  refund_amount: number;
  currency: string;
  is_partial: true;
  reason?: string | null;
  status: "PENDING_REVIEW";
  created_at: string;
  affected_playbooks: string[];
  customer_email: string;
}

export interface PurchaseProgress {
  completedLessons?: string[];
  lastViewedLessonId?: string;
  status?: "ACTIVE" | "REFUNDED" | "DISPUTED";
  revokedAt?: string;
  revokedPaymentId?: string;
  reactivatedAt?: string;
  updatedAt?: string;
  manualReview?: ManualRefundReviewRecord;
  [key: string]: unknown;
}

export async function hasUserPurchasedCourse(customerId: string, courseSlug: string): Promise<boolean> {
  if (!customerId || !courseSlug) return false;
  const purchase = await prisma.coursePurchase.findUnique({
    where: {
      customerId_courseSlug: {
        customerId,
        courseSlug: courseSlug.toLowerCase(),
      },
    },
  });
  if (!purchase) return false;
  const progress = (purchase.progress as PurchaseProgress | null) || {};
  if (progress.status === "REFUNDED" || progress.status === "DISPUTED") {
    return false;
  }
  return true;
}

export async function recordCoursePurchase({
  customerId,
  courseSlug,
  amount = 3.0,
  paymentId,
  client = prisma,
}: {
  customerId: string;
  courseSlug: string;
  amount?: number;
  paymentId?: string;
  client?: DbClient;
}) {
  const cleanSlug = courseSlug.toLowerCase();

  // 1. Cross-account reuse check: prevent reusing paymentId across different accounts
  if (paymentId) {
    const existingWithPayment = await client.coursePurchase.findFirst({
      where: { paymentId },
    });
    if (existingWithPayment && existingWithPayment.customerId !== customerId) {
      console.warn(
        `[PAYMENT_REUSE_REJECTED] Payment ${paymentId} is already associated with another customer account`
      );
      throw new Error("Payment ID already associated with another customer account");
    }
  }

  // 2. Prevent overwriting existing paymentId or corrupting existing progress
  const existingPurchase = await client.coursePurchase.findUnique({
    where: {
      customerId_courseSlug: {
        customerId,
        courseSlug: cleanSlug,
      },
    },
  });

  if (existingPurchase) {
    const existingProgress = (existingPurchase.progress as PurchaseProgress | null) || {};
    const isRevoked =
      existingProgress.status === "REFUNDED" || existingProgress.status === "DISPUTED";

    // If existing purchase was previously revoked (refunded or disputed), reactivate it on repurchase
    if (isRevoked) {
      console.info(
        `[PURCHASE_REACTIVATED] Reactivating previously ${existingProgress.status} purchase for customer ${customerId}, slug ${cleanSlug} with new paymentId ${paymentId}`
      );
      const updatedProgress = {
        ...existingProgress,
        status: "ACTIVE",
        revokedAt: undefined,
        revokedPaymentId: undefined,
        reactivatedAt: new Date().toISOString(),
      };
      return await client.coursePurchase.update({
        where: { id: existingPurchase.id },
        data: {
          paymentId: paymentId || existingPurchase.paymentId,
          amount,
          currency: "USD",
          progress: updatedProgress as unknown as Prisma.InputJsonValue,
          updatedAt: new Date(),
        },
      });
    }

    // If active and already has a paymentId and incoming paymentId is different, do NOT overwrite
    if (existingPurchase.paymentId && paymentId && existingPurchase.paymentId !== paymentId) {
      console.warn(
        `[PURCHASE_PRESERVED] Customer ${customerId} already has purchase for ${cleanSlug} with paymentId ${existingPurchase.paymentId}. Preserving original purchase record.`
      );
      return existingPurchase;
    }

    // If existing purchase had no paymentId, attach it without modifying progress or amount
    if (!existingPurchase.paymentId && paymentId) {
      return await client.coursePurchase.update({
        where: { id: existingPurchase.id },
        data: { paymentId, updatedAt: new Date() },
      });
    }

    return existingPurchase;
  }

  // 3. New purchase creation
  return await client.coursePurchase.create({
    data: {
      customerId,
      courseSlug: cleanSlug,
      amount,
      currency: "USD",
      paymentId: paymentId || null,
      progress: {
        completedLessons: [],
        lastViewedLessonId: cleanSlug === "men" ? "01-1" : "w-01-01",
        updatedAt: new Date().toISOString(),
      },
    },
  });
}

export async function revokeCoursePurchase({
  paymentId,
  client = prisma,
  reason = "REFUNDED",
}: {
  paymentId: string;
  client?: DbClient;
  reason?: "REFUNDED" | "DISPUTED";
}) {
  if (!paymentId) return null;
  const cleanPaymentId = paymentId.trim();
  const existingList = await client.coursePurchase.findMany({
    where: { paymentId: cleanPaymentId },
  });
  if (!existingList || existingList.length === 0) {
    return null;
  }

  const updatedList = [];
  const nowIso = new Date().toISOString();
  for (const existing of existingList) {
    const currentProgress = (existing.progress as PurchaseProgress | null) || {};
    const updated = await client.coursePurchase.update({
      where: { id: existing.id },
      data: {
        progress: {
          ...currentProgress,
          status: reason,
          revokedAt: nowIso,
          revokedPaymentId: cleanPaymentId,
        } as unknown as Prisma.InputJsonValue,
        updatedAt: new Date(),
      },
    });
    updatedList.push(updated);
  }
  return updatedList[0] || null;
}

export async function recordManualRefundReview({
  refundId,
  paymentId,
  refundAmount,
  currency,
  reason,
  client = prisma,
}: {
  refundId: string;
  paymentId: string;
  refundAmount: number;
  currency: string;
  reason?: string | null;
  client?: DbClient;
}): Promise<ManualRefundReviewRecord> {
  const cleanPaymentId = (paymentId || "").trim();
  const cleanRefundId = (refundId || "").trim();
  const reviewKey = `manual_refund_review_${cleanRefundId}`;

  // Check if review record was already persisted (idempotency)
  try {
    const existing = await client.processedWebhook.findUnique({
      where: { id: reviewKey },
    });
    if (existing) {
      try {
        const parsed = JSON.parse(existing.eventType) as ManualRefundReviewRecord;
        return parsed;
      } catch {
        // Continue if parsing fails
      }
    }
  } catch (err: unknown) {
    // If lookup fails due to database failure, the subsequent create will fail closed
    console.warn(`[MANUAL_REFUND_REVIEW_LOOKUP_WARNING] Error reading existing review for ${cleanRefundId}:`, err);
  }

  // Look up affected purchases and customer email
  const purchases = cleanPaymentId
    ? await client.coursePurchase.findMany({
        where: { paymentId: cleanPaymentId },
      })
    : [];

  const affectedPlaybooks = purchases.map((p) => p.courseSlug);
  let customerEmail = "unknown";

  if (purchases.length > 0 && purchases[0].customerId) {
    try {
      const customer = await client.customer.findUnique({
        where: { id: purchases[0].customerId },
      });
      if (customer?.email) {
        customerEmail = customer.email;
      }
    } catch {
      // Keep customerEmail as unknown if lookup fails
    }
  }

  const reviewRecord: ManualRefundReviewRecord = {
    refund_id: cleanRefundId,
    payment_id: cleanPaymentId,
    refund_amount: refundAmount,
    currency,
    is_partial: true,
    reason: reason || null,
    status: "PENDING_REVIEW",
    created_at: new Date().toISOString(),
    affected_playbooks: affectedPlaybooks,
    customer_email: customerEmail,
  };

  // Persist review record in ProcessedWebhook
  await client.processedWebhook.create({
    data: {
      id: reviewKey,
      eventType: JSON.stringify(reviewRecord),
    },
  });

  // Attach manualReview to each CoursePurchase progress while preserving active entitlement
  for (const purchase of purchases) {
    const currentProgress = (purchase.progress as PurchaseProgress | null) || {};
    try {
      await client.coursePurchase.update({
        where: { id: purchase.id },
        data: {
          progress: {
            ...currentProgress,
            status: currentProgress.status || "ACTIVE",
            manualReview: reviewRecord,
          } as unknown as Prisma.InputJsonValue,
          updatedAt: new Date(),
        },
      });
    } catch (updateErr: unknown) {
      console.warn(`[MANUAL_REFUND_REVIEW_ATTACH_WARNING] Could not attach to purchase ${purchase.id}:`, updateErr);
    }
  }

  return reviewRecord;
}

export async function getManualRefundReviews(client: DbClient = prisma): Promise<ManualRefundReviewRecord[]> {
  try {
    const records = await client.processedWebhook.findMany({
      where: {
        id: {
          startsWith: "manual_refund_review_",
        },
      },
    });
    const reviews: ManualRefundReviewRecord[] = [];
    for (const r of records) {
      try {
        reviews.push(JSON.parse(r.eventType) as ManualRefundReviewRecord);
      } catch {
        // ignore malformed
      }
    }
    return reviews;
  } catch (err: unknown) {
    console.error("[GET_MANUAL_REFUND_REVIEWS_ERROR]", err);
    return [];
  }
}

export async function getUserPurchases(customerId: string, includeRevoked = false) {
  if (!customerId) return [];
  const purchases = await prisma.coursePurchase.findMany({
    where: { customerId },
    orderBy: { createdAt: "desc" },
  });
  if (includeRevoked) return purchases;
  return purchases.filter((p) => {
    const progress = (p.progress as PurchaseProgress | null) || {};
    return progress.status !== "REFUNDED" && progress.status !== "DISPUTED";
  });
}

export async function updateCourseProgress({
  customerId,
  customerEmail,
  courseSlug,
  lessonId,
  isCompleted = false,
}: {
  customerId?: string;
  customerEmail?: string;
  courseSlug: string;
  lessonId: string;
  isCompleted?: boolean;
}) {
  const cleanSlug = courseSlug.toLowerCase();

  // 1. Check purchase record first
  if (customerId) {
    const existing = await prisma.coursePurchase.findUnique({
      where: {
        customerId_courseSlug: {
          customerId,
          courseSlug: cleanSlug,
        },
      },
    });

    if (existing) {
      const currentProgress = (existing.progress as PurchaseProgress | null) || {
        completedLessons: [],
        lastViewedLessonId: lessonId,
      };

      const completedSet = new Set<string>(currentProgress.completedLessons || []);
      if (isCompleted) {
        completedSet.add(lessonId);
      }

      const updatedProgress = {
        ...currentProgress,
        completedLessons: Array.from(completedSet),
        lastViewedLessonId: lessonId,
        updatedAt: new Date().toISOString(),
      };

      return await prisma.coursePurchase.update({
        where: { id: existing.id },
        data: { progress: updatedProgress as unknown as Prisma.InputJsonValue },
      });
    }
  }

  // 2. Check complimentary access record
  let email = customerEmail?.trim().toLowerCase();
  if (!email && customerId) {
    const cust = await prisma.customer.findUnique({
      where: { id: customerId },
      select: { email: true },
    });
    email = cust?.email?.trim().toLowerCase();
  }

  if (email) {
    const compGrant = await prisma.complimentaryAccess.findUnique({
      where: { email },
    });

    if (compGrant) {
      const currentProgress = (compGrant.progress as PurchaseProgress | null) || {
        completedLessons: [],
        lastViewedLessonId: lessonId,
      };

      const completedSet = new Set<string>(currentProgress.completedLessons || []);
      if (isCompleted) {
        completedSet.add(lessonId);
      }

      const updatedProgress = {
        ...currentProgress,
        completedLessons: Array.from(completedSet),
        lastViewedLessonId: lessonId,
        updatedAt: new Date().toISOString(),
      };

      return await prisma.complimentaryAccess.update({
        where: { id: compGrant.id },
        data: { progress: updatedProgress as unknown as Prisma.InputJsonValue },
      });
    }
  }

  return null;
}
