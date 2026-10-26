import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { FIVE_SIMPLE_APPS_10K_DETAIL } from "@/lib/playbooks/five-simple-apps-10k-month-ai-detail";

export const metadata: Metadata = {
  title: "5 Simple Apps Making $10,000/month That You Can Build with AI | Plugd",
  description: "How tiny, single-utility micro-apps quietly make $10,000+/month\u2014and how to build them with AI in days.",
  openGraph: {
    title: "5 Simple Apps Making $10,000/month That You Can Build with AI | Plugd",
    description: "How tiny, single-utility micro-apps quietly make $10,000+/month\u2014and how to build them with AI in days.",
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
          (await hasUserAccessToCourse(customer.id, "5-simple-apps-making-10-000-month-that-you-can-build-with-ai", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-60", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={FIVE_SIMPLE_APPS_10K_DETAIL} hasAccess={hasAccess} />;
}
