import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { I_TRIED_SELLING_17_DIGITAL_PRODUCT_DETAIL_DATA } from "@/lib/playbooks/tried-selling-17-digital-product-detail";

export const metadata: Metadata = {
  title: "I Tried Selling a $17 Digital Product to Make $1,000 in 10 Days | Plugd",
  description: "Launch a $17 digital product, build a complete sales funnel, run paid ads, and learn how to turn clicks into customers — with a real-world experiment that reveals what actually makes money and what eats your profit.",
  openGraph: {
    title: "I Tried Selling a $17 Digital Product to Make $1,000 in 10 Days | Plugd",
    description: "Launch a $17 digital product, build a complete sales funnel, run paid ads, and learn how to turn clicks into customers — with a real-world experiment that reveals what actually makes money and what eats your profit.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={I_TRIED_SELLING_17_DIGITAL_PRODUCT_DETAIL_DATA} hasAccess={hasAccess} />;
}
