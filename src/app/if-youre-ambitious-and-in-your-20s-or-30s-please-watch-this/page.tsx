import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { AMBITIOUS_IN_20S_OR_30S_DETAIL_DATA } from "@/lib/playbooks/ambitious-in-20s-or-30s-detail";

export const metadata: Metadata = {
  title: "If you're ambitious and in your 20s or 30s, please watch this. | Plugd",
  description: "A practical guide to turning ambition into meaningful progress through calculated risks, valuable skills, deep focus, decisive action, and consistent execution.",
  openGraph: {
    title: "If you're ambitious and in your 20s or 30s, please watch this. | Plugd",
    description: "A practical guide to turning ambition into meaningful progress through calculated risks, valuable skills, deep focus, decisive action, and consistent execution.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={AMBITIOUS_IN_20S_OR_30S_DETAIL_DATA} hasAccess={hasAccess} />;
}
