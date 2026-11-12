import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { YEAR_TO_MAKE_10M_DETAIL_DATA } from "@/lib/playbooks/if-i-had-1-year-to-make-10m-this-is-my-plan-detail";

export const metadata: Metadata = {
  title: "If I Had 1 Year to Make $10M - This Is My Plan | Plugd",
  description: "A practical e-commerce blueprint for spotting untapped demand, validating products, launching with focus, and scaling without sacrificing profitability.",
  openGraph: {
    title: "If I Had 1 Year to Make $10M - This Is My Plan | Plugd",
    description: "A practical e-commerce blueprint for spotting untapped demand, validating products, launching with focus, and scaling without sacrificing profitability.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={YEAR_TO_MAKE_10M_DETAIL_DATA} hasAccess={hasAccess} />;
}
