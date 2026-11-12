import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { STARTED_OVER_ZERO_TO_1M_DETAIL } from "@/lib/playbooks/started-over-zero-plan-to-1m-detail";

export const metadata: Metadata = {
  title: "If I Started Over With $0, Here’s My Exact Plan to get to $1M | Plugd",
  description: "Starting from $0? Here's the exact blueprint to turn one valuable skill, one painful problem, and one paying customer into the foundation of a million-dollar business.",
  openGraph: {
    title: "If I Started Over With $0, Here’s My Exact Plan to get to $1M | Plugd",
    description: "Starting from $0? Here's the exact blueprint to turn one valuable skill, one painful problem, and one paying customer into the foundation of a million-dollar business.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={STARTED_OVER_ZERO_TO_1M_DETAIL} hasAccess={hasAccess} />;
}
