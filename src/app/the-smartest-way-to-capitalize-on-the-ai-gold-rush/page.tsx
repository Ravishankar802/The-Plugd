import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { CAPITALIZE_AI_GOLD_RUSH_DETAIL } from "@/lib/playbooks/smartest-way-capitalize-ai-gold-rush-detail";

export const metadata: Metadata = {
  title: "The SMARTEST Way to Capitalize on the AI Gold Rush | Plugd",
  description: "The institutional playbook to profit from the $1.8T AI boom without building models or selling commoditized wrappers.",
  openGraph: {
    title: "The SMARTEST Way to Capitalize on the AI Gold Rush | Plugd",
    description: "The institutional playbook to profit from the $1.8T AI boom without building models or selling commoditized wrappers.",
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
          (await hasUserAccessToCourse(customer.id, "the-smartest-way-to-capitalize-on-the-ai-gold-rush", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-56", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={CAPITALIZE_AI_GOLD_RUSH_DETAIL} hasAccess={hasAccess} />;
}
