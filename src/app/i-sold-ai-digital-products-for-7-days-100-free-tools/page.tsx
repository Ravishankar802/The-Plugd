import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { I_SOLD_AI_DIGITAL_PRODUCTS_DETAIL_DATA } from "@/lib/playbooks/i-sold-ai-digital-products-for-7-days-100-free-tools-detail";

export const metadata: Metadata = {
  title: "I Sold AI Digital Products For 7 Days (100% FREE Tools) | Plugd",
  description: "Stop guessing what people will buy. Find real problems, create digital products with AI, and turn them into sellable downloads — starting with free tools.",
  openGraph: {
    title: "I Sold AI Digital Products For 7 Days (100% FREE Tools) | Plugd",
    description: "Stop guessing what people will buy. Find real problems, create digital products with AI, and turn them into sellable downloads — starting with free tools.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={I_SOLD_AI_DIGITAL_PRODUCTS_DETAIL_DATA} hasAccess={hasAccess} />;
}
