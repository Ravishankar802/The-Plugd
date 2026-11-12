import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { BUILD_AI_INFLUENCER_10K_DETAIL_DATA } from "@/lib/playbooks/build-a-10k-month-ai-influencer-in-9-mins-detail";

export const metadata: Metadata = {
  title: "Build a $10k/month Ai influencer in 9 mins... | Plugd",
  description: "Build a virtual influencer from scratch, turn AI-generated videos into an audience, and monetise that attention through direct brand partnerships — without ever becoming the face of the account.",
  openGraph: {
    title: "Build a $10k/month Ai influencer in 9 mins... | Plugd",
    description: "Build a virtual influencer from scratch, turn AI-generated videos into an audience, and monetise that attention through direct brand partnerships — without ever becoming the face of the account.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={BUILD_AI_INFLUENCER_10K_DETAIL_DATA} hasAccess={hasAccess} />;
}
