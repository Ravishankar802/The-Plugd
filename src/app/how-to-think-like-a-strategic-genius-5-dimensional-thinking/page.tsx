import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { THINK_STRATEGIC_GENIUS_DETAIL } from "@/lib/playbooks/think-strategic-genius-5d-detail";

export const metadata: Metadata = {
  title: "How To Think Like A Strategic Genius (5-Dimensional Thinking) | Plugd",
  description: "Think beyond the obvious. Master the five dimensions of strategic thinking and learn to see connections, uncover hidden problems, and make smarter decisions.",
  openGraph: {
    title: "How To Think Like A Strategic Genius (5-Dimensional Thinking) | Plugd",
    description: "Think beyond the obvious. Master the five dimensions of strategic thinking and learn to see connections, uncover hidden problems, and make smarter decisions.",
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
          (await hasUserAccessToCourse(customer.id, "how-to-think-like-a-strategic-genius-5-dimensional-thinking", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-27", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={THINK_STRATEGIC_GENIUS_DETAIL} hasAccess={hasAccess} />;
}
