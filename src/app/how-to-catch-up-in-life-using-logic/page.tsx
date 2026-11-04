import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { CATCH_UP_IN_LIFE_LOGIC_DETAIL_DATA } from "@/lib/playbooks/catch-up-in-life-logic-detail";

export const metadata: Metadata = {
  title: "How to Catch Up In Life (Using Logic) | Plugd",
  description: "Stop waiting for life to catch up—build the skills, financial freedom, audience, network, and opportunities that put you back in control.",
  openGraph: {
    title: "How to Catch Up In Life (Using Logic) | Plugd",
    description: "Stop waiting for life to catch up—build the skills, financial freedom, audience, network, and opportunities that put you back in control.",
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
          (await hasUserAccessToCourse(customer.id, "how-to-catch-up-in-life-using-logic", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-21", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={CATCH_UP_IN_LIFE_LOGIC_DETAIL_DATA} hasAccess={hasAccess} />;
}
