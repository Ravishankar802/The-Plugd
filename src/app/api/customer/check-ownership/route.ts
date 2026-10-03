import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCustomerByAccessKey, getCustomerByEmail, hasCustomerPurchasedTemplate } from "@/lib/ownership";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const templateId = url.searchParams.get("templateId")?.toLowerCase();
    const email = url.searchParams.get("email")?.toLowerCase();

    if (!templateId) {
      return NextResponse.json({ owned: false });
    }

    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;

    let customer = null;
    if (email) {
      customer = await getCustomerByEmail(email);
    } else if (accessKey) {
      customer = await getCustomerByAccessKey(accessKey);
    }

    if (!customer) {
      return NextResponse.json({ owned: false });
    }

    const owns = await hasCustomerPurchasedTemplate(customer.id, templateId);

    return NextResponse.json({
      owned: owns,
      email: customer.email,
    });
  } catch (error: any) {
    return NextResponse.json({ owned: false });
  }
}
