import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET: Fetch all items for the logged-in user
export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await prisma.item.findMany({
      where: { userId: session.userId },
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json(items);
  } catch (error: any) {
    console.error("[ITEMS_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

// POST: Create a new support item
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { 
      name, 
      shortDescription, 
      description, 
      imageUrl, 
      categoryId, 
      isFeatured, 
      isPublished 
    } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Item name is required" }, { status: 400 });
    }

    const cleanName = name.trim();
    let slug = cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (!slug) slug = "item-" + Date.now().toString().slice(-4);

    // Ensure unique item slug per user
    const existing = await prisma.item.findFirst({
      where: { userId: session.userId, slug },
    });

    if (existing) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 6)}`;
    }

    const count = await prisma.item.count({
      where: { userId: session.userId },
    });

    const item = await prisma.item.create({
      data: {
        userId: session.userId,
        categoryId: categoryId || null,
        name: cleanName,
        slug,
        shortDescription: shortDescription || null,
        description: description || null,
        imageUrl: imageUrl || null,
        isFeatured: !!isFeatured,
        isPublished: isPublished !== false,
        isArchived: false,
        displayOrder: count,
      },
    });

    return NextResponse.json(item);
  } catch (error: any) {
    console.error("[ITEMS_POST_ERROR]", error);
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}

// PUT: Bulk reorder items
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
        prisma.item.update({
          where: { id: item.id, userId: session.userId },
          data: { displayOrder: item.displayOrder },
        })
      )
    );

    return NextResponse.json({ message: "Items reordered successfully" });
  } catch (error: any) {
    console.error("[ITEMS_PUT_ERROR]", error);
    return NextResponse.json({ error: "Failed to reorder items" }, { status: 500 });
  }
}

// PATCH: Update an individual item
export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, name, slug, shortDescription, description, imageUrl, categoryId, isFeatured, isPublished, isArchived } = body;

    if (!id) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    // Prepare update data
    const updateData: any = {};
    if (name !== undefined) updateData.name = name.trim();
    if (shortDescription !== undefined) updateData.shortDescription = shortDescription || null;
    if (description !== undefined) updateData.description = description || null;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl || null;
    if (categoryId !== undefined) updateData.categoryId = categoryId || null;
    if (isFeatured !== undefined) updateData.isFeatured = !!isFeatured;
    if (isPublished !== undefined) updateData.isPublished = !!isPublished;
    if (isArchived !== undefined) updateData.isArchived = !!isArchived;

    // Handle slug update (with validation)
    if (slug !== undefined && slug.trim() !== "") {
      let cleanSlug = slug.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/(^-|-$)/g, "");
      
      // Verify slug uniqueness (excluding current item)
      const existing = await prisma.item.findFirst({
        where: { 
          userId: session.userId, 
          slug: cleanSlug,
          id: { not: id }
        },
      });

      if (existing) {
        cleanSlug = `${cleanSlug}-${Math.random().toString(36).substring(2, 6)}`;
      }
      updateData.slug = cleanSlug;
    }

    const item = await prisma.item.update({
      where: { id, userId: session.userId },
      data: updateData,
    });

    return NextResponse.json(item);
  } catch (error: any) {
    console.error("[ITEMS_PATCH_ERROR]", error);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

// DELETE: Delete an item
export async function DELETE(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    await prisma.item.delete({
      where: { id, userId: session.userId },
    });

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error: any) {
    console.error("[ITEMS_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
