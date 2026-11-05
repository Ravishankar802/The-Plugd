import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { FREE_AI_SIDE_HUSTLE_INDIANS_DETAIL_DATA } from "@/lib/playbooks/free-ai-side-hustle-indians-detail";

export const metadata: Metadata = {
  title: "I Tried A 100% FREE AI Side Hustle For Indians (Real Results) | Plugd",
  description: "Build a digital-product side hustle from India using free AI tools, Canva, and Pinterest—without spending money on paid advertising.",
  openGraph: {
    title: "I Tried A 100% FREE AI Side Hustle For Indians (Real Results) | Plugd",
    description: "Build a digital-product side hustle from India using free AI tools, Canva, and Pinterest—without spending money on paid advertising.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={FREE_AI_SIDE_HUSTLE_INDIANS_DETAIL_DATA} hasAccess={hasAccess} />;
}
