import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getFullMobilesCatalog } from "@/lib/mobiles-catalog";
import { getProductDisplayImage } from "@/lib/product-images";

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
        addedCount: true,
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { name: "asc" }],
      ...(limitParam > 0 ? { take: limitParam } : {}),
    });

    let finalItems = items.map((item) => ({
      ...item,
      image: getProductDisplayImage(item.category.slug, item.slug, item.image),
    }));

    if (category === "mobile") {
      const fullMobiles = getFullMobilesCatalog();
      const topPickSlugs = fullMobiles.map((p) => p.id);
      finalItems.sort((a, b) => {
        const idxA = topPickSlugs.indexOf(a.slug);
        const idxB = topPickSlugs.indexOf(b.slug);
        return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
      });
    }

    return NextResponse.json(finalItems, {
      headers: {
        "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("[CATALOG_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch catalog items" }, { status: 500 });
  }
}

