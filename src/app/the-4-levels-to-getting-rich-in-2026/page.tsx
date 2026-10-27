import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { FOUR_LEVELS_GETTING_RICH_2026_DETAIL_DATA } from "@/lib/playbooks/four-levels-getting-rich-2026-detail";

export const metadata: Metadata = {
  title: "The 4 Levels To Getting RICH in 2026 | Plugd",
  description: "The 4 Levels To Getting RICH in 2026. Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "The 4 Levels To Getting RICH in 2026 | Plugd",
    description: "The 4 Levels To Getting RICH in 2026. Comprehensive slide decks and deep written lessons.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess =
          (await hasUserAccessToCourse(customer.id, "the-4-levels-to-getting-rich-in-2026", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-15", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={FOUR_LEVELS_GETTING_RICH_2026_DETAIL_DATA} hasAccess={hasAccess} />;
}
