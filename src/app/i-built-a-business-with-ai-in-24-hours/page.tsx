import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { BUILT_BUSINESS_AI_24H_DETAIL } from "@/lib/playbooks/built-business-ai-24-hours-detail";

export const metadata: Metadata = {
  title: "I Built A Business With AI In 24 Hours | Plugd",
  description: "A practical 24-hour sprint blueprint to validating an offer, launching a live brand, and securing your first paying customer using AI.",
  openGraph: {
    title: "I Built A Business With AI In 24 Hours | Plugd",
    description: "A practical 24-hour sprint blueprint to validating an offer, launching a live brand, and securing your first paying customer using AI.",
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
          (await hasUserAccessToCourse(customer.id, "i-built-a-business-with-ai-in-24-hours", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-44", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={BUILT_BUSINESS_AI_24H_DETAIL} hasAccess={hasAccess} />;
}
