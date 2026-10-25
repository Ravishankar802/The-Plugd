import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { THREE_TYPES_BUSINESSES_DETAIL } from "@/lib/playbooks/three-types-profitable-businesses-detail";

export const metadata: Metadata = {
  title: "There Are Only 3 Types Of Profitable Businesses (Pick ONE) | Plugd",
  description: "A definitive strategic breakdown of the only three business vehicles that generate durable, long-term wealth.",
  openGraph: {
    title: "There Are Only 3 Types Of Profitable Businesses (Pick ONE) | Plugd",
    description: "A definitive strategic breakdown of the only three business vehicles that generate durable, long-term wealth.",
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
          (await hasUserAccessToCourse(customer.id, "there-are-only-3-types-of-profitable-businesses-pick-one", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-42", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={THREE_TYPES_BUSINESSES_DETAIL} hasAccess={hasAccess} />;
}
