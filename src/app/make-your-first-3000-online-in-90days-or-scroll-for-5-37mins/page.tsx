import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { MAKE_3000_ONLINE_90_DAYS_DETAIL_DATA } from "@/lib/playbooks/make-your-first-3000-online-in-90days-or-scroll-for-5-37mins-detail";

export const metadata: Metadata = {
  title: "Make your first $3,000 online in 90days (Or scroll for 5.37mins) | Plugd",
  description: "Learn to turn conversations into commissions — master DM appointment setting, qualify high-ticket prospects, and build a path from beginner to professional sales roles.",
  openGraph: {
    title: "Make your first $3,000 online in 90days (Or scroll for 5.37mins) | Plugd",
    description: "Learn to turn conversations into commissions — master DM appointment setting, qualify high-ticket prospects, and build a path from beginner to professional sales roles.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={MAKE_3000_ONLINE_90_DAYS_DETAIL_DATA} hasAccess={hasAccess} />;
}
