import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() || "";
    const category = searchParams.get("category")?.trim() || "";
    const limitParam = Number(searchParams.get("limit") || "0");

    const items = await prisma.catalogItem.findMany({
      where: {
        active: true,
        ...(category ? { category: { slug: category } } : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { shortDescription: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
                { category: { name: { contains: q, mode: "insensitive" } } },
              ],
            }
          : {}),
      },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        categoryId: true,
        featured: true,
        displayOrder: true,
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { name: "asc" }],
      ...(limitParam > 0 ? { take: limitParam } : {}),
    });

    return NextResponse.json(items, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("[CATALOG_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch catalog items" }, { status: 500 });
  }
}
