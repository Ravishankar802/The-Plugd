import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { getCustomerByAccessKey, getUserPurchases, hasComplimentaryAccess } from "@/lib/playbooks";
import { COURSES } from "@/lib/playbooks-data";
import { ALL_PLAYBOOK_SUMMARIES } from "@/lib/playbooks-catalog";
import { DATING_PLAYBOOK_SUMMARY } from "@/lib/categories";

export const dynamic = "force-dynamic";

interface ProgressData {
  completedLessons?: string[];
  lastViewedLessonId?: string;
  [key: string]: unknown;
}

export async function GET() {
  try {
    let accessKey: string | undefined;
    try {
      const cookieStore = await cookies();
      accessKey = cookieStore.get("plugd_access_key")?.value;
    } catch {
      accessKey = undefined;
    }

    if (!accessKey) {
      return NextResponse.json({ playbooks: [], purchasedSlugs: [] });
    }

    const customer = await getCustomerByAccessKey(accessKey);
    if (!customer) {
      return NextResponse.json({ playbooks: [], purchasedSlugs: [] });
    }

    const purchases = await getUserPurchases(customer.id);
    const hasDatingComp = await hasComplimentaryAccess(customer.email, "men");

    interface PlaybookLibraryItem {
      id: string;
      courseSlug: string;
      categorySlug: string;
      categoryName: string;
      title: string;
      shortTitle: string;
      thumbnail?: string;
      audience: string;
      description: string;
      purchasedAt: Date;
      completedCount: number;
      totalLessons: number;
      percent: number;
      lastViewedLessonId: string;
    }

    const playbooks: PlaybookLibraryItem[] = [];
    const seenSlugs = new Set<string>();

    // Process all active purchases across the catalog
    for (const p of purchases) {
      const slug = p.courseSlug.toLowerCase();
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);

      const progressData = (p.progress as ProgressData | null) || {};
      const completedCount = (progressData.completedLessons || []).length;
      let lastViewed = progressData.lastViewedLessonId || "01-1";

      if (slug === "men" || slug === "women" || slug === "dating-playbook") {
        const course = COURSES.men;
        const totalLessons = 69;
        const percent = Math.round((completedCount / totalLessons) * 100);
        if (lastViewed.startsWith("m-") || lastViewed.startsWith("w-")) {
          lastViewed = "01-1";
        }
        playbooks.push({
          id: p.id,
          courseSlug: slug,
          categorySlug: "dating",
          categoryName: "Dating",
          title: course.title,
          shortTitle: course.shortTitle,
          thumbnail: DATING_PLAYBOOK_SUMMARY.thumbnail,
          audience: course.audience,
          description: course.description,
          purchasedAt: p.createdAt,
          completedCount,
          totalLessons,
          percent,
          lastViewedLessonId: lastViewed,
        });
      } else {
        const catalogItem = ALL_PLAYBOOK_SUMMARIES.find(
          (item) => item.slug.toLowerCase() === slug
        );
        const totalLessons = catalogItem?.lessonsCount || 24;
        const percent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

        playbooks.push({
          id: p.id,
          courseSlug: slug,
          categorySlug: catalogItem?.categorySlug || "ai-businesses",
          categoryName: catalogItem?.categoryName || "AI",
          title: catalogItem?.title || slug,
          shortTitle: catalogItem?.title || slug,
          thumbnail: catalogItem?.thumbnail || "/images/placeholder.png",
          audience: "General",
          description: catalogItem?.description || "",
          purchasedAt: p.createdAt,
          completedCount,
          totalLessons,
          percent,
          lastViewedLessonId: lastViewed,
        });
      }
    }

    // Include complimentary Dating Playbook if granted and not already in purchases
    if (hasDatingComp && !seenSlugs.has("men") && !seenSlugs.has("dating-playbook")) {
      const compGrant = await prisma.complimentaryAccess.findUnique({
        where: { email: customer.email.trim().toLowerCase() },
      });
      const progressData = (compGrant?.progress as ProgressData | null) || {};
      const completedCount = (progressData.completedLessons || []).length;
      const totalLessons = 69;
      const percent = Math.round((completedCount / totalLessons) * 100);
      let lastViewed = progressData.lastViewedLessonId || "01-1";
      if (lastViewed.startsWith("m-") || lastViewed.startsWith("w-")) {
        lastViewed = "01-1";
      }

      playbooks.push({
        id: "comp-dating-playbook",
        courseSlug: "men",
        categorySlug: "dating",
        categoryName: "Dating",
        title: COURSES.men.title,
        shortTitle: COURSES.men.shortTitle,
        thumbnail: DATING_PLAYBOOK_SUMMARY.thumbnail,
        audience: COURSES.men.audience,
        description: COURSES.men.description,
        purchasedAt: compGrant?.grantedAt || new Date(),
        completedCount,
        totalLessons,
        percent,
        lastViewedLessonId: lastViewed,
      });
      seenSlugs.add("men");
    }

    return NextResponse.json({
      customerEmail: customer.email,
      playbooks,
      purchasedSlugs: Array.from(seenSlugs),
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("[CUSTOMER_PLAYBOOKS_ERROR]", errorMsg);
    return NextResponse.json({ playbooks: [], purchasedSlugs: [] }, { status: 500 });
  }
}
