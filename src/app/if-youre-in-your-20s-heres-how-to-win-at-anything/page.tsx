import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { WIN_IN_20S_DETAIL } from "@/lib/playbooks/win-in-your-20s-at-anything-detail";

export const metadata: Metadata = {
  title: "If You're In Your 20s, Here's How To Win (At Anything) | Plugd",
  description: "Your 20's are your unfair advantage—master the art of doing more of what works, building unstoppable consistency, and turning small repetitions into extraordinary results.",
  openGraph: {
    title: "If You're In Your 20s, Here's How To Win (At Anything) | Plugd",
    description: "Your 20's are your unfair advantage—master the art of doing more of what works, building unstoppable consistency, and turning small repetitions into extraordinary results.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={WIN_IN_20S_DETAIL} hasAccess={hasAccess} />;
}
