import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { FIRST_10K_TEEN_DETAIL } from "@/lib/playbooks/first-10k-teen-simple-detail";

export const metadata: Metadata = {
  title: "How to Make Your First $10,000 As a Teen (Stupid Simple) | Plugd",
  description: "A practical, zero-bullshit roadmap for teens and young adults to bank their first $10,000 in net profit.",
  openGraph: {
    title: "How to Make Your First $10,000 As a Teen (Stupid Simple) | Plugd",
    description: "A practical, zero-bullshit roadmap for teens and young adults to bank their first $10,000 in net profit.",
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
          (await hasUserAccessToCourse(customer.id, "how-to-make-your-first-10-000-as-a-teen-stupid-simple", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-36", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={FIRST_10K_TEEN_DETAIL} hasAccess={hasAccess} />;
}
