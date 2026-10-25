import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { EIGHTEEN_YEARS_UGLY_ADVICE_DETAIL } from "@/lib/playbooks/eighteen-years-ugly-advice-detail";

export const metadata: Metadata = {
  title: "18 Years Of UGLY Business Advice In 19 Minutes | Plugd",
  description: "Raw, unvarnished, battle-tested operational truth from nearly two decades in the entrepreneurial trenches.",
  openGraph: {
    title: "18 Years Of UGLY Business Advice In 19 Minutes | Plugd",
    description: "Raw, unvarnished, battle-tested operational truth from nearly two decades in the entrepreneurial trenches.",
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
          (await hasUserAccessToCourse(customer.id, "18-years-of-ugly-business-advice-in-19-minutes", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-40", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={EIGHTEEN_YEARS_UGLY_ADVICE_DETAIL} hasAccess={hasAccess} />;
}
