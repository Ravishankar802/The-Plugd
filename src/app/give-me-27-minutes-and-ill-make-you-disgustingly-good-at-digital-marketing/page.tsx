import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { GIVE_ME_27_MINS_DIGITAL_MARKETING_DETAIL_DATA } from "@/lib/playbooks/give-me-27-minutes-digital-marketing-detail";

export const metadata: Metadata = {
  title: "Give Me 27 Minutes and I'll Make You Disgustingly Good at Digital Marketing | Plugd",
  description: "Stop guessing what makes people buy. Learn to capture attention, understand customer psychology, write persuasive ads, and turn clicks into customers.",
  openGraph: {
    title: "Give Me 27 Minutes and I'll Make You Disgustingly Good at Digital Marketing | Plugd",
    description: "Stop guessing what makes people buy. Learn to capture attention, understand customer psychology, write persuasive ads, and turn clicks into customers.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={GIVE_ME_27_MINS_DIGITAL_MARKETING_DETAIL_DATA} hasAccess={hasAccess} />;
}
