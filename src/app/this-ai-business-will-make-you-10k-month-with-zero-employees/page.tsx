import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { AI_BUSINESS_10K_ZERO_EMPLOYEES_DETAIL_DATA } from "@/lib/playbooks/ai-business-10k-month-zero-employees-detail";

export const metadata: Metadata = {
  title: "This AI Business Will Make You $10k/Month (With Zero Employees) | Plugd",
  description: "Build an AI-assisted creator marketing business by helping subscription-based creators attract qualified traffic, gain paying subscribers, and measure the revenue your campaigns generate.",
  openGraph: {
    title: "This AI Business Will Make You $10k/Month (With Zero Employees) | Plugd",
    description: "Build an AI-assisted creator marketing business by helping subscription-based creators attract qualified traffic, gain paying subscribers, and measure the revenue your campaigns generate.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={AI_BUSINESS_10K_ZERO_EMPLOYEES_DETAIL_DATA} hasAccess={hasAccess} />;
}
