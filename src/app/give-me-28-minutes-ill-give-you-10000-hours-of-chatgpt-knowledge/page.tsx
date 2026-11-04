import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { CHATGPT_KNOWLEDGE_DETAIL_DATA } from "@/lib/playbooks/chatgpt-knowledge-detail";

export const metadata: Metadata = {
  title: "Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge | Plugd",
  description: "Unlock the full power of ChatGPT—turn 28 minutes of learning into a smarter way to work, think, research, create, and get things done.",
  openGraph: {
    title: "Give Me 28 Minutes, I'll Give You 10,000 Hours of ChatGPT Knowledge | Plugd",
    description: "Unlock the full power of ChatGPT—turn 28 minutes of learning into a smarter way to work, think, research, create, and get things done.",
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
          (await hasUserAccessToCourse(customer.id, "give-me-28-minutes-ill-give-you-10000-hours-of-chatgpt-knowledge", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-04", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={CHATGPT_KNOWLEDGE_DETAIL_DATA} hasAccess={hasAccess} />;
}
