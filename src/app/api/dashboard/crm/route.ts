import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const crmData = await prisma.userAccountStatus.findMany({
      where: {
        userId: session.email
      },
      include: {
        account: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(crmData);
  } catch (error) {
    console.error("CRM GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
