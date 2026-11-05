import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { BLEW_UP_YOUTUBE_AI_DETAIL_DATA } from "@/lib/playbooks/i-blew-up-a-youtube-channel-in-24-hours-with-ai-detail";

export const metadata: Metadata = {
  title: "I BLEW UP a YouTube Channel in 24 Hours with AI | Plugd",
  description: "Turn AI into your Shorts production studio — reverse-engineer viral storytelling, create original transformation videos, and build a repeatable YouTube content system that can capture millions of views.",
  openGraph: {
    title: "I BLEW UP a YouTube Channel in 24 Hours with AI | Plugd",
    description: "Turn AI into your Shorts production studio — reverse-engineer viral storytelling, create original transformation videos, and build a repeatable YouTube content system that can capture millions of views.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;

  return <PlaybookDetailView playbook={BLEW_UP_YOUTUBE_AI_DETAIL_DATA} hasAccess={hasAccess} />;
}
