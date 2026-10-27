import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { BUILD_10K_WEBSITES_CLAUDE_DETAIL } from "@/lib/playbooks/build-10k-websites-claude-ai-detail";

export const metadata: Metadata = {
  title: "How to Build $10K Websites in Minutes (Claude AI) | Plugd",
  description: "A production-grade agency blueprint to generating bespoke, high-converting $10k websites in minutes using Claude AI.",
  openGraph: {
    title: "How to Build $10K Websites in Minutes (Claude AI) | Plugd",
    description: "A production-grade agency blueprint to generating bespoke, high-converting $10k websites in minutes using Claude AI.",
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
          (await hasUserAccessToCourse(customer.id, "how-to-build-10k-websites-in-minutes-claude-ai", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-51", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={BUILD_10K_WEBSITES_CLAUDE_DETAIL} hasAccess={hasAccess} />;
}
