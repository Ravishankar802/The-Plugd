import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { HOW_TO_MAKE_MORE_MONEY_THAN_YOU_DESERVE_DETAIL_DATA } from "@/lib/playbooks/how-to-make-more-money-than-you-deserve-detail";

export const metadata: Metadata = {
  title: "How To Make More Money Than You Deserve (My 2027 Framework) | Plugd",
  description: "Stop working harder on businesses with limited upside. Learn how to spot the business models, market gaps, and competitive advantages that can make your effort worth significantly more.",
  openGraph: {
    title: "How To Make More Money Than You Deserve (My 2027 Framework) | Plugd",
    description: "Stop working harder on businesses with limited upside. Learn how to spot the business models, market gaps, and competitive advantages that can make your effort worth significantly more.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={HOW_TO_MAKE_MORE_MONEY_THAN_YOU_DESERVE_DETAIL_DATA} hasAccess={hasAccess} />;
}
