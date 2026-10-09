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

    let accessKey: string | undefined;
    try {
      const cookieStore = await cookies();
      accessKey = cookieStore.get("plugd_access_key")?.value;
    } catch {
      const cookieHeader = req.headers.get("cookie") || "";
      const match = cookieHeader.match(/plugd_access_key=([^;]+)/);
      accessKey = match ? match[1] : undefined;
    }

    if (!accessKey) {
      return NextResponse.json({ success: false, guest: true });
    }

    const customer = await getCustomerByAccessKey(accessKey);
    if (!customer) {
      return NextResponse.json({ success: false, guest: true });
    }

    await updateCourseProgress({
      customerId: customer.id,
      customerEmail: customer.email,
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
