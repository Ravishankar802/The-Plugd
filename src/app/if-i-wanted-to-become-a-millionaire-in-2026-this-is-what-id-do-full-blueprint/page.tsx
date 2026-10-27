import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { BECOME_MILLIONAIRE_2026_BLUEPRINT_DETAIL } from "@/lib/playbooks/become-millionaire-2026-full-blueprint-detail";

export const metadata: Metadata = {
  title: "If I Wanted To Become a Millionaire in 2026, This Is What I'd Do | Plugd",
  description: "The definitive step-by-step master execution blueprint to build an unassailable seven-figure net worth in 2026 using modern leverage and asymmetric systems.",
  openGraph: {
    title: "If I Wanted To Become a Millionaire in 2026, This Is What I'd Do | Plugd",
    description: "The definitive step-by-step master execution blueprint to build an unassailable seven-figure net worth in 2026 using modern leverage and asymmetric systems.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  const hasAccess = true;

  return <PlaybookDetailView playbook={BECOME_MILLIONAIRE_2026_BLUEPRINT_DETAIL} hasAccess={hasAccess} />;
}
