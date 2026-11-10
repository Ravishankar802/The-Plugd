import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { HOW_ID_START_20K_MONTH_AI_AGENCY_DETAIL_DATA } from "@/lib/playbooks/how-id-start-20k-month-ai-agency-detail";

export const metadata: Metadata = {
  title: "How I'd Start a $20K/Month AI Agency With Claude in 30 Days | Plugd",
  description: "Build an AI agency that sells business results, not just AI tools. Find profitable niches, land high-value clients, partner with developers, and turn real business problems into a $20K/month agency opportunity — with a focused 30-day launch roadmap.",
  openGraph: {
    title: "How I'd Start a $20K/Month AI Agency With Claude in 30 Days | Plugd",
    description: "Build an AI agency that sells business results, not just AI tools. Find profitable niches, land high-value clients, partner with developers, and turn real business problems into a $20K/month agency opportunity — with a focused 30-day launch roadmap.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={HOW_ID_START_20K_MONTH_AI_AGENCY_DETAIL_DATA} hasAccess={hasAccess} />;
}
