import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { WEALTH_KNOWLEDGE_31_YEARS_DETAIL_DATA } from "@/lib/playbooks/31-years-of-wealth-knowledge-in-18-minutes-detail";

export const metadata: Metadata = {
  title: "31 Years of Wealth Knowledge in 18 Minutes | Plugd",
  description: "Stop chasing a bigger paycheck and start building real wealth — master the four stages of financial freedom, turn your income into productive assets, and make your money work harder over time.",
  openGraph: {
    title: "31 Years of Wealth Knowledge in 18 Minutes | Plugd",
    description: "Stop chasing a bigger paycheck and start building real wealth — master the four stages of financial freedom, turn your income into productive assets, and make your money work harder over time.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={WEALTH_KNOWLEDGE_31_YEARS_DETAIL_DATA} hasAccess={hasAccess} />;
}
