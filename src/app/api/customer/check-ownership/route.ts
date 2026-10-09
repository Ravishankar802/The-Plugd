import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const courseSlug = url.searchParams.get("courseSlug")?.toLowerCase() || url.searchParams.get("slug")?.toLowerCase() || "men";

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
      return NextResponse.json({ owned: false });
    }

    const customer = await getCustomerByAccessKey(accessKey);
    if (!customer) {
      return NextResponse.json({ owned: false });
    }

    const owns = await hasUserAccessToCourse(customer.id, courseSlug, customer.email);
    return NextResponse.json({
      owned: owns,
      email: customer.email,
    });
  } catch (error: any) {
    return NextResponse.json({ owned: false });
  }
}
