import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { DATING_PLAYBOOK_DETAIL } from "@/lib/dating-playbook-detail";

export const metadata: Metadata = {
  title: "The Dating Playbook — Everything you need to get a girl | Plugd",
  description:
    "Learn how to attract women, build confidence, and get the girl you want. Practical lessons on attraction, confidence, flirting, texting, and dating.",
  openGraph: {
    title: "The Dating Playbook — Everything you need to get a girl | Plugd",
    description:
      "Learn how to attract women, build confidence, and get the girl you want. Instant digital access. One-time payment. Lifetime access.",
  },
};

export const dynamic = "force-dynamic";

export default async function MenSalesPage() {
  let hasAccess = false;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess = await hasUserAccessToCourse(customer.id, "men", customer.email);
      }
    }
  } catch (err) {
    console.error("[MEN_PAGE_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={DATING_PLAYBOOK_DETAIL} hasAccess={hasAccess} />;
}
