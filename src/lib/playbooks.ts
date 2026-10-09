import prisma from "@/lib/prisma";

export async function getOrCreateCustomer(email: string) {
  const cleanEmail = email.trim().toLowerCase();
  let customer = await prisma.customer.findUnique({
    where: { email: cleanEmail },
  });

  if (!customer) {
    const accessKey =
      Math.random().toString(36).substring(2, 10) +
      Date.now().toString(36) +
      Math.random().toString(36).substring(2, 8);

    customer = await prisma.customer.create({
      data: {
        email: cleanEmail,
        accessKey,
      },
    });
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
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  const cleanSlug = courseSlug.toLowerCase();

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
    return grant.courseSlug === "*" || grant.courseSlug === cleanSlug;
  }

  return false;
}

export async function hasUserAccessToCourse(
  customerId?: string | null,
  courseSlug: string = "men",
  email?: string | null
): Promise<boolean> {
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
    return await hasUserPurchasedCourse(customerId, cleanSlug);
  }

  return false;
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
  return Boolean(purchase);
}

export async function recordCoursePurchase({
  customerId,
  courseSlug,
  amount = 3.0,
  paymentId,
}: {
  customerId: string;
  courseSlug: string;
  amount?: number;
  paymentId?: string;
}) {
  const cleanSlug = courseSlug.toLowerCase();
  return await prisma.coursePurchase.upsert({
    where: {
      customerId_courseSlug: {
        customerId,
        courseSlug: cleanSlug,
      },
    },
    update: {
      amount,
      paymentId: paymentId || undefined,
      updatedAt: new Date(),
    },
    create: {
      customerId,
      courseSlug: cleanSlug,
      amount,
      paymentId: paymentId || null,
      progress: {
        completedLessons: [],
        lastViewedLessonId: cleanSlug === "men" ? "01-1" : "w-01-01",
        updatedAt: new Date().toISOString(),
      },
    },
  });
}

export async function getUserPurchases(customerId: string) {
  if (!customerId) return [];
  return await prisma.coursePurchase.findMany({
    where: { customerId },
    orderBy: { createdAt: "desc" },
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
      const currentProgress = (existing.progress as any) || {
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
        data: { progress: updatedProgress },
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
      const currentProgress = (compGrant.progress as any) || {
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
        data: { progress: updatedProgress },
      });
    }
  }

  return null;
}
