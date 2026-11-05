import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { BUILT_85M_AI_STARTUP_DETAIL_DATA } from "@/lib/playbooks/built-85m-ai-startup-detail";

export const metadata: Metadata = {
  title: "I Built An $85M AI Startup in 5 Months (here's my playbook) | Plugd",
  description: "Build a high-growth startup from the ground up with a proven framework for validating ideas, launching an MVP, attracting customers, and creating repeatable growth systems.",
  openGraph: {
    title: "I Built An $85M AI Startup in 5 Months (here's my playbook) | Plugd",
    description: "Build a high-growth startup from the ground up with a proven framework for validating ideas, launching an MVP, attracting customers, and creating repeatable growth systems.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={BUILT_85M_AI_STARTUP_DETAIL_DATA} hasAccess={hasAccess} />;
}
