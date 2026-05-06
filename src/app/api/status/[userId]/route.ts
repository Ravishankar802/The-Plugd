import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const statuses = await prisma.userAccountStatus.findMany({
      where: {
        userId: userId
      }
    });

    return NextResponse.json(statuses);
  } catch (error) {
    console.error("Status GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
