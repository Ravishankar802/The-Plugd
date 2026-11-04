import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { THREE_BEST_AI_BIZ_2027_DETAIL } from "@/lib/playbooks/three-best-ai-businesses-before-2027-detail";

export const metadata: Metadata = {
  title: "3 best AI businesses to start before 2027 (and the one i'd start today) | Plugd",
  description: "3 AI business models. One clear roadmap to find your opportunity, build your offer, and turn AI into a real business.",
  openGraph: {
    title: "3 best AI businesses to start before 2027 (and the one i'd start today) | Plugd",
    description: "3 AI business models. One clear roadmap to find your opportunity, build your offer, and turn AI into a real business.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={THREE_BEST_AI_BIZ_2027_DETAIL} hasAccess={hasAccess} />;
}
