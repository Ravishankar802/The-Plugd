import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCustomerByAccessKey, getCustomerByEmail, getCustomerCollection } from "@/lib/ownership";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const emailParam = url.searchParams.get("email");

    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;

    let customer = null;
    if (emailParam) {
      customer = await getCustomerByEmail(emailParam);
    } else if (accessKey) {
      customer = await getCustomerByAccessKey(accessKey);
    }

    if (!customer) {
      return NextResponse.json({ authenticated: false, customer: null });
    }

    const collection = await getCustomerCollection(customer.id);

    return NextResponse.json({
      authenticated: true,
      customer: collection,
    });
  } catch (error: any) {
    console.error("[CUSTOMER_ME_ERROR]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
