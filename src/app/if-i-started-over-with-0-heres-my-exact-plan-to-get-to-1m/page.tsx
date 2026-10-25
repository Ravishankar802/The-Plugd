import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { STARTED_OVER_ZERO_TO_1M_DETAIL } from "@/lib/playbooks/started-over-zero-plan-to-1m-detail";

export const metadata: Metadata = {
  title: "If I Started Over With $0, Here’s My Exact Plan to get to $1M | Plugd",
  description: "The uncompromising step-by-step master plan to rebuild from absolute zero to $1,000,000 net worth using high-leverage skills and modern systems.",
  openGraph: {
    title: "If I Started Over With $0, Here’s My Exact Plan to get to $1M | Plugd",
    description: "The uncompromising step-by-step master plan to rebuild from absolute zero to $1,000,000 net worth using high-leverage skills and modern systems.",
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
          (await hasUserAccessToCourse(customer.id, "if-i-started-over-with-0-heres-my-exact-plan-to-get-to-1m", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-53", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={STARTED_OVER_ZERO_TO_1M_DETAIL} hasAccess={hasAccess} />;
}
