import { NextResponse } from "next/server";
import { getCachedCategories } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await getCachedCategories();

    return NextResponse.json(categories, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("[CATEGORIES_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
