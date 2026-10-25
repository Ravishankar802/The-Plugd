import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { FIVE_PROVEN_WAYS_DETAIL_DATA } from "@/lib/playbooks/five-proven-ways-detail";

export const metadata: Metadata = {
  title: "5 Proven Ways To Make Money With AI (No Experience) | Plugd",
  description: "5 Proven Ways To Make Money With AI (No Experience). Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "5 Proven Ways To Make Money With AI (No Experience) | Plugd",
    description: "5 Proven Ways To Make Money With AI (No Experience). Comprehensive slide decks and deep written lessons.",
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
          (await hasUserAccessToCourse(customer.id, "5-proven-ways-to-make-money-with-ai-no-experience", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-05", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={FIVE_PROVEN_WAYS_DETAIL_DATA} hasAccess={hasAccess} />;
}
