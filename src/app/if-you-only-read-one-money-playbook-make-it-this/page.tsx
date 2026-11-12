import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { ONE_MONEY_PLAYBOOK_DETAIL_DATA } from "@/lib/playbooks/if-you-only-read-one-money-playbook-make-it-this-detail";

export const metadata: Metadata = {
  title: "If You Only Read One Money Playbook, Make It This | Plugd",
  description: "Stop chasing quick money and start thinking like a wealth builder — master the seven laws of money, understand ownership and leverage, and learn to grow your wealth without risking everything you've built.",
  openGraph: {
    title: "If You Only Read One Money Playbook, Make It This | Plugd",
    description: "Stop chasing quick money and start thinking like a wealth builder — master the seven laws of money, understand ownership and leverage, and learn to grow your wealth without risking everything you've built.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={ONE_MONEY_PLAYBOOK_DETAIL_DATA} hasAccess={hasAccess} />;
}
