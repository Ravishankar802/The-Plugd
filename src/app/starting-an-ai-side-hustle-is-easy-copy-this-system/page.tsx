import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { STARTING_AI_SIDE_HUSTLE_DETAIL_DATA } from "@/lib/playbooks/starting-an-ai-side-hustle-is-easy-copy-this-system-detail";

export const metadata: Metadata = {
  title: "Starting An AI Side Hustle Is EASY (Copy This System) | Plugd",
  description: "Stop building AI projects nobody wants. Find a problem people will actually pay to solve, create an edge competitors can't easily copy, and turn AI into a real customer-getting business.",
  openGraph: {
    title: "Starting An AI Side Hustle Is EASY (Copy This System) | Plugd",
    description: "Stop building AI projects nobody wants. Find a problem people will actually pay to solve, create an edge competitors can't easily copy, and turn AI into a real customer-getting business.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={STARTING_AI_SIDE_HUSTLE_DETAIL_DATA} hasAccess={hasAccess} />;
}
