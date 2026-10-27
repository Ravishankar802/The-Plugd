import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { AI_SIDE_HUSTLES_2026_DETAIL_DATA } from "@/lib/playbooks/ai-side-hustles-2026-detail";

export const metadata: Metadata = {
  title: "The Best AI Side Hustles To Start In 2026 (No Skills) | Plugd",
  description: "The Best AI Side Hustles To Start In 2026 (No Skills). Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "The Best AI Side Hustles To Start In 2026 (No Skills) | Plugd",
    description: "The Best AI Side Hustles To Start In 2026 (No Skills). Comprehensive slide decks and deep written lessons.",
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
          (await hasUserAccessToCourse(customer.id, "the-best-ai-side-hustles-to-start-in-2026-no-skills", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-06", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={AI_SIDE_HUSTLES_2026_DETAIL_DATA} hasAccess={hasAccess} />;
}
