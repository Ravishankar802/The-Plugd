import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { getCustomerByAccessKey, getUserPurchases, hasComplimentaryAccess } from "@/lib/playbooks";
import { COURSES } from "@/lib/playbooks-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let accessKey: string | undefined;
    try {
      const cookieStore = await cookies();
      accessKey = cookieStore.get("plugd_access_key")?.value;
    } catch {
      accessKey = undefined;
    }

    if (!accessKey) {
      return NextResponse.json({ playbooks: [] });
    }

    const customer = await getCustomerByAccessKey(accessKey);
    if (!customer) {
      return NextResponse.json({ playbooks: [] });
    }

    const purchases = await getUserPurchases(customer.id);
    const hasAccess = purchases.some((p) => p.courseSlug === "men" || p.courseSlug === "women");
    const hasComp = await hasComplimentaryAccess(customer.email, "men");

    const playbooks: any[] = [];
    const course = COURSES.men;
    const totalLessons = 69;

    if (hasAccess) {
      const p = purchases.find((x) => x.courseSlug === "men") || purchases[0];
      const progressData = (p.progress as any) || {};
      const completedCount = (progressData.completedLessons || []).length;
      const percent = Math.round((completedCount / totalLessons) * 100);
      let lastViewed = progressData.lastViewedLessonId || "01-1";
      if (lastViewed.startsWith("m-") || lastViewed.startsWith("w-")) {
        lastViewed = "01-1";
      }

      playbooks.push({
        id: p.id,
        courseSlug: "men",
        title: course.title,
        shortTitle: course.shortTitle,
        audience: course.audience,
        description: course.description,
        purchasedAt: p.createdAt,
        completedCount,
        totalLessons,
        percent,
        lastViewedLessonId: lastViewed,
      });
    } else if (hasComp) {
      const compGrant = await prisma.complimentaryAccess.findUnique({
        where: { email: customer.email.trim().toLowerCase() },
      });
      const progressData = (compGrant?.progress as any) || {};
      const completedCount = (progressData.completedLessons || []).length;
      const percent = Math.round((completedCount / totalLessons) * 100);
      let lastViewed = progressData.lastViewedLessonId || "01-1";
      if (lastViewed.startsWith("m-") || lastViewed.startsWith("w-")) {
        lastViewed = "01-1";
      }

      playbooks.push({
        id: "comp-dating-playbook",
        courseSlug: "men",
        title: course.title,
        shortTitle: course.shortTitle,
        audience: course.audience,
        description: course.description,
        purchasedAt: compGrant?.grantedAt || new Date(),
        completedCount,
        totalLessons,
        percent,
        lastViewedLessonId: lastViewed,
      });
    }

    return NextResponse.json({ customerEmail: customer.email, playbooks });
  } catch (error: any) {
    console.error("[CUSTOMER_PLAYBOOKS_ERROR]", error);
    return NextResponse.json({ playbooks: [] }, { status: 500 });
  }
}
