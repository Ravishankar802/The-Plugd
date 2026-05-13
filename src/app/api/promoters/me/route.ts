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

    const promoter = await prisma.promoter.update({
      where: { email },
      data: {
        name,
        xHandle,
        payoutMethod,
        payoutDetails
      }
    });

    return NextResponse.json(promoter);
  } catch (error) {
    console.error("Error updating promoter profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
