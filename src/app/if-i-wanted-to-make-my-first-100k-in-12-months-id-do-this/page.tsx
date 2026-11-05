import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { FIRST_100K_12_MONTHS_DETAIL_DATA } from "@/lib/playbooks/if-i-wanted-to-make-my-first-100k-in-12-months-id-do-this-detail";

export const metadata: Metadata = {
  title: "If I Wanted to Make My First $100K in 12 months, I’d Do This | Plugd",
  description: "Turn your skills into a six-figure business — find a profitable niche, craft an irresistible offer, land your first paying clients, and build towards $100K in annual revenue.",
  openGraph: {
    title: "If I Wanted to Make My First $100K in 12 months, I’d Do This | Plugd",
    description: "Turn your skills into a six-figure business — find a profitable niche, craft an irresistible offer, land your first paying clients, and build towards $100K in annual revenue.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={FIRST_100K_12_MONTHS_DETAIL_DATA} hasAccess={hasAccess} />;
}
