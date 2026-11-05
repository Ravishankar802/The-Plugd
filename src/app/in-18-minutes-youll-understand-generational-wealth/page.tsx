import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { GENERATIONAL_WEALTH_DETAIL_DATA } from "@/lib/playbooks/in-18-minutes-youll-understand-generational-wealth-detail";

export const metadata: Metadata = {
  title: "In 18 Minutes, You'll Understand Generational Wealth | Plugd",
  description: "Don't just build a fortune — build a system that keeps it alive for generations. Master the nine systems behind preserving family wealth, protecting ownership, preventing disputes, and preparing the next generation to carry it forward.",
  openGraph: {
    title: "In 18 Minutes, You'll Understand Generational Wealth | Plugd",
    description: "Don't just build a fortune — build a system that keeps it alive for generations. Master the nine systems behind preserving family wealth, protecting ownership, preventing disputes, and preparing the next generation to carry it forward.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={GENERATIONAL_WEALTH_DETAIL_DATA} hasAccess={hasAccess} />;
}
