import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { DETAIL_MICRO_SAAS_DATA } from "@/lib/playbooks/micro-saas-data";

export const metadata: Metadata = {
  title: "Build a Micro-SaaS With AI in 7 Days Instead of Spending Months Coding | Plugd",
  description: "The 7-day tactical blueprint to scope, build, test, monetize, and launch a profitable B2B micro-SaaS application using modern AI coding copilots and serverless infrastructure.",
  openGraph: {
    title: "Build a Micro-SaaS With AI in 7 Days Instead of Spending Months Coding | Plugd",
    description: "The 7-day tactical blueprint to scope, build, test, monetize, and launch a profitable B2B micro-SaaS application using modern AI coding copilots and serverless infrastructure.",
    url: "https://theplugd.com/build-a-micro-saas-with-ai-in-7-days-instead-of-spending-months-coding",
  },
};

export const dynamic = "force-dynamic";

export default async function ai_businesses_07DetailPage() {
  let hasAccess = false;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess =
          (await hasUserAccessToCourse(customer.id, "build-a-micro-saas-with-ai-in-7-days-instead-of-spending-months-coding", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-07", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "men", customer.email));
      }
    }
  } catch (err) {
    console.error("[PLAYBOOK_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={DETAIL_MICRO_SAAS_DATA} hasAccess={hasAccess} />;
}
