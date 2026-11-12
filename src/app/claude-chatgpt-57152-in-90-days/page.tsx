import { Metadata } from "next";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { CLAUDE_CHATGPT_57K_DETAIL_DATA } from "@/lib/playbooks/claude-chatgpt-57152-in-90-days-detail";

export const metadata: Metadata = {
  title: "Claude + ChatGPT = $57,152 In 90 Days | Plugd",
  description: "Turn Claude and ChatGPT into your faceless YouTube production team—from finding viral-worthy topics to scripting, editing, branding, and publishing Shorts.",
  openGraph: {
    title: "Claude + ChatGPT = $57,152 In 90 Days | Plugd",
    description: "Turn Claude and ChatGPT into your faceless YouTube production team—from finding viral-worthy topics to scripting, editing, branding, and publishing Shorts.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;

  return <PlaybookDetailView playbook={CLAUDE_CHATGPT_57K_DETAIL_DATA} hasAccess={hasAccess} />;
}
