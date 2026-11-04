import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { CAPITALIZE_AI_GOLD_RUSH_DETAIL } from "@/lib/playbooks/smartest-way-capitalize-ai-gold-rush-detail";

export const metadata: Metadata = {
  title: "The SMARTEST Way to Capitalize on the AI Gold Rush | Plugd",
  description: "The AI gold rush is here—learn how to turn powerful AI tools into real business opportunities, scalable products, and lasting leverage.",
  openGraph: {
    title: "The SMARTEST Way to Capitalize on the AI Gold Rush | Plugd",
    description: "The AI gold rush is here—learn how to turn powerful AI tools into real business opportunities, scalable products, and lasting leverage.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={CAPITALIZE_AI_GOLD_RUSH_DETAIL} hasAccess={hasAccess} />;
}
