import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { DETAIL_SMB_SERVICES_DATA } from "@/lib/playbooks/smb-services-data";

export const metadata: Metadata = {
  title: "12 AI Services Small Businesses Need but Rarely Know How to Build | Plugd",
  description: "Master the exact architectures, tool stacks, and sales playbooks for 12 concrete, high-demand AI automation services tailored for small and mid-market businesses.",
  openGraph: {
    title: "12 AI Services Small Businesses Need but Rarely Know How to Build | Plugd",
    description: "Master the exact architectures, tool stacks, and sales playbooks for 12 concrete, high-demand AI automation services tailored for small and mid-market businesses.",
    url: "https://theplugd.com/12-ai-services-small-businesses-need-but-rarely-know-how-to-build",
  },
};

export const dynamic = "force-dynamic";

export default async function ai_businesses_06DetailPage() {
  let hasAccess = false;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess =
          (await hasUserAccessToCourse(customer.id, "12-ai-services-small-businesses-need-but-rarely-know-how-to-build", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-06", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "men", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={DETAIL_SMB_SERVICES_DATA} hasAccess={hasAccess} />;
}
