import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { START_BUSINESS_FROM_SCRATCH_DETAIL_DATA } from "@/lib/playbooks/if-i-had-to-start-a-business-from-scratch-id-do-this-detail";

export const metadata: Metadata = {
  title: "If I Had To Start a Business From Scratch, I'd Do This | Plugd",
  description: "A step-by-step guide to turning your existing skills into a profitable service business through real customer results, referrals, consistent outreach, and repeatable systems.",
  openGraph: {
    title: "If I Had To Start a Business From Scratch, I'd Do This | Plugd",
    description: "A step-by-step guide to turning your existing skills into a profitable service business through real customer results, referrals, consistent outreach, and repeatable systems.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={START_BUSINESS_FROM_SCRATCH_DETAIL_DATA} hasAccess={hasAccess} />;
}
