import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { ZERO_SKILL_AI_INDIANS_DETAIL_DATA } from "@/lib/playbooks/i-tried-a-zero-skill-ai-side-hustle-for-indians-copy-me-detail";

export const metadata: Metadata = {
  title: "I Tried A Zero Skill AI Side Hustle For Indians (Copy Me) | Plugd",
  description: "Build AI influencers, grow niche audiences, and turn content into income — without needing to be a professional creator.",
  openGraph: {
    title: "I Tried A Zero Skill AI Side Hustle For Indians (Copy Me) | Plugd",
    description: "Build AI influencers, grow niche audiences, and turn content into income — without needing to be a professional creator.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={ZERO_SKILL_AI_INDIANS_DETAIL_DATA} hasAccess={hasAccess} />;
}
