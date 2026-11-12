import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { MARKETING_AGENTS_TOO_GOOD_DETAIL_DATA } from "@/lib/playbooks/marketing-agents-are-too-good-now-detail";

export const metadata: Metadata = {
  title: "Marketing Agents Are Too Good Now | Plugd",
  description: "Go beyond basic automations. Learn to build AI marketing agents that understand customer behaviour, create campaigns, manage ads, and improve their decisions using real business data.",
  openGraph: {
    title: "Marketing Agents Are Too Good Now | Plugd",
    description: "Go beyond basic automations. Learn to build AI marketing agents that understand customer behaviour, create campaigns, manage ads, and improve their decisions using real business data.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={MARKETING_AGENTS_TOO_GOOD_DETAIL_DATA} hasAccess={hasAccess} />;
}
