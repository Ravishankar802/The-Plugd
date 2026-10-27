import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { USE_AI_IN_BUSINESS_2026_DETAIL_DATA } from "@/lib/playbooks/use-ai-in-business-2026-detail";

export const metadata: Metadata = {
  title: "How to Use AI in Your Business in 2026 | Plugd",
  description: "How to Use AI in Your Business in 2026. Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "How to Use AI in Your Business in 2026 | Plugd",
    description: "How to Use AI in Your Business in 2026. Comprehensive slide decks and deep written lessons.",
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
          (await hasUserAccessToCourse(customer.id, "how-to-use-ai-in-your-business-in-2026", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-23", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={USE_AI_IN_BUSINESS_2026_DETAIL_DATA} hasAccess={hasAccess} />;
}
