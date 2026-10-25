import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { AI_REVOLUTION_8_WAYS_DETAIL_DATA } from "@/lib/playbooks/ai-revolution-8-ways-detail";

export const metadata: Metadata = {
  title: "The A.I. Revolution: 8 Ways to get RICH | Plugd",
  description: "The A.I. Revolution: 8 Ways to get RICH. Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "The A.I. Revolution: 8 Ways to get RICH | Plugd",
    description: "The A.I. Revolution: 8 Ways to get RICH. Comprehensive slide decks and deep written lessons.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess =
          (await hasUserAccessToCourse(customer.id, "the-a-i-revolution-8-ways-to-get-rich", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-16", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={AI_REVOLUTION_8_WAYS_DETAIL_DATA} hasAccess={hasAccess} />;
}
