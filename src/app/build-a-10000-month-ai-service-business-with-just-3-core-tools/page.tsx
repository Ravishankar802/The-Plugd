import { Metadata } from "next";
import { cookies } from "next/headers";
import PlaybookDetailView from "@/components/PlaybookDetailView";
import { getCustomerByAccessKey, hasUserAccessToCourse } from "@/lib/playbooks";
import { AI_SERVICE_BUSINESS_DETAIL_DATA } from "@/lib/ai-service-business-detail";

export const metadata: Metadata = {
  title: "Build a $10,000/Month AI Service Business With Just 3 Core Tools | Plugd",
  description:
    "Master the 3 high-leverage tools to build, package, and sell high-ticket AI automation services to B2B clients. Practical, step-by-step agency blueprints.",
  openGraph: {
    title: "Build a $10,000/Month AI Service Business With Just 3 Core Tools | Plugd",
    description:
      "Master the 3 high-leverage tools to build, package, and sell high-ticket AI automation services to B2B clients. Practical, step-by-step agency blueprints.",
    url: "https://theplugd.com/build-a-10000-month-ai-service-business-with-just-3-core-tools",
  },
};

export const dynamic = "force-dynamic";

export default async function AIServiceBusinessDetailPage() {
  let hasAccess = false;
  try {
    const cookieStore = await cookies();
    const accessKey = cookieStore.get("plugd_access_key")?.value;
    if (accessKey) {
      const customer = await getCustomerByAccessKey(accessKey);
      if (customer) {
        hasAccess =
          (await hasUserAccessToCourse(customer.id, "build-a-10000-month-ai-service-business-with-just-3-core-tools", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "ai-businesses-02", customer.email)) ||
          (await hasUserAccessToCourse(customer.id, "men", customer.email));
      }
    }
  } catch (err) {
    console.error("[AI_SERVICE_BUSINESS_AUTH_CHECK_ERROR]", err);
  }

  return <PlaybookDetailView playbook={AI_SERVICE_BUSINESS_DETAIL_DATA} hasAccess={hasAccess} />;
}
