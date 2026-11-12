import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { REINVENT_90_DAYS_DETAIL_DATA } from "@/lib/playbooks/how-to-reinvent-yourself-in-90-days-to-become-rich-as-f-ck-detail";

export const metadata: Metadata = {
  title: "how to reinvent yourself in 90 days to become rich as f*ck | Plugd",
  description: "A 90-day personal reinvention blueprint for building a stronger identity, mastering your habits, sharpening execution, and developing the resilience to pursue meaningful success.",
  openGraph: {
    title: "how to reinvent yourself in 90 days to become rich as f*ck | Plugd",
    description: "A 90-day personal reinvention blueprint for building a stronger identity, mastering your habits, sharpening execution, and developing the resilience to pursue meaningful success.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={REINVENT_90_DAYS_DETAIL_DATA} hasAccess={hasAccess} />;
}
