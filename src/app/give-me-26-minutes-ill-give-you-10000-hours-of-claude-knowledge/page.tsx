import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { CLAUDE_KNOWLEDGE_DETAIL_DATA } from "@/lib/playbooks/claude-knowledge-detail";

export const metadata: Metadata = {
  title: "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge | Plugd",
  description: "Discover 10 powerful Claude capabilities, organised from beginner to advanced, and learn how to use them to save time and produce better work. Build personalised context, create reusable Skills, organise Projects, connect apps, delegate browser tasks, and automate repeatable workflows. Go further by using Claude Code to build software and Claude Design to create functional interfaces and prototypes. Includes ready-to-use prompts, practical workflows, checklists, and a 7-day implementation plan.",
  openGraph: {
    title: "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge | Plugd",
    description: "Discover 10 powerful Claude capabilities, organised from beginner to advanced, and learn how to use them to save time and produce better work. Build personalised context, create reusable Skills, organise Projects, connect apps, delegate browser tasks, and automate repeatable workflows. Go further by using Claude Code to build software and Claude Design to create functional interfaces and prototypes. Includes ready-to-use prompts, practical workflows, checklists, and a 7-day implementation plan.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = true;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess =
          (await hasUserAccessToCourse(customer.id, "give-me-26-minutes-ill-give-you-10000-hours-of-claude-knowledge", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-03", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={CLAUDE_KNOWLEDGE_DETAIL_DATA} hasAccess={hasAccess} />;
}
