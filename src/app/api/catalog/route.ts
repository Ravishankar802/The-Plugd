import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getFullDrinksCatalog } from "@/lib/drinks-catalog";
import { getFullMobilesCatalog } from "@/lib/mobiles-catalog";
import { getMobilesProductImage, getElectronicsProductImage, getFitnessProductImage, getToysProductImage, getVehiclesProductImage } from "@/lib/product-images";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() || "";
    const category = searchParams.get("category")?.trim() || "";
    const limitParam = Number(searchParams.get("limit") || "0");

    const duplicateFallbackSlugs = [
      "lay-s-classic-salted",
      "lay-s-magic-masala",
      "haldiram-s-aloo-bhujia",
      "haldiram-s-bhujia-sev",
      "haldiram-s-mixture",
    ];

    const items = await prisma.catalogItem.findMany({
      where: {
        active: true,
        slug: { notIn: duplicateFallbackSlugs },
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

    let finalItems = items;
    if (category === "drinks" && items.length < 58) {
      const drinksCat = await prisma.category.findUnique({
        where: { slug: "drinks" },
        select: { id: true, name: true, slug: true },
      });
      if (drinksCat) {
        const fullDrinks = getFullDrinksCatalog();
        const existingSlugs = new Set(items.map((i) => i.slug));
        const missing = fullDrinks.filter((d) => !existingSlugs.has(d.id));

        if (missing.length > 0) {
          await prisma.catalogItem.createMany({
            data: missing.map((d) => ({
              name: d.name,
              slug: d.id,
              categoryId: drinksCat.id,
              image: d.imageUrl,
              active: true,
              featured: Boolean(d.featured),
              displayOrder: d.displayOrder,
            })),
            skipDuplicates: true,
          });

          finalItems = await prisma.catalogItem.findMany({
            where: {
              active: true,
              slug: { notIn: duplicateFallbackSlugs },
              category: { slug: "drinks" },
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
          });
        }
      }
    }

    if (category === "drinks") {
      const fullDrinks = getFullDrinksCatalog();
      const imageBySlug = new Map(fullDrinks.map((d) => [d.id, d.imageUrl]));
      finalItems = finalItems.map((item) => {
        const authenticImage = imageBySlug.get(item.slug);
        return authenticImage ? { ...item, image: authenticImage } : item;
      });
    } else if (category === "mobile") {
      const fullMobiles = getFullMobilesCatalog();
      const topPickSlugs = fullMobiles.map((p) => p.id);
      finalItems = finalItems
        .map((item) => ({
          ...item,
          image: getMobilesProductImage(item.slug, item.image || undefined),
        }))
        .sort((a, b) => {
          const idxA = topPickSlugs.indexOf(a.slug);
          const idxB = topPickSlugs.indexOf(b.slug);
          return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
        });
    } else if (category === "electronics") {
      finalItems = finalItems.map((item) => ({
        ...item,
        image: getElectronicsProductImage(item.slug, item.image || undefined),
      }));
    } else if (category === "fitness") {
      finalItems = finalItems.map((item) => ({
        ...item,
        image: getFitnessProductImage(item.slug, item.image || undefined),
      }));
    } else if (category === "toys") {
      finalItems = finalItems.map((item) => ({
        ...item,
        image: getToysProductImage(item.slug, item.image || undefined),
      }));
    } else if (category === "vehicles") {
      finalItems = finalItems.map((item) => ({
        ...item,
        image: getVehiclesProductImage(item.slug, item.image || undefined),
      }));
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
