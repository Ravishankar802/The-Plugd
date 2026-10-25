import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { TRADING_212_GUIDE_DETAIL } from "@/lib/playbooks/trading-212-investing-guide-detail";

export const metadata: Metadata = {
  title: "How to Use Trading 212 in 2026 (Full Investing Guide) | Plugd",
  description: "A comprehensive, practical guide to building an automated compounding wealth machine using Trading 212.",
  openGraph: {
    title: "How to Use Trading 212 in 2026 (Full Investing Guide) | Plugd",
    description: "A comprehensive, practical guide to building an automated compounding wealth machine using Trading 212.",
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
          (await hasUserAccessToCourse(customer.id, "how-to-use-trading-212-in-2026-full-investing-guide", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-33", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={TRADING_212_GUIDE_DETAIL} hasAccess={hasAccess} />;
}
