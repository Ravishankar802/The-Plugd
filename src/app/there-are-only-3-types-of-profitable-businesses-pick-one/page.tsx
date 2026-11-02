import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { THREE_TYPES_BUSINESSES_DETAIL } from "@/lib/playbooks/three-types-profitable-businesses-detail";

export const metadata: Metadata = {
  title: "There Are Only 3 Types Of Profitable Businesses (Pick ONE) | Plugd",
  description: "A practical guide to choosing the right business path and building wealth on your terms. Discover how to scale, create a profitable lifestyle business, or build a company ready for a successful exit.",
  openGraph: {
    title: "There Are Only 3 Types Of Profitable Businesses (Pick ONE) | Plugd",
    description: "A practical guide to choosing the right business path and building wealth on your terms. Discover how to scale, create a profitable lifestyle business, or build a company ready for a successful exit.",
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
          (await hasUserAccessToCourse(customer.id, "there-are-only-3-types-of-profitable-businesses-pick-one", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-42", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={THREE_TYPES_BUSINESSES_DETAIL} hasAccess={hasAccess} />;
}
