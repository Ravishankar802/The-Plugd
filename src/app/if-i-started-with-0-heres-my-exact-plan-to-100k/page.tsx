import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { ZERO_TO_100K_PLAN_DETAIL_DATA } from "@/lib/playbooks/if-i-started-with-0-heres-my-exact-plan-to-100k-detail";

export const metadata: Metadata = {
  title: "If I Started With $0, Here's My Exact Plan To $100K | Plugd",
  description: "Starting from $0? Build your first $100K with an eight-step system to cut financial dead weight, increase your income, launch a second income stream, and turn what you earn into lasting wealth.",
  openGraph: {
    title: "If I Started With $0, Here's My Exact Plan To $100K | Plugd",
    description: "Starting from $0? Build your first $100K with an eight-step system to cut financial dead weight, increase your income, launch a second income stream, and turn what you earn into lasting wealth.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={ZERO_TO_100K_PLAN_DETAIL_DATA} hasAccess={hasAccess} />;
}
