import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Auth helper to check if user is paid
async function checkAuth(userId: string) {
  if (!userId) return null;
  const account = await prisma.account.findFirst({
    where: {
      email: {
        equals: userId,
        mode: 'insensitive'
      },
      status: 'paid'
    }
  });
  return account;
}

export async function POST(req: Request) {
  try {
    const { userId, accountId, status } = await req.json();

    if (!userId || !accountId || !status) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const auth = await checkAuth(userId);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Upsert status
    const result = await prisma.userAccountStatus.upsert({
      where: {
        userId_accountId: {
          userId: userId,
          accountId: parseInt(accountId)
        }
      },
      update: {
        status: status
      },
      create: {
        userId: userId,
        accountId: parseInt(accountId),
        status: status
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Status POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId, accountId } = await req.json();

    if (!userId || !accountId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const auth = await checkAuth(userId);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.userAccountStatus.delete({
      where: {
        userId_accountId: {
          userId: userId,
          accountId: parseInt(accountId)
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Status DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
