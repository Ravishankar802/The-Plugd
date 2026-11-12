import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { HOW_I_BUILD_10CR_AGENCY_DETAIL_DATA } from "@/lib/playbooks/how-i-build-a-10cr-agency-without-any-knowledge-detail";

export const metadata: Metadata = {
  title: "How I build a 10cr Agency Without any Knowledge | Plugd",
  description: "A practical blueprint for turning one marketable skill into a full-service agency with high-value clients, monthly retainers, a capable team, and scalable operations.",
  openGraph: {
    title: "How I build a 10cr Agency Without any Knowledge | Plugd",
    description: "A practical blueprint for turning one marketable skill into a full-service agency with high-value clients, monthly retainers, a capable team, and scalable operations.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={HOW_I_BUILD_10CR_AGENCY_DETAIL_DATA} hasAccess={hasAccess} />;
}
