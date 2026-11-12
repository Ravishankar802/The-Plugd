import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { PSYCHO_CYBERNETICS_ONE_BOOK_DETAIL_DATA } from "@/lib/playbooks/this-one-book-has-the-power-to-change-your-entire-life-detail";

export const metadata: Metadata = {
  title: "This ONE Book Has The Power to Change Your ENTIRE Life | Plugd",
  description: "A practical guide to reshaping your self-image, breaking limiting beliefs, and using mental rehearsal and goal-setting to change how you approach everyday life.",
  openGraph: {
    title: "This ONE Book Has The Power to Change Your ENTIRE Life | Plugd",
    description: "A practical guide to reshaping your self-image, breaking limiting beliefs, and using mental rehearsal and goal-setting to change how you approach everyday life.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={PSYCHO_CYBERNETICS_ONE_BOOK_DETAIL_DATA} hasAccess={hasAccess} />;
}
