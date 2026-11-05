import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { HOW_I_BUILT_400K_IOS_DETAIL_DATA } from "@/lib/playbooks/how-i-built-it-400k-month-ios-app-detail";

export const metadata: Metadata = {
  title: "How I Built It: $400K/Month iOS App | Plugd",
  description: "A practical guide to turning a simple iOS app idea into a scalable business through focused product development, user analytics, experimentation, and smart distribution.",
  openGraph: {
    title: "How I Built It: $400K/Month iOS App | Plugd",
    description: "A practical guide to turning a simple iOS app idea into a scalable business through focused product development, user analytics, experimentation, and smart distribution.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={HOW_I_BUILT_400K_IOS_DETAIL_DATA} hasAccess={hasAccess} />;
}
