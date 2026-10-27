import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { WIN_IN_20S_DETAIL } from "@/lib/playbooks/win-in-your-20s-at-anything-detail";

export const metadata: Metadata = {
  title: "If You're In Your 20s, Here's How To Win (At Anything) | Plugd",
  description: "The definitive operating manual for 20-somethings to weaponize biological leverage, master asymmetric skills, and win relentlessly.",
  openGraph: {
    title: "If You're In Your 20s, Here's How To Win (At Anything) | Plugd",
    description: "The definitive operating manual for 20-somethings to weaponize biological leverage, master asymmetric skills, and win relentlessly.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={WIN_IN_20S_DETAIL} hasAccess={hasAccess} />;
}
