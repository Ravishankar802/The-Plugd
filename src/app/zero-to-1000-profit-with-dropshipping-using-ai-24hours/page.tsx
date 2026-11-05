import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { ZERO_TO_1000_DROPSHIPPING_DETAIL_DATA } from "@/lib/playbooks/zero-to-1000-profit-dropshipping-ai-24hours-detail";

export const metadata: Metadata = {
  title: "Zero To $1,000 Profit with Dropshipping Using AI (24HOURS) | Plugd",
  description: "A fast-paced AI-assisted dropshipping playbook covering product discovery, Shopify store creation, ad creative production, Meta Ads testing, and the numbers behind profitable ecommerce.",
  openGraph: {
    title: "Zero To $1,000 Profit with Dropshipping Using AI (24HOURS) | Plugd",
    description: "A fast-paced AI-assisted dropshipping playbook covering product discovery, Shopify store creation, ad creative production, Meta Ads testing, and the numbers behind profitable ecommerce.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={ZERO_TO_1000_DROPSHIPPING_DETAIL_DATA} hasAccess={hasAccess} />;
}
