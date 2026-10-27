import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { FIRST_1M_IS_SIMPLE_DETAIL_DATA } from "@/lib/playbooks/first-1m-is-simple-detail";

export const metadata: Metadata = {
  title: "Your First $1M Is Simple (Here's How) | Plugd",
  description: "Your First $1M Is Simple (Here's How). Comprehensive slide decks and deep written lessons.",
  openGraph: {
    title: "Your First $1M Is Simple (Here's How) | Plugd",
    description: "Your First $1M Is Simple (Here's How). Comprehensive slide decks and deep written lessons.",
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
          (await hasUserAccessToCourse(customer.id, "your-first-1m-is-simple-heres-how", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-11", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={FIRST_1M_IS_SIMPLE_DETAIL_DATA} hasAccess={hasAccess} />;
}
