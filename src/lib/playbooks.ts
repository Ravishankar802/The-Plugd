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
  amount = 49.0,
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
        lastViewedLessonId: cleanSlug === "men" ? "m-01-01" : "w-01-01",
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
  courseSlug,
  lessonId,
  isCompleted = false,
}: {
  customerId: string;
  courseSlug: string;
  lessonId: string;
  isCompleted?: boolean;
}) {
  const cleanSlug = courseSlug.toLowerCase();
  const existing = await prisma.coursePurchase.findUnique({
    where: {
      customerId_courseSlug: {
        customerId,
        courseSlug: cleanSlug,
      },
    },
  });

  if (!existing) return null;

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
    where: {
      id: existing.id,
    },
    data: {
      progress: updatedProgress,
    },
  });
}
