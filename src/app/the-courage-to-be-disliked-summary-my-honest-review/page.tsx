import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { COURAGE_TO_BE_DISLIKED_DETAIL_DATA } from "@/lib/playbooks/courage-to-be-disliked-detail";

export const metadata: Metadata = {
  title: "The Courage to be Disliked Summary + my honest review | Plugd",
  description: "Stop living for everyone else's approval. Discover how to break free from comparison, set boundaries, accept yourself, and finally live life on your own terms.",
  openGraph: {
    title: "The Courage to be Disliked Summary + my honest review | Plugd",
    description: "Stop living for everyone else's approval. Discover how to break free from comparison, set boundaries, accept yourself, and finally live life on your own terms.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={COURAGE_TO_BE_DISLIKED_DETAIL_DATA} hasAccess={hasAccess} />;
}
