import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { INVESTING_BEGINNERS_25M_DETAIL } from "@/lib/playbooks/investing-beginners-25-mins-detail";

export const metadata: Metadata = {
  title: "Investing For Beginners in 25 Minutes | Plugd",
  description: "A 40-year veteran investor's ultimate masterclass condensed into 25 minutes of pure wealth-building mechanics.",
  openGraph: {
    title: "Investing For Beginners in 25 Minutes | Plugd",
    description: "A 40-year veteran investor's ultimate masterclass condensed into 25 minutes of pure wealth-building mechanics.",
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
          (await hasUserAccessToCourse(customer.id, "investing-for-beginners-in-25-minutes", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-31", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={INVESTING_BEGINNERS_25M_DETAIL} hasAccess={hasAccess} />;
}
