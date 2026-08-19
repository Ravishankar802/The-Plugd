import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET: Fetch payment settings for the logged-in user
export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const paymentSettings = await prisma.paymentSettings.findUnique({
      where: { userId: session.userId },
    });

    return NextResponse.json(paymentSettings || {
      upiEnabled: false,
      upiId: null,
      upiQrUrl: null,
      bankEnabled: false,
      accountHolder: null,
      accountNumber: null,
      ifsc: null,
      bankName: null,
    });
  } catch (error: any) {
    console.error("[PAYMENTS_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch payment settings" }, { status: 500 });
  }
}

// POST: Upsert payment settings
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { 
      upiEnabled, 
      upiId, 
      upiQrUrl, 
      bankEnabled, 
      accountHolder, 
      accountNumber, 
      ifsc, 
      bankName 
    } = body;

    // Optional validation: if upiEnabled is true, upiId is recommended
    if (upiEnabled && (!upiId || upiId.trim() === "")) {
      return NextResponse.json({ error: "UPI ID is required when UPI payments are enabled" }, { status: 400 });
    }

    // Optional validation: if bankEnabled is true, accountHolder, accountNumber and IFSC are recommended
    if (bankEnabled && (!accountHolder || !accountNumber || !ifsc)) {
      return NextResponse.json(
        { error: "Account holder, account number, and IFSC are required when bank transfer is enabled" },
        { status: 400 }
      );
    }

    const cleanUpiId = upiId ? upiId.trim() : null;
    const cleanAccountHolder = accountHolder ? accountHolder.trim() : null;
    const cleanAccountNumber = accountNumber ? accountNumber.trim() : null;
    const cleanIfsc = ifsc ? ifsc.trim() : null;
    const cleanBankName = bankName ? bankName.trim() : null;

    const paymentSettings = await prisma.paymentSettings.upsert({
      where: { userId: session.userId },
      create: {
        userId: session.userId,
        upiEnabled: !!upiEnabled,
        upiId: cleanUpiId,
        upiQrUrl: upiQrUrl || null,
        bankEnabled: !!bankEnabled,
        accountHolder: cleanAccountHolder,
        accountNumber: cleanAccountNumber,
        ifsc: cleanIfsc,
        bankName: cleanBankName,
      },
      update: {
        upiEnabled: !!upiEnabled,
        upiId: cleanUpiId,
        upiQrUrl: upiQrUrl || null,
        bankEnabled: !!bankEnabled,
        accountHolder: cleanAccountHolder,
        accountNumber: cleanAccountNumber,
        ifsc: cleanIfsc,
        bankName: cleanBankName,
      },
    });

    return NextResponse.json(paymentSettings);
  } catch (error: any) {
    console.error("[PAYMENTS_POST_ERROR]", error);
    return NextResponse.json({ error: "Failed to save payment settings" }, { status: 500 });
  }
}
