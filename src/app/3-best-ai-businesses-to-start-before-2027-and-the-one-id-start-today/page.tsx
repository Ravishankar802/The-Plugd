import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { THREE_BEST_AI_BIZ_2027_DETAIL } from "@/lib/playbooks/three-best-ai-businesses-before-2027-detail";

export const metadata: Metadata = {
  title: "3 best AI businesses to start before 2027 (and the one i'd start today) | Plugd",
  description: "The objective comparison of the top 3 AI business models—and the exact low-drag asset system to launch today.",
  openGraph: {
    title: "3 best AI businesses to start before 2027 (and the one i'd start today) | Plugd",
    description: "The objective comparison of the top 3 AI business models—and the exact low-drag asset system to launch today.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  const hasAccess = true;

  return <PlaybookDetailView playbook={THREE_BEST_AI_BIZ_2027_DETAIL} hasAccess={hasAccess} />;
}
