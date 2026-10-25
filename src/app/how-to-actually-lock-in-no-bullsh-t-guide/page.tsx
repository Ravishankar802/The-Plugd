import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { ACTUALLY_LOCK_IN_GUIDE_DETAIL } from "@/lib/playbooks/actually-lock-in-guide-detail";

export const metadata: Metadata = {
  title: "How to ACTUALLY Lock In (No Bullsh*t Guide) | Plugd",
  description: "A ruthless, uncompromising manual to breaking brain rot, eliminating cheap dopamine, and executing deep work relentlessly.",
  openGraph: {
    title: "How to ACTUALLY Lock In (No Bullsh*t Guide) | Plugd",
    description: "A ruthless, uncompromising manual to breaking brain rot, eliminating cheap dopamine, and executing deep work relentlessly.",
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
          (await hasUserAccessToCourse(customer.id, "how-to-actually-lock-in-no-bullsh-t-guide", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-39", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={ACTUALLY_LOCK_IN_GUIDE_DETAIL} hasAccess={hasAccess} />;
}
