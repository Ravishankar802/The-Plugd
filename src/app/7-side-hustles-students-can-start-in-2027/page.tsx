import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { STUDENT_HUSTLES_2027_DETAIL } from "@/lib/playbooks/seven-side-hustles-students-2027-detail";

export const metadata: Metadata = {
  title: "7 Side Hustles Students Can Start In 2027 | Plugd",
  description: "The battle-tested, zero-capital side hustle roadmap engineered specifically for students entering the 2027 digital economy.",
  openGraph: {
    title: "7 Side Hustles Students Can Start In 2027 | Plugd",
    description: "The battle-tested, zero-capital side hustle roadmap engineered specifically for students entering the 2027 digital economy.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  // Access granted for previewing purchased state
  const hasAccess = true;

  return <PlaybookDetailView playbook={STUDENT_HUSTLES_2027_DETAIL} hasAccess={hasAccess} />;
}
