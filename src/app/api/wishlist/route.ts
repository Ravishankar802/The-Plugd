import { WishlistItemType } from "@prisma/client";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ensureCatalogSeeded, resolveWishlistItem } from "@/lib/catalog";
import { slugify } from "@/lib/slug";

export const dynamic = "force-dynamic";

async function createWishlistSlug(userId: string, label: string, existingId?: string) {
  const baseSlug = slugify(label);
  let candidate = baseSlug;
  let suffix = 2;

  while (
    await prisma.wishlistItem.findFirst({
      where: {
        userId,
        slug: candidate,
        ...(existingId ? { id: { not: existingId } } : {}),
      },
      select: { id: true },
    })
  ) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

async function getWishlist(userId: string) {
  const items = await prisma.wishlistItem.findMany({
    where: { userId },
    include: {
      category: true,
      catalogItem: {
        include: {
          category: true,
        },
      },
    },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
  });

  return items.map(resolveWishlistItem);
}

export async function GET() {
  const session = await getSession();

  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureCatalogSeeded();
    return NextResponse.json(await getWishlist(session.userId));
  } catch (error) {
    console.error("[WISHLIST_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSession();

  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureCatalogSeeded();
    const body = await req.json();
    const itemCount = await prisma.wishlistItem.count({ where: { userId: session.userId } });

    if (body.catalogItemId) {
      const catalogItem = await prisma.catalogItem.findUnique({
        where: { id: body.catalogItemId },
      });

      if (!catalogItem) {
        return NextResponse.json({ error: "Catalog item not found" }, { status: 404 });
      }

      const existing = await prisma.wishlistItem.findFirst({
        where: {
          userId: session.userId,
          catalogItemId: catalogItem.id,
        },
      });

      if (existing) {
        return NextResponse.json({ error: "This item is already in your wishlist." }, { status: 409 });
      }

      await prisma.wishlistItem.create({
        data: {
          userId: session.userId,
          categoryId: catalogItem.categoryId,
          catalogItemId: catalogItem.id,
          itemType: WishlistItemType.CATALOG,
          slug: await createWishlistSlug(session.userId, catalogItem.name),
          isPublished: true,
          displayOrder: itemCount,
        },
      });
    } else {
      const name = body.name?.trim();
      if (!name) {
        return NextResponse.json({ error: "Custom item name is required." }, { status: 400 });
      }

      await prisma.wishlistItem.create({
        data: {
          userId: session.userId,
          categoryId: body.categoryId || null,
          itemType: WishlistItemType.CUSTOM,
          slug: await createWishlistSlug(session.userId, name),
          name,
          image: body.image || null,
          shortDescription: body.shortDescription?.trim() || null,
          description: body.description?.trim() || null,
          externalUrl: body.externalUrl?.trim() || null,
          personalNote: body.personalNote?.trim() || null,
          isPublished: true,
          displayOrder: itemCount,
        },
      });
    }

    return NextResponse.json(await getWishlist(session.userId));
  } catch (error) {
    console.error("[WISHLIST_POST_ERROR]", error);
    return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getSession();

  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const existing = await prisma.wishlistItem.findFirst({
      where: {
        id: body.id,
        userId: session.userId,
      },
      include: {
        catalogItem: true,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Wishlist item not found" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};

    if (body.isFeatured !== undefined) updateData.isFeatured = Boolean(body.isFeatured);
    if (body.isPublished !== undefined) updateData.isPublished = Boolean(body.isPublished);
    if (body.personalNote !== undefined) updateData.personalNote = body.personalNote?.trim() || null;

    if (existing.itemType === WishlistItemType.CUSTOM) {
      if (body.name !== undefined) {
        const nextName = body.name?.trim() || existing.name || "wishlist-item";
        updateData.name = nextName;
        updateData.slug = await createWishlistSlug(session.userId, nextName, existing.id);
      }
      if (body.categoryId !== undefined) updateData.categoryId = body.categoryId || null;
      if (body.image !== undefined) updateData.image = body.image || null;
      if (body.shortDescription !== undefined) updateData.shortDescription = body.shortDescription?.trim() || null;
      if (body.description !== undefined) updateData.description = body.description?.trim() || null;
      if (body.externalUrl !== undefined) updateData.externalUrl = body.externalUrl?.trim() || null;
    }

    await prisma.wishlistItem.update({
      where: { id: existing.id },
      data: updateData,
    });

    return NextResponse.json(await getWishlist(session.userId));
  } catch (error) {
    console.error("[WISHLIST_PATCH_ERROR]", error);
    return NextResponse.json({ error: "Failed to update wishlist item" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getSession();

  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { reorders } = await req.json();
    if (!Array.isArray(reorders)) {
      return NextResponse.json({ error: "Invalid reorder payload" }, { status: 400 });
    }

    await Promise.all(
      reorders.map((entry: { id: string; displayOrder: number }) =>
        prisma.wishlistItem.updateMany({
          where: { id: entry.id, userId: session.userId },
          data: { displayOrder: entry.displayOrder },
        }),
      ),
    );

    return NextResponse.json(await getWishlist(session.userId));
  } catch (error) {
    console.error("[WISHLIST_PUT_ERROR]", error);
    return NextResponse.json({ error: "Failed to reorder wishlist items" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getSession();

  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Wishlist item ID is required" }, { status: 400 });
    }

    await prisma.wishlistItem.deleteMany({
      where: {
        id,
        userId: session.userId,
      },
    });

    return NextResponse.json(await getWishlist(session.userId));
  } catch (error) {
    console.error("[WISHLIST_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Failed to delete wishlist item" }, { status: 500 });
  }
}
