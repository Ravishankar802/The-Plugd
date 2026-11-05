import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { NIGHT_AI_MONEY_DETAIL_DATA } from "@/lib/playbooks/the-new-way-to-make-money-with-ai-at-night-even-if-you-have-a-9-5-detail";

export const metadata: Metadata = {
  title: "The New Way to Make Money with AI at Night (Even If You Have a 9-5) | Plugd",
  description: "A step-by-step guide to launching an AI-powered service business alongside your 9-to-5, from choosing a profitable niche to landing and delivering your first client project.",
  openGraph: {
    title: "The New Way to Make Money with AI at Night (Even If You Have a 9-5) | Plugd",
    description: "A step-by-step guide to launching an AI-powered service business alongside your 9-to-5, from choosing a profitable niche to landing and delivering your first client project.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={NIGHT_AI_MONEY_DETAIL_DATA} hasAccess={hasAccess} />;
}
