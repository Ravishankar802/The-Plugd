import { NextResponse } from "next/server";
import { searchCatalog } from "@/lib/search";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() || "";
    const limit = Number(searchParams.get("limit") || "12");

    if (!q) {
      return NextResponse.json({
        query: "",
        categories: [],
        subcategories: [],
        items: [],
        totalMatches: 0,
      });
    }

    const results = await searchCatalog(q, { limitItems: limit });

    return NextResponse.json({
      query: q,
      ...results,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to execute search" },
      { status: 500 }
    );
  }
}
