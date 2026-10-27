import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { CAPITALIZE_AI_GOLD_RUSH_DETAIL } from "@/lib/playbooks/smartest-way-capitalize-ai-gold-rush-detail";

export const metadata: Metadata = {
  title: "The SMARTEST Way to Capitalize on the AI Gold Rush | Plugd",
  description: "The picks-and-shovels playbook for building durable, cashflowing AI infrastructure without training models.",
  openGraph: {
    title: "The SMARTEST Way to Capitalize on the AI Gold Rush | Plugd",
    description: "The picks-and-shovels playbook for building durable, cashflowing AI infrastructure without training models.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  const hasAccess = true;

  return <PlaybookDetailView playbook={CAPITALIZE_AI_GOLD_RUSH_DETAIL} hasAccess={hasAccess} />;
}
