import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { BLUEPRINT_0_TO_1M_DETAIL_DATA } from "@/lib/playbooks/blueprint-0-to-1m-detail";

export const metadata: Metadata = {
  title: "The Blueprint To Go From $0 To $1,000,000 | Plugd",
  description: "The Blueprint To Go From $0 To $1,000,000. Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "The Blueprint To Go From $0 To $1,000,000 | Plugd",
    description: "The Blueprint To Go From $0 To $1,000,000. Comprehensive slide decks and deep written lessons.",
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
          (await hasUserAccessToCourse(customer.id, "the-blueprint-to-go-from-0-to-1000000", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-10", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={BLUEPRINT_0_TO_1M_DETAIL_DATA} hasAccess={hasAccess} />;
}
