import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { AI_AGENTS_2027_DETAIL_DATA } from "@/lib/playbooks/ai-agents-the-most-valuable-skill-you-can-learn-in-2027-detail";

export const metadata: Metadata = {
  title: "AI Agents: The Most Valuable Skill You Can Learn in 2027 (Full Course) | Plugd",
  description: "A hands-on guide to building your own AI operating system using context, tools, reusable skills, and automated workflows.",
  openGraph: {
    title: "AI Agents: The Most Valuable Skill You Can Learn in 2027 (Full Course) | Plugd",
    description: "A hands-on guide to building your own AI operating system using context, tools, reusable skills, and automated workflows.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={AI_AGENTS_2027_DETAIL_DATA} hasAccess={hasAccess} />;
}
