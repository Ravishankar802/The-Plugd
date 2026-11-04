import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { SELL_PDFS_WITH_AI_DETAIL } from "@/lib/playbooks/sell-pdfs-with-ai-changed-life-detail";

export const metadata: Metadata = {
  title: "I Sell PDFs With AI and It Changed My Life (Revealing Everything) | Plugd",
  description: "Stop guessing what to sell—discover what people already want, then use AI to turn that demand into a digital product people will pay for.",
  openGraph: {
    title: "I Sell PDFs With AI and It Changed My Life (Revealing Everything) | Plugd",
    description: "Stop guessing what to sell—discover what people already want, then use AI to turn that demand into a digital product people will pay for.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  // Temporary access granted for previewing purchased state
  let hasAccess = true;

  return <PlaybookDetailView playbook={SELL_PDFS_WITH_AI_DETAIL} hasAccess={hasAccess} />;
}
