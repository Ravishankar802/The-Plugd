import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("plugd_session");

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = JSON.parse(sessionCookie.value);
    const email = session.email;

    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, xHandle, payoutMethod, payoutDetails } = body;

    console.log("DEBUG: Updating promoter:", email, body);

    const promoter = await prisma.promoter.upsert({
      where: { email },
      create: {
        email,
        name: name || email.split("@")[0],
        xHandle: xHandle || null,
        payoutMethod: payoutMethod || null,
        payoutDetails: payoutDetails || null,
        referralCode: `${email.split("@")[0]}-${Math.random().toString(36).substring(2, 6)}`,
      },
      update: {
        name,
        xHandle,
        payoutMethod,
        payoutDetails
      }
    });

    return NextResponse.json(promoter);
  } catch (error: any) {
    console.error("Error updating promoter profile:", error);
    return NextResponse.json({ error: error.message || "Failed to update profile" }, { status: 500 });
  }
}
