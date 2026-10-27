import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { STARTED_OVER_ZERO_TO_1M_DETAIL } from "@/lib/playbooks/started-over-zero-plan-to-1m-detail";

export const metadata: Metadata = {
  title: "If I Started Over With $0, Here’s My Exact Plan to get to $1M | Plugd",
  description: "The uncompromising step-by-step master plan to rebuild from absolute zero to $1,000,000 net worth using high-leverage skills and modern systems.",
  openGraph: {
    title: "If I Started Over With $0, Here’s My Exact Plan to get to $1M | Plugd",
    description: "The uncompromising step-by-step master plan to rebuild from absolute zero to $1,000,000 net worth using high-leverage skills and modern systems.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={STARTED_OVER_ZERO_TO_1M_DETAIL} hasAccess={hasAccess} />;
}
