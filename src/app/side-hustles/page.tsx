import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { ZERO_AD_CUSTOMERS_DETAIL_DATA } from "@/lib/playbooks/zero-ad-customers-detail";

export const metadata: Metadata = {
  title: "10 Ways to Find Paying Customers Without Spending on Ads | Plugd",
  description: "10 Ways to Find Paying Customers Without Spending on Ads. Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "10 Ways to Find Paying Customers Without Spending on Ads | Plugd",
    description: "10 Ways to Find Paying Customers Without Spending on Ads. Comprehensive slide decks and deep written lessons.",
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
          (await hasUserAccessToCourse(customer.id, "side-hustles", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "side-hustles-08", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={ZERO_AD_CUSTOMERS_DETAIL_DATA} hasAccess={hasAccess} />;
}
