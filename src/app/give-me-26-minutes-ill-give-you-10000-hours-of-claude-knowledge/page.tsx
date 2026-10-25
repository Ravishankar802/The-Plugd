import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { CLAUDE_KNOWLEDGE_DETAIL_DATA } from "@/lib/playbooks/claude-knowledge-detail";

export const metadata: Metadata = {
  title: "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge | Plugd",
  description: "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge. Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge | Plugd",
    description: "Give Me 26 Minutes, I'll Give You 10,000 Hours of Claude Knowledge. Comprehensive slide decks and deep written lessons.",
  },
};

export const dynamic = "force-dynamic";

export default async function PlaybookPage() {
  let hasAccess = false;
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
