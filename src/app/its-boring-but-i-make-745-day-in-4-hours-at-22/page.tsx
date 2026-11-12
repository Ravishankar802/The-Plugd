import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { ITS_BORING_745_DAY_DETAIL_DATA } from "@/lib/playbooks/its-boring-but-i-make-745-day-in-4-hours-at-22-detail";

export const metadata: Metadata = {
  title: "It's boring but i make $745/day in 4 hours at 22 | Plugd",
  description: "Find products people already want, build a store that sells, and turn Meta ads into a measurable ecommerce system — without wasting weeks guessing what might work.",
  openGraph: {
    title: "It's boring but i make $745/day in 4 hours at 22 | Plugd",
    description: "Find products people already want, build a store that sells, and turn Meta ads into a measurable ecommerce system — without wasting weeks guessing what might work.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={ITS_BORING_745_DAY_DETAIL_DATA} hasAccess={hasAccess} />;
}
