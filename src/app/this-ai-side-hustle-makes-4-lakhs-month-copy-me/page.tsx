import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { THIS_AI_SIDE_HUSTLE_MAKES_4_LAKHS_DETAIL_DATA } from "@/lib/playbooks/this-ai-side-hustle-makes-4-lakhs-month-copy-me-detail";

export const metadata: Metadata = {
  title: "This AI Side Hustle Makes 4 Lakhs/Month (Copy Me) | Plugd",
  description: "Turn AI skills into a real service business: land brands, manage UGC creators, create scroll-stopping ad content, and build your way toward a full-scale agency.",
  openGraph: {
    title: "This AI Side Hustle Makes 4 Lakhs/Month (Copy Me) | Plugd",
    description: "Turn AI skills into a real service business: land brands, manage UGC creators, create scroll-stopping ad content, and build your way toward a full-scale agency.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={THIS_AI_SIDE_HUSTLE_MAKES_4_LAKHS_DETAIL_DATA} hasAccess={hasAccess} />;
}
