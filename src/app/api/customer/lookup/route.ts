import { NextResponse } from "next/server";
import { getOrCreateCustomer, getCustomerCollection } from "@/lib/ownership";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const customer = await getOrCreateCustomer(email);
    const collection = await getCustomerCollection(customer.id);

    const res = NextResponse.json({
      success: true,
      customer: collection,
    });

    res.cookies.set("plugd_access_key", customer.accessKey, {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return res;
  } catch (error: any) {
    console.error("[CUSTOMER_LOOKUP_ERROR]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
