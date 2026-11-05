import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { TESTED_3_METHODS_MAKE_1_LAKH_AI_INDIA_DETAIL_DATA } from "@/lib/playbooks/tested-3-methods-make-1-lakh-ai-india-detail";

export const metadata: Metadata = {
  title: "I Tested 3 Methods To Make ₹1 Lakh With AI in India?(Real Results) | Plugd",
  description: "Three AI side hustles. 72 hours to find out which business ideas actually show potential in India.",
  openGraph: {
    title: "I Tested 3 Methods To Make ₹1 Lakh With AI in India?(Real Results) | Plugd",
    description: "Three AI side hustles. 72 hours to find out which business ideas actually show potential in India.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={TESTED_3_METHODS_MAKE_1_LAKH_AI_INDIA_DETAIL_DATA} hasAccess={hasAccess} />;
}
