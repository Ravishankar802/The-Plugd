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
    const { 
      name, 
      xHandle, 
      username, 
      avatarUrl,
      payoutMethod, 
      payoutDetails,
      payoutRegion,
      upiId,
      bankAccountName,
      bankAccountNumber,
      bankIfsc,
      intlAccountHolderName,
      intlRoutingNumber,
      intlAccountNumber,
      intlSortCode,
      intlIban,
      intlBicSwift,
      intlBsbCode,
      intlTransitNumber,
      intlInstitutionNumber,
      intlBankCountry,
      paypalEmail
    } = body;

    // Look up existing promoter to enforce that username cannot be changed once set
    const existingPromoter = await prisma.promoter.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingPromoter && existingPromoter.username && username) {
      if (existingPromoter.username.toLowerCase() !== username.trim().toLowerCase()) {
        return NextResponse.json({ error: "Username cannot be changed once set" }, { status: 400 });
      }
    }

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
        avatarUrl: avatarUrl || null,
        payoutMethod: payoutMethod || null,
        payoutDetails: payoutDetails || null,
        payoutRegion: payoutRegion || null,
        upiId: upiId || null,
        bankAccountName: bankAccountName || null,
        bankAccountNumber: bankAccountNumber || null,
        bankIfsc: bankIfsc || null,
        intlAccountHolderName: intlAccountHolderName || null,
        intlRoutingNumber: intlRoutingNumber || null,
        intlAccountNumber: intlAccountNumber || null,
        intlSortCode: intlSortCode || null,
        intlIban: intlIban || null,
        intlBicSwift: intlBicSwift || null,
        intlBsbCode: intlBsbCode || null,
        intlTransitNumber: intlTransitNumber || null,
        intlInstitutionNumber: intlInstitutionNumber || null,
        intlBankCountry: intlBankCountry || null,
        paypalEmail: paypalEmail || null,
        referralCode: username || `${email.split("@")[0]}-${Math.random().toString(36).substring(2, 6)}`,
      },
      update: {
        name,
        xHandle,
        username,
        avatarUrl,
        payoutMethod,
        payoutDetails,
        payoutRegion,
        upiId,
        bankAccountName,
        bankAccountNumber,
        bankIfsc,
        intlAccountHolderName,
        intlRoutingNumber,
        intlAccountNumber,
        intlSortCode,
        intlIban,
        intlBicSwift,
        intlBsbCode,
        intlTransitNumber,
        intlInstitutionNumber,
        intlBankCountry,
        paypalEmail
      }
    });

    return NextResponse.json(promoter);
  } catch (error: any) {
    console.error("Error updating promoter profile:", error);
    return NextResponse.json({ error: error.message || "Failed to update profile" }, { status: 500 });
  }
}
