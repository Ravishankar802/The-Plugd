import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { BEGGING_BUILD_PRODUCT_DETAIL_DATA } from "@/lib/playbooks/bro-im-begging-you-to-build-this-4-8m-product-idea-detail";

export const metadata: Metadata = {
  title: "Bro, I'm BEGGING you to build this $4.8M product idea | Plugd",
  description: "A practical framework for discovering overlooked physical-product opportunities, evaluating their business potential, and validating demand before investing in manufacturing.",
  openGraph: {
    title: "Bro, I'm BEGGING you to build this $4.8M product idea | Plugd",
    description: "A practical framework for discovering overlooked physical-product opportunities, evaluating their business potential, and validating demand before investing in manufacturing.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={BEGGING_BUILD_PRODUCT_DETAIL_DATA} hasAccess={hasAccess} />;
}
