import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { HONEST_ADVICE_GET_RICH_DETAIL } from "@/lib/playbooks/honest-advice-want-get-rich-detail";

export const metadata: Metadata = {
  title: "My honest advice to someone who wants to get rich. | Plugd",
  description: "Raw, unfiltered, battle-tested advice for young founders: maximizing youth leverage, cutting lifestyle drag, and executing relentlessly.",
  openGraph: {
    title: "My honest advice to someone who wants to get rich. | Plugd",
    description: "Raw, unfiltered, battle-tested advice for young founders: maximizing youth leverage, cutting lifestyle drag, and executing relentlessly.",
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
          (await hasUserAccessToCourse(customer.id, "my-honest-advice-to-someone-who-wants-to-get-rich", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-49", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={HONEST_ADVICE_GET_RICH_DETAIL} hasAccess={hasAccess} />;
}
