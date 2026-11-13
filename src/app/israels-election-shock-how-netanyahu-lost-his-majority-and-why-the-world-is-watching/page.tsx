import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { ISRAELS_ELECTION_SHOCK_DETAIL_DATA } from "@/lib/playbooks/israels-election-shock-detail";

export const metadata: Metadata = {
  title: "Israel's Election Shock! | How Netanyahu Lost His Majority and Why the World Is Watching? | Plugd",
  description:
    "One election. 120 seats. A political deadlock with consequences far beyond Israel. Discover how coalition politics, military strategy and regional conflict connect to global oil markets, shipping routes, India's national interests and the future of international trade.",
  openGraph: {
    title: "Israel's Election Shock! | How Netanyahu Lost His Majority and Why the World Is Watching? | Plugd",
    description:
      "One election. 120 seats. A political deadlock with consequences far beyond Israel. Discover how coalition politics, military strategy and regional conflict connect to global oil markets, shipping routes, India's national interests and the future of international trade.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={ISRAELS_ELECTION_SHOCK_DETAIL_DATA} hasAccess={hasAccess} />;
}
