import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { BORING_51_DAY_IN_1_HOUR_DETAIL_DATA } from "@/lib/playbooks/boring-51-day-in-1-hour-detail";

export const metadata: Metadata = {
  title: "It’s boring but I make $51/day in 1 hour at 22 | Plugd",
  description: "Find what people want, source it for less, and learn how to turn simple Depop listings into a potential side income using AliExpress and AI.",
  openGraph: {
    title: "It’s boring but I make $51/day in 1 hour at 22 | Plugd",
    description: "Find what people want, source it for less, and learn how to turn simple Depop listings into a potential side income using AliExpress and AI.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={BORING_51_DAY_IN_1_HOUR_DETAIL_DATA} hasAccess={hasAccess} />;
}
