import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCustomerByAccessKey, getCustomerByEmail, createTemplateInstance } from "@/lib/ownership";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const templateId = String(body.templateId || "").trim().toLowerCase();
    const target = body.target === "him" ? "him" : "her";
    const recipientName = (body.recipientName || "").trim();
    const senderName = (body.senderName || "").trim();
    const customNote = (body.customNote || "").trim();

    if (!templateId) {
      return NextResponse.json({ error: "Missing template ID." }, { status: 400 });
    }

    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    const emailParam = (body.email || "").trim().toLowerCase();

    let customer = null;
    if (accessKey) {
      customer = await getCustomerByAccessKey(accessKey);
    } else if (emailParam) {
      customer = await getCustomerByEmail(emailParam);
    }

    if (!customer) {
      return NextResponse.json(
        { error: "Please log in with your email to generate links for your templates." },
        { status: 401 }
      );
    }

    // Generate new instance of the owned template (FREE, unlimited)
    const instance = await createTemplateInstance({
      customerId: customer.id,
      templateId,
      target,
      recipientName,
      senderName,
      customNote,
    });

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "https://theplugd.com";

    return NextResponse.json({
      success: true,
      instance: {
        id: instance.id,
        slug: instance.slug,
        templateId: instance.mood,
        target: instance.target,
        recipientName: instance.recipientName,
        senderName: instance.senderName,
        shareUrl: `${origin}/g/${instance.slug}`,
        createdAt: instance.createdAt,
      },
    });
  } catch (error: any) {
    console.error("[CREATE_INSTANCE_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to create link." }, { status: 400 });
  }
}
