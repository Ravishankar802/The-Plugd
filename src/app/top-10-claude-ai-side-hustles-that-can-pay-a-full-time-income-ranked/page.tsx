import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { TOP_10_CLAUDE_SIDE_HUSTLES_DETAIL_DATA } from "@/lib/playbooks/top-10-claude-side-hustles-detail";

export const metadata: Metadata = {
  title: "Top 10 Claude AI Side Hustles That Can Pay A Full-Time Income (Ranked) | Plugd",
  description: "10 Claude-powered business models, ranked from weakest to strongest — discover what’s actually worth building, how to get customers, and how to turn AI skills into a real income stream.",
  openGraph: {
    title: "Top 10 Claude AI Side Hustles That Can Pay A Full-Time Income (Ranked) | Plugd",
    description: "10 Claude-powered business models, ranked from weakest to strongest — discover what’s actually worth building, how to get customers, and how to turn AI skills into a real income stream.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={TOP_10_CLAUDE_SIDE_HUSTLES_DETAIL_DATA} hasAccess={hasAccess} />;
}
