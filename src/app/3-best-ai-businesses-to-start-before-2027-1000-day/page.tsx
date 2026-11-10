import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { THREE_BEST_AI_BUSINESSES_BEFORE_2027_DETAIL_DATA } from "@/lib/playbooks/3-best-ai-businesses-to-start-before-2027-detail";

export const metadata: Metadata = {
  title: "3 BEST AI businesses to start before 2027 ($1,000+/day) | Plugd",
  description: "Three AI businesses. Three paths to $1,000 a day. Discover how to launch an AI agency, sell digital products, or build an AI-powered e-commerce brand — and find the business model with the potential to scale.",
  openGraph: {
    title: "3 BEST AI businesses to start before 2027 ($1,000+/day) | Plugd",
    description: "Three AI businesses. Three paths to $1,000 a day. Discover how to launch an AI agency, sell digital products, or build an AI-powered e-commerce brand — and find the business model with the potential to scale.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={THREE_BEST_AI_BUSINESSES_BEFORE_2027_DETAIL_DATA} hasAccess={hasAccess} />;
}
