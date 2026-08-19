import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET: Fetch all categories for the logged-in user
export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const categories = await prisma.category.findMany({
      where: { userId: session.userId },
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error: any) {
    console.error("[CATEGORIES_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST: Create a new category
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, icon } = await req.json();

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const cleanName = name.trim();
    let slug = cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (!slug) slug = "category-" + Date.now().toString().slice(-4);

    // Ensure unique slug per user
    const existing = await prisma.category.findFirst({
      where: { userId: session.userId, slug },
    });

    if (existing) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 6)}`;
    }

    const count = await prisma.category.count({
      where: { userId: session.userId },
    });

    const category = await prisma.category.create({
      data: {
        userId: session.userId,
        name: cleanName,
        slug,
        icon: icon || null,
        displayOrder: count,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    console.error("[CATEGORIES_POST_ERROR]", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}

// PUT: Bulk reorder categories
export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { reorders } = await req.json(); // Array of { id: string, displayOrder: number }

    if (!Array.isArray(reorders)) {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    await Promise.all(
      reorders.map((item) =>
        prisma.category.update({
          where: { id: item.id, userId: session.userId },
          data: { displayOrder: item.displayOrder },
        })
      )
    );

    return NextResponse.json({ message: "Categories reordered successfully" });
  } catch (error: any) {
    console.error("[CATEGORIES_PUT_ERROR]", error);
    return NextResponse.json({ error: "Failed to reorder categories" }, { status: 500 });
  }
}

// DELETE: Delete a category (resets items in it to Uncategorized)
export async function DELETE(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    // 1. Move all items in this category to Uncategorized (categoryId = null)
    await prisma.item.updateMany({
      where: { userId: session.userId, categoryId: id },
      data: { categoryId: null },
    });

    // 2. Delete the category
    await prisma.category.delete({
      where: { id, userId: session.userId },
    });

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    console.error("[CATEGORIES_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
