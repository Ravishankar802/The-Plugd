import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { WHEN_I_UNDERSTOOD_THIS_ABOUT_INVESTING_DETAIL_DATA } from "@/lib/playbooks/when-i-understood-this-about-investing-my-life-changed-detail";

export const metadata: Metadata = {
  title: "When I Understood This About Investing. My Life Changed. | Plugd",
  description: "Stop guessing with your money. Learn the investment framework that helps you spot better opportunities, understand what you actually own, protect your downside, and make smarter decisions for long-term wealth.",
  openGraph: {
    title: "When I Understood This About Investing. My Life Changed. | Plugd",
    description: "Stop guessing with your money. Learn the investment framework that helps you spot better opportunities, understand what you actually own, protect your downside, and make smarter decisions for long-term wealth.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={WHEN_I_UNDERSTOOD_THIS_ABOUT_INVESTING_DETAIL_DATA} hasAccess={hasAccess} />;
}
