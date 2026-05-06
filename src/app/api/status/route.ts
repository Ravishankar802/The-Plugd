import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.email) {
      return NextResponse.json([]);
    }

    const statuses = await prisma.userAccountStatus.findMany({
      where: {
        userId: session.email
      }
    });

    return NextResponse.json(statuses);
  } catch (error) {
    console.error("Status GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { accountId, status } = await req.json();

    if (!accountId || !status) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const userId = session.email;

    // Upsert status
    const result = await prisma.userAccountStatus.upsert({
      where: {
        userId_accountId: {
          userId,
          accountId: parseInt(accountId)
        }
      },
      update: {
        status: status
      },
      create: {
        userId,
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
    const session = await getSession();
    if (!session || !session.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { accountId } = await req.json();

    if (!accountId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const userId = session.email;

    await prisma.userAccountStatus.deleteMany({
      where: {
        userId: userId,
        accountId: parseInt(accountId)
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Status DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
