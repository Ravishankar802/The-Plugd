import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { FIVE_SIMPLE_APPS_10K_DETAIL } from "@/lib/playbooks/five-simple-apps-10k-month-ai-detail";

export const metadata: Metadata = {
  title: "5 Simple Apps Making $10,000/month That You Can Build with AI | Plugd",
  description: "Build a tiny app, solve a real problem, and tap into the massive opportunity of subscription-based micro-SaaS.",
  openGraph: {
    title: "5 Simple Apps Making $10,000/month That You Can Build with AI | Plugd",
    description: "Build a tiny app, solve a real problem, and tap into the massive opportunity of subscription-based micro-SaaS.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={FIVE_SIMPLE_APPS_10K_DETAIL} hasAccess={hasAccess} />;
}
