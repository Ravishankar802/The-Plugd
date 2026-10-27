import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { SALES_TACTIC_10M_DETAIL } from "@/lib/playbooks/sales-tactic-god-tier-money-detail";

export const metadata: Metadata = {
  title: "Want to made god-tier money? Use this sales tactic (Made me $10M) | Plugd",
  description: "A masterclass in high-ticket diagnostic selling: quantifying client financial pain and closing enterprise deals without pressure.",
  openGraph: {
    title: "Want to made god-tier money? Use this sales tactic (Made me $10M) | Plugd",
    description: "A masterclass in high-ticket diagnostic selling: quantifying client financial pain and closing enterprise deals without pressure.",
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
          (await hasUserAccessToCourse(customer.id, "want-to-made-god-tier-money-use-this-sales-tactic-made-me-10m", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-41", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={SALES_TACTIC_10M_DETAIL} hasAccess={hasAccess} />;
}
