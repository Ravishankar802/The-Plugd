import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureCatalogSeeded } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureCatalogSeeded();

    const categories = await prisma.category.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[CATEGORIES_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
