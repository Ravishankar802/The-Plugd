import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { NEW_WAY_CONTENT_AI_DETAIL_DATA } from "@/lib/playbooks/new-way-content-ai-detail";

export const metadata: Metadata = {
  title: "The New Way of Making Content In The Age of AI | Plugd",
  description: "The New Way of Making Content In The Age of AI. Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "The New Way of Making Content In The Age of AI | Plugd",
    description: "The New Way of Making Content In The Age of AI. Comprehensive slide decks and deep written lessons.",
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
          (await hasUserAccessToCourse(customer.id, "the-new-way-of-making-content-in-the-age-of-ai", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-20", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={NEW_WAY_CONTENT_AI_DETAIL_DATA} hasAccess={hasAccess} />;
}
