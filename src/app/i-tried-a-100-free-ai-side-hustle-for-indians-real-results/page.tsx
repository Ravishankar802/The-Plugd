import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { FREE_AI_SIDE_HUSTLE_INDIANS_DETAIL_DATA } from "@/lib/playbooks/free-ai-side-hustle-indians-detail";

export const metadata: Metadata = {
  title: "I Tried A 100% FREE AI Side Hustle For Indians (Real Results) | Plugd",
  description: "Build and sell digital products from India using free AI tools — then turn Pinterest searches into a traffic source for your online store.",
  openGraph: {
    title: "I Tried A 100% FREE AI Side Hustle For Indians (Real Results) | Plugd",
    description: "Build and sell digital products from India using free AI tools — then turn Pinterest searches into a traffic source for your online store.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={FREE_AI_SIDE_HUSTLE_INDIANS_DETAIL_DATA} hasAccess={hasAccess} />;
}
