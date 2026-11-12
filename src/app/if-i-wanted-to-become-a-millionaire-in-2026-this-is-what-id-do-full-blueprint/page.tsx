import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { BECOME_MILLIONAIRE_2026_BLUEPRINT_DETAIL } from "@/lib/playbooks/become-millionaire-2026-full-blueprint-detail";

export const metadata: Metadata = {
  title: "If I Wanted To Become a Millionaire in 2026, This Is What I'd Do | Plugd",
  description: "This playbook breaks the journey to your first million into three practical levels: building yourself, acquiring customers, and creating leverage that compounds over time. Learn how to choose a profitable market, identify customers with valuable problems, design irresistible offers, and master marketing and sales using the Core Four and CLOSER frameworks. Discover how to increase customer lifetime value, build teams, create repeatable systems, and protect your focus as your business grows. Includes a practical 2027 operating plan, actionable worksheets, outreach scripts, scorecards, and execution checklists to help turn ambition into a structured business-building strategy.",
  openGraph: {
    title: "If I Wanted To Become a Millionaire in 2026, This Is What I'd Do | Plugd",
    description: "This playbook breaks the journey to your first million into three practical levels: building yourself, acquiring customers, and creating leverage that compounds over time. Learn how to choose a profitable market, identify customers with valuable problems, design irresistible offers, and master marketing and sales using the Core Four and CLOSER frameworks. Discover how to increase customer lifetime value, build teams, create repeatable systems, and protect your focus as your business grows. Includes a practical 2027 operating plan, actionable worksheets, outreach scripts, scorecards, and execution checklists to help turn ambition into a structured business-building strategy.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={BECOME_MILLIONAIRE_2026_BLUEPRINT_DETAIL} hasAccess={hasAccess} />;
}
