import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { PERFECT_BUSINESS_5_THINGS_DETAIL_DATA } from "@/lib/playbooks/perfect-business-5-things-detail";

export const metadata: Metadata = {
  title: "What Makes The Perfect Business (5 Things) | Plugd",
  description: "What Makes The Perfect Business (5 Things). Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "What Makes The Perfect Business (5 Things) | Plugd",
    description: "What Makes The Perfect Business (5 Things). Comprehensive slide decks and deep written lessons.",
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
          (await hasUserAccessToCourse(customer.id, "what-makes-the-perfect-business-5-things", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-22", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={PERFECT_BUSINESS_5_THINGS_DETAIL_DATA} hasAccess={hasAccess} />;
}
