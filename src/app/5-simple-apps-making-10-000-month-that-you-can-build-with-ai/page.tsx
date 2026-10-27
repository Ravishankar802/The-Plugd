import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { FIVE_SIMPLE_APPS_10K_DETAIL } from "@/lib/playbooks/five-simple-apps-10k-month-ai-detail";

export const metadata: Metadata = {
  title: "5 Simple Apps Making $10,000/month That You Can Build with AI | Plugd",
  description: "How tiny, single-utility micro-apps quietly make $10,000+/month—and how to build them with AI in days.",
  openGraph: {
    title: "5 Simple Apps Making $10,000/month That You Can Build with AI | Plugd",
    description: "How tiny, single-utility micro-apps quietly make $10,000+/month—and how to build them with AI in days.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={FIVE_SIMPLE_APPS_10K_DETAIL} hasAccess={hasAccess} />;
}
