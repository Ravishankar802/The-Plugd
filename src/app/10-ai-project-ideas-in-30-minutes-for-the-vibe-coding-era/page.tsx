import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { TEN_AI_PROJECT_IDEAS_DETAIL_DATA } from "@/lib/playbooks/10-ai-project-ideas-detail";

export const metadata: Metadata = {
  title: "10 AI Project ideas in 30 minutes for the Vibe coding era | Plugd",
  description:
    "10 AI projects. 30 minutes. One idea could become your next big build. Explore the frontier of vibe coding — from autonomous coding agents and AI-powered code reviewers to agent infrastructure, reasoning benchmarks, and real-time voice systems. Stop building another generic AI wrapper. Build something that actually works.",
  openGraph: {
    title: "10 AI Project ideas in 30 minutes for the Vibe coding era | Plugd",
    description:
      "10 AI projects. 30 minutes. One idea could become your next big build. Explore the frontier of vibe coding — from autonomous coding agents and AI-powered code reviewers to agent infrastructure, reasoning benchmarks, and real-time voice systems. Stop building another generic AI wrapper. Build something that actually works.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={TEN_AI_PROJECT_IDEAS_DETAIL_DATA} hasAccess={hasAccess} />;
}
