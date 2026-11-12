import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { IM_BROKE_BUSINESS_DETAIL_DATA } from "@/lib/playbooks/im-broke-what-business-do-i-start-detail";

export const metadata: Metadata = {
  title: "\"I'm Broke, What Business Do I Start?\" | Plugd",
  description: "Broke but ready to build? Find a business hiding in your skills, turn a real customer problem into an irresistible offer, and get your first customers without needing a big budget.",
  openGraph: {
    title: "\"I'm Broke, What Business Do I Start?\" | Plugd",
    description: "Broke but ready to build? Find a business hiding in your skills, turn a real customer problem into an irresistible offer, and get your first customers without needing a big budget.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={IM_BROKE_BUSINESS_DETAIL_DATA} hasAccess={hasAccess} />;
}
