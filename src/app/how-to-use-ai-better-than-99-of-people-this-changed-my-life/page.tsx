import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { USE_AI_BETTER_99_DETAIL } from "@/lib/playbooks/use-ai-better-99-percent-detail";

export const metadata: Metadata = {
  title: "How To Use AI Better Than 99% Of People (This Changed My Life) | Plugd",
  description: "Unlock the top 1% cognitive workflow frameworks to transform AI into an intellectual sparring partner and output multiplier.",
  openGraph: {
    title: "How To Use AI Better Than 99% Of People (This Changed My Life) | Plugd",
    description: "Unlock the top 1% cognitive workflow frameworks to transform AI into an intellectual sparring partner and output multiplier.",
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
          (await hasUserAccessToCourse(customer.id, "how-to-use-ai-better-than-99-of-people-this-changed-my-life", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-28", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={USE_AI_BETTER_99_DETAIL} hasAccess={hasAccess} />;
}
