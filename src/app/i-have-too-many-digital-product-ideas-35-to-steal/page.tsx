import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { DIGITAL_PRODUCT_IDEAS_35_DETAIL_DATA } from "@/lib/playbooks/i-have-too-many-digital-product-ideas-35-to-steal-detail";

export const metadata: Metadata = {
  title: "I have too many digital product ideas (35+ to steal) | Plugd",
  description: "35 digital product business ideas, with a practical framework for finding the right buyer, validating demand, and turning one promising idea into a product people will pay for.",
  openGraph: {
    title: "I have too many digital product ideas (35+ to steal) | Plugd",
    description: "35 digital product business ideas, with a practical framework for finding the right buyer, validating demand, and turning one promising idea into a product people will pay for.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={DIGITAL_PRODUCT_IDEAS_35_DETAIL_DATA} hasAccess={hasAccess} />;
}
