import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { STUDENT_HUSTLES_2027_DETAIL } from "@/lib/playbooks/seven-side-hustles-students-2027-detail";

export const metadata: Metadata = {
  title: "7 Side Hustles Students Can Start In 2027 | Plugd",
  description: "7 realistic side hustles to help you earn, build valuable skills, and create opportunities while you're still in college.",
  openGraph: {
    title: "7 Side Hustles Students Can Start In 2027 | Plugd",
    description: "7 realistic side hustles to help you earn, build valuable skills, and create opportunities while you're still in college.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  // Access granted for previewing purchased state
  let hasAccess = true;

  return <PlaybookDetailView playbook={STUDENT_HUSTLES_2027_DETAIL} hasAccess={hasAccess} />;
}
