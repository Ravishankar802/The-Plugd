import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { ASKED_AI_MAKE_MONEY_DETAIL } from "@/lib/playbooks/asked-ai-make-money-possible-detail";

export const metadata: Metadata = {
  title: "I Asked AI To Make Me As Much Money As Possible | Plugd",
  description: "A practical experiment in using AI as an autonomous commercial co-worker to generate cash flow from scratch.",
  openGraph: {
    title: "I Asked AI To Make Me As Much Money As Possible | Plugd",
    description: "A practical experiment in using AI as an autonomous commercial co-worker to generate cash flow from scratch.",
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
          (await hasUserAccessToCourse(customer.id, "i-asked-ai-to-make-me-as-much-money-as-possible", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-47", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={ASKED_AI_MAKE_MONEY_DETAIL} hasAccess={hasAccess} />;
}
