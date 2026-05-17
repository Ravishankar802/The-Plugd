import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const session = await getSession();

    if (!session || !session.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.email;

    const body = await req.json();
    const { name, xHandle, username, payoutMethod, payoutDetails } = body;

    console.log("DEBUG: Updating promoter:", email, body);

    if (username) {
      const trimmed = username.trim();
      if (
        trimmed.length < 3 || 
        trimmed.length > 20 || 
        !/^[a-zA-Z0-9_.]+$/.test(trimmed) || 
        trimmed.startsWith(".") || 
        trimmed.endsWith(".") || 
        trimmed.includes("..")
      ) {
        return NextResponse.json({ error: "Invalid username format" }, { status: 400 });
      }

      const existing = await prisma.promoter.findFirst({
        where: {
          username: {
            equals: trimmed,
            mode: 'insensitive'
          },
          email: {
            not: email
          }
        }
      });

      if (existing) {
        return NextResponse.json({ error: "Username is already taken" }, { status: 400 });
      }
    }

    const promoter = await prisma.promoter.upsert({
      where: { email },
      create: {
        email,
        name: name || email.split("@")[0],
        xHandle: xHandle || null,
        username: username || null,
        payoutMethod: payoutMethod || null,
        payoutDetails: payoutDetails || null,
        referralCode: username || `${email.split("@")[0]}-${Math.random().toString(36).substring(2, 6)}`,
      },
      update: {
        name,
        xHandle,
        username,
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
