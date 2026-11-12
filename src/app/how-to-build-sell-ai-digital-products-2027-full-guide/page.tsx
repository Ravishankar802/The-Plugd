import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { HOW_TO_BUILD_SELL_AI_DIGITAL_PRODUCTS_DETAIL_DATA } from "@/lib/playbooks/how-to-build-sell-ai-digital-products-detail";

export const metadata: Metadata = {
  title: "How to build & sell AI Digital Products (2027 full guide) | Plugd",
  description: "Stop building digital products nobody wants to buy. Learn how to find a paying audience, create an irresistible offer, build an AI-powered product, and turn it into a business that attracts real customers.",
  openGraph: {
    title: "How to build & sell AI Digital Products (2027 full guide) | Plugd",
    description: "Stop building digital products nobody wants to buy. Learn how to find a paying audience, create an irresistible offer, build an AI-powered product, and turn it into a business that attracts real customers.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={HOW_TO_BUILD_SELL_AI_DIGITAL_PRODUCTS_DETAIL_DATA} hasAccess={hasAccess} />;
}
