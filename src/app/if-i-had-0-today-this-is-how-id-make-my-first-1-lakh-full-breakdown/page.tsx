import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { IF_I_HAD_0_FIRST_1_LAKH_DETAIL_DATA } from "@/lib/playbooks/if-i-had-0-first-1-lakh-detail";

export const metadata: Metadata = {
  title: "if i had ₹0 today, this is how i'd make my first ₹1 Lakh - full breakdown | Plugd",
  description: "Starting with ₹0? Build a skill people will pay for, land your first client, turn your work into proof, and create a realistic path towards your first ₹1 lakh.",
  openGraph: {
    title: "if i had ₹0 today, this is how i'd make my first ₹1 Lakh - full breakdown | Plugd",
    description: "Starting with ₹0? Build a skill people will pay for, land your first client, turn your work into proof, and create a realistic path towards your first ₹1 lakh.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={IF_I_HAD_0_FIRST_1_LAKH_DETAIL_DATA} hasAccess={hasAccess} />;
}
