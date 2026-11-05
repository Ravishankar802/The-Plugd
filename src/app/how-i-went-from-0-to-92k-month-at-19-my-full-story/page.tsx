import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { HOW_I_WENT_FROM_0_TO_92K_MONTH_AT_19_DETAIL_DATA } from "@/lib/playbooks/how-i-went-from-0-to-92k-month-at-19-my-full-story-detail";

export const metadata: Metadata = {
  title: "How I Went From $0 to $92K/Month at 19 (My Full Story) | Plugd",
  description: "From a $13 freelance job to a reported $92K business month — learn the skills, sales systems, and hard lessons behind building a business that actually lasts.",
  openGraph: {
    title: "How I Went From $0 to $92K/Month at 19 (My Full Story) | Plugd",
    description: "From a $13 freelance job to a reported $92K business month — learn the skills, sales systems, and hard lessons behind building a business that actually lasts.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={HOW_I_WENT_FROM_0_TO_92K_MONTH_AT_19_DETAIL_DATA} hasAccess={hasAccess} />;
}
