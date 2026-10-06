import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCustomerByAccessKey, updateCourseProgress } from "@/lib/playbooks";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { courseSlug, lessonId, isCompleted } = body;

    if (!courseSlug || !lessonId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;

    if (!accessKey) {
      return NextResponse.json({ success: false, guest: true });
    }

    const customer = await getCustomerByAccessKey(accessKey);
    if (!customer) {
      return NextResponse.json({ success: false, guest: true });
    }

    await updateCourseProgress({
      customerId: customer.id,
      courseSlug,
      lessonId,
      isCompleted,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[PROGRESS_API_ERROR]", error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
