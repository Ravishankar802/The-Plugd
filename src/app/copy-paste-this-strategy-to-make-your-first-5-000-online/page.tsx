import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { COPY_PASTE_FIRST_5K_DETAIL } from "@/lib/playbooks/copy-paste-strategy-first-5k-detail";

export const metadata: Metadata = {
  title: "Copy & Paste THIS Strategy To Make Your First $5,000 Online | Plugd",
  description: "Build a newsletter business from scratch in just 30 days. Learn how to attract the right audience, turn your expertise into a profitable digital product, and create a repeatable revenue system.",
  openGraph: {
    title: "Copy & Paste THIS Strategy To Make Your First $5,000 Online | Plugd",
    description: "Build a newsletter business from scratch in just 30 days. Learn how to attract the right audience, turn your expertise into a profitable digital product, and create a repeatable revenue system.",
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
          (await hasUserAccessToCourse(customer.id, "copy-paste-this-strategy-to-make-your-first-5-000-online", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-45", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={COPY_PASTE_FIRST_5K_DETAIL} hasAccess={hasAccess} />;
}
