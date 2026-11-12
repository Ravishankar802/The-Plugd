import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { THE_1000_HOUR_1_PERSON_AI_BUSINESS_DETAIL_DATA } from "@/lib/playbooks/the-1000-hour-1-person-ai-business-detail";

export const metadata: Metadata = {
  title: "The $1,000/hour 1-person AI business | Plugd",
  description: "Turn AI into a one-person growth business: find local companies losing customers, fix their marketing funnels, and build a high-value service around measurable results.",
  openGraph: {
    title: "The $1,000/hour 1-person AI business | Plugd",
    description: "Turn AI into a one-person growth business: find local companies losing customers, fix their marketing funnels, and build a high-value service around measurable results.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={THE_1000_HOUR_1_PERSON_AI_BUSINESS_DETAIL_DATA} hasAccess={hasAccess} />;
}
