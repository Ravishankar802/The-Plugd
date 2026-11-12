import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { I_TRIED_23_EASY_SIDE_HUSTLES_DETAIL_DATA } from "@/lib/playbooks/23-easy-side-hustles-detail";

export const metadata: Metadata = {
  title: "I tried 23 easy SIDE HUSTLES that actually WORKED (copy my $10,000/month strategy) | Plugd",
  description: "23 side hustles. Four ways to make money. One practical roadmap to turn spare time, existing skills, and overlooked opportunities into income — and build something that can grow beyond your hours.",
  openGraph: {
    title: "I tried 23 easy SIDE HUSTLES that actually WORKED (copy my $10,000/month strategy) | Plugd",
    description: "23 side hustles. Four ways to make money. One practical roadmap to turn spare time, existing skills, and overlooked opportunities into income — and build something that can grow beyond your hours.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={I_TRIED_23_EASY_SIDE_HUSTLES_DETAIL_DATA} hasAccess={hasAccess} />;
}
