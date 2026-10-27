import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { SELL_PDFS_WITH_AI_DETAIL } from "@/lib/playbooks/sell-pdfs-with-ai-changed-life-detail";

export const metadata: Metadata = {
  title: "I Sell PDFs With AI and It Changed My Life (Revealing Everything) | Plugd",
  description: "The complete blueprint to engineering and selling simple, high-converting digital PDFs with AI for 95%+ net profit margins.",
  openGraph: {
    title: "I Sell PDFs With AI and It Changed My Life (Revealing Everything) | Plugd",
    description: "The complete blueprint to engineering and selling simple, high-converting digital PDFs with AI for 95%+ net profit margins.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  // Temporary access granted for previewing purchased state
  const hasAccess = true;

  return <PlaybookDetailView playbook={SELL_PDFS_WITH_AI_DETAIL} hasAccess={hasAccess} />;
}
