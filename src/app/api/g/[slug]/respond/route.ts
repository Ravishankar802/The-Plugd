import { NextResponse } from "next/server";
import { saveGiftResponse } from "@/lib/gifts";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export async function POST(req: Request, { params }: RouteProps) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const choice = String(body.choice || "").trim();

    if (!choice) {
      return NextResponse.json({ error: "Choice is required" }, { status: 400 });
    }

    const updated = await saveGiftResponse(slug, choice);

    return NextResponse.json({
      success: true,
      choice: updated.responseChoice,
    });
  } catch (error: any) {
    console.error("[GIFT_RESPOND_ERROR]", error);
    return NextResponse.json(
      { error: error?.message || "Failed to record response" },
      { status: 500 }
    );
  }
}
