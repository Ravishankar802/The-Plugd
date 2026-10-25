import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { GET_RICH_SERVICE_BUSINESSES_DETAIL_DATA } from "@/lib/playbooks/get-rich-service-businesses-detail";

export const metadata: Metadata = {
  title: "How to Get Rich for Service-Based Businesses (Thank Me Later) | Plugd",
  description: "How to Get Rich for Service-Based Businesses (Thank Me Later). Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "How to Get Rich for Service-Based Businesses (Thank Me Later) | Plugd",
    description: "How to Get Rich for Service-Based Businesses (Thank Me Later). Comprehensive slide decks and deep written lessons.",
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
          (await hasUserAccessToCourse(customer.id, "how-to-get-rich-for-service-based-businesses-thank-me-later", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-19", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={GET_RICH_SERVICE_BUSINESSES_DETAIL_DATA} hasAccess={hasAccess} />;
}
