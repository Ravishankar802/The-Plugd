import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { HOW_TO_MAKE_PROGRESS_FASTER_DETAIL_DATA } from "@/lib/playbooks/how-to-make-progress-faster-than-everyone-detail";

export const metadata: Metadata = {
  title: "How to make progress faster than everyone | Plugd",
  description: "Stop waiting to become good. Start creating, put your work out there, learn from every attempt, and turn consistent improvement into an unfair advantage.",
  openGraph: {
    title: "How to make progress faster than everyone | Plugd",
    description: "Stop waiting to become good. Start creating, put your work out there, learn from every attempt, and turn consistent improvement into an unfair advantage.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={HOW_TO_MAKE_PROGRESS_FASTER_DETAIL_DATA} hasAccess={hasAccess} />;
}
