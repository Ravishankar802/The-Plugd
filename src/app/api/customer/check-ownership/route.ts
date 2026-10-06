import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCustomerByAccessKey } from "@/lib/playbooks";
import { hasUserPurchasedCourse } from "@/lib/playbooks";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const courseSlug = url.searchParams.get("courseSlug")?.toLowerCase() || url.searchParams.get("slug")?.toLowerCase();

    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;

    if (!accessKey) {
      return NextResponse.json({ owned: false });
    }

    const customer = await getCustomerByAccessKey(accessKey);
    if (!customer) {
      return NextResponse.json({ owned: false });
    }

    if (courseSlug) {
      const owns = await hasUserPurchasedCourse(customer.id, courseSlug);
      return NextResponse.json({
        owned: owns,
        email: customer.email,
      });
    }

    return NextResponse.json({
      owned: customer.purchases.length > 0,
      email: customer.email,
    });
  } catch (error: any) {
    return NextResponse.json({ owned: false });
  }
}
