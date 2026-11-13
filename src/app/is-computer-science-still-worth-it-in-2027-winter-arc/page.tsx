import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { IS_CS_STILL_WORTH_IT_DETAIL_DATA } from "@/lib/playbooks/is-computer-science-still-worth-it-detail";

export const metadata: Metadata = {
  title: "Is Computer Science Still Worth It in 2027? | Winter Arc | Plugd",
  description:
    "AI changed the rules. Your degree alone won't make you job-ready — your ability to build will. Take on the 12-week Winter Arc: master DSA, ship full-stack projects, build AI agents, and discover whether computer science is truly your future.",
  openGraph: {
    title: "Is Computer Science Still Worth It in 2027? | Winter Arc | Plugd",
    description:
      "AI changed the rules. Your degree alone won't make you job-ready — your ability to build will. Take on the 12-week Winter Arc: master DSA, ship full-stack projects, build AI agents, and discover whether computer science is truly your future.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={IS_CS_STILL_WORTH_IT_DETAIL_DATA} hasAccess={hasAccess} />;
}
