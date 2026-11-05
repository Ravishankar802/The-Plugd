import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { BUILD_10K_WEBSITE_GPT6_DETAIL_DATA } from "@/lib/playbooks/how-to-build-a-10000-website-with-gpt-6-astra-full-tutorial-detail";

export const metadata: Metadata = {
  title: "How To Build a $10,000 Website with GPT-6 Astra (Full Tutorial) | Plugd",
  description: "Build premium, client-ready websites with AI — from brand identity and custom design to working forms, deployment, and landing your first paying clients.",
  openGraph: {
    title: "How To Build a $10,000 Website with GPT-6 Astra (Full Tutorial) | Plugd",
    description: "Build premium, client-ready websites with AI — from brand identity and custom design to working forms, deployment, and landing your first paying clients.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={BUILD_10K_WEBSITE_GPT6_DETAIL_DATA} hasAccess={hasAccess} />;
}
