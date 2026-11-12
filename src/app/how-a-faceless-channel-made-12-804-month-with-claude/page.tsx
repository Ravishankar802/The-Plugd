import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { FACELESS_CHANNEL_12K_CLAUDE_DETAIL_DATA } from "@/lib/playbooks/how-a-faceless-channel-made-12-804-month-with-claude-detail";

export const metadata: Metadata = {
  title: "How a Faceless Channel Made $12,804/Month With Claude | Plugd",
  description: "A practical blueprint for building a faceless YouTube business with a consistent AI-generated host, automated video production, and digital products as a revenue stream.",
  openGraph: {
    title: "How a Faceless Channel Made $12,804/Month With Claude | Plugd",
    description: "A practical blueprint for building a faceless YouTube business with a consistent AI-generated host, automated video production, and digital products as a revenue stream.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={FACELESS_CHANNEL_12K_CLAUDE_DETAIL_DATA} hasAccess={hasAccess} />;
}
