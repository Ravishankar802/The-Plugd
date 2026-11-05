import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { HOW_I_MADE_16K_WHOP_DETAIL_DATA } from "@/lib/playbooks/how-i-made-16-705-83-on-whop-as-a-low-iq-21-year-old-detail";

export const metadata: Metadata = {
  title: "How I Made $16,705.83 On Whop (as a low iq 21 year old) | Plugd",
  description: "Turn other people's long-form videos into short-form content that gets paid — master campaign selection, viral storytelling, AI-assisted clipping, and multi-platform distribution.",
  openGraph: {
    title: "How I Made $16,705.83 On Whop (as a low iq 21 year old) | Plugd",
    description: "Turn other people's long-form videos into short-form content that gets paid — master campaign selection, viral storytelling, AI-assisted clipping, and multi-platform distribution.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={HOW_I_MADE_16K_WHOP_DETAIL_DATA} hasAccess={hasAccess} />;
}
