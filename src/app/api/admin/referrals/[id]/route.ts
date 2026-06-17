import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "ravx003@gmail.com";
    const isAdmin = session.email.toLowerCase() === adminEmail.toLowerCase();
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const promoterId = parseInt(params.id);
    if (isNaN(promoterId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();
    const { 
      name, 
      username, 
      email, 
      xHandle, 
      avatarUrl,
      phoneNumber,
      totalEarned,
      pendingPayout,
      totalPaid,
      payoutRegion,
      upiId,
      paypalEmail,
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
      intlBankCountry
    } = body;

    // Check if username already taken by another promoter
    if (username) {
      const existing = await prisma.promoter.findFirst({
        where: {
          username: { equals: username.trim(), mode: "insensitive" },
          id: { not: promoterId }
        }
      });
      if (existing) {
        return NextResponse.json({ error: "Username already taken" }, { status: 400 });
      }
    }

    // Check if email already taken by another promoter
    if (email) {
      const existing = await prisma.promoter.findFirst({
        where: {
          email: { equals: email.trim().toLowerCase(), mode: "insensitive" },
          id: { not: promoterId }
        }
      });
      if (existing) {
        return NextResponse.json({ error: "Email already taken" }, { status: 400 });
      }
    }

    // Check if the promoter is in the top 50 earners
    const top50 = await prisma.promoter.findMany({
      orderBy: { totalEarned: "desc" },
      select: { id: true },
      take: 50
    });
    const isTop50 = top50.some(p => p.id === promoterId);
    const finalPhoneNumber = isTop50 ? null : (phoneNumber || null);

    const updated = await prisma.promoter.update({
      where: { id: promoterId },
      data: {
        name,
        username: username ? username.trim() : null,
        email: email ? email.trim().toLowerCase() : undefined,
        xHandle,
        avatarUrl,
        phoneNumber: finalPhoneNumber,
        totalEarned: totalEarned !== undefined ? parseFloat(totalEarned) : undefined,
        totalConversions: totalEarned !== undefined ? Math.floor(parseFloat(totalEarned) / 100) : undefined,
        pendingPayout: pendingPayout !== undefined ? parseFloat(pendingPayout) : undefined,
        totalPaid: totalPaid !== undefined ? parseFloat(totalPaid) : undefined,
        upiId,
        paypalEmail,
        payoutRegion,
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
        referralCode: username ? username.trim() : undefined
      }
    });

    return NextResponse.json({ success: true, promoter: updated });
  } catch (error: any) {
    console.error("Admin promoter update error:", error);
    return NextResponse.json({ error: error.message || "Failed to update promoter" }, { status: 500 });
  }
}
