import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCustomerByAccessKey, getUserPurchases } from "@/lib/playbooks";
import { COURSES } from "@/lib/playbooks-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;

    if (!accessKey) {
      return NextResponse.json({ playbooks: [] });
    }

    const customer = await getCustomerByAccessKey(accessKey);
    if (!customer) {
      return NextResponse.json({ playbooks: [] });
    }

    const purchases = await getUserPurchases(customer.id);
    const playbooks = purchases.map((p) => {
      const slug = p.courseSlug as "men" | "women";
      const course = COURSES[slug] || COURSES.men;
      const progressData = (p.progress as any) || {};

      const totalLessons = course.modules.reduce(
        (sum, m) => sum + (m.lessons?.length || 0),
        0
      );
      const completedCount = (progressData.completedLessons || []).length;
      const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

      return {
        id: p.id,
        courseSlug: slug,
        title: course.title,
        shortTitle: course.shortTitle,
        audience: course.audience,
        description: course.description,
        purchasedAt: p.createdAt,
        completedCount,
        totalLessons,
        percent,
        lastViewedLessonId: progressData.lastViewedLessonId || (slug === "men" ? "m-01-01" : "w-01-01"),
      };
    });

    return NextResponse.json({ customerEmail: customer.email, playbooks });
  } catch (error: any) {
    console.error("[CUSTOMER_PLAYBOOKS_ERROR]", error);
    return NextResponse.json({ playbooks: [] }, { status: 500 });
  }
}
