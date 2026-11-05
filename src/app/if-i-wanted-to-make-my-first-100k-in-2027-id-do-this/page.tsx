import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { FIRST_100K_IN_2027_DETAIL_DATA } from "@/lib/playbooks/if-i-wanted-to-make-my-first-100k-in-2027-id-do-this-detail";

export const metadata: Metadata = {
  title: "If I Wanted to Make My First $100K in 2027, I’d Do This | Plugd",
  description: "Stop chasing revenue screenshots. Build the skills, income, discipline, and financial habits to earn more, spend smarter, and actually keep your first $100K.",
  openGraph: {
    title: "If I Wanted to Make My First $100K in 2027, I’d Do This | Plugd",
    description: "Stop chasing revenue screenshots. Build the skills, income, discipline, and financial habits to earn more, spend smarter, and actually keep your first $100K.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={FIRST_100K_IN_2027_DETAIL_DATA} hasAccess={hasAccess} />;
}
